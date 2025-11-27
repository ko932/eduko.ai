'use client';
import { useState, useRef, useEffect, FormEvent } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Bot, Send, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

const mockResponses = [
    "Alright, listen up. Here's the deal...",
    "You call that a question? Fine, let's break it down, but pay attention.",
    "Let me put it in terms even you can understand.",
    "Okay, here's the 10,000-foot view. Keep up.",
    "That's a common mistake. The actual reason is far more interesting...",
];

export default function KoChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Alright, what's on your mind? I haven't got all day. Ask me anything, but make it interesting.",
      sender: 'ai',
    },
  ]);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar-1');

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
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
        <h1 className="text-2xl font-bold font-headline mb-4">Ko AI Chat</h1>
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
                  <Bot />
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
            placeholder="Ask me anything, if you dare..."
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
            Ko AI is in a simulated interaction mode. Responses are for demonstration purposes.
          </p>
      </div>
    </div>
  );
}
