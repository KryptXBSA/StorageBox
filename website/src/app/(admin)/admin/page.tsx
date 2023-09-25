"use client"

import Link from "next/link"
import { FileIcon, UsersIcon } from "lucide-react"

import { AdminCard } from "./AdminCard"

export default function Page() {
  return (
    <section className="p-4 flex flex-col gap-2">
      <h2 className="text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Overview
      </h2>

      <div className="flex gap-8">
        <Link href="/admin/users">
          <AdminCard
            icon={<UsersIcon className="w-14 h-14  rounded-sm p-2" />}
            text1="Users"
            text2="32"
          />
        </Link>
        <Link href="/admin/users">
          <AdminCard
            icon={<FileIcon className="w-14 h-14  rounded-sm p-2" />}
            text1="Files"
            text2="992"
          />
        </Link>
      </div>
    </section>
  )
}
