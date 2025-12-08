import { tutorChat, TutorChatInputSchema } from '@/ai/flows/tutor-chat';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate the request body against the Zod schema
    const validation = TutorChatInputSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid request body", details: validation.error.flatten() }, { status: 400 });
    }

    const result = await tutorChat(validation.data);
    return NextResponse.json(result);

  } catch (e: any) {
    console.error('API Error in /api/tutor:', e);
    return NextResponse.json({ error: e.message || 'An unexpected error occurred.' }, { status: 500 });
  }
}
