"use client"

import { useState } from "react"
import { Book, Clock, Cloud, Github } from "lucide-react"

import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

type Section = {
  title: string
  btns: { text: string; href: string; icon: JSX.Element }[]
}

let sections: Section[] = [
  {
    title: "Test",
    btns: [
      {
        text: "Dashboardd",
        href: "/dashboardx",
        icon: <Cloud />,
      },
      {
        text: "Dashboardxzz",
        href: "/dashboardcc",
        icon: <Cloud />,
      },
    ],
  },
  {
    title: "Test",
    btns: [
      {
        text: "Dashboardnb",
        href: "/dashboardfw",
        icon: <Cloud />,
      },
      {
        text: "Dashboardd",
        href: "/dashboardzfr",
        icon: <Cloud />,
      },
    ],
  },
]
export function Sidebar() {
  const [selected, setSelected] = useState("")
  return (
    <>
      <div className="fixed left-0 flex h-screen mt-16  w-60  bg-blue-700/20">
        <div className="flex  w-full flex-col items-center">
          <p className="text-2xl">LOGO</p>
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
              <p className="text-sky-400">60%</p>
            </div>
            <Progress className="h-2 bg-black" value={10} />
            <p className="text-[13.5px] font-semibold">
              <span className="text-sky-400 font-semibold">123 MB&nbsp;</span> of
              <span className="font-semibold">&nbsp;500 MB</span>
            </p>
          </div>

          <Separator orientation="horizontal" className="w-full" />
          <div
            className={cn(
              "transition-colors w-full gap-2 font-semibold px-6 py-3.5 duration-300 cursor-pointer flex flex-row items-center",
              false
                ? "bg-gradient-to-r from-blue-600/90 to-blue-600/10  hover:from-blue-600 hover:to-blue-600/20"
                : "hover:bg-slate-800"
            )}
          >
            <Book />
            Documentation
          </div>
          <div
            className={cn(
              "transition-colors w-full gap-2 font-semibold px-6 py-3.5  duration-300 cursor-pointer flex flex-row items-center",
              false
                ? "bg-gradient-to-r from-blue-600/90 to-blue-600/10  hover:from-blue-600 hover:to-blue-600/20"
                : "hover:bg-slate-800"
            )}
          >
            <Github className="" />
            Source Code
          </div>
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
