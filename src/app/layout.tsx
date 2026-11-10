import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Background3D } from '@/components/layout/Background3D'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { DemoBanner } from '@/components/layout/DemoBanner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AquaAdopt | Conservação Marinha',
  description:
    'Projeto de código aberto para conhecer e apadrinhar simbolicamente animais marinhos. Demonstração com dados fictícios.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative flex flex-col`}
      >
        <Background3D />

        <Navbar />
        <ScrollToTop />

        <div className="pt-20 flex-1">
          <DemoBanner />
          {children}
        </div>

        <Footer />
      </body>
    </html>
  )
}
