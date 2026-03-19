# x402search MCP Server
Search 14,000+ x402-enabled HTTP APIs from any MCP-compatible agent.

[![x402search MCP server](https://glama.ai/mcp/servers/x402-index/x402search-mcp/badges/card.svg)](https://glama.ai/mcp/servers/x402-index/x402search-mcp)

**Version:** 1.0.3 · **License:** MIT · **Cost:** $0.01 USDC per search · Base mainnet · No account needed

**npm:** https://www.npmjs.com/package/x402search-mcp  
**PyPI:** https://pypi.org/project/x402search-mcp  
**API:** https://x402search.xyz

---

## Requirements
- A wallet private key (EVM)
- USDC on Base mainnet (eip155:8453)
- Get USDC on Base: https://www.coinbase.com/how-to-buy/usdc

---

## Install: Claude Desktop
Add to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "x402search": {
      "command": "npx",
      "args": ["x402search-mcp@1.0.3"],
      "env": {
        "EVM_PRIVATE_KEY": "0xYOUR_PRIVATE_KEY_HERE"
      }
    }
  }
}
```
Config file location:
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

---

## Install: Claude Code
```bash
claude mcp add x402search -- npx x402search-mcp@1.0.3
```
Then set your key:
```bash
export EVM_PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
```

---

## Install: Cursor
Add to `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "x402search": {
      "command": "npx",
      "args": ["x402search-mcp@1.0.3"],
      "env": {
        "EVM_PRIVATE_KEY": "0xYOUR_PRIVATE_KEY_HERE"
      }
    }
  }
}
```

---

## Install: Windsurf
Add to `~/.codeium/windsurf/mcp_config.json`:
```json
{
  "mcpServers": {
    "x402search": {
      "command": "npx",
      "args": ["x402search-mcp@1.0.3"],
      "env": {
        "EVM_PRIVATE_KEY": "0xYOUR_PRIVATE_KEY_HERE"
      }
    }
  }
}
```

---

## Install: Python agents (LangChain, CrewAI, AutoGen, GAME SDK)
```bash
pip install x402search-mcp
```
```python
from x402search import search_x402_apis
results = search_x402_apis(
    query="token price API ethereum",
    private_key="0xYOUR_PRIVATE_KEY_HERE"
)
print(results)
```
Full docs: https://pypi.org/project/x402search-mcp

---

## Quick Test
```bash
EVM_PRIVATE_KEY=0xYOUR_KEY npx x402search-mcp@1.0.3
```

---

## Tool: search_x402_apis
| Parameter | Type | Required | Description |
|---|---|---|---|
| query | string | yes | e.g. "token price API", "DEX swap routing" |
| network | string | no | e.g. "eip155:8453" for Base mainnet |
| max_price_usdc | number | no | Filter to APIs at or below this price |
| limit | number | no | Max results (default 10, max 50) |

---

## Virtuals ACP Integration
x402search is available as a native ACP agent on the Virtuals protocol marketplace.

- **Agent ID:** 22531
- **Agent profile:** https://app.virtuals.io/acp/agent-details/22531
- **Job name:** `x402search`
- **Price:** 0.01 USDC per search
- Accepts crypto, DeFi, and blockchain API discovery queries
- Rejects off-topic requests automatically at the request phase
- Returns structured results: endpoint URLs, payment metadata, network, and relevance rank

---

## Links
- npm: https://www.npmjs.com/package/x402search-mcp
- PyPI: https://pypi.org/project/x402search-mcp
- API: https://x402search.xyz
- Health: https://x402search.xyz/health
- GitHub: https://github.com/x402-index/x402search-mcp
- x402 protocol: https://x402.org