'use client';
import PageHeader from '@/components/page-header';
import { GraduationCap } from 'lucide-react';

export default function StreamsPage() {
  return (
    <>
      <PageHeader
        title="Explore Streams"
        description="Find perfect academic streams."
      >
        <GraduationCap className="w-8 h-8 text-primary" />
      </PageHeader>
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">
          This page is under construction.
        </p>
      </div>
    </>
  );
}
