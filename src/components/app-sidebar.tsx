'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import {
  Bot,
  Calendar,
  Cpu,
  FileText,
  FlaskConical,
  GraduationCap,
  LayoutDashboard,
  LifeBuoy,
  Notebook,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserNav } from './user-nav';

const AppSidebar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <SidebarTrigger className="flex md:hidden"/>
            <Cpu className="w-8 h-8 text-primary" />
            <h1 className="font-bold text-lg font-headline">Eduko.AI</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarGroup>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/account')}
                tooltip="Dashboard"
              >
                <Link href="/account">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>AI Assistant</SidebarGroupLabel>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/ko-chat')}
                tooltip="Ko AI Chat"
              >
                <Link href="/ko-chat">
                  <Bot />
                  <span>Ko AI Chat</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>AI Tools</SidebarGroupLabel>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/project-genx')}
                tooltip="Project GenX"
              >
                <Link href="/project-genx">
                  <FlaskConical />
                  <span>Project GenX</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/program-evaluator')}
                tooltip="Program Evaluator"
              >
                <Link href="/program-evaluator">
                  <GraduationCap />
                  <span>Program Evaluator</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/timetable')}
                tooltip="Timetable Generator"
              >
                <Link href="/timetable">
                  <Calendar />
                  <span>Timetable Generator</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/smart-notes')}
                tooltip="Smart Notes"
              >
                <Link href="/smart-notes">
                  <Notebook />
                  <span>Smart Notes</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/forms')}
                tooltip="Form Central"
              >
                <Link href="/forms">
                  <FileText />
                  <span>Form Central</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Specialized Tutors</SidebarGroupLabel>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Mathematics" disabled>
                <span className="text-2xl">👨🏻‍🏫</span>
                  <span>Mr. Vasu (Maths)</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Chemistry" disabled>
                <span className="text-2xl">👨‍🔬</span>
                  <span>Mr. Bondz (Chemistry)</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton tooltip="Physics" disabled>
                <span className="text-2xl">👨‍🚀</span>
                  <span>Mr. Ohm (Physics)</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Medical Guide" disabled>
                <span className="text-2xl">👩‍⚕️</span>
                  <span>Sanjivani AI</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>

        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Support">
              <LifeBuoy />
              <span>Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center justify-between p-2 border-t mt-2">
            <div className="flex items-center gap-3">
                <UserNav />
                <div className="flex flex-col">
                    <span className="text-sm font-medium">Student</span>
                    <span className="text-xs text-muted-foreground">Free Plan</span>
                </div>
            </div>
            <ShieldCheck className="w-6 h-6 text-primary" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
