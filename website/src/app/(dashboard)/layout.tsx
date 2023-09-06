import "@/styles/globals.css"
import { Metadata } from "next"
import { cookies } from "next/headers"
import { Sidebar } from "@/layout/Sidebar"

// import { SetSession } from "@/state/session"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
// import { getServerSession } from "@/lib/session"
import { cn } from "@/lib/utils"
import { FloatingNewBtn } from "@/components/FloatingNewBtn"
import { ReactQueryProvider } from "@/components/ReactQueryProvider"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    // icon: "/favicon.ico",
    // shortcut: "/favicon-16x16.png",
    // apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  // let session = getServerSession(cookies())
  // let userData = null
  // if (session?.token) userData = getUserData(session?.token)
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ReactQueryProvider>
            {/* <SetSession userData={{ id: "s" }} session={session} /> */}
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="absolute bottom-20 right-20 z-10 flex flex-row items-center gap-3">
                <FloatingNewBtn />
              </div>
              <div className="relative flex min-h-screen flex-col">
                <Sidebar />
                <SiteHeader />
                <main className="ml-60 flex-1">{children}</main>
              </div>
              <TailwindIndicator />
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </>
  )
}
