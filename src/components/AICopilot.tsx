import React, { useState, useRef, useEffect } from "react";
import { Send, Cpu, Sparkles, AlertCircle, HelpCircle } from "lucide-react";
import { ChatMessage } from "../types";

export default function AICopilot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Selamat datang di NeuroSphere AI Architect Copilot Node. Saya siap memandu Anda mengeksplorasi e-NeuroSphere Adopter Layer (E2E Sphere Streaming). Silakan tanyakan detail protokol Mesh, mekanisme enkripsi IID, mitigasi self-healing, atau integrasi Zoom Sphere Ultra 10.000+ peserta.",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    setErrorText(null);
    if (!customText) setInputValue("");

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Build history for the chat API, mapping roles correctly
      const history = messages.slice(1).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history
        })
      });

      if (!res.ok) {
        throw new Error("Gagal terhubung dengan NeuroSphere AI Node");
      }

      const data = await res.json();
      
      const modelMsg: ChatMessage = {
        id: `gem-${Date.now()}`,
        role: "model",
        text: data.text,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorText("Kegagalan tautan AI Node. Pastikan API Key di Secrets terkonfigurasi.");
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    "Bagaimana rute self-healing mesh?",
    "Apa itu IID-REGION-COUNTRY-HASH?",
    "Jelaskan Zoom Sphere Ultra Mode"
  ];

  return (
    <div className="bg-slate-950/90 border border-gold-600/40 rounded-xl p-4 md:p-5 flex flex-col h-[580px] shadow-[0_0_20px_rgba(227,165,19,0.08)] relative overflow-hidden">
      
      {/* Decorative Blueprint Corner Lights */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold-500/50"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold-500/50"></div>

      {/* Header Panel */}
      <div className="flex items-center gap-2 border-b border-gold-800/20 pb-3 mb-3">
        <div className="h-8.5 w-8.5 rounded-full bg-gold-950/40 border border-gold-500/50 flex items-center justify-center text-gold-450 shadow-[0_0_8px_rgba(227,165,19,0.2)]">
          <Cpu className="h-4.5 w-4.5 animate-pulse" />
        </div>
        <div>
          <h3 className="font-display font-medium text-xs tracking-widest text-gold-400">
            NEUROSPHERE AI COPILOT
          </h3>
          <p className="text-[10px] text-slate-400 font-mono tracking-wide">
            Autonomous Architect Node • LIVE
          </p>
        </div>
      </div>

      {/* Suggestion Prompts */}
      <div className="mb-3">
        <div className="text-[9px] font-mono text-slate-500 uppercase mb-1.5 flex items-center gap-1">
          <HelpCircle className="h-3 w-3 text-slate-500" />
          Kueri Rekomendasi Adopter:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              disabled={isLoading}
              className="text-[10px] font-mono bg-slate-900 hover:bg-gold-950/20 text-slate-300 hover:text-gold-300 border border-slate-800/80 hover:border-gold-800/40 rounded-full px-2.5 py-1.5 transition-all text-left cursor-pointer select-none"
            >
              🚀 {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Frame */}
      <div className="flex-1 overflow-y-auto mb-3 bg-slate-950/80 rounded-lg border border-slate-900 p-3.5 space-y-3.5 max-h-[300px]">
        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[90%] rounded-lg px-3 py-2.5 text-xs tracking-wide leading-relaxed font-sans ${
                  isUser
                    ? "bg-gold-950/30 border border-gold-700/40 text-gold-100"
                    : "bg-slate-900 border border-slate-800 text-slate-200"
                }`}
              >
                {!isUser && (
                  <div className="flex items-center gap-1 text-[9px] font-mono text-gold-400 font-semibold mb-1 uppercase tracking-wider">
                    <Sparkles className="h-3 w-3 text-gold-400 animate-spin" style={{ animationDuration: '4s' }} />
                    Architecture AI Node
                  </div>
                )}
                {/* Clean formatted paragraphs */}
                <div className="space-y-1.5 whitespace-pre-wrap select-text">
                  {m.text}
                </div>
              </div>
              <span className="text-[8px] font-mono text-slate-600 mt-1 px-1">
                {m.timestamp}
              </span>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono py-1">
            <Cpu className="h-4.5 w-4.5 text-gold-500 animate-spin" />
            <span>Mengkalkulasi model protokol topologi mesh...</span>
          </div>
        )}

        {errorText && (
          <div className="flex items-center gap-2 text-red-400 bg-red-950/25 border border-red-900 rounded p-2.5 text-[11px] font-mono">
            <AlertCircle className="h-4.5 w-4.5 shrink-0" />
            <span>{errorText}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Panel */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2 mt-auto pt-2 border-t border-slate-900"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Tanyakan perihal e-NeuroSphere protocol...."
          className="flex-1 bg-slate-900 border border-slate-800 focus:border-gold-600/80 focus:outline-none rounded-lg px-3.5 py-2 text-xs font-sans text-white placeholder-slate-500 transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="bg-gold-500 hover:bg-gold-450 disabled:bg-slate-800 text-gold-950 disabled:text-slate-500 h-9.5 w-9.5 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-[0_2px_8px_rgba(227,165,19,0.3)] disabled:shadow-none"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
