"use client"

import { getData } from "@/api/getData"
import { apiUrl } from "@/config"
import { queryKeys } from "@/queryKeys"
import { getAppState, updateAppState } from "@/state/state"
import { ErrorRes } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"

import { Breadcrumbs } from "@/components/Breadcrumbs"
import { DataTable } from "@/components/DataTable"
import { Spinner } from "@/components/Spinner"

export default function Page() {
  const state = getAppState()
  const query = useQuery({
    queryKey: [queryKeys.data],
    queryFn: getData,
    // don't refetch again if already fetched
    enabled: !state.initialDataFetched,
    onError: (e: AxiosError<ErrorRes>) =>
      toast.error(e.response?.data.message || e.message),
  })
  if (query.isSuccess && !state.initialDataFetched) {
    updateAppState({ initialDataFetched: true })
    updateAppState({ folders: query.data.folders })
    updateAppState({ files: query.data.files })
  }
  if (query.isLoading)
    return (
      <div className="p-96 mx-auto">
        <Spinner />
      </div>
    )
  return (
    <section className="p-4">
      <Breadcrumbs />
      <DataTable filter="all-media" />
    </section>
  )
}
