import { useEffect, useState } from "react"
import { apiUrl } from "@/config"
import { getAppState } from "@/state/state"
import {
  MediaCommunitySkin,
  MediaOutlet,
  MediaPlayer,
  MediaPoster,
} from "@vidstack/react"
import { toast } from "react-toastify"

import { getFileType } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function PreviewFileDialog({
  open,
  toggle,
}: {
  open: boolean
  toggle: (b: boolean) => void
}) {
  let { selectedFile, ...state } = getAppState()
  let token = state.session?.token

  const [content, setContent] = useState<string | null>(null)
  const type = getFileType(selectedFile?.type!)

  useEffect(() => {
    console.log("ttt", type)
    if (type === "text" || type === "image") fetchFileContent()
    async function fetchFileContent() {
      try {
        const authToken = "Bearer " + token // Replace with your authorization token

        const response = await fetch(apiUrl + "/files/" + selectedFile?.id, {
          method: "GET",
          headers: {
            Authorization: authToken,
          },
        })

        if (!response.ok) {
          throw new Error("Request failed")
        }

        // Check if the content type indicates an image
        // Create a blob URL and set it as the image source
        if (type === "image") {
          const blob = await response.blob()
          const blobUrl = URL.createObjectURL(blob)
          setContent(blobUrl)
          //   // It's not an image, so it's treated as text
        } else if (type === "text") {
          const textContent = await response.text()
          console.log(textContent)
          setContent(textContent)
        }
      } catch (error) {
        toast.error("Error fetching file content:" + error)
        console.error("Error fetching file content:", error)
      }
    }
  }, [selectedFile])

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent className="max-w-[80%] ">
        <DialogHeader>
          <DialogTitle>{selectedFile?.name}</DialogTitle>
        </DialogHeader>
        {type === "image" && <img src={content!} alt={selectedFile?.name!} />}
        {type === "text" && (
          <pre className=" h-96 overflow-auto">{content}</pre>
        )}
        {type === "video" && (
          <MediaPlayer
            title={selectedFile?.name}
            src={{
              type: "video/mp4",
              src: apiUrl + "/files/" + selectedFile?.id + "?token=" + token,
            }}
            aspectRatio={16 / 9}
            viewType="video"
          >
            <MediaOutlet>
              <MediaPoster />
            </MediaOutlet>
            <MediaCommunitySkin />
          </MediaPlayer>
        )}
        <DialogFooter>
          <a
            // href="#"
            // onClick={handleDownloadClick}
            target="_blank"
            style={{ textDecoration: "underline", cursor: "pointer" }}
            download
          >
            <Button type="submit">Download</Button>
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
