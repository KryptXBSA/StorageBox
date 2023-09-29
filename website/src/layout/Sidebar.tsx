"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getAppState } from "@/state/state"
import { Book, Github, LayoutDashboardIcon } from "lucide-react"

import { bytesToMB, calculatePercentage, cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/Logo"

import { sidebarNav } from "./sidebar-nav"

export function Sidebar() {
  const pathname = usePathname()
  const state = getAppState()
  const [selected, setSelected] = useState(pathname)
  let storage = state?.userData?.storage || 0

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
              {sidebarNav.map((section, idx) => (
                <>
                  <h4
                    key={idx}
                    className="text-slate-400 px-4 mb-1 font-medium"
                  >
                    {section.title}
                  </h4>
                  {section.btns.map((i) => (
                    <Btn {...i} key={i.href} />
                  ))}
                  {idx !== sidebarNav.length - 1 && (
                    <Separator orientation="horizontal" className="w-full" />
                  )}
                </>
              ))}
            </div>
          </div>
          <Separator orientation="horizontal" className="w-full" />
          <div className="flex w-full px-4 flex-col gap-1.5">
            <div className="flex text-slate-400 font-medium justify-between">
              <p>Storage</p>
              <p className="text-sky-400">{calculatePercentage(storage)}%</p>
            </div>
            <Progress
              className="h-2 bg-black"
              value={calculatePercentage(storage)}
            />
            <p className="text-[13.5px] font-semibold">
              <span className="text-sky-400 font-semibold">
                {bytesToMB(storage)}&nbsp;
              </span>{" "}
              of
              <span className="font-semibold">&nbsp;500 MB</span>
            </p>
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
            href="/admin"
            className={cn(
              "transition-colors w-full gap-2 font-semibold px-6 py-3.5  duration-300 cursor-pointer flex flex-row items-center",
              false
                ? "bg-gradient-to-r from-blue-600/90 to-blue-600/10  hover:from-blue-600 hover:to-blue-600/20"
                : "hover:bg-blue-700/80"
            )}
          >
            <LayoutDashboardIcon />
            Admin Dashboard
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
