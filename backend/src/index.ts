import { createServer } from "http";
import { walletGateway } from "./walletGateway";
import { handleContracts } from "./services/contracts";
import { handleContainers } from "./services/containers";
import { handleAgents } from "./services/agents";
import { handleNativeLLM } from "./services/nativeLLM";

const server = createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400);
    res.end("Missing URL");
    return;
  }

  if (req.url.startsWith("/wallet")) {
    await walletGateway(req, res);
    return;
  }

  if (req.url.startsWith("/contracts")) {
    await handleContracts(req, res);
    return;
  }

  if (req.url.startsWith("/containers")) {
    await handleContainers(req, res);
    return;
  }

  if (req.url.startsWith("/agents")) {
    await handleAgents(req, res);
    return;
  }

  if (req.url.startsWith("/llm")) {
    await handleNativeLLM(req, res);
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(4000, () => {
  console.log("Backend listening on :4000");
});
