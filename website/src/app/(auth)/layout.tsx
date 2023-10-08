import "@/styles/globals.css"
import { Metadata } from "next"
import "@uppy/core/dist/style.css"
import "@uppy/dashboard/dist/style.css"
import "@uppy/drag-drop/dist/style.css"
import "@uppy/file-input/dist/style.css"
import "@uppy/progress-bar/dist/style.css"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ReactQueryProvider } from "@/components/ReactQueryProvider"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

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
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ReactQueryProvider>
            {/* <SetSession session={session} /> */}
            <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
              <ToastContainer position="bottom-right" theme="dark" />
              <div className="absolute bottom-20 right-20 z-10 flex flex-row items-center gap-3">
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
