import { User } from "@/types"

import { makeRequest } from "./makeRequest"

type Res = User[]
export async function adminUsers() {
  let data: Res = await makeRequest("/admin/users", "get")
  return data
}
