'use client';
import PageHeader from '@/components/page-header';
import { BrainCircuit } from 'lucide-react';

export default function QuizMakerPage() {
  return (
    <>
      <PageHeader
        title="Quiz Maker"
        description="Generate quizzes on any topic to test your knowledge."
      >
        <BrainCircuit className="w-8 h-8 text-primary" />
      </PageHeader>
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">
          This page is under construction.
        </p>
      </div>
    </>
  );
}
