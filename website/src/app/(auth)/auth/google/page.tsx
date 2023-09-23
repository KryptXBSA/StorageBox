
"use client"

import { useEffect } from "react"
import { redirect, useRouter, useSearchParams } from "next/navigation"
import { githubLogin } from "@/api/githubLogin"
import { serverUrl } from "@/config"
import axios from "axios"
import Cookies from "js-cookie"
import { toast } from "react-toastify"

import { Spinner } from "@/components/Spinner"

export default function Page(p: { params: any; searchParams: any }) {
  const code = p.searchParams.code

  let router = useRouter()
  useEffect(() => {
    if (code) {
      fetch(serverUrl + "/auth/google/callback?" + "code=" + code)
        .then((res) => res.json())
        .then((data) => {
          console.log("aasd",data)
          if (data.token) {
            toast.success("Logging in")
            Cookies.set("token", data.token, { secure: true })
            router.push("/dashboard") // You need to implement the `redirect` function
          }
        })
        .catch((error) => {
          console.error("Error:", error)
          // Handle errors as needed
        })
    }
  }, [code])

  return (
    <div className="p-96 flex flex-col items-center gap-2 mx-auto">
      <Spinner />
      Logging in
    </div>
  )
}
