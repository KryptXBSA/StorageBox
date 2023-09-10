import * as React from "react"
import { File } from "@/types"
import { FileIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

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
