
'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Bot,
  Compass,
  FileText,
  Headphones,
  Lightbulb,
  Store,
  Wrench,
  Cpu,
  DollarSign,
  User,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const arsenalItems = [
  { icon: Bot, label: 'Ko AI', href: '/ko-chat' },
  { icon: Wrench, label: 'Tools', href: '/tools' },
  { icon: Compass, label: 'Career', href: '/program-evaluator' },
  { icon: FileText, label: 'Exams', href: '/exam-prep' },
  { icon: FileText, label: 'Form Central', href: '/forms' },
  { icon: Headphones, label: 'Counselling', href: '#' },
  { icon: Store, label: 'Store', href: '#' },
  { icon: DollarSign, label: 'Pricing Plans', href: '#' },
];

const dailyQuotes = [
    { quote: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { quote: "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.", author: "Thomas A. Edison" },
    { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { quote: "The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence.", author: "Confucius" },
];


export default function DashboardPage() {
    const oceanImage = PlaceHolderImages.find(p => p.id === 'ocean-waves');
    
    // Get a quote for the day
    const dayOfMonth = new Date().getDate();
    const quote = dailyQuotes[dayOfMonth % dailyQuotes.length];

  return (
    <>
      {/* Hero Section */}
      <div className="mb-12 rounded-lg p-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
          Welcome back, <span className="text-primary">Warrior</span>
        </h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          This is your command center. Stay focused, stay sharp.
        </p>
        <blockquote className="mt-6 border-l-2 border-primary pl-4 italic text-muted-foreground">
          &quot;{quote.quote}&quot;
          <cite className="block not-italic text-right mt-2">- {quote.author}</cite>
        </blockquote>
      </div>

      {/* Feature Card */}
      <div className="mb-12">
        <Card className="bg-card/50 backdrop-blur-sm overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-headline font-bold">AI Program Evaluator</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Get personalized college program suggestions based on your profile.
              </p>
              <Button variant="link" className="p-0 text-primary" asChild>
                <Link href="/program-evaluator">
                  Explore Feature <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative min-h-[200px] md:min-h-0">
               {oceanImage && (
                <Image
                  src={oceanImage.imageUrl}
                  alt={oceanImage.description}
                  fill
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={oceanImage.imageHint}
                />
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Your Arsenal Section */}
      <div>
        <h2 className="text-3xl font-headline font-bold mb-6">Your Arsenal</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {arsenalItems.map((item) => (
            <Link href={item.href} key={item.label} className="group">
              <Card className="bg-card/50 hover:bg-secondary/50 hover:border-primary/50 transition-colors text-center aspect-square flex flex-col items-center justify-center p-4">
                <item.icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                <p className="mt-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">{item.label}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
