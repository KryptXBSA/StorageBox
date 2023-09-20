"use client"

import React, { useState } from "react"
import {  FolderIcon } from "lucide-react"

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
            <RecentDate text="This Month"/>
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
            <RecentDate text="Last Year"/>
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

export function RecentDate(p: {text:string}) {
    return (

        <TableRow
            className="hover:bg-background p-0"
        >
            <TableCell className="font-bold px-1 hover:bg-none text-secondary-foreground text-base flex items-center gap-1">
        {p.text}
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
        </TableRow>

    )
}
