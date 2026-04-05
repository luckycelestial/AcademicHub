import { ReactNode } from 'react';
import Sidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/30 text-foreground w-full">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full relative">
        <Header />
        <main className="p-4 md:p-6 overflow-auto flex-1">{children}</main>
      </div>
    </div>
  );
}
