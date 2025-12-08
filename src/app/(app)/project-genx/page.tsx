
'use client';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  generateProjectIdeas,
  type GenerateProjectIdeasInput,
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
  FormDescription,
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
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import { Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const educationTypes = [
  'Engineering (BTech/BE)',
  'Diploma (Polytechnic)',
  'Junior College (11th/12th Science)',
  'Degree College (BSc, BCA, BA, etc.)',
  'ITI',
  'School (8th–10th)',
] as const;

const engineeringBranches = [
  'Computer Engineering',
  'IT Engineering',
  'Electronics & Telecommunication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Robotics & Automation',
  'AI & Data Science',
  'Mechatronics',
  'Chemical Engineering',
] as const;

const interests = {
  Hardware: [
    'IoT',
    'Robotics',
    'Drone Tech',
    'Embedded Systems',
    'Sensors & Actuators',
    'PCB & Electronics',
    '3D Printing',
    'Automotive / EV Systems',
  ],
  Software: [
    'Web Development',
    'App Development',
    'AI/ML',
    'Data Science',
    'Cloud Computing',
    'Cybersecurity',
    'Blockchain',
    'AR/VR',
    'Game Development',
    'UI/UX',
    'Automation Scripts',
  ],
  'Industry Themes': [
    'Healthcare',
    'Education',
    'FinTech',
    'Agriculture',
    'Sustainability',
    'Smart City',
    'Entertainment',
  ],
};

const backgroundSchema = z.object({
  educationType: z.enum(educationTypes),
  branch: z.string().optional(),
  interests: z.array(z.string()).min(1, 'Please select at least one interest.'),
});

const ideaSchema = z.object({
  projectIdea: z.string().min(10, 'Please describe your project idea.'),
});

type BackgroundValues = z.infer<typeof backgroundSchema>;
type IdeaValues = z.infer<typeof ideaSchema>;

export default function ProjectGenXPage() {
  const [step, setStep] = useState(1);
  const [backgroundData, setBackgroundData] = useState<BackgroundValues | null>(null);
  const [result, setResult] = useState<GenerateProjectIdeasOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const backgroundForm = useForm<BackgroundValues>({
    resolver: zodResolver(backgroundSchema),
    defaultValues: {
      educationType: 'Engineering (BTech/BE)',
      interests: [],
    },
  });

  const ideaForm = useForm<IdeaValues>({
    resolver: zodResolver(ideaSchema),
    defaultValues: {
      projectIdea: 'Smart Energy Meter Monitoring System (IoT + App + Cloud)',
    },
  });

  const educationType = backgroundForm.watch('educationType');

  function handleBackgroundSubmit(values: BackgroundValues) {
    setBackgroundData(values);
    setStep(2);
  }

  async function handleIdeaSubmit(values: IdeaValues) {
    if (!backgroundData) return;
    setIsLoading(true);
    setResult(null);
    setStep(3);

    const input: GenerateProjectIdeasInput = {
      ...backgroundData,
      projectIdea: values.projectIdea,
      branch: backgroundData.branch || '',
    };

    try {
      const response = await generateProjectIdeas(input);
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: 'Failed to generate project roadmap. Please try again.',
      });
      setStep(2); // Go back to idea step on error
    } finally {
      setIsLoading(false);
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div key="step1" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
            <Card>
              <CardHeader>
                <CardTitle>Tell us about your background</CardTitle>
                <CardDescription>This helps us tailor the project roadmap for you.</CardDescription>
              </CardHeader>
              <Form {...backgroundForm}>
                <form onSubmit={backgroundForm.handleSubmit(handleBackgroundSubmit)}>
                  <CardContent className="space-y-6">
                    <FormField
                      control={backgroundForm.control}
                      name="educationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Education Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select your education level" /></SelectTrigger></FormControl>
                            <SelectContent>{educationTypes.map((level) => (<SelectItem key={level} value={level}>{level}</SelectItem>))}</SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {(educationType === 'Engineering (BTech/BE)' || educationType === 'Diploma (Polytechnic)') && (
                      <FormField
                        control={backgroundForm.control}
                        name="branch"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Engineering / Diploma Branch</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Select your branch" /></SelectTrigger></FormControl>
                              <SelectContent>{engineeringBranches.map((branch) => (<SelectItem key={branch} value={branch}>{branch}</SelectItem>))}</SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      control={backgroundForm.control}
                      name="interests"
                      render={() => (
                        <FormItem>
                          <FormLabel>Interests</FormLabel>
                          <FormDescription>Select multiple topics that you are interested in.</FormDescription>
                          <div className="space-y-4">
                            {Object.entries(interests).map(([category, items]) => (
                              <div key={category}>
                                <h4 className="font-medium text-sm mb-2">{category}</h4>
                                <div className="flex flex-wrap gap-2">
                                  {items.map((item) => (
                                    <FormField
                                      key={item}
                                      control={backgroundForm.control}
                                      name="interests"
                                      render={({ field }) => (
                                        <Toggle
                                          variant="outline"
                                          size="sm"
                                          pressed={field.value?.includes(item)}
                                          onPressedChange={(pressed) => {
                                            const currentInterests = field.value || [];
                                            return pressed
                                              ? field.onChange([...currentInterests, item])
                                              : field.onChange(currentInterests.filter((value) => value !== item));
                                          }}
                                        >{item}</Toggle>
                                      )}
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full">Next</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </motion.div>
        );
      case 2:
        return (
           <motion.div key="step2" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
            <Card>
              <CardHeader>
                <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="self-start px-2 mb-2">← Back</Button>
                <CardTitle>What project do you want to build?</CardTitle>
                <CardDescription>Describe your idea, and we'll generate a full roadmap.</CardDescription>
              </CardHeader>
              <Form {...ideaForm}>
                <form onSubmit={ideaForm.handleSubmit(handleIdeaSubmit)}>
                  <CardContent>
                    <FormField
                      control={ideaForm.control}
                      name="projectIdea"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Idea</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Smart Attendance System using Face Recognition" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Generate Full Process
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
           </motion.div>
        );
      case 3:
        return (
          <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-3">
             <Card>
                <CardHeader>
                    <Button variant="ghost" size="sm" onClick={() => setStep(2)} className="self-start px-2 mb-2">← Back to Idea</Button>
                    <CardTitle>Your Project Roadmap</CardTitle>
                    <CardDescription>{ideaForm.getValues('projectIdea')}</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center gap-4 py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-muted-foreground">Generating your project blueprint...</p>
                        </div>
                    )}
                    {result && (
                        <div className="space-y-6">
                            <Card className="bg-secondary/50">
                                <CardHeader><CardTitle className="text-lg font-headline">Project Summary</CardTitle></CardHeader>
                                <CardContent><p className="text-sm text-muted-foreground">{result.summary}</p></CardContent>
                            </Card>

                            <Accordion type="single" collapsible defaultValue="item-1">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="font-headline text-lg">Required Skills</AccordionTrigger>
                                    <AccordionContent>
                                      <div className="flex flex-wrap gap-2">
                                        {result.requiredSkills.map(skill => (
                                          <div key={skill} className="bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-1 rounded-full">{skill}</div>
                                        ))}
                                      </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="font-headline text-lg">Hardware Requirements</AccordionTrigger>
                                    <AccordionContent>
                                      <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1">
                                        {result.hardwareRequirements.map(item => <li key={item}>{item}</li>)}
                                      </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="font-headline text-lg">Software Requirements</AccordionTrigger>
                                    <AccordionContent>
                                       <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1">
                                        {result.softwareRequirements.map(item => <li key={item}>{item}</li>)}
                                      </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                 <AccordionItem value="item-4">
                                    <AccordionTrigger className="font-headline text-lg">Step-by-Step Build Plan</AccordionTrigger>
                                    <AccordionContent>
                                      <ol className="list-decimal pl-5 text-muted-foreground text-sm space-y-2">
                                        {result.buildPlan.map((step, index) => <li key={index}>{step}</li>)}
                                      </ol>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-5">
                                    <AccordionTrigger className="font-headline text-lg">Architecture Diagram</AccordionTrigger>
                                    <AccordionContent>
                                       <pre className="whitespace-pre-wrap bg-background/50 p-4 rounded-lg font-code text-sm">{result.architectureDiagram}</pre>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                             <CardFooter className="flex-col sm:flex-row gap-2 pt-6">
                                <Button className="w-full sm:w-auto">Generate Full Report</Button>
                                <Button className="w-full sm:w-auto">Generate PPT</Button>
                                <Button className="w-full sm:w-auto">Generate Video Script</Button>
                             </CardFooter>
                        </div>
                    )}
                </CardContent>
            </Card>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <PageHeader
        title="Project GenX"
        description="Your personal AI project architect."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={step === 3 ? "lg:col-span-3" : "lg:col-span-2 lg:col-start-2"}>
             <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </div>
      </div>
    </>
  );
}
