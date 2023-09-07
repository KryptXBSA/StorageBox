import { Folder } from "@/types"
import { create } from "zustand"

interface SessionState {
  selectedFolder: Folder | null
  parents: Folder[]
  setSelectedFolder: (s: Folder) => void
  setParents: (s: Folder[]) => void
}

export const useFolderStore = create<SessionState>((set) => ({
  selectedFolder: null,
  parents: [],
  setSelectedFolder: (s) => set(() => ({ selectedFolder: s })),
  setParents: (b) => set(() => ({ parents: b })),
}))

export const folderStore = useFolderStore.getState()
