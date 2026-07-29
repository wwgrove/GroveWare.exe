import React, { useState, useRef, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router';
import { Lock } from 'lucide-react';
import backgroundVideo from './imports/KGDvF1UBHEry7.mp4';
import file001 from './imports/file-001.mp4';
import file002 from './imports/file-002.mp4';
import file003 from './imports/file-003.mp4';
import file004 from './imports/file-004.mp4';
import file005 from './imports/file-005.mp4';
import evidenceImg0 from './imports/image.png';
import evidenceImg1 from './imports/image-1.png';
import evidenceImg2 from './imports/image-2.png';
import evidenceImg3 from './imports/image-3.png';
import evidenceImg4 from './imports/image-4.png';

function CustomCursor({ visible }: { visible: boolean }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div ref={cursorRef} className="fixed top-0 left-0 z-[9999] pointer-events-none transition-opacity duration-200" style={{ willChange: 'transform', opacity: visible ? 1 : 0 }}>
      <div className="w-4 h-4 -translate-x-1/2 -translate-y-1/2 border border-white/20 rounded-full" />
    </div>
  );
}

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 py-4 md:p-6 flex justify-between items-center mix-blend-difference text-slate-500 text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-mono">
      <NavLink to="/" className="hover:text-white transition-colors shrink-0">[ G R O V E W A R E ]</NavLink>
      <div className="flex gap-4 md:gap-12">
        <NavLink to="/evidence" className={({ isActive }) => isActive ? "text-white" : "hover:text-slate-300 transition-colors"}>[ EVIDENCE ]</NavLink>
        <NavLink to="/portal" className={({ isActive }) => isActive ? "text-[#ff33cc]" : "hover:text-slate-300 transition-colors"}>[ PORTAL ]</NavLink>
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
      const scriptURL = 'https://script.google.com/macros/s/AKfycbz6KO3dtZNtcMEzyTgqG9AtCsWX-h3qssk6zIFh30JlXw340qqGk2NhPVmSxBobxK1z/exec';
      const formData = new URLSearchParams();
      formData.append('email', email);
      await fetch(scriptURL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: formData });
      setSubmitted(true);
    } catch {
      alert("NETWORK ERROR. SECURE LINK FAILED.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute min-w-full min-h-full object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-55 mix-blend-screen">
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70 pointer-events-none" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl w-full text-center space-y-16">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-8xl font-serif tracking-tight text-white cursor-default">The Unfair Advantage.</h1>
            <p className="text-slate-400 text-xs md:text-sm tracking-[0.1em] max-w-lg mx-auto uppercase font-mono leading-relaxed">Some questions don't have answers. Some advantages don't have explanations. You either know, or you don't.</p>
          </div>
          {submitted ? (
            <div className="max-w-md mx-auto space-y-6 relative z-10 w-full mt-12 bg-black/20 p-8 backdrop-blur-md border border-slate-900/50">
              <div className="text-[#ff33cc] text-xs font-mono tracking-[0.3em] uppercase animate-pulse mb-6">Link Dispatched</div>
              <p className="text-slate-300 text-[10px] tracking-[0.2em] font-mono leading-relaxed uppercase">A secure registration link has been routed to<br/><span className="text-white mt-4 block text-xs tracking-widest">{email}</span></p>
              <div className="mt-8 pt-6 border-t border-slate-800"><p className="text-slate-500 text-[9px] tracking-[0.1em] font-mono uppercase">Await further instructions.</p></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 relative z-10 w-full mt-12 bg-black/20 p-8 backdrop-blur-md border border-slate-700/60">
              <h2 className="text-slate-300 text-[10px] tracking-[0.3em] uppercase font-mono text-center mb-8">Request Secure Link</h2>
              <div className="space-y-4">
                <div className="relative group">
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ENTER EMAIL ADDRESS" className="w-full bg-transparent border-b border-slate-600 py-3 px-2 text-center text-white font-mono tracking-widest text-xs focus:outline-none focus:border-[#ff33cc] transition-colors placeholder:text-slate-500 uppercase" />
                  <div className="absolute bottom-0 left-0 h-[1px] bg-[#ff33cc] w-0 group-focus-within:w-full transition-all duration-700 ease-in-out" />
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="w-full mt-8 bg-transparent border border-slate-600 text-slate-200 font-mono text-xs tracking-widest uppercase py-4 hover:bg-[#ff33cc] hover:text-black hover:border-[#ff33cc] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? 'Transmitting...' : 'Transmit Request'}</button>
            </form>
          )}
        </div>
      </div>
      <footer className="absolute bottom-6 w-full text-center">
        <p className="text-slate-500 text-[10px] tracking-[0.2em] uppercase font-mono">© 2026 GroveWare. All rights reserved.</p>
      </footer>
    </div>
  );
}

type EvidenceItem = { img: string; portrait?: boolean; label: string; text: string };

function VideoCard({ src, portrait, label, text, onHover }: { src: string; portrait?: boolean; label: string; text: string; onHover: (active: boolean) => void; }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const unmute = () => { if (videoRef.current) videoRef.current.muted = false; setActive(true); onHover(true); };
  const mute = () => { if (videoRef.current) videoRef.current.muted = true; setActive(false); onHover(false); };
  const handleTap = (e: React.TouchEvent) => { e.preventDefault(); active ? mute() : unmute(); };
  return (
    <div className="relative overflow-hidden border border-slate-900 bg-slate-950" style={{ cursor: 'none' }} onMouseEnter={unmute} onMouseLeave={mute} onTouchStart={handleTap}>
      <div className={portrait ? 'aspect-[9/16]' : 'aspect-video'}>
        <video ref={videoRef} src={src} autoPlay loop muted playsInline disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback" className={`w-full h-full object-cover transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-20'}`} style={{ pointerEvents: 'none' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <span className="absolute top-3 left-3 text-[8px] font-mono text-slate-700 tracking-[0.2em] uppercase">{label}</span>
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ff33cc] animate-ping" />
          <span className="text-[8px] font-mono text-[#ff33cc]/70 uppercase tracking-widest">{active ? 'Audio On' : 'Live'}</span>
        </div>
        <p className="absolute bottom-3 left-3 right-3 text-[9px] font-mono text-slate-500 uppercase tracking-[0.1em] leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function EvidenceCard({ item, locked }: { item: EvidenceItem; locked?: boolean }) {
  return (
    <div className="relative overflow-hidden border border-slate-900 bg-slate-950 group">
      <div className={item.portrait ? 'aspect-[9/16]' : 'aspect-video'}>
        <img src={item.img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" style={locked ? { filter: 'blur(14px)', transform: 'scale(1.06)' } : {}} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <span className="absolute top-3 left-3 text-[8px] font-mono text-slate-700 tracking-[0.2em] uppercase">{item.label}</span>
        {locked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <Lock className="w-4 h-4 text-slate-500" />
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-[0.2em] text-center leading-loose">Level 2 Clearance<br/>Required</span>
          </div>
        )}
        <p className="absolute bottom-3 left-3 right-3 text-[9px] font-mono text-slate-500 uppercase tracking-[0.1em] leading-relaxed">{item.text}</p>
      </div>
    </div>
  );
}

function Evidence({ onVideoHover }: { onVideoHover: (active: boolean) => void }) {
  const level2: EvidenceItem[] = [
    { img: evidenceImg0, label: 'FILE-007', text: 'Session redacted. Clearance required.' },
    { img: evidenceImg1, portrait: true, label: 'FILE-008', text: 'Classified. Access denied.' },
    { img: evidenceImg2, label: 'FILE-009', text: 'File sealed. Awaiting authorisation.' },
    { img: evidenceImg3, label: 'FILE-010', text: 'Content restricted to verified members.' },
    { img: evidenceImg4, portrait: true, label: 'FILE-011', text: 'Elevate your clearance to unlock.' },
    { img: evidenceImg0, label: 'FILE-012', text: 'Undisclosed. Apply through the portal.' },
  ];
  return (
    <div className="bg-black min-h-screen pt-28 pb-32 px-6 md:px-12 lg:px-20">
      <div className="flex items-center gap-4 mb-10">
        <span className="text-slate-700 text-[9px] font-mono uppercase tracking-[0.3em] shrink-0">Level 1</span>
        <div className="flex-1 h-px bg-slate-900" />
        <span className="text-slate-700 text-[9px] font-mono uppercase tracking-[0.3em] shrink-0">Open Access</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <div className="md:col-span-2">
          <VideoCard src={file001} label="FILE-001" text="Subject 04 — result confirmed. No explanation on record." onHover={onVideoHover} />
        </div>
        <div className="flex flex-col gap-3">
          <VideoCard src={file002} label="FILE-002" text="The margin was not human." onHover={onVideoHover} />
          <VideoCard src={file003} label="FILE-003" text="Flawless execution. Every input accounted for." onHover={onVideoHover} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <VideoCard src={file004} label="FILE-004" text="They asked how. We stopped answering." onHover={onVideoHover} />
        <VideoCard src={file005} label="FILE-005" text="Sequence complete. Outcome expected." onHover={onVideoHover} />
        <VideoCard src={backgroundVideo} label="FILE-006" text="On record. Uncontested." onHover={onVideoHover} />
      </div>
      <div className="flex items-center gap-4 mt-20 mb-10">
        <span className="text-[#ff33cc]/30 text-[9px] font-mono uppercase tracking-[0.3em] shrink-0">Level 2</span>
        <div className="flex-1 h-px bg-slate-900" />
        <span className="text-[#ff33cc]/30 text-[9px] font-mono uppercase tracking-[0.3em] shrink-0">Restricted</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {level2.map((item, i) => <EvidenceCard key={i} item={item} locked />)}
      </div>
    </div>
  );
}

function Portal() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black text-white items-center justify-center">
      <div className="w-full max-w-sm p-8 border border-slate-900 bg-slate-950/50 backdrop-blur-md">
        <h2 className="text-sm font-mono text-white tracking-[0.2em] uppercase mb-8 text-center">Secure Link Authentication</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-slate-500 uppercase font-mono tracking-widest">Identifier</label>
            <input type="text" className="w-full bg-black border border-slate-800 p-3 text-sm text-[#ff33cc] font-mono focus:outline-none focus:border-[#ff33cc] transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-slate-500 uppercase font-mono tracking-widest">Passphrase</label>
            <input type="password" className="w-full bg-black border border-slate-800 p-3 text-sm text-[#ff33cc] font-mono focus:outline-none focus:border-[#ff33cc] transition-colors" />
          </div>
          <button className="w-full bg-white text-black font-mono text-xs tracking-widest uppercase py-4 hover:bg-[#ff33cc] transition-colors mt-4">Initialize Link</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [cursorVisible, setCursorVisible] = useState(false);
  const handleVideoHover = useCallback((active: boolean) => setCursorVisible(active), []);
  return (
    <HashRouter>
      <div className="bg-black min-h-screen text-slate-300 selection:bg-[#ff33cc] selection:text-black">
        <CustomCursor visible={cursorVisible} />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/evidence" element={<Evidence onVideoHover={handleVideoHover} />} />
          <Route path="/portal" element={<Portal />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
