"use client"
import { ChangeEvent } from "react"
import { useDataStore } from "@/state/data"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Search() {
  const store = useDataStore()

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const searchQuery = event.target.value
    store.setSearchQuery(searchQuery)
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
