import type { IncomingMessage, ServerResponse } from "http";

export async function handleContainers(_req: IncomingMessage, res: ServerResponse): Promise<void> {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "containers-ok" }));
}
