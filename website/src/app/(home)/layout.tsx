import "@/styles/globals.css"
import { Metadata } from "next"
import { SiteHeader } from "@/layout/SiteHeader"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ReactQueryProvider } from "@/components/ReactQueryProvider"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

import { meta } from "@/config/meta"

export const metadata:Metadata=meta

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-gradient-to-r from-background via-slate-900 to-slate-950 font-sans antialiased",
            fontSans.variable
          )}
        >
          <ReactQueryProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
              <ToastContainer position="bottom-right" theme="dark" />
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <div className="flex-1">{children}</div>
              </div>
              <TailwindIndicator />
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </>
  )
}
