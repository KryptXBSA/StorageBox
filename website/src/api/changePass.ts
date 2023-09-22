import { makeRequest } from "./makeRequest"

type Res = {
  token: string
}
export async function changePass(body: {
  currentPassword: string
  newPassword: string
}) {
  let data: Res = await makeRequest("/user", "put", body)
  return data
}
