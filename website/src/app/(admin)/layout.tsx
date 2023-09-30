import "@/styles/globals.css"
import "vidstack/styles/defaults.css"
import "vidstack/styles/community-skin/video.css"

import { Metadata } from "next"
import { cookies } from "next/headers"
import { SidebarAdmin } from "@/layout/SidebarAdmin"
import { Role, Session, UserData } from "@/types"
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

import { localServerUrl, serverUrl } from "@/config"
import axios from "axios"
import { ToastContainer } from "react-toastify"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
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

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value
  if (!token) redirect("/login")
  let decoded = jwt.decode(token) as { id: string; role: Role }
  // let data = getUserData(session?.token)
  const session: Session = { token, id: decoded.id, role: decoded.role }
  let userData: UserData = {
    id: decoded.id,
    avatar: "",
    role: decoded.role,
    provider: "password",
    storage: 0,
  }
  try {
    const { data } = await axios.get(localServerUrl + "/session", {
      headers: { Authorization: "Bearer " + session.token },
    })
    userData = {
      id: decoded.id,
      provider: data.provider,
      avatar: data.avatar,
      role: decoded.role,
      storage: parseInt(data.storage) || 0,
    }
  } catch (error) {
    console.error(error)
  }
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
            <SetSession session={session} userData={userData} />
            <ThemeProvider attribute="class" defaultTheme="dark">
              <ToastContainer position="bottom-right" theme="dark" />
              <SidebarAdmin />
              <div className="relative  lg:ml-[240px] flex min-h-screen flex-col">
                <SiteHeaderLoggedIn />
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
