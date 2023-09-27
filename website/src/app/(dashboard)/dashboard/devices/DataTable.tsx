"use client"

import React, { useState } from "react"
import { FolderIcon, HeartIcon, TabletSmartphone } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import mockDevices from "@/components/mockDevices"

export function DataTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="grow">Name</TableHead>
          <TableHead>Last Sync</TableHead>
          <TableHead>Files</TableHead>
          <TableHead>Total Storage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockDevices.map((f) => (
          <>
            <TableRow className="cursor-pointer" key={f.name}>
              <TableCell className="font-medium flex items-center gap-1">
                <TabletSmartphone />
                {f.name}
              </TableCell>
              <TableCell>{f.lastSync}</TableCell>
              <TableCell>{f.filesCount}</TableCell>
              <TableCell>{f.totalStorage}</TableCell>
            </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  )
}
