import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DBT Proposal Assistant ? AI Imaging Biobank (India)',
  description:
    'An expert associate to draft a DBT-ready proposal for a national AI-enabled imaging biobank using a hub-and-spoke model for onco-pathology and infectious diseases.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <div className="container py-6">
          {children}
        </div>
      </body>
    </html>
  )
}
