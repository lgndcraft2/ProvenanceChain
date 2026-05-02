import { AnchorProvider, Idl, Program } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';

export const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID || 'BchWFiSaRvWfyh5fYopg2XXVxaRtwBuUwyq65Mbu3svm'
);

export const IDL: Idl = {
  version: '0.1.0',
  name: 'provenance_chain',
  instructions: [
    {
      name: 'submitPaper',
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
    },
    {
      name: 'updateStatus',
      accounts: [
        { name: 'paper', isMut: true, isSigner: false },
        { name: 'owner', isMut: false, isSigner: true }
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

export const getProgram = (provider: AnchorProvider) =>
  new Program(IDL, PROGRAM_ID, provider);
