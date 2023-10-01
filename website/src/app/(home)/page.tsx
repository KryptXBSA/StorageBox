import Link from "next/link"
import { GithubIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function Page() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-16">
      <div className="flex flex-col items-start gap-36">
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              StorageBox
            </h1>
            <p className="text-lg text-muted-foreground">
              A Simple File Storage Solution
            </p>
          </div>
          <img className="max-w-[900px]" src="/dashboard.png" />
        </div>

        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold leading-tight tracking-tighter md:text-3xl">
              Powered by a Powerful Tech Stack
            </h1>
          </div>
          <div className="flex">
            <GithubIcon />
            <GithubIcon />
            <GithubIcon />
            <GithubIcon />
            <GithubIcon />
          </div>
        </div>

        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
Admin Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
Admin Dashboard with Useful Metrics and Statistics
            </p>
          </div>
          <img className="max-w-[900px]" src="/dashboard.png" />
        </div>

      </div>
    </section>
  )
}
