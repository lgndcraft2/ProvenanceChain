use anchor_lang::prelude::*;

declare_id!("BchWFiSaRvWfyh5fYopg2XXVxaRtwBuUwyq65Mbu3svm");

#[program]
pub mod provenance_chain {
    use super::*;

    pub fn submit_paper(
        ctx: Context<SubmitPaper>,
        hash: String,
        title: String,
        authors: Vec<String>,
    ) -> Result<()> {
        let paper = &mut ctx.accounts.paper;
        paper.hash = hash;
        paper.title = title;
        paper.authors = authors;
        paper.status = Status::Active;
        paper.timestamp = Clock::get()?.unix_timestamp;
        paper.owner = ctx.accounts.owner.key();
        Ok(())
    }

    pub fn update_status(ctx: Context<UpdateStatus>, new_status: Status) -> Result<()> {
        let paper = &mut ctx.accounts.paper;
        paper.status = new_status;
        paper.timestamp = Clock::get()?.unix_timestamp;
        Ok(())
    }

    pub fn get_paper(ctx: Context<GetPaper>) -> Result<PaperAccount> {
        Ok(ctx.accounts.paper.clone())
    }
}

#[derive(Accounts)]
#[instruction(hash: String)]
pub struct SubmitPaper<'info> {
    #[account(init, payer = owner, space = 1400, seeds = [hash.as_bytes()], bump)]
    pub paper: Account<'info, PaperAccount>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateStatus<'info> {
    #[account(mut, has_one = owner)]
    pub paper: Account<'info, PaperAccount>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct GetPaper<'info> {
    pub paper: Account<'info, PaperAccount>,
}

#[account]
pub struct PaperAccount {
    pub hash:      String,       // SHA-256 hex (64 chars)
    pub title:     String,       // max 200 chars
    pub authors:   Vec<String>,  // max 10 × 100 chars
    pub status:    Status,       // Active | Updated | Retracted
    pub timestamp: i64,          // Solana clock unix timestamp
    pub owner:     Pubkey,       // submitting wallet
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum Status { Active, Updated, Retracted }

#[error_code]
pub enum ErrorCode {
    #[msg("Unauthorized owner.")]
    Unauthorized,
}
