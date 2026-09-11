import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";

const COPILOT_API_URL =
  (import.meta.env.VITE_COPILOT_API_URL || "").replace(/\/$/, "");

const COPILOT_ENDPOINT = COPILOT_API_URL
  ? `${COPILOT_API_URL}/api/copilot`
  : "/api/copilot";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

type Destination = {
  label: string;
  url: string;
};

const quickActions = [
  "Tell me about Mahanthesh",
  "What are his skills?",
  "Show me his projects",
  "Tell me about his experience",
];
function CopilotIcon() {
  return (
    <div className="o01-launcher-icon">
      <div className="o01-robot-head">
        <div className="o01-robot-eye left" />
        <div className="o01-robot-eye right" />
      </div>

      <div className="o01-robot-body">
        <div className="o01-robot-core" />
      </div>
    </div>
  );
}

function HologramRobot() {
  return (
    <div className="o01-hologram">
      <div className="o01-holo-ring ring-one" />
      <div className="o01-holo-ring ring-two" />

      <div className="o01-holo-robot">
        <div className="o01-holo-head">
          <span />
          <span />
        </div>

        <div className="o01-holo-neck" />

        <div className="o01-holo-chest">
          <div className="o01-holo-core" />
        </div>

        <div className="o01-holo-shoulder left" />
        <div className="o01-holo-shoulder right" />

        <div className="o01-holo-arm left" />
        <div className="o01-holo-arm right" />
      </div>
    </div>
  );
}
function localResponse(message: string): string {
  const text = message.toLowerCase();

  if (
    text.includes("who") ||
    text.includes("mahanthesh") ||
    text.includes("about")
  ) {
    return "Mahanthesh S is an entry-level Software Engineer specializing in Java, Spring Boot, Python, REST APIs, React and PostgreSQL.";
  }

  if (text.includes("skill")) {
    return "His core skills include Java, Python, DSA, Spring Boot, REST APIs, Spring Security, Hibernate/JPA, JWT, React, TypeScript, PostgreSQL and SQL.";
  }

  if (text.includes("project")) {
    return "Featured projects include Banking System Web Application, Novel Journey, Blinkit Dashboard and M-ai-L, an AI Email Agent.";
  }

  if (text.includes("experience")) {
    return "Mahanthesh has experience as a Web Development Intern at Mindset IT Solution and as a Customer Service Support Intern at Era Foundation Pvt Ltd.";
  }

  return "I'm O-01, Mahanthesh's AI Co-Pilot. Ask me about his skills, projects, experience, education or certifications.";
}

export function Copilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "O-01 online. I'm Mahanthesh's AI Co-Pilot. Ask me anything about his journey, skills, projects or experience.",
    },
  ]);

  const [isLaunching, setIsLaunching] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const messageId = useRef(2);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    const message = text.trim();

    if (!message || isTyping) return;

    const userMessage: Message = {
      id: messageId.current++,
      role: "user",
      content: message,
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(
        COPILOT_ENDPOINT,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Request failed: ${response.status}`
        );
      }

      const data = await response.json();

      const reply =
        typeof data.reply === "string"
          ? data.reply
          : localResponse(message);

      setMessages((previous) => [
        ...previous,
        {
          id: messageId.current++,
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (error) {
      console.error(
        "O-01 API error:",
        error
      );

      setMessages((previous) => [
        ...previous,
        {
          id: messageId.current++,
          role: "assistant",
          content: localResponse(message),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleQuickAction = (
    action: string
  ) => {
    sendMessage(action);
  };

  const openResume = () => {
    window.open(
      "/assets/resume/resume.pdf",
      "_blank",
      "noopener,noreferrer"
    );
  };
  return createPortal(
    <div className="o01-root">
      {!isOpen && (
        <button
          type="button"
          className="o01-floating"
          onClick={() => setIsOpen(true)}
          aria-label="Open O-01 AI Co-Pilot"
        >
          <CopilotIcon />

          <span className="o01-floating-label">
            O-01
          </span>
        </button>
      )}

      {isOpen && (
        <div className="o01-chat-panel">
          <header className="o01-header">
            <div className="o01-header-left">
              <HologramRobot />

              <div>
                <div className="o01-eyebrow">
                  SYSTEM ONLINE
                </div>

                <h2>O-01 CO-PILOT</h2>

                <p>
                  Mahanthesh // AI Assistant
                </p>
              </div>
            </div>

            <button
              type="button"
              className="o01-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close O-01"
            >
              ×
            </button>
          </header>

          <div className="o01-status-bar">
            <span className="o01-status-dot" />
            <span>ONLINE</span>

            <span className="o01-status-divider">
              //
            </span>

            <span>READY</span>
          </div>

          <section className="o01-communication-log">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`o01-message ${
                  message.role === "user"
                    ? "user"
                    : "assistant"
                }`}
              >
                <div className="o01-message-avatar">
                  {message.role === "user"
                    ? "YOU"
                    : "O-01"}
                </div>

                <div className="o01-message-bubble">
                  {message.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="o01-message assistant">
                <div className="o01-message-avatar">
                  O-01
                </div>

                <div className="o01-message-bubble o01-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </section>

          <section className="o01-quick-actions">
            <div className="o01-section-label">
              QUICK COMMANDS
            </div>

            <div className="o01-actions-grid">
              {quickActions.map((action) => (
                <button
                  type="button"
                  key={action}
                  className="o01-action"
                  onClick={() =>
                    handleQuickAction(action)
                  }
                  disabled={isTyping}
                >
                  <span className="o01-action-icon">
                    →
                  </span>

                  <span>{action}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="o01-input-area">
            <form
              className="o01-input-form"
              onSubmit={handleSubmit}
            >
              <span className="o01-input-prefix">
                &gt;
              </span>

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                placeholder="Ask O-01..."
                maxLength={1000}
                disabled={isTyping}
                autoComplete="off"
              />

              <button
                type="submit"
                disabled={
                  !input.trim() || isTyping
                }
                aria-label="Send message"
              >
                SEND
              </button>
            </form>
          </div>

          <footer className="o01-chat-footer">
            <span>
              O-01 // AI CO-PILOT
            </span>

            <button
              type="button"
              onClick={openResume}
            >
              VIEW RESUME ↗
            </button>
          </footer>
        </div>
      )}
    </div>,
    document.body
  );
}