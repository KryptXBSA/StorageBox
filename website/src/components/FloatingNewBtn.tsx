"use client"

import { useEffect, useState } from "react"
import Uppy from "@uppy/core"
import {
  Dashboard,
  DashboardModal,
  DragDrop,
  FileInput,
  ProgressBar,
} from "@uppy/react"
import Tus from "@uppy/tus"
import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function FloatingNewBtn() {
  const [uppy, setUppy] = useState<Uppy>()

  useEffect(() => {
    // Create an Uppy instance with custom headers
    const uppyInstance = new Uppy({
      id: "uppy1",
      autoProceed: false,
      debug: true,
    }).use(Tus, {
      endpoint: "http://localhost:4000/files/",
      headers: {
        dir: "e6271481-c012-4e26-8165-1cda0b214587",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQwMzUyOTksImlkIjoiMGQ0YjRmOTMtN2NkZC00YzdiLTgwOTQtZWFhMDY2ODE3MTNjIn0.dW7IJPTTOWb_LuFTRyzmdsk-y7heNFkBVMQD0rz3HxU",
      },
    })

    // Store the Uppy instance in state
    setUppy(uppyInstance)

    // Clean up the Uppy instance when the component unmounts
    return () => {
      uppy?.close()
    }
  }, [])
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="rounded-full w-14 h-14">
          <PlusIcon className="scale-125" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-[500px] mb-5">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Dashboard
              uppy={uppy!}
              metaFields={[
                { id: "name", name: "Name", placeholder: "File name" },
              ]}
            />
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
