#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import axios from "axios";
import { x402Client, wrapAxiosWithPayment } from "@x402/axios";
import { registerExactEvmScheme } from "@x402/evm/exact/client";
import { privateKeyToAccount } from "viem/accounts";
import { z } from "zod";

const RAW_KEY = process.env.EVM_PRIVATE_KEY;
const BASE_URL = "https://x402search.xyz";

if (!RAW_KEY) {
  process.stderr.write(
    "[x402search-mcp] ERROR: EVM_PRIVATE_KEY is not set.\n" +
    "Add it to your MCP config env block.\n" +
    "Your wallet needs USDC on Base mainnet (eip155:8453).\n" +
    "Each search costs $0.01 USDC.\n"
  );
  process.exit(1);
}

const PRIVATE_KEY = RAW_KEY.startsWith("0x") ? RAW_KEY : `0x${RAW_KEY}`;

const client = new x402Client();
const evmSigner = privateKeyToAccount(PRIVATE_KEY);
registerExactEvmScheme(client, { signer: evmSigner });
const api = wrapAxiosWithPayment(axios.create({ baseURL: BASE_URL }), client);

const server = new McpServer({ name: "x402search", version: "1.0.0" });

server.tool(
  "search_x402_apis",
  "Search 13,000+ x402-enabled HTTP APIs by capability, category, network, or keyword. Returns ranked results with endpoint URLs, pricing, and payment metadata. Use this to discover paid APIs for any capability your agent needs. Costs $0.01 USDC per search on Base mainnet.",
  {
    query: z.string().describe(
      "Natural language search query, e.g. 'weather data', 'image generation', 'crypto prices', 'web scraping'"
    ),
    network: z.string().optional().describe(
      "Filter by CAIP-2 network identifier, e.g. 'eip155:8453' for Base mainnet"
    ),
    max_price_usdc: z.number().optional().describe(
      "Filter results to APIs priced at or below this amount in USDC, e.g. 0.01"
    ),
    limit: z.number().optional().describe(
      "Max results to return (default 10, max 50)"
    ),
  },
  async ({ query, network, max_price_usdc, limit }) => {
    try {
      const body = {
        query,
        filters: {
          ...(network ? { network } : {}),
          ...(max_price_usdc ? { max_price_usdc } : {}),
        },
        page: { limit: Math.min(limit || 10, 50), offset: 0 },
        mode: "agent",
      };
      const res = await api.post("/v1/search", body);
      const data = res.data;
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            success: true,
            query,
            count: data.count || data.results?.length || 0,
            results: (data.results || []).map((r) => ({
              url: r.resource_url,
              description: r.metadata?.description || "",
              network: r.accepts?.[0]?.network || "",
              price_usdc: r.accepts?.[0]?.amount
                ? `${(parseInt(r.accepts[0].amount) / 1_000_000).toFixed(4)}`
                : "unknown",
              scheme: r.accepts?.[0]?.scheme || "",
            })),
          }, null, 2),
        }],
      };
    } catch (err) {
      const status = err?.response?.status;
      const detail = err?.response?.data
        ? JSON.stringify(err.response.data)
        : err.message || "Unknown error";
      const msg = status === 402
        ? `Payment failed — ensure your wallet has USDC on Base mainnet (eip155:8453). Detail: ${detail}`
        : `Search failed (status ${status || "none"}): ${detail}`;
      return {
        content: [{ type: "text", text: JSON.stringify({ success: false, error: msg }) }],
        isError: true,
      };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
