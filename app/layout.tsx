import type { Metadata } from 'next'
import './globals.css'
import StoreProvider from '@/lib/redux/provider'

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
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Questrial:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-questrial">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
