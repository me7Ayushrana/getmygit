import type { Metadata, Viewport } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { SmoothScroll } from '@/components/SmoothScroll'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'getmygit - Visual Codebase Explorer',
  description: 'Visualize any GitHub repository instantly. Explore architecture, dependencies, and code structure in a cinematic visual experience.',
  keywords: ['github', 'repository', 'visualizer', 'architecture', 'code explorer', 'developer tools'],
  openGraph: {
    title: 'getmygit - Visual Codebase Explorer',
    description: 'Visualize any GitHub repository instantly.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#020010',
}

import { ThemeProvider } from '@/components/theme/ThemeProvider'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect for faster resource loading */}
        <link rel="preconnect" href="https://api.github.com" />
        <link rel="preconnect" href="https://img.shields.io" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />
      </head>
      <body className={`${inter.variable} ${orbitron.variable} font-sans antialiased bg-[#fafafa] dark:bg-void text-gray-900 dark:text-white transition-colors duration-500`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>

          <AuthProvider>
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
