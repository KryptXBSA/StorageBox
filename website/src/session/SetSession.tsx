"use client"

import { getAppState, updateAppState } from "@/state/state"
import { Session } from "@/types"

export function SetSession(props: { session: Session | null }) {
  const state = getAppState()

  if (state.alreadySetSession) return <></>

  if (!state.session) {
    updateAppState({ session: props.session })
  }
  updateAppState({ alreadySetSession: true })
  return <></>
}
