import { Document, Packer, Paragraph, HeadingLevel, TextRun } from 'docx'

function mdToDocxParagraphs(md: string): Paragraph[] {
  const lines = md.split(/\r?\n/)
  const paras: Paragraph[] = []
  for (const line of lines) {
    if (!line.trim()) {
      paras.push(new Paragraph({ text: '' }))
      continue
    }
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const text = headingMatch[2]
      const map: Record<number, any> = {
        1: HeadingLevel.TITLE,
        2: HeadingLevel.HEADING_2,
        3: HeadingLevel.HEADING_3,
        4: HeadingLevel.HEADING_4,
        5: HeadingLevel.HEADING_5,
        6: HeadingLevel.HEADING_6,
      }
      // Casting due to docx HeadingLevel being a runtime enum
      paras.push(new Paragraph({ text, heading: (map as any)[level] || HeadingLevel.HEADING_2 }))
      continue
    }
    if (line.startsWith('- ')) {
      paras.push(new Paragraph({ text: line.replace(/^-\s+/, '? ') }))
      continue
    }
    paras.push(new Paragraph({ children: [new TextRun(line)] }))
  }
  return paras
}

export async function exportDocx(title: string, markdown: string) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: mdToDocxParagraphs(`# ${title}\n\n${markdown}`),
      },
    ],
  })
  const blob = await Packer.toBlob(doc)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${title.replace(/\s+/g, '_')}.docx`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
