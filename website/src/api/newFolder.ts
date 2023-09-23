import { makeRequest } from "./makeRequest"

import { File, Folder } from "@/types"
type Res = {
  files: File[]
  folders: Folder[]
}
type Body = { parentId: string; name: string }
export async function newFolder(body: Body) {
  let data: Res = await makeRequest("/folder", "post", body)
  return data
}
