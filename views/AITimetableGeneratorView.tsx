import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';

type TimeSlot = { time: string; subject: string; task: string };
type Timetable = { [day: string]: TimeSlot[] };

const AITimetableGeneratorView: React.FC = () => {
    const [formData, setFormData] = useState({
        subjects: '',
        hours: '4',
        timePreference: 'evening',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [timetable, setTimetable] = useState<Timetable | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGenerate = async () => {
        if (!formData.subjects) {
            setError('Come on, warrior. Tell me what subjects to schedule.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setTimetable(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `
                Create a personalized weekly study timetable for a student.
                - Subjects: ${formData.subjects}.
                - Daily study hours: ${formData.hours}.
                - Preferred study time: ${formData.timePreference}.

                Rules:
                - Distribute subjects evenly throughout the week.
                - Include short breaks.
                - Allocate time for revision, especially on weekends.
                - For each study block, suggest a specific task (e.g., 'Read Chapter 3', 'Solve 20 problems', 'Revise topic').

                Generate a JSON object where keys are lowercase day names ('monday', 'tuesday', etc.) and values are arrays of study slots. Each slot object must have "time" (e.g., "18:00 - 19:30"), "subject", and "task".
            `;
            
            const schema = {
                type: Type.OBJECT,
                properties: {
                    ...['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].reduce((acc, day) => ({
                        ...acc,
                        [day]: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    time: { type: Type.STRING },
                                    subject: { type: Type.STRING },
                                    task: { type: Type.STRING },
                                },
                                required: ['time', 'subject', 'task'],
                            }
                        }
                    }), {})
                },
                 required: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            };


            const response = await ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: prompt,
                 config: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                },
            });
            
            const generatedTimetable = JSON.parse(response.text);
            setTimetable(generatedTimetable);

        } catch (e) {
            console.error(e);
            setError("The AI schedular is rebooting. Give it another shot, beb.");
        } finally {
            setIsLoading(false);
        }
    };

    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="text-cyan-400">AI Timetable Generator</span>
                </h1>
                <p className="mt-2 text-lg text-gray-400">Generate a personalized study schedule based on your lifestyle.</p>
            </div>
            <div className="p-8 bg-gray-900/50 border border-gray-800/70 rounded-xl space-y-4">
                 <div>
                    <label className="font-bold text-white">Your Subjects*</label>
                    <p className="text-sm text-gray-500 mb-2">Enter your subjects, separated by commas (e.g., Physics, Math, History).</p>
                    <textarea name="subjects" value={formData.subjects} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-bold text-white">Daily Study Hours*</label>
                        <select name="hours" value={formData.hours} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white mt-2">
                            <option value="2">2 Hours</option>
                            <option value="3">3 Hours</option>
                            <option value="4">4 Hours</option>
                            <option value="5">5 Hours</option>
                            <option value="6">6 Hours</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-bold text-white">Preferred Study Time*</label>
                        <select name="timePreference" value={formData.timePreference} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white mt-2">
                            <option value="morning">Morning</option>
                            <option value="afternoon">Afternoon</option>
                            <option value="evening">Evening</option>
                            <option value="flexible">Flexible</option>
                        </select>
                    </div>
                </div>
                 <button onClick={handleGenerate} disabled={isLoading} className="w-full py-3 px-6 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 flex justify-center items-center">
                    {isLoading ? <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : 'Generate Timetable'}
                </button>
                 {error && <p className="text-red-500 text-center">{error}</p>}
            </div>

            {isLoading && (
                <div className="text-center text-gray-400">
                    <div className="inline-block w-8 h-8 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
                    <p className="mt-2">Crafting your master plan...</p>
                </div>
            )}
            
            {timetable && (
                 <div className="bg-gray-900/50 border border-gray-800/70 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-400">
                            <thead className="text-xs text-gray-300 uppercase bg-gray-800/50">
                                <tr>
                                    {daysOfWeek.map(day => <th key={day} className="px-6 py-3 capitalize">{day}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-700 align-top">
                                    {daysOfWeek.map(day => (
                                        <td key={day} className="px-2 py-4">
                                            <div className="space-y-2">
                                                {timetable[day]?.length > 0 ? timetable[day].map((slot, index) => (
                                                    <div key={index} className="p-2 bg-gray-800 rounded-md">
                                                        <p className="font-semibold text-cyan-400">{slot.time}</p>
                                                        <p className="text-white">{slot.subject}</p>
                                                        <p className="text-xs text-gray-500">{slot.task}</p>
                                                    </div>
                                                )) : <div className="p-2 text-gray-600">Rest Day</div>}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AITimetableGeneratorView;
