export const aiAgents = [
  {
    name: "Quant Hedgefund",
    description:
      "Telegram-driven quant hedgefund command center for portfolio requests, alerts, and automated strategy routing.",
    integrations: ["Telegram Trigger", "Command Parser", "Workflow Router"],
    focus: "Trading intelligence & portfolio ops"
  },
  {
    name: "RetroFuture Master Assistant",
    description:
      "Primary AI router that dispatches requests to specialist agents for production, customer, supply chain, and analytics workflows.",
    integrations: ["OpenAI", "Workflow Tooling", "Conversation Memory"],
    focus: "Multi-agent orchestration"
  },
  {
    name: "Artisan Production Agent",
    description:
      "Coordinates handcrafted production workflows, quality checkpoints, and schedule management for complex builds.",
    integrations: ["Airtable", "Google Calendar", "Slack", "Google Drive"],
    focus: "Manufacturing execution"
  },
  {
    name: "Custom Orders Agent",
    description:
      "Creates bespoke orders, configures designs, and syncs customer specifications across operational systems.",
    integrations: ["Order API", "Design Config API", "Airtable", "Gmail"],
    focus: "Order intake & personalization"
  },
  {
    name: "Customer Experience Agent",
    description:
      "Manages support, updates, and care instructions to deliver premium client communications.",
    integrations: ["Gmail", "Google Sheets", "Support API"],
    focus: "Client lifecycle support"
  },
  {
    name: "Order Analytics Agent",
    description:
      "Transforms operational data into dashboards, insights, and performance reports across the business.",
    integrations: ["Analytics API", "Looker", "Google Sheets"],
    focus: "Reporting & KPIs"
  },
  {
    name: "Sales & Design Agent",
    description:
      "Launches new drops, manages campaigns, and schedules consultations for premium clients.",
    integrations: ["Shopify", "Mailchimp", "Calendly", "Launch API"],
    focus: "Growth & go-to-market"
  },
  {
    name: "Supply Chain Agent",
    description:
      "Sources rare components, tracks inventory, and alerts teams to procurement opportunities.",
    integrations: ["Tavily Search", "Inventory API", "Airtable", "Slack"],
    focus: "Sourcing & inventory"
  },
  {
    name: "Workshop Technical Agent",
    description:
      "Maintains equipment diagnostics, logs technical docs, and escalates maintenance tickets.",
    integrations: ["Workshop API", "Jira", "MongoDB", "Slack"],
    focus: "Technical operations"
  }
];
