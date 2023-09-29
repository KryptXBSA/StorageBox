import { File, Folder } from "@/types"

import { makeRequest } from "./makeRequest"

type Res = {
}
export async function deleteUser(body: { id: string }) {
  let data: Res = await makeRequest("/admin/delete-user", "post", body)
  return data
}
