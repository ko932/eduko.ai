'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsLeft, BookOpen, HelpCircle, FileText, X, Mic, Send, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const modes = {
  learning: {
    icon: BookOpen,
    title: 'Learning Mode',
    description: 'Guided lessons and new concepts.',
  },
  doubt: {
    icon: HelpCircle,
    title: 'Doubt Mode',
    description: 'Ask any question, get instant solutions.',
  },
  exam: {
    icon: FileText,
    title: 'Exam Mode',
    description: 'Simulate exam conditions.',
  },
};

type Mode = keyof typeof modes;

const Particle = ({ characteristics }: { characteristics: any }) => {
  const { initialX, initialY, radius, vw, vh } = characteristics;
  return (
    <motion.circle
      cx={initialX * vw}
      cy={initialY * vh}
      r={radius}
      fill="rgba(0, 175, 255, 0.08)"
      animate={{
        x: [initialX * vw, (initialX + (Math.random() - 0.5) * 0.1) * vw],
        y: [initialY * vh, (initialY + (Math.random() - 0.5) * 0.1) * vh],
      }}
      transition={{
        duration: 20 + Math.random() * 20,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    />
  );
};


const ParticleAnimation = () => {
    const [vw, setVw] = useState(1000);
    const [vh, setVh] = useState(1000);

    React.useEffect(() => {
        const updateSize = () => {
            setVw(window.innerWidth);
            setVh(window.innerHeight);
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const numParticles = 80;

    const particles = useMemo(() => {
        return Array.from({ length: numParticles }).map(() => {
        return {
            initialX: Math.random(),
            initialY: Math.random(),
            radius: Math.random() * 1.5 + 0.5,
            vw,
            vh
        };
        });
    }, [vw, vh]);

    return (
        <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        >
        {particles.map((characteristics, i) => (
            <Particle key={i} characteristics={characteristics} />
        ))}
        </svg>
    );
};

export default function KoLivePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMode, setActiveMode] = useState<Mode>('learning');

  return (
    <div className="relative flex w-full h-[calc(100vh-8rem)] bg-gradient-to-b from-[#000000] to-[#0A0A0F] rounded-xl overflow-hidden">
      <ParticleAnimation />
      
      {/* Left Internal Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 left-0 h-full w-72 z-20 p-4"
          >
            <div className="h-full w-full bg-black/50 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline font-bold text-lg text-white">Live Modes</h2>
              </div>

              <div className="space-y-2">
                {Object.keys(modes).map((key) => {
                  const mode = modes[key as Mode];
                  const isActive = activeMode === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveMode(key as Mode)}
                      className={cn(
                        'w-full text-left p-3 rounded-lg border transition-all duration-200',
                        isActive
                          ? 'bg-primary/20 border-primary/50 shadow-[0_0_15px] shadow-primary/30'
                          : 'bg-white/5 border-transparent hover:bg-white/10'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <mode.icon
                          className={cn(
                            'h-5 w-5 transition-colors',
                            isActive ? 'text-primary' : 'text-white/60'
                          )}
                        />
                        <span
                          className={cn(
                            'font-semibold transition-colors',
                            isActive ? 'text-white' : 'text-white/80'
                          )}
                        >
                          {mode.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Canvas Content */}
      <motion.div 
        className="relative z-10 text-center flex flex-col items-center w-full h-full p-6"
        animate={{
            paddingLeft: isSidebarOpen ? '20rem' : '5rem',
            transition: { type: 'spring', stiffness: 300, damping: 30 }
        }}
       >
         {/* Sidebar Trigger */}
        <div className="absolute top-4 left-4 z-30">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white hover:bg-white/10 hover:text-white"
            >
              {isSidebarOpen ? <X /> : <ChevronsLeft className="rotate-180" />}
            </Button>
        </div>

         <div className="w-full h-full flex flex-col items-center justify-center">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-xl md:text-2xl font-headline font-bold text-primary relative">
                Ko AI — Live Interactive Mode
                <motion.span 
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary/70"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                />
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 w-[90%] md:w-[60%] h-96 border-2 border-dashed border-primary/30 rounded-2xl flex items-center justify-center bg-black/20 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center gap-4 text-primary/70">
                <Bot size={64}/>
                <p>[ 3D AI Tutor: Ko AI Renders Here ]</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 w-[90%] max-w-2xl flex items-center justify-center gap-4"
            >
                <div className="relative w-full">
                  <Textarea placeholder="Type or say something..." className="bg-black/30 border-primary/30 focus-visible:ring-primary pr-24" />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <Button size="icon" variant="ghost" className="text-primary hover:text-cyan-300 hover:bg-primary/10">
                        <Mic className="h-5 w-5" />
                    </Button>
                     <Button size="icon" className="bg-primary/80 hover:bg-primary shadow-[0_0_15px] shadow-primary/50">
                        <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
            </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
