'use client';

import { Toaster } from 'sonner';

export default function ClientContext({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster position='top-center' />
    </>
  )
}