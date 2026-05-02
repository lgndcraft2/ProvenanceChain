import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { ProvenanceChain } from "../target/types/provenance_chain";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { assert } from "chai";

describe("provenance-chain", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.ProvenanceChain as Program<ProvenanceChain>;
  const wallet = provider.wallet as anchor.Wallet;

  it("submits a paper and verifies hash", async () => {
    const hash = "a3f8c2e1d4b7f9a0c5e8d2b4f6a1c3e7d9b2f4a6c8e0d3b5f7a9c1e4d6b8f0a2";
    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from(hash)], 
      program.programId
    );

    await program.methods
      .submitPaper(hash, "Test Paper", ["Alice"])
      .accounts({ paper: pda, owner: wallet.publicKey,
                  systemProgram: SystemProgram.programId })
      .rpc();

    const account = await program.account.paperAccount.fetch(pda);
    assert.equal(account.hash, hash);
    assert.equal(account.status.active !== undefined, true);
  });

  it("updates paper status", async () => {
    const hash = "b9d1e3f5a7c2b4d6e8f0a2c4d6e8f0a2b4d6e8f0a2c4d6e8f0a2b4d6e8f0a2c4";
    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from(hash)],
      program.programId
    );

    await program.methods
      .submitPaper(hash, "Update Test", ["Alice", "Bob"])
      .accounts({ paper: pda, owner: wallet.publicKey,
                  systemProgram: SystemProgram.programId })
      .rpc();

    await program.methods
      .updateStatus({ updated: {} })
      .accounts({ paper: pda, owner: wallet.publicKey })
      .rpc();

    const account = await program.account.paperAccount.fetch(pda);
    assert.equal(account.status.updated !== undefined, true);
  });
});
