"use client"

import React, { useState } from "react"
import { FolderIcon, HeartIcon, TabletSmartphone } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function DataTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="grow">Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1,2,3,4].map((f) => (
          <>
            <TableRow className="cursor-pointer" key={f}>
              <TableCell className="font-medium flex items-center gap-2">
                <div className="flex -space-x-3">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="/elon.jpeg" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="/doge.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="" alt="@shadcn" />
                    <AvatarFallback>+99</AvatarFallback>
                  </Avatar>
                </div>
                My Team
              </TableCell>
            </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  )
}
