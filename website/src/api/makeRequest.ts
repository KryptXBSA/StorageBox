import { serverUrl } from "@/config"
import { $appState } from "@/state/state"
import axios from "axios"

export async function makeRequest(path: string, method: string, body?: any) {
  const token = $appState.get().session?.token
  const options = {
    method: method,
    path: path,
    data: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios(serverUrl + options.path, {
    ...options,
  })
  return data
}
