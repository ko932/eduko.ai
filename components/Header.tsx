
import React from 'react';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    return (
        <header className="flex-shrink-0 h-20 bg-[#0B0B0B] flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-gray-800/50">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="lg:hidden text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                 <div className="lg:hidden ml-4">
                    <h1 className="text-2xl font-bold text-white tracking-wider">
                        <span className="text-cyan-400">Edu</span>ko
                    </h1>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <a href="#" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
                    Login
                </a>
                <a href="#" className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-200 shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]">
                    Sign Up
                </a>
            </div>
        </header>
    );
};

export default Header;
