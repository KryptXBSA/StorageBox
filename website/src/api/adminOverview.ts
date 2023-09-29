import { makeRequest } from "./makeRequest"

export interface Res {
  fileCount: number
  totalStorage: number
  userCount: number
}
export async function adminOverview() {
  let data: Res = await makeRequest("/admin/overview", "get")
  return data
}
