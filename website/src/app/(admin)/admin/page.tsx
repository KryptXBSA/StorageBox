"use client"

import Link from "next/link"
import { ArrowUpRightIcon, Database, FileIcon, UsersIcon } from "lucide-react"

import { AdminCard } from "./AdminCard"

const dashboardData = [
  {
    title: "CPU",
    links: [
      {
        src: "http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&refresh=5s&panelId=20",
        width: "450px",
        height: "200px",
      },
      {
        src: "http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&refresh=5s&panelId=3",
        width: "450px",
        height: "200px",
      },
    ],
  },
  {
    title: "Network",
    links: [
      {
        src: "http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=node_exporter&var-node=localhost%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&panelId=280",
        width: "450px",
        height: "200px",
      },
      {
        src: "http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=node_exporter&var-node=localhost%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&panelId=85",
        width: "450px",
        height: "200px",
      },
    ],
  },
  {
    title: "RAM",
    links: [
      {
        src: "http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&refresh=5s&panelId=75",
        width: "450px",
        height: "200px",
      },
      {
        src: "http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&refresh=5s&panelId=16",
        width: "450px",
        height: "200px",
      },
    ],
  },
  {
    title: "Storage",
    links: [
      {
        src: "http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=node_exporter&var-node=localhost%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&panelId=23",
        width: "450px",
        height: "200px",
      },
      {
        src: "http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=node_exporter&var-node=localhost%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&panelId=154",
        width: "450px",
        height: "200px",
      },
    ],
  },
]
export default function Page() {
  return (
    <section className="p-4 flex flex-col items-center gap-2">
      <h2 className="text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Overview
      </h2>
      <div className="flex gap-8">
        <Link href="/admin/users">
          <AdminCard
            icon={<UsersIcon className="w-14 h-14  rounded-sm p-2" />}
            text1="Users"
            text2="32"
          />
        </Link>
        <Link href="#">
          <AdminCard
            icon={<Database className="w-14 h-14  rounded-sm p-2" />}
            text1="Storage Used"
            text2="100 GB"
          />
        </Link>
        <Link href="/admin/users">
          <AdminCard
            icon={<FileIcon className="w-14 h-14  rounded-sm p-2" />}
            text1="Files"
            text2="992"
          />
        </Link>
      </div>
      <EmbeddedDashboard data={dashboardData} />
    </section>
  )
}
type DashboardDataItem = {
  title: string
  links: {
    src: string
    width: string
    height: string
  }[]
}
function EmbeddedDashboard({ data }: { data: DashboardDataItem[] }) {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <h2 className="font-bold text-lg">{item.title}</h2>
          <div className="flex gap-4 p-2">
            {item.links.map((link, linkIndex) => (
              <div key={linkIndex} className="flex flex-col">
                <iframe
                  src={link.src}
                  width={link.width}
                  height={link.height}
                ></iframe>
                <a
                  href={link.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 flex underline hover:underline-offset-1 hover:text-blue-500/80"
                >
                  New Tab <ArrowUpRightIcon />
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
