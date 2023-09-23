"use client"

import { getAppState, updateAppState } from "@/state/state"
import { MenuIcon } from "lucide-react"

import { UserAvatar } from "@/components/Avatar"
import { Search } from "@/components/Search"

// TODO get server session for the login text
export function SiteHeaderLoggedIn() {
  let state = getAppState()
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-between space-x-4">
          <MenuIcon
            onClick={() => updateAppState({ showSidebar: !state.showSidebar })}
            className="visible lg:hidden"
          />
          <div className="hidden lg:invisible lg:block">
            <UserAvatar />
          </div>
          <Search />
          <UserAvatar />
        </div>
      </div>
    </header>
  )
}
