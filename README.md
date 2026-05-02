# 🔗 ProvenanceChain

**Blockchain-Powered Document Provenance for Academic Research**

> *Prove that a document is what it claims to be, created when it claims to have been created, and currently in the state it claims to be in.*

ProvenanceChain is a hackathon MVP that uses Solana to create an immutable, verifiable record of document authenticity. No document ever leaves the user's machine — only its cryptographic fingerprint is stored on-chain.

---

## 🔴 DEPLOYMENT IN PROGRESS

**Status:** Build complete ✅ | Wallet funded ✅ | **AWAITING DEVNET DEPLOYMENT** ⏳

**What's done:**
- Smart contract compiled and ready to deploy
- Wallet address funded with devnet SOL
- All frontend features implemented

**Next steps (see "IMMEDIATE NEXT STEPS" section below):**
1. Run `anchor deploy --provider.cluster devnet`
2. Copy program ID to `.env.local`
3. Test on frontend

**Wallet Address:** `4rWch1cqhJZyhs8YkBZLSw8ya4FFPqC2KCLsnxPaADqW`  
**Estimated time to full demo-ready:** 10 minutes

---

## 📊 Project Status

| Component | Status | Notes |
|-----------|--------|-------|
| Smart Contract (Anchor) | ✅ Complete | Built successfully in `target/deploy/provenance_chain.so` |
| Submit Feature | ✅ Complete | Upload PDF → Record on blockchain |
| Verify Feature | ✅ Complete | Check if document is tampered |
| Explorer Dashboard | ✅ Complete | View all records + update status |
| Demo Script | ✅ Complete | Seed test data ready |
| cargo-build-sbf | ✅ Installed | Build tool for Solana programs |
| Wallet Funded (Airdrop) | ✅ Complete | Wallet: `4rWch1cqhJZyhs8YkBZLSw8ya4FFPqC2KCLsnxPaADqW` |
| **Devnet Deploy** | ⏳ **NEXT** | **Ready to execute** — see below |
| Program ID Configuration | ⏳ Ready | Add to `.env.local` after deploy |
| Demo Setup (Seeding) | ⏳ Ready | Run after deploy |
| Testing + Polish | 🔄 In Progress | Final refinements |

**Overall Progress: ~90% — Build complete, wallet funded, deployment ready**

---

## 🚀 IMMEDIATE NEXT STEPS (For Team)

### 1️⃣ Deploy to Devnet (5 minutes)
```bash
export PATH="/home/codespace/.cargo/bin:/home/codespace/.local/share/solana/install/active_release/bin:$PATH"
cd /workspaces/ProvenanceChain/contract/provenance-chain
anchor deploy --provider.cluster devnet
```

**Output will show:**
```
Program Id: <YOUR_PROGRAM_ID_HERE>
```

**Copy that Program ID** (looks like: `BvkDzStztdtVZZXL5R364xwWNn3TfKG5xkN54KAV8giv`)

### 2️⃣ Configure Frontend (2 minutes)
Create file: `provenance-chain/.env.local`
```bash
NEXT_PUBLIC_PROGRAM_ID=<PASTE_PROGRAM_ID_FROM_STEP_1>
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
```

### 3️⃣ Start Frontend & Test (5 minutes)
```bash
cd provenance-chain
npm install
npm run dev
```
- Open http://localhost:3000
- Connect wallet
- Test submit → verify → explorer

### 4️⃣ Seed Demo Data (Optional, 2 minutes)
```bash
node provenance-chain/scripts/seed-demo.cjs
```
Then refresh `/explorer` to see demo papers.

---

## 🎯 What Is ProvenanceChain? (In Plain English)

**The Problem:** Imagine you're a researcher who submits a paper to a conference. Later, someone claims they wrote it first, or someone creates a fake version saying you changed your results. How do you prove when your document was actually created and that it hasn't been altered?

**The Solution:** ProvenanceChain lets you upload any document (PDF, paper, thesis, etc.) and instantly gets a permanent, unchangeable record on the blockchain. Think of it like a notary public, but completely decentralized and instant.

**What You Can Do:**
- **Record**: Upload a PDF → Get a blockchain timestamp (proof you owned it at this moment)
- **Verify**: Upload any PDF → Check if it's the exact same file or if it's been tampered with
- **Track**: View all your recorded documents in one dashboard

The document stays on your computer. Only a tiny unique fingerprint (like a document's DNA) goes on the blockchain, so it's fast and cheap.

---

## 🚀 Demo Day Guide (No Technical Background Needed)

### Before Your Demo
You'll need:
1. **A Solana wallet** — Free, takes 2 minutes. Get one at [phantom.app](https://phantom.app)
2. **Some test SOL** — Free test coins (devnet). You'll get these automatically
3. **Our app running** — Instructions below

### The Demo Flow (What Your Audience Will See)

#### Part 1: Record a Paper (3 minutes)
1. Open the **Record** tab
2. Upload any PDF (use `provenance-chain/scripts/sample-paper.pdf` or any research paper)
3. Fill in: Title, Authors, Description
4. Click "Submit"
5. **Magic happens**: Your wallet pops up, you sign (no money involved), and **BOOM** — it's recorded on the blockchain forever

**What to say to the audience:**  
*"This paper is now timestamped on an immutable blockchain. We have permanent proof this exact version existed right now, created by these authors."*

---

#### Part 2: Verify a Document (2 minutes)
1. Open the **Verify** tab
2. Download the same PDF you just recorded (should be in your Downloads)
3. Upload it again
4. **Result**: "✅ VERIFIED — This document matches the original"
5. Now, if you try to verify a **different PDF** (or one with even 1 pixel changed), it will say "❌ DOCUMENT MISMATCH"

**What to say to the audience:**  
*"Anyone on the planet can verify this document is authentic — no middleman, no fee. If someone tries to claim a different version is the original, the blockchain proves they're lying."*

---

#### Part 3: Track & Update Status (2 minutes)
1. Open the **Explorer** (your dashboard)
2. See all your recorded papers
3. Click on one and change its status: `DRAFT` → `SUBMITTED` → `PUBLISHED` → `CITED`
4. Each update creates a new blockchain transaction (all historical states are permanently preserved)

**What to say to the audience:**  
*"The entire history is on the blockchain. You can track when a paper moved from draft to publication. This is perfect for proving priority in research disputes."*

---

### Quick Setup (5 minutes)

#### Step 1: Get the app running locally
```bash
cd provenance-chain
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

#### Step 2: Connect your wallet
- Click "Connect Wallet" (top right)
- Select Phantom (or your wallet)
- **Important**: Make sure your wallet is set to **Devnet** (test network, not mainnet)

#### Step 3: You're ready!
The app works with test coins automatically. Just click "Submit" on any page.

---

### 💡 Demo Tips
- **Use the seeded demo data** to show the app already populated: Run this first (instructions in technical section below)
- **Prepare 2-3 PDFs** in advance so you don't waste time downloading
- **Practice once offline** so you know where buttons are
- **If wallet pops up slowly**, that's normal—blockchain signing takes a moment
- **Have a backup story ready**: If something glitches, explain the feature and show the code—the logic is sound

---

## 🧪 How To Test (Technical Setup)

### 1) Deploy the program (Devnet)
```bash
cd contract/provenance-chain
anchor build
anchor deploy --provider.cluster devnet
```
Copy the program ID from the deploy output.

### 2) Configure the frontend
Create [provenance-chain/.env.local](provenance-chain/.env.local) with:
```bash
NEXT_PUBLIC_PROGRAM_ID=YOUR_DEPLOYED_PROGRAM_ID
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
```

### 3) Run the frontend
```bash
cd provenance-chain
npm install
npm run dev
```

### 4) Verify Submit flow
Open `/submit`, connect wallet, upload a PDF, submit.
- Success = real tx signature + PDA account exists on devnet.

### 5) Verify Verify flow
Open `/verify`, upload the same PDF.
- Success = `VERIFIED` result with on-chain title/authors/status.

### 6) Verify Explorer + Update Status
Open `/explorer`.
- Success = on-chain list loads and owner can update status.

---

## 🚀 Seed Demo Data (Optional)
After deploy + env setup, run:
```bash
node provenance-chain/scripts/seed-demo.cjs
```
Success = papers appear in `/explorer` after refresh.

---

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (Next.js 14)                  │
│                                                             │
│  ┌──────────┐   ┌──────────┐   ┌──────────────────────┐    │
│  │  RECORD   │   │  VERIFY  │   │   TRACK (Explorer)   │    │
│  │  Upload   │   │  Upload  │   │   Dashboard with     │    │
│  │  PDF →    │   │  PDF →   │   │   status colors &    │    │
│  │  Hash →   │   │  Hash →  │   │   update controls    │    │
│  │  Submit   │   │  Compare │   │                      │    │
│  └─────┬────┘   └────┬─────┘   └──────────┬───────────┘    │
│        │              │                     │                │
│  ┌─────┴──────────────┴─────────────────────┴──────────┐    │
│  │           Solana Wallet Adapter (Phantom)            │    │
│  └─────────────────────┬───────────────────────────────┘    │
│                        │                                    │
│  ┌─────────────────────┴───────────────────────────────┐    │
│  │     Web Crypto API (Client-Side SHA-256 Hashing)    │    │
│  └─────────────────────────────────────────────────────┘    │
└────────────────────────────┬────────────────────────────────┘
                             │ RPC (Helius / QuickNode)
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                  SOLANA DEVNET (Blockchain)                  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │            Anchor Program (Rust)                    │    │
│  │                                                     │    │
│  │  Instructions:                                      │    │
│  │    • submit_paper  → creates PaperAccount PDA      │    │
│  │    • update_status → modifies status on-chain       │    │
│  │                                                     │    │
│  │  PDA Seed: [document_hash.as_bytes()]               │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  PaperAccount (On-Chain Data)                       │    │
│  │    • hash:       String (64 chars, SHA-256 hex)     │    │
│  │    • title:      String (max 200 chars)             │    │
│  │    • authors:    Vec<String> (max 10, 64 chars ea)  │    │
│  │    • status:     Enum { Active, Updated, Retracted }│    │
│  │    • timestamp:  i64 (Solana clock)                 │    │
│  │    • owner:      Pubkey (submitter's wallet)        │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Core Scope — The 3-Step System

### 1. 📝 RECORD
A researcher uploads a PDF. The browser generates a **SHA-256 hash client-side** using the Web Crypto API, then commits the hash + metadata to Solana via the Anchor program. **The actual document never leaves the user's machine.**

### 2. ✅ VERIFY
Anyone can upload the same document. The browser hashes it and checks the result against the Solana record:
- **Match** → Proves originality and integrity.
- **No match** → Proves the document has been tampered with or is not registered.

### 3. 🔄 TRACK
A document's lifecycle status can evolve, with every change creating a new on-chain record:

```
Active  →  Updated  →  Retracted
  🟢          🟡           🔴
```

Only the original owner wallet can update the status.

---

## 🛠 Technical Stack

| Layer                | Technology                          | Purpose                                     |
| -------------------- | ----------------------------------- | ------------------------------------------- |
| **Blockchain**       | Solana Devnet                       | Immutable on-chain storage                  |
| **Smart Contract**   | Anchor (Rust)                       | Type-safe program development               |
| **Frontend**         | Next.js 14 (React)                  | Fast, modern UI                             |
| **Styling**          | Tailwind CSS                        | Rapid styling and responsive design         |
| **Wallet**           | Phantom + Solana Wallet Adapter     | Web3 wallet connection                      |
| **RPC Provider**     | Helius or QuickNode (Devnet)        | Reliable Devnet RPC (free tier)             |
| **Cryptography**     | Web Crypto API                      | Client-side SHA-256 hashing                 |

---

## ⚙️ Smart Contract Specification

### Instructions

#### `submit_paper`
Creates a new `PaperAccount` PDA seeded by the document hash.

| Parameter  | Type           | Constraint       |
| ---------- | -------------- | ---------------- |
| `hash`     | `String`       | Exactly 64 chars |
| `title`    | `String`       | Max 200 chars    |
| `authors`  | `Vec<String>`  | Max 10 entries, 64 chars each |

**Auto-set fields:** `status = Active`, `timestamp = Clock::get()`, `owner = signer.key()`

#### `update_status`
Changes the status of an existing paper. Requires the owner's wallet signature.

| Parameter    | Type          | Constraint                            |
| ------------ | ------------- | ------------------------------------- |
| `new_status` | `PaperStatus` | `Updated` or `Retracted`              |

**Auto-set fields:** `timestamp = Clock::get()`

### On-Chain Data: `PaperAccount`

```rust
#[account]
pub struct PaperAccount {
    pub hash: String,           // 64-char SHA-256 hex digest
    pub title: String,          // max 200 characters
    pub authors: Vec<String>,   // max 10 authors, 64 chars each
    pub status: PaperStatus,    // Active | Updated | Retracted
    pub timestamp: i64,         // Solana block timestamp
    pub owner: Pubkey,          // submitting wallet's public key
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum PaperStatus {
    Active,
    Updated,
    Retracted,
}
```

### PDA Derivation

Papers are addressed deterministically by their hash:

```rust
seeds = [hash.as_bytes()]
bump
```

This allows the frontend to derive the account address for verification **without** needing to store anything or scan program accounts.

### Space Calculation

> ⚠️ This must be calculated correctly or transactions will fail silently at runtime.

```
Discriminator:                    8 bytes
hash (4 + 64):                   68 bytes
title (4 + 200):                 204 bytes
authors Vec (4 + 10×(4+64)):     684 bytes
status (1 + 1):                  2 bytes
timestamp (i64):                 8 bytes
owner (Pubkey):                  32 bytes
────────────────────────────────────────
TOTAL:                           1006 bytes
RECOMMENDED (with buffer):       1100 bytes
```

```rust
#[account(
    init,
    payer = owner,
    space = 1100,
    seeds = [hash.as_bytes()],
    bump
)]
pub paper: Account<'info, PaperAccount>,
```

---

## 📅 24-Hour Build Plan

### 🔴 P0 — Core Engine (11–16 hours)

> **Critical Rule:** Get the Anchor program deployed on Devnet FIRST. Everything else depends on it.

| #  | Task                                       | Owner         | Est. Time | Dependencies |
| -- | ------------------------------------------ | ------------- | --------- | ------------ |
| 1  | Build Anchor program (`submit_paper` + `update_status`), test, deploy to Devnet | Rust Dev      | 4–6 hrs   | None         |
| 2  | Build wallet connection, PDF upload UI, client-side SHA-256 hashing              | Frontend Dev  | 3–4 hrs   | None (parallel with #1) |
| 3  | Build Verify flow — query chain by PDA, show result banners (✅ / ❌)            | Frontend Dev  | 2–3 hrs   | #1 deployed  |
| 4  | Wire up Submit flow — call Anchor program from frontend with hash + metadata     | Full-Stack    | 2–3 hrs   | #1 + #2      |

### 🟡 P1 — Tracking & Dashboard (3–5 hours)

| #  | Task                                                  | Owner         | Est. Time | Dependencies |
| -- | ----------------------------------------------------- | ------------- | --------- | ------------ |
| 5  | Build Paper Explorer dashboard with status colors (🟢🟡🔴) | Frontend Dev  | 2–3 hrs   | #4           |
| 6  | Wire up Update Status flow in the Explorer             | Full-Stack    | 1–2 hrs   | #5           |

### 🟢 P2 — Demo Prep (2–3 hours)

| #  | Task                                                   | Owner    | Est. Time |
| -- | ------------------------------------------------------ | -------- | --------- |
| 7  | Pre-load 3–4 demo papers with different statuses       | Anyone   | 30 min    |
| 8  | Prepare a modified PDF to demonstrate tamper detection  | Anyone   | 15 min    |
| 9  | Polish UI & end-to-end testing                         | Everyone | 1–2 hrs   |

### Timeline Visualization

```
Hour:  0    2    4    6    8    10   12   14   16   18   20   22   24
       ├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
Rust:  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
       [#1 Anchor build + deploy  ]
Front: ░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░
            [#2 Upload+Hash ][#3 Verify ][#5 Explorer  ]
Full:  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░
                                    [#4 Wire Submit][#6 Wire Status]
Team:  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓
                                                     [#7-9 Demo Prep]
       ──────── P0 ────────────────────── P1 ──────── P2 ──────────
```

---

## 🚨 Known Traps — Read Before You Start

### 🔴 Trap 1 — Anchor Account Space & PDAs (BIGGEST RISK)

`PaperAccount` uses `Vec<String>` for authors. In Anchor, **you must pre-allocate space at account creation** — dynamic sizing doesn't work. You need to calculate the exact byte size upfront and use it in the `#[account(init, space = ...)]` constraint.

**Get this wrong and deployment works fine but transactions fail silently at runtime.**

The Verify flow needs to look up a paper **by its hash**. This means you **must** use a PDA seeded by the hash so the frontend can derive the account address deterministically:

```rust
seeds = [hash.as_bytes()]
```

If you use a regular keypair account instead, verification becomes a `getProgramAccounts` scan — which is **slow and unreliable on Devnet**.

### 🟡 Trap 2 — Environment Setup Eating Your First 2 Hours

If anyone hasn't built on Anchor before, the toolchain setup alone (Rust, Solana CLI, Anchor CLI, Devnet wallet, airdropping SOL) can take 1–2 hours. **This must happen BEFORE the hackathon clock starts, not during P0.**

Confirm right now:
- [ ] `anchor --version` works on the Rust dev's machine
- [ ] They have a funded Devnet wallet (`solana airdrop 2`)
- [ ] `anchor build` completes on a test program

### 🟡 Trap 3 — Paper Explorer Won't Scale on Public RPC

Loading all papers in the Explorer requires `getProgramAccounts` filtered by your program ID. On Devnet with a public RPC endpoint, this is **rate-limited and slow**.

**Fix:** Get a **Helius** or **QuickNode** Devnet API key now (both have free tiers) and use it as your RPC URL from the start. Don't use the public endpoint for anything.

---

## ✅ Pre-Flight Checklist

Complete **all five** of these before the hackathon clock starts:

```
[ ] 1. Anchor toolchain verified on Rust dev's machine
       → anchor --version, solana --version, rustc --version
[ ] 2. Devnet wallet funded
       → solana airdrop 2 --url devnet
[ ] 3. Helius/QuickNode API key in hand
       → Free tier Devnet endpoint ready to drop into .env
[ ] 4. PDA seed strategy confirmed
       → seeds = [hash.as_bytes()], Rust dev understands this
[ ] 5. Space calculation done for PaperAccount
       → Agreed on 1100 bytes (see calculation above)
```

---

## 📂 Planned Project Structure

```
ProvenanceChain/
├── anchor/                        # Solana program
│   ├── programs/
│   │   └── provenance-chain/
│   │       └── src/
│   │           └── lib.rs         # submit_paper + update_status
│   ├── tests/
│   │   └── provenance-chain.ts    # Anchor test suite
│   ├── Anchor.toml
│   └── Cargo.toml
│
├── app/                           # Next.js 14 frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx           # Landing / Record page
│   │   │   ├── verify/
│   │   │   │   └── page.tsx       # Verify flow
│   │   │   └── explorer/
│   │   │       └── page.tsx       # Paper Explorer dashboard
│   │   ├── components/
│   │   │   ├── WalletProvider.tsx
│   │   │   ├── PdfUploader.tsx
│   │   │   ├── HashDisplay.tsx
│   │   │   ├── SubmitForm.tsx
│   │   │   ├── VerifyResult.tsx
│   │   │   └── PaperCard.tsx
│   │   ├── lib/
│   │   │   ├── hash.ts            # Web Crypto SHA-256 util
│   │   │   ├── anchor.ts          # Program IDL + connection
│   │   │   └── constants.ts       # Program ID, RPC URL
│   │   └── idl/
│   │       └── provenance_chain.json  # Generated IDL
│   ├── tailwind.config.ts
│   ├── next.config.js
│   └── package.json
│
├── .env.example                   # RPC_URL, PROGRAM_ID
├── README.md                      # ← You are here
└── ProvenanceChain_TeamBriefing.docx
```

---

## 🚀 Quick Start (After Setup)

### Anchor Program

```bash
# Navigate to anchor directory
cd anchor

# Build the program
anchor build

# Get the program ID
solana address -k target/deploy/provenance_chain-keypair.json

# Update program ID in Anchor.toml and lib.rs declare_id!()

# Deploy to Devnet
anchor deploy --provider.cluster devnet

# Run tests
anchor test
```

### Frontend

```bash
# Navigate to app directory
cd app

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your PROGRAM_ID and RPC_URL

# Run dev server
npm run dev
```

---

## 🔑 Key Design Decisions

| Decision | Rationale |
|---|---|
| **Hash-only on-chain** | Documents never leave the user's machine — privacy by design |
| **PDA seeded by hash** | Deterministic lookup, no scanning needed for verification |
| **Two instructions only** | Minimal attack surface, maximum simplicity for a hackathon |
| **Client-side hashing** | Zero backend needed, Web Crypto API is fast and native |
| **Pre-allocated space** | Anchor requirement — 1100 bytes covers max authors + buffer |
| **Private RPC (Helius/QN)** | Public Devnet RPC is rate-limited, breaks Explorer queries |

---

## 👥 Team

| Role | Responsibilities |
|---|---|
| **Rust Dev** | Anchor program, deployment, PDA strategy, space calculation |
| **Frontend Dev** | Next.js UI, wallet connection, PDF upload, hash display, Verify banners, Explorer dashboard |
| **Full-Stack** | Wiring frontend to Anchor (Submit + Update Status flows), integration testing |

---

## 📝 Progress Log (May 2, 2026)

### ✅ Completed Today
- **Updated README** with progress tracking and demo day guide for non-technical audience
- **Installed cargo-build-sbf** (Solana build tool) on dev environment
- **Built smart contract** successfully → `target/deploy/provenance_chain.so` ✅
- **Obtained devnet SOL** airdrop for deployment wallet
- **Wallet address:** `4rWch1cqhJZyhs8YkBZLSw8ya4FFPqC2KCLsnxPaADqW` (funded and ready)
- **Prepared deployment commands** and next-step documentation

### ⏳ Next Session TODO
1. **Deploy contract** to Devnet (`anchor deploy --provider.cluster devnet`)
2. **Copy Program ID** from deployment output
3. **Create `.env.local`** in `provenance-chain/` folder with Program ID
4. **Start frontend** and test all three features (Submit → Verify → Explorer)
5. **Seed demo data** (optional): `node provenance-chain/scripts/seed-demo.cjs`
6. **Final polish** and demo walkthrough

### 🔧 Environment Setup (All Installed)
- ✅ Rust & Cargo
- ✅ Solana CLI 
- ✅ Anchor CLI v1.0.1
- ✅ cargo-build-sbf v4.0.0

**Path to use in future terminal sessions:**
```bash
export PATH="/home/codespace/.cargo/bin:/home/codespace/.local/share/solana/install/active_release/bin:$PATH"
```

### 📋 Key Files
- **Contract:** `contract/provenance-chain/programs/provenance-chain/src/lib.rs`
- **Frontend:** `provenance-chain/app/` (pages: submit, verify, explorer)
- **Build output:** `contract/provenance-chain/target/deploy/provenance_chain.so`
- **Deployment location:** Will update Anchor.toml with Program ID after deploy

### 💡 Demo Day Readiness
**Current state:** Build-ready (90% complete)  
**Time to demo-ready:** ~10 minutes (just deployment + config)  
**Estimated prep for live demo:** 15 minutes (seed data + wallet setup)

See "🔴 DEPLOYMENT IN PROGRESS" section at top of this README for quick setup.

---

*Built for the hackathon. Ship fast, prove everything.* 🚢