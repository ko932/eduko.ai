import React from 'react';

export interface NavItem {
  name: string;
  icon: React.ReactNode;
  view: string;
  isCategory?: boolean;
}

export interface Tool {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface Plan {
  name: string;
  description: string;
  price: string;
  priceUnit: string;
  features: string[];
  isPopular: boolean;
  buttonText: string;
  buttonClass: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  sender: 'user' | 'ko';
  text: string;
}

export enum View {
  Home = 'Home',
  KoAI = 'Ko AI',
  Tools = 'Tools',
  SmartNotes = 'Smart Notes',
  CareerCompass = 'Career Compass',
  Pricing = 'Pricing',
  Store = 'Store',
  Exams = 'Exams',
  FormCentral = 'Form Central',
  Feedback = 'Feedback',
  Counselling = 'Counselling',
  FAQ = 'FAQ',
  StudyBattleRoom = 'Study Battle Room',
  ProgramEvaluator = 'Program Evaluator',
  QuizMaker = 'Quiz Maker',
  Flashcards = 'Flashcards',
  ExamCountdown = 'Exam Countdown',
  AITimetableGenerator = 'AI Timetable Generator',
  ExploreStreams = 'Explore Streams',
}