#/bin/sh
mkdir -p ./logs && chmod 777 logs
docker run --rm -p 9119:9119 -v "$(pwd)/../synergy-mcp.example.json:/config/synergy-mcp.json:ro" -v "$(pwd)/../logs:/opt/synergy/logs" synergy-design-system/mcp:local
