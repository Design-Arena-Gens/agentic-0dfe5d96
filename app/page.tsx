"use client"

import { useMemo, useState } from 'react'
import ProposalForm from '@/components/ProposalForm'
import ProposalEditor from '@/components/ProposalEditor'
import Checklist from '@/components/Checklist'
import ExportMenu from '@/components/ExportMenu'
import ToneSelector from '@/components/ToneSelector'
import { generateProposal } from '@/utils/generator'
import type { ProposalData, GenerationOptions } from '@/utils/types'

export default function Page() {
  const [data, setData] = useState<ProposalData | null>(null)
  const [options, setOptions] = useState<GenerationOptions>({
    tone: 'humanized-formal',
    depth: 'comprehensive',
    includeIndiaContext: true,
  })

  const markdown = useMemo(() => {
    return data ? generateProposal(data, options) : ''
  }, [data, options])

  return (
    <main className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">DBT Proposal Assistant</h1>
          <p className="text-gray-600">National network for AI-enabled imaging biobank ? Hub & Spoke (India)</p>
        </div>
        <ToneSelector value={options} onChange={setOptions} />
      </header>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-4">
          <ProposalForm onChange={setData} />
        </div>
        <div className="space-y-4">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Draft</h2>
              <ExportMenu disabled={!markdown} title={data?.title || 'DBT_Proposal_Draft'} markdown={markdown} />
            </div>
            <ProposalEditor markdown={markdown} />
          </div>
          <div className="card p-4">
            <h2 className="text-lg font-medium text-gray-900">DBT Compliance Checklist</h2>
            <Checklist data={data} markdown={markdown} />
          </div>
        </div>
      </section>
    </main>
  )
}
