"use client"

import { useEffect, useRef, useState } from "react"
import { apiUrl } from "@/config"
import { $session } from "@/session/session"
import { useDataStore } from "@/state/data"
import { zodResolver } from "@hookform/resolvers/zod"
import { useStore } from "@nanostores/react"
import Uppy from "@uppy/core"
import { FileInput } from "@uppy/react"
import Tus from "@uppy/tus"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  currentPassowrd: z.string().min(1).max(255),
  newPassowrd: z.string().min(1).max(255),
})

export default function Page() {
  const [uppy, setUppy] = useState<Uppy>()
  let session = useStore($session)
  const fileInputRef = useRef<HTMLInputElement>(null) // Create a ref for the file input element
  const store = useDataStore()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  useEffect(() => {
    const uppyInstance = new Uppy({
      id: "uppy1",
      autoProceed: false,
      debug: true,
    }).use(Tus, {
      endpoint: apiUrl + "/files/",
      headers: {
        Authorization: "Bearer " + session?.token,
        dir: session?.id!,
      },
    })

    // Store the Uppy instance in state
    setUppy(uppyInstance)

    // Clean up the Uppy instance when the component unmounts
    return () => {
      uppy?.close()
    }
  }, [])

  if (!uppy) return <></>

  // Function to handle file input change
  const handleFileInputChange = () => {
    const fileInput = fileInputRef.current
    if (fileInput && fileInput.files && fileInput.files[0]) {
      let file = fileInput.files[0]
      uppy.addFile({ data: file, name: file.name })
      uppy.upload()
    }
  }
  return (
    <section className="p-14">
      <div className="flex justify-around w-full">
        <div className="flex w-[30%]  items-center gap-4 p-8 rounded-lg flex-col bg-secondary">
          <h3 className="text-2xl font-semibold tracking-tight">
            Account Information
          </h3>
          <div className="flex items-center justify-start gap-4 px-4 w-full">
            <Avatar className="w-14 h-14 self-start ">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Change Avatar</Label>
              <Input
                ref={fileInputRef}
                id="picture"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleFileInputChange}
              />
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input disabled placeholder="Email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input disabled placeholder="Username" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username">First Name</Label>
            <Input disabled placeholder="Last Name" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username">First Name</Label>
            <Input disabled placeholder="First Name" />
          </div>
          <Button className="self-start ml-4">Save</Button>
        </div>

          <Form {...form}>
            <form
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-[30%]  items-center gap-4 p-8 rounded-lg flex-col bg-secondary"
            >
          <h3 className="text-2xl font-semibold tracking-tight">Passowrd</h3>
              <FormField
                control={form.control}
                name="currentPassowrd"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Current Passowrd</FormLabel>
                    <FormControl>
                      <Input  type="password"{...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassowrd"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>New Passowrd</FormLabel>
                    <FormControl>
                      <Input type="password"   {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">Submit</Button>
            </form>
          </Form>
      </div>
    </section>
  )
}
