import { File, Folder } from "@/types"

import { makeRequest } from "./makeRequest"

type Res = {
  files: File[]
  folders: Folder[]
}
export async function renameItem(body: {
  id: string
  name: string
  isFolder: boolean
}) {
  let data: Res = await makeRequest(
    body.isFolder ? "/folder" : "/file",
    "patch",
    body
  )
  return data
}
