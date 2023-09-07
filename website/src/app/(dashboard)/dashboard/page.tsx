"use client"

import { getData } from "@/api/getData"
import { apiUrl } from "@/config"
import { queryKeys } from "@/queryKeys"
import { useDataStore } from "@/state/data"
import { ErrorRes } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"

import { DataTable } from "@/components/DataTable"

import { Breadcrumbs } from "./Breadcrumbs"

export default function Page() {
  const store = useDataStore()
  const query = useQuery({
    queryKey: [queryKeys.data],
    queryFn: getData,
    // don't set the data again if already fetched
    enabled: store.folders.length === 0,
    onError: (e: AxiosError<ErrorRes>) => toast.error(e.response?.data.message),
  })
  if (query.isSuccess && store.folders.length === 0) {
    store.setFolders(query.data.folders.slice(1))
    store.setFiles(query.data.files)
  }
  if (query.isLoading) return <>LOADING</>
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <Breadcrumbs />
        <DataTable />
      </div>
    </section>
  )
}
