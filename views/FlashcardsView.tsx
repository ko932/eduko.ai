import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';

type Flashcard = { question: string; answer: string };

const FlashcardComponent: React.FC<Flashcard> = ({ question, answer }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <div className="w-full h-56 perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
                <div className="absolute w-full h-full backface-hidden p-4 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-center">
                    <p className="text-lg text-white">{question}</p>
                </div>
                <div className="absolute w-full h-full backface-hidden p-4 rounded-lg bg-cyan-800 border border-cyan-700 flex items-center justify-center text-center rotate-y-180">
                    <p className="text-lg text-white font-semibold">{answer}</p>
                </div>
            </div>
        </div>
    )
}

const FlashcardsView: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError('Provide a topic to generate flashcards for, warrior.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setFlashcards(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
             const schema = {
                type: Type.OBJECT,
                properties: {
                    flashcards: {
                        type: Type.ARRAY,
                        description: "Generate 8 flashcards.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: { type: Type.STRING, description: 'A question for a flashcard based on a key concept.' },
                                answer: { type: Type.STRING, description: 'A concise answer to the flashcard question.' }
                            },
                            required: ['question', 'answer']
                        }
                    },
                },
                 required: ['flashcards']
            };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Generate a set of flashcards for the topic: "${topic}".`,
                 config: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                },
            });
            const content = JSON.parse(response.text);
            setFlashcards(content.flashcards);
        } catch (e) {
            console.error(e);
            setError("Couldn't generate flashcards. The AI might be out of ink. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
         <div className="space-y-8 max-w-6xl mx-auto">
            <style>{`.perspective-1000 { perspective: 1000px; } .transform-style-preserve-3d { transform-style: preserve-3d; } .backface-hidden { backface-visibility: hidden; } .rotate-y-180 { transform: rotateY(180deg); }`}</style>
             <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    <span className="text-cyan-400">Flashcards Generator</span>
                </h1>
                <p className="mt-2 text-lg text-gray-400">Create and study with digital flashcards on any topic.</p>
            </div>
            <div className="p-8 bg-gray-900/50 border border-gray-800/70 rounded-xl space-y-4">
                 <div>
                    <label className="font-bold text-white">Topic*</label>
                    <p className="text-sm text-gray-500 mb-2">What do you want to learn about? (e.g., The Solar System, Python Data Types).</p>
                    <input type="text" value={topic} onChange={e => setTopic(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"/>
                </div>
                <button onClick={handleGenerate} disabled={isLoading} className="w-full py-3 px-6 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 flex justify-center items-center">
                    {isLoading ? <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : 'Generate Flashcards'}
                </button>
                 {error && <p className="text-red-500 text-center">{error}</p>}
            </div>

            {isLoading && (
                <div className="text-center text-gray-400">
                    <div className="inline-block w-8 h-8 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
                    <p className="mt-2">Building your deck...</p>
                </div>
            )}
            
            {flashcards && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {flashcards.map((fc, i) => <FlashcardComponent key={i} {...fc} />)}
                </div>
            )}
        </div>
    );
};

export default FlashcardsView;
