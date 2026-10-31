---
tags:
  - 脑机接口
  - Q1
  - Nature-review-bioenginieering
年份: 2024
摘要: 严重抑郁等神经精神障碍是全球范围内导致残疾的主要原因，标准治疗包括心理治疗或药物治疗，导致许多患者失败。脑深部刺激作为一种治疗耐药病例的替代疗法具有巨大的潜力；然而，由于症状表现、神经表现和对治疗的反应的复杂性以及个体间和/或个体内的差异，提高刺激疗法对神经精神疾病的疗效受到阻碍。这些挑战促使脑机接口(BCI)的发展，这种接口可以从大脑活动中解码患者的症状状态作为反馈，从而在闭环中实现个性化的刺激治疗。在这里，我们回顾了在神经精神科治疗中开发脑机接口的进展，重点介绍了用于解码症状状态的神经生物标记物、刺激部位选择和闭合环路刺激策略。此外，我们强调了有前途的数据驱动的机器学习和系统设计方法，并提供了实现这些BCI的路线图。最后，我们回顾了目前的局限性，讨论了对其他治疗方式的扩展，并概述了所需的科学和技术进步。这些进展可以使下一代脑机接口成为可能，为治疗难治性神经精神疾病提供替代疗法。
---
# Introduction
## backgroud
1. disorder leading cause of disability
2. current treatment fail a large proportion of patients
3. highlight the need for developing alternative therapies
4. patient heterogeneity
5. personalization in patient care
## next
1. BCIs constitute a direct and potentially bi-directional pathway
2. the recorded neural activity can serve as a feedback signal
3. simulation loop or by guiding the DBS target site selection
## challenges
1. quantifying symptom-states
2. identify neural biomarkers and decode
3. selecting an effective target stimulation site 
4. designing a stimulation strategy
## concept
1. record neural activity possibly from multiple relevant cortical and subcortical brain regions
2. decoded state as a feedback signal within a stimulation strategy to adjust the stimulation dose over time

answer:when/whether to simulate; how to adjust the stimulation parameter(frequency and amplitude)

# Symptom-state biomarkers to close the loop
1. adjust the appropriate treatment dose in real time
2. detect discrete categories of symptom-state
3. decode the value of a symptom-state on a continuum
4. patient-specific or generalizable across the patient population

the reason of the diversity in the identified biomarkers
1. heterogeneity in implant locations at the level of individual electrode contact
2. heterogeneity of neural representations and/or symptom-states across patients
3. symptom-states exhibit distributed network-level representations

direction:multiregional decoding

# Behavioral assessment of symptom-states
1. questionnaires
2. audio-visual recognition methods
3. neural signatures of the functional domains

# Neural activity data
1. neuropsychiatric conditions are network disorders whose neural correlates can be distributed across multiple cortical and deep brain structures
2. limitation of DBS devices: number of sensing electrode channels and can only record from a few regions
3. semi-chronic recordings
4. limitation: the invasive nature---confounding effects biomarkers might change over time owing to variation in the disorder stage
5. inherent variability in implantation locations across patient:anatomical difference, electrode program, variability across clinics/surgeons 

# Data-driven biomarker identification
1. requires learning models: pre-processing step(Fig 2a)
2. high-dimensional neural data
3. model and aggregate temporal information
4. dynamical modeling 动态建模
	1. enable accurate decoding
	2. reduce overall model complexity
5. both spatial and temporal correlations in neural data

# Adaptive method
1. stimulation-induced plasticity 刺激诱导的可塑性 ,changes in disease stage, recording instabilities causes changes in neural biomarkers of symptom-states
2. recalibrating the biomarkers (refit the biomarker model)
3. traditional BCI adaptive methods relies on a supervision behavior signal (hard to collect the behavioral measures of symptom-states, slow dynamics)
4. unsupervised adaptive methods based on models with latent states
	1. update the parameters of a dynamical system model of neural activity directly(critical factor: learning rate)
	2. a transformation is learned to align the latent subspaces for the new neural data segment to that learned for a previous data segment

# Biomarker timescale considerations
Many biomarkers, so far, have focused on tracking short-timescale symptom-states as measured by momentary questionnaires or verbal responses from patients. REASON
1. neurostimulation causes acute symptom-state changes in minutes
2. guiding intervention with a short-timescale measure immediate symptom relief
3. closed-loop real-time stimulation strategies
4. obtaining the data to identify long-timescale biomarkers can be challenging

# Stimulation site selection
1. ideal target: demonstrate efficacy; minimal side effect
2. heterogeneity of treatment response: personalized target selection based on structural connectively, specifically white-matter tracts
	1. tractography – a brain imaging technique
	2. the structural connectivity and the change in neural activity
3. network-level representation of neuropsychiatric disorders and that stimulation site selection within the network can impact symptom-states
4. functional connectivity measures in at-rest neural activity
# Stimulation delivery strategies(Fig. 3)
1. open-loops or closed-loop; model-free or model-based
2. heterogeneity in treatment response was a challenge in larger studies of open-loop DBS

# Closed-loop on-ff strategies
1. The selection can also be made by looking at the effect of various configurations on the neural activity instead of symptom-states
2. minimize the possibility for loss of efficacy over time

# Model-based closed-loop stimulation
1. provide further closed-loop improvement
2. address multiple challenges
	1. labor and time-intensive -- predicting the neural response to stimulation
	2. use a fixed parameter configuration -- an input-output model combined with adaptive approaches
	3. response to stimulation might be complex and dependent on disease stage or internal states -- unsupervised learning of an associated set of latent state variables

# Input-output modeling of neural response
1. biophysical and biologically-inspored models 
2. a data-driven machine learning approach learned input-output dynamical system models of large-scale brain network activity during time-varying electrical stimulation
3. data collection approach
4. safe, biphasic pulse trains
5. appropriate input-output model structure  

# Toward model-based closed-loop stimulation
1. the recursive Kalman filter
2. 
# Hardware and software
# Outlook

