"use client"

import { useNoteStore, Note } from "@/lib/store"
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
  Code,
  ChevronLeft
} from "lucide-react"
import Link from "next/link"

interface EditorProps {
  note: Note
}

export default function Editor({ note }: EditorProps) {
  const updateNote = useNoteStore((state) => state.updateNote)
  const toggleFavorite = useNoteStore((state) => state.toggleFavorite)
  const deleteNote = useNoteStore((state) => state.deleteNote)

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
    content: note.content,
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none min-h-[500px]",
      },
    },
    onUpdate: ({ editor }) => {
      // Auto-save content
      updateNote(note.id, { content: editor.getHTML() })
    },
  })

  const [title, setTitle] = React.useState(note.title)
  const [isSaving, setIsSaving] = React.useState(false)

  // Sync title with store
  const handleTitleChange = (e: React.ChangeEvent<HTMLHeadingElement>) => {
    const newTitle = e.currentTarget.textContent || "Untitled"
    setTitle(newTitle)
    setIsSaving(true)
    updateNote(note.id, { title: newTitle })
    setTimeout(() => setIsSaving(false), 800)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
      {/* Editor Header/Toolbar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <div className="flex items-center gap-4 text-text-muted text-sm">
          <Link href="/" className="hover:text-white cursor-pointer transition-colors flex items-center gap-1">
            <ChevronLeft size={14} />
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-white font-medium truncate max-w-[200px]">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {isSaving && (
            <span className="text-[10px] text-brand-primary animate-pulse mr-2">Saving...</span>
          )}
          <button 
            onClick={() => toggleFavorite(note.id)}
            className={cn(
              "p-2 rounded-lg transition-colors",
              note.isFavorite ? "text-amber-400 bg-amber-400/10" : "text-text-muted hover:bg-white/5 hover:text-white"
            )}
          >
            <Star size={18} fill={note.isFavorite ? "currentColor" : "none"} />
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
        <h1 
          className="text-5xl font-bold tracking-tight outline-none focus:placeholder:opacity-10 caret-brand-primary" 
          contentEditable 
          suppressContentWarning
          onBlur={handleTitleChange}
        >
          {note.title}
        </h1>

        <div className="flex items-center gap-2 py-1 px-4 w-fit rounded-full bg-white/5 border border-white/10 text-xs text-text-muted">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          {note.folder}
        </div>

        <div className="min-h-[500px] text-lg leading-relaxed">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Floating Toolbar (Linear style) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-2xl flex items-center gap-2 shadow-2xl border border-white/10 z-[100]">
        <ToolbarButton icon={Type} label="Text" onClick={() => editor?.chain().focus().setParagraph().run()} />
        <ToolbarButton icon={CheckSquare} label="Task" onClick={() => editor?.chain().focus().toggleTaskList().run()} />
        <ToolbarButton icon={Code} label="Code" onClick={() => editor?.chain().focus().toggleCodeBlock().run()} />
        <div className="w-px h-4 bg-white/10 mx-1" />
        <ToolbarButton icon={History} label="History" />
        <ToolbarButton 
          icon={Trash2} 
          label="Delete" 
          danger 
          onClick={() => {
            if (confirm("Are you sure you want to delete this note?")) {
              deleteNote(note.id)
              window.location.href = "/"
            }
          }} 
        />
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
