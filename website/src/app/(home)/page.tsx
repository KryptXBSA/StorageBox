import AnsibleIcon from "@/components/icons/Ansible"
import DockerIcon from "@/components/icons/Docker"
import GoIcon from "@/components/icons/Go"
import GrafanaIcon from "@/components/icons/Grafana"
import NextIcon from "@/components/icons/Next"
import NginxIcon from "@/components/icons/Nginx"
import PostgresIcon from "@/components/icons/Postgres"
import PrismaIcon from "@/components/icons/Prisma"
import PrometheusIcon from "@/components/icons/Prometheus"
import ReactQueryIcon from "@/components/icons/ReactQuery"
import RedisIcon from "@/components/icons/Redis"

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

        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold leading-tight tracking-tighter md:text-3xl">
              Powered by a Powerful Tech Stack
            </h1>
          </div>
          <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <NextIcon className="w-20 h-20" />
            <ReactQueryIcon className="w-20 h-20" />
            <GoIcon className="w-24 h-24" />
            <PrismaIcon className="w-32 h-32" />
            <PostgresIcon className="w-20 h-20" />
            <RedisIcon className="w-20 h-20" />
          </div>
          <div className="flex items-center gap-4">
            <GrafanaIcon className="w-20 h-20" />
            <PrometheusIcon className="w-20 h-20" />
            <NginxIcon className="w-20 h-20" />
            <DockerIcon className="w-20 h-20" />
            <AnsibleIcon className="w-20 h-20" />
          </div>
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
