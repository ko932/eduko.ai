'use client';
import PageHeader from '@/components/page-header';
import { HelpCircle } from 'lucide-react';

export default function DoubtsPage() {
  return (
    <>
      <PageHeader
        title="Smart Doubt Solver"
        description="Instant answers. Zero waiting."
      >
        <HelpCircle className="w-8 h-8 text-primary" />
      </PageHeader>
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">
          This page is under construction.
        </p>
      </div>
    </>
  );
}
