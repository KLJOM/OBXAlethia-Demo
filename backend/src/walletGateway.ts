import type { IncomingMessage, ServerResponse } from "http";

export async function walletGateway(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const publicKey = req.headers["x-wallet-pubkey"];
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "ok", publicKey }));
}
