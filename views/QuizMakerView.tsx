import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';

type MCQ = { question: string; options: string[]; correctAnswer: string };

const QuizMakerView: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [numQuestions, setNumQuestions] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [quiz, setQuiz] = useState<MCQ[] | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [showResults, setShowResults] = useState(false);

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError('Please enter a topic, beb.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setQuiz(null);
        setShowResults(false);
        setAnswers([]);
        setCurrentQuestion(0);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const schema = {
                type: Type.OBJECT,
                properties: {
                    mcqs: {
                        type: Type.ARRAY,
                        description: `Generate ${numQuestions} multiple-choice questions.`,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: { type: Type.STRING },
                                options: { type: Type.ARRAY, description: 'An array of 4 possible answers.', items: { type: Type.STRING } },
                                correctAnswer: { type: Type.STRING, description: 'The correct answer from the options array.' }
                            },
                            required: ['question', 'options', 'correctAnswer']
                        }
                    },
                },
                 required: ['mcqs']
            };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Generate a quiz with ${numQuestions} questions on the topic: "${topic}". Ensure the options are distinct and there is only one correct answer.`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                },
            });
            const content = JSON.parse(response.text);
            setQuiz(content.mcqs);
        } catch (e) {
            console.error(e);
            setError("Failed to generate the quiz. Try a different topic or try again later.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleAnswer = (answer: string) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers);

        setTimeout(() => {
             if (currentQuestion < quiz!.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setShowResults(true);
            }
        }, 500); // Short delay to show feedback
    };
    
    const calculateScore = () => {
        return quiz!.reduce((score, question, index) => {
            return score + (answers[index] === question.correctAnswer ? 1 : 0);
        }, 0);
    };

    const renderQuiz = () => {
        if (showResults) {
            const score = calculateScore();
            return (
                <div className="text-center p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
                    <h2 className="text-2xl font-bold text-white">Quiz Complete!</h2>
                    <p className="text-lg text-cyan-400 mt-2">Your Score: {score} / {quiz!.length}</p>
                    <button onClick={handleGenerate} className="mt-6 py-2 px-4 bg-cyan-600 text-white rounded-lg">Try Another Topic</button>
                </div>
            )
        }
        
        const question = quiz![currentQuestion];
        const selectedAnswer = answers[currentQuestion];
        
        return (
            <div className="p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
                <p className="text-sm text-gray-400">Question {currentQuestion + 1} of {quiz!.length}</p>
                <p className="text-xl font-semibold text-white mt-2">{question.question}</p>
                <div className="mt-4 space-y-3">
                    {question.options.map(option => {
                        let buttonClass = "w-full text-left p-3 rounded-lg transition-colors text-gray-300 bg-gray-800 hover:bg-gray-700";
                        if(selectedAnswer) {
                            const isCorrect = option === question.correctAnswer;
                            if (isCorrect) {
                                buttonClass = "w-full text-left p-3 rounded-lg text-white bg-green-600";
                            } else if (option === selectedAnswer) {
                                buttonClass = "w-full text-left p-3 rounded-lg text-white bg-red-600";
                            }
                        }
                        return <button key={option} onClick={() => handleAnswer(option)} disabled={!!selectedAnswer} className={buttonClass}>{option}</button>
                    })}
                </div>
            </div>
        )
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
             <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center space-x-3">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-cyan-400">AI Quiz Maker</span>
                </h1>
                <p className="mt-2 text-lg text-gray-400">Generate quizzes on any topic to test your knowledge.</p>
            </div>
            {!quiz && (
                 <div className="p-8 bg-gray-900/50 border border-gray-800/70 rounded-xl space-y-4">
                     <div>
                        <label className="font-bold text-white">Topic*</label>
                         <p className="text-sm text-gray-500 mb-2">What topic do you want a quiz on?</p>
                        <input type="text" value={topic} onChange={e => setTopic(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"/>
                    </div>
                     <div>
                        <label className="font-bold text-white">Number of Questions*</label>
                        <select value={numQuestions} onChange={e => setNumQuestions(Number(e.target.value))} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white mt-2">
                            <option value={3}>3</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                        </select>
                    </div>
                    <button onClick={handleGenerate} disabled={isLoading} className="w-full py-3 px-6 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 flex justify-center items-center">
                        {isLoading ? <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : 'Generate Quiz'}
                    </button>
                     {error && <p className="text-red-500 text-center">{error}</p>}
                </div>
            )}
            
            {isLoading && (
                 <div className="text-center text-gray-400">
                    <div className="inline-block w-8 h-8 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
                    <p className="mt-2">Generating your quiz...</p>
                </div>
            )}
            
            {quiz && renderQuiz()}

        </div>
    );
};

export default QuizMakerView;
