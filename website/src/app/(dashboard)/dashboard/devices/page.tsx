import { AlertNotImplemented } from "@/components/AlertNotImplemented"
import { HeadText } from "@/components/HeadText"
import { DataTable } from "./DataTable"

export default function Page() {
  return (
    <section className="p-4">
      <AlertNotImplemented/>
      <HeadText text="Devices" />
      <DataTable />
    </section>
  )
}
