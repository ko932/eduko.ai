'use client';
import PageHeader from '@/components/page-header';
import { Code } from 'lucide-react';

export default function CodeMentorPage() {
  return (
    <>
      <PageHeader
        title="Mr. Aryan – Code Mentor"
        description="Debug & build code with AI."
      >
        <Code className="w-8 h-8 text-primary" />
      </PageHeader>
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">
          This page is under construction.
        </p>
      </div>
    </>
  );
}
