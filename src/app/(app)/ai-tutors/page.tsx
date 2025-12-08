'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BrainCircuit, Mic, Send } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function AiTutorsPage() {
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
        <div className="flex-grow flex items-center justify-center">
            <p className="text-muted-foreground">Ask Ko anything to start the conversation.</p>
        </div>
        <div className="mt-auto">
          <form className="relative">
            <Textarea
              placeholder="Message Ko..."
              className="pr-24 bg-background/50"
              disabled
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Button type="button" size="icon" variant="ghost" disabled>
                <Mic className="h-5 w-5" />
              </Button>
              <Button type="submit" size="icon" disabled>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
