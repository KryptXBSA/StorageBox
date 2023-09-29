import { Download, MoreHorizontal, MoreVertical, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { DeleteUserDialog } from "./DeleteUserDialog"
import { DeleteUserFilesDialog } from "./DeleteUserFiles"
import { RenameDialog } from "./RenameDialog"

export function RowAction(p: { id: string; username: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreVertical />
      </PopoverTrigger>
      <PopoverContent className="flex text-primary w-52 flex-col gap-4">
        <DeleteUserDialog {...p} />
        <DeleteUserFilesDialog {...p} />
      </PopoverContent>
    </Popover>
  )
}
