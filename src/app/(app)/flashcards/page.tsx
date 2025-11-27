'use client';
import PageHeader from '@/components/page-header';
import { Layers } from 'lucide-react';

export default function FlashcardsPage() {
  return (
    <>
      <PageHeader
        title="Flashcards"
        description="Create and study with digital flashcards."
      >
        <Layers className="w-8 h-8 text-primary" />
      </PageHeader>
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">
          This page is under construction.
        </p>
      </div>
    </>
  );
}
