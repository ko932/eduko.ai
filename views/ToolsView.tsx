import React from 'react';
import { TOOLS } from '../constants';
import type { Tool } from '../types';
import { View } from '../types';

interface ToolsViewProps {
    setActiveView: (view: string) => void;
}

const ToolCard: React.FC<{ tool: Tool; onClick: () => void }> = ({ tool, onClick }) => (
    <div 
        onClick={onClick}
        className="cursor-pointer group p-6 bg-gray-900/50 rounded-xl border border-gray-800/70 hover:border-cyan-500/50 hover:bg-cyan-900/20 transition-all duration-300 flex flex-col"
    >
        <div className={`w-12 h-12 flex items-center justify-center rounded-lg bg-gray-800 group-hover:bg-cyan-500/20 text-${tool.color}-400 group-hover:text-${tool.color}-300 transition-all`}>
            {tool.icon}
        </div>
        <h3 className="mt-4 text-lg font-bold text-white">{tool.name}</h3>
        <p className="mt-1 text-sm text-gray-400 flex-grow">{tool.description}</p>
    </div>
);

const ToolsView: React.FC<ToolsViewProps> = ({ setActiveView }) => {
    
    const handleToolClick = (toolName: string) => {
        const toolViewMap: { [key: string]: View } = {
            'Program Evaluator': View.ProgramEvaluator,
            'Smart Notes': View.SmartNotes,
            'Career Compass': View.CareerCompass,
            'Explore Streams': View.ExploreStreams,
            'Form Central': View.FormCentral,
            'Flashcards': View.Flashcards,
            'Quiz Maker': View.QuizMaker,
            'Exam Countdown': View.ExamCountdown,
            'AI Timetable Generator': View.AITimetableGenerator,
            'Study Battle Room': View.StudyBattleRoom,
        };
        
        const view = toolViewMap[toolName];
        if (view) {
            setActiveView(view);
        } else {
            alert(`Opening ${toolName}... (This is a placeholder)`);
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0L8 5.69 5.69 8l-2.52.51c-1.56.38-1.56 2.6 0 2.98L5.69 12 8 14.31l.51 2.52c.38 1.56 2.6 1.56 2.98 0L12 14.31 14.31 12l2.52-.51c1.56-.38-1.56-2.6 0-2.98L14.31 8 12 5.69l-.51-2.52z" clipRule="evenodd" /></svg>
                    <span className="text-cyan-400">Tools Arsenal</span>
                </h1>
                <p className="mt-2 text-lg text-gray-400 max-w-2xl mx-auto">Your digital lab for academic firepower. Everything you need to conquer your goals.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TOOLS.map(tool => (
                    <ToolCard key={tool.name} tool={tool} onClick={() => handleToolClick(tool.name)} />
                ))}
            </div>
             <footer className="text-center text-gray-600 text-sm pt-8">
                © {new Date().getFullYear()} Eduko. All rights reserved. Empowering Students, Shaping Futures.
            </footer>
        </div>
    );
};

export default ToolsView;