import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import "./Copilot.css";

const COPILOT_API_URL = (import.meta.env.VITE_COPILOT_API_URL || "").replace(/\/$/, "");
const COPILOT_ENDPOINT = COPILOT_API_URL ? `${COPILOT_API_URL}/api/copilot` : "/api/copilot";

type Message = { id: number; role: "user" | "assistant"; content: string };

const quickActions = [
  "Tell me about Mahanthesh",
  "What are his skills?",
  "Show me his projects",
  "Tell me about his experience",
];

function AccelerationIcon() {
  return (
    <svg className="o01-acceleration-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19h14M7 17l3-10h4l3 10M9 14h6" />
      <path d="M12 3v5M9.5 5.5 12 3l2.5 2.5" />
    </svg>
  );
}

function CopilotIcon() {
  return (
    <div className="o01-launcher-icon" aria-hidden="true">
      <div className="o01-launcher-ring" />
      <div className="o01-mini-robot-head"><i /><i /></div>
      <div className="o01-mini-robot-chest"><b /></div>
    </div>
  );
}

/* Original armored O-01 hologram: angular red/blue robot styling inspired by classic transforming-robot silhouettes, not a replica asset. */
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
          <CopilotIcon />
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
                <div className="o01-message-avatar">{message.role === "user" ? "DRIVER" : "O-01"}</div>
                <div className="o01-message-bubble">{message.content}</div>
              </div>
            ))}
            {isTyping && (
              <div className="o01-message assistant">
                <div className="o01-message-avatar">O-01</div>
                <div className="o01-message-bubble o01-typing"><span /><span /><span /></div>
              </div>
            )}
          </section>

          <section className="o01-quick-actions">
            <div className="o01-section-label">PIT COMMANDS</div>
            <div className="o01-actions-grid">
              {quickActions.map((action) => (
                <button type="button" key={action} className="o01-action" onClick={() => void sendMessage(action)} disabled={isTyping}>
                  <span className="o01-action-icon">›</span>{action}
                </button>
              ))}
            </div>
          </section>

          <div className="o01-input-area">
            <form className="o01-input-form" onSubmit={handleSubmit}>
              <span className="o01-input-prefix">RADIO</span>
              <input ref={inputRef} type="text" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Transmit to O-01..." maxLength={1000} disabled={isTyping} autoComplete="off" />
              <button className="o01-accelerate" type="submit" disabled={!input.trim() || isTyping} aria-label="Accelerate / send message" title="Accelerate">
                <AccelerationIcon />
              </button>
            </form>
          </div>

          <footer className="o01-chat-footer">
            <span>O-01 // CO-PILOT LINK</span>
            <button type="button" onClick={openResume}>OPEN DRIVER FILE ↗</button>
          </footer>
        </section>
      )}
    </div>,
    document.body
  );
}
