"use client"

import { getData } from "@/api/getData"
import { apiUrl } from "@/config"
import { queryKeys } from "@/queryKeys"
import { useQuery } from "@tanstack/react-query"

import { DataTable } from "@/components/DataTable"

import { Breadcrumbs } from "./Breadcrumbs"

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.data],
    queryFn: getData,
  })
  if (isLoading) return <>LOADING</>
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <Breadcrumbs />
        <DataTable
          folders={data?.folders.slice(1) || []}
          files={data?.files || []}
        />
      </div>
    </section>
  )
}
