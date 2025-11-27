import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cpu } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Cpu className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-headline text-foreground">
              Eduko.AI
            </span>
          </Link>
          <div className='flex items-center gap-4'>
            <Button variant="ghost" asChild>
                <Link href="/account">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/account">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
       <main className="flex-1 flex items-center justify-center">
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
              Get Started
            </Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
