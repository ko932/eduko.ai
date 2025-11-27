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
    icon: BookOpen,
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
    description: 'Collaborative study sessions with peers and AI tutors.',
    href: '#',
    active: false,
  },
  {
    icon: FlaskConical,
    title: 'Project GenX',
    description: 'Get full project blueprints from just an idea.',
    href: '/project-genx',
    active: true,
  },
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
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {tool.description}
                </p>
              </CardContent>
            </Card>
          );

          if (tool.active) {
            return (
              <Link href={tool.href} key={tool.title}>
                {ToolCard}
              </Link>
            );
          }
          return ToolCard;
        })}
      </div>
    </>
  );
}
