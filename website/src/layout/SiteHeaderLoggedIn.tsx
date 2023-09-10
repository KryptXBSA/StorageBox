import { UserAvatar } from "@/components/Avatar"
import { Search } from "@/components/Search"

// TODO get server session for the login text
export function SiteHeaderLoggedIn() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-between space-x-4">
          <div className="invisible">
            <UserAvatar />
          </div>
          <Search />
          <UserAvatar />
        </div>
      </div>
    </header>
  )
}
