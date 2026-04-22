"use client";

import Editor from "@/components/Editor/Editor";

export default function DemoNotePage() {
  const initialContent = `## Next.js 15 Learning Notes

Key features to master:
- App Router & Layouts
- Server Components (RSC)
- Streaming & Suspense
- Middleware for Auth
- Server Actions

### Middleware Example
\`\`\`typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}
\`\`\`

Todo:
[ ] Set up Postgres with Prisma
[ ] Implement Row Level Security (RLS)
[ ] Add Framer Motion transitions
`;

  return (
    <Editor 
      initialTitle="Next.js 15 Master Blueprint" 
      initialContent={initialContent} 
    />
  );
}
