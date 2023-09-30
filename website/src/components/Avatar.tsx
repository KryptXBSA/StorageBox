"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { serverUrl } from "@/config"
import { getAppState } from "@/state/state"
import Cookies from "js-cookie"
import { LogOut, Settings } from "lucide-react"
import { toast } from "react-toastify"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "./ui/button"

export function UserAvatar() {
  let router = useRouter()
  function logout() {
    Cookies.remove("token")
    router.push("/")
  }

  const [avatar, setAvatar] = useState<string | null>(null)

  let state = getAppState()
  useEffect(() => {
    state.userData?.avatar.length! > 0 && fetchAvatar()
    async function fetchAvatar() {
      try {
        const authToken = "Bearer " + state.session?.token // Replace with your authorization token

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
  }, [state.userData?.avatar])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={avatar ?? "/avatar.png"} />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-44 space-y-4">
        <Button
          onClick={() => router.push("/dashboard/settings")}
          variant="ghost"
          className="w-full gap-2  border-none"
        >
          <Settings />
          <span> Settings</span>
        </Button>
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full gap-2 border-none"
        >
          <LogOut /> LogOut
        </Button>
      </PopoverContent>
    </Popover>
  )
}
