"use client"

import React, { useState } from "react"
import { useDataStore } from "@/state/data"
import { File, Folder } from "@/types"
import { FileIcon, FolderIcon } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { FileCard } from "./FileCard"
import { FolderCard } from "./FolderCard"
import { RowAction } from "./RowAction"
import { GetFileIcon } from "./GetFileIcon"

export function DataTable() {
  const state = useDataStore()

  function selectFolder(id: string) {
    let filtered = state.folders.filter((f) => f.name !== "/")
    const selectedFolder = filtered.find((f) => f.id === id)!
    state.setSelectedFolder(selectedFolder)

    let parents: Folder[] = []
    let currentFolder = selectedFolder

    // this is for the BreadCrumbs, find the parents of the selectedFolder
    while (currentFolder.parentId) {
      const parentFolder = filtered.find((f) => f.id === currentFolder.parentId)
      if (parentFolder) {
        parents.unshift(parentFolder)
        currentFolder = parentFolder
      } else {
        break
      }
    }
    state.setParents(parents)
  }

  // TODO explicitly filder root folder /, DONE
  let filteredFolders = state.folders
  let filteredFiles = state.files
  filteredFolders = state.folders.filter((f) => f.name !== "/")
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
  if (state.viewAs === "grid")
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 py-4 gap-2">
          {filteredFolders.map((f) => (
            <FolderCard selectFolder={selectFolder} key={f.id} {...f} />
          ))}
          {filteredFiles.map((f) => (
            <FileCard key={f.id} {...f} />
          ))}
        </div>
      </>
    )
  else
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="grow">Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
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
              <TableCell className="font-medium flex items-center gap-1">
                <FolderIcon />
                {f.name}
              </TableCell>
              <TableCell>{f.createdAt}</TableCell>
              <TableCell>Folder</TableCell>
              <TableCell>-</TableCell>
              <TableCell
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className="text-right"
              >
                <RowAction isFolder name={f.name} id={f.id} />
              </TableCell>
            </TableRow>
          ))}

          {filteredFiles.map((f) => (
            <TableRow className="cursor-pointer" key={f.id}>
              <TableCell className="font-medium flex gap-1">
              <GetFileIcon view="list" type={f.type}/>
                {f.name}
              </TableCell>
              <TableCell>{f.createdAt}</TableCell>
              <TableCell>{f.type}</TableCell>
              <TableCell>{f.size}</TableCell>
              <TableCell className="text-right">
                <RowAction isFolder={false} name={f.name} id={f.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}
