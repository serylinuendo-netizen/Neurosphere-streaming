import React, { useState } from "react";
import { 
  Fingerprint, 
  Radio, 
  Network, 
  Timer, 
  Users, 
  HardDrive, 
  Share2, 
  HeartPulse, 
  Globe,
  ChevronDown,
  ChevronUp,
  Settings,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { LayerInfo } from "../types";
import { ARCHITECTURE_LAYERS } from "../data";

// Direct Icon Mapper
const getIcon = (name: string, className: string) => {
  switch (name) {
    case "Fingerprint": return <Fingerprint className={className} />;
    case "Radio": return <Radio className={className} />;
    case "Network": return <Network className={className} />;
    case "Timer": return <Timer className={className} />;
    case "Users": return <Users className={className} />;
    case "HardDrive": return <HardDrive className={className} />;
    case "Share2": return <Share2 className={className} />;
    case "HeartPulse": return <HeartPulse className={className} />;
    default: return <Globe className={className} />;
  }
};

interface LayerDetailProps {
  selectedLayerId: number;
  setSelectedLayerId: (id: number) => void;
}

export default function LayerDetail({
  selectedLayerId,
  setSelectedLayerId
}: LayerDetailProps) {
  const [expandedLayerId, setExpandedLayerId] = useState<number | null>(0);

  const toggleExpand = (id: number) => {
    setExpandedLayerId(expandedLayerId === id ? null : id);
    setSelectedLayerId(id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-cyan-900/50 pb-2">
        <h3 className="font-display font-medium text-xs tracking-widest text-cyan-400 uppercase flex items-center gap-1.5">
          <Settings className="h-4.5 w-4.5 animate-spin text-cyan-500" style={{ animationDuration: '6s' }} />
          SPHERE STREAMING ARCHITECTURE LAYERS
        </h3>
        <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
          SYSTEM LEVEL E2E
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5 max-h-[580px] overflow-y-auto pr-1">
        {ARCHITECTURE_LAYERS.map((layer) => {
          const isSelected = selectedLayerId === layer.id;
          const isExpanded = expandedLayerId === layer.id;

          return (
            <div
              key={layer.id}
              className={`border rounded-lg transition-all duration-300 relative overflow-hidden bg-slate-950/85 ${
                isSelected 
                  ? "border-gold-550 shadow-[0_0_12px_rgba(227,165,19,0.15)]" 
                  : "border-slate-800/80 hover:border-cyan-900/60"
              }`}
            >
              {/* Active Stripe Accent */}
              <div className={`absolute top-0 bottom-0 left-0 w-[4px] ${
                isSelected ? "bg-gradient-to-b from-gold-400 to-amber-600" : "bg-cyan-900/40"
              }`} />

              <button
                onClick={() => toggleExpand(layer.id)}
                className="w-full text-left p-3.5 pl-5 flex items-center justify-between gap-3 focus:outline-none focus:ring-0 cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`h-9 w-9 rounded-md flex items-center justify-center border transition-colors ${
                    isSelected 
                      ? "bg-gold-950/30 border-gold-500/80 text-gold-400" 
                      : "bg-slate-900/80 border-slate-800 text-cyan-400"
                  }`}>
                    {getIcon(layer.iconName, "h-5 w-5")}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-900/90 px-1.5 rounded">{layer.id}</span>
                      <h4 className="font-display font-bold text-xs tracking-wider text-white">
                        {layer.title}
                      </h4>
                    </div>
                    <p className="text-[10px] text-slate-400 tracking-wide font-medium mt-0.5">
                      {layer.subtitle}
                    </p>
                  </div>
                </div>

                <div className="text-slate-500">
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </button>

              {/* Expandable Layer Blueprint Contents */}
              {isExpanded && (
                <div className="px-5 pb-4 pl-12 border-t border-slate-900 bg-slate-950/40 transition-all duration-300">
                  <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                    {layer.description}
                  </p>

                  {/* Processes lists */}
                  <div className="space-y-2">
                    <div className="text-[9px] font-mono text-cyan-500 uppercase tracking-wider font-bold">
                      PROSES UTAMA SPHERE (LOOPS):
                    </div>
                    <ul className="space-y-1.5 pl-0.5">
                      {layer.processes.map((proc, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-[10.5px] text-slate-300">
                          <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500/80 mt-0.5 shrink-0" />
                          <span>{proc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cryptographic Metas */}
                  <div className="grid grid-cols-2 gap-3 mt-3.5 pt-3 border-t border-slate-900/80">
                    {layer.metrics.map((met, mIdx) => (
                      <div key={mIdx} className="bg-slate-900/40 border border-slate-900 rounded p-1.5 pl-2.5">
                        <div className="text-[9px] font-mono text-slate-500">{met.label}</div>
                        <div className="text-xs font-mono font-bold text-gold-300 mt-0.5">{met.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Technical Handshake Assurance Stamp */}
                  <div className="flex items-center gap-1.5 mt-3 text-[9px] font-mono text-emerald-400">
                    <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
                    <span>SPHERE PROTOCOL COMPLIANT SECURITY PROTOCOLS</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
