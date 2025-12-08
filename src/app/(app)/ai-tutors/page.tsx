'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BrainCircuit, Mic, Send } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const welcomeMessages = [
  {
    text: 'Hello, Warrior. I’m Ko, your personal AI mentor.\nAsk me anything — I’m here to guide you, train you, and help you grow.',
  },
  {
    text: 'Welcome back, Warrior.\nYour command center is ready.\nTell me what you want to learn today.',
  },
  {
    text: 'Hey Warrior, glad to see you again.\nI’m Ko — your AI companion for studies, guidance, and ideas.\nHow can I help you today?',
  },
  {
    text: 'You’re back, Warrior. And every time you return, you get stronger.\nAsk me anything — let’s build your future together.',
  },
  {
    text: 'Ready when you are, Warrior.\nWhat do you want to explore today?',
  },
  {
    text: 'Your journey starts now. Tell me what you want to learn.',
  },
];

export default function AiTutorsPage() {
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    // Cycle through messages daily
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).valueOf()) / (1000 * 60 * 60 * 24));
    setWelcomeMessage(welcomeMessages[dayOfYear % welcomeMessages.length].text);
  }, []);

  return (
    <Card className="h-[calc(100vh-8rem)] flex flex-col bg-card/80 border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <BrainCircuit className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold font-headline">Chat with Ko</h1>
            <p className="text-muted-foreground text-sm">
              Your personal AI command center.
            </p>
          </div>
        </div>
        <Button asChild variant="destructive" className="shadow-[0_0_20px] shadow-red-500/60">
          <Link href="/ko-live">Go Live with Ko</Link>
        </Button>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between p-6 pt-0">
        <div className="flex-grow flex items-center justify-center text-center">
            {welcomeMessage ? (
              <p className="text-muted-foreground whitespace-pre-line">{welcomeMessage}</p>
            ) : (
              <p className="text-muted-foreground">Ask Ko anything to start the conversation.</p>
            )
            }
        </div>
        <div className="mt-auto">
          <form className="relative">
            <Textarea
              placeholder="Message Ko..."
              className="pr-24 bg-background/50"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Button type="button" size="icon" variant="ghost">
                <Mic className="h-5 w-5" />
              </Button>
              <Button type="submit" size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
