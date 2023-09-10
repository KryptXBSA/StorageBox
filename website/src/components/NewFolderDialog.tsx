import { useState } from "react"
import { getData } from "@/api/getData"
import { newFolder } from "@/api/newFolder"
import { useDataStore } from "@/state/data"
import { ErrorRes } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Pencil, PlusCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
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
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  name: z.string().min(1).max(255),
})

export function NewFolderDialog({ id }: { id: string }) {
  let state = useDataStore()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const mutation = useMutation({
    mutationFn: newFolder,
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({ name: values.name, parentId: id })
    form.reset()
    if (mutation.isSuccess) {
      getData().then((d) => {
        state.setFiles(d.files)
        state.setFolders(d.folders)
        console.log("aa", state)
      })
      setTimeout(() => {
      toast.success("Success")
        setOpen(false)
      }, 400)
    } else {
      setOpen(false)
      form.reset()
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={(e) => e.stopPropagation()}
          variant="ghost"
          className=" flex gap-2"
        >
          <PlusCircle className="scale-125 text-green-400" /> Create Folder
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <DialogHeader>
              <DialogTitle>New Folder</DialogTitle>
            </DialogHeader>
            <div className="grd ap-4 ">
              <div className="gri grd-cols-4 itemscenter ap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="destructive" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="outline" type="submit">
                Create Folder
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
