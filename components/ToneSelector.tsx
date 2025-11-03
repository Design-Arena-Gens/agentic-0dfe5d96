"use client"

import type { GenerationOptions } from '@/utils/types'

export default function ToneSelector({ value, onChange }: { value: GenerationOptions; onChange: (v: GenerationOptions) => void }) {
  return (
    <div className="flex items-center gap-2">
      <select
        className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        value={value.tone}
        onChange={(e) => onChange({ ...value, tone: e.target.value as GenerationOptions['tone'] })}
      >
        <option value="humanized-formal">Humanized formal</option>
        <option value="formal">Formal</option>
        <option value="conversational">Conversational</option>
      </select>
      <select
        className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        value={value.depth}
        onChange={(e) => onChange({ ...value, depth: e.target.value as GenerationOptions['depth'] })}
      >
        <option value="concise">Concise</option>
        <option value="standard">Standard</option>
        <option value="comprehensive">Comprehensive</option>
      </select>
      <label className="inline-flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={value.includeIndiaContext}
          onChange={(e) => onChange({ ...value, includeIndiaContext: e.target.checked })}
          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
        India-specific context
      </label>
    </div>
  )
}
