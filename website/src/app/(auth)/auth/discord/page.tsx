import { cookies } from "next/headers"
import { redirect, useSearchParams } from "next/navigation"
import { githubLogin } from "@/api/githubLogin"
import { serverUrl } from "@/config"
import axios from "axios"

export const dynamic = "force-dynamic"
export default async function Page(p: { params: any; searchParams: any }) {
  const code = p.searchParams.code
  console.log("codeeee", code)
  if (code) {
    const res = await fetch(serverUrl + "/auth/discord/callback?" + "code=" + code)
    let data = await res.json()
    console.log("asdasd", data)
  }
  // const cookieStore = cookies()
  // const token = cookieStore.get("token")?.value
  // if(token)redirect("/dashboard")
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2"></div>
    </section>
  )
}
