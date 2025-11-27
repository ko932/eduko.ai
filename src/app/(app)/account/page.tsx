'use client';
import type { ComponentProps } from 'react';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { BookOpen, BrainCircuit, CheckCircle, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const chartData = [
  { month: 'January', lessons: 18, courses: 5 },
  { month: 'February', lessons: 22, courses: 7 },
  { month: 'March', lessons: 34, courses: 9 },
  { month: 'April', lessons: 45, courses: 12 },
  { month: 'May', lessons: 38, courses: 11 },
  { month: 'June', lessons: 50, courses: 15 },
];

const chartConfig = {
  lessons: {
    label: 'Lessons Completed',
    color: 'hsl(var(--primary))',
  },
  courses: {
    label: 'Courses Finished',
    color: 'hsl(var(--secondary))',
  },
} satisfies ComponentProps<typeof BarChart>['data'];

export default function DashboardPage() {
    const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar-1');
  return (
    <>
      <PageHeader title="Dashboard" description="Welcome back, Student!" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profile Overview</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
             <Avatar className="h-20 w-20">
                <AvatarImage src={userAvatar?.imageUrl} alt="User avatar" data-ai-hint={userAvatar?.imageHint} />
                <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <div>
                <h3 className="text-lg font-bold">Student</h3>
                <p className="text-sm text-muted-foreground">student@eduko.ai</p>
                <Badge variant="secondary" className="mt-2">Free Plan</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity Analytics</CardTitle>
            <CardDescription>Your progress over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <BarChart data={chartData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="lessons" fill="var(--color-lessons)" radius={4} />
                <Bar dataKey="courses" fill="var(--color-courses)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Badge System</CardTitle>
                <CardDescription>Your achievements and milestones.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-accent/50">
                    <Star className="w-10 h-10 text-yellow-400" />
                    <span className="text-sm font-medium">First Steps</span>
                    <span className="text-xs text-muted-foreground">Completed 1st lesson</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-accent/50">
                    <BookOpen className="w-10 h-10 text-blue-400" />
                    <span className="text-sm font-medium">Bookworm</span>
                    <span className="text-xs text-muted-foreground">Finished a course</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-accent/50">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                    <span className="text-sm font-medium">Quiz Master</span>
                    <span className="text-xs text-muted-foreground">Aced 5 quizzes</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-accent/50">
                    <BrainCircuit className="w-10 h-10 text-purple-400" />
                    <span className="text-sm font-medium">AI Collaborator</span>
                    <span className="text-xs text-muted-foreground">Used an AI tool</span>
                </div>
            </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>The Vault</CardTitle>
                <CardDescription>Your saved items for quick access.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">You haven't saved any items yet.</p>
            </CardContent>
        </Card>

      </div>
    </>
  );
}
