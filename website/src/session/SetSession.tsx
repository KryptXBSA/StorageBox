"use client"

import { getAppState, updateAppState } from "@/state/state"
import { Session, UserData } from "@/types"

export function SetSession(props: {
  session: Session | null
  userData: UserData | null
}) {
  const state = getAppState()

  if (state.alreadySetSession) return <></>

  if (!state.session) {
    updateAppState({ session: props.session })
    updateAppState({ userData: props.userData })
  }
  updateAppState({ alreadySetSession: true })
  return <></>
}
