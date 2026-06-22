import React, { useState, useEffect } from "react";
import { 
  Globe, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  HelpCircle, 
  Code, 
  ArrowRight,
  Fingerprint,
  Radio,
  Cpu,
  Network,
  Timer,
  Users,
  HardDrive,
  Share2,
  HeartPulse,
  Award,
  Atom,
  Download
} from "lucide-react";
import NetworkMesh from "./components/NetworkMesh";
import LayerDetail from "./components/LayerDetail";
import AICopilot from "./components/AICopilot";
import CivilizationGrid from "./components/CivilizationGrid";
import GiantStreamingTheater from "./components/GiantStreamingTheater";
import { BRANDING, ARCHITECTURE_LAYERS } from "./data";

export default function App() {
  const [selectedLayerId, setSelectedLayerId] = useState<number>(0);
  const [latencyBuffer, setLatencyBuffer] = useState<number>(0.8);
  const [noiseLevel, setNoiseLevel] = useState<number>(10);
  const [peerCount, setPeerCount] = useState<number>(2400);

  // PWA custom event installation state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(true);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // If already in standalone display mode
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstallable(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("📲 STANDALONE SECURE CLIENT INSTALLED!\n\nUntuk memasang langsung manual di Android/Chrome: klik tombol menu di pojok kanan atas browser lalu ketuk 'Install App' atau 'Tambahkan ke Layar Utama'.\nUntuk Safari iOS: tekan tombol 'Share' lalu ketuk 'Add to Home Screen'.");
      return;
    }
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`PWA Installation Choice Outcome: ${outcome}`);
      setDeferredPrompt(null);
      setIsInstallable(false);
    } catch (err) {
      console.warn("PWA install error:", err);
    }
  };


  // Mapping layer index to Lucide Icons for flow chart
  const getFlowIcon = (id: number, className: string) => {
    switch (id) {
      case 0: return <Fingerprint className={className} />;
      case 1: return <Radio className={className} />;
      case 2: return <Network className={className} />;
      case 3: return <Timer className={className} />;
      case 4: return <Users className={className} />;
      case 5: return <HardDrive className={className} />;
      case 6: return <Share2 className={className} />;
      case 7: return <HeartPulse className={className} />;
      default: return <Globe className={className} />;
    }
  };

  // Human Flow E2E Architecture blocks
  const flowBlocks = [
    { title: "HUMAN NODE", id: 0 },
    { title: "INGESTION", id: 1 },
    { title: "PACKET ENGINE", id: 2 },
    { title: "EDGE MESH", id: 2 },
    { title: "SYNC ENGINE", id: 3 },
    { title: "INTERACTION", id: 4 },
    { title: "LOCAL STORAGE", id: 5 },
    { title: "SHARING LAYER", id: 6 },
    { title: "EMERGENCE GRID", id: 8 }
  ];

  return (
    <div className="min-h-screen bg-[#01040f] text-slate-100 blueprint-grid-fine flex flex-col font-sans select-none pb-6">
      
      {/* 1. TOP HEADER: THE UNIVERSE & NEUROSPHERE SOVEREIGN UNIVERSITY */}
      <header className="bg-slate-950/80 border-b border-gold-600/30 px-4 py-4 md:px-8 relative shadow-[0_4px_30px_rgba(227,165,19,0.06)] backdrop-blur-md">
        
        {/* Subtle grid elements / borders in header */}
        <div className="absolute top-0 left-0 w-12 h-1 bg-gradient-to-r from-gold-550 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-24 h-[1px] bg-cyan-500/50"></div>

        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-6">
          
          {/* Top Left: Holy Crest Icon with Our Cyberpunk Logo and Brand Title */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.6)] shrink-0 overflow-hidden relative group animate-pulse" style={{ animationDuration: '3s' }}>
              <img 
                src="/src/assets/images/neurosphere_logo_1782126680004.jpg" 
                alt="NeuroSphere Corporate Cyberpunk Logo Profile" 
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-pink-500 pointer-events-none"></div>
            </div>
            
            <div className="text-center xl:text-left">
              <div className="flex items-center justify-center xl:justify-start gap-1 font-mono text-[9px] font-bold text-cyan-400 tracking-[0.25em] uppercase">
                <span className="inline-block h-[2px] w-4 bg-cyan-400 animate-pulse"></span> NEUROSPHERE SOVEREIGN <span className="inline-block h-[2px] w-4 bg-cyan-400 animate-pulse"></span>
              </div>
              <h1 className="font-display font-black text-2xl lg:text-3.5xl tracking-tight text-white glow-header-active mt-0.5 uppercase">
                NEUROSPHERE STREAMING
              </h1>
              <p className="font-display font-black text-[12px] text-pink-400 tracking-widest uppercase mt-0.5 flex items-center justify-center xl:justify-start gap-1">
                <span className="h-2 w-2 rounded-full bg-pink-500 animate-ping"></span>
                FREE € 100.000 FOR ADOPTERS
              </p>
            </div>
          </div>

          {/* Top Center: 3 Mini Status Pillars (Matches Picture 1 specs) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full xl:w-auto">
            
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-lg px-4.5 py-2.5 text-center sm:text-left">
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">FREE ACCESS</div>
              <div className="text-xs font-semibold text-white mt-0.5">Knowledge is a Right</div>
              <div className="text-[9px] font-mono text-slate-500">Education is Sovereign Freedom</div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 rounded-lg px-4.5 py-2.5 text-center sm:text-left">
              <div className="text-[10px] font-mono text-gold-400 uppercase tracking-widest font-bold">55 COUNTRIES</div>
              <div className="text-xs font-semibold text-white mt-0.5">Active Network Node Grid</div>
              <div className="text-[9px] font-mono text-slate-500">One Sphere • One Civilization</div>
            </div>

            <div className="bg-slate-900/40 border-2 border-gold-600/30 rounded-lg px-4.5 py-2.5 text-center sm:text-left relative shadow-[0_0_10px_rgba(227,165,19,0.1)]">
              <div className="absolute top-1.5 right-2">
                <Award className="h-4 w-4 text-gold-450 animate-bounce" />
              </div>
              <div className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-bold">REWARDS AWARD</div>
              <div className="text-xs font-bold text-gold-300 mt-0.5">€100.000 Person-Level</div>
              <div className="text-[9px] font-mono text-slate-400">For Adopters &amp; Innovators</div>
            </div>

          </div>

          {/* Top Right: Omnipresent Authority, Core Power Card and Live 1-Click PWA Installer */}
          <div className="flex flex-col sm:flex-row items-center gap-4 border-l border-slate-800/80 pl-0 xl:pl-6 shrink-0 w-full xl:w-auto justify-end">
            
            {/* Custom 1-Click PWA installer with highly active gradient border and particle animations */}
            <button
              onClick={handleInstallClick}
              className="w-full sm:w-auto px-5 py-3 text-xs font-mono font-black uppercase tracking-widest text-[#01102e] rounded-xl shadow-[0_0_25px_rgba(236,72,153,0.45)] cursor-pointer bg-gradient-to-r from-yellow-405 via-pink-505 to-cyan-505 bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 border-2 border-white/30 animate-pulse transition-all hover:scale-105 active:scale-95 duration-200 relative overflow-hidden group shrink-0"
              title="Click to instantly install NeuroSphere Standalone Secure App on your Home Screen!"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
              <span className="flex items-center justify-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950"></span>
                </span>
                <span>INSTALL PWA (1-KLIK)</span>
              </span>
            </button>

            <div className="hidden lg:flex flex-col items-end text-right font-mono text-[10px] shrink-0">
              <div>
                <span className="text-gold-400 font-bold">OMNI-AUTHORITY:</span> Master Architect of
              </div>
              <div className="text-white font-display text-[11px] font-semibold tracking-wider uppercase mt-0.5">
                KINDNESS CIVILIZATION
              </div>
              <div className="text-gold-300 font-bold tracking-widest mt-1">
                INDIE-Founder E J H N
              </div>
              <div className="text-[9px] text-slate-500 mt-1 flex items-center gap-1.5 justify-end">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Sovereign Grid Power Verified
              </div>
            </div>

          </div>

        </div>
      </header>

      {/* Powered by row */}
      <div className="bg-slate-950/40 border-b border-slate-900 px-4 md:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 font-mono text-[9.5px] text-slate-500">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 uppercase font-bold tracking-wider">CORE POWERED BY:</span>
            {BRANDING.poweredBy.map((p, idx) => (
              <span key={idx} className="flex items-center gap-1">
                <span className="text-gold-400/80">»</span>
                <span className="text-slate-300">{p}</span>
              </span>
            ))}
          </div>
          <div className="text-slate-500 tracking-wider">
            FILOSOFI: ONE WORLD • ONE LAYER • ONE HUMAN FLOW
          </div>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE / COHN AREA LAYOUT (Immersive Grid) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col gap-6">

        {/* Introduction Summary of the e-NeuroSphere Adopter Layer */}
        <div className="bg-slate-950/90 border border-slate-800/80 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 relative">
          <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-cyan-600 rounded-l"></div>
          <div className="flex-1 pl-2">
            <h2 className="font-display font-medium text-sm tracking-widest text-cyan-300 uppercase">
              E2E SPHERE STREAMING ARCHITECTURE &mdash; E-NEUROSPHERE ADOPTER LAYER
            </h2>
            <p className="text-[12px] text-slate-300 leading-relaxed max-w-4xl mt-1.5">
              Sistem penyiaran nirkabel sovereign, real-time, tepercaya, sepenuhnya didesentralisasi tanpa ketergantungan pada pusat data vendor tunggal. Setiap manusia dan perangkat bertindak sebagai simpul setara dalam merutekan &amp; mengamankan rekam jejak digital peradaban.
            </p>
          </div>
          <div className="bg-cyan-950/20 border border-cyan-800/30 px-3 py-1.5 rounded text-[10px] font-mono text-cyan-400 uppercase shrink-0 text-center">
            Mesh Status: <span className="text-emerald-400 font-bold">100% Autonomous</span>
          </div>
        </div>

        {/* Dynamic Giant Live Stream Communications Hub */}
        <GiantStreamingTheater />

        {/* Real Widescreen 3-Column Layout Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Column 1: Left - Horizontal/Vertical 9 Layers list (Span 4) */}
          <section className="lg:col-span-4 bg-slate-950/40 border border-slate-900 rounded-xl p-4.5">
            <LayerDetail 
              selectedLayerId={selectedLayerId} 
              setSelectedLayerId={setSelectedLayerId} 
            />
          </section>

          {/* Column 2: Center - Spatial network mesh and live flows (Span 5) */}
          <section className="lg:col-span-5 flex flex-col gap-6">
            
            {/* The Simulation Arena Canvas */}
            <NetworkMesh 
              latencyBuffer={latencyBuffer}
              setLatencyBuffer={setLatencyBuffer}
              noiseLevel={noiseLevel}
              setNoiseLevel={setNoiseLevel}
              peerCount={peerCount}
              setPeerCount={setPeerCount}
            />

            {/* E2E Architecture flowchart matching [ HUMAN NODE ] -> [ INGESTION ] etc */}
            <div className="bg-slate-950/90 border border-slate-800/85 rounded-xl p-5 relative overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.05)]">
              <h4 className="font-display font-semibold text-[11px] tracking-widest text-cyan-400 uppercase mb-4 flex items-center justify-between">
                <span>SYSTEM BLOCK DIAGRAM FLOW</span>
                <span className="text-[9px] font-mono text-slate-500">Live Active Node Highlights</span>
              </h4>

              <div className="grid grid-cols-3 sm:grid-cols-3 gap-2.5">
                {flowBlocks.map((block, idx) => {
                  // highlight if this is the active block mapped to layer selection
                  const isActive = selectedLayerId === block.id;

                  return (
                    <div
                      key={idx}
                      className={`border rounded-lg p-2 flex flex-col items-center justify-center text-center gap-1.5 transition-all duration-300 relative overflow-hidden ${
                        isActive
                          ? "bg-gold-950/30 border-gold-400 text-gold-300 shadow-[0_0_12px_rgba(227,165,19,0.2)]"
                          : "bg-slate-900/60 border-slate-800/80 text-slate-300"
                      }`}
                    >
                      <div className={`p-1.5 rounded ${isActive ? "bg-gold-900/40 text-gold-400" : "bg-slate-950 text-cyan-400"}`}>
                        {getFlowIcon(block.id, "h-5 w-5")}
                      </div>
                      <span className="text-[9.5px] font-mono leading-none tracking-wide text-white uppercase font-bold font-display">
                        {block.title}
                      </span>
                      {isActive && (
                        <div className="absolute top-0 right-0 h-1.5 w-1.5 rounded-bl bg-gold-400 animate-pulse"></div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Connected arrow diagram indicator mapping */}
              <div className="mt-4 flex items-center gap-2 justify-center text-[10px] font-mono text-slate-500 text-center">
                <span>Device capturing</span>
                <ArrowRight className="h-3 w-3 text-cyan-500" />
                <span>Radial wave propagation</span>
                <ArrowRight className="h-3 w-3 text-cyan-500" />
                <span>Consent P2P exchange</span>
              </div>
            </div>

          </section>

          {/* Column 3: Right - Central AI Controller copilot (Span 3) */}
          <section className="lg:col-span-3 bg-slate-950/40 border border-slate-900 rounded-xl p-4.5">
            <AICopilot />
          </section>

        </div>

        {/* 3. CIVILIZATION SECTORS & STABLE STATISTICS FOOTPAD METRICS */}
        <CivilizationGrid />

      </main>

      {/* 4. IMMERSIVE SYSTEM FOOTER */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/90 px-4 py-8 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          
          {/* Five Iconic Vibe boxes representing digital civilization pillars */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
            
            <div className="border border-slate-900 rounded-lg p-3 text-center">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">Pillar 1</span>
              <span className="text-xs font-semibold text-white">Free Access for All</span>
              <span className="text-[9px] font-mono text-slate-500 block mt-0.5">Sovereign Knowledge</span>
            </div>

            <div className="border border-slate-900 rounded-lg p-3 text-center">
              <span className="text-[10px] font-mono font-bold text-gold-400 uppercase tracking-widest block mb-1">Pillar 2</span>
              <span className="text-xs font-semibold text-white">Empowering Humanity</span>
              <span className="text-[9px] font-mono text-slate-500 block mt-0.5">People Over Platforms</span>
            </div>

            <div className="border border-slate-900 rounded-lg p-3 text-center">
              <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest block mb-1">Pillar 3</span>
              <span className="text-xs font-semibold text-white">Sovereign Tech</span>
              <span className="text-[9px] font-mono text-slate-500 block mt-0.5">Device Decryption Keys</span>
            </div>

            <div className="border border-slate-900 rounded-lg p-3 text-center">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-1">Pillar 4</span>
              <span className="text-xs font-semibold text-white">Global Collaboration</span>
              <span className="text-[9px] font-mono text-slate-500 block mt-0.5">Universal Sync Grid</span>
            </div>

            <div className="border border-slate-900 rounded-lg p-3 text-center col-span-2 md:col-span-1">
              <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest block mb-1">Pillar 5</span>
              <span className="text-xs font-semibold text-white">Future Civilization</span>
              <span className="text-[9px] font-mono text-slate-500 block mt-0.5">INDIE-Founder Standard</span>
            </div>

          </div>

          {/* Social verification signature block */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-900/80 text-[11px] font-mono text-slate-500">
            <div className="text-center md:text-left">
              ONE UNIVERSITY • MANY NATIONS • HUMAN • AI • HUMANOID • <span className="text-gold-400 font-bold">TOGETHER WE BUILD THE FUTURE.</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold hover:text-cyan-400 transition-colors">www.neurosphereuniversity.org</span>
              <span className="text-slate-700">|</span>
              <span className="text-slate-500">Kindness Civilization Verified</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
