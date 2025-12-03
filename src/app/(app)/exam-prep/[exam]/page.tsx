'use client';
import PageHeader from '@/components/page-header';
import { useParams } from 'next/navigation';

export default function ExamPage() {
  const params = useParams();
  const exam = params.exam as string;

  const formatExamName = (slug: string) => {
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      <PageHeader
        title={`${formatExamName(exam)} Prep Hub`}
        description={`Your dedicated space for ${formatExamName(exam)} preparation.`}
      />
      <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold font-headline">AI Faculty Panel</h2>
          <p className="text-muted-foreground mt-2">
            Specialized AI Tutors for {formatExamName(exam)} will be available here soon.
          </p>
        </div>
      </div>
    </>
  );
}
