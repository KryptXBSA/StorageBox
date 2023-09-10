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
    // don't refetch again if already fetched
    enabled: !store.initialDataFetched,
    onError: (e: AxiosError<ErrorRes>) =>
      toast.error(e.response?.data.message || e.message),
  })
  if (query.isSuccess && !store.initialDataFetched) {
    store.setInitialDataFetched(true)
    store.setFolders(query.data.folders)
    store.setFiles(query.data.files)
  }
  if (query.isLoading) return <>LOADING</>
  return (
    <section className="p-4">
        <Breadcrumbs />
        <DataTable />
    </section>
  )
}
