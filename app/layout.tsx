import type { Metadata } from 'next'
import { Questrial } from 'next/font/google'
import './globals.css'
import StoreProvider from '@/lib/redux/provider'

const questrial = Questrial({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-questrial',
})

export const metadata: Metadata = {
  title: 'ZMARTIES - Official Page',
  description: 'Official ZMARTIES page - Free shipping on every order!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${questrial.variable}`}>
      <body className="font-sans">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
