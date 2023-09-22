import { useEffect, useState } from "react"
import { apiUrl } from "@/config"
import { useSessionStore0 } from "@/session/session"
import { getAppState } from "@/state/state"
import {
  MediaCommunitySkin,
  MediaOutlet,
  MediaPlayer,
  MediaPoster,
} from "@vidstack/react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PreviewFileDialog({
  open,
  toggle,
}: {
  open: boolean
  toggle: (b: boolean) => void
}) {
  let { selectedFile } = getAppState()

  const [content, setContent] = useState<string | null>(null)
  const [isImage, setIsImage] = useState(false)
  const token = useSessionStore0()?.token

  useEffect(() => {
    console.log("fewtching")
    // Fetch the file content with authorization headers
    const fetchFileContent = async () => {
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

        const contentType = response.headers.get("Content-Type")
        console.log(contentType)

        // Check if the content type indicates an image
        // if (contentType && contentType.startsWith("image/")) {
        //   // It's an image
        //   setIsImage(true)

        // Assuming the response is a binary file (e.g., an image)
        const blob = await response.blob()
        setContent(blob)

        // Create a blob URL and set it as the image source
        // const blobUrl = URL.createObjectURL(blob)
        // } else {
        //   // It's not an image, so it's treated as text
        //   setIsImage(false)

        //   // Assuming the response is text data
        //   const textContent = await response.text()
        //   setContent(textContent)
        // }
      } catch (error) {
        console.error("Error fetching file content:", error)
      }
    }

    fetchFileContent()
  }, [selectedFile, token])

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent className="max-w-[80%] h-[calc(100vh-90px)]">
        <DialogHeader>
          <DialogTitle>{selectedFile?.name}</DialogTitle>
        </DialogHeader>
        {/* <video controls className="aspect-video" */}
        {/*   src={content} */}
        {/* /> */}

        <MediaPlayer
          title="Sprite Fight"
          // src={content||""}
          // src="https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4"
          // src={apiUrl + "/files/" + selectedFile?.id + "?token=" + token}
          src={{
            type: "video/mp4",
            src: apiUrl + "/files/" + selectedFile?.id + "?token=" + token,
          }}
          poster="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=980"
          thumbnails="https://media-files.vidstack.io/sprite-fight/thumbnails.vtt"
          aspectRatio={16 / 9}
          viewType="video"
          crossorigin=""
        >
          <MediaOutlet>
            <MediaPoster alt="Girl walks into sprite gnomes around her friend on a campfire in danger!" />
            <track
              src="https://media-files.vidstack.io/sprite-fight/subs/english.vtt"
              label="English"
              srcLang="en-US"
              kind="subtitles"
              default
            />
            <track
              src="https://media-files.vidstack.io/sprite-fight/chapters.vtt"
              srcLang="en-US"
              kind="chapters"
              default
            />
          </MediaOutlet>
          <MediaCommunitySkin />
        </MediaPlayer>
        <DialogFooter>
          <Button type="submit">Download</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
