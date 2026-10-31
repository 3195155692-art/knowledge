#!/usr/bin/env node
// Minimal real-browser PDF fetcher.
//
// Some legitimate open-access hosts (PMC, MDPI, Europe PMC render endpoints) reject
// non-browser clients. This helper drives a locally installed Chrome through the
// DevTools protocol so the request carries a real browser TLS/header fingerprint,
// then pulls the same-origin PDF bytes back out.
//
// It only fetches openly available material. It does not touch logins, paywalls,
// CAPTCHAs, or DRM.
//
// Usage:
//   node browser_fetch_pdf.mjs --jobs jobs.json [--out <dir>] [--headful]
//
// jobs.json: [{ "name": "01_paper", "page": "<landing page url>", "pdf": "<pdf url>" }]

import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
];

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function parseArgs(argv) {
  const args = { port: 9333, out: ".", timeoutMs: 90000, headful: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--jobs") args.jobs = argv[++i];
    else if (a === "--out") args.out = argv[++i];
    else if (a === "--port") args.port = Number(argv[++i]);
    else if (a === "--timeout") args.timeoutMs = Number(argv[++i]);
    else if (a === "--headful") args.headful = true;
    else throw new Error(`Unknown argument: ${a}`);
  }
  if (!args.jobs) throw new Error("--jobs is required");
  return args;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForDevtools(port, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`, {
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) return await res.json();
    } catch {
      /* keep waiting */
    }
    await sleep(400);
  }
  throw new Error(`Chrome DevTools endpoint on port ${port} did not come up`);
}

async function findPageTarget(port) {
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    const res = await fetch(`http://127.0.0.1:${port}/json/list`, {
      signal: AbortSignal.timeout(5000),
    });
    const targets = await res.json();
    const page = targets.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
    if (page) return page;
    await sleep(400);
  }
  throw new Error("No Chrome page target available");
}

class Cdp {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 0;
    this.pending = new Map();
    this.listeners = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve, { once: true });
      this.ws.addEventListener("error", () => reject(new Error("CDP socket error")), {
        once: true,
      });
    });
    this.ws.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(`${msg.error.message} (${msg.error.code})`));
        else resolve(msg.result);
        return;
      }
      if (msg.method) {
        const key = msg.method;
        if (this.listeners.has(key)) {
          for (const fn of this.listeners.get(key)) fn(msg.params);
        }
      }
    });
  }

  on(method, fn) {
    if (!this.listeners.has(method)) this.listeners.set(method, new Set());
    this.listeners.get(method).add(fn);
    return () => this.listeners.get(method).delete(fn);
  }

  send(method, params = {}, timeoutMs = 60000) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`CDP ${method} timed out`));
      }, timeoutMs);
      this.pending.set(id, {
        resolve: (v) => {
          clearTimeout(timer);
          resolve(v);
        },
        reject: (e) => {
          clearTimeout(timer);
          reject(e);
        },
      });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    try {
      this.ws.close();
    } catch {
      /* ignore */
    }
  }
}

function waitForLoad(cdp, timeoutMs) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      off();
      resolve(false);
    }, timeoutMs);
    const off = cdp.on("Page.loadEventFired", () => {
      clearTimeout(timer);
      off();
      resolve(true);
    });
  });
}

const PAGE_FETCH = (pdfUrl) => `(async () => {
  const res = await fetch(${JSON.stringify(pdfUrl)}, {
    credentials: 'include',
    headers: { 'Accept': 'application/pdf,*/*' }
  });
  const buf = new Uint8Array(await res.arrayBuffer());
  let s = '';
  const CH = 0x8000;
  for (let i = 0; i < buf.length; i += CH) {
    s += String.fromCharCode.apply(null, buf.subarray(i, i + CH));
  }
  return JSON.stringify({
    status: res.status,
    type: res.headers.get('content-type') || '',
    magic: s.slice(0, 5),
    b64: btoa(s)
  });
})()`;

// Strategy A: load the landing page, then read the PDF from that page's own origin.
async function fetchViaPageContext(cdp, job, timeoutMs) {
  const loaded = waitForLoad(cdp, timeoutMs);
  await cdp.send("Page.navigate", { url: job.page });
  await loaded;
  await sleep(1500);

  let payload;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const evaluated = await cdp.send(
        "Runtime.evaluate",
        { expression: PAGE_FETCH(job.pdf), awaitPromise: true, returnByValue: true },
        timeoutMs,
      );
      if (evaluated.exceptionDetails) {
        throw new Error(
          evaluated.exceptionDetails.exception?.description ||
            evaluated.exceptionDetails.text ||
            "page fetch threw",
        );
      }
      payload = JSON.parse(evaluated.result.value);
      if (payload.status === 200 && payload.magic === "%PDF-") return payload;
      await sleep(2000 * attempt);
    } catch (error) {
      if (attempt === 2) throw error;
      await sleep(2000 * attempt);
    }
  }
  return payload;
}

// Strategy B: navigate straight at the PDF and read the response off the wire.
async function fetchViaNavigation(cdp, job, timeoutMs) {
  const seen = [];
  const off = cdp.on("Network.responseReceived", (p) => {
    const mime = p.response?.mimeType || "";
    const url = p.response?.url || "";
    if (mime.includes("pdf") || url === job.pdf || p.type === "Document") {
      seen.push({ requestId: p.requestId, url, mime, status: p.response?.status });
    }
  });
  await cdp.send("Network.enable", {});
  const loaded = waitForLoad(cdp, timeoutMs);
  await cdp.send("Page.navigate", { url: job.pdf });
  await loaded;
  await sleep(4000);

  let best = null;
  for (const entry of seen.reverse()) {
    try {
      const body = await cdp.send("Network.getResponseBody", { requestId: entry.requestId }, 60000);
      const bytes = Buffer.from(body.body, body.base64Encoded ? "base64" : "latin1");
      if (bytes.slice(0, 5).toString("latin1") !== "%PDF-") continue;
      if (!best || bytes.length > best.bytes.length) {
        best = { bytes, entry };
      }
    } catch {
      /* body already evicted */
    }
  }
  off();
  if (!best) {
    return {
      status: seen[0]?.status ?? 0,
      type: seen[0]?.mime ?? "",
      magic: "",
    };
  }
  return { status: 200, type: "application/pdf", magic: "%PDF-", bytes: best.bytes, via: best.entry.url };
}

// Strategy C: pause the PDF response at the browser level and read its body.
// This works even when the request would otherwise be treated as a download or
// when page CSP blocks a same-origin fetch.
async function fetchViaInterception(cdp, job, timeoutMs) {
  let captured = null;
  const off = cdp.on("Fetch.requestPaused", (p) => {
    (async () => {
      try {
        if (p.responseStatusCode) {
          const body = await cdp.send("Fetch.getResponseBody", { requestId: p.requestId }, 60000);
          const bytes = Buffer.from(body.body, body.base64Encoded ? "base64" : "latin1");
          if (bytes.slice(0, 5).toString("latin1") === "%PDF-" && !captured) {
            captured = { bytes, via: p.request?.url || job.pdf };
          }
        }
      } catch {
        /* fall through to continue */
      }
      try {
        await cdp.send("Fetch.continueRequest", { requestId: p.requestId });
      } catch {
        try {
          await cdp.send("Fetch.continueResponse", { requestId: p.requestId });
        } catch {
          /* request already handled by the browser */
        }
      }
    })();
  });

  await cdp.send("Fetch.enable", {
    patterns: [{ urlPattern: job.pattern || "*", requestStage: "Response" }],
  });
  const loaded = waitForLoad(cdp, timeoutMs);
  await cdp.send("Page.navigate", { url: job.pdf });
  await loaded;
  const deadline = Date.now() + 20000;
  while (!captured && Date.now() < deadline) await sleep(500);
  off();
  await cdp.send("Fetch.disable").catch(() => {});
  if (captured) {
    return { status: 200, type: "application/pdf", magic: "%PDF-", bytes: captured.bytes, via: captured.via };
  }
  return { status: 0, type: "", magic: "" };
}

async function inspectPage(cdp, job, timeoutMs) {
  const loaded = waitForLoad(cdp, timeoutMs);
  await cdp.send("Page.navigate", { url: job.page });
  await loaded;
  await sleep(2500);
  const evaluated = await cdp.send(
    "Runtime.evaluate",
    {
      expression:
        "JSON.stringify({url: location.href, title: document.title, len: document.documentElement.outerHTML.length, head: document.documentElement.outerHTML.slice(0, 1200)})",
      returnByValue: true,
    },
    timeoutMs,
  );
  return JSON.parse(evaluated.result.value);
}

// Strategy D: let Chrome itself download the PDF into a directory we control.
async function fetchViaDownload(cdp, job, outDir, timeoutMs) {
  const before = new Set(fs.readdirSync(outDir));
  try {
    await cdp.send("Browser.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: outDir,
      eventsEnabled: true,
    });
  } catch {
    await cdp.send("Page.setDownloadBehavior", { behavior: "allow", downloadPath: outDir });
  }
  await cdp.send("Page.navigate", { url: job.pdf }).catch(() => {});

  const deadline = Date.now() + timeoutMs;
  let file = null;
  while (Date.now() < deadline) {
    const now = fs.readdirSync(outDir);
    const fresh = now.filter((f) => !before.has(f) && !f.endsWith(".crdownload"));
    if (fresh.length) {
      const candidate = path.join(outDir, fresh[0]);
      const bytes = fs.readFileSync(candidate);
      if (bytes.slice(0, 5).toString("latin1") === "%PDF-") {
        fs.rmSync(candidate, { force: true });
        file = bytes;
        break;
      }
    }
    await sleep(1000);
  }
  if (!file) return { status: 0, type: "", magic: "" };
  return { status: 200, type: "application/pdf", magic: "%PDF-", bytes: file };
}

async function discoverLinks(cdp, job, timeoutMs) {
  const loaded = waitForLoad(cdp, timeoutMs);
  await cdp.send("Page.navigate", { url: job.page });
  await loaded;
  await sleep(2500);
  const evaluated = await cdp.send(
    "Runtime.evaluate",
    {
      expression:
        "JSON.stringify({url: location.href, title: document.title, links: [...document.querySelectorAll('a')].map(a=>a.href).filter(h=>/pdf/i.test(h)).slice(0,12)})",
      returnByValue: true,
    },
    timeoutMs,
  );
  return JSON.parse(evaluated.result.value);
}

async function runJob(cdp, job, outDir, timeoutMs) {
  const result = { name: job.name, pdf: job.pdf };
  let payload = null;
  const modes = job.mode ? [job.mode] : ["intercept", "page", "navigate"];

  for (const mode of modes) {
    try {
      payload =
        mode === "navigate"
          ? await fetchViaNavigation(cdp, job, timeoutMs)
          : mode === "intercept"
            ? await fetchViaInterception(cdp, job, timeoutMs)
            : mode === "download"
              ? await fetchViaDownload(cdp, job, outDir, timeoutMs)
            : mode === "discover"
              ? { magic: "", inspects: await discoverLinks(cdp, job, timeoutMs) }
            : mode === "inspect"
              ? { magic: "", inspects: await inspectPage(cdp, job, timeoutMs) }
              : await fetchViaPageContext(cdp, job, timeoutMs);
      if (payload?.bytes || payload?.magic === "%PDF-") break;
    } catch (error) {
      result.error = String(error.message || error).slice(0, 200);
    }
  }

  if (payload?.inspects) {
    result.status = "inspected";
    result.inspects = payload.inspects;
    return result;
  }

  if (!payload || payload.magic !== "%PDF-") {
    result.status = "failed";
    result.detail = payload
      ? `http=${payload.status} type=${payload.type} magic=${JSON.stringify(payload.magic)}`
      : result.error || "no response";
    return result;
  }

  const bytes = payload.bytes || Buffer.from(payload.b64, "base64");
  const file = path.join(outDir, `${job.name}.pdf`);
  fs.writeFileSync(file, bytes);
  result.status = "downloaded";
  result.file = file;
  result.bytes = bytes.length;
  if (payload.via) result.via = payload.via;
  return result;
}

async function main() {
  const args = parseArgs(process.argv);
  const jobs = JSON.parse(fs.readFileSync(args.jobs, "utf8"));
  const outDir = path.resolve(args.out);
  fs.mkdirSync(outDir, { recursive: true });

  const chrome = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
  if (!chrome) throw new Error("No Chrome/Chromium binary found");

  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "browser-fetch-"));
  const flags = [
    `--remote-debugging-port=${args.port}`,
    `--user-data-dir=${profile}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-background-networking",
    "--disable-sync",
    "--disable-extensions",
    "--window-size=1280,1000",
    `--user-agent=${UA}`,
    "about:blank",
  ];
  if (!args.headful) flags.unshift("--headless=new");

  const child = spawn(chrome, flags, { stdio: "ignore" });
  let cdp;
  try {
    await waitForDevtools(args.port, 30000);
    const page = await findPageTarget(args.port);
    cdp = new Cdp(page.webSocketDebuggerUrl);
    await cdp.connect();
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");

    const results = [];
    for (const job of jobs) {
      results.push(await runJob(cdp, job, outDir, args.timeoutMs));
    }
    console.log(JSON.stringify({ results }, null, 2));
    const failed = results.filter((r) => r.status !== "downloaded").length;
    process.exitCode = failed ? 1 : 0;
  } finally {
    if (cdp) cdp.close();
    child.kill("SIGTERM");
  }
}

main().catch((error) => {
  console.error(`ERROR: ${error.message}`);
  process.exit(2);
});
