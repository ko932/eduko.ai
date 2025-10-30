import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const ProgramEvaluatorView: React.FC = () => {
    const [formData, setFormData] = useState({
        interests: '',
        marks: '',
        budget: '',
        goals: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<any[] | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEvaluate = async () => {
        if (!formData.interests || !formData.marks || !formData.goals) {
            setError('Please fill out interests, marks, and goals.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResults(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `
                Act as an expert career counselor for a student. Based on the following profile, suggest 3-5 suitable college programs or career paths. For each suggestion, provide a title, a brief description, potential top colleges/institutes in India, and a list of pros and cons. Use your knowledge and current information from Google Search.

                Student Profile:
                - Interests: ${formData.interests}
                - Recent Academic Marks (e.g., percentage or GPA): ${formData.marks}
                - Annual Budget (if provided): ${formData.budget || 'Not specified'}
                - Career Goals: ${formData.goals}

                Provide the output as a JSON array of objects. Each object should have the following structure:
                {
                  "title": "Program/Career Path Name",
                  "description": "A brief overview of the field.",
                  "topColleges": ["College Name 1", "College Name 2", "College Name 3"],
                  "pros": ["Pro 1", "Pro 2"],
                  "cons": ["Con 1", "Con 2"]
                }
            `;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: prompt,
                config: {
                    tools: [{ googleSearch: {} }],
                },
            });
            
            // The response text from a grounded model might not be perfect JSON, so we need to find the JSON block.
            const jsonString = response.text.match(/\[[\s\S]*\]/)?.[0];
            if (!jsonString) {
                throw new Error("Could not parse valid JSON from the model's response.");
            }
            
            setResults(JSON.parse(jsonString));

        } catch (e) {
            console.error(e);
            setError("Couldn't get suggestions, warrior. The AI might be taking a power nap. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center">
                 <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.657a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 14.95a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414l-.707.707zM5 10a1 1 0 01-1-1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.667 0 1.293-.267 1.768-.742A4.486 4.486 0 0015 10c0-2.485-2.015-4.5-4.5-4.5S6 7.515 6 10c0 1.39.641 2.633 1.652 3.434.455.385 1.002.566 1.548.566h1.6z" /></svg>
                    <span className="text-cyan-400">AI Program Evaluator</span>
                </h1>
                <p className="mt-2 text-lg text-gray-400">Let Ko analyze your profile and suggest the best-fit programs for you.</p>
            </div>
            <div className="p-8 bg-gray-900/50 border border-gray-800/70 rounded-xl space-y-4">
                <div>
                    <label className="font-bold text-white">Your Interests*</label>
                    <p className="text-sm text-gray-500 mb-2">List subjects you enjoy, hobbies, or skills you want to develop (e.g., coding, art, physics).</p>
                    <textarea name="interests" value={formData.interests} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white" />
                </div>
                 <div>
                    <label className="font-bold text-white">Academic Marks*</label>
                    <p className="text-sm text-gray-500 mb-2">Your latest percentage, GPA, or grade.</p>
                    <input type="text" name="marks" value={formData.marks} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white" />
                </div>
                 <div>
                    <label className="font-bold text-white">Your Career Goals*</label>
                    <p className="text-sm text-gray-500 mb-2">What do you want to achieve? (e.g., work at a FAANG company, start my own business, research).</p>
                    <textarea name="goals" value={formData.goals} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white" />
                </div>
                 <div>
                    <label className="font-bold text-white">Annual Budget (Optional)</label>
                    <p className="text-sm text-gray-500 mb-2">e.g., ₹2,00,000 per year</p>
                    <input type="text" name="budget" value={formData.budget} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white" />
                </div>
                <button onClick={handleEvaluate} disabled={isLoading} className="w-full py-3 px-6 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 flex justify-center items-center">
                    {isLoading ? <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : 'Evaluate My Profile'}
                </button>
                {error && <p className="text-red-500 text-center">{error}</p>}
            </div>

            {isLoading && (
                <div className="text-center text-gray-400">
                    <div className="inline-block w-8 h-8 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
                    <p className="mt-2">Ko is analyzing your future... Hold tight!</p>
                </div>
            )}

            {results && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white text-center">Your Personalized Suggestions</h2>
                    {results.map((result, index) => (
                        <div key={index} className="p-6 bg-gray-900/50 border border-gray-800/70 rounded-xl">
                            <h3 className="text-xl font-bold text-cyan-400">{result.title}</h3>
                            <p className="mt-2 text-gray-300">{result.description}</p>
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-white">Pros:</h4>
                                    <ul className="list-disc list-inside text-green-400/80">
                                        {result.pros.map((pro: string, i: number) => <li key={i}>{pro}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">Cons:</h4>
                                    <ul className="list-disc list-inside text-red-400/80">
                                        {result.cons.map((con: string, i: number) => <li key={i}>{con}</li>)}
                                    </ul>
                                </div>
                            </div>
                             <div className="mt-4">
                                <h4 className="font-semibold text-white">Top Colleges:</h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {result.topColleges.map((college: string, i: number) => <span key={i} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{college}</span>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProgramEvaluatorView;