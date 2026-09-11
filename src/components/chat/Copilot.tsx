import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

const COPILOT_API_URL = (import.meta.env.VITE_COPILOT_API_URL || "").replace(/\/$/, "");
const COPILOT_ENDPOINT = COPILOT_API_URL ? `${COPILOT_API_URL}/api/copilot` : "/api/copilot";

type Message = { id: number; role: "user" | "assistant"; content: string };

const quickActions = [
  "Tell me about Mahanthesh",
  "What are his skills?",
  "Show me his projects",
  "Tell me about his experience",
];

function CopilotIcon() {
  return (
    <div className="o01-launcher-icon">
      <div className="o01-robot-head"><div className="o01-robot-eye left" /><div className="o01-robot-eye right" /></div>
      <div className="o01-robot-body"><div className="o01-robot-core" /></div>
    </div>
  );
}

function HologramRobot() {
  return (
    <div className="o01-hologram">
      <div className="o01-holo-ring ring-one" /><div className="o01-holo-ring ring-two" />
      <div className="o01-holo-robot">
        <div className="o01-holo-head"><span /><span /></div>
        <div className="o01-holo-neck" />
        <div className="o01-holo-chest"><div className="o01-holo-core" /></div>
        <div className="o01-holo-shoulder left" /><div className="o01-holo-shoulder right" />
        <div className="o01-holo-arm left" /><div className="o01-holo-arm right" />
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

const o01Styles = `
.o01-root{position:fixed;inset:0;z-index:2147483647;pointer-events:none;font-family:inherit}
.o01-root *{box-sizing:border-box}
.o01-floating{position:fixed!important;right:24px!important;bottom:24px!important;width:72px!important;height:72px!important;padding:0!important;border:1px solid rgba(77,163,255,.55)!important;border-radius:50%!important;background:rgba(8,9,11,.94)!important;color:#f2f2f0!important;display:flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;pointer-events:auto!important;z-index:2147483647!important;box-shadow:0 10px 35px rgba(0,0,0,.45),0 0 25px rgba(77,163,255,.2)!important;touch-action:manipulation!important}
.o01-floating:hover{transform:translateY(-3px);border-color:#4da3ff!important}
.o01-floating-label{position:absolute;right:-4px;bottom:-5px;padding:3px 7px;border:1px solid rgba(77,163,255,.45);border-radius:999px;background:#08090b;color:#4da3ff;font:700 9px/1 monospace;letter-spacing:.12em}
.o01-launcher-icon{position:relative;width:38px;height:43px;display:flex;align-items:center;flex-direction:column;filter:drop-shadow(0 0 8px rgba(77,163,255,.45))}
.o01-robot-head{position:relative;width:27px;height:21px;border:2px solid #9ed0ff;border-radius:8px 8px 5px 5px;background:linear-gradient(180deg,#53677a,#151b22);display:flex;justify-content:space-around;align-items:center}
.o01-robot-eye{width:5px;height:3px;border-radius:2px;background:#8fd0ff;box-shadow:0 0 6px #4da3ff}.o01-robot-body{margin-top:3px;width:33px;height:19px;border:2px solid #7395b5;border-radius:7px 7px 9px 9px;background:#17202a;position:relative}.o01-robot-core{position:absolute;width:7px;height:7px;border-radius:50%;background:#4da3ff;box-shadow:0 0 9px #4da3ff;left:50%;top:50%;transform:translate(-50%,-50%)}
.o01-chat-panel{position:fixed;right:24px;bottom:24px;width:min(430px,calc(100vw - 32px));height:min(680px,calc(100vh - 32px));display:flex;flex-direction:column;overflow:hidden;pointer-events:auto;z-index:2147483647;border:1px solid rgba(77,163,255,.35);background:rgba(8,9,11,.98);color:#f2f2f0;box-shadow:0 24px 70px rgba(0,0,0,.65),0 0 35px rgba(77,163,255,.12);border-radius:16px}
.o01-header{flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid rgba(255,255,255,.08);background:linear-gradient(135deg,rgba(24,28,33,.98),rgba(8,9,11,.98))}.o01-header-left{display:flex;align-items:center;gap:12px;min-width:0}.o01-header h2{margin:2px 0 2px;font-size:16px;letter-spacing:.08em}.o01-header p,.o01-eyebrow{margin:0;color:#8f99a5;font-size:10px;letter-spacing:.08em}.o01-eyebrow{color:#4da3ff;font-weight:700}.o01-close{border:0;background:transparent;color:#aeb7c2;font-size:27px;line-height:1;cursor:pointer;padding:5px}.o01-close:hover{color:#fff}
.o01-hologram{position:relative;width:54px;height:54px;flex:0 0 54px;display:flex;align-items:center;justify-content:center}.o01-holo-ring{position:absolute;border:1px solid rgba(77,163,255,.45);border-radius:50%}.o01-holo-ring.ring-one{width:50px;height:16px;transform:rotate(10deg)}.o01-holo-ring.ring-two{width:42px;height:42px}.o01-holo-robot{position:relative;width:25px;height:38px;filter:drop-shadow(0 0 5px rgba(77,163,255,.7))}.o01-holo-head{width:18px;height:13px;margin:auto;border:1px solid #9ed0ff;border-radius:4px;background:#31506a;display:flex;justify-content:space-around;padding-top:4px}.o01-holo-head span{width:3px;height:2px;background:#bfe2ff}.o01-holo-neck{width:7px;height:4px;margin:auto;background:#7296b5}.o01-holo-chest{width:22px;height:16px;margin:auto;border:1px solid #7ea5c7;border-radius:4px;background:#1b3143;position:relative}.o01-holo-core{width:5px;height:5px;border-radius:50%;background:#4da3ff;box-shadow:0 0 7px #4da3ff;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}.o01-holo-shoulder,.o01-holo-arm{position:absolute;background:#42657f}.o01-holo-shoulder{width:7px;height:6px;top:18px}.o01-holo-shoulder.left,.o01-holo-arm.left{left:0}.o01-holo-shoulder.right,.o01-holo-arm.right{right:0}.o01-holo-arm{width:4px;height:13px;top:24px}
.o01-status-bar{flex:0 0 auto;display:flex;align-items:center;gap:7px;padding:8px 18px;color:#8f99a5;font:700 9px monospace;letter-spacing:.12em;border-bottom:1px solid rgba(255,255,255,.06)}.o01-status-dot{width:6px;height:6px;border-radius:50%;background:#4da3ff;box-shadow:0 0 7px #4da3ff}.o01-status-divider{opacity:.4}
.o01-communication-log{flex:1 1 auto;min-height:0;overflow-y:auto;padding:14px 16px;display:flex;flex-direction:column;gap:12px;overscroll-behavior:contain}.o01-message{display:flex;gap:8px;align-items:flex-start}.o01-message.user{flex-direction:row-reverse}.o01-message-avatar{flex:0 0 auto;color:#4da3ff;font:700 8px monospace;letter-spacing:.06em;padding-top:5px}.o01-message.user .o01-message-avatar{color:#ff8b5d}.o01-message-bubble{max-width:82%;padding:10px 12px;border:1px solid rgba(255,255,255,.08);border-radius:10px;background:#111419;color:#dce2e8;font-size:12px;line-height:1.5;overflow-wrap:anywhere}.o01-message.user .o01-message-bubble{background:#181c21;border-color:rgba(255,90,31,.22)}.o01-typing{display:flex;gap:4px}.o01-typing span{width:5px;height:5px;border-radius:50%;background:#4da3ff;animation:o01blink 1s infinite}.o01-typing span:nth-child(2){animation-delay:.15s}.o01-typing span:nth-child(3){animation-delay:.3s}@keyframes o01blink{50%{opacity:.25}}
.o01-quick-actions{flex:0 0 auto;padding:10px 16px;border-top:1px solid rgba(255,255,255,.06)}.o01-section-label{margin-bottom:7px;color:#6f7a86;font:700 8px monospace;letter-spacing:.12em}.o01-actions-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}.o01-action{min-width:0;text-align:left;border:1px solid rgba(255,255,255,.08);background:#111419;color:#aeb7c2;border-radius:7px;padding:8px;font-size:9px;cursor:pointer}.o01-action:hover:not(:disabled){border-color:rgba(77,163,255,.5);color:#f2f2f0}.o01-action:disabled{opacity:.45;cursor:not-allowed}.o01-action-icon{color:#4da3ff;margin-right:5px}
.o01-input-area{flex:0 0 auto;padding:10px 16px;border-top:1px solid rgba(255,255,255,.06)}.o01-input-form{display:flex;align-items:center;gap:7px;border:1px solid rgba(77,163,255,.25);background:#0d1014;border-radius:8px;padding:4px 6px}.o01-input-prefix{color:#4da3ff;font:700 13px monospace}.o01-input-form input{min-width:0;flex:1;border:0;outline:0;background:transparent;color:#f2f2f0;font-size:12px;padding:8px}.o01-input-form input::placeholder{color:#59636e}.o01-input-form button{border:0;border-radius:5px;background:#4da3ff;color:#08090b;font:800 9px monospace;padding:8px 10px;cursor:pointer}.o01-input-form button:disabled{opacity:.35;cursor:not-allowed}
.o01-chat-footer{flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;padding:9px 16px;color:#59636e;font:8px monospace;letter-spacing:.08em}.o01-chat-footer button{border:0;background:transparent;color:#4da3ff;font:700 8px monospace;cursor:pointer}
@media(max-width:600px){.o01-floating{right:16px!important;bottom:16px!important;width:64px!important;height:64px!important}.o01-chat-panel{right:8px;bottom:8px;width:calc(100vw - 16px);height:calc(100vh - 16px);border-radius:12px}.o01-header{padding:13px}.o01-status-bar,.o01-communication-log,.o01-quick-actions,.o01-input-area{padding-left:12px;padding-right:12px}.o01-actions-grid{grid-template-columns:1fr}.o01-message-bubble{max-width:88%}}
@media(prefers-reduced-motion:reduce){.o01-floating:hover{transform:none}.o01-typing span{animation:none}}
`;

export function Copilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 1, role: "assistant", content: "O-01 online. I'm Mahanthesh's AI Co-Pilot. Ask me anything about his journey, skills, projects or experience." }]);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageId = useRef(2);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 100);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    const message = text.trim();
    if (!message || isTyping) return;
    setMessages((previous) => [...previous, { id: messageId.current++, role: "user", content: message }]);
    setInput("");
    setIsTyping(true);
    try {
      const response = await fetch(COPILOT_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message }) });
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
    <>
      <style>{o01Styles}</style>
      <div className="o01-root">
        {!isOpen && (
          <button type="button" className="o01-floating" onClick={() => setIsOpen(true)} aria-label="Open O-01 AI Co-Pilot">
            <CopilotIcon /><span className="o01-floating-label">O-01</span>
          </button>
        )}
        {isOpen && (
          <div className="o01-chat-panel">
            <header className="o01-header">
              <div className="o01-header-left"><HologramRobot /><div><div className="o01-eyebrow">SYSTEM ONLINE</div><h2>O-01 CO-PILOT</h2><p>Mahanthesh // AI Assistant</p></div></div>
              <button type="button" className="o01-close" onClick={() => setIsOpen(false)} aria-label="Close O-01">×</button>
            </header>
            <div className="o01-status-bar"><span className="o01-status-dot" /><span>ONLINE</span><span className="o01-status-divider">//</span><span>READY</span></div>
            <section className="o01-communication-log">
              {messages.map((message) => (
                <div key={message.id} className={`o01-message ${message.role === "user" ? "user" : "assistant"}`}>
                  <div className="o01-message-avatar">{message.role === "user" ? "YOU" : "O-01"}</div>
                  <div className="o01-message-bubble">{message.content}</div>
                </div>
              ))}
              {isTyping && <div className="o01-message assistant"><div className="o01-message-avatar">O-01</div><div className="o01-message-bubble o01-typing"><span /><span /><span /></div></div>}
            </section>
            <section className="o01-quick-actions"><div className="o01-section-label">QUICK COMMANDS</div><div className="o01-actions-grid">{quickActions.map((action) => <button type="button" key={action} className="o01-action" onClick={() => void sendMessage(action)} disabled={isTyping}><span className="o01-action-icon">→</span>{action}</button>)}</div></section>
            <div className="o01-input-area"><form className="o01-input-form" onSubmit={handleSubmit}><span className="o01-input-prefix">&gt;</span><input ref={inputRef} type="text" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask O-01..." maxLength={1000} disabled={isTyping} autoComplete="off" /><button type="submit" disabled={!input.trim() || isTyping}>SEND</button></form></div>
            <footer className="o01-chat-footer"><span>O-01 // AI CO-PILOT</span><button type="button" onClick={openResume}>VIEW RESUME ↗</button></footer>
          </div>
        )}
      </div>
    </>,
    document.body
  );
}
