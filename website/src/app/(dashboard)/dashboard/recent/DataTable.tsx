"use client"

import React, { useState } from "react"
import {  FileIcon, FolderIcon } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import mockFiles from "./mockFiles"
import { GetFileIcon } from "@/components/GetFileIcon"


export function DataTable() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="grow">Name</TableHead>
            <TableHead>Last accessed</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockFiles.map((f) => (
          <>
            <TableRow
              className="cursor-pointer"
              key={f.name}
            >
              <TableCell className="font-medium flex items-center gap-1">
                <GetFileIcon type={f.type} view="list"/>
                {f.name}
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

