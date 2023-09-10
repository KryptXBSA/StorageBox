import * as React from "react"
import { Folder } from "@/types"
import { FolderIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { RowAction } from "./RowAction"

export function FolderCard(p: Folder & { selectFolder: any }) {
  return (
    <Card
      className="w-[200px] hover:bg-slate-500/50 cursor-pointer duration-300 transition-colors h-[160px] border-none bg-slate-500/20  py-2"
    >
      <CardContent className="flex flex-col p-4 items-center justify-center">
        <FolderIcon
      onClick={() => p.selectFolder(p.id)}
          className="w-20 h-20" />
        <p className=" text-center overflow-hidden  w-20 truncate whitespace-nowrap text-overflow-ellipsis">{p.name}</p>
        <RowAction horizontal id={p.id} />
      </CardContent>
    </Card>
  )
}
