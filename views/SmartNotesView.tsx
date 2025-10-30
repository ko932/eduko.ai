import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';

type Flashcard = { question: string; answer: string };
type MCQ = { question: string; options: string[]; correctAnswer: string };
type GeneratedContent = {
  summary: string;
  notes: string;
  flashcards: Flashcard[];
  mcqs: MCQ[];
  mindmap: string;
};

const FlashcardComponent: React.FC<Flashcard> = ({ question, answer }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <div className="w-full h-48 perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
                <div className="absolute w-full h-full backface-hidden p-4 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-center">
                    <p className="text-lg text-white">{question}</p>
                </div>
                <div className="absolute w-full h-full backface-hidden p-4 rounded-lg bg-cyan-800 border border-cyan-700 flex items-center justify-center text-center rotate-y-180">
                    <p className="text-lg text-white">{answer}</p>
                </div>
            </div>
        </div>
    )
}

const MCQComponent: React.FC<{ mcq: MCQ, index: number }> = ({ mcq, index }) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleSelect = (option: string) => {
        if(isAnswered) return;
        setSelected(option);
        setIsAnswered(true);
    }

    return (
        <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
            <p className="font-semibold text-white">{index + 1}. {mcq.question}</p>
            <div className="mt-3 space-y-2">
                {mcq.options.map((option, i) => {
                    const isCorrect = option === mcq.correctAnswer;
                    const isSelected = option === selected;
                    
                    let buttonClass = "w-full text-left p-2 rounded-md transition-colors text-gray-300 bg-gray-700 hover:bg-gray-600";
                    if(isAnswered) {
                        if(isCorrect) {
                            buttonClass = "w-full text-left p-2 rounded-md text-white bg-green-600";
                        } else if (isSelected && !isCorrect) {
                            buttonClass = "w-full text-left p-2 rounded-md text-white bg-red-600";
                        }
                    }

                    return <button key={i} onClick={() => handleSelect(option)} className={buttonClass}>{option}</button>
                })}
            </div>
        </div>
    )
}


const SmartNotesView: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('summary');

    const handleGenerate = async () => {
        if (!inputText.trim() || !process.env.API_KEY) {
            setError("Please enter some text to generate notes from.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedContent(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const schema = {
                type: Type.OBJECT,
                properties: {
                    summary: { type: Type.STRING, description: 'A concise summary of the text, in about 3-5 sentences.' },
                    notes: { type: Type.STRING, description: 'Detailed, well-structured notes in Markdown format. Use headings, bullet points, and bold text.' },
                    flashcards: {
                        type: Type.ARRAY,
                        description: "Generate 5-10 flashcards.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: { type: Type.STRING, description: 'A question for a flashcard based on a key concept.' },
                                answer: { type: Type.STRING, description: 'The answer to the flashcard question.' }
                            },
                            required: ['question', 'answer']
                        }
                    },
                    mcqs: {
                        type: Type.ARRAY,
                        description: "Generate 5 multiple-choice questions.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: { type: Type.STRING, description: 'A multiple-choice question.' },
                                options: { type: Type.ARRAY, description: 'An array of 4 possible answers.', items: { type: Type.STRING } },
                                correctAnswer: { type: Type.STRING, description: 'The correct answer from the options array.' }
                            },
                            required: ['question', 'options', 'correctAnswer']
                        }
                    },
                    mindmap: { type: Type.STRING, description: 'A mindmap of the content in Markdown hierarchical list format (using tabs for indentation).' }
                },
                 required: ['summary', 'notes', 'flashcards', 'mcqs', 'mindmap']
            };

            const response = await ai.models.generateContent({
                model: "gemini-2.5-pro",
                contents: `Based on the following text, generate a comprehensive set of study materials. The text is: "${inputText}"`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                },
            });

            const content = JSON.parse(response.text);
            setGeneratedContent(content);

        } catch (e) {
            console.error(e);
            setError("Failed to generate content. The model might be overloaded. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const tabs = [
        { id: 'summary', label: 'Summary' },
        { id: 'notes', label: 'Notes' },
        { id: 'flashcards', label: 'Flashcards' },
        { id: 'mcqs', label: 'MCQs' },
        { id: 'mindmap', label: 'Mindmap' },
    ];
    
    const renderContent = () => {
        if(!generatedContent) return <div className="text-center text-gray-500 p-8">Your generated notes will appear here.</div>;
        switch(activeTab) {
            case 'summary': return <div className="p-4 prose prose-invert max-w-none text-gray-300">{generatedContent.summary}</div>
            case 'notes': return <pre className="p-4 bg-gray-900 rounded-md whitespace-pre-wrap text-gray-300">{generatedContent.notes}</pre>
            case 'flashcards': return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{generatedContent.flashcards.map((fc, i) => <FlashcardComponent key={i} {...fc} />)}</div>
            case 'mcqs': return <div className="space-y-4">{generatedContent.mcqs.map((mcq, i) => <MCQComponent key={i} mcq={mcq} index={i} />)}</div>
            case 'mindmap': return <pre className="p-4 bg-gray-900 rounded-md whitespace-pre-wrap text-gray-300">{generatedContent.mindmap}</pre>
            default: return null;
        }
    }

    return (
        <div className="space-y-8">
            <style>{`.perspective-1000 { perspective: 1000px; } .transform-style-preserve-3d { transform-style: preserve-3d; } .backface-hidden { backface-visibility: hidden; } .rotate-y-180 { transform: rotateY(180deg); }`}</style>
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    <span className="text-cyan-400">Smart Notes Generator</span>
                </h1>
                <p className="mt-2 text-lg text-gray-400 max-w-2xl mx-auto">Paste any text and let AI create structured study materials for you.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex flex-col space-y-4">
                    <h2 className="text-xl font-bold text-white">Your Input Text</h2>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Paste your raw notes, an article, or any text here..."
                        className="w-full h-96 bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                    />
                    <button onClick={handleGenerate} disabled={isLoading} className="py-3 px-6 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-all duration-200 shadow-[0_0_15px_rgba(0,191,255,0.4)] hover:shadow-[0_0_20px_rgba(0,191,255,0.6)] disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center">
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                                Generating...
                            </>
                        ) : (
                            'Generate Notes'
                        )}
                    </button>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                </div>
                <div className="bg-gray-900/50 border border-gray-800/70 rounded-xl overflow-hidden flex flex-col">
                    <div className="border-b border-gray-800/70 flex items-center space-x-1 p-2">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab.id ? 'bg-cyan-500/10 text-cyan-400' : 'text-gray-400 hover:bg-gray-800'}`}>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <div className="w-8 h-8 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
                                <p className="mt-4">AI is thinking...</p>
                                <p className="text-sm">This may take a moment.</p>
                            </div>
                        ) : renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmartNotesView;
