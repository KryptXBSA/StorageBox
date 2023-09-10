import { makeRequest } from "./makeRequest"

type Res = {
  token: string
}
export async function renameFolder(body: {
  id: string
  name: string
  isFolder: boolean
}) {
  let data: Res = await makeRequest(
    body.isFolder ? "/folder" : "/file",
    "patch",
    body
  )
  return data
}
