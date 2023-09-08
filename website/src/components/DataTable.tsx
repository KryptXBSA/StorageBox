"use client"

import React, { useState } from "react"
import { useDataStore } from "@/state/data"
import { File, Folder } from "@/types"
import { MoreVertical } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { RowAction } from "./RowAction"

export function DataTable() {
  const state = useDataStore()
  const [folderAction, setFolderAction] = useState(false)
  const [fileAction, setFileAction] = useState(false)

  function selectFolder(id: string) {
    const selectedFolder = state.folders.find((f) => f.id === id)!
    state.setSelectedFolder(selectedFolder)

    let parents: Folder[] = []
    let currentFolder = selectedFolder

    // this is for the BreadCrumbs, find the parents of the selectedFolder
    while (currentFolder.parentId) {
      const parentFolder = state.folders.find(
        (f) => f.id === currentFolder.parentId
      )
      if (parentFolder) {
        parents.unshift(parentFolder)
        currentFolder = parentFolder
      } else {
        break
      }
    }
    state.setParents(parents)
  }

  // TODO explicitly filder root folder /
  let filteredFolders = state.folders
  let filteredFiles = state.files
  // first filter based on the selected folder
  if (state.selectedFolder?.id) {
    filteredFolders = filteredFolders.filter(
      (f) => f.parentId === state.selectedFolder?.id
    )
    filteredFiles = filteredFiles.filter(
      (f) => f.folderId === state.selectedFolder?.id
    )
  }
  // then filter based on the searchQuery
  filteredFolders = filteredFolders.filter((f) =>
    f.name.toLowerCase().includes(state.searchQuery.toLowerCase())
  )
  filteredFiles = filteredFiles.filter((f) =>
    f.name.toLowerCase().includes(state.searchQuery.toLowerCase())
  )

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>File size</TableHead>
          <TableHead className="text-right"></TableHead>
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
            <TableCell
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="text-right"
            >
              <RowAction id={f.id} />
            </TableCell>
          </TableRow>
        ))}

        {filteredFiles.map((f) => (
          <TableRow className="cursor-pointer" key={f.id}>
            <TableCell className="font-medium">{f.name}</TableCell>
            <TableCell>{f.createdAt}</TableCell>
            <TableCell>{f.size}</TableCell>
            <TableCell className="text-right">
              <RowAction id={f.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
