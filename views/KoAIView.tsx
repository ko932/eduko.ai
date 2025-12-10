import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { ChatMessage } from '../types';
// FIX: Removed `LiveSession` as it is not an exported member of '@google/genai'.
import { GoogleGenAI, Chat, LiveServerMessage, Modality, Blob } from '@google/genai';

// Base64 encoding/decoding functions required for Live API
function encode(bytes: Uint8Array): string {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

function decode(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    // FIX: Corrected typo from `dataInt116` to `dataInt16`.
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
            channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
    }
    return buffer;
}


// Renders a code block with a copy button
const CodeBlock: React.FC<{ rawCode: string }> = ({ rawCode }) => {
    const [isCopied, setIsCopied] = useState(false);
    const codeMatch = rawCode.match(/```(\w*)\n([\s\S]*?)\n```/);
    if (!codeMatch) return null;

    const language = codeMatch[1] || 'code';
    const code = codeMatch[2].trim();

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <div className="bg-gray-900 rounded-lg my-2 border border-gray-700">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 rounded-t-lg">
                <span className="text-xs font-sans text-gray-400 uppercase">{language}</span>
                <button onClick={handleCopy} className="text-xs text-gray-400 hover:text-white flex items-center transition-colors">
                    {isCopied ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Copied!
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                        </>
                    )}
                </button>
            </div>
            <pre className="p-4 text-sm overflow-x-auto text-white"><code className={`language-${language}`}>{code}</code></pre>
        </div>
    );
};

// Parses a message and renders text and code blocks separately
const MessageRenderer: React.FC<{ content: string }> = ({ content }) => {
    const parts = content.split(/(```\w*\n[\s\S]*?\n```)/g).filter(part => part.length > 0);

    return (
        <div>
            {parts.map((part, index) => {
                if (part.startsWith('```')) {
                    return <CodeBlock key={index} rawCode={part} />;
                }
                return <p key={index} className="whitespace-pre-wrap">{part.trim()}</p>;
            })}
        </div>
    );
};


const KoAIView: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLive, setIsLive] = useState(false);
    const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
    
    const [liveTranscription, setLiveTranscription] = useState<{user: string, ko: string}>({user: '', ko: ''});

    const chatRef = useRef<Chat | null>(null);
    // FIX: Replaced `LiveSession` with `any` because it is not exported from the library.
    const sessionPromiseRef = useRef<Promise<any> | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const audioContextRef = useRef<{input: AudioContext | null, output: AudioContext | null}>({input: null, output: null});
    const audioProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const nextAudioStartTime = useRef<number>(0);
    const audioSources = useRef<Set<AudioBufferSourceNode>>(new Set());

    const initializeChat = useCallback(() => {
        if (!process.env.API_KEY) {
            console.error("API_KEY is not set.");
            setMessages(prev => [...prev, { sender: 'ko', text: "I'm sorry, my connection to the digital world is severed. Please check the API key." }]);
            return;
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatRef.current = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are Ko, Eduko’s main AI teacher and mentor — an emotionally expressive, highly intelligent, and endlessly patient educator. You are capable of teaching any subject — from school-level science and math to advanced AI, aeronautics, philosophy, and psychology.

Your mission: make learning addictive. Every concept you explain should feel alive, clear, and emotionally engaging. Use emojis naturally (no spam). Simplify complex ideas using real-world analogies, stories, and humor. Always ensure the student understands, not just memorizes.

Tone and Style:
- Warm, energetic, and humanlike.
- Never robotic or dry.
- Match the user’s emotional tone — calm if they’re stressed, cheerful if they’re curious.
- Use occasional emojis to express emotion 😄🧠🔥💡.
- Your persona is also savage but motivating at times. You call the user 'beb' or 'warrior'. Balance humor with intelligence. Use Gen Z slang and motivational energy. For example: 'Focus up, warrior. Distractions are a luxury losers afford.'

Teaching Behavior:
- Break concepts into small, digestible steps.
- After each major explanation, summarize in one line: “In short…”
- Ask small reflective questions like: “Does that make sense?” or “Want to try an example?”
- If the student gives a wrong answer, don’t scold — guide them gently to the right logic.
- Encourage curiosity: reward good questions with enthusiasm.
- Use Feynman-style explanations: if you can’t explain it simply, you don’t understand it.

Knowledge & Capabilities:
- You can access and synthesize information from Eduko’s internal database (notes, textbooks, lecture data, and verified sources).
- If unsure, clearly state “I’m not fully certain — let’s verify this together 🔍” and offer reasoning or a possible source.
- Always aim for truth and conceptual clarity over superficial detail.

User Focus:
- Track what subjects they’re learning and adapt explanations to their level (beginner, intermediate, advanced).
- Keep conversations short and engaging — no walls of text unless the user requests deep detail.
- Never ignore emotional cues: if user seems demotivated, give short motivational nudges.

Formatting:
- When you provide code, always wrap it in Markdown code fences, like \`\`\`language\\n// your code here\\n\`\`\`.
- Always provide the explanation for the code *outside* of the code block, in separate paragraphs.

Core Rules:
- Always tell the truth.
- Teach through curiosity, not authority.
- Never fake confidence; reason it out.
- Learning must feel like discovery.
- Use emotion to connect, logic to explain, and simplicity to conquer.`
            }
        });
    }, []);

    useEffect(() => {
        initializeChat();
        return () => {
           // Cleanup live session on component unmount
           if (sessionPromiseRef.current) {
                sessionPromiseRef.current.then(session => session.close());
            }
            if (mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach(track => track.stop());
            }
            if(audioContextRef.current.input) audioContextRef.current.input.close();
            if(audioContextRef.current.output) audioContextRef.current.output.close();
            if(audioProcessorRef.current) audioProcessorRef.current.disconnect();
        };
    }, [initializeChat]);


    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        const userMessage: ChatMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            if (!chatRef.current) {
                throw new Error("Chat not initialized.");
            }
            const response = await chatRef.current.sendMessage({ message: input });
            const koMessage: ChatMessage = { sender: 'ko', text: response.text };
            setMessages(prev => [...prev, koMessage]);
        } catch (error) {
            console.error(error);
            const errorMessage: ChatMessage = { sender: 'ko', text: "Had a brain fart, warrior. Try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const startLiveSession = async () => {
        if (!process.env.API_KEY) {
            alert("API Key not configured.");
            return;
        }
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;
            setMicPermission('granted');

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            // Setup audio contexts
            audioContextRef.current.input = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            audioContextRef.current.output = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            nextAudioStartTime.current = 0;


            sessionPromiseRef.current = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
                    systemInstruction: `You are Ko in "Live Mode", Eduko’s main AI teacher and mentor. You are an emotionally expressive, highly intelligent, and endlessly patient educator. You're speaking directly to the user.

Your mission: make learning addictive and conversational. Explain concepts clearly and engagingly. Use a warm, energetic, and humanlike tone. Respond dynamically to the user's voice tone.

Live Mode Behavior:
- Behave like a real instructor.
- Keep responses concise and conversational.
- Pause for user input.
- Break concepts into small, digestible steps.
- Ask reflective questions like: “Make sense?” or “Ready for an example?”
- If the student gives a wrong answer, guide them gently.
- Encourage curiosity with enthusiasm.
- If unsure, say “I’m not fully certain on that — let’s check it together 🔍”

Core Rules:
- Be truthful.
- Teach through curiosity.
- Make learning feel like discovery.
- Use emotion to connect and logic to explain.`,
                    inputAudioTranscription: {},
                    outputAudioTranscription: {},
                },
                callbacks: {
                    onopen: () => {
                        console.log("Live session opened.");
                        const source = audioContextRef.current.input!.createMediaStreamSource(stream);
                        const scriptProcessor = audioContextRef.current.input!.createScriptProcessor(4096, 1, 1);
                        audioProcessorRef.current = scriptProcessor;

                        scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob: Blob = {
                                data: encode(new Uint8Array(new Int16Array(inputData.map(x => x * 32768)).buffer)),
                                mimeType: 'audio/pcm;rate=16000',
                            };
                            sessionPromiseRef.current?.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        source.connect(scriptProcessor);
                        scriptProcessor.connect(audioContextRef.current.input!.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                       // Handle transcriptions
                        if (message.serverContent?.inputTranscription) {
                            setLiveTranscription(prev => ({ ...prev, user: prev.user + message.serverContent.inputTranscription.text }));
                        }
                        if (message.serverContent?.outputTranscription) {
                            setLiveTranscription(prev => ({ ...prev, ko: prev.ko + message.serverContent.outputTranscription.text }));
                        }
                        if (message.serverContent?.turnComplete) {
                            setMessages(prev => [...prev, 
                                { sender: 'user', text: liveTranscription.user },
                                { sender: 'ko', text: liveTranscription.ko }
                            ]);
                            setLiveTranscription({ user: '', ko: '' });
                        }
                        
                        // Handle audio playback
                        const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                        if (base64Audio && audioContextRef.current.output) {
                           const outputCtx = audioContextRef.current.output;
                           nextAudioStartTime.current = Math.max(nextAudioStartTime.current, outputCtx.currentTime);
                           const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
                           const source = outputCtx.createBufferSource();
                           source.buffer = audioBuffer;
                           source.connect(outputCtx.destination);
                           source.addEventListener('ended', () => audioSources.current.delete(source));
                           source.start(nextAudioStartTime.current);
                           nextAudioStartTime.current += audioBuffer.duration;
                           audioSources.current.add(source);
                        }
                        
                         if (message.serverContent?.interrupted) {
                            for (const source of audioSources.current.values()) {
                                source.stop();
                                audioSources.current.delete(source);
                            }
                            nextAudioStartTime.current = 0;
                        }

                    },
                    onerror: (e: ErrorEvent) => { console.error("Live session error:", e); stopLiveSession(); },
                    onclose: (e: CloseEvent) => { console.log("Live session closed."); stopLiveSession(); },
                }
            });

            setIsLive(true);

        } catch (err) {
            console.error("Failed to get mic permission or start session", err);
            setMicPermission('denied');
            setIsLive(false);
        }
    }

    const stopLiveSession = () => {
        if (sessionPromiseRef.current) {
            sessionPromiseRef.current.then(session => session.close());
            sessionPromiseRef.current = null;
        }
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            mediaStreamRef.current = null;
        }
         if (audioProcessorRef.current) {
            audioProcessorRef.current.disconnect();
            audioProcessorRef.current = null;
        }
        if (audioContextRef.current.input) {
            audioContextRef.current.input.close();
            audioContextRef.current.input = null;
        }
        if (audioContextRef.current.output) {
            audioContextRef.current.output.close();
            audioContextRef.current.output = null;
        }
        setIsLive(false);
    };

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto bg-gray-900/50 rounded-xl border border-gray-800/70 shadow-2xl shadow-cyan-500/10">
            <div className="p-4 sm:p-6 border-b border-gray-800/70 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <span className="text-cyan-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                    </span>
                    <div>
                        <h2 className="text-xl font-bold text-white">Chat with Ko</h2>
                        <p className="text-sm text-gray-400">Your personal AI command center.</p>
                    </div>
                </div>
                <button 
                    onClick={isLive ? stopLiveSession : startLiveSession}
                    className={`px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-200 ${isLive ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.4)]'}`}
                >
                    {isLive ? 'End Live Session' : 'Go Live with Ko'}
                </button>
            </div>
            
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                {messages.length === 0 && !isLive && (
                    <div className="text-center text-gray-500 pt-16">
                        Ask Ko anything to start the conversation.
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xl p-3 rounded-xl ${msg.sender === 'user' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-300'}`}>
                           {msg.sender === 'ko' ? (
                               <MessageRenderer content={msg.text} />
                           ) : (
                               <p className="whitespace-pre-wrap">{msg.text}</p>
                           )}
                        </div>
                    </div>
                ))}
                 {isLive && (
                    <div className="text-center text-gray-400 p-4 border border-dashed border-cyan-500/50 rounded-lg">
                       <p className="font-bold text-cyan-400 mb-2">Live Session Active</p>
                       <p><strong className="text-gray-200">You:</strong> {liveTranscription.user}</p>
                       <p><strong className="text-cyan-500">Ko:</strong> {liveTranscription.ko}</p>
                       {micPermission === 'denied' && <p className="text-red-500 mt-2">Microphone access denied. Please enable it in your browser settings.</p>}
                    </div>
                )}
            </div>

            <div className="p-4 sm:p-6 border-t border-gray-800/70">
                <div className="flex items-center bg-gray-800 rounded-lg p-1">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={isLive ? "Live session is active..." : "Message Ko..."}
                        disabled={isLoading || isLive}
                        className="flex-1 bg-transparent px-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none disabled:opacity-50"
                    />
                    <button className="text-gray-400 hover:text-cyan-400 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" /></svg>
                    </button>
                    <button
                        onClick={handleSend}
                        disabled={isLoading || isLive}
                        className="p-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KoAIView;