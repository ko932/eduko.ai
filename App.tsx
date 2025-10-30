import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomeView from './views/HomeView';
import KoAIView from './views/KoAIView';
import ToolsView from './views/ToolsView';
import PricingView from './views/PricingView';
import StudyBattleRoomView from './views/StudyBattleRoomView';
import SmartNotesView from './views/SmartNotesView';
import ComingSoonView from './views/ComingSoonView';
import { View } from './types';
import ProgramEvaluatorView from './views/ProgramEvaluatorView';
import AITimetableGeneratorView from './views/AITimetableGeneratorView';
import ExamCountdownView from './views/ExamCountdownView';
import QuizMakerView from './views/QuizMakerView';
import FlashcardsView from './views/FlashcardsView';
import ExploreStreamsView from './views/ExploreStreamsView';
import CareerCompassView from './views/CareerCompassView';
import FormCentralView from './views/FormCentralView';

const App: React.FC = () => {
    const [activeView, setActiveView] = useState<string>(View.Home);
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const renderView = () => {
        switch (activeView) {
            case View.Home:
                return <HomeView setActiveView={setActiveView} />;
            case View.KoAI:
                return <KoAIView />;
            case View.Tools:
                return <ToolsView setActiveView={setActiveView}/>;
            case View.SmartNotes:
                return <SmartNotesView />;
            case View.Pricing:
                return <PricingView />;
            case View.StudyBattleRoom:
                 return <StudyBattleRoomView />;
            case View.ProgramEvaluator:
                return <ProgramEvaluatorView />;
            case View.AITimetableGenerator:
                return <AITimetableGeneratorView />;
            case View.ExamCountdown:
                return <ExamCountdownView />;
            case View.QuizMaker:
                return <QuizMakerView />;
            case View.Flashcards:
                return <FlashcardsView />;
            case View.ExploreStreams:
                return <ExploreStreamsView />;
            case View.CareerCompass:
                return <CareerCompassView setActiveView={setActiveView} />;
            case View.FormCentral:
                return <FormCentralView />;
            case View.Store:
            case View.Feedback:
            case View.Counselling:
            case View.FAQ:
                 return <ComingSoonView featureName={activeView} />;
            default:
                return <HomeView setActiveView={setActiveView} />;
        }
    };

    return (
        <div className="flex h-screen bg-[#0B0B0B]">
            <Sidebar activeView={activeView} setActiveView={setActiveView} isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default App;