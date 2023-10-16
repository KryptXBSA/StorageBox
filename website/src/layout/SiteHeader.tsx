import { cookies } from "next/headers"
import Link from "next/link"

import { Logo } from "@/components/Logo"

// TODO get server session for the login text
export function SiteHeader() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value
  // if(token)redirect("/dashboard")
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="lg:container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex  flex-1 items-center justify-between">
          <div className="flex  items-center gap-6">
            <Logo />
            {/* <Link href="/documentation">Documentation</Link> */}
          </div>
          {/* <div className="invisible"> */}
          {/*   <UserAvatar /> */}
          {/* </div> */}
          {/* <Search /> */}
          {token ? (
            <Link href="/dashboard">Dashboard</Link>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  )
}
