import { apiUrl } from "@/config"
// import { sessionStore } from "@/state/session"
import axios from "axios"

export async function makeRequest(path: string, method: string, body?: any) {
  const options = {
    method: method,
    path: path,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDQ4MzU5NjUsImlkIjoiMGQ0YjRmOTMtN2NkZC00YzdiLTgwOTQtZWFhMDY2ODE3MTNjIn0.BEIweSC2gameAtNA4JXeojZjFLpGL05Ely2KsPjxf78",
    },
  }
  const { data } = await axios(apiUrl + options.path, {
    ...options,
  })
  return data
}
