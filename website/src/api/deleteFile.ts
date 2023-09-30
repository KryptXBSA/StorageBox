
import { makeRequest } from "./makeRequest"

type Res = {
}
export async function deleteFile(body: { id: string }) {
  let data: Res = await makeRequest("/admin/file", "delete", body)
  return data
}
