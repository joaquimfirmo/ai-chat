import { config } from "dotenv";
config();

import { ChatOllama } from "@langchain/ollama";

export const ollama = new ChatOllama({
    baseUrl: process.env.baseLLMUrl || "http://localhost:11434",
    model: process.env.baseLLMModel || "llama3.2",
    temperature: parseFloat(process.env.baseLLMTemperature) || 0.7,
    maxTokens: parseInt(process.env.baseLLMMaxTokens) || 2048,
});