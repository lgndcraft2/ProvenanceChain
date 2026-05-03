use anchor_lang::prelude::*;

declare_id!("Bnay8BtGMQXqeZEtUxZD8kXq56yQY4gcSeDb71UCGzgQ");

const HASH_LEN: usize = 64;
const TITLE_MAX_LEN: usize = 200;
const AUTHORS_MAX_LEN: usize = 10;
const AUTHOR_MAX_LEN: usize = 64;
const PAPER_ACCOUNT_SPACE: usize = 1100;

#[program]
pub mod provenance_chain {
    use super::*;

    pub fn submit_paper(
        ctx: Context<SubmitPaper>,
        hash: String,
        title: String,
        authors: Vec<String>,
    ) -> Result<()> {
        require!(hash.len() == HASH_LEN, ErrorCode::InvalidHash);
        require!(title.len() <= TITLE_MAX_LEN, ErrorCode::TitleTooLong);
        require!(authors.len() <= AUTHORS_MAX_LEN, ErrorCode::TooManyAuthors);
        require!(authors.iter().all(|a| a.len() <= AUTHOR_MAX_LEN), ErrorCode::AuthorTooLong);

        let paper = &mut ctx.accounts.paper;
        paper.hash = hash;
        paper.title = title;
        paper.authors = authors;
        paper.status = PaperStatus::Active;
        paper.timestamp = Clock::get()?.unix_timestamp;
        paper.owner = ctx.accounts.owner.key();
        Ok(())
    }

    pub fn update_status(ctx: Context<UpdateStatus>, new_status: PaperStatus) -> Result<()> {
        require!(matches!(new_status, PaperStatus::Updated | PaperStatus::Retracted), ErrorCode::InvalidStatus);
        let paper = &mut ctx.accounts.paper;
        paper.status = new_status;
        paper.timestamp = Clock::get()?.unix_timestamp;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(hash: String)]
pub struct SubmitPaper<'info> {
    #[account(init, payer = owner, space = PAPER_ACCOUNT_SPACE, seeds = [&hash.as_bytes()[..32]], bump)]
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

#[account]
pub struct PaperAccount {
    pub hash:      String,       // SHA-256 hex (64 chars)
    pub title:     String,       // max 200 chars
    pub authors:   Vec<String>,  // max 10 × 64 chars
    pub status:    PaperStatus,  // Active | Updated | Retracted
    pub timestamp: i64,          // Solana clock unix timestamp
    pub owner:     Pubkey,       // submitting wallet
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum PaperStatus { Active, Updated, Retracted }

#[error_code]
pub enum ErrorCode {
    #[msg("Hash must be a 64 character SHA-256 hex string.")]
    InvalidHash,
    #[msg("Title exceeds 200 characters.")]
    TitleTooLong,
    #[msg("Too many authors.")]
    TooManyAuthors,
    #[msg("Author name exceeds 64 characters.")]
    AuthorTooLong,
    #[msg("Status must be Updated or Retracted.")]
    InvalidStatus,
}
