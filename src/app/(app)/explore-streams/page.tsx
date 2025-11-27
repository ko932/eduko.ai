'use client';
import PageHeader from '@/components/page-header';
import { GraduationCap } from 'lucide-react';

export default function ExploreStreamsPage() {
  return (
    <>
      <PageHeader
        title="Explore Streams"
        description="Discover academic streams and subject combinations."
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
