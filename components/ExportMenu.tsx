"use client"

import { exportDocx } from '@/utils/export'

export default function ExportMenu({ disabled, title, markdown }: { disabled?: boolean; title: string; markdown: string }) {
  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.replace(/\s+/g, '_')}.md`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const downloadDocx = async () => {
    await exportDocx(title, markdown)
  }

  return (
    <div className="flex items-center gap-2">
      <button disabled={disabled} onClick={downloadMarkdown} className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50">Download .md</button>
      <button disabled={disabled} onClick={downloadDocx} className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50">Download .docx</button>
    </div>
  )
}
