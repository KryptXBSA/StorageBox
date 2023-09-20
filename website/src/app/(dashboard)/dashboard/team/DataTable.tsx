"use client"

import React, { useState } from "react"
import {  FolderIcon, HeartIcon, TabletSmartphone } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


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
          {[{id:1,name:"My team",createdAt:1}].map((f) => (
          <>
            <TableRow
              className="cursor-pointer"
              key={f.id}
            >
              <TableCell className="font-medium flex items-center gap-2">
                <div className="flex -space-x-3">
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="cursor-pointer">
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback>+99</AvatarFallback>
        </Avatar>
                </div>
                {f.name}
              </TableCell>
              <TableCell>{f.createdAt}</TableCell>
              <TableCell>Folder</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
            <TableRow
              className="cursor-pointer"
              key={f.id}
            >
              <TableCell className="font-medium flex items-center gap-2">
                <div className="flex -space-x-3">
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="cursor-pointer">
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback>+99</AvatarFallback>
        </Avatar>
                </div>
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

