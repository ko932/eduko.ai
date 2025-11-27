'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  generateFormFillingGuide,
  type GenerateFormFillingGuideOutput,
} from '@/ai/flows/generate-form-filling-guide';
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
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  formType: z.string().min(3, 'Please specify the form type.'),
  studentGradeLevel: z.string().min(2, 'Grade level is required.'),
});

export default function FormCentralPage() {
  const [result, setResult] = useState<GenerateFormFillingGuideOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formType: 'Common Application',
      studentGradeLevel: '12th Grade',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await generateFormFillingGuide(values);
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: 'Failed to generate form guide. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Form Central"
        description="Step-by-step guidance for any academic form."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Form Details</CardTitle>
              <CardDescription>
                Specify the form you need help with.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="formType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Form Type</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., College Application, Scholarship"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="studentGradeLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student Grade Level</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 12th Grade, University"
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
                    Generate Guide
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="min-h-full">
            <CardHeader>
              <CardTitle>Generated Guide</CardTitle>
              <CardDescription>
                Your step-by-step guide to filling out the form.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && <Skeleton className="h-96 w-full" />}
              {result && (
                <div className="prose prose-sm prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap bg-secondary/50 p-4 rounded-lg font-code">
                    {result.guide}
                  </pre>
                </div>
              )}
              {!isLoading && !result && (
                <div className="text-center text-muted-foreground py-20">
                  <p>Your generated form guide will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
