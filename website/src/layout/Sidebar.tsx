"use client"

import { useState } from "react"
import Link from "next/link"
import { $session } from "@/session/session"
import { useStore } from "@nanostores/react"
import { Book, Clock, Cloud, Github, LayoutDashboardIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/Logo"

type Section = {
  title: string
  btns: { text: string; href: string; icon: JSX.Element }[]
}

let sections: Section[] = [
  {
    title: "Dashboard",
    btns: [
      {
        text: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboardIcon />,
      },
    ],
  },
]
export function Sidebar() {
  const data = useStore($session)
  const [selected, setSelected] = useState("/dashboard")
  return (
    <>
      <div className="fixed left-0 flex h-screen  w-60  bg-blue-700/20">
        <div className="flex  w-full flex-col items-center ">
          <Logo />
          <Separator orientation="horizontal" className="mt-0 w-full" />
          <div className="flex  w-full flex-col overflow-auto items-center ">
            <div className="w-full  flex flex-col">
              {sections.map((section, idx) => (
                <>
                  <h4
                    key={section.title}
                    className="text-slate-400 px-4 mb-1 font-medium"
                  >
                    {section.title}
                  </h4>
                  {section.btns.map((i) => (
                    <Btn {...i} key={i.href} />
                  ))}
                  {idx !== sections.length - 1 && (
                    <Separator orientation="horizontal" className="w-full" />
                  )}
                </>
              ))}
            </div>
            <Separator orientation="horizontal" className="w-full" />

            <div className="flex w-full px-4 flex-col gap-1.5">
              <div className="flex text-slate-400 font-medium justify-between">
                <p>Storage</p>
                <p className="text-sky-400">
                  {calculatePercentage(data?.storage!)}%
                </p>
              </div>
              <Progress
                className="h-2 bg-black"
                value={calculatePercentage(data?.storage!)}
              />
              <p className="text-[13.5px] font-semibold">
                <span className="text-sky-400 font-semibold">
                  {bytesToMB(data?.storage!)}&nbsp;
                </span>{" "}
                of
                <span className="font-semibold">&nbsp;500 MB</span>
              </p>
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
                : "hover:bg-slate-800"
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
                : "hover:bg-slate-800"
            )}
          >
            <Github className="" />
            Source Code
          </a>
        </div>
      </div>
    </>
  )
  function Btn(p: { text: string; href: string; icon: JSX.Element }) {
    return (
      <div
        onClick={() => setSelected(p.href)}
        className={cn(
          "transition-colors font-semibold gap-2 px-6 py-2 my-0.5 duration-300 cursor-pointer flex flex-row items-center",
          selected === p.href
            ? "bg-gradient-to-r from-blue-600/90 to-blue-600/10  hover:from-blue-600 hover:to-blue-600/20"
            : "hover:bg-slate-800"
        )}
      >
        {p.icon}
        {p.text}
      </div>
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
