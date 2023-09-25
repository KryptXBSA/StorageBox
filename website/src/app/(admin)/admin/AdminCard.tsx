import * as React from "react"
import { UsersIcon } from "lucide-react"

export function AdminCard(p: {
  text1: string
  text2: string
  icon: JSX.Element
}) {
  return (
    <div className="w-48 hover:bg-secondary/80 cursor-pointer duration-300 transition-colors bg-secondary rounded-md flex flex-col  items-center  p-4">
      <div className="flex">{p.icon}</div>
      <div className="flex flex-col justify-center items-center">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {p.text1}
        </h3>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {p.text2}
        </h4>
      </div>
    </div>
  )
}
