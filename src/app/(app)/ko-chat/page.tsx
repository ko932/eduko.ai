'use client';
import { useState, useRef, useEffect, FormEvent } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Bot, Send, User, Loader2 } from 'lucide-react';
import { conversationalChat, ConversationalChatInput } from '@/ai/flows/conversational-chat';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  role: 'user' | 'model';
}

const koPersona = "You are Ko AI, a witty, slightly impatient, and incredibly knowledgeable AI assistant. You get straight to the point. You are here to help, but you won't suffer fools gladly. Your tone is sharp, concise, and maybe a little sarcastic, but always accurate.";

export default function KoChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Alright, what's on your mind? I haven't got all day. Ask me anything, but make it interesting.",
      role: 'model',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar-1');
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      role: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const history: ConversationalChatInput['history'] = messages.map(msg => ({
            role: msg.role,
            content: [{ text: msg.text }]
        }));

        const response = await conversationalChat({
            persona: koPersona,
            history: history,
            message: input,
        });

        const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: response.reply,
            role: 'model'
        };
        setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
        console.error("Failed to get AI response:", error);
        toast({
            variant: 'destructive',
            title: 'An error occurred.',
            description: 'Failed to get a response from Ko AI. Please try again.',
        });
        setMessages(prev => prev.slice(0, -1));
    } finally {
        setIsLoading(false);
    }
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
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.role === 'model' && (
              <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarFallback>
                  <Bot />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                'max-w-md rounded-lg p-3',
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              )}
            >
              <p className="text-sm">{message.text}</p>
            </div>
            {message.role === 'user' && (
              <Avatar className="h-10 w-10">
                <AvatarImage src={userAvatar?.imageUrl} alt="User" />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
         {isLoading && (
            <div className="flex items-start gap-4 justify-start">
                <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarFallback>
                        <Bot />
                    </AvatarFallback>
                </Avatar>
                <div className="max-w-md rounded-lg p-3 bg-secondary text-secondary-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                </div>
            </div>
        )}
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
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
         <p className="text-xs text-center text-muted-foreground mt-2">
            Ko AI is now connected to a live model.
          </p>
      </div>
    </div>
  );
}
