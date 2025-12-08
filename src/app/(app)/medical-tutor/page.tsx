'use client';
import PageHeader from '@/components/page-header';
import { HeartPulse } from 'lucide-react';

export default function MedicalTutorPage() {
  return (
    <>
      <PageHeader
        title="Sanjivani AI – Medical Tutor"
        description="Medical & biology guidance."
      >
        <HeartPulse className="w-8 h-8 text-primary" />
      </PageHeader>
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">
          This page is under construction.
        </p>
      </div>
    </>
  );
}
