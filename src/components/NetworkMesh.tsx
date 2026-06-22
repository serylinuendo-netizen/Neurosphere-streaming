import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  RotateCcw, 
  Settings, 
  Activity, 
  ShieldAlert, 
  Zap, 
  Wifi, 
  WifiOff, 
  Database, 
  User, 
  Cpu, 
  Layers 
} from "lucide-react";
import { SimulationNode, NetworkPacket } from "../types";
import { INITIAL_NODES } from "../data";

interface NetworkMeshProps {
  latencyBuffer: number;
  setLatencyBuffer: (val: number) => void;
  noiseLevel: number;
  setNoiseLevel: (val: number) => void;
  peerCount: number;
  setPeerCount: (val: number) => void;
}

export default function NetworkMesh({
  latencyBuffer,
  setLatencyBuffer,
  noiseLevel,
  setNoiseLevel,
  peerCount,
  setPeerCount
}: NetworkMeshProps) {
  const [nodes, setNodes] = useState<SimulationNode[]>(INITIAL_NODES);
  const [packets, setPackets] = useState<NetworkPacket[]>([]);
  const [selectedNode, setSelectedNode] = useState<SimulationNode | null>(INITIAL_NODES[0]);
  const [isSimulating, setIsSimulating] = useState(true);
  const [localLogs, setLocalLogs] = useState<string[]>([
    "IID-REGION-IDN-HASH64 established successfully.",
    "Ingestion layer captured high-fidelity raw AV1.",
    "Mesh Network self-healing active."
  ]);
  const [networkEfficiency, setNetworkEfficiency] = useState(99.98);
  const [packetsHealed, setPacketsHealed] = useState(0);

  // Generate packet ids
  const packetIdCounter = useRef(0);

  const addLog = (msg: string) => {
    setLocalLogs(prev => [ `[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 10)]);
  };

  // Trigger a packet propagation round
  const triggerPacketBroadcast = () => {
    if (!isSimulating) return;
    
    // Check if network is healthy enough based on noise
    const isSuccess = Math.random() * 100 > noiseLevel;
    
    packetIdCounter.current++;
    const idBase = `pkt-${packetIdCounter.current}`;
    
    const packetTypes: ("video" | "audio" | "consensus" | "shard")[] = ["video", "audio", "consensus", "shard"];
    const packetType = packetTypes[Math.floor(Math.random() * packetTypes.length)];
    
    addLog(`Broadcasting '${packetType.toUpperCase()}' packet from Human Node...`);

    // Create a chain of packets traversing from source -> relay1 -> edge1 -> storage1
    const newPackets: NetworkPacket[] = [
      {
        id: `${idBase}-1`,
        sourceId: "source",
        targetId: Math.random() > 0.5 ? "relay1" : "relay2",
        progress: 0,
        type: packetType,
        priority: "high",
        payload: `SFN_${packetType.toUpperCase()}_PAYLOAD`,
        sizeKb: Math.floor(Math.random() * 500) + 128
      }
    ];

    setPackets(prev => [...prev, ...newPackets]);

    if (!isSuccess) {
      setTimeout(() => {
        // Heal system automatically kicks in
        setNodes(prev => prev.map(n => {
          if (n.id === "relay1") return { ...n, status: "inactive" };
          return n;
        }));
        addLog("CRITICAL: Route disruption detected. Rerouting lateral packets via Nearest Nodes...");
        setPacketsHealed(h => h + 1);
        setNetworkEfficiency(99.42);
        
        // Re-route packets
        setTimeout(() => {
          setNodes(prev => prev.map(n => {
            if (n.id === "relay1") return { ...n, status: "relay" };
            return n;
          }));
          addLog("Resilience Engine: Re-route completed. Network healed.");
          setNetworkEfficiency(99.98);
        }, 1500);
      }, 400);
    }
  };

  // Control packet simulation interval
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      // Move packets along pathways
      setPackets(prevPackets => {
        return prevPackets
          .map(pkt => {
            const nextProgress = pkt.progress + 0.1;
            return { ...pkt, progress: nextProgress };
          })
          .filter(pkt => {
            // If completed, trigger next hop beautifully
            if (pkt.progress >= 1) {
              const nodesChainMap: Record<string, string[]> = {
                source: ["relay1", "relay2"],
                relay1: ["edge1", "edge2"],
                relay2: ["edge2"],
                edge1: ["storage1"],
                edge2: ["storage1"]
              };
              
              const currentTargets = nodesChainMap[pkt.sourceId] || [];
              if (currentTargets.length > 0) {
                // Spawn next hop packet
                const nextTarget = currentTargets[Math.floor(Math.random() * currentTargets.length)];
                
                // Add minor delays for subsequent hops to render naturally
                setTimeout(() => {
                  setPackets(p => [
                    ...p,
                    {
                      id: `${pkt.id}-hop-${nextTarget}-${Math.random().toString(36).slice(2, 7)}`,
                      sourceId: pkt.targetId,
                      targetId: nextTarget,
                      progress: 0,
                      type: pkt.type,
                      priority: pkt.priority,
                      payload: pkt.payload,
                      sizeKb: pkt.sizeKb
                    }
                  ]);
                }, 50);
              }
              return false; // remove finished packet
            }
            return true;
          });
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Periodic automatic random packet injector
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      triggerPacketBroadcast();
    }, 3200);
    return () => clearInterval(interval);
  }, [isSimulating, noiseLevel]);

  const getNodeCoordinates = (id: string) => {
    const node = nodes.find(n => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  const getPacketColor = (type: string) => {
    switch (type) {
      case "video": return "bg-cyan-400 shadow-cyan-500/80";
      case "audio": return "bg-emerald-400 shadow-emerald-500/80";
      case "consensus": return "bg-gold-400 shadow-gold-500/80";
      default: return "bg-amber-400 shadow-amber-500/80";
    }
  };

  return (
    <div className="bg-slate-950/90 border border-cyan-800/60 rounded-xl p-4 md:p-6 shadow-[0_0_25px_rgba(6,182,212,0.1)] blueprint-grid-fine relative overflow-hidden">
      
      {/* Visual Accent Corner Highlights */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/80"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/80"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/80"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/80"></div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Side: Simulation Arena Canvas */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4 border-b border-cyan-900/50 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 relative">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSimulating ? 'bg-cyan-400' : 'bg-red-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isSimulating ? 'bg-cyan-500' : 'bg-red-500'}`}></span>
              </span>
              <h3 className="font-display font-bold text-lg tracking-wider text-cyan-200">
                EDGE SPHERE MESH SIMULATOR
              </h3>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsSimulating(!isSimulating)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium border transition-all ${
                  isSimulating 
                    ? "bg-amber-950/40 text-amber-300 border-amber-800/40 hover:bg-amber-900/30" 
                    : "bg-cyan-950/40 text-cyan-300 border-cyan-800/40 hover:bg-cyan-900/30"
                }`}
              >
                <Play className="h-3.5 w-3.5" />
                {isSimulating ? "PAUSE SIM" : "ACTIVE SIM"}
              </button>
              
              <button 
                onClick={() => {
                  setPackets([]);
                  setNodes(INITIAL_NODES);
                  addLog("Simulator reset. Route re-initialized.");
                }}
                className="p-1.5 rounded border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
                title="Reset Sim"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Graphical P2P Canvas Container */}
          <div className="relative w-full aspect-[4/3] max-h-[360px] bg-slate-950/95 border border-cyan-950 rounded-lg overflow-hidden flex items-center justify-center">
            
            {/* Interactive Grid lines background */}
            <div className="absolute inset-0 blueprint-grid opacity-60"></div>

            {/* Connecting Mesh Pathways (Lines) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* Draw pathways between nodes */}
              {/* source -> relay1, relay2 */}
              <line x1="120" y1="150" x2="280" y2="70" stroke="url(#primaryGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="120" y1="150" x2="260" y2="220" stroke="url(#primaryGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
              
              {/* relay1 -> edge1, edge2 */}
              <line x1="280" y1="70" x2="440" y2="90" stroke="url(#primaryGrad)" strokeWidth="1.5" />
              <line x1="280" y1="70" x2="420" y2="230" stroke="url(#primaryGrad)" strokeWidth="1" />
              
              {/* relay2 -> edge2 */}
              <line x1="260" y1="220" x2="420" y2="230" stroke="url(#primaryGrad)" strokeWidth="1.5" />

              {/* edge1, edge2 -> storage1 */}
              <line x1="440" y1="90" x2="580" y2="160" stroke="url(#primaryGrad)" strokeWidth="1.5" strokeDasharray="4 2" />
              <line x1="420" y1="230" x2="580" y2="160" stroke="url(#primaryGrad)" strokeWidth="1.5" strokeDasharray="4 2" />
            </svg>

            {/* Render Nodes dynamically */}
            {nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className="absolute p-0 border-0 focus:outline-none focus:ring-0 group cursor-pointer"
                  style={{ left: `${node.x}px`, top: `${node.y}px`, transform: `translate(-50%, -50%)` }}
                >
                  <div className="relative">
                    {/* Radial waves if active */}
                    {node.status === "active" && (
                      <span className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping scale-150"></span>
                    )}
                    
                    {/* Node Circle */}
                    <div className={`h-11 w-11 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      node.status === "inactive" 
                        ? "bg-red-950/80 border-red-500 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.4)]" 
                        : isSelected
                          ? "bg-cyan-900 border-gold-400 text-gold-200 shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                          : "bg-slate-900 border-cyan-500 text-cyan-300 group-hover:bg-cyan-950/80 group-hover:text-cyan-100"
                    }`}>
                      {node.type === "human" && <User className="h-5.5 w-5.5" />}
                      {node.type === "relay" && <Cpu className="h-5.5 w-5.5" />}
                      {node.type === "edge" && <Layers className="h-5.5 w-5.5" />}
                      {node.type === "storage" && <Database className="h-5.5 w-5.5" />}
                    </div>

                    {/* Small tag */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-950/90 text-[9px] font-mono border border-slate-800/80 px-1 rounded whitespace-nowrap text-slate-300 group-hover:text-cyan-200 group-hover:border-cyan-800 transition-colors">
                      {node.country}•{node.label.split(" ")[0]}
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Render Packets traversing in real-time */}
            {packets.map((pkt) => {
              const startCoords = getNodeCoordinates(pkt.sourceId);
              const endCoords = getNodeCoordinates(pkt.targetId);
              
              const currentX = startCoords.x + (endCoords.x - startCoords.x) * pkt.progress;
              const currentY = startCoords.y + (endCoords.y - startCoords.y) * pkt.progress;

              return (
                <div
                  key={pkt.id}
                  className={`absolute h-2.5 w-2.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] filter pointer-events-none transition-all duration-100 ${getPacketColor(pkt.type)}`}
                  style={{ left: `${currentX}px`, top: `${currentY}px`, transform: `translate(-50%, -50%)` }}
                />
              );
            })}
          </div>

          {/* Action Trigger Button */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={triggerPacketBroadcast}
              disabled={!isSimulating}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 disabled:opacity-50 text-white font-display uppercase tracking-wider font-semibold text-xs py-2.5 px-4 rounded-lg shadow-[0_4px_12px_rgba(14,165,233,0.3)] transition-all cursor-pointer"
            >
              <Zap className="h-4 w-4 text-cyan-200" />
              Suntik Packet Manual
            </button>
            <div className="bg-slate-900/60 rounded-lg p-2 flex items-center justify-around border border-slate-800 text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-cyan-400"></span> Video
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span> Audio
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-gold-400"></span> Polling
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Simulation Control Board & Node Details */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          
          {/* Section: Node Spec Inspector */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-lg p-4 flex-1">
            <h4 className="font-display font-medium text-xs tracking-wider text-cyan-400 uppercase mb-3 flex items-center justify-between">
              <span>NODE DETAILS</span>
              <Activity className="h-3.5 w-3.5 text-cyan-400" />
            </h4>

            {selectedNode ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold font-display text-white">{selectedNode.label}</div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono ${
                    selectedNode.status === "active" 
                      ? "bg-cyan-550/20 text-cyan-300 border border-cyan-800" 
                      : "bg-emerald-950/20 text-emerald-300 border border-emerald-800"
                  }`}>
                    {selectedNode.status.toUpperCase()}
                  </span>
                </div>

                <div className="bg-slate-950/85 rounded p-2.5 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Node ID:</span> 
                    <span className="text-cyan-400">IID-{selectedNode.region}-{selectedNode.country}-SHA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Region Tag:</span> 
                    <span>{selectedNode.region} / {selectedNode.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Latency:</span> 
                    <span className="text-amber-400">{selectedNode.latency} ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Capacity:</span> 
                    <span>{selectedNode.capacity} MB/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Type Level:</span> 
                    <span className="text-purple-400">{selectedNode.type.toUpperCase()}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 italic">
                  *Setiap node masuk ke sistem secara berdaulat (Sovereign). Kunci enkripsi pribadi berada di level perangkat lokal Anda.
                </div>
              </div>
            ) : (
              <div className="h-28 flex items-center justify-center text-[11px] text-slate-500">
                Pilih node di peta simulasi untuk detail teknis.
              </div>
            )}
          </div>

          {/* Section: Live Network Tuners */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-lg p-4 space-y-3.5">
            <h4 className="font-display font-medium text-xs tracking-wider text-gold-400 uppercase flex items-center justify-between">
              <span>TUNER PARAMETER</span>
              <Settings className="h-3.5 w-3.5 text-gold-400" />
            </h4>

            {/* Slider 1: Latency Buffer */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Adaptive Buffer</span>
                <span className="text-cyan-400 font-bold">{latencyBuffer.toFixed(1)}s</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={latencyBuffer}
                onChange={(e) => setLatencyBuffer(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[8px] font-mono text-slate-500">
                <span>0.2s (Ultra Live)</span>
                <span>3.0s (Anti-Loss)</span>
              </div>
            </div>

            {/* Slider 2: Packet Drop Rate (Noise) */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Mesh Failure / Noise</span>
                <span className="text-red-400 font-bold">{noiseLevel}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={noiseLevel}
                onChange={(e) => setNoiseLevel(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-[8px] font-mono text-slate-500">
                <span>0% (99.9% Perfect)</span>
                <span>50% (High Disruption)</span>
              </div>
            </div>

            {/* Slider 3: Interactive Peer Count */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Simulated Adopters</span>
                <span className="text-purple-400 font-bold">{peerCount.toLocaleString()} Rooms</span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={peerCount}
                onChange={(e) => setPeerCount(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-[8px] font-mono text-slate-500">
                <span>100 (Local Stage)</span>
                <span>10,000+ (Global Sphere)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Console Log Panels */}
      <div className="mt-4 bg-slate-950/95 border border-slate-800/80 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] font-mono font-bold tracking-wider text-cyan-500 flex items-center gap-1 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Consensus Logs & Stream Diagnostics
          </div>
          <div className="text-[9px] font-mono text-slate-400">
            Resilience Efficiency: <span className="text-emerald-400 font-bold">{networkEfficiency}%</span> | Total Healed: <span className="text-cyan-400 font-bold">{packetsHealed}</span>
          </div>
        </div>
        
        <div className="h-20 overflow-y-auto font-mono text-[10px] text-slate-300 space-y-1 select-none pr-1">
          {localLogs.map((log, index) => (
            <div key={index} className="border-l border-slate-800 pl-2 text-slate-400 hover:text-slate-200 transition-colors">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
