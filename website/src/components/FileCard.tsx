import * as React from "react"
import { apiUrl } from "@/config"
import { useSessionStore0 } from "@/session/session"
import { File } from "@/types"
import { FileIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

import { RowAction } from "./RowAction"

export function FileCard(p: File) {
  const [content, setContent] = React.useState<string | null>(null)
  const [isImage, setIsImage] = React.useState(false)
  const token = useSessionStore0()?.token

  React.useEffect(() => {
    // Fetch the file content with authorization headers
    const fetchFileContent = async () => {
      try {
        const authToken = "Bearer " + token // Replace with your authorization token

        const response = await fetch(apiUrl + "/files/" + p.id, {
          method: "GET",
          headers: {
            Authorization: authToken,
          },
        })

        if (!response.ok) {
          throw new Error("Request failed")
        }

        const contentType = response.headers.get("Content-Type")

        // Check if the content type indicates an image
        if (contentType && contentType.startsWith("image/")) {
          // It's an image
          setIsImage(true)

          // Assuming the response is a binary file (e.g., an image)
          const blob = await response.blob()

          // Create a blob URL and set it as the image source
          const blobUrl = URL.createObjectURL(blob)
          setContent(blobUrl)
        } else {
          // It's not an image, so it's treated as text
          setIsImage(false)

          // Assuming the response is text data
          const textContent = await response.text()
          setContent(textContent)
        }
      } catch (error) {
        console.error("Error fetching file content:", error)
      }
    }

    fetchFileContent()
  }, [p.id, token])

  const handleDownloadClick = () => {
    // Create a temporary anchor element to trigger the download
    if (!isImage) {
      const a = document.createElement("a")
      a.href = apiUrl + "/files/" + p.id + "?token=" + token
      a.download = p.name
      a.click()
      document.body.removeChild(a)
    } else {
      const a = document.createElement("a")
      a.href = content || ""
      a.download = p.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <Card className="w-[200px] hover:bg-slate-500/50 cursor-pointer duration-300 transition-colors border-none bg-slate-500/20 h-[160px] py-2">
      <CardContent className="flex p-4 flex-col items-center justify-center">
        {isImage ? (
          content && <img src={content} alt={p.name} />
        ) : (
          <pre className="w-20 h-16 overflow-auto">{content}</pre>
        )}
        <FileIcon className="w-20 h-20" />
        <p className="overflow-hidden text-center w-20 truncate whitespace-nowrap text-overflow-ellipsis">
          <a
            // href="#"
            onClick={handleDownloadClick}
            target="_blank"
            style={{ textDecoration: "underline", cursor: "pointer" }}
            download
          >
            {p.name}
          </a>
        </p>
        <RowAction horizontal isFolder={false} name={p.name} id={p.id} />
      </CardContent>
    </Card>
  )
}
