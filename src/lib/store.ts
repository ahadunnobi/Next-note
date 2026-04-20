import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Note {
  id: string
  title: string
  content: string
  folder: string
  isFavorite: boolean
  updatedAt: number
  createdAt: number
}

interface NoteState {
  notes: Note[]
  addNote: (note?: Partial<Note>) => string
  updateNote: (id: string, updates: Partial<Note>) => void
  deleteNote: (id: string) => void
  toggleFavorite: (id: string) => void
  getNote: (id: string) => Note | undefined
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set, get) => ({
      notes: [],
      
      addNote: (noteData) => {
        const id = Math.random().toString(36).substring(2, 11)
        const newNote: Note = {
          id,
          title: "Untitled Note",
          content: "",
          folder: "General",
          isFavorite: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          ...noteData,
        }
        
        set((state) => ({
          notes: [newNote, ...state.notes],
        }))
        
        return id
      },
      
      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id 
              ? { ...note, ...updates, updatedAt: Date.now() } 
              : note
          ),
        }))
      },
      
      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }))
      },
      
      toggleFavorite: (id) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
          ),
        }))
      },
      
      getNote: (id) => {
        return get().notes.find((note) => note.id === id)
      },
    }),
    {
      name: 'next-note-storage',
    }
  )
)
