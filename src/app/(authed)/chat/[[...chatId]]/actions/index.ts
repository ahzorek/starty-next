"use server";

import { ChatGroq } from "@langchain/groq";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { MongoClient } from "mongodb";
import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export type State = {
  success: boolean | null;
  message?: string;
  error?: string;
};

export async function sendMessage(_: State, formData: FormData): Promise<State> {
  try {

    const message = formData.get('message') as string
    const chatId = formData.get('chatId') as string

    //Initialize GroqChat Model
    const agentModel = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY, // Default value.
      model: "deepseek-r1-distill-llama-70b",
      maxRetries: 3
    });

    // const agentModel = new ChatGoogleGenerativeAI({
    //   apiKey: process.env.GOOGLE_GEMINI_KEY
    // });

    // Initialize Tavily Search Tool
    const tavily_search = new TavilySearchResults({
      maxResults: 3,
      apiKey: process.env.TAVILY_API_KEY
    })

    // Define the tools for the agent to use
    const agentTools = [tavily_search];


    // Initialize persistent memory between graph runs
    const client = new MongoClient(process.env.MONGODB_URL as string);
    const dbName = "llm_messages"
    const mongoCheckpointer = new MongoDBSaver({ client, dbName })

    // Initialize agent
    const agent = createReactAgent({
      llm: agentModel,
      tools: agentTools,
      checkpointSaver: mongoCheckpointer,

    });

    const agentResponse = await agent.invoke(
      {
        messages: [new HumanMessage(message)]
      },
      {
        configurable: {
          thread_id: chatId
        }
      },
    );
    const response = agentResponse.messages[agentResponse.messages.length - 1].content

    const invertedAgentMessageList = agentResponse.messages.reverse().filter(m => m.constructor.name !== 'ToolMessage')



    return {
      success: true,
      message: response as string
    };

  } catch (error) {
    console.error("Error in sendMessage:", error);
    return {
      success: false,
      error: "Failed to process message"
    };
  }
}
