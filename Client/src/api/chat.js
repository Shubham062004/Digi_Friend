import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function chatAPI(messages) {
  const result = await streamText({
    model: openai('gpt-4-turbo'),
    messages,
  });
  return result;
}

