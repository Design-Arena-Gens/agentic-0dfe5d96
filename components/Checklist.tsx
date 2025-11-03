"use client"

import type { ProposalData } from '@/utils/types'

const items = [
  { id: 'title', text: 'Clear, scope-accurate title' },
  { id: 'pi', text: 'PI and Institution specified' },
  { id: 'objectives', text: 'Specific, measurable objectives' },
  { id: 'governance', text: 'Ethics, consent, and data governance' },
  { id: 'datasets', text: 'Datasets and sources identified' },
  { id: 'ai', text: 'AI methods and validation plan' },
  { id: 'wp', text: 'Work packages and milestones' },
  { id: 'budget', text: 'High-level budget rationale' },
  { id: 'risk', text: 'Risks and mitigations' },
  { id: 'impact', text: 'Expected outcomes and impact' },
]

export default function Checklist({ data, markdown }: { data: ProposalData | null; markdown: string }) {
  const checks: Record<string, boolean> = {
    title: !!data?.title,
    pi: !!data?.piName && !!data?.institution,
    objectives: !!data && data.objectives.length > 0,
    governance: !!data && !!data.governance?.consentModel && !!data.governance?.privacySafeguards,
    datasets: !!data?.datasetsAndSources,
    ai: markdown.includes('AI Methodology'),
    wp: markdown.includes('Work Packages'),
    budget: !!data?.budgetSummary || markdown.includes('Budget Summary'),
    risk: !!data && (data.risks?.length || 0) >= 0,
    impact: markdown.includes('Expected Outcomes'),
  }
  const score = Math.round((Object.values(checks).filter(Boolean).length / items.length) * 100)
  return (
    <div>
      <div className="mb-3 text-sm text-gray-600">Readiness score: <span className="font-medium text-gray-900">{score}%</span></div>
      <ul className="divide-y rounded-md border">
        {items.map((it) => (
          <li key={it.id} className="flex items-center justify-between px-3 py-2 text-sm">
            <span>{it.text}</span>
            <span className={checks[it.id] ? 'text-green-700' : 'text-gray-400'}>{checks[it.id] ? '?' : '?'}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-gray-500">This checklist is indicative and tailored to typical DBT expectations. Please align with the latest call document.</p>
    </div>
  )
}
