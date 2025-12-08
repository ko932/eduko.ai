'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BrainCircuit, Mic, Send } from 'lucide-react';

export default function AiTutorsPage() {
  return (
      <div className="flex flex-col h-[calc(100vh-8rem)]">
          <main className="flex-grow flex flex-col p-6">
              <header className="flex items-center justify-between mb-8">
                <div className='flex items-center gap-4'>
                    <BrainCircuit className="h-8 w-8 text-primary" />
                    <div>
                        <h1 className='text-2xl font-bold font-headline'>Chat with Ko</h1>
                        <p className="text-muted-foreground text-sm">Your personal AI command center.</p>
                    </div>
                </div>
                <Button asChild>
                    <Link href="/ko-live">
                        Go Live with Ko
                    </Link>
                </Button>
              </header>
              <div className="flex-grow flex items-center justify-center">
                <p className="text-muted-foreground">Ask Ko anything to start the conversation.</p>
              </div>
              <div className="mt-auto">
                  <form className="relative">
                  <Textarea
                      placeholder="Message Ko..."
                      className="pr-24"
                      disabled
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        disabled
                    >
                        <Mic className="h-5 w-5" />
                    </Button>
                    <Button
                        type="submit"
                        size="icon"
                        disabled
                    >
                        <Send className="h-5 w-5" />
                    </Button>
                  </div>
                  </form>
              </div>
          </main>
      </div>
  );
}
