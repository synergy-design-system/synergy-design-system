#!/bin/sh
set -eu

usage() {
  echo "Usage: $0 <path-to-ca.crt> [image-tag]" >&2
  echo "Example: $0 /path/to/custom/ca.crt synergy-design-system/mcp:local" >&2
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Error: required command '$1' was not found in PATH." >&2
    exit 1
  fi
}

if [ "$#" -lt 1 ] || [ "$#" -gt 2 ]; then
  usage
  exit 1
fi

CA_PATH="$1"
IMAGE_TAG="${2:-synergy-design-system/mcp:local}"

if [ ! -f "$CA_PATH" ]; then
  echo "Error: CA file not found at '$CA_PATH'." >&2
  exit 1
fi

require_command colima
require_command docker
require_command pnpm

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PACKAGE_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
REPO_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/../../.." && pwd)

echo "Installing CA into Colima trust store..."
colima ssh -- sudo mkdir -p /usr/local/share/ca-certificates
cat "$CA_PATH" | colima ssh -- sudo tee /usr/local/share/ca-certificates/corp-ca.crt >/dev/null
colima ssh -- sudo update-ca-certificates

echo "Restarting Colima..."
colima restart

echo "Verifying Docker base image access..."
docker pull node:24-alpine >/dev/null

echo "Building MCP dependencies and release tarballs..."
cd "$REPO_ROOT"
pnpm --filter @synergy-design-system/assets build
pnpm --filter @synergy-design-system/metadata build
pnpm --filter @synergy-design-system/mcp build

mkdir -p "$PACKAGE_ROOT/artifacts"
rm -f "$PACKAGE_ROOT"/artifacts/*.tgz
pnpm --filter @synergy-design-system/assets pack --pack-destination "$PACKAGE_ROOT/artifacts"
pnpm --filter @synergy-design-system/metadata pack --pack-destination "$PACKAGE_ROOT/artifacts"
pnpm --filter @synergy-design-system/mcp pack --pack-destination "$PACKAGE_ROOT/artifacts"

echo "Building Docker image '$IMAGE_TAG'..."
cd "$PACKAGE_ROOT"
docker build \
  --progress=plain \
  --secret id=corp_ca,src="$CA_PATH" \
  -t "$IMAGE_TAG" \
  .

echo "Build completed: $IMAGE_TAG"
