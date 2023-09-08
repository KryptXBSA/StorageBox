import { makeRequest } from "./makeRequest"

type Res = {
  message:string
}
type Body = { parentId: string; name: string }
export async function newFolder(body: Body) {
  let data: Res = await makeRequest("/folder", "post", body)
  return data
}
