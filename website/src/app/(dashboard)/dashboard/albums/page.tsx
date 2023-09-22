import { AlertNotImplemented } from "@/components/AlertNotImplemented"

import { AlbumCard } from "./AlbumCard"
import { DataTable } from "./DataTable"
import { HeadText } from "./HeadText"

export default function Page() {
  return (
    <section className="p-4">
      <AlertNotImplemented />
      <HeadText />
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <AlbumCard name="My Album" />
        ))}
      </div>
    </section>
  )
}
