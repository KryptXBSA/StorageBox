import { File, Folder } from "@/types"

import { makeRequest } from "./makeRequest"

type Res = {}
export async function deleteUserFiles(body: { id: string }) {
  let data: Res = await makeRequest("/admin/user-files", "delete", body)
  return data
}
