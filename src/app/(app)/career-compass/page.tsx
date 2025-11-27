'use client';
import PageHeader from '@/components/page-header';
import { Compass } from 'lucide-react';

export default function CareerCompassPage() {
  return (
    <>
      <PageHeader
        title="Career Compass"
        description="Explore 50+ career paths across Science, Commerce, and Arts."
      >
        <Compass className="w-8 h-8 text-primary" />
      </PageHeader>
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">
          This page is under construction.
        </p>
      </div>
    </>
  );
}
