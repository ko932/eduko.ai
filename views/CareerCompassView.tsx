import React from 'react';
import { View } from '../types';

interface CareerCompassViewProps {
    setActiveView: (view: string) => void;
}

const CareerCompassView: React.FC<CareerCompassViewProps> = ({ setActiveView }) => {
    return (
         <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.527-1.903 6.012 6.012 0 012.706 1.912 6.012 6.012 0 01-1.912 2.706A2 2 0 0113 12a2 2 0 000 4 1.5 1.5 0 01-1.5 1.5c-.526 0-.988-.27-1.265-.673a6.012 6.012 0 01-2.706-1.912 6.012 6.012 0 011.912-2.706A2 2 0 017 8a2 2 0 000-4 1.5 1.5 0 01-1.5-1.5c.526 0 .988.27 1.265.673zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                    <span className="text-cyan-400">Career Compass</span>
                </h1>
                <p className="mt-2 text-lg text-gray-400 max-w-2xl mx-auto">Your AI guide to exploring career paths and making informed decisions.</p>
            </div>
            
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div 
                    onClick={() => setActiveView(View.ProgramEvaluator)}
                    className="cursor-pointer group p-8 bg-gray-900/50 rounded-xl border border-gray-800/70 hover:border-cyan-500/50 transition-all duration-300 text-center"
                >
                    <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.657a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 14.95a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414l-.707.707zM5 10a1 1 0 01-1-1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.667 0 1.293-.267 1.768-.742A4.486 4.486 0 0015 10c0-2.485-2.015-4.5-4.5-4.5S6 7.515 6 10c0 1.39.641 2.633 1.652 3.434.455.385 1.002.566 1.548.566h1.6z" /></svg>
                    </div>
                     <h2 className="text-2xl font-bold text-white">AI Program Evaluator</h2>
                    <p className="text-gray-400 mt-2">Get personalized program suggestions based on your academic profile and goals.</p>
                </div>
                 <div 
                    onClick={() => setActiveView(View.ExploreStreams)}
                    className="cursor-pointer group p-8 bg-gray-900/50 rounded-xl border border-gray-800/70 hover:border-cyan-500/50 transition-all duration-300 text-center"
                >
                     <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5V4H4zm0 0l5 5m-5 5v5h5v-5H4zm0 0l5-5m5-5v5h5V4h-5zm0 0l-5 5m5 5v5h5v-5h-5zm0 0l-5-5" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Explore Streams</h2>
                    <p className="text-gray-400 mt-2">Discover the subjects and career opportunities in Science, Commerce, and Arts.</p>
                </div>
            </div>
        </div>
    );
};

export default CareerCompassView;
