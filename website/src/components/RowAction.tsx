
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MoreVertical, Pencil } from "lucide-react"

export function RowAction() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreVertical/>
      </PopoverTrigger>
      <PopoverContent className="flex text-primary w-52 flex-col gap-4">
        <Button variant="ghost" className="flex justify-start gap-4"><Pencil/>Rename</Button>
        <Button variant="ghost" className="flex justify-start gap-4"><Pencil/>Download</Button>
        <Button variant="ghost" className="flex justify-start gap-4"><Pencil/>aaaaaaaaaa</Button>
        <Button variant="ghost" className="flex justify-start gap-4"><Pencil/>xxxxxxxxxxxxxd</Button>
      </PopoverContent>
    </Popover>
  )
}
