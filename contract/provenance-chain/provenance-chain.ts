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
    const hash = "abc1234567890123456789012345678901234567890123456789012345678901";
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
});
