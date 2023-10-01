"use client"

import React from "react"
import { adminFiles } from "@/api/adminFiles"
import { adminUsers } from "@/api/adminUsers"
import { queryKeys } from "@/queryKeys"
import { useQuery } from "@tanstack/react-query"
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
import { GetFileIcon } from "@/components/GetFileIcon"

import { RowAction } from "./RowAction"

export function FilesTable() {
  const query = useQuery({
    queryKey: [queryKeys.users],
    queryFn: adminFiles,
  })
  if (query.isLoading) return <></>
  return (
    <>
      {/* <PreviewFileDialog open={open} toggle={setOpen} /> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="grow">Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>type</TableHead>
            <TableHead>Size</TableHead>
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
                <GetFileIcon view="list" type={i.type||""} />
                {i.name}
              </TableCell>
              <TableCell>{moment(i.createdAt).fromNow()}</TableCell>
              <TableCell>{i.type}</TableCell>
              <TableCell>{bytesToMB(i.size || 0)}</TableCell>
              <TableCell
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className="text-right"
              >
                <RowAction name={i.name} id={i.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
