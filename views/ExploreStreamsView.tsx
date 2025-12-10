import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const ExploreStreamsView: React.FC = () => {
    const streams = ['Science', 'Commerce', 'Arts'];
    const [selectedStream, setSelectedStream] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [content, setContent] = useState<string | null>(null);

    const handleStreamSelect = async (stream: string) => {
        setSelectedStream(stream);
        setIsLoading(true);
        setError(null);
        setContent(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `
                Provide a comprehensive overview for a student choosing the "${stream}" stream after 10th grade in India.
                Structure the response in Markdown format.
                Include the following sections:
                - A brief "Introduction" to the stream.
                - "Core Subjects" typically studied.
                - "Popular Career Paths" after completing this stream.
                - "Key Entrance Exams" for higher education in this stream.
                Keep the tone encouraging and informative.
            `;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            setContent(response.text);
        } catch (e) {
            console.error(e);
            setError("Oops! Ko's crystal ball is a bit foggy. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5V4H4zm0 0l5 5m-5 5v5h5v-5H4zm0 0l5-5m5-5v5h5V4h-5zm0 0l-5 5m5 5v5h5v-5h-5zm0 0l-5-5" /></svg>
                    <span className="text-cyan-400">Explore Streams</span>
                </h1>
                <p className="mt-2 text-lg text-gray-400">Discover academic streams and subject combinations.</p>
            </div>
            <div className="flex justify-center gap-4">
                {streams.map(stream => (
                    <button 
                        key={stream} 
                        onClick={() => handleStreamSelect(stream)}
                        className={`py-3 px-8 font-semibold rounded-lg transition-all duration-200 border-2 ${selectedStream === stream ? 'bg-cyan-600 border-cyan-500 text-white' : 'bg-gray-800 border-gray-700 hover:border-cyan-500 text-gray-300 hover:text-white'}`}
                    >
                        {stream}
                    </button>
                ))}
            </div>
            
            <div className="p-6 bg-gray-900/50 border border-gray-800/70 rounded-xl min-h-[300px]">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <div className="w-8 h-8 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
                        <p className="mt-4">Loading details for {selectedStream}...</p>
                    </div>
                )}
                {error && <p className="text-red-500 text-center">{error}</p>}
                {content && (
                     <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
                )}
                {!isLoading && !content && (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p>Select a stream above to see the details.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExploreStreamsView;
