// lib/program.ts
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';

export const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID || 'BchWFiSaRvWfyh5fYopg2XXVxaRtwBuUwyq65Mbu3svm'
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const IDL: any = {
  version: '0.1.0',
  name: 'provenance_chain',
  instructions: [
    {
      name: 'submitPaper',
      accounts: [
        { name: 'paper', writable: true, signer: false },
        { name: 'owner', writable: true, signer: true },
        { name: 'systemProgram', writable: false, signer: false }
      ],
      args: [
        { name: 'hash', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'authors', type: { vec: 'string' } }
      ]
    },
    {
      name: 'updateStatus',
      accounts: [
        { name: 'paper', writable: true, signer: false },
        { name: 'owner', writable: false, signer: true }
      ],
      args: [
        { name: 'newStatus', type: { defined: 'PaperStatus' } }
      ]
    }
  ],
  accounts: [
    {
      name: 'paperAccount',
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getProgram = (provider: AnchorProvider): Program<any> =>
  new Program(IDL, PROGRAM_ID, provider);