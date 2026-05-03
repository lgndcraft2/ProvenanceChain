// lib/program.ts
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';

export const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID || 'Bnay8BtGMQXqeZEtUxZD8kXq56yQY4gcSeDb71UCGzgQ'
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const IDL: any = {
  address: process.env.NEXT_PUBLIC_PROGRAM_ID || 'Bnay8BtGMQXqeZEtUxZD8kXq56yQY4gcSeDb71UCGzgQ',
  metadata: {
    name: 'provenance_chain',
    version: '0.1.0',
    spec: '0.1.0',
    description: 'Created with Anchor'
  },
  instructions: [
    {
      name: 'submitPaper',
      discriminator: [50, 4, 72, 165, 234, 253, 22, 113],
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
      discriminator: [147, 215, 74, 174, 55, 191, 42, 0],
      accounts: [
        { name: 'paper', writable: true, signer: false },
        { name: 'owner', writable: false, signer: true }
      ],
      args: [
        { name: 'newStatus', type: { defined: { name: 'PaperStatus' } } }
      ]
    }
  ],
  accounts: [
    {
      name: 'PaperAccount',
      discriminator: [40, 136, 1, 210, 201, 113, 90, 15]
    }
  ],
  types: [
    {
      name: 'PaperAccount',
      type: {
        kind: 'struct',
        fields: [
          { name: 'hash', type: 'string' },
          { name: 'title', type: 'string' },
          { name: 'authors', type: { vec: 'string' } },
          { name: 'status', type: { defined: { name: 'PaperStatus' } } },
          { name: 'timestamp', type: 'i64' },
          { name: 'owner', type: 'pubkey' }
        ]
      }
    },
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
  new Program(IDL, provider);