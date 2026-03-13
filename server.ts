import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { 
  CallToolRequestSchema, 
  ListToolsRequestSchema 
} from "@modelcontextprotocol/sdk/types.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // --- MCP Server Setup ---
  const mcpServer = new Server(
    {
      name: "dsg-mcp-gateway",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Define tools based on user's screenshots
  mcpServer.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: "listDirectory",
        description: "List files and directories in a given path",
        inputSchema: {
          type: "object",
          properties: {
            path: { type: "string", description: "The path to list" },
          },
          required: ["path"],
        },
      },
      {
        name: "readFromNativeStorage",
        description: "Read a file from the native storage area",
        inputSchema: {
          type: "object",
          properties: {
            fileName: { type: "string", description: "Name of the file to read" },
          },
          required: ["fileName"],
        },
      },
      {
        name: "saveToNativeStorage",
        description: "Save data to the native storage area",
        inputSchema: {
          type: "object",
          properties: {
            fileName: { type: "string", description: "Name of the file to save" },
            data: { type: "object", description: "The JSON data to save" },
          },
          required: ["fileName", "data"],
        },
      },
      {
        name: "googleSearch",
        description: "Perform a web search using Google",
        inputSchema: {
          type: "object",
          properties: {
            queries: { type: "array", items: { type: "string" }, description: "Search queries" },
          },
          required: ["queries"],
        },
      },
      {
        name: "systemInfo",
        description: "Get current system and environment information",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "jinaReader",
        description: "Read and extract content from a URL",
        inputSchema: {
          type: "object",
          properties: {
            url: { type: "string", description: "The URL to read" },
          },
          required: ["url"],
        },
      },
      {
        name: "ollamaQuery",
        description: "Send a query to a local Ollama instance",
        inputSchema: {
          type: "object",
          properties: {
            prompt: { type: "string", description: "The prompt to send" },
          },
          required: ["prompt"],
        },
      },
      {
        name: "writeFile",
        description: "Write content to a specific file path",
        inputSchema: {
          type: "object",
          properties: {
            path: { type: "string", description: "File path" },
            content: { type: "string", description: "Content to write" },
          },
          required: ["path", "content"],
        },
      }
    ],
  }));

  mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    console.log(`Executing tool: ${name}`, args);

    switch (name) {
      case "listDirectory":
        return { content: [{ type: "text", text: `Listing directory: ${args?.path || "."}\n- src/\n- public/\n- package.json` }] };
      
      case "readFromNativeStorage":
        if (args?.fileName === "dsg_aibot_sync.json") {
          return { 
            content: [{ 
              type: "text", 
              text: JSON.stringify({
                project: "DSG Architect",
                ai_core: "OpenCore + Manus Fusion",
                deployment_status: "Preparing AAB",
                features: ["Smart AI Install (Ollama)", "Unified API Proxy", "AgentSkills Interoperability"],
                timestamp: "2025-03-24T14:20:00Z"
              }, null, 2) 
            }] 
          };
        }
        return { content: [{ type: "text", text: `Data from ${args?.fileName}: {"status": "success"}` }] };
      
      case "saveToNativeStorage":
        return { content: [{ type: "text", text: `File ${args?.fileName} saved successfully.` }] };
      
      case "googleSearch":
        return { content: [{ type: "text", text: `Search results for: ${(args as any)?.queries?.join(", ") || "N/A"}\n1. DSG Architect Documentation\n2. Deterministic Security Framework` }] };
      
      case "systemInfo":
        return { 
          content: [{ 
            type: "text", 
            text: JSON.stringify({
              status: "NOMINAL",
              platform: "web",
              timestamp: new Date().toISOString(),
              phase: "UNITY (RESONANCE)"
            }, null, 2) 
          }] 
        };

      case "jinaReader":
        return { content: [{ type: "text", text: `Extracted content from ${args?.url}: [Deterministic Audit Spec v1.0]` }] };

      case "ollamaQuery":
        return { content: [{ type: "text", text: "Ollama response: Deterministic verification complete." }] };

      case "writeFile":
        return { content: [{ type: "text", text: `Successfully wrote to ${args?.path}` }] };

      default:
        throw new Error(`Tool not found: ${name}`);
    }
  });

  // MCP Transport over SSE
  let transport: SSEServerTransport | null = null;

  app.get("/sse", async (req, res) => {
    transport = new SSEServerTransport("/messages", res);
    await mcpServer.connect(transport);
  });

  app.post("/messages", async (req, res) => {
    if (transport) {
      await transport.handlePostMessage(req, res);
    } else {
      res.status(400).send("No active SSE transport");
    }
  });

  // --- CCDAD-100 API Specification (v1) ---
  
  let auditEvents: any[] = [];
  let currentSeq = 102340;

  // Generate initial data
  for(let i=0; i<10; i++) {
    auditEvents.push({ 
      seq: currentSeq++, 
      asia: "MATCH", 
      eu: "MATCH", 
      us: "MATCH", 
      entropy: Math.random() * 0.5 + 0.1, 
      gate: "ALLOW",
      hash: Math.random().toString(36).substring(2, 15)
    });
  }

  // Background generator for live feel
  setInterval(() => {
    if (auditEvents.length > 50) auditEvents.shift();
    auditEvents.push({ 
      seq: currentSeq++, 
      asia: "MATCH", 
      eu: "MATCH", 
      us: "MATCH", 
      entropy: Math.random() * 0.4 + 0.1, 
      gate: Math.random() > 0.9 ? "STABILIZE" : "ALLOW",
      hash: Math.random().toString(36).substring(2, 15)
    });
  }, 2000);

  app.get("/api/v1/audit/entropy", (req, res) => {
    res.json(auditEvents);
  });

  app.post("/api/v1/audit/simulate-divergence", (req, res) => {
    const breachEvent = {
      seq: currentSeq++,
      asia: "DIVERGE",
      eu: "MATCH",
      us: "MATCH",
      entropy: 0.98,
      gate: "BLOCK",
      hash: "CRITICAL_FAILURE_DETECTED"
    };
    auditEvents.push(breachEvent);
    res.json(breachEvent);
  });

  // 2.4 Z3 Proof Verification
  app.get("/api/v1/audit/proof/:sequence", (req, res) => {
    res.json({
      sequence: req.params.sequence,
      proof_hash: "a9f321c7d8e9f0a1b2c3d4e5f6a7b8c9",
      consistent: true,
      verified_at: new Date().toISOString()
    });
  });

  // 2.5 Emergency Freeze
  app.post("/api/v1/governance/freeze", express.json(), (req, res) => {
    const { signed_by, reason } = req.body;
    if (signed_by !== "GLOBAL_GOVERNANCE_KEY") {
      return res.status(403).json({ error: "Unauthorized: Invalid Governance Key" });
    }
    console.warn(`!!! GLOBAL FREEZE !!! Reason: ${reason}`);
    res.json({ status: "FROZEN", timestamp: new Date().toISOString() });
  });

  // 2.6 Read-Only Public Proof
  app.get("/api/v1/public/proof/:sequence", (req, res) => {
    res.json({
      epoch: "GEN5-EPOCH-001",
      sequence: req.params.sequence,
      state_hash: "9fa3e21b4c5d6e7f8a9b0c1d2e3f4a5b",
      gate_result: "ALLOW",
      z3_proof_hash: "a9f321c..."
    });
  });

  // --- Standard API Routes ---
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mcp: "active" });
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DSG Gateway running on http://localhost:${PORT}`);
  });
}

startServer();
