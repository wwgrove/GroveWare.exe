import React, { useState } from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router';
import { Lock } from 'lucide-react';
import backgroundVideo from './imports/KGDvF1UBHEry7.mp4';
import evidenceImg1 from './imports/image-1.png';
import evidenceImg2 from './imports/image-2.png';
import evidenceImg3 from './imports/image-3.png';
import evidenceImg4 from './imports/image-4.png';

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 py-4 md:p-6 flex justify-between items-center mix-blend-difference text-slate-500 text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-mono">
      <NavLink to="/" className="hover:text-white transition-colors cursor-crosshair shrink-0">
        [ G R O V E W A R E ]
      </NavLink>
      <div className="flex gap-4 md:gap-12">
        <NavLink to="/evidence" className={({isActive}) => isActive ? "text-white" : "hover:text-slate-300 transition-colors"}>[ EVIDENCE ]</NavLink>
        <NavLink to="/portal" className={({isActive}) => isActive ? "text-[#ff33cc]" : "hover:text-slate-300 transition-colors"}>[ PORTAL ]</NavLink>
      </div>
    </nav>
  );
}

function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      // Replace with your published Google Apps Script Web App URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbxU4n683CVbKQS3BXzwqVmxw4PD_yq5aN0r_oT_AQhMbY6dKxMWhtsMS3ldjuSpWRpq/exec';
      
      const formData = new URLSearchParams();
      formData.append('email', email);

      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
      });

      // When using 'no-cors', the response is "opaque" (status is 0, ok is false).
      // We assume it succeeded if the fetch promise resolved.
      setSubmitted(true);
    } catch (error) {
      alert("NETWORK ERROR. SECURE LINK FAILED.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black text-white">
      {/* Background abstract element for extreme minimalism */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute min-w-full min-h-full object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 mix-blend-screen"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black pointer-events-none" />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl w-full text-center space-y-16">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-8xl font-serif tracking-tight text-white cursor-default">
              The Unfair Advantage.
            </h1>
            <p className="text-slate-500 text-xs md:text-sm tracking-[0.1em] max-w-lg mx-auto uppercase font-mono leading-relaxed">
              Some questions don't have answers. Some advantages don't have explanations. You either know, or you don't.
            </p>
          </div>

          {submitted ? (
            <div className="max-w-md mx-auto space-y-6 relative z-10 w-full mt-12 bg-black/20 p-8 backdrop-blur-md border border-slate-900/50">
              <div className="text-[#ff33cc] text-xs font-mono tracking-[0.3em] uppercase animate-pulse mb-6">
                Link Dispatched
              </div>
              <p className="text-slate-400 text-[10px] tracking-[0.2em] font-mono leading-relaxed uppercase">
                A secure registration link has been routed to<br/>
                <span className="text-white mt-4 block text-xs tracking-widest">{email}</span>
              </p>
              <div className="mt-8 pt-6 border-t border-slate-800">
                 <p className="text-slate-600 text-[9px] tracking-[0.1em] font-mono uppercase">
                   Await further instructions.
                 </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 relative z-10 w-full mt-12 bg-black/20 p-8 backdrop-blur-md border border-slate-900/50">
              <h2 className="text-slate-400 text-[10px] tracking-[0.3em] uppercase font-mono text-center mb-8">
                Request Secure Link
              </h2>
              <div className="space-y-4">
                <div className="relative group">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER EMAIL ADDRESS" 
                    className="w-full bg-transparent border-b border-slate-800 py-3 px-2 text-center text-white font-mono tracking-widest text-xs focus:outline-none focus:border-[#ff33cc] transition-colors placeholder:text-slate-700 uppercase"
                  />
                  <div className="absolute bottom-0 left-0 h-[1px] bg-[#ff33cc] w-0 group-focus-within:w-full transition-all duration-700 ease-in-out" />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full mt-8 bg-transparent border border-slate-800 text-slate-300 font-mono text-xs tracking-widest uppercase py-4 hover:bg-[#ff33cc] hover:text-black hover:border-[#ff33cc] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Transmitting...' : 'Transmit Request'}
              </button>
            </form>
          )}
        </div>
      </div>

      <footer className="absolute bottom-6 w-full text-center">
        <p className="text-slate-600 text-[10px] tracking-[0.2em] uppercase font-mono">
          © 2026 GroveWare. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

type EvidenceItem = {
  img: string;
  aspect: 'landscape' | 'portrait';
  label: string;
  text: string;
};

function EvidenceCard({ item, level }: { item: EvidenceItem; level: 1 | 2 }) {
  const locked = level === 2;
  const aspectClass = item.aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-video';

  return (
    <div className="break-inside-avoid relative group mb-8">
      <div className={`w-full ${aspectClass} bg-slate-950 border border-slate-900 relative overflow-hidden`}>
        <img src={item.img} alt="" className="w-full h-full object-cover" style={locked ? { filter: 'blur(12px)', transform: 'scale(1.05)' } : {}} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {!locked && (
          <>
            <div className="absolute bottom-4 left-4 flex gap-1 items-end h-8 opacity-30">
              {[1, 0.5, 0.75, 0.25, 0.6].map((h, i) => (
                <div key={i} className="w-1 bg-[#ff33cc] animate-pulse" style={{ height: `${h * 100}%`, animationDelay: `${i * 0.12}s` }} />
              ))}
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff33cc] animate-ping" />
              <span className="text-[9px] font-mono text-[#ff33cc] opacity-60 uppercase tracking-widest">Live</span>
            </div>
            <div className="absolute bottom-4 right-4 text-[8px] font-mono text-slate-500 uppercase tracking-widest">
              LVL 1
            </div>
          </>
        )}

        {locked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Lock className="w-5 h-5 text-slate-400 mb-3" />
            <span className="text-[9px] font-mono tracking-[0.25em] text-slate-400 uppercase text-center px-6 leading-relaxed">
              Level 2 Clearance<br />
              <span className="text-slate-600">Required</span>
            </span>
          </div>
        )}

        <div className="absolute top-4 left-4 text-[8px] font-mono text-slate-600 uppercase tracking-widest">
          {item.label}
        </div>
      </div>
      <div className="mt-3 border-l border-slate-800 pl-3 py-0.5">
        <p className="text-[10px] font-mono text-slate-600 tracking-[0.1em] uppercase leading-relaxed">
          {item.text}
        </p>
      </div>
    </div>
  );
}

function Evidence() {
  const level1: EvidenceItem[] = [
    { img: evidenceImg1, aspect: 'landscape', label: 'FILE-001', text: 'Subject 04 — result confirmed. No explanation on record.' },
    { img: evidenceImg3, aspect: 'portrait',  label: 'FILE-002', text: 'The margin was not human.' },
    { img: evidenceImg2, aspect: 'landscape', label: 'FILE-003', text: 'Flawless execution. Every input accounted for.' },
    { img: evidenceImg4, aspect: 'portrait',  label: 'FILE-004', text: 'They asked how. We stopped answering.' },
    { img: evidenceImg1, aspect: 'landscape', label: 'FILE-005', text: 'Sequence complete. Outcome expected.' },
    { img: evidenceImg3, aspect: 'landscape', label: 'FILE-006', text: 'On record. Uncontested.' },
  ];

  const level2: EvidenceItem[] = [
    { img: evidenceImg2, aspect: 'portrait',  label: 'FILE-007', text: 'Session redacted. Clearance required.' },
    { img: evidenceImg4, aspect: 'landscape', label: 'FILE-008', text: 'Classified. Access denied.' },
    { img: evidenceImg1, aspect: 'portrait',  label: 'FILE-009', text: 'File sealed. Awaiting authorisation.' },
    { img: evidenceImg2, aspect: 'landscape', label: 'FILE-010', text: 'Content restricted to verified members.' },
    { img: evidenceImg4, aspect: 'portrait',  label: 'FILE-011', text: 'Elevate your clearance to unlock.' },
    { img: evidenceImg3, aspect: 'landscape', label: 'FILE-012', text: 'Undisclosed. Apply through the portal.' },
  ];

  return (
    <div className="bg-black pt-28 pb-24 px-6 md:px-16">

      <div className="mb-12 flex items-center gap-6">
        <span className="text-slate-700 text-[9px] font-mono uppercase tracking-[0.3em]">— Clearance Level 1</span>
        <div className="flex-1 h-[1px] bg-slate-900" />
        <span className="text-slate-700 text-[9px] font-mono uppercase tracking-[0.3em]">Open Access</span>
      </div>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
        {level1.map((item, i) => <EvidenceCard key={i} item={item} level={1} />)}
      </div>

      <div className="mt-20 mb-12 flex items-center gap-6">
        <span className="text-[#ff33cc]/40 text-[9px] font-mono uppercase tracking-[0.3em]">— Clearance Level 2</span>
        <div className="flex-1 h-[1px] bg-slate-900" />
        <span className="text-[#ff33cc]/40 text-[9px] font-mono uppercase tracking-[0.3em]">Restricted</span>
      </div>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
        {level2.map((item, i) => <EvidenceCard key={i} item={item} level={2} />)}
      </div>

    </div>
  );
}

function Portal() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black text-white items-center justify-center">
      <div className="w-full max-w-sm p-8 border border-slate-900 bg-slate-950/50 backdrop-blur-md">
        <h2 className="text-sm font-mono text-white tracking-[0.2em] uppercase mb-8 text-center">
          Secure Link Authentication
        </h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-slate-500 uppercase font-mono tracking-widest">Identifier</label>
            <input type="text" className="w-full bg-black border border-slate-800 p-3 text-sm text-[#ff33cc] font-mono focus:outline-none focus:border-[#ff33cc] transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-slate-500 uppercase font-mono tracking-widest">Passphrase</label>
            <input type="password" className="w-full bg-black border border-slate-800 p-3 text-sm text-[#ff33cc] font-mono focus:outline-none focus:border-[#ff33cc] transition-colors" />
          </div>
          <button className="w-full bg-white text-black font-mono text-xs tracking-widest uppercase py-4 hover:bg-[#ff33cc] transition-colors mt-4">
            Initialize Link
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div className="bg-black min-h-screen text-slate-300 selection:bg-[#ff33cc] selection:text-black">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/evidence" element={<Evidence />} />
          <Route path="/portal" element={<Portal />} />
        </Routes>
      </div>
    </HashRouter>
  );
}