import React, { useState, useEffect, useCallback } from 'react';

interface Exam {
    id: number;
    name: string;
    date: string;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const Countdown: React.FC<{ targetDate: string }> = ({ targetDate }) => {
    const calculateTimeLeft = useCallback((): TimeLeft | null => {
        const difference = +new Date(targetDate) - +new Date();
        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return null;
    }, [targetDate]);
    
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [calculateTimeLeft]);

    if (!timeLeft) {
        return <div className="text-green-400 font-bold">Exam Day! Good Luck!</div>;
    }

    return (
        <div className="flex space-x-2 md:space-x-4 text-center">
            <div><span className="text-2xl md:text-3xl font-bold text-white">{timeLeft.days}</span><div className="text-xs text-gray-400">Days</div></div>
            <div><span className="text-2xl md:text-3xl font-bold text-white">{timeLeft.hours}</span><div className="text-xs text-gray-400">Hours</div></div>
            <div><span className="text-2xl md:text-3xl font-bold text-white">{timeLeft.minutes}</span><div className="text-xs text-gray-400">Mins</div></div>
            <div><span className="text-2xl md:text-3xl font-bold text-white">{timeLeft.seconds}</span><div className="text-xs text-gray-400">Secs</div></div>
        </div>
    );
};


const ExamCountdownView: React.FC = () => {
    const [exams, setExams] = useState<Exam[]>([]);
    const [examName, setExamName] = useState('');
    const [examDate, setExamDate] = useState('');

    useEffect(() => {
        const savedExams = localStorage.getItem('edukoExams');
        if (savedExams) {
            setExams(JSON.parse(savedExams));
        }
    }, []);
    
    const saveExams = (newExams: Exam[]) => {
        setExams(newExams);
        localStorage.setItem('edukoExams', JSON.stringify(newExams));
    };

    const handleAddExam = () => {
        if (!examName || !examDate) {
            alert('Please provide both exam name and date.');
            return;
        }
        const newExam: Exam = {
            id: Date.now(),
            name: examName,
            date: examDate,
        };
        saveExams([...exams, newExam]);
        setExamName('');
        setExamDate('');
    };
    
    const handleRemoveExam = (id: number) => {
        const updatedExams = exams.filter(exam => exam.id !== id);
        saveExams(updatedExams);
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
             <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-cyan-400">Exam Countdown</span>
                </h1>
                <p className="mt-2 text-lg text-gray-400">Set timers for your upcoming exams.</p>
            </div>
            <div className="p-8 bg-gray-900/50 border border-gray-800/70 rounded-xl space-y-4">
                <h2 className="text-xl font-bold text-white">Add a New Exam</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <input type="text" placeholder="Exam Name (e.g., Final Physics)" value={examName} onChange={(e) => setExamName(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"/>
                     <input type="datetime-local" value={examDate} onChange={(e) => setExamDate(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"/>
                </div>
                <button onClick={handleAddExam} className="w-full py-3 px-6 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700">
                    Add Countdown
                </button>
            </div>
            
            <div className="space-y-4">
                {exams.length > 0 ? exams.map(exam => (
                    <div key={exam.id} className="p-4 md:p-6 bg-gray-900/50 border border-gray-800/70 rounded-xl flex flex-col md:flex-row items-center justify-between">
                        <h3 className="text-lg font-bold text-white mb-4 md:mb-0">{exam.name}</h3>
                        <div className="flex items-center space-x-4">
                           <Countdown targetDate={exam.date} />
                           <button onClick={() => handleRemoveExam(exam.id)} className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-500/10">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                           </button>
                        </div>
                    </div>
                )) : (
                    <div className="text-center text-gray-500 p-8 border border-dashed border-gray-700 rounded-xl">
                        You have no upcoming exams. Add one to start the countdown!
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExamCountdownView;
