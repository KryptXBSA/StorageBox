"use client"

import { useEffect, useState } from "react"
import { newFolder } from "@/api/newFolder"
import { ErrorRes } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useStore } from "@nanostores/react"
import { useMutation } from "@tanstack/react-query"
import Uppy from "@uppy/core"
import {
  Dashboard,
  DashboardModal,
  DragDrop,
  FileInput,
  ProgressBar,
} from "@uppy/react"
import Tus from "@uppy/tus"
import { AxiosError } from "axios"
import { PlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getAppState } from "@/state/state"

const formSchema = z.object({
  name: z.string().min(1).max(255),
})
export function FloatingNewBtn() {
  const [uppy, setUppy] = useState<Uppy>()
  let token = getAppState().session?.token

  useEffect(() => {
    // Create an Uppy instance with custom headers
    const uppyInstance = new Uppy({
      id: "uppy1",
      autoProceed: false,
      debug: true,
    }).use(Tus, {
      endpoint: "http://localhost:4000/files/",
      headers: {
        dir: "4fd07ab6-872d-4def-b49e-fb4ec141be85",
        Authorization: "Bearer " + token,
      },
    })

    // Store the Uppy instance in state
    setUppy(uppyInstance)

    // Clean up the Uppy instance when the component unmounts
    return () => {
      uppy?.close()
    }
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  // let router = useRouter()
  // if (mutation.isSuccess) {
  // toast.success(mutation.data.token)
  // Cookies.set("token", mutation.data.token, { secure: true })
  // router.push("/dashboard")
  // }

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({
      name: values.name,
      parentId: "4fd07ab6-872d-4def-b49e-fb4ec141be85",
    })
  }
  const mutation = useMutation({
    mutationFn: newFolder,
    onError: (e: AxiosError<ErrorRes>) => {
      toast.error(e.response?.data.message)
      return e
    },
  })
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="rounded-full w-14 h-14">
          <PlusIcon className="scale-125" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-[500px] mb-5">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Dashboard
              uppy={uppy!}
              metaFields={[
                { id: "name", name: "Name", placeholder: "File name" },
              ]}
            />
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Form {...form}>
                <form
                  noValidate
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
