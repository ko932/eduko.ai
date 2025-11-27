'use client';

import Link from 'next/link';
import {
  BookOpen,
  BrainCircuit,
  Calendar,
  Compass,
  FileText,
  FlaskConical,
  Layers,
  Lightbulb,
  Timer,
  Users,
  Wrench,
  Bot,
  GraduationCap,
  Atom,
  Code,
  HeartPulse,
  Sigma,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/page-header';

const tools = [
  {
    icon: Lightbulb,
    title: 'Program Evaluator',
    description: 'AI analysis of your academic profile for program suggestions.',
    href: '/program-evaluator',
    active: true,
  },
  {
    icon: FileText,
    title: 'Smart Notes',
    description: 'Generate top-level AI notes for any topic, from school to masters.',
    href: '/smart-notes',
    active: true,
  },
  {
    icon: Compass,
    title: 'Career Compass',
    description: 'Explore 50+ career paths across Science, Commerce, and Arts.',
    href: '#',
    active: false,
  },
  {
    icon: GraduationCap,
    title: 'Explore Streams',
    description: 'Discover academic streams and subject combinations.',
    href: '#',
    active: false,
  },
  {
    icon: FileText,
    title: 'Form Central',
    description: 'Initiate various application forms from a single point.',
    href: '/forms',
    active: true,
  },
  {
    icon: Layers,
    title: 'Flashcards',
    description: 'Create and study with digital flashcards.',
    href: '#',
    active: false,
  },
  {
    icon: BrainCircuit,
    title: 'Quiz Maker',
    description: 'Generate quizzes on any topic to test your knowledge.',
    href: '#',
    active: false,
  },
  {
    icon: Timer,
    title: 'Exam Countdown',
    description: 'Set timers for your upcoming exams.',
    href: '#',
    active: false,
  },
  {
    icon: Calendar,
    title: 'AI Timetable Generator',
    description: 'Generate a personalized study schedule based on your lifestyle.',
    href: '/timetable',
    active: true,
  },
  {
    icon: Users,
    title: 'Study Battle Room',
    description: 'Create or join a virtual study session with friends and an AI Tutor.',
    href: '#',
    active: false,
  },
  {
    icon: Sigma,
    title: 'Mr. Vasu – AI Math Tutor',
    description: 'Solve equations and visualize graphs with your AI math partner.',
    href: '/ai-tutors',
    active: true,
  },
  {
    icon: Atom,
    title: 'Mr. Bondz – AI Chemistry Tutor',
    description: 'Master reactions, stoichiometry, and periodic trends.',
    href: '/ai-tutors',
    active: true,
  },
  {
    icon: FlaskConical,
    title: 'Mr. Ohm – AI Physics Tutor',
    description: 'Solve mechanics, EM, and thermodynamics with expert guidance.',
    href: '/ai-tutors',
    active: true,
  },
  {
    icon: Code,
    title: 'Mr. Aryan – Code Mentor',
    description: 'Your AI partner for coding, debugging, and building projects.',
    href: '/ai-tutors',
    active: true,
  },
  {
    icon: HeartPulse,
    title: 'Sanjivani AI – Medical Tutor',
    description: 'An empathetic AI guide for complex medical and biological concepts.',
    href: '/ai-tutors',
    active: true,
  },
  {
    icon: BrainCircuit,
    title: 'Project GenX',
    description: 'Your personal AI project architect for creating detailed project blueprints.',
    href: '/project-genx',
    active: true,
  }
];

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        title="Tools Arsenal"
        description="Your digital lab for academic firepower. Everything you need to conquer your goals."
      >
        <Wrench className="w-8 h-8 text-primary" />
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const ToolCard = (
            <Card
              key={tool.title}
              className={`flex flex-col transition-all duration-300 ${
                tool.active
                  ? 'hover:shadow-lg hover:-translate-y-1 hover:border-primary/50'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <tool.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl">
                    {tool.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm">
                  {tool.description}
                </p>
              </CardContent>
            </Card>
          );

          if (tool.active) {
            return (
              <Link href={tool.href} key={tool.title} className="flex">
                {ToolCard}
              </Link>
            );
          }
          return <div key={tool.title}>{ToolCard}</div>;
        })}
      </div>
    </>
  );
}
