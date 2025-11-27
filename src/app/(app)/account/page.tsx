'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Bot,
  Compass,
  FileText,
  Headphones,
  Lightbulb,
  Wrench,
  DollarSign,
  Store,
  ClipboardCheck,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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

      <blockquote className="relative my-8 border-l-4 border-primary pl-4 text-lg italic">
        "The best way to predict the future is to create it."
        <footer className="mt-2 w-full pr-4 text-right text-sm not-italic text-muted-foreground">
          - Peter Drucker
        </footer>
      </blockquote>

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
            <Button asChild variant="link" className="p-0 text-base">
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
        <h2 className="mb-6 text-3xl font-headline font-bold">Your Arsenal</h2>
        <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4 lg:grid-cols-8">
          <Link href="/ko-chat" className="flex">
            <Card className="flex flex-1 flex-col items-center justify-center gap-2 p-4  aspect-square transition-colors hover:bg-accent">
              <Bot className="h-8 w-8" />
              <span className="text-sm font-medium">Ko AI</span>
            </Card>
          </Link>
          <Link href="#" className="flex">
            <Card className="flex flex-1 flex-col items-center justify-center gap-2 p-4  aspect-square transition-colors hover:bg-accent">
              <Wrench className="h-8 w-8" />
              <span className="text-sm font-medium">Tools</span>
            </Card>
          </Link>
          <Link href="/program-evaluator" className="flex">
            <Card className="flex flex-1 flex-col items-center justify-center gap-2 p-4  aspect-square transition-colors hover:bg-accent">
              <Compass className="h-8 w-8" />
              <span className="text-sm font-medium">Career</span>
            </Card>
          </Link>
          <Link href="#" className="flex">
            <Card className="flex flex-1 flex-col items-center justify-center gap-2 p-4  aspect-square transition-colors hover:bg-accent">
              <ClipboardCheck className="h-8 w-8" />
              <span className="text-sm font-medium">Exams</span>
            </Card>
          </Link>
          <Link href="/forms" className="flex">
            <Card className="flex flex-1 flex-col items-center justify-center gap-2 p-4  aspect-square transition-colors hover:bg-accent">
              <FileText className="h-8 w-8" />
              <span className="text-sm font-medium">Form Central</span>
            </Card>
          </Link>
          <Link href="#" className="flex">
            <Card className="flex flex-1 flex-col items-center justify-center gap-2 p-4  aspect-square transition-colors hover:bg-accent">
              <Headphones className="h-8 w-8" />
              <span className="text-sm font-medium">Counselling</span>
            </Card>
          </Link>
          <Link href="#" className="flex">
            <Card className="flex flex-1 flex-col items-center justify-center gap-2 p-4  aspect-square transition-colors hover:bg-accent">
              <Store className="h-8 w-8" />
              <span className="text-sm font-medium">Store</span>
            </Card>
          </Link>
          <Link href="#" className="flex">
            <Card className="flex flex-1 flex-col items-center justify-center gap-2 p-4  aspect-square transition-colors hover:bg-accent">
              <DollarSign className="h-8 w-8" />
              <span className="text-sm font-medium">Pricing</span>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
}
