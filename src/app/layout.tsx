import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'getmygit - Visual GitHub Repository Explainer',
  description: 'Interactive visual architecture flowcharts for GitHub repositories.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {/* Header placeholder */}
          <header className="glass-panel sticky top-0 z-50 w-full border-b border-white/10">
            <div className="container flex h-14 items-center">
              <div className="mr-4 flex">
                <span className="font-bold text-lg tracking-tight px-4">getmygit</span>
              </div>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
