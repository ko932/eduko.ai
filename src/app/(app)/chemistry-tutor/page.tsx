'use client';
import PageHeader from '@/components/page-header';
import { Atom } from 'lucide-react';

export default function ChemistryTutorPage() {
  return (
    <>
      <PageHeader
        title="Mr. Bondz – AI Chemistry Tutor"
        description="Learn reactions & stoichiometry."
      >
        <Atom className="w-8 h-8 text-primary" />
      </PageHeader>
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">
          This page is under construction.
        </p>
      </div>
    </>
  );
}
