'use client';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Bot,
  ChevronDown,
  BookOpen,
  Calendar,
  Compass,
  FileText,
  FlaskConical,
  GraduationCap,
  Headphones,
  HeartPulse,
  Layers,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Store,
  Timer,
  Users,
  Wrench,
  Cpu,
  DollarSign,
  ClipboardCheck,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

const exams = [
  'NDA',
  'UPSC',
  'NEET',
  'JEE',
  'SSC',
  'Banking',
  'CAT',
  'IELTS',
  'TOEFL',
  'SAT',
  'GRE',
  'GMAT',
];

const mainArsenal = [
  {
    icon: Bot,
    title: 'Ko AI',
    description: 'Your personal all-in-one AI tutor for any subject.',
    href: '/ko-chat',
  },
  {
    icon: Headphones,
    title: 'Counselling',
    description: 'Guidance on study habits, stress, and motivation.',
    href: '#',
    disabled: true,
  },
  {
    icon: Store,
    title: 'Store',
    description: 'Curated study accessories and supplies.',
    href: '#',
    disabled: true,
  },
  {
    icon: DollarSign,
    title: 'Pricing Plans',
    description: 'Compare Free, Learner, and Beast Mode.',
    href: '#',
    disabled: true,
  },
  {
    icon: ClipboardCheck,
    title: 'Exams',
    description: 'Upcoming exams, syllabus, patterns, and strategy.',
    href: '#',
    disabled: true,
  },
  {
    icon: Wrench,
    title: 'All Tools',
    description: 'Explore your full arsenal of AI-powered tools.',
    href: '/tools',
  },
];

const tutors = [
    { name: 'Ko AI', role: 'Generalist Tutor', icon: Sparkles, href: "/ko-chat" },
    { name: 'Mr. Vasu', role: 'Math Tutor', icon: Cpu, href: "#" },
    { name: 'Mr. Bondz', role: 'Chemistry Tutor', icon: FlaskConical, href: "#" },
    { name: 'Mr. Ohm', role: 'Physics Tutor', icon: Lightbulb, href: "#" },
    { name: 'Mr. Aryan', role: 'Code Mentor', icon: FileText, href: "#" },
    { name: 'Sanjivani AI', role: 'Medical/Bio Tutor', icon: HeartPulse, href: "#" },
]

export default function DashboardPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="mb-12 rounded-lg border bg-card/50 p-8 text-center backdrop-blur-sm">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
          Welcome back, <span className="text-primary">Warrior</span>
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
          Eduko is your AI Academic Command Center — everything you need for
          learning, exams, career, and growth in one place.
        </p>
        <p className="mt-4 text-sm font-code italic text-muted-foreground/80">
          &quot;The secret of getting ahead is getting started.&quot; - Mark Twain
        </p>
      </div>

      {/* Customizable App Mode */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-2xl font-headline font-bold">
            Customize Your Workspace
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Select Exam / Goal <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {exams.map((exam) => (
                <DropdownMenuItem key={exam}>{exam}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Select your target to personalize the entire app — tools, quizzes,
          and suggestions will adapt to your path.
        </p>
      </div>

      {/* Arsenal Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-headline font-bold mb-6">Your Arsenal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainArsenal.map((tool) => {
            const cardContent = (
               <Card
                key={tool.title}
                className={`flex flex-col transition-all duration-300 ${
                  !tool.disabled
                    ? 'hover:shadow-lg hover:-translate-y-1 hover:border-primary/50'
                    : 'opacity-60 cursor-not-allowed bg-secondary/50'
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
                <CardContent className="flex-1">
                  <p className="text-muted-foreground text-sm">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            )
            if (tool.disabled) return cardContent;
            return <Link href={tool.href} key={tool.title}>{cardContent}</Link>
          })}
        </div>
      </div>
      
      {/* Exams & Tutors Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <h2 className="text-3xl font-headline font-bold mb-6">Exams Preview</h2>
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Upcoming Exams</CardTitle>
                    <CardDescription>A quick look at major upcoming exams.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 rounded-lg hover:bg-secondary/50">
                            <div>
                                <h3 className="font-semibold font-headline">JEE Advanced</h3>
                                <p className="text-sm text-muted-foreground">Pattern: 2 Papers, 3 Hrs Each | Difficulty: Very High</p>
                            </div>
                            <Button variant="ghost" size="sm">Details <ArrowRight className="w-4 h-4 ml-2"/></Button>
                        </div>
                         <div className="flex justify-between items-center p-3 rounded-lg hover:bg-secondary/50">
                            <div>
                                <h3 className="font-semibold font-headline">UPSC CSE Prelims</h3>
                                <p className="text-sm text-muted-foreground">Pattern: 2 Papers, Objective | Difficulty: High</p>
                            </div>
                            <Button variant="ghost" size="sm">Details <ArrowRight className="w-4 h-4 ml-2"/></Button>
                        </div>
                         <div className="flex justify-between items-center p-3 rounded-lg hover:bg-secondary/50">
                            <div>
                                <h3 className="font-semibold font-headline">NEET (UG)</h3>
                                <p className="text-sm text-muted-foreground">Pattern: 1 Paper, 200 Questions | Difficulty: High</p>
                            </div>
                           <Button variant="ghost" size="sm">Details <ArrowRight className="w-4 h-4 ml-2"/></Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div>
            <h2 className="text-3xl font-headline font-bold mb-6">AI Tutors</h2>
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Meet the Experts</CardTitle>
                    <CardDescription>Your team of specialized AI mentors.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-1">
                    {tutors.map(tutor => {
                        const content = (
                            <div key={tutor.name} className="flex items-center gap-4 p-2 rounded-lg hover:bg-secondary/50">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <tutor.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">{tutor.name}</p>
                                    <p className="text-xs text-muted-foreground">{tutor.role}</p>
                                </div>
                            </div>
                        );
                        if (tutor.href === "#") return content;
                        return <Link href={tutor.href} key={tutor.name}>{content}</Link>
                    })}
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
