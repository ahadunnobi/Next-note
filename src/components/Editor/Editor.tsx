"use client"

import React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { lowlight } from "lowlight"
import { 
  MoreHorizontal, 
  Share2, 
  Star, 
  Type,
  ImageIcon,
  Link2,
  History,
  Trash2,
  Zap,
  CheckSquare,
  Code
} from "lucide-react"

interface EditorProps {
  initialTitle?: string
  initialContent?: string
}

export default function Editor({ initialTitle = "Untitled", initialContent = "" }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Press '/' for commands...",
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none min-h-[500px]",
      },
    },
  })

  // Basic Slash Menu Trigger (Logic can be expanded)
  const [showSlashMenu, setShowSlashMenu] = React.useState(false)

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
      {/* Editor Header/Toolbar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <div className="flex items-center gap-4 text-text-muted text-sm">
          <span className="hover:text-white cursor-pointer transition-colors">Notes</span>
          <span>/</span>
          <span className="text-white font-medium">{initialTitle}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/5 rounded-lg text-text-muted hover:text-white transition-colors">
            <Star size={18} />
          </button>
          <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors border border-white/5 flex items-center gap-2">
            <Share2 size={16} />
            Share
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg text-text-muted hover:text-white transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="space-y-6">
        <h1 className="text-5xl font-bold tracking-tight outline-none focus:placeholder:opacity-10" contentEditable suppressContentWarning>
          {initialTitle}
        </h1>

        <div className="flex items-center gap-2 py-1 px-4 w-fit rounded-full bg-white/5 border border-white/10 text-xs text-text-muted">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          Best-in-class Editor Active
        </div>

        <div className="min-h-[500px] text-lg leading-relaxed">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Slash Menu Placeholder */}
      {showSlashMenu && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass w-64 p-2 rounded-xl shadow-2xl border border-white/10">
          <p className="p-2 text-xs font-bold text-text-muted uppercase tracking-widest">Commands</p>
          <div className="space-y-1">
            <CommandItem icon={CheckSquare} label="Task List" />
            <CommandItem icon={Code} label="Code Block" />
          </div>
        </div>
      )}

      {/* Floating Toolbar (Linear style) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-2xl flex items-center gap-2 shadow-2xl border border-white/10 z-[100]">
        <ToolbarButton icon={Type} label="Text" onClick={() => editor?.chain().focus().setParagraph().run()} />
        <ToolbarButton icon={CheckSquare} label="Task" onClick={() => editor?.chain().focus().toggleTaskList().run()} />
        <ToolbarButton icon={Code} label="Code" onClick={() => editor?.chain().focus().toggleCodeBlock().run()} />
        <div className="w-px h-4 bg-white/10 mx-1" />
        <ToolbarButton icon={History} label="History" />
        <ToolbarButton icon={Trash2} label="Delete" danger />
      </div>
    </div>
  )
}

function ToolbarButton({ icon: Icon, label, onClick, danger }: { icon: any, label: string, onClick?: () => void, danger?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm font-medium ${danger ? 'text-red-400 hover:bg-red-400/10' : 'text-text-muted hover:bg-white/5 hover:text-white'}`}
    >
      <Icon size={16} />
      <span>{label}</span>
    </button>
  )
}

function CommandItem({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer group">
      <Icon size={16} className="text-text-muted group-hover:text-brand-primary" />
      <span className="text-sm font-medium group-hover:text-white">{label}</span>
    </div>
  )
}
