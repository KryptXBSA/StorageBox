import { apiUrl } from "@/config"
import { $session, sessionStore } from "@/session/session"
// import { sessionStore } from "@/state/session"
import axios from "axios"

export async function makeRequest(path: string, method: string, body?: any) {
  const token = $session.get()?.token
  const options = {
    method: method,
    path: path,
    data: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios(apiUrl + options.path, {
    ...options,
  })
  return data
}
