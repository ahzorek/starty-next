"use server";

import { HumanMessage } from "@langchain/core/messages";
import { chatValidator } from "@/validators/llm/chat.validator";
import { Agent } from "@/services/AgentLLMService";

type TFields = {
  humanMessage: string;
  id: string;
}

export type State = {
  success: boolean | null;
  message?: string;
  error?: string;
  fields?: TFields
  messageObject?: unknown
};

export async function sendMessage(_: State, formData: FormData): Promise<State> {
  try {
    const dataObject = Object.fromEntries(formData)
    const parsed = chatValidator.safeParse(dataObject);

    if (!parsed.success) {
      throw new Error(`Invalid input: ${parsed.error.issues.map(i => i.message).join(', ')}`);
    }

    const { humanMessage, id: chatId } = parsed.data;

    const agent = new Agent([]).createAgent()

    const conversationChain =
      await agent.invoke({ messages: [new HumanMessage(humanMessage)] }, { configurable: { thread_id: chatId } },);

    const response = conversationChain.messages[conversationChain.messages.length - 1].content;

    return {
      success: true,
      message: response as string,
    };

  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
