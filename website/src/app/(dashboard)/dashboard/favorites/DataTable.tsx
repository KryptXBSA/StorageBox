"use client"

import React, { useState } from "react"
import { FolderIcon, HeartIcon } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { GetFileIcon } from "@/components/GetFileIcon"
import mockFiles from "@/components/mockFiles"

export function DataTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="grow">Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Size</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockFiles.map((f) => (
          <>
            <TableRow className="cursor-pointer" key={f.name}>
              <TableCell className="font-medium flex items-center gap-1">
                <GetFileIcon type={f.type} view="list" />
                {f.name}
                <HeartIcon className="text-red-500 fill-red-500" />
              </TableCell>
              <TableCell>{f.lastAccessed}</TableCell>
              <TableCell>{f.type}</TableCell>
              <TableCell>{f.fileSize}</TableCell>
            </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  )
}
