'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shield,
  Scale,
  Rocket,
  Banknote,
  Train,
  Landmark,
  Feather,
  Atom,
  TestTube,
  Calculator,
  Briefcase,
  GraduationCap,
  Palette,
  Cpu,
  Globe,
  Star,
} from 'lucide-react';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const govExams = [
  { icon: Landmark, name: 'UPSC CSE', href: '/exam-prep/upsc-cse' },
  { icon: Scale, name: 'SSC CGL', href: '/exam-prep/ssc-cgl' },
  { icon: Shield, name: 'NDA', href: '/exam-prep/nda' },
  { icon: Star, name: 'CDS', href: '/exam-prep/cds' },
  { icon: Feather, name: 'AFCAT', href: '/exam-prep/afcat' },
  { icon: Train, name: 'Railway Exams (RRB)', href: '/exam-prep/rrb' },
  { icon: Banknote, name: 'Banking', href: '/exam-prep/banking' },
  { icon: Landmark, name: 'State PSC Exams', href: '/exam-prep/state-psc' },
];

const entranceExams = [
  { icon: Rocket, name: 'JEE Main', href: '/exam-prep/jee-main' },
  { icon: Rocket, name: 'JEE Advanced', href: '/exam-prep/jee-advanced' },
  { icon: Atom, name: 'NEET', href: '/exam-prep/neet' },
  { icon: Scale, name: 'CLAT', href: '/exam-prep/clat' },
  { icon: Briefcase, name: 'CAT', href: '/exam-prep/cat' },
  { icon: Briefcase, name: 'SNAP', href: '/exam-prep/snap' },
  { icon: GraduationCap, name: 'VITEEE', href: '/exam-prep/viteee' },
  { icon: GraduationCap, name: 'BITSAT', href: '/exam-prep/bitsat' },
  { icon: GraduationCap, name: 'MHT-CET', href: '/exam-prep/mht-cet' },
  { icon: GraduationCap, name: 'CUET', href: '/exam-prep/cuet' },
  { icon: Cpu, name: 'GATE', href: '/exam-prep/gate' },
  { icon: Palette, name: 'NIFT / NID', href: '/exam-prep/nift-nid' },
  { icon: Cpu, name: 'IT & Tech Skills', href: '/exam-prep/it-skills' },
];

export default function ExamPrepHubPage() {
  const examHero = PlaceHolderImages.find((p) => p.id === 'exam-hero');
  return (
    <>
      <div className="relative rounded-lg overflow-hidden mb-8 p-8 flex items-center bg-card/50 min-h-[200px]">
        <div className="z-10 relative">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
            Prepare Like a Warrior
          </h1>
          <p className="mt-2 text-muted-foreground max-w-lg">
            Choose your exam. Your AI faculty awaits.
          </p>
        </div>
        {examHero && (
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src={examHero.imageUrl}
              alt={examHero.description}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={examHero.imageHint}
            />
          </div>
        )}
      </div>

      <section>
        <h2 className="text-2xl font-bold font-headline mb-6">
          Government Exams
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {govExams.map((exam) => (
            <Card
              key={exam.name}
              className="group hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <exam.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-headline text-lg mb-4">{exam.name}</h3>
                <Button asChild variant="outline">
                  <Link href={exam.href}>Start Prep</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold font-headline mb-6">
          Entrance & Private Exams
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {entranceExams.map((exam) => (
            <Card
              key={exam.name}
              className="group hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <exam.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-headline text-lg mb-4">{exam.name}</h3>
                <Button asChild variant="outline">
                  <Link href={exam.href}>Start Prep</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
