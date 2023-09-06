"use client"

import { create } from "zustand"

type Session = { id: string; token: string }
interface SessionState {
  session: Session | null
  alreadySet: boolean
  setSession: (s: Session | null) => void
  setAlreadySet: (s: boolean) => void
}

export const useSessionStore = create<SessionState>((set) => ({
  session: { id: "a", token: "b" },
  userData: null,
  setSession: (s) => set(() => ({ session: s })),
  alreadySet: false,
  setAlreadySet: (b) => set(() => ({ alreadySet: b })),
}))

// export function SetSession(props: {
//   session: Session | null
//   userData: UserData | null
// }) {
//   // console.log("pppppppp",props)
//   const { setAlreadySet, setSession, session, alreadySet } = useSessionStore()
//   if (alreadySet) return <></>
//   // console.log("xxxxx",session,userData)
//   if (!session) {
//     setSession(props.session)
//   }
//   setAlreadySet(true)
//   // console.log("ffffffffffffff")
//   return <></>
// }

export const sessionStore = useSessionStore.getState()
