import { OpenAI } from "openai";
import personaPrompt from "@/prompts/hassan";

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

interface ChatMessage {
  content: string;
  sender: "user" | "bot";
}

export async function POST(req: Request) {
   try {
     
     const {message, conversationHistory = []} = await req.json();
     
     const historyMessages = conversationHistory.map((msg: ChatMessage) => ({
       role: msg.sender === "user" ? "user" : "assistant",
       content: msg.content,
     }));
 
     const messages = [
       { role: "system", content: personaPrompt },
       ...historyMessages,
       { role: "user", content: message },
     ];
      const response = await client.chat.completions.create({
       model: "gemini-2.5-flash",
       messages,
     });

     let reply = response.choices[0]?.message?.content || "No response";
    reply = reply
      // Remove bold/italic markdown
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/_+/g, "")
      // Fix multiple spaces
      .replace(/\s{2,}/g, " ")
      // Remove extra blank lines
      .replace(/\n\s*\n/g, "\n")
      .trim();
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
   } catch (error) {
     console.error("Chat API error:", error);
    return new Response("Error processing chat request", { status: 500 });
   }
}