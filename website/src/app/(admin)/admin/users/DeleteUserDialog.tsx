import { useEffect, useState } from "react"
import { deleteItem } from "@/api/delete"
import { getData } from "@/api/getData"
import { renameItem } from "@/api/rename"
import { getAppState, updateAppState } from "@/state/state"
import { ErrorRes } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Pencil, Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  name: z.string().min(1).max(255),
})

export function DeleteUserDialog(p: { id: string; username: string }) {
  const mutation = useMutation({
    mutationFn: deleteItem,
    onError: (e: AxiosError<ErrorRes>) => {
      toast.error(e.response?.data.message)
      return e
    },
  })

  // let router = useRouter()
  // if (mutation.isSuccess) {
  // toast.success(mutation.data.token)
  // Cookies.set("token", mutation.data.token, { secure: true })
  // router.push("/dashboard")
  // }

  const [open, setOpen] = useState<boolean>()

  useEffect(() => {
    if (mutation.isSuccess) {
      updateAppState({ folders: mutation.data.folders })
      updateAppState({ files: mutation.data.files })
      toast.success("Success")
    }
  }, [mutation.isLoading])
  function del() {
    // mutation.mutate({ id: p.id, isFolder: p.isFolder })
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
          Delete User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete {p.username} </DialogTitle>
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
