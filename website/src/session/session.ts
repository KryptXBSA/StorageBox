
import { create } from "zustand"
import {  Session } from "@/types";

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

export const sessionStore = useSessionStore.getState()
