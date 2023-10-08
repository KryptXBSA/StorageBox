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
  const iconClass = "w-[30px] h-[30px] lg:w-[55px] lg:h-[55px]"
  return (
    <section className="lg:container px-2 grid items-center gap-6 pb-8 pt-6 md:py-16">
      <div className="flex flex-col justify-center items-start gap-8 lg:gap-36">
        <div className="flex flex-col lg:items-start items-center lg:flex-row justify-between w-full">
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-extrabold lg:text-left text-center leading-tight tracking-tighter md:text-4xl">
              StorageBox
            </h1>
            <p className="text-lg text-muted-foreground">
              A Simple File Storage Service
            </p>
          </div>
          <div className="w-full max-w-[700px] lg:max-w-[900px] lg:w-[900px] lg:h-[400px] sm:h-[300px]">
            <img className="w-full h-full" src="/dashboard.png" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center w-full">
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tighter md:text-3xl">
            Powered by a Powerful Tech Stack
          </h1>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <NextIcon className={iconClass} />
              <ReactQueryIcon className={iconClass} />
              <GoIcon className={iconClass} />
              <PrismaIcon className={iconClass} />
              <PostgresIcon className={iconClass} />
              <RedisIcon className={iconClass} />
            </div>
            <div className="flex items-center gap-4">
              <GrafanaIcon className={iconClass} />
              <PrometheusIcon className={iconClass} />
              <NginxIcon className={iconClass} />
              <DockerIcon className={iconClass} />
              <AnsibleIcon className={iconClass} />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:items-start items-center lg:flex-row justify-between w-full">
          <div className="flex flex-col lg:text-left text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold  leading-tight tracking-tighter md:text-4xl">
              Admin Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Admin Dashboard with Useful Metrics and Statistics
            </p>
          </div>
          <div className="w-full max-w-[700px] lg:max-w-[900px] lg:w-[900px] lg:h-[400px] sm:h-[300px]">
            <img className="w-full h-full" src="/admin-dashboard.png" />
          </div>
        </div>
      </div>
    </section>
  )
}
