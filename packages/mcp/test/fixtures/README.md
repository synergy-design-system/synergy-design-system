# TLS Test Fixtures

This folder contains self-signed TLS fixtures used by the MCP HTTP/HTTPS transport tests.

## Files

- `server.crt`: Self-signed test certificate
- `server.key`: Private key for `server.crt`
- `openssl-test-cert.cnf`: OpenSSL config used to generate the certificate with SAN entries

These files are for local/CI test scenarios only. Do not use them in production.

## Why These Files Exist

The MCP package includes HTTPS transport tests. These fixtures let tests run consistently across local development and CI (including containerized jobs) without requiring external certificate provisioning.

## Original Generation Command

```bash
openssl req -x509 -nodes -newkey rsa:2048 \
  -keyout ./server.key \
  -out ./server.crt \
  -days 3650 \
  -config ./openssl-test-cert.cnf \
  -extensions v3_req
```

Run this command from the `packages/mcp/test/fixtures` directory.
