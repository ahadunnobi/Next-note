"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  MoreHorizontal, 
  Share2, 
  Star, 
  Trash2, 
  History,
  Link2,
  Image as ImageIcon,
  Type
} from "lucide-react"

interface EditorProps {
  initialTitle?: string
  initialContent?: string
}

export default function Editor({ initialTitle = "Untitled", initialContent = "" }: EditorProps) {
  const [title, setTitle] = useState(initialTitle)

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Editor Header/Toolbar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <div className="flex items-center gap-4 text-text-muted text-sm">
          <span>Notes</span>
          <span>/</span>
          <span className="text-white font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/5 rounded-lg text-text-muted hover:text-white transition-colors">
            <Star size={18} />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg text-text-muted hover:text-white transition-colors">
            <Share2 size={18} />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg text-text-muted hover:text-white transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="space-y-6">
        <input 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note Title"
          className="w-full bg-transparent border-none outline-none text-5xl font-bold tracking-tight placeholder:text-text-muted/20"
        />

        <div className="flex items-center gap-2 py-1 px-4 w-fit rounded-full bg-white/5 border border-white/10 text-xs text-text-muted">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Last edited 2 mins ago
        </div>

        <div className="min-h-[500px] text-lg leading-relaxed text-foreground/90 prose prose-invert max-w-none">
          <textarea 
            placeholder="Start typing your Next.js notes..."
            className="w-full h-full bg-transparent border-none outline-none resize-none min-h-[500px] placeholder:text-text-muted/20"
            defaultValue={initialContent}
          />
        </div>
      </div>

      {/* Floating Toolbar (Linear style) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-2xl flex items-center gap-2 shadow-2xl border border-white/10">
        <ToolbarButton icon={Type} label="Text" />
        <ToolbarButton icon={ImageIcon} label="Image" />
        <ToolbarButton icon={Link2} label="Link" />
        <div className="w-px h-4 bg-white/10 mx-1" />
        <ToolbarButton icon={History} label="History" />
        <ToolbarButton icon={Trash2} label="Delete" danger />
      </div>
    </div>
  )
}

function ToolbarButton({ icon: Icon, label, danger }: { icon: any, label: string, danger?: boolean }) {
  return (
    <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm font-medium ${danger ? 'text-red-400 hover:bg-red-400/10' : 'text-text-muted hover:bg-white/5 hover:text-white'}`}>
      <Icon size={16} />
      <span>{label}</span>
    </button>
  )
}
