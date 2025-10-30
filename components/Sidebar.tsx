
import React from 'react';
import { NAV_ITEMS } from '../constants';
import type { NavItem } from '../types';

interface SidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen, setOpen }) => {
    
    const handleNavClick = (view: string) => {
        setActiveView(view);
        if (window.innerWidth < 1024) { // Close sidebar on mobile after click
            setOpen(false);
        }
    };

    const NavLink: React.FC<{ item: NavItem }> = ({ item }) => {
        const isActive = activeView === item.view;
        if (item.isCategory) {
            return (
                <div className="mt-6 mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {item.name}
                </div>
            );
        }
        return (
            <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleNavClick(item.view); }}
                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group ${
                    isActive
                        ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(0,191,255,0.3)]'
                        : 'text-gray-400 hover:bg-gray-800/60 hover:text-white'
                }`}
            >
                <span className="mr-3">{item.icon}</span>
                {item.name}
            </a>
        );
    };

    return (
        <>
            <div className={`fixed lg:relative inset-y-0 left-0 z-30 w-64 bg-[#121212] border-r border-gray-800/50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <div className="flex items-center justify-center h-20 border-b border-gray-800/50">
                     <h1 className="text-2xl font-bold text-white tracking-wider">
                        <span className="text-cyan-400">Edu</span>ko
                    </h1>
                </div>
                <nav className="p-4 space-y-1">
                    {NAV_ITEMS.map((item) => (
                        <NavLink key={item.name} item={item} />
                    ))}
                </nav>
                <div className="absolute bottom-0 w-full p-4">
                     <div className="border-t border-gray-800/50 pt-4">
                         <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-800/60 hover:text-white rounded-lg">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                             Login / Sign Up
                         </a>
                     </div>
                </div>
            </div>
             {isOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setOpen(false)}></div>}
        </>
    );
};

export default Sidebar;
