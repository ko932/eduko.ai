import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center justify-end gap-2 border-b bg-background/50 px-6 backdrop-blur-sm">
            <Button variant="ghost" asChild>
                <Link href="#">Login</Link>
            </Button>
            <Button asChild variant="destructive" className="shadow-[0_0_15px] shadow-red-500/50">
                <Link href="#">Sign Up</Link>
            </Button>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
