'use client';
import PageHeader from '@/components/page-header';
import { Timer } from 'lucide-react';

export default function ExamCountdownPage() {
  return (
    <>
      <PageHeader
        title="Exam Countdown"
        description="Set timers for your upcoming exams."
      >
        <Timer className="w-8 h-8 text-primary" />
      </PageHeader>
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">
          This page is under construction.
        </p>
      </div>
    </>
  );
}
