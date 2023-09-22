
import { makeRequest } from "./makeRequest"

import { File, Folder } from "@/types"
type Res = {
  files: File[]
  folders: Folder[]
}
export async function getData() {
  let data: Res = await makeRequest("/data", "get")
  return data
}
