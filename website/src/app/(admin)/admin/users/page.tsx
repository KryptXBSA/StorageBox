"use client"

import { getData } from "@/api/getData"
import { serverUrl } from "@/config"
import { queryKeys } from "@/queryKeys"
import { ErrorRes } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"

import { Spinner } from "@/components/Spinner"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { getAppState, updateAppState } from "@/state/state"
import { UsersTable } from "./UsersTable"


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
      <UsersTable />
    </section>
  )
}
