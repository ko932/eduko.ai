
import React from 'react';

interface ComingSoonViewProps {
    featureName: string;
}

const ComingSoonView: React.FC<ComingSoonViewProps> = ({ featureName }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 mb-6 flex items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h1 className="text-4xl font-bold text-white">
                <span className="text-cyan-400">{featureName}</span> is Coming Soon!
            </h1>
            <p className="mt-4 text-lg text-gray-400 max-w-md">
                Our engineers are hard at work building this feature. Stay tuned, warrior!
            </p>
        </div>
    );
};

export default ComingSoonView;
