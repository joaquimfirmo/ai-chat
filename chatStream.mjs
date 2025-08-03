import { ollama } from "./llm.mjs";

export async function chatStream(userQuestion, onChunk) {
  const messages = [
    {
      role: "system",
      content:
        "Você é um assistente de IA gentil e prestativo que ajuda os usuários a encontrar informações e responder perguntas.",
    },

    {
      role: "user",
      content: userQuestion,
    },
  ];

  try {
    console.log("🤖 Assistente AI pensando...\n");

    const stream = await ollama.stream(messages);

    let fullResponse = "";
    for await (const chunk of stream) {
      const content = chunk.content || "";
      fullResponse += content;

      if (onChunk) {
        onChunk(content);
      }
    }

    return fullResponse;
  } catch (error) {
    console.error("Error:", error);
    return "Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.";
  }
}
