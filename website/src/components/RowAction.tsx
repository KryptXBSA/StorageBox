import { MoreHorizontal, MoreVertical, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { DeleteDialog } from "./DeleteDialog"
import { RenameDialog } from "./RenameDialog"

export function RowAction(p: {
  id: string
  horizontal?: boolean
  isFolder: boolean
  name: string
  handleDownload?: any
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {p.horizontal ? <MoreHorizontal /> : <MoreVertical />}
      </PopoverTrigger>
      <PopoverContent className="flex text-primary w-52 flex-col gap-4">
        <RenameDialog {...p} />
        <DeleteDialog {...p} />
        {/* <RenameDialog id={p.id} /> */}
      </PopoverContent>
    </Popover>
  )
}
