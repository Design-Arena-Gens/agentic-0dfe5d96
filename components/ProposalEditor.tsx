"use client"

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function ProposalEditor({ markdown }: { markdown: string }) {
  const [mode, setMode] = useState<'preview' | 'markdown'>('preview')
  return (
    <div className="mt-2">
      <div className="mb-3 flex items-center gap-2">
        <Toggle active={mode === 'preview'} onClick={() => setMode('preview')}>Preview</Toggle>
        <Toggle active={mode === 'markdown'} onClick={() => setMode('markdown')}>Markdown</Toggle>
      </div>
      <div className="prose max-w-none prose-headings:scroll-mt-20">
        {mode === 'preview' ? (
          markdown ? <ReactMarkdown>{markdown}</ReactMarkdown> : <Empty />
        ) : (
          <textarea value={markdown} readOnly rows={24} className="w-full rounded-md border-gray-300 font-mono text-sm shadow-sm" />
        )}
      </div>
    </div>
  )
}

function Toggle({ active, onClick, children }: { active?: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={active ? 'btn-primary' : 'inline-flex items-center justify-center rounded-md border px-3 py-2 text-gray-700 hover:bg-gray-50'}>
      {children}
    </button>
  )
}

function Empty() {
  return (
    <div className="rounded-md border border-dashed p-6 text-gray-500">
      Fill the form to generate your draft. You can refine sections iteratively.
    </div>
  )
}
