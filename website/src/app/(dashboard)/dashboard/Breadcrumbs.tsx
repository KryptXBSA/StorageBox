"use client"

import React, { useState } from "react"
import { useDataStore } from "@/state/data"
import {
  ArrowUpCircle,
  LayoutGrid,
  List,
  PlusCircle,
  Table,
} from "lucide-react"

import { Button } from "@/components/ui/button"

export function Breadcrumbs() {
  const { selectedFolder, parents, setSelectedFolder,...store } = useDataStore()

  return (
    <div className="flex justify-between">
      <ol className="flex text-lg items-center space-x-1 md:space-x-3">
        <li
          onClick={() => setSelectedFolder(null)}
          className="inline-flex items-center"
        >
          <a
            href="#"
            className="inline-flex items-center font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            My Box
          </a>
        </li>
        {parents.map((parent) => (
          <BreadcrumbItem
            key={parent.id}
            text={
              <a
                href="#"
                className="ml-1 font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                {parent.name}
              </a>
            }
          />
        ))}
        {selectedFolder && (
          <BreadcrumbItem
            text={
              <span className="ml-1 font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                {selectedFolder.name}
              </span>
            }
          />
        )}
      </ol>
      <div className="flex items-center gap-4">
        <Button variant="ghost" className=" flex gap-2">
          <PlusCircle className="scale-125 text-green-400" /> Create Folder
        </Button>
        <Button variant="ghost" className=" flex gap-2">
          <ArrowUpCircle className="scale-125 text-sky-400" /> Upload Files
        </Button>
        <div
          onClick={() => store.setViewAs("list")}
          className={
            store.viewAs === "list"
              ? "text-sky-400"
              : "hover:text-sky-400 " +
                "cursor-pointer transition-colors duration-300 "
          }
        >
          <Table />
        </div>
        <div
          onClick={() => store.setViewAs("grid")}
          className={
            store.viewAs === "grid"
              ? "text-sky-400"
              : "hover:text-sky-400 " +
                "cursor-pointer transition-colors duration-300 "
          }
        >
          <LayoutGrid />
        </div>
      </div>
    </div>
  )
}

function BreadcrumbItem({ text }: { text: any }) {
  return (
    <li className="inline-flex items-center">
      <div className="flex items-center">
        <svg
          className="w-3 h-3 text-gray-400 mx-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 9 4-4-4-4"
          />
        </svg>
        {text}
      </div>
    </li>
  )
}
