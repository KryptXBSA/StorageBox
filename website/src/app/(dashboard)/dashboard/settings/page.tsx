"use client"

import { useEffect, useRef, useState } from "react"
import { changePass } from "@/api/changePass"
import { serverUrl } from "@/config"
import { getAppState, updateAppState } from "@/state/state"
import { ErrorRes } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useStore } from "@nanostores/react"
import { useMutation } from "@tanstack/react-query"
import Uppy from "@uppy/core"
import { FileInput } from "@uppy/react"
import Tus from "@uppy/tus"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
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
  currentPassword: z.string().min(1).max(255),
  newPassword: z.string().min(1).max(255),
})

export default function Page() {
  const [uppy, setUppy] = useState<Uppy>()
  const [avatar, setAvatar] = useState<string | null>(null)
  let state = getAppState()
  let token = state.session?.token
  // auth provider
  let providerNotPassword = state.userData?.provider !== "password"

  const fileInputRef = useRef<HTMLInputElement>(null) // Create a ref for the file input element
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const mutation = useMutation({
    mutationFn: changePass,
    onError: (e: AxiosError<ErrorRes>) => {
      toast.error(e.response?.data.message)
      return e
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values)
    console.log(values)
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success("Success")
    }
  }, [mutation.isLoading])

  useEffect(() => {
    const uppyInstance = new Uppy({
      id: "uppy1",
      autoProceed: false,
      debug: true,
    }).use(Tus, {
      endpoint: serverUrl + "/files/",
      headers: {
        Authorization: "Bearer " + token,
        dir: "/",
      },
    })

    // Store the Uppy instance in state
    setUppy(uppyInstance)

    // Clean up the Uppy instance when the component unmounts
    return () => {
      uppy?.close()
    }
  }, [])

  useEffect(() => {
    state.userData?.avatar.length! > 0 && fetchAvatar()
    async function fetchAvatar() {
      try {
        const authToken = "Bearer " + token // Replace with your authorization token

        const response = await fetch(
          serverUrl + "/files/" + state.userData?.avatar,
          {
            method: "GET",
            headers: {
              Authorization: authToken,
            },
          }
        )

        if (!response.ok) {
          throw new Error("Request failed")
        }

        const blob = await response.blob()
        const blobUrl = URL.createObjectURL(blob)
        setAvatar(blobUrl)
      } catch (error) {
        toast.error("Error fetching avatar:" + error)
        console.error("Error fetching file content:", error)
      }
    }
  }, [])
  const [showChangeAvatarBtn, setShowChangeAvatarBtn] = useState(false)
  const handleFileInputChange = () => {
    const fileInput = fileInputRef.current
    if (fileInput && fileInput.files && fileInput.files[0]) {
      let file = fileInput.files[0]
      const blobUrl = URL.createObjectURL(file)
      setAvatar(blobUrl)
      uppy?.addFile({ data: file, name: file.name })
      setShowChangeAvatarBtn(true)
    }
  }
  async function changeAvatar() {
    let res = await uppy?.upload()
    const url = res?.successful[0].uploadURL
    const parts = url!.split("/") // Split the URL by "/"
    const id = parts[parts.length - 1] // Get the last part of the URL

    updateAppState({
      userData: {
        ...state.userData,
        //@ts-ignore
        avatar: id || state.userData?.avatar,
      },
    })
    setShowChangeAvatarBtn(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast.success("Success")
  }
  if (!uppy) return <></>
  return (
    <section className="p-14">
      <div className="flex justify-around w-full">
        <div className="flex w-[30%]  items-center gap-4 p-8 rounded-lg flex-col bg-secondary">
          <h3 className="text-2xl font-semibold tracking-tight">
            Account Information
          </h3>
          <div className="flex items-center justify-start gap-4 px-4 w-full">
            <Avatar className="w-14 h-14 self-start ">
              <AvatarImage src={avatar ?? "/avatar.png"} />
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
              {showChangeAvatarBtn && (
                <Button onClick={changeAvatar} variant="outline">
                  Change Avatar
                </Button>
              )}
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
            {providerNotPassword && (
              <p className=" font-semibold tracking-tight text-center">
                Can't change password you are logged in with &nbsp;
                {state.userData?.provider}
              </p>
            )}
            <FormField
              disabled={providerNotPassword}
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Current Passowrd</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={providerNotPassword}
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>New Passowrd</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={providerNotPassword}
              className="w-full"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
}
