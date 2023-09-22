import * as React from "react"
import { Folder } from "@/types"
import { FolderIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export function AlbumCard(p: { name: string }) {
  return (
    <Card className="w-[200px] hover:bg-slate-500/50 cursor-pointer duration-300 transition-colors h-[160px] border-none bg-slate-500/20  py-2">
      <CardContent className="flex flex-col p-4 items-center justify-center">
        <FolderIcon className="w-20 h-20" />
        <p className=" text-center overflow-hidden  w-20 truncate whitespace-nowrap text-overflow-ellipsis">
          {p.name}
        </p>
      </CardContent>
    </Card>
  )
}
