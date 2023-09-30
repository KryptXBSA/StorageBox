import { useEffect, useState } from "react"
import { deleteUser } from "@/api/deleteUser"
import { deleteUserFiles } from "@/api/deleteUserFiles"
import { ErrorRes } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Trash } from "lucide-react"
import { toast } from "react-toastify"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteFile } from "@/api/deleteFile"

export function DeleteFileDialog(p: { id: string; name: string }) {
  const mutation = useMutation({
    mutationFn: deleteFile,
    onError: (e: AxiosError<ErrorRes>) => {
      toast.error(e.response?.data.message)
      return e
    },
  })

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success("Success")
    }
  }, [mutation.isLoading])

  const [open, setOpen] = useState<boolean>()

  function del() {
    mutation.mutate({ id: p.id })
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={(e) => e.stopPropagation()}
          variant="ghost"
          className="flex justify-start gap-4"
        >
          <Trash />
          Delete File
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete {p.name} </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant="ghost">
            Cancel
          </Button>
          <Button onClick={del} variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
