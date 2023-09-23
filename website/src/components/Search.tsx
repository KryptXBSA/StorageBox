"use client"

import { ChangeEvent } from "react"
import { updateAppState } from "@/state/state"
import { SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"

export function Search() {
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const searchQuery = event.target.value
    updateAppState({ searchQuery })
  }

  return (
    <div className=" relative">
      <Input
        placeholder="Search"
        onChange={handleInputChange}
        className="w-[480px] rounded-3xl"
      />
      <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2" />
    </div>
  )
}
