import { Download, MoreHorizontal, MoreVertical, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { DeleteUserDialog } from "./DeleteUserDialog"
import { RenameDialog } from "./RenameDialog"

export function RowAction(p: { id: string,username:string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreVertical />
      </PopoverTrigger>
      <PopoverContent className="flex text-primary w-52 flex-col gap-4">
        {/* <RenameDialog {...p} /> */}
        <DeleteUserDialog {...p} />
        {/* <Button */}
        {/*   variant="ghost" */}
        {/*   className="flex justify-start gap-4" */}
        {/*   onClick={p.handleDownload} */}
        {/* > */}
        {/*   <Download /> */}
        {/*   Download */}
        {/* </Button> */}
      </PopoverContent>
    </Popover>
  )
}
