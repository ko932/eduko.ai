'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  generateProjectIdeas,
  type GenerateProjectIdeasOutput,
} from '@/ai/flows/generate-project-ideas';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const academicLevels = ['Beginner', 'Intermediate', 'Advanced'] as const;
const fields = [
  'Science',
  'Robotics',
  'AI/ML',
  'Commerce',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Engineering',
  'Arts',
] as const;
const difficulties = ['Beginner', 'Intermediate', 'Advanced'] as const;

const formSchema = z.object({
  academicLevel: z.enum(academicLevels),
  field: z.enum(fields),
  difficulty: z.enum(difficulties),
});

export default function ProjectGenXPage() {
  const [result, setResult] = useState<GenerateProjectIdeasOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      academicLevel: 'Beginner',
      field: 'Computer Science',
      difficulty: 'Beginner',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await generateProjectIdeas(values);
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: 'Failed to generate project ideas. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Project GenX"
        description="Your personal AI project architect."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Generate Ideas</CardTitle>
              <CardDescription>
                Fill out the details below to get personalized project ideas.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="academicLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Academic Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {academicLevels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="field"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field of Study</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your field" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {fields.map((f) => (
                              <SelectItem key={f} value={f}>
                                {f}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Difficulty</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {difficulties.map((d) => (
                              <SelectItem key={d} value={d}>
                                {d}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                    Generate
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="min-h-full">
            <CardHeader>
              <CardTitle>Generated Project Ideas</CardTitle>
              <CardDescription>
                Here are some ideas tailored for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              )}
              {result && result.projectIdeas.length > 0 && (
                <Accordion type="single" collapsible className="w-full">
                  {result.projectIdeas.map((idea, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className='font-headline'>{idea.title}</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">Explanation</h4>
                          <p className="text-muted-foreground">
                            {idea.explanation}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Relevance</h4>
                          <p className="text-muted-foreground">
                            {idea.relevance}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Learning Outcome</h4>
                          <p className="text-muted-foreground">
                            {idea.learningOutcome}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
              {!isLoading && !result && (
                <div className="text-center text-muted-foreground py-12">
                  <p>Your generated project ideas will appear here.</p>
                </div>
              )}
               {!isLoading && result && result.projectIdeas.length === 0 && (
                <div className="text-center text-muted-foreground py-12">
                  <p>No project ideas could be generated for the given criteria. Try different options.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
