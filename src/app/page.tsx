"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button, Chip } from "@heroui/react"
import { 
  ArrowUpRight, 
  Code2, 
  Layout, 
  Zap, 
  FileText,
  Star,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useNoteStore } from "@/lib/store"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const notes = useNoteStore((state) => state.notes)
  const addNote = useNoteStore((state) => state.addNote)

  const stats = [
    { label: "Total Notes", value: notes.length.toString(), icon: FileText, color: "text-blue-400" },
    { label: "Favorites", value: notes.filter(n => n.isFavorite).length.toString(), icon: Star, color: "text-amber-400" },
    { label: "Recent Folders", value: Array.from(new Set(notes.map(n => n.folder))).length.toString(), icon: Code2, color: "text-emerald-400" },
  ]

  const recentNotes = [...notes]
    .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
    .slice(0, 5)

  const handleNewNote = () => {
    const id = addNote()
    router.push(`/notes/${id}`)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold tracking-tight">Good Evening, Ahad</h1>
            <Chip color="primary" variant="flat" size="sm" className="mt-1">Pro Plan</Chip>
          </div>
          <p className="text-text-muted text-lg">Here's what's happening with your tech stacks today.</p>
        </div>
        <Button 
          color="primary" 
          variant="shadow" 
          startContent={<Zap size={18} />}
          className="font-medium h-11"
          onClick={handleNewNote}
        >
          New Quick Note
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="linear-border p-6 rounded-2xl bg-white/5 space-y-4 hover:bg-white/[0.07] transition-colors"
          >
            <div className={cn("p-2 rounded-lg bg-white/5 w-fit", stat.color)}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-text-muted text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4">
        {/* Recent Notes */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock size={20} className="text-text-muted" />
              Recent Notes
            </h2>
            <button className="text-sm font-medium text-brand-primary flex items-center gap-1 hover:underline">
              View all
              <ArrowUpRight size={14} />
            </button>
          </div>
          
          <div className="space-y-3">
            {recentNotes.length > 0 ? recentNotes.map((note) => (
              <div 
                key={note.id}
                onClick={() => router.push(`/notes/${note.id}`)}
                className="group flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-text-muted group-hover:text-brand-primary transition-colors">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium group-hover:text-white mb-0.5">{note.title}</h4>
                    <p className="text-xs text-text-muted flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5">{note.folder}</span>
                      {new Date(note.updatedAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-text-muted opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            )) : (
              <div className="p-8 text-center border border-dashed border-white/10 rounded-xl">
                <p className="text-text-muted italic">No notes yet. Create one to get started!</p>
              </div>
            )}
          </div>
        </div>

        {/* Tech Stack Focus */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Layout size={20} className="text-text-muted" />
              Stack Focus
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {["Next.js", "React", "TypeScript", "Tailwind"].map((tech) => (
              <div 
                key={tech}
                onClick={handleNewNote}
                className="linear-border aspect-square rounded-2xl bg-white/5 flex flex-col items-center justify-center gap-3 hover:bg-white/[0.07] transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand-primary/50 transition-colors">
                  <Code2 size={24} className="text-text-muted group-hover:text-brand-primary transition-colors" />
                </div>
                <span className="font-semibold">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
