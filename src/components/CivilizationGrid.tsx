import React from "react";
import { 
  Building2, 
  Coins, 
  Sparkles, 
  TrendingUp, 
  Heart, 
  Globe2, 
  Compass, 
  Scale 
} from "lucide-react";
import { CIVILIZATION_SECTORS } from "../data";

export default function CivilizationGrid() {
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "structure":
        return { bg: "bg-cyan-950/40", text: "text-cyan-300", border: "border-cyan-800/30" };
      case "science":
        return { bg: "bg-purple-950/40", text: "text-purple-300", border: "border-purple-800/30" };
      case "society":
        return { bg: "bg-emerald-950/40", text: "text-emerald-300", border: "border-emerald-800/30" };
      default: // governance
        return { bg: "bg-amber-950/40", text: "text-amber-300", border: "border-amber-800/30" };
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      
      {/* 1. SECTOR PANEL: SOVEREIGN DIGITAL ECONOMY METRICS (Picture 2) */}
      <div className="bg-slate-950/90 border border-cyan-800/50 rounded-xl p-5 relative overflow-hidden xl:col-span-1 shadow-[0_0_15px_rgba(6,182,212,0.05)]">
        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-cyan-500/10 to-transparent pointer-events-none"></div>
        
        <div className="flex items-center gap-2 border-b border-cyan-900/40 pb-2.5 mb-4">
          <Coins className="h-5 w-5 text-gold-400" />
          <h3 className="font-display font-medium text-xs tracking-widest text-gold-450 uppercase">
            ECONOMIC SIMULATION METRICS
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          
          {/* TM Card */}
          <div className="bg-slate-900/60 border border-cyan-950 rounded-lg p-3">
            <div className="text-[10px] font-mono text-slate-500 uppercase">TOTAL TM (Sovereign Money)</div>
            <div className="text-lg font-mono font-bold text-cyan-300 mt-1 flex items-baseline gap-1">
              6.0M <span className="text-[10px] font-normal text-slate-400">TM</span>
            </div>
            <div className="text-[9px] font-mono text-emerald-400 mt-1">▲ +4.2% Growth</div>
          </div>

          {/* ENPE Card */}
          <div className="bg-slate-900/60 border border-cyan-950 rounded-lg p-3">
            <div className="text-[10px] font-mono text-slate-500 uppercase">ENPE (Productive Cash)</div>
            <div className="text-lg font-mono font-bold text-amber-400 mt-1 flex items-baseline gap-1">
              16,000 <span className="text-[10px] font-normal text-slate-400">ENPE</span>
            </div>
            <div className="text-[9px] font-mono text-slate-400 mt-1">Anchor Allocation</div>
          </div>

          {/* Lovely Coin Card */}
          <div className="bg-slate-900/60 border border-cyan-950 rounded-lg p-3">
            <div className="text-[10px] font-mono text-slate-500 uppercase">Lovely Coin (LUV)</div>
            <div className="text-lg font-mono font-bold text-purple-300 mt-1 flex items-baseline gap-1">
              10,000 <span className="text-[10px] font-normal text-slate-400">LUV</span>
            </div>
            <div className="text-[9px] font-mono text-purple-400 mt-1">Civilization Reward</div>
          </div>

          {/* IND-EUR Stable Card */}
          <div className="bg-slate-900/60 border border-cyan-950 rounded-lg p-3">
            <div className="text-[10px] font-mono text-slate-500 uppercase">IND-EUR STABLE</div>
            <div className="text-lg font-mono font-bold text-emerald-300 mt-1 flex items-baseline gap-1">
              23,000 <span className="text-[10px] font-normal text-slate-400">Stable</span>
            </div>
            <div className="text-[9px] font-mono text-emerald-400 mt-1">Stable Mesh Reserve</div>
          </div>

        </div>

        {/* Philosophy Core Banner */}
        <div className="bg-slate-900/30 border border-yellow-950/20 rounded-lg p-3 mt-4 text-[11px] leading-relaxed text-slate-400 italic">
          &ldquo;Tidak ada pusat kontrol data, tidak ada pemilik tunggal. Semua node adalah bagian dari jaringan kemanusiaan yang setara.&rdquo;
        </div>
      </div>

      {/* 2. SECTOR PANEL: 34 SECTORS OF CIVILIZATION (Picture 1) */}
      <div className="bg-slate-950/90 border border-cyan-800/50 rounded-xl p-5 xl:col-span-2 shadow-[0_0_15px_rgba(6,182,212,0.05)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-900/40 pb-2.5 mb-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-cyan-400" />
            <h3 className="font-display font-medium text-xs tracking-widest text-cyan-200 uppercase">
              34 SECTORS OF CIVILIZATION SYSTEM DESIGN
            </h3>
          </div>
          <div className="flex gap-2 text-[9px] font-mono">
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-cyan-400"></span>Sistem</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-purple-450"></span>Sains</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-emerald-450"></span>Sosial</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-amber-450"></span>Regulasi</span>
          </div>
        </div>

        {/* 34 Sectors Adaptive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-[220px] overflow-y-auto pr-1">
          {CIVILIZATION_SECTORS.map((sector) => {
            const styles = getCategoryStyles(sector.category);
            return (
              <div
                key={sector.id}
                className={`border rounded p-1.5 flex items-center gap-2 transition-all hover:bg-slate-900/60 ${styles.bg} ${styles.border}`}
              >
                <span className="text-[9px] font-mono font-bold text-slate-400 shrink-0 bg-slate-950 px-1 rounded border border-slate-900">
                  {sector.id}
                </span>
                <span className={`text-[10px] font-display font-medium tracking-wide truncate ${styles.text}`} title={sector.name}>
                  {sector.name}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-900/80">
          <div className="text-[10px] font-mono text-slate-500">
            *Semua sektor terintegrasi dalam skema e-NeuroSphere Adopter Engine.
          </div>
          <div className="text-[10px] font-mono text-gold-400 font-bold tracking-wider uppercase border border-gold-900/50 px-2 py-0.5 rounded-full bg-gold-950/20">
            KINDNESS CIVILIZATION STANDARD • IDN-2029
          </div>
        </div>
      </div>

    </div>
  );
}
