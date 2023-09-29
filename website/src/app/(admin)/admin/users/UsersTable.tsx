"use client"

import React, { useState } from "react"
import { adminOverview } from "@/api/adminOverview"
import { adminUsers } from "@/api/adminUsers"
import { queryKeys } from "@/queryKeys"
import { getAppState, updateAppState } from "@/state/state"
import { File, Folder } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { FolderClosed, FolderIcon } from "lucide-react"
import moment from "moment"

import { bytesToMB } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { RowAction } from "./RowAction"

export function UsersTable() {
  const query = useQuery({
    queryKey: [queryKeys.users],
    queryFn: adminUsers,
  })
  if (query.isLoading) return <></>
  return (
    <>
      {/* <PreviewFileDialog open={open} toggle={setOpen} /> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="grow">Username</TableHead>
            <TableHead>Signup Method</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Total storage</TableHead>
            <TableHead>Signup Date</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {query.data?.map((i) => (
            <TableRow
              // onClick={() => toggle(i)}
              className="cursor-pointer"
              key={i.id}
            >
              <TableCell className="font-medium items-center flex gap-1">
                {/* <GetFileIcon view="list" type={i.type} /> */}
                {i.username}
              </TableCell>
              <TableCell>{i.provider}</TableCell>
              <TableCell>{i.email}</TableCell>
              <TableCell>{bytesToMB(i.storage || 0)}</TableCell>
              <TableCell>{moment(i.createdAt).fromNow()}</TableCell>
              <TableCell
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className="text-right"
              >
                <RowAction username={i.username} id={i.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
