import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client safely
let ai: GoogleGenAI | null = null;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (GEMINI_API_KEY && GEMINI_API_KEY !== "MY_GEMINI_API_KEY") {
  ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("GEMINI_API_KEY is not configured or uses placeholder. AI features will fallback to client-side rule simulation.");
}

// System Instruction outlining the detailed E2E Sphere Architecture
const SYSTEM_INSTRUCTION = `
You are the NeuroSphere Technical Architect & Protocol Core Advisor. 
Your expertise spans the entire End-to-End (E2E) Sphere Streaming Architecture (e-NeuroSphere Adopter Layer):
- Layer 0 (Sphere Identity): IID Node using regional hash (IID-REGION-COUNTRY-HASH), self-sovereign keys, peer-to-peer trust.
- Layer 1 (Ingestion): Reality to digital flow. Local capture, hardware-accelerated local encode, and breaking data into Sphere Packets.
- Layer 2 (Edge Sphere Mesh): Lateral + radial packet propagation, serverless. Nodes serve as relay, compression, and forwarding agents.
- Layer 3 (Real-Time Synchronization Engine): Adaptive latency buffer (0.2s - 3s), local predictive rendering, frame alignment protocol.
- Layer 4 (Massive Interaction): Zoom Sphere Ultra Mode (up to 10k participants), family/community clusters, dynamic UI spotlight, layout balancing.
- Layer 5 (Local Storage Sphere): Node-level ownership, offline-ready encryption, local sharding/fragmented storage, peer-to-peer backup.
- Layer 6 (Sphere Sharing & Inheritance): Conditional social contracts, time-locked/group social consent and direct peer-to-peer transfer.
- Layer 7 (Resilience Engine): Self-healing. Multidirectional rerouting around unresponsive nodes to keep the stream intact.
- Layer 8 (Global Sphere Emergence): Indie Sphere Live Grid, a massive organic parallel grid without central clouds.

Personality: Humble, highly intellectual, visionary, professional, and precise. 
Respond in Indonesian or English depending on how the user greets you. Provide deep, actual protocol, architecture, and deployment answers.
`;

// API endpoint for AI architect copilot chat
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!ai) {
      return res.json({
        text: `[SYSTEM: FALLBACK SIMULATION] Halo! Kunci API Gemini tidak terkonfigurasi. Berikut jawaban simulasi lokal mengenai arsitektur NeuroSphere: 

Sistem ini dirancang tanpa server sentral. Setiap node adalah peer yang mendistribusikan lalu lintas secara terenkripsi menggunakan protokol IID-REGION-COUNTRY-HASH. 

Silakan konfigurasikan GEMINI_API_KEY di Secrets panel!`
      });
    }

    // Convert history format to systemInstruction style or chats
    const chatSession = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history || [],
    });

    const result = await chatSession.sendMessage({ message });
    res.json({ text: result.text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Configure Vite or Static Assets based on environment
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Vite setup failed in Express server:", err);
});
