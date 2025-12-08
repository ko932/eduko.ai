'use client';
import PageHeader from '@/components/page-header';
import { FileText } from 'lucide-react';

export default function NotesPage() {
  return (
    <>
      <PageHeader
        title="AI Lecture Notes"
        description="Auto notes for every chapter."
      >
        <FileText className="w-8 h-8 text-primary" />
      </PageHeader>
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">
          This page is under construction.
        </p>
      </div>
    </>
  );
}
