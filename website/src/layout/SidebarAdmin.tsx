"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getAppState } from "@/state/state"
import { Book, Github, LayoutDashboardIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/Logo"

import { sidebarNavAdmin } from "./sidebar-nav-admin"

export function SidebarAdmin() {
  const pathname = usePathname()
  const state = getAppState()
  const [selected, setSelected] = useState(pathname)

  useEffect(() => {
    setSelected(pathname)
  }, [pathname])

  return (
    <>
      <div
        className={cn(
          !state.showSidebar
            ? "hidden"
            : "mt-16 border-t lg:border-t-0 lg:mt-0",
          "fixed z-50 lg:flex left-0 h-screen  w-60 bg-background  lg:bg-blue-700/20"
        )}
      >
        <div className="flex  w-full flex-col items-center ">
          <div>
            <Logo />
          </div>
          <Separator orientation="horizontal" className="mt-0 w-full" />
          <div className="flex  w-full flex-col overflow-auto items-center ">
            <div className="w-full  flex flex-col">
              {sidebarNavAdmin.map((i, idx) => (
                <>
                  <Btn {...i} key={i.href} />
                </>
              ))}
            </div>
          </div>
          <Separator orientation="horizontal" className="w-full" />
          <Link
            href="/documentation"
            target="_blank"
            className={cn(
              "transition-colors w-full gap-2 font-semibold px-6 py-3.5 duration-300 cursor-pointer flex flex-row items-center",
              false
                ? "bg-gradient-to-r from-blue-600/90 to-blue-600/10  hover:from-blue-600 hover:to-blue-600/20"
                : "hover:bg-blue-700/80"
            )}
          >
            <Book />
            Documentation
          </Link>
          <a
            href="https://github.com/AlandSleman/StorageBox"
            target="_blank"
            className={cn(
              "transition-colors w-full gap-2 font-semibold px-6 py-3.5  duration-300 cursor-pointer flex flex-row items-center",
              false
                ? "bg-gradient-to-r from-blue-600/90 to-blue-600/10  hover:from-blue-600 hover:to-blue-600/20"
                : "hover:bg-blue-700/80"
            )}
          >
            <Github className="" />
            Source Code
          </a>
          <Link
            href="/dashboard/"
            className={cn(
              "transition-colors w-full gap-2 font-semibold px-6 py-3.5  duration-300 cursor-pointer flex flex-row items-center",
              false
                ? "bg-gradient-to-r from-blue-600/90 to-blue-600/10  hover:from-blue-600 hover:to-blue-600/20"
                : "hover:bg-blue-700/80"
            )}
          >
            <LayoutDashboardIcon />
            User Dashboard
          </Link>
        </div>
      </div>
    </>
  )
  function Btn(p: { text: string; href: string; icon: JSX.Element }) {
    return (
      <Link
        onClick={() => setSelected(p.href)}
        href={p.href}
        className={cn(
          "transition-colors font-semibold gap-2 px-6 py-2 my-0.5 duration-300 cursor-pointer flex flex-row items-center",
          selected === p.href
            ? "bg-gradient-to-r from-blue-600/90 to-blue-600/10  hover:from-blue-600 hover:to-blue-600/20"
            : "hover:bg-blue-700/80"
        )}
      >
        {p.icon}
        {p.text}
      </Link>
    )
  }
}
function bytesToMB(bytes: number, decimalPlaces = 2) {
  if (bytes === 0) return "0 MB"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const formattedValue = parseFloat(
    (bytes / Math.pow(k, i)).toFixed(decimalPlaces)
  )

  return formattedValue + " " + sizes[i]
}
const totalSize = 500 * 1024 * 1024
function calculatePercentage(
  sizeInBytes: number,
  totalSizeInBytes = totalSize,
  decimalPlaces = 2
): number {
  if (totalSizeInBytes === 0) return 0

  const percentage = (sizeInBytes / totalSizeInBytes) * 100
  return parseFloat(percentage.toFixed(decimalPlaces))
}
