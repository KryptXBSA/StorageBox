import "@/styles/globals.css"
import { Metadata } from "next"
import { cookies } from "next/headers"
import { Sidebar } from "@/layout/Sidebar"
import { Session } from "@/types"
import jwt from "jsonwebtoken"

import "@uppy/core/dist/style.css"
import "@uppy/dashboard/dist/style.css"
import "@uppy/drag-drop/dist/style.css"
import "@uppy/file-input/dist/style.css"
import "@uppy/progress-bar/dist/style.css"
import { redirect } from "next/navigation"
import { SiteHeaderLoggedIn } from "@/layout/SiteHeaderLoggedIn"
import { SetSession } from "@/session/SetSession"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

// import { SetSession } from "@/state/session"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
// import { getServerSession } from "@/lib/session"
import { cn } from "@/lib/utils"
import { FloatingNewBtn } from "@/components/FloatingNewBtn"
import { ReactQueryProvider } from "@/components/ReactQueryProvider"
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
  // const cookieStore = cookies()
  // const token = cookieStore.get("token")?.value
  // if (!token) redirect("/login")
  // let decoded = jwt.decode(token) as { id: string }
  // // let data = getUserData(session?.token)
  // const session: Session = { token, id: decoded.id,storage:1000000 }
  // let userData = null
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
            {/* <SetSession session={session} /> */}
            <ThemeProvider attribute="class" defaultTheme="dark">
              <ToastContainer position="bottom-right" theme="dark" />
              <div className="absolute bottom-20 right-20 z-10 flex flex-row items-center gap-3">
                {/* <FloatingNewBtn /> */}
              </div>
              <div
                className="relative ml-auto flex min-h-screen flex-col"
              >
                <main className="flex-1">{children}</main>
              </div>
              <TailwindIndicator />
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </>
  )
}
