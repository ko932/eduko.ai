'use client';
import { useState, useEffect, FormEvent, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BrainCircuit, Mic, Send } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { conversationalChat, type ConversationalChatInput } from '@/ai/flows/conversational-chat';
import { generateSpeech } from '@/ai/flows/generate-speech';

// Check for SpeechRecognition API
const SpeechRecognition =
  (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition));


const welcomeMessages = [
  'Hello, Warrior. I’m Ko, your personal AI mentor.\nAsk me anything — I’m here to guide you, train you, and help you grow.',
  'Welcome back, Warrior.\nYour command center is ready.\nTell me what you want to learn today.',
  'Hey Warrior, glad to see you again.\nI’m Ko — your AI companion for studies, guidance, and ideas.\nHow can I help you today?',
  'You’re back, Warrior. And every time you return, you get stronger.\nAsk me anything — let’s build your future together.',
  'Ready when you are, Warrior.\nWhat do you want to explore today?',
  'Your journey starts now. Tell me what you want to learn.',
];

type Message = {
  role: 'user' | 'model';
  content: string;
};

export default function AiTutorsPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).valueOf()) /
        (1000 * 60 * 60 * 24)
    );
    setMessages([
      {
        role: 'model',
        content: welcomeMessages[dayOfYear % welcomeMessages.length],
      },
    ]);

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
        setInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleMicClick = () => {
    if (!SpeechRecognition) {
        alert("Your browser doesn't support speech recognition.");
        return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInput('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const playAudio = (audioDataUri: string) => {
    const audio = new Audio(audioDataUri);
    audio.play();
  };

  const handleChatSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input || isLoading) return;
    if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
    }

    const newUserMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const chatInput: ConversationalChatInput = {
        persona: 'a witty and slightly impatient AI assistant named Ko',
        history: messages.map((m) => ({
          role: m.role,
          content: [{ text: m.content }],
        })),
        message: input,
      };

      const result = await conversationalChat(chatInput);
      setMessages([...newMessages, { role: 'model', content: result.reply }]);

      // Generate and play speech
      const speechResult = await generateSpeech({ text: result.reply });
      playAudio(speechResult.audioDataUri);

    } catch (error) {
      console.error('Error during chat:', error);
      const errorMessage = "Sorry, I'm having trouble connecting right now.";
      setMessages([...newMessages, { role: 'model', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

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
        <Button
          asChild
          variant="destructive"
          className="shadow-[0_0_20px] shadow-red-500/60"
        >
          <Link href="/ko-live">Go Live with Ko</Link>
        </Button>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between p-6 pt-0">
        <div className="flex-grow space-y-4 overflow-y-auto pr-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'model' && (
                <Avatar className="w-8 h-8 border-2 border-primary/50">
                  <AvatarFallback className="bg-primary/20">
                    <BrainCircuit className="w-5 h-5 text-primary" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-line',
                  message.role === 'user'
                    ? 'bg-primary/90 text-primary-foreground'
                    : 'bg-secondary'
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <Avatar className="w-8 h-8 border-2 border-primary/50">
                <AvatarFallback className="bg-primary/20">
                  <BrainCircuit className="w-5 h-5 text-primary animate-pulse" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-secondary rounded-lg px-4 py-3">
                <span className="animate-pulse">...</span>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4">
          <form onSubmit={handleChatSubmit} className="relative">
            <Textarea
              placeholder="Message Ko..."
              className="pr-24 bg-background/50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleChatSubmit(e);
                }
              }}
              disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Button type="button" size="icon" variant="ghost" onClick={handleMicClick} disabled={isLoading}>
                <Mic className={cn("h-5 w-5", isListening ? "text-red-500 animate-pulse" : "")} />
              </Button>
              <Button type="submit" size="icon" disabled={isLoading || !input}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
