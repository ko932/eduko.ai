'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Bot,
  Compass,
  FileText,
  Lightbulb,
  Wrench,
  BookOpen,
  Layers,
  BrainCircuit,
  Timer,
  Calendar,
  Users,
  FlaskConical,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const featuredTools = [
  {
    icon: Lightbulb,
    title: 'Program Evaluator',
    description: 'Get personalized college program suggestions based on your profile.',
    href: '/program-evaluator',
  },
  {
    icon: FileText,
    title: 'Smart Notes',
    description: 'Turn any text into comprehensive study materials.',
    href: '/smart-notes',
  },
  {
    icon: FlaskConical,
    title: 'Project GenX',
    description: 'Your personal AI project architect.',
    href: '/project-genx',
  },
];


export default function DashboardPage() {
  const oceanImage = PlaceHolderImages.find((p) => p.id === 'ocean-waves');
  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
          Welcome back, <span className="text-primary">Warrior</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          This is your command center. Stay focused, stay sharp.
        </p>
      </div>

      <Card className="mb-12 overflow-hidden border bg-card/50 backdrop-blur-sm">
        <div className="grid items-center md:grid-cols-2">
          <div className="p-8">
            <Lightbulb className="mb-4 h-8 w-8 text-primary" />
            <h2 className="mb-2 text-2xl font-headline font-bold">
              AI Program Evaluator
            </h2>
            <p className="mb-4 text-muted-foreground">
              Get personalized college program suggestions based on your
              profile.
            </p>
            <Button asChild>
              <Link href="/program-evaluator">
                Explore Feature <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative h-64 min-h-[250px] md:h-full">
            {oceanImage && (
              <Image
                src={oceanImage.imageUrl}
                alt={oceanImage.description}
                fill
                className="object-cover"
                data-ai-hint={oceanImage.imageHint}
              />
            )}
          </div>
        </div>
      </Card>

      <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-headline font-bold">Your Arsenal</h2>
            <Button asChild variant="link">
                <Link href="/tools">View All Tools <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTools.map(tool => (
                 <Card
                 key={tool.title}
                 className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50"
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
                 <div className="p-6 pt-0">
                    <Button asChild variant="link" className="p-0 text-base">
                        <Link href={tool.href}>
                            Get Started <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                 </div>
               </Card>
            ))}
        </div>
      </div>
    </>
  );
}
