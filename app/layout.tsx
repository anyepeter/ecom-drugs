import type { Metadata } from 'next'
import './globals.css'
import StoreProvider from '@/lib/redux/provider'
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'ZMARTIES - Official Page',
  description: 'Official ZMARTIES page - Free shipping on every order!',
  icons: {
    icon: '/images/logo.avif',
    shortcut: '/images/logo.avif',
    apple: '/images/logo.avif',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Questrial:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-questrial">
        <StoreProvider>
          <Toaster position="top-center" richColors />
          <Analytics/>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
