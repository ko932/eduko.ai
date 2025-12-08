'use client';
import PageHeader from '@/components/page-header';
import { Calendar } from 'lucide-react';

export default function TimetableAiPage() {
  return (
    <>
      <PageHeader
        title="AI Timetable Generator"
        description="Personalized study schedule."
      >
        <Calendar className="w-8 h-8 text-primary" />
      </PageHeader>
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">
          This page is under construction.
        </p>
      </div>
    </>
  );
}
