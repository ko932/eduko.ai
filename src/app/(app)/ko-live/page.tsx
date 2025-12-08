'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsLeft, BookOpen, HelpCircle, FileText, X, Mic, Waves } from 'lucide-react';
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
  const { initialX, initialY, radius } = characteristics;
  return (
    <motion.circle
      cx={initialX}
      cy={initialY}
      r={radius}
      fill="rgba(0, 175, 255, 0.2)"
      animate={{
        x: [initialX, initialX + 20, initialX - 20, initialX],
        y: [initialY, initialY + 20, initialY - 20, initialY],
      }}
      transition={{
        duration: 15 + Math.random() * 10,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    />
  );
};


const ParticleAnimation = () => {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 1000;
    const numParticles = 80;

    const particles = useMemo(() => {
        return Array.from({ length: numParticles }).map(() => {
        const initialX = Math.random() * vw;
        const initialY = Math.random() * vh;
        return {
            initialX,
            initialY,
            radius: Math.random() * 1.5 + 0.5,
        };
        });
    }, [vw, vh]);

    return (
        <svg
        className="absolute inset-0 w-full h-full opacity-50"
        viewBox={`0 0 ${vw} ${vh}`}
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
    <div className="relative flex items-center justify-center w-full h-[calc(100vh-8rem)] bg-gradient-to-b from-[#0A0A0F] to-[#000000] rounded-xl overflow-hidden">
      <ParticleAnimation />

      {/* Sidebar Trigger */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, left: -20 }}
            animate={{ opacity: 1, left: 16 }}
            exit={{ opacity: 0, left: -20 }}
            className="absolute top-4 left-4 z-30"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <ChevronsLeft className="rotate-180" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Left Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 left-0 h-full w-80 z-20 p-4"
          >
            <div className="h-full w-full bg-black/30 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline font-bold text-lg text-white">Live Mode</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-white/70 hover:bg-white/10 hover:text-white h-7 w-7"
                >
                  <X className="h-5 w-5" />
                </Button>
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
                      <p className="text-xs text-white/60 mt-1 pl-8">
                        {mode.description}
                      </p>
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
        className="relative z-10 text-center flex flex-col items-center w-full h-full"
        animate={{
            paddingLeft: isSidebarOpen ? '21rem' : '1rem',
            transition: { type: 'spring', stiffness: 300, damping: 30 }
        }}
       >
         <div className="w-full h-full flex flex-col items-center justify-center">
            
            <div className="w-full text-center mb-4">
                 <h1 className="text-2xl font-headline font-bold text-primary relative inline-block">
                    Ko AI — Live Interactive Mode
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/50 shadow-[0_0_10px] shadow-primary"></span>
                 </h1>
            </div>

            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 w-[60%] h-72 border-2 border-dashed border-primary/30 rounded-2xl flex items-center justify-center bg-black/20 backdrop-blur-sm"
            >
            <p className="text-primary/70">[ 3D AI Tutor: Ko AI Renders Here ]</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-6 w-[80%] max-w-2xl p-4 rounded-lg bg-black/20 backdrop-blur-md border border-white/10"
            >
                <p className="text-sm text-blue-100/80">
                    This is the Explanation Panel. AI-generated text, diagrams, and step-by-step guidance will appear here in real-time.
                </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 w-[80%] max-w-2xl flex items-center justify-center gap-4">
                <Textarea placeholder="Type your message..." className="bg-black/30 border-primary/30 focus-visible:ring-primary" />
                <Button size="icon" className="h-10 w-10 bg-primary/80 hover:bg-primary shadow-[0_0_15px] shadow-primary/50">
                    <Mic className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2 text-primary">
                    <Waves className="w-6 h-6"/>
                    <span className="text-sm">TTS</span>
                </div>
            </motion.div>
        </div>
      </motion.div>

    </div>
  );
}
