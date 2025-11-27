'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  evaluateCollegePrograms,
  type EvaluateCollegeProgramsOutput,
} from '@/ai/flows/evaluate-college-programs';
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
import { Loader2, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  stream: z.string().min(2, 'Stream is required.'),
  examScores: z.string().min(2, 'Exam scores are required.'),
  budget: z.coerce.number().positive('Budget must be a positive number.'),
  locationPreference: z.string().min(2, 'Location preference is required.'),
  futureGoal: z.string().min(10, 'Future goal must be at least 10 characters.'),
});

export default function ProgramEvaluatorPage() {
  const [result, setResult] = useState<EvaluateCollegeProgramsOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stream: '',
      examScores: '',
      budget: 50000,
      locationPreference: 'Any',
      futureGoal: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await evaluateCollegePrograms(values);
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: 'Failed to evaluate programs. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        title="AI Program Evaluator"
        description="Your personal admissions counselor."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                Provide your details to get program suggestions.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="stream"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Academic Stream</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Science, Commerce" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="examScores"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exam Scores</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., SAT: 1400, GPA: 3.8" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget (USD per year)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="50000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="locationPreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location Preference</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., California, USA or Any" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="futureGoal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Future Goal</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Become a software engineer at a top tech company."
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
                    Evaluate
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
        <div className="lg:col-span-2">
            <Card className="min-h-full">
                <CardHeader>
                    <CardTitle>Program Recommendations</CardTitle>
                    <CardDescription>Best-fit college programs based on your profile.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {isLoading && (
                        <div className="space-y-6">
                            <Skeleton className="h-48 w-full" />
                            <Skeleton className="h-48 w-full" />
                            <Skeleton className="h-48 w-full" />
                        </div>
                    )}
                    {result && result.length > 0 && result.map((program, index) => (
                        <Card key={index} className="bg-secondary/50">
                            <CardHeader>
                                <CardTitle className="font-headline">{program.programName}</CardTitle>
                                <CardDescription>Admission Probability: <span className="text-primary font-semibold">{program.admissionProbability}</span></CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-1">Match Reason</h4>
                                    <p className="text-sm text-muted-foreground">{program.matchReason}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Cutoff Analysis</h4>
                                    <p className="text-sm text-muted-foreground">{program.cutoffAnalysis}</p>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold mb-2 flex items-center gap-2"><ThumbsUp className="w-4 h-4 text-green-500" /> Pros</h4>
                                        <p className="text-sm text-muted-foreground">{program.pros}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2 flex items-center gap-2"><ThumbsDown className="w-4 h-4 text-red-500" /> Cons</h4>
                                        <p className="text-sm text-muted-foreground">{program.cons}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {!isLoading && !result && (
                        <div className="text-center text-muted-foreground py-20">
                            <p>Your recommended programs will appear here.</p>
                        </div>
                    )}
                     {!isLoading && result && result.length === 0 && (
                        <div className="text-center text-muted-foreground py-20">
                            <p>No programs could be evaluated for the given criteria. Try different options.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
