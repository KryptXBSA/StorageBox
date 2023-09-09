"use client"

import { useState } from "react"
import { Clock, Cloud } from "lucide-react"

import { cn } from "@/lib/utils"
import { SidebarButton } from "@/components/ui/SidebarButton"
import { Separator } from "@/components/ui/separator"

export function Sidebar() {
  const [selected, setSelected] = useState(0)
  return (
    <>
      <div className="fixed left-0 flex h-screen mt-16  w-60  bg-secondary">
        <div className="flex  w-full flex-col items-start   py-10">
          <div className="w-full px-4 flex flex-col">
            <h4 className="text-slate-400 font-medium">Dashboard</h4>
            <SidebarButton
              className="w-full h-10 flex justify-start p-4"
              variant="ghost"
            >
              <Cloud className="mr-2" />
              My Box
            </SidebarButton>
          </div>
          <Separator orientation="horizontal" className="w-full" />

          <div className="w-full  flex flex-col">
            <h4 className="text-slate-400 px-4 mb-1 font-medium">Dashboard</h4>
            {[1, 2, 3, 4].map((_, idx) => (
              <div
                onClick={() => setSelected(idx)}
                className={cn(
                  "transition-colors font-semibold px-6 py-2 my-0.5 duration-300 cursor-pointer flex flex-row items-center",
                  selected === idx
                    ? "bg-gradient-to-r from-blue-600/90 to-blue-600/10  hover:from-blue-600 hover:to-blue-600/20"
                    : "hover:bg-slate-800"
                )}
              >
                <Cloud className="mr-2" />
                Dashboard
              </div>
            ))}
          </div>

          <div className="w-full px-4 flex flex-col gap-2">
            <h4 className="text-slate-400 font-medium">File manager</h4>

            {[1, 2, 3, 4].map(() => (
              <SidebarButton
                className="w-full h-10 flex justify-start p-4"
                variant="ghost"
              >
                <Cloud className="mr-2" />
                My Box
              </SidebarButton>
            ))}
          </div>

          <Separator orientation="horizontal" className="w-full" />

          <div className="w-full px-4 flex flex-col">
            <h4 className="text-slate-400 font-medium">Team Storage</h4>

            {[1, 2, 3, 4].map(() => (
              <SidebarButton
                className="w-full h-10 flex justify-start p-4"
                variant="ghost"
              >
                <Cloud className="mr-2" />
                My Box
              </SidebarButton>
            ))}
            <SidebarButton
              className="w-full h-10 flex justify-start p-4"
              variant="active"
            >
              <Clock className="mr-2" />
              My Box
            </SidebarButton>
          </div>
        </div>
      </div>
    </>
  )
}
