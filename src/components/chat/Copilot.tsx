import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import "./Copilot.css";

const COPILOT_API_URL = (import.meta.env.VITE_COPILOT_API_URL || "").replace(/\/$/, "");
const COPILOT_ENDPOINT = COPILOT_API_URL ? `${COPILOT_API_URL}/api/copilot` : "/api/copilot";

type Message = { id: number; role: "user" | "assistant"; content: string };
type CommandIcon = "chat" | "code" | "resume" | "idea" | "career" | "tech" | "goal";

const quickActions: { label: string; prompt: string; icon: CommandIcon }[] = [
  { label: "General Chat", prompt: "Tell me about Mahanthesh", icon: "chat" },
  { label: "Code Help", prompt: "What are Mahanthesh's technical skills?", icon: "code" },
  { label: "Resume Review", prompt: "Give me a concise overview of Mahanthesh's resume", icon: "resume" },
  { label: "Project Ideas", prompt: "Show me Mahanthesh's projects", icon: "idea" },
  { label: "Career Guidance", prompt: "Tell me about Mahanthesh's experience", icon: "career" },
  { label: "Tech Explain", prompt: "Explain Mahanthesh's main backend technologies", icon: "tech" },
  { label: "Goal Planner", prompt: "What kind of software engineering role fits Mahanthesh?", icon: "goal" },
];

function CommandIcon({ type }: { type: CommandIcon }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="o01-command-svg">
      {type === "chat" && <><path {...common} d="M7 8h18v12H14l-6 5v-5H7z" /><path {...common} d="M12 13h8M12 17h5" /></>}
      {type === "code" && <><path {...common} d="m12 10-6 6 6 6M20 10l6 6-6 6M18 7l-4 18" /></>}
      {type === "resume" && <><path {...common} d="M9 5h10l4 4v18H9z" /><path {...common} d="M19 5v5h5M13 15h7M13 19h7M13 23h5" /></>}
      {type === "idea" && <><path {...common} d="M16 5a8 8 0 0 0-5 14c1 .8 2 2 2 4h6c0-2 .9-3.2 2-4A8 8 0 0 0 16 5z" /><path {...common} d="M13 27h6M14 30h4M16 2v-1M5 6 4 5M27 6l1-1" /></>}
      {type === "career" && <><path {...common} d="M6 11h20v15H6zM11 11V8h10v3M10 17h12M16 14v6" /></>}
      {type === "tech" && <><circle {...common} cx="16" cy="16" r="4" /><path {...common} d="M16 3v5M16 24v5M3 16h5M24 16h5M7 7l4 4M21 21l4 4M25 7l-4 4M11 21l-4 4" /></>}
      {type === "goal" && <><circle {...common} cx="16" cy="16" r="10" /><circle {...common} cx="16" cy="16" r="5" /><circle cx="16" cy="16" r="1.7" fill="currentColor" /><path {...common} d="m22 10 6-6M23 4h5v5" /></>}
    </svg>
  );
}

function AccelerationPedalIcon() {
  return (
    <svg className="o01-acceleration-icon" viewBox="0 0 48 56" aria-hidden="true">
      <path d="M10 49h28" />
      <path d="M16 43V15c0-4 3-7 7-7h4c4 0 6 3 6 7v28" />
      <path d="M18 18h12M18 26h12M18 34h12" />
      <path d="M24 2v6" />
      <path d="m20 5 4-3 4 3" />
    </svg>
  );
}

function RobotAvatar({ small = false }: { small?: boolean }) {
  return (
    <div className={`o01-avatar o01-robot-avatar${small ? " small" : ""}`} aria-hidden="true">
      <div className="o01-avatar-halo" />
      <div className="o01-robot-helmet"><i /><i /></div>
      <div className="o01-robot-face" />
      <div className="o01-robot-armor"><b /></div>
    </div>
  );
}

function DriverAvatar({ small = false }: { small?: boolean }) {
  return (
    <div className={`o01-avatar o01-driver-avatar${small ? " small" : ""}`} aria-hidden="true">
      <div className="o01-driver-glow" />
      <div className="o01-driver-head"><i /><i /></div>
      <div className="o01-driver-hair" />
      <div className="o01-driver-body"><b /></div>
    </div>
  );
}

function HologramRobot() {
  return (
    <div className="o01-hologram" aria-hidden="true">
      <div className="o01-holo-ring ring-one" />
      <div className="o01-holo-ring ring-two" />
      <div className="o01-holo-scan" />
      <div className="o01-holo-robot">
        <div className="o01-holo-antenna left" />
        <div className="o01-holo-antenna right" />
        <div className="o01-holo-head"><span /><span /></div>
        <div className="o01-holo-face" />
        <div className="o01-holo-neck" />
        <div className="o01-holo-shoulder left" />
        <div className="o01-holo-shoulder right" />
        <div className="o01-holo-chest"><div className="o01-holo-core" /><i /><i /></div>
        <div className="o01-holo-arm left" />
        <div className="o01-holo-arm right" />
        <div className="o01-holo-waist" />
      </div>
    </div>
  );
}

function localResponse(message: string): string {
  const text = message.toLowerCase();
  if (text.includes("skill")) return "His core skills include Java, Python, DSA, Spring Boot, REST APIs, Spring Security, Hibernate/JPA, JWT, React, TypeScript, PostgreSQL and SQL.";
  if (text.includes("project")) return "Featured projects include Banking System Web Application, Novel Journey, Blinkit Dashboard and M-ai-L, an AI Email Agent.";
  if (text.includes("experience")) return "Mahanthesh has experience as a Web Development Intern at Mindset IT Solution and as a Customer Service Support Intern at Era Foundation Pvt Ltd.";
  if (text.includes("who") || text.includes("mahanthesh") || text.includes("about")) return "Mahanthesh S is an entry-level Software Engineer specializing in Java, Spring Boot, Python, REST APIs, React and PostgreSQL.";
  return "I'm O-01, Mahanthesh's AI Co-Pilot. Ask me about his skills, projects, experience, education or certifications.";
}

export function Copilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "assistant", content: "O-01 online. Systems nominal. I'm Mahanthesh's AI Co-Pilot. Ask me about his journey, skills, projects or experience." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageId = useRef(2);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const log = document.querySelector<HTMLDivElement>(".o01-communication-log");
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, isTyping, isOpen]);

  const sendMessage = async (text: string) => {
    const message = text.trim();
    if (!message || isTyping) return;
    setMessages((previous) => [...previous, { id: messageId.current++, role: "user", content: message }]);
    setInput("");
    setIsTyping(true);
    try {
      const response = await fetch(COPILOT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      const data = await response.json();
      const reply = typeof data.reply === "string" ? data.reply : localResponse(message);
      setMessages((previous) => [...previous, { id: messageId.current++, role: "assistant", content: reply }]);
    } catch (error) {
      console.error("O-01 API error:", error);
      setMessages((previous) => [...previous, { id: messageId.current++, role: "assistant", content: localResponse(message) }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const openResume = () => window.open("/assets/resume/resume.pdf", "_blank", "noopener,noreferrer");

  return createPortal(
    <div className="o01-root">
      {!isOpen && (
        <button type="button" className="o01-floating" onClick={() => setIsOpen(true)} aria-label="Open O-01 AI Co-Pilot">
          <RobotAvatar small />
          <span className="o01-floating-label">O-01</span>
          <span className="o01-floating-pulse" />
        </button>
      )}

      {isOpen && (
        <section className="o01-chat-panel" role="dialog" aria-label="O-01 AI Co-Pilot" aria-modal="false">
          <header className="o01-header">
            <div className="o01-header-left">
              <HologramRobot />
              <div className="o01-header-copy">
                <div className="o01-eyebrow"><span className="o01-signal-dot" /> VEHICLE SYSTEM // ONLINE</div>
                <h2>O-01 CO-PILOT</h2>
                <p>AI NAVIGATION &amp; DRIVER INTELLIGENCE</p>
              </div>
            </div>
            <button type="button" className="o01-close" onClick={() => setIsOpen(false)} aria-label="Close O-01">×</button>
          </header>

          <div className="o01-dashboard-strip">
            <span>MODE <b>AI ASSIST</b></span>
            <span>LINK <b>STABLE</b></span>
            <span>RPM <b>01</b></span>
          </div>

          <section className="o01-communication-log">
            {messages.map((message) => (
              <div key={message.id} className={`o01-message ${message.role}`}>
                {message.role === "user" ? <DriverAvatar small /> : <RobotAvatar small />}
                <div className="o01-message-content">
                  <div className="o01-message-meta">{message.role === "user" ? "DRIVER // YOU" : "O-01 // CO-PILOT"}</div>
                  <div className="o01-message-bubble">{message.content}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="o01-message assistant">
                <RobotAvatar small />
                <div className="o01-message-content">
                  <div className="o01-message-meta">O-01 // PROCESSING</div>
                  <div className="o01-message-bubble o01-typing"><span /><span /><span /></div>
                </div>
              </div>
            )}
          </section>

          <section className="o01-quick-actions">
            <div className="o01-section-label"><span /> PIT COMMANDS <small>SELECT A MISSION</small></div>
            <div className="o01-actions-grid">
              {quickActions.map((action) => (
                <button type="button" key={action.label} className="o01-action" onClick={() => void sendMessage(action.prompt)} disabled={isTyping}>
                  <span className="o01-action-icon"><CommandIcon type={action.icon} /></span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="o01-input-area">
            <form className="o01-input-form" onSubmit={handleSubmit}>
              <DriverAvatar small />
              <div className="o01-radio-wrap">
                <span className="o01-input-prefix">RADIO / TRANSMIT</span>
                <input ref={inputRef} type="text" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type your message to O-01..." maxLength={1000} disabled={isTyping} autoComplete="off" />
              </div>
              <button className="o01-accelerate" type="submit" disabled={!input.trim() || isTyping} aria-label="Accelerate / send message" title="Accelerate and send">
                <AccelerationPedalIcon />
                <span>ACCELERATE</span>
                <small>SEND</small>
              </button>
            </form>
          </div>

          <footer className="o01-chat-footer">
            <span><i /> O-01 // CO-PILOT LINK</span>
            <button type="button" onClick={openResume}>OPEN DRIVER FILE ↗</button>
            <em>MORE THAN A CHAT — A JOURNEY TOGETHER.</em>
          </footer>
        </section>
      )}
    </div>,
    document.body
  );
}
