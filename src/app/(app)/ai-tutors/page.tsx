'use client';
import { useState, useRef, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Bot, Send, User, Loader2, Play, Pause, Volume2, Video } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { conversationalChat, ConversationalChatInput } from '@/ai/flows/conversational-chat';
import { generateSpeech, GenerateSpeechInput } from '@/ai/flows/generate-speech';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  role: 'user' | 'model';
  audioDataUri?: string;
}

const tutor = { 
  name: 'Ko AI', 
  icon: Bot, 
  persona: "You are Ko AI, a witty, slightly impatient, and incredibly knowledgeable AI assistant. You get straight to the point. You are here to help, but you won't suffer fools gladly. Your tone is sharp, concise, and maybe a little sarcastic, but always accurate.", 
  voice: 'Algenib' 
};

export default function AiTutorsPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar-1');
  const { toast } = useToast();
  
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getIntroMessage = (): Message => {
    return {
        id: 'intro-ko-ai',
        text: "Alright, what's on your mind? I haven't got all day. Ask me anything, but make it interesting.",
        role: 'model',
    };
  }

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.pause();
        setAudioPlaying(null);
    }
    setMessages([getIntroMessage()]);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handlePlayPause = (messageId: string, audioDataUri?: string) => {
    if (audioPlaying === messageId) {
      audioRef.current?.pause();
      setAudioPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioDataUri) {
        const newAudio = new Audio(audioDataUri);
        audioRef.current = newAudio;
        newAudio.play();
        setAudioPlaying(messageId);
        newAudio.onended = () => {
          setAudioPlaying(null);
        };
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      role: 'user',
    };

    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInput('');
    setIsLoading(true);

    try {
        const history: ConversationalChatInput['history'] = currentMessages.map(msg => ({
            role: msg.role,
            content: [{ text: msg.text }]
        }));

        const chatResponse = await conversationalChat({
            persona: tutor.persona,
            history: history,
            message: input,
        });

        const speechResponse = await generateSpeech({
            text: chatResponse.reply,
            voice: tutor.voice as GenerateSpeechInput['voice'],
        });

        const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: chatResponse.reply,
            role: 'model',
            audioDataUri: speechResponse.audioDataUri
        };
        setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
        console.error("Failed to get AI response:", error);
        toast({
            variant: 'destructive',
            title: 'An error occurred.',
            description: 'Failed to get a response from the AI. Please try again.',
        });
        // Revert the user's message on error
        setMessages(messages);
    } finally {
        setIsLoading(false);
    }
  };
  
  const TutorIcon = tutor.icon;

  return (
      <div className="flex flex-col h-[calc(100vh-8rem)]">
          <Card className="flex-grow flex flex-col">
              <CardHeader className='flex-row items-center justify-between'>
                <CardTitle className='font-headline flex items-center gap-2'>
                    <TutorIcon className="h-6 w-6" />
                    {tutor.name}
                </CardTitle>
                <Button asChild className="shadow-[0_0_20px] shadow-primary/50">
                    <Link href="/ko-live">
                        <Video className="mr-2 h-4 w-4" />
                        Go Live
                    </Link>
                </Button>
              </CardHeader>
              <CardContent className="flex-grow p-6 flex flex-col">
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
                          <Avatar className={cn(
                              "h-10 w-10 border-2 border-primary",
                                audioPlaying === message.id && 'animate-pulse border-sky-400 shadow-lg shadow-sky-400/50'
                              )}>
                              <AvatarFallback>
                                  <TutorIcon />
                              </AvatarFallback>
                          </Avatar>
                          )}
                          <div
                          className={cn(
                              'max-w-md rounded-lg p-3 relative',
                              message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground'
                          )}
                          >
                          <p className="text-sm pb-2">{message.text}</p>
                            {message.audioDataUri && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handlePlayPause(message.id, message.audioDataUri)}
                                className="absolute bottom-1 right-1 h-7 w-7 text-muted-foreground"
                              >
                                {audioPlaying === message.id ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                              </Button>
                            )}
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
                                      <TutorIcon />
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
                          placeholder={`Message ${tutor.name}...`}
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
                          AI Tutors can now speak. Enable audio to hear them.
                      </p>
                  </div>
              </CardContent>
          </Card>
      </div>
  );
}
