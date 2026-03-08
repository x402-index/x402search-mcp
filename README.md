# x402search MCP Server

Search 13,000+ x402-enabled HTTP APIs from any MCP-compatible agent.

**Version:** 1.0.1 · **License:** MIT · **Cost:** $0.01 USDC per search · Base mainnet · No account needed

**npm:** https://www.npmjs.com/package/x402search-mcp

## Requirements

- A wallet private key
- USDC on Base mainnet (eip155:8453)
- Get USDC on Base: https://www.coinbase.com/how-to-buy/usdc

## Install: Claude Desktop / Claude Code

Add to your claude_desktop_config.json:

  "mcpServers": {
    "x402search": {
      "command": "npx",
      "args": ["x402search-mcp@1.0.1"],
      "env": {
        "EVM_PRIVATE_KEY": "0xYOUR_PRIVATE_KEY_HERE"
      }
    }
  }

## Install: Cursor

Add to your .cursor/mcp.json — same config block as above.

## Install: Windsurf

Add to your Windsurf MCP config — same config block as above.

## Quick Test (no config needed)

  npx x402search-mcp@1.0.1

## Tool: search_x402_apis

Parameters:
- query (string, required): e.g. "weather data", "image generation"
- network (string, optional): e.g. "eip155:8453" for Base mainnet
- max_price_usdc (number, optional): e.g. 0.01 to filter by price
- limit (number, optional): max results, default 10, max 50

## Links

- https://www.npmjs.com/package/x402search-mcp
- https://x402search.xyz
- https://x402search.xyz/health
- https://x402.org
