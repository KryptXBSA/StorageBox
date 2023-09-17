"use client"

import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { LogOut, Settings } from "lucide-react"

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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-44 space-y-4">
        <Button onClick={()=>router.push("/dashboard/settings")} variant="ghost" className="w-full gap-2  border-none">
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
