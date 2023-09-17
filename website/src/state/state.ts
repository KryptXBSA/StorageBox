import { File, Folder, Session, ViewAs } from "@/types"
import { useStore } from "@nanostores/react"
import { atom } from "nanostores"

export type State = {
  session: Session | null
  alreadySetSession: boolean
  viewAs: ViewAs
  initialDataFetched: boolean
  selectedFolder: Folder | null
  parents: Folder[]
  folders: Folder[]
  files: File[]
  searchQuery: string
}

export const $appState = atom<State>({
  session: null,
  alreadySetSession: false,
  viewAs: "list",
  initialDataFetched: false,
  parents: [],
  folders: [],
  files: [],
  selectedFolder: null,
  searchQuery: "",
})

export function getAppState() {
  return useStore($appState)
}

export function updateAppState(changes: Partial<State>) {
  $appState.set({ ...$appState.get(), ...changes })
}
