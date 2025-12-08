'use client';
import PageHeader from '@/components/page-header';
import { BarChart } from 'lucide-react';

export default function TestsPage() {
  return (
    <>
      <PageHeader
        title="Mock Tests & Analytics"
        description="Know your scores instantly."
      >
        <BarChart className="w-8 h-8 text-primary" />
      </PageHeader>
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">
          This page is under construction.
        </p>
      </div>
    </>
  );
}
