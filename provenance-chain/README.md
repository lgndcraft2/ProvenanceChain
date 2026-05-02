# ProvenanceChain Frontend

The user-facing web application for ProvenanceChain, built with [Next.js](https://nextjs.org).

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Key Pages

- **`/`** — Home / Landing page
- **`/submit`** — Record a new document
- **`/verify`** — Verify document authenticity
- **`/explorer`** — Dashboard of all recorded documents

## Configuration

Create `.env.local` in this directory:

```bash
NEXT_PUBLIC_PROGRAM_ID=<solana_program_id>
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
```

## Architecture

- **Wallet Integration**: Phantom / Solana Wallet Adapter
- **Blockchain Interaction**: Anchor client library
- **Hashing**: Web Crypto API (client-side SHA-256)
- **State Management**: React hooks
- **Styling**: CSS modules + Tailwind

See the main [README.md](../README.md) for full project context and demo instructions.
