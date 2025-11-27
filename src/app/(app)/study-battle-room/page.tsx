'use client';
import PageHeader from '@/components/page-header';
import { Users } from 'lucide-react';

export default function StudyBattleRoomPage() {
  return (
    <>
      <PageHeader
        title="Study Battle Room"
        description="Create or join a virtual study session with friends and an AI Tutor."
      >
        <Users className="w-8 h-8 text-primary" />
      </PageHeader>
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">
          This page is under construction.
        </p>
      </div>
    </>
  );
}
