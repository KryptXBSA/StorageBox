import { File, Folder, Session, UserData, ViewAs } from "@/types"
import { useStore } from "@nanostores/react"
import { atom } from "nanostores"

export type State = {
  session: Session | null
  userData: UserData | null
  alreadySetSession: boolean
  viewAs: ViewAs
  initialDataFetched: boolean
  showSidebar: boolean
  selectedFolder: Folder | null
  parents: Folder[]
  folders: Folder[]
  files: File[]
  selectedFile: File | null
  searchQuery: string
}

export const $appState = atom<State>({
  session: null,
  userData: null,
  selectedFile: null,
  alreadySetSession: false,
  showSidebar: false,
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
