'use client';
import { useState, useRef, useEffect, FormEvent } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Bot, Send, User, Sigma, Atom, FlaskConical, Code, HeartPulse } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageHeader from '@/components/page-header';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  tutor: string;
}

const tutors = {
  'ko-ai': { name: 'Ko AI', icon: Bot, intro: "Alright, what's on your mind? I haven't got all day. Ask me anything, but make it interesting." },
  'mr-vasu': { name: 'Mr. Vasu', icon: Sigma, intro: 'Greetings. Present your mathematical query, and let us find the elegant solution.' },
  'mr-bondz': { name: 'Mr. Bondz', icon: Atom, intro: 'Welcome to the lab. What chemical mystery can I help you unravel today?' },
  'mr-ohm': { name: 'Mr. Ohm', icon: FlaskConical, intro: 'The universe operates on principles. State your physics problem, and we shall uncover them.' },
  'mr-aryan': { name: 'Mr. Aryan', icon: Code, intro: 'Ready to build? Show me your code or describe your project. Let\'s get started.' },
  'sanjivani-ai': { name: 'Sanjivani AI', icon: HeartPulse, intro: 'Hello. How can I assist with your medical and biological questions today? Please be detailed.' },
};

type TutorId = keyof typeof tutors;

const mockResponses: Record<TutorId, string[]> = {
    'ko-ai': [
        "Alright, listen up. Here's the deal...",
        "You call that a question? Fine, let's break it down, but pay attention.",
        "Let me put it in terms even you can understand.",
    ],
    'mr-vasu': [
        "By applying the fundamental theorem of calculus, we can deduce...",
        "The matrix must be inverted. Let's proceed with Gaussian elimination.",
        "That is a classic application of the Pythagorean theorem. Observe.",
    ],
    'mr-bondz': [
        "The reaction proceeds via an SN2 mechanism. Note the stereochemistry.",
        "According to Le Chatelier's principle, the equilibrium will shift to the left.",
        "The molar mass is crucial here. Let's calculate it first.",
    ],
    'mr-ohm': [
        "Newton's second law, F=ma, is the key to solving this problem.",
        "Conservation of energy dictates that the initial potential energy is converted to kinetic energy.",
        "Using Maxwell's equations, we can determine the electromagnetic field.",
    ],
    'mr-aryan': [
        "You have an off-by-one error in your loop. It should be `i < array.length`.",
        "This is a perfect use case for a recursive function. Let's define the base case.",
        "The API documentation specifies a different endpoint for this POST request.",
    ],
    'sanjivani-ai': [
        "The Krebs cycle is a series of chemical reactions to release stored energy. It begins with...",
        "Mitosis consists of four primary phases: prophase, metaphase, anaphase, and telophase.",
        "The sinoatrial node acts as the heart's natural pacemaker.",
    ],
};

export default function AiTutorsPage() {
  const [activeTutor, setActiveTutor] = useState<TutorId>('ko-ai');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar-1');

  useEffect(() => {
    setMessages([
        {
            id: 1,
            text: tutors[activeTutor].intro,
            sender: 'ai',
            tutor: activeTutor,
        }
    ])
  }, [activeTutor]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      tutor: activeTutor,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const responses = mockResponses[activeTutor];
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'ai',
        tutor: activeTutor
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };
  
  const CurrentTutorIcon = tutors[activeTutor].icon;

  return (
      <>
        <PageHeader title="AI Tutors" description="Engage with specialized AI tutors for expert-level explanations." />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-12rem)]">
            <div className="lg:col-span-1 flex flex-col gap-8">
                <Card>
                    <CardContent className="p-6">
                        <label htmlFor="tutor-select" className="text-sm font-medium text-muted-foreground">Select Tutor</label>
                        <Select value={activeTutor} onValueChange={(value) => setActiveTutor(value as TutorId)}>
                            <SelectTrigger id="tutor-select" className="w-full mt-2">
                                <SelectValue placeholder="Select a tutor" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(tutors).map(([id, {name, icon: Icon}]) => (
                                    <SelectItem key={id} value={id}>
                                        <div className="flex items-center gap-2">
                                            <Icon className="h-5 w-5" />
                                            <span>{name}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>
                 <Card className="flex-grow">
                    <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                         <CurrentTutorIcon className="h-24 w-24 text-primary mb-4" />
                         <h2 className="text-2xl font-bold font-headline">{tutors[activeTutor].name}</h2>
                         <p className="text-muted-foreground mt-2 text-sm">{tutors[activeTutor].intro}</p>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2 flex flex-col h-full">
                <Card className="flex-grow flex flex-col">
                    <CardContent className="flex-grow p-6 flex flex-col">
                        <div ref={scrollAreaRef} className="flex-1 overflow-y-auto pr-4 space-y-6">
                            {messages.map((message) => (
                            <div
                                key={message.id}
                                className={cn(
                                'flex items-start gap-4',
                                message.sender === 'user' ? 'justify-end' : 'justify-start'
                                )}
                            >
                                {message.sender === 'ai' && (
                                <Avatar className="h-10 w-10 border-2 border-primary">
                                    <AvatarFallback>
                                        <CurrentTutorIcon />
                                    </AvatarFallback>
                                </Avatar>
                                )}
                                <div
                                className={cn(
                                    'max-w-md rounded-lg p-3',
                                    message.sender === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-secondary text-secondary-foreground'
                                )}
                                >
                                <p className="text-sm">{message.text}</p>
                                </div>
                                {message.sender === 'user' && (
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={userAvatar?.imageUrl} alt="User" />
                                    <AvatarFallback>
                                    <User />
                                    </AvatarFallback>
                                </Avatar>
                                )}
                            </div>
                            ))}
                        </div>
                        <div className="mt-auto pt-4">
                            <form onSubmit={handleSubmit} className="relative">
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={`Message ${tutors[activeTutor].name}...`}
                                className="pr-20 min-h-[4rem]"
                                onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                                }}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                disabled={!input.trim()}
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                            </form>
                            <p className="text-xs text-center text-muted-foreground mt-2">
                                AI Tutors are in a simulated interaction mode. Responses are for demonstration.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </>
  );
}
