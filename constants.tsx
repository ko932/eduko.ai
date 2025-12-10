
import React from 'react';
import type { NavItem, Tool, Plan } from './types';
import { View } from './types';

// SVG Icons as React Components for better control and styling
// FIX: Export icon components to make them available for import in other modules.
export const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>;
export const KoAIIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
export const ToolsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0L8 5.69 5.69 8l-2.52.51c-1.56.38-1.56 2.6 0 2.98L5.69 12 8 14.31l.51 2.52c.38 1.56 2.6 1.56 2.98 0L12 14.31 14.31 12l2.52-.51c1.56-.38 1.56-2.6 0-2.98L14.31 8 12 5.69l-.51-2.52z" clipRule="evenodd" /></svg>;
export const CompassIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.527-1.903 6.012 6.012 0 012.706 1.912 6.012 6.012 0 01-1.912 2.706A2 2 0 0113 12a2 2 0 000 4 1.5 1.5 0 01-1.5 1.5c-.526 0-.988-.27-1.265-.673a6.012 6.012 0 01-2.706-1.912 6.012 6.012 0 011.912-2.706A2 2 0 017 8a2 2 0 000-4 1.5 1.5 0 01-1.5-1.5c.526 0 .988.27 1.265.673zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>;
export const PricingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.5 2.5 0 00-1.134 0v-1.43zM11.567 7.151c.22.07.412.164.567.267v1.43a2.5 2.5 0 00-1.134 0V7.151z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.5 4.5 0 00-1.881.756l-.21.084a1 1 0 00-.73.953v.255a1 1 0 00.73.953l.21.084a4.5 4.5 0 001.88.756V10a1 1 0 102 0v-.092a4.5 4.5 0 001.88-..756l.21-.084a1 1 0 00.73-.953V8.255a1 1 0 00-.73-.953l-.21-.084A4.5 4.5 0 0011 6.182V5z" clipRule="evenodd" /></svg>;
export const StoreIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>;
export const ExamIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>;
export const FormIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>;
export const FeedbackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.083-3.083A6.96 6.96 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.833 11.917a.5.5 0 10-.666.666 3.5 3.5 0 004.333 1.5 4.5 4.5 0 01-3.667-2.166z" clipRule="evenodd" /></svg>;
export const CounsellingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" /><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h1a2 2 0 002-2V9a2 2 0 00-2-2h-1z" /></svg>;
export const FaqIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>;
export const LightbulbIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.657a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 14.95a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414l-.707.707zM5 10a1 1 0 01-1-1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.667 0 1.293-.267 1.768-.742A4.486 4.486 0 0015 10c0-2.485-2.015-4.5-4.5-4.5S6 7.515 6 10c0 1.39.641 2.633 1.652 3.434.455.385 1.002.566 1.548.566h1.6z" /></svg>;
export const NotesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
export const FlashcardsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
export const QuizIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
export const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
export const TimetableIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
export const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>;
export const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
export const BeakerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l.477 2.387a2 2 0 001.806.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l2.387-.477a2 2 0 01.547-1.022a2 2 0 01.547-1.806l2.387.477a6 6 0 013.86-.517l.318-.158a6 6 0 003.86-.517l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 00-.517-3.86L19.428 15.428z" /></svg>;
export const AtomIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
export const PlusCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
export const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
export const DiamondIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM5.5 8.5a.5.5 0 00.5.5h8a.5.5 0 000-1h-8a.5.5 0 00-.5.5zm.5 2a.5.5 0 000 1h8a.5.5 0 000-1h-8z" clipRule="evenodd" /></svg>;
export const RocketIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" /></svg>;


export const NAV_ITEMS: NavItem[] = [
  { name: View.Home, icon: <HomeIcon />, view: View.Home },
  { name: View.KoAI, icon: <KoAIIcon />, view: View.KoAI },
  { name: View.Tools, icon: <ToolsIcon />, view: View.Tools },
  { name: View.CareerCompass, icon: <CompassIcon />, view: View.CareerCompass },
  { name: View.Pricing, icon: <PricingIcon />, view: View.Pricing },
  { name: View.Store, icon: <StoreIcon />, view: View.Store },
  { name: 'Exams', icon: <ExamIcon />, view: View.Exams, isCategory: true },
  { name: View.FormCentral, icon: <FormIcon />, view: View.FormCentral },
  { name: View.Feedback, icon: <FeedbackIcon />, view: View.Feedback },
  { name: View.Counselling, icon: <CounsellingIcon />, view: View.Counselling },
  { name: View.FAQ, icon: <FaqIcon />, view: View.FAQ },
];

export const TOOLS: Tool[] = [
  { name: 'Program Evaluator', description: 'AI analysis of your academic profile for program suggestions.', icon: <LightbulbIcon />, color: 'cyan' },
  { name: 'Smart Notes', description: 'Generate top-level AI notes for any topic, from school to masters.', icon: <NotesIcon />, color: 'blue' },
  { name: 'Career Compass', description: 'Explore 50+ career paths across Science, Commerce, and Arts.', icon: <CompassIcon />, color: 'green' },
  { name: 'Explore Streams', description: 'Discover academic streams and subject combinations.', icon: <ExamIcon />, color: 'purple' },
  { name: 'Form Central', description: 'Initiate various application forms from a single point.', icon: <FormIcon />, color: 'yellow' },
  { name: 'Flashcards', description: 'Create and study with digital flashcards.', icon: <FlashcardsIcon />, color: 'red' },
  { name: 'Quiz Maker', description: 'Generate quizzes on any topic to test your knowledge.', icon: <QuizIcon />, color: 'indigo' },
  { name: 'Exam Countdown', description: 'Set timers for your upcoming exams.', icon: <ClockIcon />, color: 'pink' },
  { name: 'AI Timetable Generator', description: 'Generate a personalized study schedule based on your lifestyle.', icon: <TimetableIcon />, color: 'orange' },
  { name: 'Study Battle Room', description: 'Create or join a virtual study session with friends and an AI Tutor.', icon: <UsersIcon />, color: 'teal' },
  { name: 'Mr. Vasu - AI Math Tutor', description: 'Solve equations, understand trigonometry, and analyze graphs with your AI math partner.', icon: <PlusCircleIcon />, color: 'cyan' },
  { name: 'Mr. Bondz - AI Chem Tutor', description: 'Master organic reactions, stoichiometry, and periodic trends with your AI chemistry partner.', icon: <BeakerIcon />, color: 'green' },
  { name: 'Mr. Ohm - AI Physics Tutor', description: 'Solve complex problems in mechanics, electromagnetism, and thermodynamics with an expert AI.', icon: <AtomIcon />, color: 'blue' },
  { name: 'Mr. Aryan - Code Mentor', description: 'Your personal AI partner for learning to code, debugging, and building projects.', icon: <CodeIcon />, color: 'purple' },
  { name: 'Sanjivani AI - Medical Tutor', description: 'An empathetic AI guide for complex medical and doctoral course concepts.', icon: <PlusCircleIcon />, color: 'red' },
];

export const PRICING_PLANS: Plan[] = [
  {
    name: 'Free',
    description: 'Get started and explore the basics.',
    price: '₹0',
    priceUnit: '',
    features: ['Limited Ko AI Chat', 'Career Compass Access', 'Exam Information', 'Basic Tools (Flashcards, Quiz)'],
    isPopular: false,
    buttonText: 'Current Plan',
    buttonClass: 'bg-gray-700 text-gray-400 cursor-not-allowed',
    icon: <StarIcon />
  },
  {
    name: 'Learner',
    description: 'Unlock powerful AI tools to accelerate your learning.',
    price: '₹99',
    priceUnit: '/month',
    features: ['Everything in Free, plus:', 'Unlimited Ko AI Chat', 'AI Timetable Generator', 'AI Career Idea Generator', 'Save Notes to Vault', 'Ad-Free Experience'],
    isPopular: true,
    buttonText: 'Upgrade to Learner',
    buttonClass: 'bg-red-600 hover:bg-red-700 text-white',
    icon: <DiamondIcon />
  },
  {
    name: 'Beast Mode',
    description: 'For those who want the ultimate academic advantage.',
    price: '₹299',
    priceUnit: '/month',
    features: ['Everything in Learner, plus:', 'Mr. Vasu - AI Math Tutor', 'Mr. Bondz - AI Chem Tutor', 'Mr. Ohm - AI Physics Tutor', 'AI Program Evaluator', 'Priority Support'],
    isPopular: false,
    buttonText: 'Go Beast Mode',
    buttonClass: 'bg-gray-800 hover:bg-cyan-500 border border-cyan-500 hover:border-cyan-400 text-white',
    icon: <RocketIcon />
  },
];
