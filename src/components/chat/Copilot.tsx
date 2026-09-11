import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import portfolio from "../../data/portfolio.json";
import "./Copilot.css";

const COPILOT_API_URL = (import.meta.env.VITE_COPILOT_API_URL || "").replace(/\/$/, "");
const COPILOT_ENDPOINT = COPILOT_API_URL ? `${COPILOT_API_URL}/api/copilot` : "/api/copilot";

type Message = { id: number; role: "user" | "assistant"; content: string };
type CommandIcon = "profile" | "projects" | "experience" | "certifications" | "contact";

type CommandCard = {
  title?: string;
  meta?: string;
  description?: string | string[];
  tech?: string[];
  impact?: string[];
  label?: string;
  value?: string;
};

type PitCommand = {
  id: string;
  label: string;
  icon: CommandIcon;
  heading: string;
  subheading: string;
  content: Array<string | CommandCard>;
};

const pitCommands = portfolio.copilot.pitCommands as PitCommand[];

function CommandIcon({ type }: { type: CommandIcon }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="o01-command-svg">
      {type === "profile" && <><circle {...common} cx="16" cy="10" r="5" /><path {...common} d="M7 27c1.5-5 4.5-7.5 9-7.5s7.5 2.5 9 7.5" /></>}
      {type === "projects" && <><path {...common} d="M5 9h8l2 3h12v13H5z" /><path {...common} d="M5 9V7h8l2 3" /></>}
      {type === "experience" && <><rect {...common} x="5" y="9" width="22" height="17" rx="1" /><path {...common} d="M11 9V6h10v3M5 16h22M13 16v3h6v-3" /></>}
      {type === "certifications" && <><path {...common} d="M8 5h16v15H8z" /><path {...common} d="M12 10h8M12 14h6M13 20l-2 7 5-3 5 3-2-7" /></>}
      {type === "contact" && <><path {...common} d="M5 8h22v16H5z" /><path {...common} d="m6 9 10 8L26 9" /><path {...common} d="M6 23l7-6M26 23l-7-6" /></>}
    </svg>
  );
}

function AccelerationPedalIcon() {
  return (
    <svg className="o01-acceleration-icon" viewBox="0 0 48 56" aria-hidden="true">
      <path d="M12 49h24" />
      <path d="M16 46V13c0-4 2.8-7 6.8-7h2.4c4 0 6.8 3 6.8 7v33" />
      <path d="M17 14h15M17 21h15M17 28h15M17 35h15" />
      <path d="M20 46v4M28 46v4" />
      <circle cx="20" cy="52" r="1.4" />
      <circle cx="28" cy="52" r="1.4" />
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

function CommandDataCard({ command }: { command: PitCommand }) {
  return (
    <div
      className="o01-data-response"
      style={{
        border: "1px solid rgba(255,255,255,.11)",
        borderLeft: "2px solid rgba(255,90,31,.8)",
        background: "linear-gradient(145deg,#11171b,#090c0f)",
        padding: "14px 15px",
        boxShadow: "0 12px 28px rgba(0,0,0,.25)",
      }}
    >
      <div style={{ color: "#ff7040", font: "700 9px/1 'IBM Plex Mono',monospace", letterSpacing: ".16em", marginBottom: 6 }}>
        {command.heading}
      </div>
      <div style={{ color: "#71808a", font: "600 8px/1.4 'IBM Plex Mono',monospace", letterSpacing: ".1em", marginBottom: 14 }}>
        {command.subheading}
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {command.content.map((item, index) => {
          if (typeof item === "string") {
            return (
              <div key={`${command.id}-line-${index}`} style={{ color: "#dbe1e5", font: "400 12px/1.6 'Space Grotesk',sans-serif" }}>
                {command.id === "certifications" ? <span style={{ color: "#ff7040", marginRight: 8 }}>0{index + 1}</span> : null}
                {item}
              </div>
            );
          }

          if (item.label && item.value) {
            const isLink = /^https?:\/\//.test(item.value);
            return (
              <div key={`${command.id}-contact-${index}`} style={{ display: "grid", gridTemplateColumns: "92px minmax(0,1fr)", gap: 10, alignItems: "start" }}>
                <span style={{ color: "#687780", font: "700 8px/1.5 'IBM Plex Mono',monospace", letterSpacing: ".12em" }}>{item.label}</span>
                {isLink ? (
                  <a href={item.value} target="_blank" rel="noreferrer" style={{ color: "#dbe1e5", font: "500 11px/1.5 'IBM Plex Mono',monospace", overflowWrap: "anywhere", textDecoration: "none" }}>{item.value}</a>
                ) : (
                  <span style={{ color: "#dbe1e5", font: "500 11px/1.5 'IBM Plex Mono',monospace", overflowWrap: "anywhere" }}>{item.value}</span>
                )}
              </div>
            );
          }

          return (
            <article key={`${command.id}-card-${index}`} style={{ borderTop: index ? "1px solid rgba(255,255,255,.07)" : "0", paddingTop: index ? 12 : 0 }}>
              {item.title && <h3 style={{ margin: 0, color: "#f2f2f0", font: "700 12px/1.35 'Space Grotesk',sans-serif", letterSpacing: ".03em" }}>{item.title}</h3>}
              {item.meta && <div style={{ marginTop: 4, color: "#ff7040", font: "600 7px/1.4 'IBM Plex Mono',monospace", letterSpacing: ".1em" }}>{item.meta}</div>}
              {item.description && (
                <div style={{ marginTop: 7, display: "grid", gap: 4 }}>
                  {(Array.isArray(item.description) ? item.description : [item.description]).map((line, lineIndex) => (
                    <div key={lineIndex} style={{ color: "#bfc8cd", font: "400 11px/1.5 'Space Grotesk',sans-serif" }}>{line}</div>
                  ))}
                </div>
              )}
              {item.tech && item.tech.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
                  {item.tech.map((tech) => <span key={tech} style={{ padding: "3px 6px", border: "1px solid rgba(77,163,255,.22)", color: "#8fb9d4", background: "rgba(77,163,255,.045)", font: "600 7px/1 'IBM Plex Mono',monospace" }}>{tech}</span>)}
                </div>
              )}
              {item.impact && item.impact.length > 0 && (
                <div style={{ marginTop: 8, display: "grid", gap: 4 }}>
                  {item.impact.map((impact) => <div key={impact} style={{ color: "#aeb9be", font: "400 10px/1.45 'Space Grotesk',sans-serif" }}><span style={{ color: "#ff7040", marginRight: 6 }}>›</span>{impact}</div>)}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function Copilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "assistant", content: "O-01 online. Direct portfolio data is available through the pit commands below. General questions are routed to the AI co-pilot." },
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

  const sendGeneralMessage = async (text: string) => {
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
      if (typeof data.reply !== "string" || !data.reply.trim()) throw new Error("Empty AI response");
      setMessages((previous) => [...previous, { id: messageId.current++, role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error("O-01 API error:", error);
      setMessages((previous) => [...previous, { id: messageId.current++, role: "assistant", content: "O-01 AI link is unavailable right now. Please try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const runPitCommand = (command: PitCommand) => {
    if (isTyping) return;
    setMessages((previous) => [
      ...previous,
      { id: messageId.current++, role: "assistant", content: `__PIT_COMMAND__${command.id}` },
    ]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendGeneralMessage(input);
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
            <span>MODE <b>DATA + AI</b></span>
            <span>LINK <b>STABLE</b></span>
            <span>RPM <b>01</b></span>
          </div>

          <section className="o01-communication-log">
            {messages.map((message) => {
              const commandId = message.content.startsWith("__PIT_COMMAND__") ? message.content.replace("__PIT_COMMAND__", "") : null;
              const command = commandId ? pitCommands.find((item) => item.id === commandId) : null;

              if (command) {
                return (
                  <div key={message.id} className="o01-message assistant">
                    <RobotAvatar small />
                    <div className="o01-message-content" style={{ width: "min(100%, 650px)" }}>
                      <div className="o01-message-meta">O-01 // DIRECT DATA</div>
                      <CommandDataCard command={command} />
                    </div>
                  </div>
                );
              }

              return (
                <div key={message.id} className={`o01-message ${message.role}`}>
                  {message.role === "user" ? <DriverAvatar small /> : <RobotAvatar small />}
                  <div className="o01-message-content">
                    <div className="o01-message-meta">{message.role === "user" ? "DRIVER // YOU" : "O-01 // CO-PILOT"}</div>
                    <div className="o01-message-bubble">{message.content}</div>
                  </div>
                </div>
              );
            })}
            {isTyping && (
              <div className="o01-message assistant">
                <RobotAvatar small />
                <div className="o01-message-content">
                  <div className="o01-message-meta">O-01 // PROCESSING AI QUERY</div>
                  <div className="o01-message-bubble o01-typing"><span /><span /><span /></div>
                </div>
              </div>
            )}
          </section>

          <section className="o01-quick-actions">
            <div className="o01-section-label"><span /> PIT COMMANDS <small>DIRECT PORTFOLIO DATA // NO AI</small></div>
            <div className="o01-actions-grid">
              {pitCommands.map((command) => (
                <button type="button" key={command.id} className="o01-action" onClick={() => runPitCommand(command)} disabled={isTyping}>
                  <span className="o01-action-icon"><CommandIcon type={command.icon} /></span>
                  <span>{command.label}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="o01-input-area">
            <form className="o01-input-form" onSubmit={handleSubmit}>
              <DriverAvatar small />
              <div className="o01-radio-wrap">
                <span className="o01-input-prefix">RADIO / AI QUERY</span>
                <input ref={inputRef} type="text" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask O-01 anything..." maxLength={1000} disabled={isTyping} autoComplete="off" />
              </div>
              <button className="o01-accelerate" type="submit" disabled={!input.trim() || isTyping} aria-label="Accelerate / send message" title="Accelerate and send">
                <AccelerationPedalIcon />
                <span>ACCELERATE</span>
                <small>SEND</small>
              </button>
            </form>
          </div>

          <footer className="o01-chat-footer">
            <span><i /> O-01 // DATA LINK</span>
            <button type="button" onClick={openResume}>OPEN DRIVER FILE ↗</button>
            <em>DIRECT DATA WHEN AVAILABLE. AI FOR EVERYTHING ELSE.</em>
          </footer>
        </section>
      )}
    </div>,
    document.body
  );
}
