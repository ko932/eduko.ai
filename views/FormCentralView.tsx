import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const examsList = [
  "JEE Main", "JEE Advanced", "NEET", "UPSC Civil Services", "CAT", "GATE", "CLAT", "NDA", "UGC NET", "IBPS PO"
];

const FormCentralView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loadingExam, setLoadingExam] = useState<string | null>(null);
    const [examInfo, setExamInfo] = useState<{ [key: string]: string }>({});
    const [error, setError] = useState<string | null>(null);
    
    const filteredExams = examsList.filter(exam => exam.toLowerCase().includes(searchTerm.toLowerCase()));

    const getExamInfo = async (examName: string) => {
        setLoadingExam(examName);
        setError(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Provide a concise summary of the latest information for the "${examName}" exam in India. Include the official website link, expected registration dates for the next session, and the exam conducting body. Format the output as a simple Markdown text.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    tools: [{ googleSearch: {} }],
                },
            });
            
            setExamInfo(prev => ({...prev, [examName]: response.text }));
        } catch(e) {
            console.error(e);
            setError(`Could not fetch info for ${examName}.`);
        } finally {
            setLoadingExam(null);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                    <span className="text-cyan-400">Form Central</span>
                </h1>
                <p className="mt-2 text-lg text-gray-400">Find and get information on major exams and scholarship forms from a single point.</p>
            </div>
            
            <div className="p-8 bg-gray-900/50 border border-gray-800/70 rounded-xl space-y-4">
                 <input 
                    type="text" 
                    placeholder="Search for an exam..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
            </div>
            
            <div className="space-y-4">
                {filteredExams.map(exam => (
                    <div key={exam} className="p-4 bg-gray-900/50 border border-gray-800/70 rounded-xl">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <h3 className="text-lg font-bold text-white mb-4 md:mb-0">{exam}</h3>
                             <button 
                                onClick={() => getExamInfo(exam)} 
                                disabled={loadingExam === exam}
                                className="py-2 px-4 text-sm bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 flex items-center"
                            >
                                {loadingExam === exam ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                                        Fetching...
                                    </>
                                ) : (
                                    'Get Latest Info (AI)'
                                )}
                            </button>
                        </div>
                        {examInfo[exam] && (
                            <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: examInfo[exam].replace(/\n/g, '<br />') }}/>
                            </div>
                        )}
                    </div>
                ))}
                {filteredExams.length === 0 && (
                    <div className="text-center text-gray-500 p-8">No exams found matching your search.</div>
                )}
                 {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default FormCentralView;
