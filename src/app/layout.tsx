import type { Metadata } from 'next'
import { Providers } from '@/store/provider'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/theme'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'User Management',
  description: 'User management app built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <Providers>
              {children}
            </Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
