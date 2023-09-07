"use client"

import { getData } from "@/api/getData"
import { apiUrl } from "@/config"
import { queryKeys } from "@/queryKeys"
import { useQuery } from "@tanstack/react-query"

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
        {data?.files.map((f) => (
          <div key={f.id}>
            <p>{f.name}</p>
            <p>{f.size}</p>
            <img src={apiUrl + "/files/" + f.id} />
          </div>
        ))}
        <br />
        {data?.folders.map((f) => (
          <p key={f.id}>{f.name}</p>
        ))}
      </div>
    </section>
  )
}

export function Breadcrumbs(props: {}) {
  return (
    <nav className="flex text-lg" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a
            href="#"
            className="inline-flex items-center font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            Home
          </a>
        </li>
        <li>
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
            <a
              href="#"
              className="ml-1 font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
            >
              Projects
            </a>
          </div>
        </li>
        <li aria-current="page">
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
            <span className="ml-1 font-medium text-gray-500 md:ml-2 dark:text-gray-400">
              Flowbite
            </span>
          </div>
        </li>
      </ol>
    </nav>
  )
}
