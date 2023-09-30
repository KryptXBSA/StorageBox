import { MoreVertical } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { DeleteFileDialog } from "./DeleteFileDialog"

export function RowAction(p: { id: string; name: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreVertical />
      </PopoverTrigger>
      <PopoverContent className="flex text-primary w-52 flex-col gap-4">
        <DeleteFileDialog {...p} />
      </PopoverContent>
    </Popover>
  )
}
