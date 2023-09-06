"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

export function Sidebar() {
  return (
    <>
      <div className="fixed left-0 flex h-screen mt-16  w-60  bg-secondary">
        <div className="flex  w-full flex-col items-center gap-8 py-10">
          <Button className="w-32 px-8">
            <Link href="/dashboard/watchlist">Watchlist</Link>
          </Button>
          <Button className="w-32 px-8">
            <Link href="/dashboard/notifications">Notifications</Link>
          </Button>
          <Button className="w-32 px-8">
            <Link href="/dashboard/notifictions">Notifictions</Link>
          </Button>
          <Button className="w-32 px-8">
            <Link href="/dashboard/notifictions">Notifictions</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
