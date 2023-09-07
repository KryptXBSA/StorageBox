"use client"

import React from "react"
import { useDataStore } from "@/state/data"
import { File, Folder } from "@/types"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function DataTable() {
  const state = useDataStore()

  function selectFolder(id: string) {
    const selectedFolder = state.folders.find((f) => f.id === id)!
    state.setSelectedFolder(selectedFolder)

    let parents: Folder[] = []
    let currentFolder = selectedFolder

    while (currentFolder.parentId) {
      const parentFolder = state.folders.find(
        (f) => f.id === currentFolder.parentId
      )
      if (parentFolder) {
        parents.unshift(parentFolder)
        currentFolder = parentFolder
      } else {
        break // Break the loop if the parent folder is not found
      }
    }
    state.setParents(parents)
  }
  const filteredFolders = state.folders.filter((f) =>
    f.name.toLowerCase().includes(state.searchQuery.toLowerCase())
  )

  const filteredFiles = state.files.filter((f) =>
    f.name.toLowerCase().includes(state.searchQuery.toLowerCase())
  )
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>File size</TableHead>
          <TableHead className="text-right">:</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredFolders.map((f) => (
          <TableRow
            onClick={() => selectFolder(f.id)}
            className="cursor-pointer"
            key={f.id}
          >
            <TableCell className="font-medium">{f.name}</TableCell>
            <TableCell>{f.createdAt}</TableCell>
            <TableCell>-</TableCell>
            <TableCell className="text-right">:</TableCell>
          </TableRow>
        ))}

        {filteredFiles.map((f) => (
          <TableRow className="cursor-pointer" key={f.id}>
            <TableCell className="font-medium">{f.name}</TableCell>
            <TableCell>{f.createdAt}</TableCell>
            <TableCell>{f.size}</TableCell>
            <TableCell className="text-right">:</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
