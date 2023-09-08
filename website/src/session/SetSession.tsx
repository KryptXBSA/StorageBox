"use client"

import { Session } from "@/types"
import { useStore } from "@nanostores/react"

import { $session, setSession as ss, useSessionStore } from "./session"

export function SetSession(props: { session: Session | null }) {
  const { setAlreadySet, setSession, session, alreadySet } = useSessionStore()

  if (alreadySet) return <></>

  if (!session) {
    ss(props.session!)
    setSession(props.session)
  }
  setAlreadySet(true)
  return <></>
}
