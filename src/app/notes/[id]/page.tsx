"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useNoteStore, Note } from "@/lib/store"
import Editor from "@/components/Editor/Editor"

export default function NotePage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const getNote = useNoteStore((state) => state.getNote)
  const [note, setNote] = useState<Note | undefined>(undefined)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const foundNote = getNote(id)
    if (foundNote) {
      setNote(foundNote)
    } else {
      // Note not found, redirect to dashboard or show 404
      // router.push("/")
    }
    setIsLoaded(true)
  }, [id, getNote])

  if (!isLoaded) return null

  if (!note) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Note not found</h2>
          <button 
            onClick={() => router.push("/")}
            className="text-brand-primary hover:underline"
          >
            Go back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return <Editor note={note} />
}
