import { DataTable } from "./DataTable"
import { HeadText } from "./HeadText"

export default function Page() {
  return (
    <section className="p-4">
      <HeadText />
      <DataTable />
    </section>
  )
}
