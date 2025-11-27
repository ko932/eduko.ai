'use server';

/**
 * @fileOverview A conversational AI agent that can adopt different personas.
 *
 * - conversationalChat - A function that handles the chat conversation.
 * - ConversationalChatInput - The input type for the conversationalChat function.
 * - ConversationalChatOutput - The return type for the conversationalChat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ConversationalChatInputSchema = z.object({
  persona: z.string().describe('The persona the AI should adopt for the conversation (e.g., "a witty and slightly impatient AI assistant").'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({
        text: z.string()
    }))
  })).describe('The conversation history.'),
  message: z.string().describe('The latest user message.'),
});
export type ConversationalChatInput = z.infer<typeof ConversationalChatInputSchema>;

const ConversationalChatOutputSchema = z.object({
  reply: z.string().describe('The AI\'s response to the user.'),
});
export type ConversationalChatOutput = z.infer<typeof ConversationalChatOutputSchema>;


export async function conversationalChat(input: ConversationalChatInput): Promise<ConversationalChatOutput> {
  const { persona, history, message } = input;

  const { text } = await ai.generate({
    prompt: message,
    history: history,
    config: {
        // Use a tool for this later
        systemInstruction: `You are an AI assistant. You must adopt the following persona: ${persona}. Your responses should be concise, witty, and directly answer the user's question. Do not be overly verbose.`
    }
  });

  return { reply: text };
}
