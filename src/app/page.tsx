import Link from 'next/link';
import { ArrowRight, Bot, Cpu, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Cpu className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-headline text-foreground">
              Eduko.AI
            </span>
          </Link>
          <Button asChild>
            <Link href="/account">
              Launch App <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <div
            className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute top-0 left-0 -z-10 h-1/3 w-full bg-[radial-gradient(circle_farthest-side_at_50%_100%,rgba(48,213,200,0.3),rgba(48,213,200,0))]"></div>
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter text-foreground mb-4">
            Your AI Academic Command Center
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            Eduko.AI is a complete academic operating system, offering everything from AI tutors to career guidance.
          </p>
          <Button size="lg" asChild>
            <Link href="/account">
              Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl">AI Tutors</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Engage with our main AI Tutor, Ko AI, or specialized tutors for Math, Chemistry, Physics, and more.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Cpu className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl">AI-Powered Tools</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  An arsenal of tools including Project GenX, Program Evaluator, Timetable Generator, and Smart Notes.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl">Career Guidance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Explore career paths, get college suggestions, and find all the forms and exam info you need.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Eduko.AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
