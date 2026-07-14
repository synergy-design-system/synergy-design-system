#!/bin/sh
set -eu

PORT_VALUE="${PORT:-9119}"
CONFIG_PATH="${MCP_CONFIG_PATH:-/config/synergy-mcp.json}"

if [ -f "$CONFIG_PATH" ]; then
  exec syn-mcp --interface http --host 0.0.0.0 --port "$PORT_VALUE" --config "$CONFIG_PATH" "$@"
fi

exec syn-mcp --interface http --host 0.0.0.0 --port "$PORT_VALUE" "$@"
