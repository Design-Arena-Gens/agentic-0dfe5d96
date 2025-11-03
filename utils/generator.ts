import type { ProposalData, GenerationOptions } from './types'

function paragraph(sentences: string[]): string {
  return sentences.filter(Boolean).join(' ')
}

function humanize(text: string, tone: GenerationOptions['tone']): string {
  if (tone === 'conversational') return text
  if (tone === 'humanized-formal') return text
  // formal: slightly tighten language
  return text
}

function list(items: string[], bullet = '-'): string {
  return items.map((i) => `${bullet} ${i}`).join('\n')
}

function heading(text: string, level = 2): string {
  return `${'#'.repeat(level)} ${text}`
}

export function generateProposal(d: ProposalData, opts: GenerationOptions): string {
  const parts: string[] = []
  const tone = opts.tone
  const title = d.title || 'Establishment of a National Network for AI-Enabled Imaging Biobank on Onco-pathology and Infectious Diseases: A Hub-and-Spoke Model for India-Specific Diagnostic and Prognostic Tools'

  // Title & Abstract
  parts.push(`# ${title}`)

  const abstract = paragraph([
    `We propose a coordinated, nation-scale imaging biobank to accelerate trustworthy AI for onco-pathology and infectious diseases using a federated hub-and-spoke model across India.`,
    `The network will curate high-quality, consented, and standards-compliant datasets spanning histopathology, radiology, and point-of-care imaging, paired with harmonized clinical descriptors.`,
    `By enabling privacy-preserving model development and rigorous multi-site validation, the programme will deliver India-specific diagnostic and prognostic tools ready for real-world use across public and private care settings.`,
  ])
  parts.push(heading('Abstract'))
  parts.push(humanize(abstract, tone))

  // Background & Rationale
  const background = paragraph([
    `India faces a dual burden of cancer and infectious diseases, with significant variation in presentation, comorbidities, and care pathways across regions.`,
    `While AI has shown promise internationally, translation stalls without representative datasets, interoperable standards, and clinical validation reflective of the Indian population.`,
    opts.includeIndiaContext
      ? `A national imaging biobank that respects India?s data governance priorities?sovereignty, security, and equitable access?can unlock robust AI models that generalize across Bharat?s linguistic, socio-economic, and infrastructural diversity.`
      : '',
  ])
  parts.push(heading('Background and Rationale'))
  parts.push(humanize(background, tone))

  // Objectives
  const objectiveLines = d.objectives.length
    ? d.objectives.map((o) => o.text)
    : [
        'Establish a hub-and-spoke imaging biobank with harmonized data standards and governance.',
        'Curate diverse, high-quality imaging datasets for onco-pathology and infectious diseases.',
        'Develop and benchmark AI pipelines for diagnosis, prognosis, and triage under Indian conditions.',
        'Validate models across multiple sites and implement MLOps for safe deployment and monitoring.',
        'Enable capacity building, reproducible research, and open standards to catalyze innovation.'
      ]
  parts.push(heading('Specific Objectives'))
  parts.push(list(objectiveLines))

  // Network Design
  const siteSummary = d.sites.length
    ? d.sites
        .map((s) => `${s.name}${s.city ? ` (${s.city})` : ''} ? ${s.role.toUpperCase()}${s.capabilities ? `: ${s.capabilities}` : ''}`)
        .join('\n')
    : 'Hub at a national reference centre; 6?10 spokes including medical colleges, cancer centres, and infectious disease hospitals across zones.'

  parts.push(heading('Network Architecture and Governance'))
  parts.push(
    humanize(
      paragraph([
        `We will implement a federated hub-and-spoke architecture enabling local data custody at spokes with centralized orchestration at the hub.`,
        `Data flow will follow a "model-to-data" paradigm where feasible, minimizing data movement and enhancing privacy.`,
        `Core services at the hub include identity and access management, schema/ontology services, QC pipelines, model registry, and monitoring.`
      ]),
      tone
    )
  )
  parts.push('**Planned sites:**\n' + siteSummary)
  parts.push(
    list([
      `Data stewardship: ${d.governance.dataStewardship || 'central policy with local custodianship and audit trails'}`,
      `Consent model: ${d.governance.consentModel || 'tiered broad consent with community engagement and dynamic withdrawal options'}`,
      `Privacy safeguards: ${d.governance.privacySafeguards || 'de-identification, PHI scrubbing, k-anonymity thresholds, differential privacy where applicable'}`,
    ])
  )

  // Data assets
  const modalities = d.imagingModalities.length ? d.imagingModalities.join(', ') : 'histopathology (WSI), radiology (CT/MRI/X-ray), ultrasound/POCUS, and digital microscopy'
  const diseases = d.diseaseFocus.length ? d.diseaseFocus.join(', ') : 'breast, head-and-neck, and GI cancers; TB, dengue, and other priority infections'
  parts.push(heading('Data Assets and Curation'))
  parts.push(
    humanize(
      paragraph([
        `We will curate multi-institutional datasets covering ${modalities}, with standardized DICOM/OME-TIFF compliance and rich clinical metadata.`,
        `Quality assurance includes scanner calibration, stain normalization (for WSI), and protocol harmonization.`,
        `Datasets will include longitudinal cohorts to enable prognostic modeling for ${diseases}.`,
        d.datasetsAndSources ? `Primary sources: ${d.datasetsAndSources}` : '',
      ]),
      tone
    )
  )

  // AI methodology
  const tasks = d.aiTasks.length ? d.aiTasks : ['detection', 'segmentation', 'grading', 'risk stratification', 'treatment response prediction']
  parts.push(heading('AI Methodology and MLOps'))
  parts.push(
    humanize(
      paragraph([
        `Model development will focus on ${tasks.join(', ')} with emphasis on robustness under domain shift and low-resource settings.`,
        `We will use reproducible pipelines (e.g., Nextflow/Snakemake), versioned datasets, and continuous evaluation across sites.`,
        `Bias and fairness audits will quantify subgroup performance; corrective actions (reweighting, domain adaptation) will be documented.`,
      ]),
      tone
    )
  )

  // Validation
  parts.push(heading('Clinical Validation and Deployment'))
  parts.push(
    humanize(
      paragraph([
        `Prospective and retrospective evaluations will be conducted with predefined endpoints (AUROC, calibration, time-to-diagnosis, workflow efficiency).`,
        `Human factors studies will ensure usability for clinicians, lab technicians, and program officers.`,
        `Deployment will follow a phased approach: sandbox ? limited release ? monitored scale-up with rollback mechanisms.`,
      ]),
      tone
    )
  )

  // Work packages
  parts.push(heading('Work Packages (WPs)'))
  parts.push(
    list([
      'WP1: Governance, standards, and ethics (policies, consent, security, interoperability)',
      'WP2: Data capture, QC, and curation across modalities and sites',
      'WP3: AI development and benchmarking with transparent reporting',
      'WP4: Clinical validation, health economics, and workflow integration',
      'WP5: Capacity building, community engagement, and dissemination',
      'WP6: Programme management, risk, and M&E (monitoring & evaluation)'
    ])
  )

  // Milestones & Timeline
  parts.push(heading('Milestones and Timeline'))
  parts.push(d.milestones || list([
    'M6: Network SOPs, ethics approvals, and pilot data flow operational',
    'M12: First multi-site curated dataset and baseline AI benchmarks',
    'M18: Prospective validation initiated at ?3 spokes',
    'M24: Interim impact readout and scale-up readiness review',
    'M36: Validated tools with deployment playbooks and handover plan',
  ]))
  parts.push(`\n**Proposed duration:** ${d.timelineYears || 3} years`)

  // Budget summary
  parts.push(heading('Budget Summary (High-Level)'))
  parts.push(d.budgetSummary || list([
    'Capital: scanners, compute, secure storage, and networking',
    'Operational: personnel, maintenance, consumables, and training',
    'Software & Cloud: secure hosting, licenses, and observability',
    'Contingency and outreach: 5?10% for risk, community engagement',
  ]))

  // Risks
  parts.push(heading('Risks and Mitigations'))
  if (d.risks.length) {
    parts.push(list(d.risks.map((r) => `${r.risk} ? Mitigation: ${r.mitigation}`)))
  } else {
    parts.push(list([
      'Data heterogeneity ? SOP harmonization, calibration, and domain adaptation',
      'Ethics delays ? early engagement, template packages, rolling submissions',
      'Privacy concerns ? federated learning and strong de-identification',
      'Model drift ? continuous monitoring and scheduled revalidation',
    ]))
  }

  // Expected outcomes & Impact
  parts.push(heading('Expected Outcomes and Impact'))
  parts.push(
    humanize(
      paragraph([
        d.expectedOutcomes ||
          'Validated AI tools for Indian care settings, reusable datasets and standards, capacity building across the network, and evidence for improved diagnostic pathways.',
        'Outputs will be transferred with clear licensing, documentation, and operations playbooks to support sustainable adoption in national programmes.',
      ]),
      tone
    )
  )

  // Team & Management
  parts.push(heading('Team, Roles, and Programme Management'))
  parts.push(
    humanize(
      paragraph([
        `PI: ${d.piName || 'To be finalized'}; Institution: ${d.institution || '?'}; Co-PIs: ${d.coPIs || '?'}.`,
        'A central PMO will coordinate execution, reporting, and risk tracking with dashboards and monthly reviews.',
        'An independent Scientific and Ethics Advisory Board will provide oversight and course correction.',
      ]),
      tone
    )
  )

  // Annexes
  parts.push(heading('Annexes (Illustrative)'))
  parts.push(list([
    'SOP compendium and data dictionaries',
    'Model cards and validation reports',
    'Gantt chart and RACI matrix',
    'Letters of support and site readiness assessments',
  ]))

  // Contact
  const contact = [d.email ? `Email: ${d.email}` : '', d.phone ? `Phone: ${d.phone}` : ''].filter(Boolean).join(' | ')
  if (contact) {
    parts.push(heading('Contact'))
    parts.push(contact)
  }

  return parts.join('\n\n')
}
