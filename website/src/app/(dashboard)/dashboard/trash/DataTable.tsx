"use client"

import React, { useState } from "react"
import {  ArchiveRestore, FolderIcon, HeartIcon } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"


export function DataTable() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="grow">Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Restore</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[{id:1,name:"aa",createdAt:1}].map((f) => (
          <>
            <TableRow
              className="cursor-pointer"
              key={f.id}
            >
              <TableCell className="font-medium flex items-center gap-1">
                <FolderIcon />
                {f.name}
              </TableCell>
              <TableCell>{f.createdAt}</TableCell>
              <TableCell>Folder</TableCell>
              <TableCell><Button variant="ghost"><ArchiveRestore/></Button></TableCell>
            </TableRow>
            <TableRow
              className="cursor-pointer"
              key={f.id}
            >
              <TableCell className="font-medium flex items-center gap-1">
                <FolderIcon />
                {f.name}
              </TableCell>
              <TableCell>{f.createdAt}</TableCell>
              <TableCell>Folder</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    )
}

