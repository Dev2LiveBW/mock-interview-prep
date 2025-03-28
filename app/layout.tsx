import type { Metadata } from 'next'
import { Mona_Sans } from 'next/font/google'
import './globals.css'

const monaSans = Mona_Sans({
  variable: '--font-mona-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'InterPrep',
  description: 'An AI Powereded Intervie Platform Built by M.A Motlhagodi',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.className}antialiased`}>{children}</body>
    </html>
  )
}
