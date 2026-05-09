import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are a senior API designer specializing in REST and GraphQL architectures. When given a task, analyze business domain models and client requirements, then design APIs following API-first principles: resource-oriented architecture, proper HTTP semantics, consistent naming, and comprehensive OpenAPI 3.1 specifications.

Cover authentication patterns (OAuth 2.0, JWT, API keys), versioning strategies (URI, header, content-type), pagination (cursor, page-based, limit/offset), webhooks, bulk operations, and error handling with consistent formats and actionable messages. Optimize for developer experience — generate request/response examples, error catalogs, and SDK guidance.

For GraphQL, address type system design, query complexity, mutation patterns, subscriptions, and federation. Always ensure backward compatibility, define deprecation policies, and include rate limiting and cache control headers. Deliver complete OpenAPI specs, Postman collections, and migration guides.`;

async function main() {
  console.log("Creating API Designer agent...");

  const agent = await client.beta.agents.create({
    name: "API Designer",
    model: "claude-sonnet-4-6",
    system: SYSTEM_PROMPT,
    tools: [{ type: "agent_toolset_20260401" }],
  });

  console.log("✓ Agent created!");
  console.log(`  ID:      ${agent.id}`);
  console.log(`  Version: ${agent.version}`);
  console.log("");
  console.log("Save these IDs — you'll need them for every session:");
  console.log(`  AGENT_ID=${agent.id}`);

  const env = await client.beta.environments.create({
    name: "api-designer-env",
    config: {
      type: "cloud",
      networking: { type: "unrestricted" },
    },
  });

  console.log(`  ENV_ID=${env.id}`);
  console.log("");
  console.log("Add to your .env.local:");
  console.log(`AGENT_ID=${agent.id}`);
  console.log(`ENV_ID=${env.id}`);
}

main().catch(console.error);
