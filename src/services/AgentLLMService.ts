import { ChatGroq } from "@langchain/groq";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { MongoClient } from "mongodb";
import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export class Agent {
  private agentModel: ChatGroq | ChatGoogleGenerativeAI;
  private agentTools: TavilySearchResults[];
  private checkpointSaver: MongoDBSaver;

  constructor([...tools]) {
    // Initialize GroqChat Model
    this.agentModel = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY, // Default value.
      model: "deepseek-r1-distill-llama-70b",
      maxRetries: 3
    });

    // Initialize Tavily Search Tool
    const tavily_search = new TavilySearchResults({
      maxResults: 3,
      apiKey: process.env.TAVILY_API_KEY
    });

    // Define the tools for the agent to use
    this.agentTools = [tavily_search, ...tools];

    // Initialize persistent memory between graph runs
    const client = new MongoClient(process.env.MONGODB_URL as string);
    const dbName = "llm_messages";
    this.checkpointSaver = new MongoDBSaver({ client, dbName });
  }

  public createAgent() {
    return createReactAgent({
      llm: this.agentModel,
      tools: this.agentTools,
      checkpointSaver: this.checkpointSaver,
    });
  }
}