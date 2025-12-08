'use client';
import PageHeader from '@/components/page-header';
import { Sigma } from 'lucide-react';

export default function MathTutorPage() {
  return (
    <>
      <PageHeader
        title="Mr. Vasu – AI Math Tutor"
        description="Solve equations & visualize graphs."
      >
        <Sigma className="w-8 h-8 text-primary" />
      </PageHeader>
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">
          This page is under construction.
        </p>
      </div>
    </>
  );
}
