import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UserProvider } from '@/app/user-provider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import '@/styles/globals.css'
import Container from '@/components/Container'

const inter = Inter({
  weight: ['400', '600', '700'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Spotify Top 5',
  description: 'Spotify Top 5 is an application showing your monthly top 5 artists'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={inter.className}
    >
      <body>
        <UserProvider>
          <Navbar />
          <Container>
            <div className='min-h-[85vh] py-8'>{children}</div>
          </Container>
          <Footer />
        </UserProvider>
      </body>
    </html>
  )
}
