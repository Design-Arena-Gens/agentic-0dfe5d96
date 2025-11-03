export type Objective = { id: string; text: string }
export type Site = { name: string; role: 'hub' | 'spoke'; city?: string; capabilities?: string }
export type RiskItem = { risk: string; mitigation: string }

export type ProposalData = {
  title: string
  piName: string
  institution: string
  coPIs?: string
  email?: string
  phone?: string
  summaryNotes?: string
  diseaseFocus: string[]
  imagingModalities: string[]
  aiTasks: string[]
  objectives: Objective[]
  sites: Site[]
  governance: {
    dataStewardship: string
    consentModel: string
    privacySafeguards: string
  }
  datasetsAndSources: string
  milestones: string
  risks: RiskItem[]
  budgetSummary: string
  timelineYears: number
  expectedOutcomes: string
}

export type GenerationOptions = {
  tone: 'humanized-formal' | 'formal' | 'conversational'
  depth: 'concise' | 'standard' | 'comprehensive'
  includeIndiaContext: boolean
}
