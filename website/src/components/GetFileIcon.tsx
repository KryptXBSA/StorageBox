import * as React from "react"
import { ViewAs } from "@/types"
import { FileIcon, ImageIcon, VideoIcon } from "lucide-react"

export function GetFileIcon(p: { type: string; view: ViewAs }) {
  const type = p.type.toLowerCase()
  let className = ""
  if (p.view === "grid") className = "w-20 h-20"

  if (type.includes("img") || type.includes("png")) {
    return <ImageIcon className={className} />
  } else if (type.includes("text") || type.includes("pdf")) {
    return <FileIcon className={className} />
  } else if (type.includes("video") || type.includes("mp4")) {
    return <VideoIcon className={className} />
  } else {
    return <FileIcon className={className} />
  }
}
