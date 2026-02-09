import { IncomingMessage, ServerResponse } from "http";

const agentRegistry = [
  {
    id: "capital-strategist",
    name: "Capital Strategist",
    status: "online",
    specialization: "PE + DeFi structuring",
    runbook: ["Risk score", "Capital stack", "Covenant design"]
  },
  {
    id: "risk-sentinel",
    name: "Risk Sentinel",
    status: "online",
    specialization: "Compliance + fraud detection",
    runbook: ["KYC/AML checks", "Fraud scoring", "Audit trail"]
  },
  {
    id: "settlement-orchestrator",
    name: "Settlement Orchestrator",
    status: "online",
    specialization: "Escrow + settlement",
    runbook: ["Milestone escrow", "Multi-sig approvals", "Cross-chain settlement"]
  }
];

export const handleAgents = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ agents: agentRegistry }));
    return;
  }

  if (req.method === "POST" && req.url?.endsWith("/dispatch")) {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const payload = body ? JSON.parse(body) : {};
      const agent = agentRegistry[0];
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          assigned: agent,
          context: payload,
          status: "online"
        })
      );
    });
    return;
  }

  res.writeHead(405);
  res.end("Method not allowed");
};
