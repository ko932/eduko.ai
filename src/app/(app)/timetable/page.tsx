'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  generateTimetable,
  type GenerateTimetableOutput,
} from '@/ai/flows/generate-timetable';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  subjects: z.string().min(3, 'Please list at least one subject.'),
  weakAreas: z.string().optional(),
  strongAreas: z.string().optional(),
  studyHours: z.coerce.number().min(1, 'Please enter at least 1 hour.').max(16, 'Study hours seem too high.'),
  examDates: z.string().optional(),
  lifestyleSchedule: z.string().min(10, 'Please describe your daily routine.'),
});

export default function TimetablePage() {
  const [result, setResult] = useState<GenerateTimetableOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjects: '',
      weakAreas: '',
      strongAreas: '',
      studyHours: 4,
      examDates: '',
      lifestyleSchedule: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await generateTimetable({
        ...values,
        weakAreas: values.weakAreas || "",
        strongAreas: values.strongAreas || "",
        examDates: values.examDates || "",
      });
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: 'Failed to generate timetable. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        title="AI Timetable Generator"
        description="Create a balanced and personalized study schedule."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Study Profile</CardTitle>
              <CardDescription>
                Tell us about your study habits and schedule.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="subjects"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subjects</FormLabel>
                        <FormControl>
                          <Input placeholder="Maths, Physics, Chemistry" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="weakAreas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weak Areas (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Calculus, Organic Chemistry" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="strongAreas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Strong Areas (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Algebra, Mechanics" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="studyHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily Study Hours</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="4" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="examDates"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upcoming Exam Dates (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Mid-term: Oct 15, Final: Dec 10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lifestyleSchedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lifestyle & Commitments</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., School from 8am-3pm, Soccer practice 4pm-6pm on Tue/Thu."
                            {...field}
                          />
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
                    Generate Timetable
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="min-h-full">
            <CardHeader>
              <CardTitle>Your Weekly Timetable</CardTitle>
              <CardDescription>A schedule designed for your success.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && <Skeleton className="h-96 w-full" />}
              {result && (
                <div className="space-y-6">
                  {result.warnings && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>{result.warnings}</AlertDescription>
                    </Alert>
                  )}
                  <div className="prose prose-sm prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap bg-secondary/50 p-4 rounded-lg font-code">{result.weeklyTimetable}</pre>
                  </div>
                </div>
              )}
              {!isLoading && !result && (
                <div className="text-center text-muted-foreground py-20">
                  <p>Your generated timetable will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
