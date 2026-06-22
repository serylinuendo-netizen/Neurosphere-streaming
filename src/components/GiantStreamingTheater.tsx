import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Tv, 
  Maximize2, 
  Minimize2, 
  Users, 
  Globe, 
  Sparkles, 
  Radio, 
  Volume2, 
  VolumeX, 
  Monitor, 
  MessageSquare, 
  Heart, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Play,
  Pause,
  RotateCcw,
  Volume1,
  Sparkle,
  Zap,
  Lock,
  Cpu,
  Layers,
  Activity
} from "lucide-react";

interface SubScreen {
  id: string;
  name: string;
  region: string;
  type: string;
  status: string;
  avatarUrl: string;
  color: string;
  count: number;
}

interface TrailerScene {
  id: number;
  timeStart: number;
  timeEnd: number;
  title: string;
  subtitle: string;
  narratorText: string;
  visualEffect: "cyber-earth" | "nodes-lightning" | "edge-broadcaster" | "ultra-scale" | "consent-shield" | "grand-finale";
  description: string;
  highlightWords: string[];
}

export default function GiantStreamingTheater() {
  const [clickCount, setClickCount] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeStream, setActiveStream] = useState<string>("PROMO_TRAILER"); // Default to our new amazing promo video
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [simulatedViewers, setSimulatedViewers] = useState(14820);
  const [simulatedMs, setSimulatedMs] = useState(42);
  const [streamMessage, setStreamMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ user: string; text: string; time: string }>>([
    { user: "Wira_ID", text: "Protokol IID lancar jaya dari Jakarta!", time: "10:04" },
    { user: "Hans_DE", text: "Incredibly low adaptive latency here in Frankfurt.", time: "10:05" },
    { user: "Sakura_JP", text: "Zero packet loss using the new P2P self-healing.", time: "10:05" }
  ]);

  // 1-minute Promosi Video states
  const [trailerPlaying, setTrailerPlaying] = useState(true);
  const [trailerTime, setTrailerTime] = useState(0); // 0 to 60 seconds
  const [lastSpokenSceneId, setLastSpokenSceneId] = useState<number | null>(null);
  const [showVocalStatus, setShowVocalStatus] = useState<string>("Synthetic Narration Loaded");
  const [neonTheme, setNeonTheme] = useState<"cyan-pink" | "golden-matrix" | "acid-green">("cyan-pink");

  // Keep ref to avoid closure issues in loops
  const isAudioMutedRef = useRef(isAudioMuted);
  useEffect(() => {
    isAudioMutedRef.current = isAudioMuted;
  }, [isAudioMuted]);

  // Define 60-second scenes based on the exact script requested by the user
  const trailerScenes: TrailerScene[] = [
    {
      id: 1,
      timeStart: 0,
      timeEnd: 8,
      title: "WELCOME TO THE NEW COMMUNICATION ERA",
      subtitle: "e-NeuroSphere: Connect people, not vendor servers.",
      narratorText: "Welcome to a new era of communication... where the world is no longer connected by servers... but by people.",
      visualEffect: "cyber-earth",
      description: "Opening Visual: Earth made of light nodes, flowing data sphere in deep cyberpunk coordinates.",
      highlightWords: ["era", "people", "connected"]
    },
    {
      id: 2,
      timeStart: 8,
      timeEnd: 20,
      title: "DECENTRALIZED STREAM MESH",
      subtitle: "Autonomous routing powered by state-of-the-art e-NeuroSphere mechanics.",
      narratorText: "Introducing e-NeuroSphere... a decentralized streaming ecosystem powered by real-time Sphere technology.",
      visualEffect: "nodes-lightning",
      description: "Visual: Multi-regional local peer devices lighting up in deep neon blue and glowing violet rays.",
      highlightWords: ["decentralized", "Sphere", "real-time"]
    },
    {
      id: 3,
      timeStart: 20,
      timeEnd: 35,
      title: "EVERY HUMAN, AN INTELLIGENT NODE",
      subtitle: "No single point of failure. Massive client-to-client bandwidth replication.",
      narratorText: "Every device becomes a node. Every user becomes a broadcaster. No central server. No single point of control. Only edge-to-edge intelligent connectivity.",
      visualEffect: "edge-broadcaster",
      description: "Visual: Users broadcasting live raw feeds distributed across thousands of dynamic active branches.",
      highlightWords: ["device", "broadcaster", "connectivity", "no central server"]
    },
    {
      id: 4,
      timeStart: 35,
      timeEnd: 48,
      title: "10,000+ CONCURRENT LIVE INTERACTION",
      subtitle: "High-scale real-time telemetry, spatial sound synchronization, independent validation lanes.",
      narratorText: "From 100 to 10,000 participants... Sphere enables ultra-scale interaction with real-time voice, video, chat, and collaboration tools—seamlessly synchronized.",
      visualEffect: "ultra-scale",
      description: "Visual: Giant holographic matrix cells representing high-fidelity telecommunications.",
      highlightWords: ["ultra-scale", "synchronized", "collaboration"]
    },
    {
      id: 5,
      timeStart: 48,
      timeEnd: 56,
      title: "END-TO-END DECRYPTED PRIVACY CAPABILITY",
      subtitle: "Zero third-party telemetry. Consent keys generated exclusively on edge hardware.",
      narratorText: "Your data stays yours. Stored locally. Encrypted. Shared only with your consent—directly peer-to-peer.",
      visualEffect: "consent-shield",
      description: "Visual: Golden and green cryptographic lock gates lighting up inside the decentralized ledger.",
      highlightWords: ["yours", "encrypted", "peer-to-peer"]
    },
    {
      id: 6,
      timeStart: 56,
      timeEnd: 60,
      title: "ONE WORLD. ONE SPHERE. ONE HUMAN FLOW.",
      subtitle: "Sovereign communication grid, free access for all eternity.",
      narratorText: "e-NeuroSphere... One World. One Sphere. One Human Flow.",
      visualEffect: "grand-finale",
      description: "Visual: Grand glowing sphere vector alignment on a high-contrast futuristic starfield overlay.",
      highlightWords: ["NeuroSphere", "grand-finale", "Human Flow"]
    }
  ];

  // Retrieve current scene based on seconds elapsed
  const currentScene = trailerScenes.find(s => trailerTime >= s.timeStart && trailerTime <= s.timeEnd) || trailerScenes[0];

  // TTS Voice generator with female filter priority
  const speakNarratorPhrase = (phrase: string) => {
    if (isAudioMutedRef.current) return;
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel(); // kill overlapping speech
      const utterance = new SpeechSynthesisUtterance(phrase);
      
      // Try to find a nice English female narrator voice
      const voices = window.speechSynthesis.getVoices();
      const englishFemaleVoice = voices.find(v => 
        (v.lang.startsWith("en-") || v.lang.startsWith("en_")) && 
        (v.name.toLowerCase().includes("female") || 
         v.name.toLowerCase().includes("zira") || 
         v.name.toLowerCase().includes("samantha") || 
         v.name.toLowerCase().includes("google us english") ||
         v.name.toLowerCase().includes("karen") ||
         v.name.toLowerCase().includes("hazel") ||
         v.name.toLowerCase().includes("tessa"))
      );

      if (englishFemaleVoice) {
        utterance.voice = englishFemaleVoice;
      } else {
        // Fallback to any English voice
        const engVoice = voices.find(v => v.lang.startsWith("en"));
        if (engVoice) utterance.voice = engVoice;
      }

      utterance.rate = 1.05; // clear natural narration speed
      utterance.pitch = 1.1; // soft elegant narrator tone
      window.speechSynthesis.speak(utterance);
      setShowVocalStatus(`Voice Narration Synthesized: ${utterance.voice ? utterance.voice.name : "Default Eng"}`);
    } catch (e) {
      console.warn("SpeechSynthesis error:", e);
      setShowVocalStatus("Speech API Unavailable inside iframe restrictions, running on-screen visual audio waves.");
    }
  };

  // Keep Speech voices loaded
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  // Monitor scene changes to trigger voiceovers
  useEffect(() => {
    if (activeStream === "PROMO_TRAILER" && trailerPlaying) {
      if (currentScene.id !== lastSpokenSceneId) {
        setLastSpokenSceneId(currentScene.id);
        speakNarratorPhrase(currentScene.narratorText);
      }
    }
  }, [currentScene.id, activeStream, trailerPlaying]);

  // Video time progression interval loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeStream === "PROMO_TRAILER" && trailerPlaying) {
      interval = setInterval(() => {
        setTrailerTime((prev) => {
          if (prev >= 60) {
            return 0; // Seamless loop!
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeStream, trailerPlaying]);

  // Handle absolute click count tracking
  // 2 clicks = Fullscreen
  // 3 clicks = Regular screen
  const handleScreenClick = () => {
    setClickCount((prev) => {
      const nextCount = prev + 1;
      
      if (nextCount === 2) {
        setIsFullScreen(true);
      } else if (nextCount === 3) {
        setIsFullScreen(false);
        return 0; // Reset after 3 clicks
      }
      return nextCount;
    });

    // Reset single click timer if no subsequent click was made in 1200ms
    setTimeout(() => {
      setClickCount((current) => {
        if (current === 1) return 0;
        return current;
      });
    }, 1200);
  };

  // Pulse viewer stats
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedViewers(v => v + Math.floor(Math.random() * 9) - 4);
      setSimulatedMs(v => Math.max(12, v + Math.floor(Math.random() * 7) - 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!streamMessage.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { user: "You_Adopter", text: streamMessage, time: "Just Now" }
    ]);
    setStreamMessage("");
  };

  const handleResetTrailer = () => {
    setTrailerTime(0);
    setLastSpokenSceneId(null);
    speakNarratorPhrase(trailerScenes[0].narratorText);
  };

  const subScreens: SubScreen[] = [
    { 
      id: "PROMO_TRAILER", 
      name: "🔥 1-MIN PROMOTIONAL TRAILER", 
      region: "E-NEUROSPHERES-INT", 
      type: "Cyberpunk Promosi Movie", 
      status: "AI_AUDIO_READY",
      avatarUrl: "🪐", 
      color: "border-yellow-500 text-yellow-300", 
      count: 9800
    },
    { 
      id: "GLOBAL_STAGE", 
      name: "GLOBAL STAGE SOURCE", 
      region: "FRA-STAGE-01", 
      type: "Sovereign Broadcaster", 
      status: "RADIAL_PROPAGATION",
      avatarUrl: "🌌", 
      color: "border-purple-500 text-purple-300", 
      count: 8500 
    },
    { 
      id: "COM_CLUSTER", 
      name: "KOMUNITAS CLUSTER", 
      region: "IDN-REGION-04", 
      type: "Family & Civic Group", 
      status: "INTERACTIVE_MESH",
      avatarUrl: "🧑‍🤝‍🧑", 
      color: "border-cyan-500 text-cyan-300", 
      count: 420 
    },
    { 
      id: "USER_SPOTLIGHT", 
      name: "USER SPOTLIGHT NODE", 
      region: "SGP-SPOT-82", 
      type: "Active Speaker Target", 
      status: "FOCUS_COMPRESSED",
      avatarUrl: "🦊", 
      color: "border-gold-500 text-gold-300", 
      count: 89 
    }
  ];

  // Helper theme color classes
  const getThemeClasses = () => {
    switch (neonTheme) {
      case "golden-matrix":
        return { 
          accent: "text-amber-400", 
          border: "border-amber-500/50", 
          glow: "shadow-[0_0_15px_rgba(245,158,11,0.25)]",
          bg: "bg-amber-950/10",
          particle: "bg-amber-500"
        };
      case "acid-green":
        return { 
          accent: "text-emerald-400", 
          border: "border-emerald-500/50", 
          glow: "shadow-[0_0_15px_rgba(16,185,129,0.25)]",
          bg: "bg-emerald-950/10",
          particle: "bg-emerald-500"
        };
      default: // cyan-pink
        return { 
          accent: "text-cyan-400", 
          border: "border-cyan-500/50", 
          glow: "shadow-[0_0_15px_rgba(6,182,212,0.25)]",
          bg: "bg-[#010a21]",
          particle: "bg-cyan-500"
        };
    }
  };

  const themeVars = getThemeClasses();

  return (
    <div 
      className={`transition-all duration-500 relative ${
        isFullScreen 
          ? "fixed inset-0 z-50 bg-[#01040f] p-4 md:p-8 flex flex-col justify-between overflow-y-auto" 
          : "w-full bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-4 md:p-6 relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] blueprint-grid"
      }`}
    >
      {/* Absolute high-fidelity background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      {/* Screen Frame Border Lines for Giant visual */}
      <div className="absolute top-0 left-0 w-16 h-[2px] bg-cyan-400"></div>
      <div className="absolute top-0 left-0 w-[2px] h-16 bg-cyan-400"></div>
      <div className="absolute bottom-0 right-0 w-16 h-[2px] bg-pink-500"></div>
      <div className="absolute bottom-0 right-0 w-[2px] h-16 bg-pink-500"></div>

      {/* Giant Theater Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-900 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-cyan-900/50 to-blue-900/50 flex items-center justify-center border border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.3)] shrink-0">
            <Tv className="h-5 w-5 text-cyan-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] bg-pink-950/60 text-pink-400 border border-pink-800/80 px-2 py-0.5 rounded-full font-bold animate-pulse">
                🎙️ BRAND PROMOTION VIDEO SCREEN
              </span>
              <span className="text-[10px] font-mono text-slate-500">IID: SOVEREIGN-1MIN-PROMO</span>
            </div>
            <h2 className="font-display font-black text-lg md:text-xl text-white tracking-wide mt-1">
              GIANT PORTAL MEDIA &mdash; e-NEUROSPHERE LAUNCH TRAILER
            </h2>
          </div>
        </div>

        {/* Modular transparent buttons/controls with high-fidelity glassmorphism */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Cyberpunk Theme Switcher */}
          {activeStream === "PROMO_TRAILER" && (
            <div className="flex items-center gap-1 bg-slate-900/40 border border-white/5 rounded-lg px-2 py-1 text-[10px] font-mono">
              <span className="text-slate-500 mr-1">NEON:</span>
              <button 
                onClick={() => setNeonTheme("cyan-pink")}
                className={`w-3.5 h-3.5 rounded-full bg-cyan-500 border ${neonTheme === "cyan-pink" ? "border-white" : "border-transparent"}`}
                title="Cyan Pink"
              />
              <button 
                onClick={() => setNeonTheme("golden-matrix")}
                className={`w-3.5 h-3.5 rounded-full bg-amber-500 border ${neonTheme === "golden-matrix" ? "border-white" : "border-transparent"}`}
                title="Golden Matrix"
              />
              <button 
                onClick={() => setNeonTheme("acid-green")}
                className={`w-3.5 h-3.5 rounded-full bg-emerald-500 border ${neonTheme === "acid-green" ? "border-white" : "border-transparent"}`}
                title="Acid Green"
              />
            </div>
          )}

          {/* Audio Indicator */}
          <button 
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="px-3 py-1.5 rounded-lg backdrop-blur-md bg-slate-900/40 border border-white/10 text-white hover:bg-slate-900/60 transition-all font-mono text-[10.5px] flex items-center gap-1.5 cursor-pointer"
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="h-3.5 w-3.5 text-pink-400" />
                <span>NARRATOR: OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 text-cyan-400 animate-bounce" />
                <span>NARRATOR: ON (FEMALE)</span>
              </>
            )}
          </button>

          {/* Quick Double Click Indicator */}
          <div className="px-3 py-1.5 rounded-lg backdrop-blur-md bg-slate-900/50 border border-white/5 text-[10.5px] font-mono text-slate-300 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-455 bg-cyan-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>CLICKS: <strong className="text-cyan-400">{clickCount}/3</strong></span>
            <span className="text-slate-500">|</span>
            <span className="text-[10px] text-pink-300 hidden sm:inline">2x Maximize | 3x Shrink</span>
          </div>

          {/* Manual Maximize Button */}
          <button 
            onClick={handleScreenClick}
            className="p-1.5 rounded-lg backdrop-blur-md bg-slate-905 bg-slate-900/40 border border-white/10 text-white hover:bg-slate-900/60 transition-all cursor-pointer flex items-center gap-1 text-[11px] font-mono"
            title="Layar Penuh (2 Klik) / Kecilkan (3 Klik)"
          >
            {isFullScreen ? <Minimize2 className="h-4 w-4 text-pink-400" /> : <Maximize2 className="h-4 w-4 text-cyan-400" />}
            <span>{isFullScreen ? "SHRINK" : "EXPAND"}</span>
          </button>
        </div>
      </div>

      {/* Main Large Simulated TV Theater Video Platform */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-stretch">
        
        {/* Left 3/4: Super Big Screen Viewport */}
        <div 
          onClick={handleScreenClick}
          className="xl:col-span-3 aspect-[16/9] bg-[#020512] border border-slate-900 rounded-xl relative overflow-hidden flex flex-col justify-end group shadow-[0_0_35px_rgba(0,0,0,0.8)] cursor-pointer"
        >
          {/* Ambient Video Visualizer / High Fidelity Graphics */}
          <div className="absolute inset-0 blueprint-grid opacity-20 group-hover:opacity-30 transition-opacity"></div>
          
          {/* Neon scanline retro screen grids matching requested cyberpunk aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e3752]/5 via-[#01040f]/0 to-[#270030]/10 pointer-events-none z-10"></div>
          <div className="absolute inset-[1px] border border-cyan-500/10 rounded-xl pointer-events-none z-10"></div>

          {/* RENDER ACTIVE SCREEN FEED OR PROMOTIONAL TRAILER */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            
            {/* 1. PROMOTIONAL TRAILER CORE RENDERING (THE 1-MIN MOVIE SIMULATION) */}
            {activeStream === "PROMO_TRAILER" && (
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentScene.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full flex flex-col items-center justify-between py-6 text-center relative"
                >
                  {/* Glowing background matrix lights representing current scenes */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
                    <div className="w-[450px] h-[300px] rounded-full filter blur-[130px] mix-blend-screen bg-gradient-to-tr from-cyan-500/10 via-pink-500/5 to-purple-500/10 animate-pulse"></div>
                  </div>

                  {/* Scene Counter & Narrative Stamp Header */}
                  <div className="w-full px-6 flex items-center justify-between text-[11px] font-mono text-slate-500 z-10">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-pink-500 animate-ping"></span>
                      <span className="text-pink-400 font-bold">SCENE 0{currentScene.id}/06</span>
                      <span className="text-slate-700">|</span>
                      <span>TIME STAMP: {trailerTime}s / 60s</span>
                    </div>
                    <div className="text-[10px] text-cyan-400 tracking-wider bg-cyan-950/40 border border-cyan-800/30 px-2 py-0.5 rounded uppercase">
                      PROMOTING: {currentScene.visualEffect.replace("-", " ")}
                    </div>
                  </div>

                  {/* HIGH FIDELITY CINEMATIC NEON CYBERPUNK SYMBOLICS */}
                  <div className="my-auto flex flex-col items-center justify-center relative w-full max-w-2xl px-4">
                    
                    {/* SCENE 1 EFFECT: Cyber-Earth Wireframe map */}
                    {currentScene.visualEffect === "cyber-earth" && (
                      <div className="relative h-44 flex items-center justify-center">
                        <div className="absolute w-28 h-28 rounded-full border-2 border-dashed border-cyan-550 border-cyan-500/30 animate-spin" style={{ animationDuration: '24s' }}></div>
                        <div className="absolute w-36 h-36 rounded-full border border-sky-400/20 animate-pulse"></div>
                        <Globe className="h-16 w-16 text-cyan-450 text-cyan-400 animate-bounce drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]" />
                        
                        {/* Radial propagation ring */}
                        <div className="absolute w-52 h-2 bg-gradient-to-r from-transparent via-pink-500/60 to-transparent blur-md animate-pulse"></div>
                      </div>
                    )}

                    {/* SCENE 2 EFFECT: Nodes lighting up peer-to-peer */}
                    {currentScene.visualEffect === "nodes-lightning" && (
                      <div className="relative h-44 flex items-center justify-center w-80">
                        {/* Core Server Free Node cluster */}
                        {[
                          { top: "10%", left: "15%", icon: "💻", delay: "0s" },
                          { top: "25%", left: "80%", icon: "📱", delay: "0.5s" },
                          { top: "80%", left: "20%", icon: "🎥", delay: "1s" },
                          { top: "75%", left: "70%", icon: "💾", delay: "1.5s" },
                          { top: "45%", left: "45%", icon: "📡", delay: "0.2s" }
                        ].map((node, nIdx) => (
                          <motion.div
                            key={nIdx}
                            initial={{ scale: 0 }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 3, delay: nIdx * 0.3 }}
                            className="absolute bg-slate-900 border border-cyan-400 p-2 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.4)] text-[11px]"
                            style={{ top: node.top, left: node.left }}
                          >
                            {node.icon}
                          </motion.div>
                        ))}
                        {/* Connecting lasers vector lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
                          <line x1="25%" y1="20%" x2="45%" y2="50%" stroke="#06b6d4" strokeWidth="1" strokeDasharray="5,5" />
                          <line x1="80%" y1="35%" x2="45%" y2="50%" stroke="#d946ef" strokeWidth="1.5" />
                          <line x1="20%" y1="80%" x2="45%" y2="45%" stroke="#10b981" strokeWidth="1" />
                          <line x1="70%" y1="75%" x2="45%" y2="50%" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" />
                        </svg>
                        <Radio className="h-10 w-10 text-pink-400 animate-ping absolute" />
                      </div>
                    )}

                    {/* SCENE 3 EFFECT: Device Broadcaster wave-front propagation */}
                    {currentScene.visualEffect === "edge-broadcaster" && (
                      <div className="relative h-44 flex items-center justify-center">
                        <div className="absolute w-44 h-44 rounded-full border border-pink-500/20 animate-ping"></div>
                        <div className="absolute w-28 h-28 rounded-full border border-pink-500/30 animate-pulse"></div>
                        <div className="p-4 rounded-2xl bg-pink-950/20 border-2 border-pink-500/50 shadow-[0_0_20px_rgba(217,70,239,0.4)] relative">
                          <Users className="h-10 w-10 text-white animate-bounce" />
                        </div>
                        {/* Broadcaster particles */}
                        <div className="absolute top-[20%] left-[-10%] text-[10px] font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-800/50 p-1 px-2 rounded">USER BROADCAST 101</div>
                        <div className="absolute bottom-[20%] right-[-15%] text-[10px] font-mono text-pink-300 bg-pink-950/70 border border-pink-800/50 p-1 px-2 rounded">PEER CONSUMER 993</div>
                      </div>
                    )}

                    {/* SCENE 4 EFFECT: Ultra-Scale grid arrays */}
                    {currentScene.visualEffect === "ultra-scale" && (
                      <div className="grid grid-cols-4 gap-2 h-32 w-72 p-2 bg-slate-900/40 border border-slate-800 rounded-xl relative overflow-hidden">
                        {[...Array(12)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`rounded border flex items-center justify-center text-[10px] font-mono uppercase bg-slate-950/80 transition-colors ${
                              i % 3 === 0 ? "border-emerald-555 border-emerald-500/40 text-emerald-300" : "border-cyan-555 border-cyan-500/30 text-cyan-300"
                            }`}
                          >
                            <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-ping mr-1"></span>
                            {100 + i * 20} LIVE
                          </div>
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end justify-center pb-2">
                          <span className="text-[10px] font-mono font-bold text-yellow-300 animate-pulse uppercase tracking-wider bg-slate-950 px-2 border border-yellow-800/30 rounded">
                            UP TO 10,000+ PARTICIPANTS SYNCHRONIZED
                          </span>
                        </div>
                      </div>
                    )}

                    {/* SCENE 5 EFFECT: Cryptocurrency or Cryptographic Consent Shield */}
                    {currentScene.visualEffect === "consent-shield" && (
                      <div className="relative h-44 flex items-center justify-center">
                        <div className="absolute w-36 h-36 rounded-full border border-emerald-500/20 animate-spin" style={{ animationDuration: '4s' }}></div>
                        <div className="absolute w-24 h-24 bg-gradient-to-tr from-emerald-950/30 to-teal-950/30 rounded-xl border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center">
                          <Lock className="h-10 w-10 text-emerald-400 animate-pulse" />
                        </div>
                        <div className="absolute top-[10%] text-xs font-mono text-emerald-300 bg-[#022115] border border-emerald-800 px-3 py-1 rounded shadow-lg uppercase">
                          🔐 Sovereign Consent Key Verified
                        </div>
                      </div>
                    )}

                    {/* SCENE 6 EFFECT: Grand Finale Universe signature */}
                    {currentScene.visualEffect === "grand-finale" && (
                      <div className="relative h-44 flex flex-col items-center justify-center">
                        <div className="absolute w-44 h-44 rounded-full border-4 border-double border-yellow-555 border-yellow-450/40 animate-spin"></div>
                        <div className="absolute w-32 h-32 rounded-full border border-dashed border-cyan-500/30 animate-pulse"></div>
                        <Sparkles className="h-12 w-12 text-yellow-405 text-yellow-400 animate-bounce drop-shadow-[0_0_20px_rgba(245,158,11,0.5)] mb-1" />
                        <span className="font-display font-black tracking-widest text-lg bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-white to-cyan-400">
                          e-NEUROSPHERES ADOPTER
                        </span>
                      </div>
                    )}

                    {/* Synchronized Script Text Titles */}
                    <h3 className="font-display font-black text-white text-md md:text-lg tracking-wide uppercase mt-4 mb-1">
                      {currentScene.title}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest max-w-[500px]">
                      {currentScene.subtitle}
                    </p>
                  </div>

                  {/* LARGE NEON SUBTITLE OVERLAY AREA (Picture-Ready captions) */}
                  <div className="w-full px-6 z-10">
                    <div className="bg-slate-950/90 border border-[#271038] rounded-xl p-3 max-w-2xl mx-auto shadow-[0_0_20px_rgba(139,92,246,0.15)] relative">
                      {/* Active audio waveform bars */}
                      {trailerPlaying && (
                        <div className="absolute top-2 right-4 flex items-end gap-0.5 h-3">
                          {[1, 2, 3, 4, 3, 2, 4, 1, 3].map((val, bKey) => (
                            <div 
                              key={bKey} 
                              className="w-[1.5px] bg-pink-500 rounded" 
                              style={{ 
                                height: `${val * 3}px`,
                                animation: `wave-dance ${0.5 + bKey * 0.15}s ease-in-out infinite alternate`
                              }}
                            />
                          ))}
                        </div>
                      )}

                      <div className="text-[10px] font-mono text-pink-400 uppercase tracking-widest font-bold mb-1 flex items-center justify-center gap-1">
                        <Activity className="h-3 w-3 animate-spin text-pink-500" />
                        <span>🎙️ FEMALE NARRATOR (ENGLISH VOICE)</span>
                      </div>

                      <div className="text-sm font-display text-white tracking-wide italic font-medium leading-relaxed">
                        &ldquo;{currentScene.narratorText}&rdquo;
                      </div>

                      {/* Display Highlighted Words */}
                      <div className="mt-2 flex flex-wrap gap-1 justify-center">
                        {currentScene.highlightWords.map((word, wIdx) => (
                          <span 
                            key={wIdx} 
                            className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-pink-950/40 border border-pink-700/50 text-pink-300"
                          >
                            ⚡ {word}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Slider playback timeline controls inside the viewport overlay */}
                    <div className="mt-4 flex items-center gap-3 max-w-md mx-auto">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setTrailerPlaying(!trailerPlaying);
                        }}
                        className={`p-1.5 rounded bg-slate-900 border border-slate-700 text-white cursor-pointer ${trailerPlaying ? "hover:text-pink-400" : "hover:text-cyan-400"}`}
                        title="Main / Jeda"
                      >
                        {trailerPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 text-cyan-400" />}
                      </button>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResetTrailer();
                        }}
                        className="p-1.5 rounded bg-slate-900 border border-slate-100/10 text-white hover:text-yellow-405 cursor-pointer"
                        title="Ulang Video"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                      </button>

                      {/* Timeline Bar */}
                      <div className="flex-1 h-1.5 bg-slate-900 border border-slate-800 rounded-full overflow-hidden relative">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-400 transition-all duration-300"
                          style={{ width: `${(trailerTime / 60) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0">
                        {trailerTime} / 60s
                      </span>
                    </div>

                    <div className="text-[9px] font-mono text-slate-500 mt-1.5 uppercase">
                      {showVocalStatus} &bull; Click anywhere on screen to expand
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            )}

            {/* 2. RENDERING OTHER TRADITIONAL STREAM FEEDS */}
            {activeStream === "GLOBAL_STAGE" && (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center relative">
                {/* Visual Sphere Animation */}
                <div className="absolute h-64 w-64 rounded-full border border-cyan-505 border-cyan-500/25 animate-pulse flex items-center justify-center">
                  <div className="absolute h-48 w-48 rounded-full border border-sky-505 border-sky-400/25 animate-ping"></div>
                  <div className="absolute h-32 w-32 rounded-full border border-indigo-505 border-indigo-400/30 animate-spin" style={{ animationDuration: '10s' }}></div>
                  <div className="absolute h-16 w-16 rounded-full border border-gold-505 border-gold-400/40 animate-pulse"></div>
                </div>

                <Globe className="h-20 w-20 text-cyan-400/70 animate-bounce mb-4" />
                <h3 className="font-display font-black text-lg md:text-2xl text-white tracking-widest uppercase">
                  GLOBAL SPHERE EMERGENCE STAGE
                </h3>
                <p className="text-xs font-mono text-cyan-300 mt-2 max-w-lg bg-slate-950/75 border border-cyan-900/40 px-3 py-1 rounded backdrop-blur">
                  Broadcasting multi-angle AV1 feed. Active Nodes: 148+ Countries Networked laterally.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>CLOCK SYNC DRIFT: -2ms (SOVEREIGN ENGINE COMPLIANT)</span>
                </div>
              </div>
            )}

            {activeStream === "COM_CLUSTER" && (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center relative">
                <Users className="h-20 w-20 text-emerald-400/75 mb-4 animate-pulse" />
                <h3 className="font-display font-black text-lg md:text-2xl text-white tracking-widest uppercase">
                  COMMUNITY CLUSTER NODE S-04
                </h3>
                <p className="text-xs font-mono text-emerald-300 mt-2 max-w-lg bg-slate-950/75 border border-emerald-900/40 px-3 py-1 rounded backdrop-blur">
                  Sharing localized social digital contracts. High connectivity mesh redundancy level 15%.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono text-gold-400 bg-slate-950/80 px-2.5 py-1 border border-gold-900/30 rounded">
                  <span>ACTIVATED MULTI-PEER SHARDING TRANSFER SYSTEM</span>
                </div>
              </div>
            )}

            {activeStream === "USER_SPOTLIGHT" && (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center relative">
                <div className="h-20 w-20 rounded-full bg-gold-950/30 border border-gold-500/50 flex items-center justify-center text-4xl mb-4 shadow-[0_0_20px_rgba(227,165,19,0.3)]">
                  🦊
                </div>
                <h3 className="font-display font-black text-lg md:text-2xl text-white tracking-widest uppercase">
                  USER SPOTLIGHT: INDONESIA_01
                </h3>
                <p className="text-xs font-mono text-gold-300 mt-2 max-w-lg bg-slate-950/75 border border-gold-900/40 px-3 py-1 rounded backdrop-blur">
                  Current Participant Broadcasting turn-based spatial feed. IID_REGION_IDN_SECURE_KEYHASH.
                </p>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-cyan-400">
                  <UserCheck className="h-4.5 w-4.5 text-cyan-400" />
                  <span>CONSENT HANDSHAKE VERIFIED: ACTIVE SPEECH DETECTED</span>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Glassmorphic Stream HUD Controls inside the Screen */}
          <div className="absolute top-4 left-4 p-3 rounded-lg backdrop-blur-md bg-slate-950/65 border border-white/10 text-xs font-mono flex flex-col gap-1 pointer-events-none z-10">
            <div className="text-slate-400">CURRENT SPHERE FEED</div>
            <div className="text-cyan-300 font-bold tracking-wider">{activeStream}</div>
            <div className="text-[10px] text-slate-500">LATENCY: {simulatedMs}ms | PEERS: {simulatedViewers.toLocaleString()}</div>
          </div>

          {/* Transparent Watermark on Giant screen */}
          <div className="absolute top-4 right-4 pointer-events-none opacity-45 font-display font-black text-sm tracking-widest text-slate-600 z-10">
            NEUROSPHERE TV 10.000+ ROOMS
          </div>

          {/* User Feedback Hint overlay that fades on hover */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 to-transparent p-4 flex items-center justify-between pointer-events-none z-10">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 uppercase">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              2 Clicks: Full Page Maximize | 3 Clicks: Shrink / Reset Screen
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono text-slate-500">
              ADOPTER SPEC : e-NeuroSphere (IDN_2026_EDITION)
            </span>
          </div>

        </div>

        {/* Right 1/4: Glassmorphic Live Consensus interaction Chat (Fully transparent, meets translucent request) */}
        <div className="backdrop-blur-md bg-slate-950/45 border border-cyan-800/20 rounded-xl p-4 flex flex-col h-full z-10 min-h-[300px]">
          <div className="border-b border-cyan-900/35 pb-2 mb-3">
            <h4 className="font-display font-bold text-xs tracking-widest text-cyan-200 flex items-center gap-1.5 uppercase">
              <MessageSquare className="h-4 w-4 text-cyan-400 animate-pulse" />
              CIVIC CHAT MESH (No Server)
            </h4>
            <p className="text-[9px] font-mono text-slate-500">Distributed consensus chat feed</p>
          </div>

          {/* Chat scrolling log */}
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 max-h-[220px] xl:max-h-[250px]">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className="bg-slate-950/30 border border-slate-900 px-2.5 py-1.5 rounded text-xs select-text">
                <div className="flex items-center justify-between text-[10px] mb-1 font-mono">
                  <span className="font-semibold text-gold-300">{msg.user}</span>
                  <span className="text-slate-500 text-[8px]">{msg.time}</span>
                </div>
                <p className="text-slate-300 font-sans leading-relaxed text-[11px]">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Distributed Chat Box sending form */}
          <form onSubmit={handleSendChat} className="mt-3.5 pt-2 border-t border-slate-900 flex gap-1.5">
            <input
              type="text"
              value={streamMessage}
              onChange={(e) => setStreamMessage(e.target.value)}
              placeholder="Berbagi pesan berdaulat..."
              className="flex-1 bg-slate-900/60 border border-slate-800 focus:border-cyan-600/65 focus:outline-none rounded-lg px-2.5 py-1.5 text-xs text-white"
            />
            <button 
              type="submit" 
              className="bg-cyan-500 hover:bg-cyan-455 text-slate-950 rounded-lg px-2.5 py-1.5 font-mono text-[10px] font-bold tracking-wider cursor-pointer shadow-[0_2px_8px_rgba(6,182,212,0.3)]"
            >
              KIRIM
            </button>
          </form>
        </div>

      </div>

      {/* 5. Bottom Layer: 4 SMALL COMPANION LIVE SCREENS FOR COMMUNITIES (Picture 2 inspired) */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-4">
        {subScreens.map((screen) => {
          const isSelected = activeStream === screen.id;

          return (
            <button
              key={screen.id}
              onClick={() => {
                setActiveStream(screen.id);
                // Trigger customized console statement logs
                console.log(`Active sub-screen focused: ${screen.name}`);
              }}
              className={`w-full text-left rounded-xl transition-all duration-300 backdrop-blur-md relative overflow-hidden flex flex-col p-3.5 cursor-pointer ${
                isSelected 
                  ? "bg-slate-900/90 border-2 border-gold-400 shadow-[0_0_15px_rgba(227,165,19,0.25)]" 
                  : "bg-slate-950/60 border border-cyan-800/20 hover:border-cyan-700/50"
              }`}
            >
              {/* Highlight special banner for the 1-minute promotion stream */}
              {screen.id === "PROMO_TRAILER" && (
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-yellow-405 via-pink-505 to-cyan-505 bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400"></div>
              )}

              {/* Overlay elements & visual labels */}
              <div className="absolute top-2 right-2 flex items-center gap-1.5">
                <span className={`inline-block h-2 w-2 rounded-full ${isSelected ? "bg-pink-400 animate-ping" : "bg-cyan-500"}`}></span>
                <span className="font-mono text-[8px] text-slate-400 font-bold uppercase">{screen.status}</span>
              </div>

              <div className="flex items-center gap-3">
                {/* Simulated static avatar/thumbnail */}
                <div className="h-10 w-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xl shadow-inner shrink-0">
                  {screen.avatarUrl}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="font-display font-bold text-[11px] tracking-wide text-white flex items-center gap-1 truncate">
                    {screen.name}
                    {isSelected && <Sparkles className="h-3.5 w-3.5 text-pink-400 animate-spin shrink-0" style={{ animationDuration: '3s' }} />}
                  </h4>
                  <p className="text-[10px] font-mono text-slate-500 mt-0.5 truncate">
                    {screen.region} / {screen.type}
                  </p>
                </div>
              </div>

              {/* Status and button specs */}
              <div className="mt-3 pt-2 border-t border-slate-900/60 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400">Adopters Connected:</span>
                <span className="text-cyan-400 font-bold">{screen.count.toLocaleString()} Nodes</span>
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
}

