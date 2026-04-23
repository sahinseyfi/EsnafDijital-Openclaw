import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'EsnafDigital Yönetim',
  description: 'EsnafDigital iç operasyon paneli',
}

const themeBootstrap = `(function () {
  try {
    var storageKey = 'esnafdijital-admin-theme'
    var stored = window.localStorage.getItem(storageKey)
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    var theme = stored === 'dark' || stored === 'light' ? stored : (prefersDark ? 'dark' : 'light')
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  } catch (error) {
    document.documentElement.dataset.theme = 'light'
    document.documentElement.style.colorScheme = 'light'
  }
}())`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.variable}>
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {themeBootstrap}
        </Script>
        {children}
      </body>
    </html>
  )
}
