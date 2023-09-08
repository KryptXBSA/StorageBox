import { makeRequest } from "./makeRequest"

type Res = {
  token: string
}
export async function renameFolder(body: { id: string; name: string }) {
  let data: Res = await makeRequest("/folder", "patch", body)
  return data
}
