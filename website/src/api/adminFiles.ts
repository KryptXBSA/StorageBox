import { File} from "@/types"

import { makeRequest } from "./makeRequest"

type Res = File[]
export async function adminFiles() {
  let data: Res = await makeRequest("/admin/files", "get")
  return data
}
