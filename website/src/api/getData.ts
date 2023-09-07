import { File, Folder } from "@/types"

import { makeRequest } from "./makeRequest"

type Res = {
  files: File[]
  folders: Folder[]
}
export async function getData() {
  let data: Res = await makeRequest("/data", "get")
  return data
}
