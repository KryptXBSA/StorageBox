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
    <div className="max-w-lg relative">
      <Input
        placeholder="shadcn"
        onChange={handleInputChange}
        className="pr-10" // Add padding for the icon
      />
      <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2" />
    </div>
  )
}
