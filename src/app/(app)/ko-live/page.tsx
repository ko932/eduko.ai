'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsRight, BookOpen, HelpCircle, FileText, X, Mic, Send } from 'lucide-react';
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
      fill="rgba(38, 163, 255, 0.15)"
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
    <div className="relative flex items-center justify-center w-full h-[calc(100vh-8rem)] bg-gradient-to-b from-[#071133] to-[#08183a] rounded-xl overflow-hidden">
      <ParticleAnimation />

      {/* Sidebar Trigger */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, right: -20 }}
            animate={{ opacity: 1, right: 16 }}
            exit={{ opacity: 0, right: -20 }}
            className="absolute top-4 right-4 z-30"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <ChevronsRight className="rotate-180" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Right Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 right-0 h-full w-80 z-20 p-4"
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
            paddingRight: isSidebarOpen ? '21rem' : '1rem',
            transition: { type: 'spring', stiffness: 300, damping: 30 }
        }}
       >
         <div className="w-full h-full flex flex-col items-center justify-center">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-2xl md:text-3xl font-headline font-bold text-white relative">
                Welcome to the future of class — Ko AI’s class
                <motion.span 
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-primary"
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
              className="mt-8 w-[90%] md:w-[60%] h-72 border-2 border-dashed border-primary/30 rounded-2xl flex items-center justify-center bg-black/20 backdrop-blur-sm"
            >
              <p className="text-primary/70">[ 3D AI Tutor: Ko AI Renders Here ]</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-6 w-[90%] max-w-2xl p-4 rounded-lg bg-black/20 backdrop-blur-md border border-white/10"
            >
                <p className="text-sm text-blue-100/80">
                    This is the Explanation Panel. AI-generated text, diagrams, and step-by-step guidance will appear here in real-time.
                </p>
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
