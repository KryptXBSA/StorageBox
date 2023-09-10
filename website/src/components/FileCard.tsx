import * as React from "react"
import { File } from "@/types"
import { FileIcon, FolderIcon } from "lucide-react"

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

export function FileCard(p: File) {
  return (
    <Card className="w-[200px] hover:bg-slate-500/50 cursor-pointer duration-300 transition-colors border-none bg-slate-500/20 h-[160px] py-2">
      <CardContent className="flex p-4 flex-col items-center justify-center">
        <FileIcon className="w-20 h-20" />
        <p className="overflow-hidden text-center w-20 truncate whitespace-nowrap text-overflow-ellipsis">
          {p.name}
        </p>
        <RowAction horizontal id={p.id} />
      </CardContent>
    </Card>
  )
}
