import { File, Folder } from "@/types"

import { makeRequest } from "./makeRequest"

type Res = {
  files: File[]
  folders: Folder[]
}
export async function deleteItem(body: { id: string; isFolder: boolean }) {
  let data: Res = await makeRequest(
    body.isFolder ? "/folder" : "/file",
    "delete",
    body
  )
  return data
}
