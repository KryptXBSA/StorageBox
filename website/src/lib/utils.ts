import { serverUrl } from "@/config"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const imageTypes = ["image", "png"]
export const videoTypes = ["video", "mp4"]
export const textTypes = [
  "textfile",
  "pdf",
  "docx",
  "application/octet-stream",
  "json",
]

export type FinalType = "image" | "video" | "text" | "unknown"

export function getFileType(input?: string): FinalType {
  if (!input) return "unknown"
  if (imageTypes.some((type) => input.includes(type))) {
    return "image"
  } else if (videoTypes.some((type) => input.includes(type))) {
    return "video"
  } else if (textTypes.some((type) => input.includes(type))) {
    return "text"
  } else {
    return "unknown"
  }
}

export function handleDownload({
  name,
  id,
  token,
}: {
  token: string
  id: string
  name: string
}) {
  fetch(serverUrl + "/files/" + id + "?token=" + token)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = name
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    })
    .catch((error) => {
      console.error("Error downloading the file:", error)
    })
}
