'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  generateSmartNotes,
  type GenerateSmartNotesOutput,
} from '@/ai/flows/generate-smart-notes';
import { useToast } from '@/hooks/use-toast';
import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  rawText: z.string().min(50, 'Please provide at least 50 characters of text.'),
  topic: z.string().min(2, 'Topic is required.'),
  gradeLevel: z.string().min(2, 'Grade level is required.'),
});

export default function SmartNotesPage() {
  const [result, setResult] = useState<GenerateSmartNotesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rawText: '',
      topic: '',
      gradeLevel: '12th Grade',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await generateSmartNotes(values);
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: 'Failed to generate smart notes. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Smart Notes"
        description="Generate high-quality AI notes for any topic — from school to masters."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Input Text</CardTitle>
              <CardDescription>
                Paste your text and provide some context.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="rawText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Raw Text / Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste your notes, article, or any text here..."
                            className="h-48"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Topic Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Photosynthesis" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gradeLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education Level</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 10th Grade, University" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Generate Notes
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="min-h-full">
            <CardHeader>
              <CardTitle>Generated Smart Notes</CardTitle>
              <CardDescription>
                Your complete study package, ready to use.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && <Skeleton className="h-96 w-full" />}
              {result && (
                <Tabs defaultValue="summary" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="fullNotes">Full Notes</TabsTrigger>
                    <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                    <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                  </TabsList>

                  <TabsContent value="summary" className="prose prose-sm prose-invert max-w-none mt-4">
                    <h3>Summary</h3>
                    <p>{result.summary}</p>
                    <h3 className='mt-6'>Concept Breakdown</h3>
                     <div className="space-y-2">
                        <p><strong>What:</strong> {result.conceptBreakdown.what}</p>
                        <p><strong>Why:</strong> {result.conceptBreakdown.why}</p>
                        <p><strong>How:</strong> {result.conceptBreakdown.how}</p>
                     </div>
                    <h3 className='mt-6'>Mind Map</h3>
                    <pre className="whitespace-pre-wrap bg-secondary/50 p-4 rounded-lg font-code">{result.mindMap}</pre>
                  </TabsContent>

                  <TabsContent value="fullNotes" className="prose prose-sm prose-invert max-w-none mt-4">
                     <h3>Full Notes</h3>
                     <pre className="whitespace-pre-wrap bg-secondary/50 p-4 rounded-lg font-code">{result.fullNotes}</pre>
                  </TabsContent>
                  
                  <TabsContent value="flashcards" className="prose prose-sm prose-invert max-w-none mt-4">
                     <h3>Flashcards</h3>
                     <pre className="whitespace-pre-wrap bg-secondary/50 p-4 rounded-lg font-code">{result.flashcards}</pre>
                  </TabsContent>

                   <TabsContent value="quizzes" className="prose prose-sm prose-invert max-w-none mt-4">
                     <h3>Multiple Choice Questions</h3>
                     <pre className="whitespace-pre-wrap bg-secondary/50 p-4 rounded-lg font-code">{result.mcqs}</pre>
                     <h3 className='mt-6'>Fill in the Blanks</h3>
                     <pre className="whitespace-pre-wrap bg-secondary/50 p-4 rounded-lg font-code">{result.fillInTheBlanks}</pre>
                  </TabsContent>

                </Tabs>
              )}
              {!isLoading && !result && (
                <div className="text-center text-muted-foreground py-20">
                  <p>Your generated smart notes will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
