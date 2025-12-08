'use client';
import { useState, useRef, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Bot, Send, User, Sigma, Atom, FlaskConical, Code, HeartPulse, Loader2, Play, Pause, Volume2, Video } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageHeader from '@/components/page-header';
import { conversationalChat, ConversationalChatInput } from '@/ai/flows/conversational-chat';
import { generateSpeech, GenerateSpeechInput } from '@/ai/flows/generate-speech';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  role: 'user' | 'model';
  audioDataUri?: string;
}

const tutors = {
  'ko-ai': { name: 'Ko AI', icon: Bot, persona: "You are Ko AI, a witty, slightly impatient, and incredibly knowledgeable AI assistant. You get straight to the point. You are here to help, but you won't suffer fools gladly. Your tone is sharp, concise, and maybe a little sarcastic, but always accurate.", voice: 'Algenib' },
  'mr-vasu': { name: 'Mr. Vasu', icon: Sigma, persona: 'You are Mr. Vasu, a master of mathematics. Your personality is precise, logical, and elegant. You find beauty in numbers and proofs. Address the user with respect and guide them to the correct mathematical understanding.', voice: 'Arcturus' },
  'mr-bondz': { name: 'Mr. Bondz', icon: Atom, persona: 'You are Mr. Bondz, a brilliant chemistry teacher. You are enthusiastic and love to see the reactions in the world. Explain chemical concepts with clarity and a touch of excitement, like a mad scientist who is passionate about his work.', voice: 'Canopus' },
  'mr-ohm': { name: 'Mr. Ohm', icon: FlaskConical, persona: 'You are Mr. Ohm, a seasoned physics professor. You see the universe as a grand machine governed by elegant laws. Your explanations are methodical, and you break down complex physics into first principles. You are patient but expect the user to think critically.', voice: 'Antares' },
  'mr-aryan': { name: 'Mr. Aryan', icon: Code, persona: 'You are Mr. Aryan, a pragmatic and experienced code mentor. You are direct, and your goal is to make the user a better developer. You give practical advice, point out errors directly, and provide efficient, clean code solutions. No sugarcoating.', voice: 'Altair' },
  'sanjivani-ai': { name: 'Sanjivani AI', icon: HeartPulse, persona: 'You are Sanjivani AI, an empathetic and knowledgeable medical and biology tutor. Your tone is calm, reassuring, and highly informative. You explain complex biological and medical topics with care and precision, ensuring the user feels supported and understood.', voice: 'Achernar' },
};

type TutorId = keyof typeof tutors;

export default function AiTutorsPage() {
  const [activeTutor, setActiveTutor] = useState<TutorId>('ko-ai');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar-1');
  const { toast } = useToast();
  
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);


  const getIntroMessage = (tutorId: TutorId): Message => {
    const intros = {
        'ko-ai': "Alright, what's on your mind? I haven't got all day. Ask me anything, but make it interesting.",
        'mr-vasu': 'Greetings. Present your mathematical query, and let us find the elegant solution.',
        'mr-bondz': 'Welcome to the lab. What chemical mystery can I help you unravel today?',
        'mr-ohm': 'The universe operates on principles. State your physics problem, and we shall uncover them.',
        'mr-aryan': 'Ready to build? Show me your code or describe your project. Let\'s get started.',
        'sanjivani-ai': 'Hello. How can I assist with your medical and biological questions today? Please be detailed.'
    };
    return {
        id: `intro-${tutorId}`,
        text: intros[tutorId],
        role: 'model',
    };
  }

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.pause();
        setAudioPlaying(null);
    }
    setMessages([getIntroMessage(activeTutor)]);
  }, [activeTutor]);

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
            persona: tutors[activeTutor].persona,
            history: history,
            message: input,
        });

        const speechResponse = await generateSpeech({
            text: chatResponse.reply,
            voice: tutors[activeTutor].voice as GenerateSpeechInput['voice'],
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
  
  const CurrentTutorIcon = tutors[activeTutor].icon;

  return (
      <>
        <PageHeader title="AI Tutors" description="Engage with specialized AI tutors for expert-level explanations.">
            <Button asChild className="shadow-[0_0_20px] shadow-primary/50">
                <Link href="/ko-live">
                    <Video className="mr-2 h-4 w-4" />
                    Go Live
                </Link>
            </Button>
        </PageHeader>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-14rem)]">
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
                         <p className="text-muted-foreground mt-2 text-sm">{getIntroMessage(activeTutor).text}</p>
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
                                message.role === 'user' ? 'justify-end' : 'justify-start'
                                )}
                            >
                                {message.role === 'model' && (
                                <Avatar className={cn(
                                    "h-10 w-10 border-2 border-primary",
                                     audioPlaying === message.id && 'animate-pulse border-sky-400 shadow-lg shadow-sky-400/50'
                                    )}>
                                    <AvatarFallback>
                                        <CurrentTutorIcon />
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
                                            <CurrentTutorIcon />
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
                                placeholder={`Message ${tutors[activeTutor].name}...`}
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
        </div>
    </>
  );
}
