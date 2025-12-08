'use client';
import PageHeader from '@/components/page-header';
import { FlaskConical } from 'lucide-react';

export default function PhysicsTutorPage() {
  return (
    <>
      <PageHeader
        title="Mr. Ohm – AI Physics Tutor"
        description="Mechanics, EM, thermodynamics help."
      >
        <FlaskConical className="w-8 h-8 text-primary" />
      </PageHeader>
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">
          This page is under construction.
        </p>
      </div>
    </>
  );
}
