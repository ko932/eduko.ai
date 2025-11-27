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
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  Atom,
  Bot,
  Compass,
  FileText,
  HelpCircle,
  Home,
  MessageSquare,
  Store as StoreIcon,
  Wrench,
  DollarSign,
  Headphones,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cpu } from 'lucide-react';

const AppSidebar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <SidebarTrigger className="flex md:hidden"/>
            <Cpu className="w-7 h-7 text-primary" />
            <h1 className="font-bold text-lg font-headline">Eduko</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarGroup className="pt-0">
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/account')}
                tooltip="Home"
              >
                <Link href="/account">
                  <Home />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/ko-chat')}
                tooltip="Ko AI"
              >
                <Link href="/ko-chat">
                  <Bot />
                  <span>Ko AI</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/ai-tutors')}
                tooltip="AI Tutors"
              >
                <Link href="/ai-tutors">
                  <Atom />
                  <span>AI Tutors</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/tools')}
                tooltip="Tools"
              >
                <Link href="/tools">
                  <Wrench />
                  <span>Tools</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/program-evaluator')}
                tooltip="Career Compass"
              >
                <Link href="/program-evaluator">
                  <Compass />
                  <span>Career Compass</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/pricing')}
                tooltip="Pricing"
                disabled
              >
                <Link href="#">
                  <DollarSign />
                  <span>Pricing</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/store')}
                tooltip="Store"
                disabled
              >
                <Link href="#">
                  <StoreIcon />
                  <span>Store</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/exams')} tooltip="Exams" disabled>
                    <Link href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle"><circle cx="12" cy="12" r="10"/></svg>
                        <span>Exams</span>
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
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/feedback')} tooltip="Feedback" disabled>
                <Link href="#"><MessageSquare /><span>Feedback</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/counselling')} tooltip="Counselling" disabled>
                <Link href="#"><Headphones /><span>Counselling</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/faq')} tooltip="FAQ" disabled>
                <Link href="#"><HelpCircle /><span>FAQ</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton>
                    <User />
                    <span>Login / Sign Up</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
