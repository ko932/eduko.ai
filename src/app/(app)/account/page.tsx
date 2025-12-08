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
    { title: 'Tools Arsenal', text: 'Your digital lab for academic firepower.', imageId: 'tools-arsenal', link: '/tools' },
    { title: 'Program Evaluator', text: 'AI analyzes your academic profile.', imageId: 'program-evaluator', link: '/program-evaluator' },
    { title: 'Smart Notes', text: 'Generate top-level AI notes instantly.', imageId: 'smart-notes', link: '/smart-notes' },
    { title: 'Career Compass', text: 'Explore 50+ career paths.', imageId: 'career-compass', link: '/career-compass' },
    { title: 'Explore Streams', text: 'Find perfect academic streams.', imageId: 'explore-streams', link: '/streams' },
    { title: 'Form Central', text: 'Apply for any form in one place.', imageId: 'form-central', link: '/forms' },
    { title: 'Flashcards', text: 'Create and study digital flashcards.', imageId: 'flashcards', link: '/flashcards' },
    { title: 'Quiz Maker', text: 'Generate quizzes on any topic.', imageId: 'quiz-maker', link: '/quiz-maker' },
    { title: 'Exam Countdown', text: 'Track your upcoming exams.', imageId: 'exam-countdown', link: '/exam-countdown' },
    { title: 'AI Timetable Generator', text: 'Personalized study schedule.', imageId: 'ai-timetable-generator', link: '/timetable-ai' },
    { title: 'Study Battle Room', text: 'Group study with AI tutor.', imageId: 'study-battle-room', link: '/battle-room' },
    { title: 'Mr. Vasu – AI Math Tutor', text: 'Solve equations & visualize graphs.', imageId: 'math-tutor', link: '/math-tutor' },
    { title: 'Mr. Bondz – AI Chemistry Tutor', text: 'Learn reactions & stoichiometry.', imageId: 'chemistry-tutor', link: '/chemistry-tutor' },
    { title: 'Mr. Ohm – AI Physics Tutor', text: 'Mechanics, EM, thermodynamics help.', imageId: 'physics-tutor', link: '/physics-tutor' },
    { title: 'Mr. Aryan – Code Mentor', text: 'Debug & build code with AI.', imageId: 'code-mentor', link: '/code-mentor' },
    { title: 'Sanjivani AI – Medical Tutor', text: 'Medical & biology guidance.', imageId: 'medical-tutor', link: '/medical-tutor' },
    { title: 'Project GenX', text: 'Build complete AI project blueprints.', imageId: 'project-genx', link: '/project-genx' },
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
        <div className="max-w-xl mx-auto mb-8">
            <div className="flex flex-col justify-center bg-card/50 rounded-lg p-8">
                <h1 className="text-3xl font-headline font-bold mb-2">Welcome back, Warrior</h1>
                <p className="text-muted-foreground mb-6">This is your command center. Stay focused, stay sharp.</p>
                {quote.text && (
                    <blockquote className="border-l-2 border-primary pl-4 italic">
                        <p>"{quote.text}"</p>
                        <cite className="text-sm text-muted-foreground not-italic block mt-2">- {quote.author}</cite>
                    </blockquote>
                )}
            </div>
        </div>
        <div className="max-w-xl mx-auto">
            <Carousel className="w-full" opts={{ loop: true }}>
                <CarouselContent>
                {slides.map((slide, index) => {
                    const image = getImage(slide.imageId);
                    return (
                    <CarouselItem key={index}>
                        <Link href={slide.link}>
                        <div className="relative aspect-[40/7] rounded-lg overflow-hidden flex items-center justify-center text-center text-white p-1 bg-secondary">
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
                            <h1 className="text-base md:text-lg font-bold font-headline tracking-tight">
                                {slide.title}
                            </h1>
                            <p className="mt-1 max-w-2xl text-xs">
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
      </div>

      <div className="max-w-xl mx-auto">
        <h2 className="text-xl font-headline font-bold mb-4 text-center">Your Arsenal</h2>
        <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
          {arsenalItems.map((item) => (
            <Link href={item.href} key={item.label} className="group">
              <Card className="bg-card/50 hover:bg-secondary/50 hover:border-primary/50 transition-colors text-center aspect-square flex flex-col items-center justify-center p-2">
                <item.icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                <p className="mt-2 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors leading-tight">
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
