'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';

type Status = 'Active' | 'Updated' | 'Retracted';

interface Paper {
  id: string;
  title: string;
  authors: string[];
  hash: string;
  status: Status;
  timestamp: number;
  owner: string;
  txSig: string;
}

const DEMO_PAPERS: Paper[] = [
  { id: '1', title: 'Malaria Intervention Outcomes in Western Kenya', authors: ['Dr. Amina Osei', 'Dr. James Mwangi'], hash: 'a3f8c2e1d4b7f9a0c5e8d2b4f6a1c3e7d9b2f4a6c8e0d3b5f7a9c1e4d6b8f0a2', status: 'Active', timestamp: Date.now() - 1000*60*60*24*30, owner: '7xKp...3mNq', txSig: 'DEMO_TX_001' },
  { id: '2', title: 'Blockchain Applications in Nigerian Secondary Education', authors: ['Prof. Chidera Obi', 'Dr. Fatima Al-Hassan'], hash: 'b9d1e3f5a7c2b4d6e8f0a2c4d6e8f0a2b4d6e8f0a2c4d6e8f0a2b4d6e8f0a2c4', status: 'Updated', timestamp: Date.now() - 1000*60*60*24*60, owner: '3kRt...9pWx', txSig: 'DEMO_TX_002' },
  { id: '3', title: 'Decentralised Identity Verification for African Universities', authors: ['Dr. Emeka Nwosu'], hash: 'c5a7b9d1e3f5a7b9d1e3f5a7b9d1e3f5a7b9d1e3f5a7b9d1e3f5a7b9d1e3f5a7', status: 'Retracted', timestamp: Date.now() - 1000*60*60*24*90, owner: '9mPz...2vYk', txSig: 'DEMO_TX_003' },
  { id: '4', title: 'Solar Energy Adoption Patterns in Sub-Saharan Africa', authors: ['Dr. Aiko Mensah', 'Dr. Samuel Adeyemi', 'Prof. Lena Boateng'], hash: 'd1e3f5a7c9b2d4e6f8a0c2d4e6f8a0b2d4e6f8a0c2d4e6f8a0b2d4e6f8a0c2d4', status: 'Active', timestamp: Date.now() - 1000*60*60*24*14, owner: '2nBq...7hSj', txSig: 'DEMO_TX_004' },
  { id: '5', title: 'On the Reproducibility Crisis in AI Research: A Provenance Perspective', authors: ['Dr. Liu Wei', 'Dr. Priya Sharma'], hash: 'e7f9a1b3d5e7f9a1b3d5e7f9a1b3d5e7f9a1b3d5e7f9a1b3d5e7f9a1b3d5e7f9', status: 'Active', timestamp: Date.now() - 1000*60*60*24*5, owner: '5pHr...1cMn', txSig: 'DEMO_TX_005' },
];

export default function ExplorerPage() {
  const { connected, publicKey } = useWallet();
  const [papers, setPapers]     = useState<Paper[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState<'All' | Status>('All');
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    // TODO: replace with real getProgramAccounts call
    const timer = setTimeout(() => { setPapers(DEMO_PAPERS); setLoading(false); }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filtered = papers.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
      || p.authors.some(a => a.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === 'All' || p.status === filter;
    return matchSearch && matchFilter;
  });

  const handleUpdateStatus = async (paperId: string, newStatus: Status) => {
    setUpdating(paperId);
    try {
      // TODO: real Anchor call
      await new Promise(r => setTimeout(r, 1500));
      setPapers(prev => prev.map(p => p.id === paperId ? { ...p, status: newStatus } : p));
    } catch (e) { console.error(e); }
    setUpdating(null);
  };

  const fmt = (ts: number) => new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const shortHash = (h: string) => h.slice(0, 8) + '…' + h.slice(-8);

  const sColor = (s: Status) => ({ Active: '#4ade80', Updated: '#60a5fa', Retracted: '#facc15' }[s]);
  const sBg    = (s: Status) => ({ Active: 'rgba(34,197,94,0.1)', Updated: 'rgba(96,165,250,0.1)', Retracted: 'rgba(234,179,8,0.1)' }[s]);
  const sBdr   = (s: Status) => ({ Active: 'rgba(34,197,94,0.25)', Updated: 'rgba(96,165,250,0.25)', Retracted: 'rgba(234,179,8,0.25)' }[s]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { min-height: 100%; }
        body { background: #050505; font-family: 'DM Sans', sans-serif; color: #fff; }

        .page { min-height: 100vh; background: #050505; position: relative; }
        .glow-tl {
          position: absolute; top: -15%; left: -8%; width: 45vw; height: 45vw;
          border-radius: 50%; pointer-events: none;
          background: radial-gradient(ellipse, rgba(210,72,8,0.28) 0%, transparent 68%);
        }
        .nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 2.25rem; border-bottom: 1px solid rgba(255,255,255,0.05);
          position: sticky; top: 0; z-index: 50;
          background: rgba(5,5,5,0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
        }
        .logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 0.95rem; display: flex; align-items: center; gap: 0.4rem; text-decoration: none; color: #fff; }
        .logo-dot { width: 7px; height: 7px; border-radius: 50%; background: #F97316; flex-shrink: 0; }
        .back { font-size: 0.78rem; color: rgba(255,255,255,0.4); text-decoration: none; transition: color .2s; }
        .back:hover { color: rgba(255,255,255,0.75); }

        .wallet-adapter-button {
          background: #fff !important; color: #000 !important; border-radius: 999px !important;
          font-family: 'DM Sans', sans-serif !important; font-weight: 500 !important;
          font-size: 0.78rem !important; padding: 0.42rem 1.1rem !important;
          height: auto !important; line-height: 1.4 !important;
        }
        .wallet-adapter-button-start-icon { display: none !important; }

        .body { max-width: 900px; margin: 0 auto; padding: 2.5rem 1.5rem; position: relative; z-index: 10; }

        .header-row { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
        .page-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.8rem; letter-spacing: -0.03em; }
        .count { font-size: 0.78rem; color: rgba(255,255,255,0.3); margin-top: 0.2rem; }

        .controls { display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap; }
        input[type=text] {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px; padding: 0.45rem 1rem; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.8rem; outline: none;
          transition: border-color .2s; width: 200px;
        }
        input[type=text]:focus { border-color: rgba(249,115,22,0.4); }
        input[type=text]::placeholder { color: rgba(255,255,255,0.2); }

        .filter-btn {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09);
          border-radius: 999px; padding: 0.42rem 0.9rem;
          font-family: 'DM Sans', sans-serif; font-size: 0.75rem;
          color: rgba(255,255,255,0.5); cursor: pointer; transition: all .2s;
        }
        .filter-btn.active { background: rgba(249,115,22,0.12); border-color: rgba(249,115,22,0.35); color: #F97316; }
        .filter-btn:hover:not(.active) { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.8); }

        .card {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 1.25rem 1.4rem; margin-bottom: 0.75rem;
          transition: border-color .2s, background .2s;
        }
        .card:hover { border-color: rgba(255,255,255,0.12); background: rgba(255,255,255,0.03); }

        .card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 0.6rem; }
        .card-title { font-family: 'Syne', sans-serif; font-size: 0.95rem; font-weight: 700; line-height: 1.35; flex: 1; }
        .status-badge { font-size: 0.68rem; font-weight: 500; padding: 0.22rem 0.7rem; border-radius: 999px; white-space: nowrap; flex-shrink: 0; }
        .card-authors { font-size: 0.78rem; color: rgba(255,255,255,0.45); margin-bottom: 0.75rem; font-weight: 300; }

        .card-meta { display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap; }
        .meta-item { font-size: 0.7rem; color: rgba(255,255,255,0.28); display: flex; align-items: center; gap: 0.3rem; }
        .meta-item code { font-family: 'Courier New', monospace; color: rgba(249,115,22,0.7); font-size: 0.68rem; }
        .solscan-link { color: rgba(249,115,22,0.6); text-decoration: none; font-size: 0.68rem; }
        .solscan-link:hover { color: #F97316; }

        .card-actions { margin-top: 0.9rem; padding-top: 0.9rem; border-top: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
        .owner-label { font-size: 0.68rem; color: rgba(255,255,255,0.25); flex: 1; }
        .status-btn {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px; padding: 0.3rem 0.8rem;
          font-family: 'DM Sans', sans-serif; font-size: 0.7rem;
          color: rgba(255,255,255,0.45); cursor: pointer; transition: all .2s;
        }
        .status-btn:hover:not(:disabled) { background: rgba(255,255,255,0.09); color: rgba(255,255,255,0.8); }
        .status-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .status-btn-retract:hover:not(:disabled) { border-color: rgba(234,179,8,0.3); color: #facc15; background: rgba(234,179,8,0.07); }

        .empty { text-align: center; padding: 4rem 2rem; color: rgba(255,255,255,0.25); font-size: 0.85rem; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { display: inline-block; width: 12px; height: 12px; border: 2px solid rgba(255,255,255,0.15); border-top-color: rgba(255,255,255,0.6); border-radius: 50%; animation: spin .7s linear infinite; vertical-align: middle; margin-right: 5px; }

        .skeleton { background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.04) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 8px; }
        @keyframes shimmer { to { background-position: -200% 0; } }
      `}</style>

      <div className="page">
        <div className="glow-tl" />
        <nav className="nav">
          <Link href="/" className="logo"><span className="logo-dot" />ProvenanceChain</Link>
          <Link href="/" className="back">← Back</Link>
          <WalletMultiButton />
        </nav>

        <div className="body">
          <div className="header-row">
            <div>
              <h1 className="page-title">Paper Explorer</h1>
              <p className="count">{filtered.length} document{filtered.length !== 1 ? 's' : ''} on-chain</p>
            </div>
            <div className="controls">
              <input type="text" placeholder="Search title or author…" value={search} onChange={e => setSearch(e.target.value)} />
              {(['All', 'Active', 'Updated', 'Retracted'] as const).map(f => (
                <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
          </div>

          {loading ? (
            [1,2,3].map(i => (
              <div key={i} className="card">
                <div className="skeleton" style={{ height: '1rem', width: '60%', marginBottom: '0.5rem' }} />
                <div className="skeleton" style={{ height: '0.7rem', width: '35%' }} />
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="empty">No papers found matching your search.</div>
          ) : (
            filtered.map(paper => {
              const isOwner = connected && publicKey?.toString().startsWith(paper.owner.slice(0, 4));
              return (
                <div key={paper.id} className="card">
                  <div className="card-top">
                    <div className="card-title">{paper.title}</div>
                    <span className="status-badge" style={{ color: sColor(paper.status), background: sBg(paper.status), border: `1px solid ${sBdr(paper.status)}` }}>
                      {paper.status}
                    </span>
                  </div>
                  <div className="card-authors">{paper.authors.join(', ')}</div>
                  <div className="card-meta">
                    <span className="meta-item">🕐 {fmt(paper.timestamp)}</span>
                    <span className="meta-item">🔑 <code>{shortHash(paper.hash)}</code></span>
                    <span className="meta-item">👤 {paper.owner}</span>
                    <a className="solscan-link" href={`https://solscan.io/tx/${paper.txSig}?cluster=devnet`} target="_blank" rel="noreferrer">
                      View on Solscan →
                    </a>
                  </div>

                  {isOwner && paper.status !== 'Retracted' && (
                    <div className="card-actions">
                      <span className="owner-label">You own this paper</span>
                      {paper.status === 'Active' && (
                        <button className="status-btn" onClick={() => handleUpdateStatus(paper.id, 'Updated')} disabled={updating === paper.id}>
                          {updating === paper.id && <span className="spinner" />}Mark Updated
                        </button>
                      )}
                      <button className="status-btn status-btn-retract" onClick={() => handleUpdateStatus(paper.id, 'Retracted')} disabled={updating === paper.id}>
                        {updating === paper.id && <span className="spinner" />}Retract
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}