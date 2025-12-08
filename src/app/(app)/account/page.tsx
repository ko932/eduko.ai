'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Bot,
  Compass,
  FileText,
  Headphones,
  Lightbulb,
  Store,
  Wrench,
  Cpu,
  DollarSign,
  User,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const slides = [
  {
    title: 'Smart Doubt Solver',
    text: 'Instant answers. Zero waiting.',
    imageId: 'smart-doubt-solver',
    link: '/doubts',
  },
  {
    title: 'AI Lecture Notes',
    text: 'Auto notes for every chapter.',
    imageId: 'ai-lecture-notes',
    link: '/notes',
  },
  {
    title: 'Revision Planner',
    text: 'Your personalised plan.',
    imageId: 'revision-planner',
    link: '/planner',
  },
  {
    title: 'Mock Tests & Analytics',
    text: 'Know your scores instantly.',
    imageId: 'mock-tests-analytics',
    link: '/tests',
  },
  {
    title: 'Eduko AI Chat',
    text: 'Your personal AI partner.',
    imageId: 'eduko-ai-chat',
    link: '/ko-chat',
  },
  {
    title: 'Career Guidance',
    text: 'Choose your perfect path.',
    imageId: 'career-guidance',
    link: '/program-evaluator',
  },
];

const quotes = [
    {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },
    {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    }
];

const arsenalItems = [
  { icon: Bot, label: 'Ko AI', href: '/ko-chat' },
  { icon: Wrench, label: 'Tools', href: '/tools' },
  { icon: Compass, label: 'Career', href: '/program-evaluator' },
  { icon: FileText, label: 'Exams', href: '/exam-prep' },
  { icon: FileText, label: 'Form Central', href: '/forms' },
  { icon: Headphones, label: 'Counselling', href: '#' },
  { icon: Store, label: 'Store', href: '#' },
  { icon: DollarSign, label: 'Pricing Plans', href: '#' },
];

export default function DashboardPage() {
  const getImage = (id: string) => PlaceHolderImages.find((p) => p.id === id);
  const [quote, setQuote] = useState({ text: '', author: '' });

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).valueOf()) / (1000 * 60 * 60 * 24));
    setQuote(quotes[dayOfYear % quotes.length]);
  }, []);

  return (
    <>
      <div className="mb-12">
         <div className="flex flex-col justify-center bg-card/50 rounded-lg p-8 mb-8">
             <h1 className="text-3xl font-headline font-bold mb-2">Welcome back, Warrior</h1>
             <p className="text-muted-foreground mb-6">This is your command center. Stay focused, stay sharp.</p>
             {quote.text && (
                 <blockquote className="border-l-2 border-primary pl-4 italic">
                     <p>"{quote.text}"</p>
                     <cite className="text-sm text-muted-foreground not-italic block mt-2">- {quote.author}</cite>
                 </blockquote>
             )}
        </div>
        <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
            {slides.map((slide, index) => {
                const image = getImage(slide.imageId);
                return (
                <CarouselItem key={index}>
                    <Link href={slide.link}>
                      <div className="relative aspect-[21/9] rounded-lg overflow-hidden flex items-center justify-center text-center text-white p-8 bg-secondary">
                        {image && (
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="opacity-20"
                            data-ai-hint={image.imageHint}
                        />
                        )}
                        <div className="relative z-10">
                        <h1 className="text-2xl md:text-3xl font-bold font-headline tracking-tight">
                            {slide.title}
                        </h1>
                        <p className="mt-2 max-w-2xl text-base">
                            {slide.text}
                        </p>
                        </div>
                    </div>
                    </Link>
                </CarouselItem>
                );
            })}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
        </Carousel>
      </div>

      <div>
        <h2 className="text-3xl font-headline font-bold mb-6">Your Arsenal</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {arsenalItems.map((item) => (
            <Link href={item.href} key={item.label} className="group">
              <Card className="bg-card/50 hover:bg-secondary/50 hover:border-primary/50 transition-colors text-center aspect-square flex flex-col items-center justify-center p-4">
                <item.icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                <p className="mt-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  {item.label}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
