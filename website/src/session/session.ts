import { Session } from "@/types"
import { atom } from "nanostores"
import { create } from "zustand"

interface SessionState {
  session: Session | null
  alreadySet: boolean
  setSession: (s: Session | null) => void
  setAlreadySet: (s: boolean) => void
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  setSession: (s) => set(() => ({ session: s })),
  alreadySet: false,
  setAlreadySet: (b) => set(() => ({ alreadySet: b })),
}))

export const sessionStore = useSessionStore.getState()

export const $session = atom<Session | null>(null)

export function setSession(s: Session) {
  $session.set(s)
}
