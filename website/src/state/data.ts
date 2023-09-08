import { File, Folder } from "@/types"
import { create } from "zustand"

interface SessionState {
  initialDataFetched: boolean
  setInitialDataFetched: (s: boolean) => void
  selectedFolder: Folder | null
  setSelectedFolder: (s: Folder | null) => void
  parents: Folder[]
  setParents: (s: Folder[]) => void
  folders: Folder[]
  setFolders: (s: Folder[]) => void
  files: File[]
  setFiles: (s: File[]) => void
  searchQuery: string
  setSearchQuery: (s: string) => void
}

export const useDataStore = create<SessionState>((set) => {
  return {
    initialDataFetched: false,
    setInitialDataFetched: (b) => set(() => ({ initialDataFetched: b })),
    folders: [],
    setFolders: (b) => set(() => ({ folders: b })),
    files: [],
    setFiles: (b) => set(() => ({ files: b })),
    selectedFolder: null,
    setSelectedFolder: (s) => set(() => ({ selectedFolder: s })),
    parents: [],
    setParents: (b) => set(() => ({ parents: b })),
    searchQuery: "",
    setSearchQuery: (b) => set(() => ({ searchQuery: b })),
  }
})

export const dataStore = useDataStore.getState()
