import { makeRequest } from "./makeRequest"

type Res = {
  token:string
}
export async function login(body: { username: string; password: string }) {
  let data: Res = await makeRequest("/login", "post", body)
  return data
}
