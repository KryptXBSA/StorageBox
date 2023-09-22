"use client"

import React, { useState } from "react"
import {  FolderIcon, HeartIcon } from "lucide-react"

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
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
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
                {f.name}<HeartIcon className="text-red-500 fill-red-500"/>
              </TableCell>
              <TableCell>{f.createdAt}</TableCell>
              <TableCell>Folder</TableCell>
              <TableCell>-</TableCell>
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

