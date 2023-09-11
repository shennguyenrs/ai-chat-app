import { functions, runFunction } from "@/lib/functions";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const initialRes = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k-0613",
    messages,
    functions,
    function_call: "auto",
  });

  const initialResJson = await initialRes.json();
  const initialResMessage = initialResJson.choices[0].message;
  let finalRes;

  if (initialResMessage.function_call) {
    const { name, arguments: args } = initialResMessage.function_call; // Cannot named variable as 'arguments'
    const functionRes = await runFunction(name, args);

    const finalMessages = [
      ...messages,
      initialResMessage,
      {
        role: "function",
        name: initialResMessage.function_call.name,
        content: JSON.stringify(functionRes),
      },
    ];

    finalRes = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-16k-0613",
      stream: true,
      messages: finalMessages,
    });

    const stream = OpenAIStream(finalRes);
    return new StreamingTextResponse(stream);
  } else {
    // if there's no function call, just return the initial response
    // but first, we gotta convert initialResponse into a stream with ReadableStream
    const chunks = initialResMessage.content.split(" ");
    const stream = new ReadableStream({
      async start(controller) {
        for (const chunk of chunks) {
          const bytes = new TextEncoder().encode(chunk + " ");
          controller.enqueue(bytes);
          await new Promise((r) =>
            setTimeout(
              r,
              // get a random number between 10ms and 30ms to simulate a random delay
              Math.floor(Math.random() * 20 + 10)
            )
          );
        }
        controller.close();
      },
    });

    return new StreamingTextResponse(stream);
  }
}
