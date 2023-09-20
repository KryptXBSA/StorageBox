import { AlertNotImplemented } from "@/components/AlertNotImplemented"
import { DataTable } from "./DataTable"
import { HeadText } from "./HeadText"

export default function Page() {
  return (
    <section className="p-4">
      <AlertNotImplemented/>
      <HeadText />
      <DataTable />
    </section>
  )
}
