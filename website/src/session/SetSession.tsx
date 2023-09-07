"use client"

import { Session } from "@/types"

import { useSessionStore } from "./session"

export function SetSession(props: { session: Session | null }) {
  const { setAlreadySet, setSession, session, alreadySet } = useSessionStore()
  if (alreadySet) return <></>
  if (!session) {
    setSession(props.session)
  }
  setAlreadySet(true)
  return <></>
}
