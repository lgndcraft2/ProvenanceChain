/* eslint-disable @typescript-eslint/no-var-requires */
const anchor = require('@coral-xyz/anchor');
const { PublicKey, SystemProgram } = require('@solana/web3.js');
const fs = require('fs');
const os = require('os');
const path = require('path');

// Load IDL from the actual deployed file to get the program address
const idlPath = path.join(__dirname, '../../contract/provenance-chain/target/idl/provenance_chain.json');
const idlFile = JSON.parse(fs.readFileSync(idlPath, 'utf-8'));

const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID ||
  process.env.PROGRAM_ID ||
  idlFile.address ||
  'BvkDzStztdtVZZXL5R364xwWNn3TfKG5xkN54KAV8giv'
);

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || process.env.ANCHOR_PROVIDER_URL || 'https://api.devnet.solana.com';

// IDL compatible with anchor.Program - simplified structure
const IDL = {
  version: '0.1.0',
  name: 'provenance_chain',
  instructions: [
    {
      name: 'submit_paper',
      accounts: [
        { name: 'paper', isMut: true, isSigner: false },
        { name: 'owner', isMut: true, isSigner: true },
        { name: 'systemProgram', isMut: false, isSigner: false }
      ],
      args: [
        { name: 'hash', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'authors', type: { vec: 'string' } }
      ]
    }
  ],
  accounts: [
    {
      name: 'PaperAccount',
      type: {
        kind: 'struct',
        fields: [
          { name: 'hash', type: 'string' },
          { name: 'title', type: 'string' },
          { name: 'authors', type: { vec: 'string' } },
          { name: 'status', type: { defined: 'PaperStatus' } },
          { name: 'timestamp', type: 'i64' },
          { name: 'owner', type: 'publicKey' }
        ]
      }
    }
  ],
  types: [
    {
      name: 'PaperStatus',
      type: {
        kind: 'enum',
        variants: [{ name: 'Active' }, { name: 'Updated' }, { name: 'Retracted' }]
      }
    }
  ]
};

const DEMO_PAPERS = [
  {
    title: 'Malaria Intervention Outcomes in Western Kenya',
    authors: ['Dr. Amina Osei', 'Dr. James Mwangi'],
    hash: 'a3f8c2e1d4b7f9a0c5e8d2b4f6a1c3e7d9b2f4a6c8e0d3b5f7a9c1e4d6b8f0a2',
  },
  {
    title: 'Blockchain Applications in Nigerian Secondary Education',
    authors: ['Prof. Chidera Obi', 'Dr. Fatima Al-Hassan'],
    hash: 'b9d1e3f5a7c2b4d6e8f0a2c4d6e8f0a2b4d6e8f0a2c4d6e8f0a2b4d6e8f0a2c4',
  },
  {
    title: 'Decentralised Identity Verification for African Universities',
    authors: ['Dr. Emeka Nwosu'],
    hash: 'c5a7b9d1e3f5a7b9d1e3f5a7b9d1e3f5a7b9d1e3f5a7b9d1e3f5a7b9d1e3f5a7',
  },
  {
    title: 'Solar Energy Adoption Patterns in Sub-Saharan Africa',
    authors: ['Dr. Aiko Mensah', 'Dr. Samuel Adeyemi', 'Prof. Lena Boateng'],
    hash: 'd1e3f5a7c9b2d4e6f8a0c2d4e6f8a0b2d4e6f8a0c2d4e6f8a0b2d4e6f8a0c2d4',
  },
];

const walletPath = process.env.ANCHOR_WALLET || path.join(os.homedir(), '.config/solana/id.json');
if (!fs.existsSync(walletPath)) {
  console.error(`Wallet not found at ${walletPath}. Set ANCHOR_WALLET or create the keypair.`);
  process.exit(1);
}

const wallet = anchor.Wallet.local(walletPath);
const connection = new anchor.web3.Connection(RPC_URL, 'confirmed');
const provider = new anchor.AnchorProvider(connection, wallet, { commitment: 'confirmed' });
anchor.setProvider(provider);

const program = new anchor.Program(IDL, PROGRAM_ID, provider);

const submitIfMissing = async (paper) => {
  const [pda] = PublicKey.findProgramAddressSync([Buffer.from(paper.hash)], PROGRAM_ID);
  try {
    await program.account.paperAccount.fetch(pda);
    console.log(`skip: ${paper.title} (already exists)`);
    return null;
  } catch {
    const tx = await program.methods
      .submitPaper(paper.hash, paper.title, paper.authors)
      .accounts({ paper: pda, owner: wallet.publicKey, systemProgram: SystemProgram.programId })
      .rpc();
    console.log(`created: ${paper.title} -> ${tx}`);
    return tx;
  }
};

(async () => {
  console.log(`RPC: ${RPC_URL}`);
  console.log(`Program: ${PROGRAM_ID.toBase58()}`);
  for (const paper of DEMO_PAPERS) {
    await submitIfMissing(paper);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
