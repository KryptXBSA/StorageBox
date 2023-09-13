import { makeRequest } from "./makeRequest"

type Res = {
  token: string
}
export async function githubLogin(p: { code: string }) {
  let data: Res = await makeRequest(
    "/auth/github/callback?" + "code=" + p.code,
    "get"
  )
  return data
}
