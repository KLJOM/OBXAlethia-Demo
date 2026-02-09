import { IncomingMessage, ServerResponse } from "http";

export const handleNativeLLM = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method !== "POST") {
    res.writeHead(405);
    res.end("Method not allowed");
    return;
  }

  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    const payload = body ? JSON.parse(body) : {};
    const prompt = payload.prompt ?? "";
    const response = {
      model: "obxalethia-native-llm",
      response:
        "This is the native LLM placeholder. It returns deterministic guidance and should be wired to your private model runtime.",
      promptSummary: prompt.slice(0, 200),
      nextActions: ["Attach compliance checklist", "Route to capital strategist", "Create container draft"]
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
  });
};
