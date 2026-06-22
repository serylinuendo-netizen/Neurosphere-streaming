export interface LayerInfo {
  id: number;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  processes: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  active: boolean;
}

export interface SimulationNode {
  id: string;
  label: string;
  type: "human" | "relay" | "edge" | "storage";
  status: "active" | "relay" | "inactive";
  region: string;
  country: string;
  x: number;
  y: number;
  capacity: number; // in MB/s
  latency: number;  // in ms
}

export interface NetworkPacket {
  id: string;
  sourceId: string;
  targetId: string;
  progress: number; // 0 to 1
  type: "video" | "audio" | "consensus" | "shard";
  priority: "high" | "medium" | "low";
  payload: string;
  sizeKb: number;
}

export interface CivilizationSector {
  id: string;
  name: string;
  category: "structure" | "science" | "society" | "governance";
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}
