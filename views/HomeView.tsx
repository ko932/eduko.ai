
import React from 'react';
import { View } from '../types';
import { KoAIIcon, ToolsIcon, CompassIcon, ExamIcon, FormIcon, CounsellingIcon, StoreIcon, PricingIcon } from '../constants';

interface HomeViewProps {
    setActiveView: (view: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ setActiveView }) => {
    const arsenalItems = [
        { name: 'Ko AI', icon: <KoAIIcon />, view: View.KoAI },
        { name: 'Tools', icon: <ToolsIcon />, view: View.Tools },
        { name: 'Career Compass', icon: <CompassIcon />, view: View.CareerCompass },
        { name: 'Exams', icon: <ExamIcon />, view: View.Exams },
        { name: 'Form Central', icon: <FormIcon />, view: View.FormCentral },
        { name: 'Counselling', icon: <CounsellingIcon />, view: View.Counselling },
        { name: 'Store', icon: <StoreIcon />, view: View.Store },
        { name: 'Pricing', icon: <PricingIcon />, view: View.Pricing },
    ];

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                    Welcome back, <span className="text-cyan-400">Warrior</span> ⚔️
                </h1>
                <p className="mt-2 text-lg text-gray-400">This is your command center. Stay focused, stay sharp.</p>
            </div>

            <div className="pl-4 border-l-4 border-cyan-500">
                <blockquote className="text-xl italic text-gray-300">
                    "The best way to predict the future is to create it."
                </blockquote>
                <p className="mt-2 text-right text-gray-500">- Peter Drucker</p>
            </div>

            <div className="relative bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800/70 shadow-2xl shadow-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300">
                <div className="grid md:grid-cols-2 items-center">
                    <div className="p-8">
                        <div className="flex items-center space-x-3 text-cyan-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.657a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 14.95a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414l-.707.707zM5 10a1 1 0 01-1-1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.667 0 1.293-.267 1.768-.742A4.486 4.486 0 0015 10c0-2.485-2.015-4.5-4.5-4.5S6 7.515 6 10c0 1.39.641 2.633 1.652 3.434.455.385 1.002.566 1.548.566h1.6z" /></svg>
                             <h2 className="text-2xl font-bold text-white">AI Program Evaluator</h2>
                        </div>
                        <p className="mt-2 text-gray-400">Get personalized college program suggestions based on your profile.</p>
                        <button onClick={() => setActiveView(View.Tools)} className="mt-4 flex items-center text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
                            Explore Feature
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                    </div>
                     <div className="h-full w-full hidden md:block">
                        <img src="https://picsum.photos/800/400?grayscale" alt="Abstract waves" className="object-cover h-full w-full opacity-30" />
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-3xl font-bold text-white">Your Arsenal</h2>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    {arsenalItems.map(item => (
                        <button 
                            key={item.name} 
                            onClick={() => setActiveView(item.view)}
                            className="flex flex-col items-center justify-center p-4 bg-gray-900/50 rounded-xl border border-gray-800/70 aspect-square hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 group"
                        >
                            <div className="h-8 w-8 text-gray-400 group-hover:text-cyan-400 transition-colors">{item.icon}</div>
                            <span className="mt-2 text-sm font-medium text-center text-gray-300 group-hover:text-cyan-400 transition-colors">{item.name}</span>
                        </button>
                    ))}
                </div>
            </div>
             <footer className="text-center text-gray-600 text-sm pt-8">
                © {new Date().getFullYear()} Eduko. All rights reserved. Empowering Students, Shaping Futures.
            </footer>
        </div>
    );
};

export default HomeView;
