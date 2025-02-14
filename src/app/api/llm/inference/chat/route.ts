import { openai } from '@ai-sdk/openai';
import { ChatGroq } from '@langchain/groq';
import { LangChainAdapter, streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY, // Default value.
    model: "deepseek-r1-distill-llama-70b",
    maxRetries: 3
  });

  const stream = await model.stream(prompt);

  return LangChainAdapter.toDataStreamResponse(stream);
}