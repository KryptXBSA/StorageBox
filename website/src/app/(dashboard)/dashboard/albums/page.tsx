import { AlertNotImplemented } from "@/components/AlertNotImplemented"
import { HeadText } from "@/components/HeadText"

import { AlbumCard } from "./AlbumCard"
import { DataTable } from "./DataTable"

export default function Page() {
  return (
    <section className="p-4">
      <AlertNotImplemented />
      <HeadText text="Albums" />
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <AlbumCard name="My Album" />
        ))}
      </div>
    </section>
  )
}
