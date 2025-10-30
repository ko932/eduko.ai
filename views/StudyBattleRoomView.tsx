
import React from 'react';

const StudyBattleRoomView: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="text-center">
                 <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center space-x-3">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>
                    <span className="text-cyan-400">Study Battle Room</span>
                </h1>
                <p className="mt-2 text-lg text-gray-400 max-w-2xl mx-auto">Create or join a virtual study session with friends and our AI Tutor. Let's conquer those goals together.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Create a New Room Card */}
                <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800/70 flex flex-col items-center text-center">
                     <div className="w-16 h-16 flex items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Create a New Room</h2>
                    <p className="text-gray-400 mt-2">Start a new public or private study session.</p>
                    <button className="mt-6 py-2 px-6 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-all duration-200 shadow-[0_0_15px_rgba(0,191,255,0.4)] hover:shadow-[0_0_20px_rgba(0,191,255,0.6)]">
                        Create Room & Go
                    </button>
                </div>

                {/* Join an Existing Room Card */}
                <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800/70 flex flex-col items-center text-center">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Join an Existing Room</h2>
                    <p className="text-gray-400 mt-2">Enter a room code to join your friends.</p>
                    <div className="mt-6 w-full max-w-xs space-y-3">
                         <input type="text" placeholder="Enter room code..." className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                         <button className="w-full py-2 px-6 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors">
                            Join Room
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="max-w-4xl mx-auto">
                <h3 className="text-xl font-bold text-white">Public Rooms</h3>
                <div className="mt-4 p-12 bg-gray-900/50 rounded-xl border border-dashed border-gray-700/70 text-center text-gray-500">
                    <p>No public rooms available right now.</p>
                    <p className="text-sm">Create one to get started!</p>
                </div>
            </div>
        </div>
    );
};

export default StudyBattleRoomView;
