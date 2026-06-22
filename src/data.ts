import { LayerInfo, SimulationNode, CivilizationSector } from "./types";

export const ARCHITECTURE_LAYERS: LayerInfo[] = [
  {
    id: 0,
    title: "SPHERE IDENTITY LAYER",
    subtitle: "Sovereign Node Foundation",
    iconName: "Fingerprint",
    description: "Sebelum streaming dimulai, setiap node masuk ke sistem menggunakan IID-REGION-COUNTRY-HASH. Menjamin identitas tanpa ketergantungan akun vendor eksternal serta enkripsi kunci personal (self-sovereign key).",
    processes: [
      "Identitas tanpa ketergantungan akun platform / vendor pusat",
      "Kunci enkripsi personal dengan model self-sovereign key",
      "Konfigurasi peran fleksibel: viewer, streamer, relay, moderator"
    ],
    metrics: [
      { label: "Format IID", value: "IID-REG-IDN-HASH64" },
      { label: "Crypto Key", value: "Ed25519-AES-256-GCM" }
    ],
    active: true
  },
  {
    id: 1,
    title: "INGESTION LAYER (REALITY → DIGITAL)",
    subtitle: "High-Fidelity Device Capture",
    iconName: "Radio",
    description: "Perangkat menangkap real-world data seperti video multi-angle, spatial audio, screen, dan sensor, yang langsung dikompresi lewat sistem Local Encode dan dipecah secara real-time menjadi unit Sphere Packets.",
    processes: [
      "Device Capture & Hardware-accelerated Local Encoding",
      "Dynamic Sphere Packetization (fragmentasi data cerdas)",
      "Pemberian metadata: Timestamp, IID Origin, Local Integrity Hash & Level Prioritas"
    ],
    metrics: [
      { label: "Codec Output", value: "H.265 / AV1 + Spatial Audio" },
      { label: "Packet Size", value: "Flexible (512B - 1200B)" }
    ],
    active: true
  },
  {
    id: 2,
    title: "EDGE SPHERE MESH NETWORK",
    subtitle: "P2P Serverless Distribution Core",
    iconName: "Network",
    description: "Sistem distribusi tanpa server pusat data / cloud vendor. Setiap perangkat bertindak sebagai relay, compression, dan forwarding node lateral dan radial, mengalirkan packet data secara menyebar bagaikan gelombang sphere.",
    processes: [
      "Lateral + Radial packet propagation (menyebar secara sirkular)",
      "Dynamic Multi-path Routing otomatis antar pengguna terdekat",
      "Redundant Packet Mesh & Anti-packet-loss routing"
    ],
    metrics: [
      { label: "Mesh Topology", value: "Fully Sphere-Distributed" },
      { label: "Hops Latency", value: "< 15ms per peer hop" }
    ],
    active: true
  },
  {
    id: 3,
    title: "REAL-TIME SYNCHRONIZATION ENGINE",
    subtitle: "Global Frame Alignment Engine",
    iconName: "Timer",
    description: "Menjamin jutaan pemirsa global menyaksikan data secara sinkron tanpa tergantung pada jam server pusat tunggal menggunakan kombinasi buffer latensi adaptif dan local predictive rendering.",
    processes: [
      "Adaptive latency buffer adjustment (0.2s - 3s) berdasarkan stabilitas jalur",
      "Local Predictive Rendering untuk mengantisipasi network drop",
      "Frame Alignment Protocol (sinkronisasi frame lateral)"
    ],
    metrics: [
      { label: "Buffer Window", value: "0.2s - 3.0s (Adaptive)" },
      { label: "Clock Drift Sync", value: "< 8ms (Peer relative)" }
    ],
    active: true
  },
  {
    id: 4,
    title: "MASSIVE INTERACTION SPHERE",
    subtitle: "10 to 10,000+ Active Interaction Clusters",
    iconName: "Users",
    description: "Mendukung interaksi super masif hingga ribuan partisipan sekaligus menggunakan pengelompokan cluster otomatis (Family, Community, Global Stage), dynamic AI layout balancing, mikro-spotlight, dan chat mesh terdistribusi.",
    processes: [
      "Auto Cluster Grouping (Family, Community, & Global Stage)",
      "AI Layout Balancing & Focus Compression (mengerutkan node pasif)",
      "Distributed consensus polling & multi-node whiteboard sync"
    ],
    metrics: [
      { label: "Cluster Capacity", value: "Upto 10,000+ peers/room" },
      { label: "Interactive Tools", value: "Turn-based Broadcast + Chat Mesh" }
    ],
    active: true
  },
  {
    id: 5,
    title: "LOCAL STORAGE SPHERE (SOVEREIGNTY)",
    subtitle: "Sovereign Sharded Local Backups",
    iconName: "HardDrive",
    description: "Data tidak pernah disimpan di database pusat eksternal melainkan di enkripsi di tingkat perangkat pengguna (E2E-Device-Level). Backup opsional dilakukan lewat Peer Backup menggunakan fragmentasi terenskripsi (sharded locally).",
    processes: [
      "Encrypted E2E local storage (Data milik penuh pemilik perangkat)",
      "Offline-ready record synchronization",
      "Peer backup & sharded fragmented storage (hanya dikirim ke node tepercaya)"
    ],
    metrics: [
      { label: "Encryption Mode", value: "AES-GCM 256 + Scrypt Shards" },
      { label: "Central Exposure", value: "0% Absolute Zero" }
    ],
    active: true
  },
  {
    id: 6,
    title: "SPHERE SHARING & INHERITANCE",
    subtitle: "Consent-First Smart social Contracts",
    iconName: "Share2",
    description: "Mengganti model distribusi tradisional dengan skema izin eksplisit peer-to-peer tanpa administrator global. Setiap pertukaran adalah kontrak sosial digital yang sah.",
    processes: [
      "Consent-first Peer Handshake (Izin eksplisit direct transfer)",
      "Time-locked sharing (Akses data otomatis expired)",
      "Conditional Inheritance Stream & customizable group sharing rules"
    ],
    metrics: [
      { label: "Sharing Protocols", value: "Direct P2P Handshake" },
      { label: "Access Controls", value: "Cryptographically Enforced" }
    ],
    active: true
  },
  {
    id: 7,
    title: "SPHERE RESILIENCE ENGINE",
    subtitle: "Self-Healing Network System",
    iconName: "HeartPulse",
    description: "Ketika sebuah node internet mengalami gangguan atau terputus tengah jalan, sistem secara otomatis melakukan re-routing, merekonstruksi data berkat redundancy packet dari tetangga mesh terdekat.",
    processes: [
      "Automatic dynamic packet re-routing dari node terdekat yang sehat",
      "Local stream reconstruction (menyembuhkan kegagalan frame)",
      "Neighbor-sync state recovery (mengembalikan data hilang)"
    ],
    metrics: [
      { label: "Healing Time", value: "< 200ms" },
      { label: "Packet Redundancy", value: "Adjustable 5%-25%" }
    ],
    active: true
  },
  {
    id: 8,
    title: "GLOBAL SPHERE EMERGENCE GRID",
    subtitle: "Indie Sphere Live Grid Scaling",
    iconName: "Globe",
    description: "Dalam skala global, ratusan ribu node aktif membentuk 'INDIE SPHERE LIVE GRID'. Menciptakan ruang komunikasi warga madani, edukasi mandiri, koordinasi peradaban, tanpa bergantung pada raksasa teknologi pusat.",
    processes: [
      "Multi-event parallel streaming (ribuan live grid serentak)",
      "Global civic communication layer (kolektif demokratis)",
      "Education, Governance, and Entertainment terpadu dalam satu jaringan hidup"
    ],
    metrics: [
      { label: "Scalability Limit", value: "Unlimited Grid Expansion" },
      { label: "Grid Sovereignty", value: "100% Autonomous" }
    ],
    active: true
  }
];

export const CIVILIZATION_SECTORS: CivilizationSector[] = [
  { id: "01", name: "Education", category: "society" },
  { id: "02", name: "Health", category: "society" },
  { id: "03", name: "Economy", category: "structure" },
  { id: "04", name: "Energy", category: "science" },
  { id: "05", name: "Agriculture", category: "science" },
  { id: "06", name: "Transportation", category: "structure" },
  { id: "07", name: "Infrastructure", category: "structure" },
  { id: "08", name: "Governance", category: "governance" },
  { id: "09", name: "Security", category: "governance" },
  { id: "10", name: "Environment", category: "science" },
  { id: "11", name: "Artificial Intelligence", category: "science" },
  { id: "12", name: "Data Sovereignty", category: "structure" },
  { id: "13", name: "Cybersecurity", category: "governance" },
  { id: "14", name: "Cloud & Compute", category: "science" },
  { id: "15", name: "Identity Systems", category: "structure" },
  { id: "16", name: "Culture", category: "society" },
  { id: "17", name: "Psychology", category: "society" },
  { id: "18", name: "Social Systems", category: "society" },
  { id: "19", name: "Communication", category: "structure" },
  { id: "20", name: "Law", category: "governance" },
  { id: "21", name: "Space", category: "science" },
  { id: "22", name: "Ocean", category: "science" },
  { id: "23", name: "Smart Cities", category: "structure" },
  { id: "24", name: "Robotics", category: "science" },
  { id: "25", name: "Manufacturing", category: "structure" },
  { id: "26", name: "Simulation Systems", category: "science" },
  { id: "27", name: "Financial Systems", category: "structure" },
  { id: "28", name: "Knowledge Systems", category: "society" },
  { id: "29", name: "Ethics & Philosophy", category: "society" },
  { id: "30", name: "Human-AI Integration", category: "science" },
  { id: "31", name: "Community", category: "society" },
  { id: "32", name: "Innovation Labs", category: "science" },
  { id: "33", name: "Disaster Systems", category: "governance" },
  { id: "34", name: "Global Coordination", category: "governance" }
];

export const INITIAL_NODES: SimulationNode[] = [
  { id: "source", label: "Human Origin Node", type: "human", status: "active", region: "JKT-01", country: "IDN", x: 120, y: 150, capacity: 15.0, latency: 0 },
  { id: "relay1", label: "Regional Mesh Relay A", type: "relay", status: "relay", region: "SGP-02", country: "SGP", x: 280, y: 70, capacity: 50.0, latency: 12 },
  { id: "relay2", label: "Regional Mesh Relay B", type: "relay", status: "relay", region: "HND-04", country: "JPN", x: 260, y: 220, capacity: 45.0, latency: 45 },
  { id: "edge1", label: "Sovereign Edge Node C", type: "edge", status: "relay", region: "SYD-01", country: "AUS", x: 440, y: 90, capacity: 80.0, latency: 35 },
  { id: "edge2", label: "Sovereign Edge Node D", type: "edge", status: "relay", region: "BLR-03", country: "IND", x: 420, y: 230, capacity: 95.0, latency: 68 },
  { id: "storage1", label: "Peer Encrypted Shard Hub", type: "storage", status: "relay", region: "FRA-05", country: "DEU", x: 580, y: 160, capacity: 120.0, latency: 110 }
];

export const BRANDING = {
  university: "NEUROSPHERE DIGITAL SOVEREIGNTY UNIVERSITY",
  subtitle: "THE FUTURE OF EDUCATION, ECONOMY & CIVILIZATION",
  omniAuthority: {
    title: "OMNI-AUTHORITY",
    subtitle: "Master Architect of the KINDNESS Civilization",
    founder: "INDIE-Founder E J H N"
  },
  rewards: "€100.000",
  rewardsSub: "For Innovators, Builders & Future Leaders",
  poweredBy: [
    "1001INDONESIA INVESTMENT",
    "INDIENATION Foundation",
    "CLOSE 2 U GROUP"
  ],
  values: [
    "KINDNESS",
    "COLLABORATION",
    "INNOVATION",
    "INTEGRITY",
    "SOVEREIGNTY",
    "FREEDOM",
    "HUMANITY"
  ],
  mission: "Membangun ekosistem peradaban berdaulat digital yang memampukan umat manusia secara mandiri dan setara melalui integrasi harmonis antara Manusia, Keberlanjutan Sistem Jaringan (Sovereign Sphere Network), dan Kecerdasan untuk Berkolaborasi Internasional."
};
