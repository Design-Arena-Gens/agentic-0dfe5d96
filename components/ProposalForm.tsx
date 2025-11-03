"use client"

import { useEffect, useMemo, useState } from 'react'
import type { ProposalData, Objective, Site, RiskItem } from '@/utils/types'
import clsx from 'clsx'

const DEFAULT_TITLE = 'Establishment of a National Network for AI-Enabled Imaging Biobank on Onco-pathology and Infectious Diseases: A Hub-and-Spoke Model for India-Specific Diagnostic and Prognostic Tools'

export default function ProposalForm({ onChange }: { onChange: (d: ProposalData) => void }) {
  const [title, setTitle] = useState(DEFAULT_TITLE)
  const [piName, setPiName] = useState('')
  const [institution, setInstitution] = useState('')
  const [coPIs, setCoPIs] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [summaryNotes, setSummaryNotes] = useState('')

  const [diseaseFocus, setDiseaseFocus] = useState<string[]>(['Onco-pathology', 'Tuberculosis'])
  const [imagingModalities, setImagingModalities] = useState<string[]>(['WSI', 'CT', 'X-ray', 'Ultrasound'])
  const [aiTasks, setAiTasks] = useState<string[]>(['Diagnosis', 'Prognosis', 'Triage'])
  const [objectives, setObjectives] = useState<Objective[]>([])
  const [sites, setSites] = useState<Site[]>([])
  const [risks, setRisks] = useState<RiskItem[]>([])

  const [dataStewardship, setDataStewardship] = useState('Central policy, local custodianship, audit trails')
  const [consentModel, setConsentModel] = useState('Tiered broad consent with dynamic withdrawal')
  const [privacySafeguards, setPrivacySafeguards] = useState('PHI scrubbing, k-anonymity, DP (where apt)')

  const [datasetsAndSources, setDatasetsAndSources] = useState('National cancer centres, medical colleges, TB programmes, and partner hospitals')
  const [milestones, setMilestones] = useState('')
  const [budgetSummary, setBudgetSummary] = useState('')
  const [timelineYears, setTimelineYears] = useState(3)
  const [expectedOutcomes, setExpectedOutcomes] = useState('')

  const data: ProposalData = useMemo(
    () => ({
      title,
      piName,
      institution,
      coPIs,
      email,
      phone,
      summaryNotes,
      diseaseFocus,
      imagingModalities,
      aiTasks,
      objectives,
      sites,
      governance: {
        dataStewardship,
        consentModel,
        privacySafeguards,
      },
      datasetsAndSources,
      milestones,
      risks,
      budgetSummary,
      timelineYears,
      expectedOutcomes,
    }),
    [
      title,
      piName,
      institution,
      coPIs,
      email,
      phone,
      summaryNotes,
      diseaseFocus,
      imagingModalities,
      aiTasks,
      objectives,
      sites,
      dataStewardship,
      consentModel,
      privacySafeguards,
      datasetsAndSources,
      milestones,
      risks,
      budgetSummary,
      timelineYears,
      expectedOutcomes,
    ]
  )

  useEffect(() => onChange(data), [data, onChange])

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">PI Name</label>
          <input value={piName} onChange={(e) => setPiName(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Institution</label>
          <input value={institution} onChange={(e) => setInstitution(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Co-PIs</label>
          <input value={coPIs} onChange={(e) => setCoPIs(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Summary Notes (what you want emphasized)</label>
        <textarea value={summaryNotes} onChange={(e) => setSummaryNotes(e.target.value)} rows={3} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
      </div>

      <MultiTag label="Disease Focus" value={diseaseFocus} onChange={setDiseaseFocus} placeholder="e.g., Breast cancer" />
      <MultiTag label="Imaging Modalities" value={imagingModalities} onChange={setImagingModalities} placeholder="e.g., WSI, CT" />
      <MultiTag label="AI Tasks" value={aiTasks} onChange={setAiTasks} placeholder="e.g., Risk stratification" />

      <ArrayEditor label="Objectives" placeholder="Add objective" values={objectives} onChange={setObjectives} render={(o) => o.text} create={(text) => ({ id: crypto.randomUUID(), text })} />

      <SiteEditor sites={sites} onChange={setSites} />

      <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Data Stewardship</label>
          <input value={dataStewardship} onChange={(e) => setDataStewardship(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Consent Model</label>
          <input value={consentModel} onChange={(e) => setConsentModel(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Privacy Safeguards</label>
          <input value={privacySafeguards} onChange={(e) => setPrivacySafeguards(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
        </div>
      </fieldset>

      <div>
        <label className="block text-sm font-medium text-gray-700">Datasets & Sources</label>
        <textarea value={datasetsAndSources} onChange={(e) => setDatasetsAndSources(e.target.value)} rows={2} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Milestones (Markdown)</label>
        <textarea value={milestones} onChange={(e) => setMilestones(e.target.value)} rows={3} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
      </div>

      <ArrayEditor label="Risks" placeholder="Risk ? Mitigation" values={risks} onChange={setRisks} render={(r) => `${r.risk} ? ${r.mitigation}`} create={(text) => { const [risk, ...rest] = text.split('?'); return { risk: risk?.trim() || text, mitigation: rest.join('?').trim() || 'Mitigate via SOPs and monitoring' } }} />

      <div>
        <label className="block text-sm font-medium text-gray-700">Budget Summary (Markdown)</label>
        <textarea value={budgetSummary} onChange={(e) => setBudgetSummary(e.target.value)} rows={3} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Timeline (years)</label>
          <input type="number" min={1} max={5} value={timelineYears} onChange={(e) => setTimelineYears(parseInt(e.target.value || '3'))} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Expected Outcomes</label>
          <input value={expectedOutcomes} onChange={(e) => setExpectedOutcomes(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
        </div>
      </div>
    </form>
  )
}

function MultiTag({ label, value, onChange, placeholder }: { label: string; value: string[]; onChange: (x: string[]) => void; placeholder?: string }) {
  const [input, setInput] = useState('')
  const add = () => {
    const v = input.trim()
    if (!v) return
    if (value.includes(v)) return
    onChange([...value, v])
    setInput('')
  }
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i))
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={placeholder} className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
        <button type="button" className="btn-primary" onClick={add}>Add</button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {value.map((v, i) => (
          <span key={`${v}-${i}`} className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700">
            {v}
            <button type="button" onClick={() => remove(i)} className="text-primary-700/70 hover:text-primary-700">?</button>
          </span>
        ))}
      </div>
    </div>
  )
}

function ArrayEditor<T>({ label, placeholder, values, onChange, render, create }: { label: string; placeholder: string; values: T[]; onChange: (x: T[]) => void; render: (x: T) => string; create: (text: string) => T }) {
  const [input, setInput] = useState('')
  const add = () => {
    const v = input.trim()
    if (!v) return
    onChange([...values, create(v)])
    setInput('')
  }
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i))
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={placeholder} className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
        <button type="button" className="btn-primary" onClick={add}>Add</button>
      </div>
      <ul className="mt-2 divide-y rounded-md border">
        {values.map((v, i) => (
          <li key={i} className="flex items-center justify-between px-3 py-2 text-sm">
            <span>{render(v)}</span>
            <button type="button" onClick={() => remove(i)} className="text-gray-500 hover:text-red-600">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SiteEditor({ sites, onChange }: { sites: Site[]; onChange: (x: Site[]) => void }) {
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [role, setRole] = useState<'hub' | 'spoke'>('spoke')
  const [capabilities, setCapabilities] = useState('')

  const add = () => {
    if (!name.trim()) return
    onChange([...sites, { name: name.trim(), city: city.trim() || undefined, role, capabilities: capabilities.trim() || undefined }])
    setName(''); setCity(''); setRole('spoke'); setCapabilities('')
  }
  const remove = (i: number) => onChange(sites.filter((_, idx) => idx !== i))

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Sites (Hub & Spokes)</label>
      <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-5">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:col-span-2" />
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
        <select value={role} onChange={(e) => setRole(e.target.value as any)} className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
          <option value="hub">Hub</option>
          <option value="spoke">Spoke</option>
        </select>
        <input value={capabilities} onChange={(e) => setCapabilities(e.target.value)} placeholder="Capabilities" className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
      </div>
      <div className="mt-2 flex justify-end">
        <button type="button" className="btn-primary" onClick={add}>Add Site</button>
      </div>
      {sites.length > 0 && (
        <ul className="mt-2 divide-y rounded-md border">
          {sites.map((s, i) => (
            <li key={i} className="flex items-center justify-between px-3 py-2 text-sm">
              <span className="truncate">{s.name}{s.city ? ` (${s.city})` : ''} ? {s.role.toUpperCase()} {s.capabilities ? `: ${s.capabilities}` : ''}</span>
              <button type="button" className="text-gray-500 hover:text-red-600" onClick={() => remove(i)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
