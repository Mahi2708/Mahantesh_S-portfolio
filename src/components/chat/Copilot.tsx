import {
  useEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";


/* ============================================================
   TYPES
============================================================ */

type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
  time: string;
};


/* ============================================================
   QUICK ACTIONS
============================================================ */

const QUICK_ACTIONS = [
  {
    id: "projects",
    label: "PROJECTS",
    sub: "View missions",
    icon: "car",
    prompt:
      "Tell me about Mahanthesh's projects.",
  },

  {
    id: "skills",
    label: "SKILLS",
    sub: "Tech stack",
    icon: "tools",
    prompt:
      "What are Mahanthesh's key skills?",
  },

  {
    id: "experience",
    label: "EXPERIENCE",
    sub: "Career history",
    icon: "briefcase",
    prompt:
      "What experience does Mahanthesh have?",
  },

  {
    id: "journey",
    label: "JOURNEY",
    sub: "Learning path",
    icon: "route",
    prompt:
      "Tell me about Mahanthesh's journey.",
  },

  {
    id: "certifications",
    label: "CERTIFICATIONS",
    sub: "Credentials",
    icon: "badge",
    prompt:
      "What certifications does Mahanthesh have?",
  },

  {
    id: "resume",
    label: "RESUME",
    sub: "Open resume",
    icon: "file",
    prompt:
      "Show me Mahanthesh's resume.",
  },
];


/* ============================================================
   TIME
============================================================ */

function getTime() {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  ).format(new Date());
}


/* ============================================================
   ICONS
============================================================ */

function Icon({
  name,
  size = 18,
}: {
  name: string;
  size?: number;
}) {

  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };


  switch (name) {

    case "car":
      return (
        <svg {...common}>
          <path d="M5 16l1.5-5h11L19 16" />
          <path d="M4 16h16v3H4z" />

          <circle cx="7" cy="19" r="1.4" />
          <circle cx="17" cy="19" r="1.4" />

          <path d="M8 11l1.2-3h5.6l1.2 3" />
        </svg>
      );


    case "tools":
      return (
        <svg {...common}>
          <path d="M14.5 6.5a4 4 0 0 0-5 5L4 17l3 3 5.5-5.5a4 4 0 0 0 5-5l-2.2 2.2-2.2-.7-.7-2.2z" />
        </svg>
      );


    case "briefcase":
      return (
        <svg {...common}>
          <rect
            x="3"
            y="7"
            width="18"
            height="13"
            rx="2"
          />

          <path d="M8 7V5h8v2" />
          <path d="M3 12h18" />
          <path d="M10 12v2h4v-2" />
        </svg>
      );


    case "route":
      return (
        <svg {...common}>
          <circle
            cx="6"
            cy="18"
            r="2.5"
          />

          <circle
            cx="18"
            cy="6"
            r="2.5"
          />

          <path d="M8.5 18h2c3 0 3-5 5-5h1" />
          <path d="M15 13l2.5-2.5" />
        </svg>
      );


    case "badge":
      return (
        <svg {...common}>
          <circle
            cx="12"
            cy="9"
            r="5"
          />

          <path d="M9 13l-1 7 3-2 3 2-1-7" />
          <path d="M10 9l1.3 1.2L14 7.8" />
        </svg>
      );


    case "file":
      return (
        <svg {...common}>
          <path d="M6 3h8l4 4v14H6z" />
          <path d="M14 3v5h5" />
          <path d="M9 12h6" />
          <path d="M9 16h6" />
        </svg>
      );


    case "close":
      return (
        <svg {...common}>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </svg>
      );


    case "minimize":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
        </svg>
      );


    case "microphone":
      return (
        <svg {...common}>
          <rect
            x="9"
            y="3"
            width="6"
            height="12"
            rx="3"
          />

          <path d="M5 11a7 7 0 0 0 14 0" />
          <path d="M12 18v3" />
          <path d="M9 21h6" />
        </svg>
      );


    /* ACCELERATOR */

    case "accelerator":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
        >

          <path
            d="M10 27L14 5h9l-3 22H10Z"
            fill="currentColor"
            opacity=".18"
          />

          <path
            d="M10 27L14 5h9l-3 22H10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <path
            d="M14 11h7M13 16h7M12 21h7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          <path
            d="M5 27h22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />

        </svg>
      );


    case "speed":
      return (
        <svg {...common}>
          <path d="M4 16a8 8 0 0 1 16 0" />
          <path d="M12 16l4-5" />
          <path d="M7 19h10" />
        </svg>
      );


    case "spark":
      return (
        <svg {...common}>
          <path d="M12 2l1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7z" />
        </svg>
      );


    default:
      return null;
  }
}


/* ============================================================
   HOLOGRAM ROBOT
============================================================ */

function HologramRobot() {

  return (
    <div className="o01-holo">

      <div className="o01-holo-aura" />

      <div className="o01-holo-beam" />


      <div className="o01-robot">

        <div
          className="
            o01-robot-antenna
            o01-antenna-left
          "
        />

        <div
          className="
            o01-robot-antenna
            o01-antenna-right
          "
        />


        <div className="o01-robot-head">

          <span
            className="
              o01-robot-eye
              left
            "
          />

          <span
            className="
              o01-robot-eye
              right
            "
          />

          <span className="o01-robot-face-line" />

        </div>


        <div className="o01-robot-neck" />


        <div className="o01-robot-body">

          <div className="o01-robot-core">
            <span />
          </div>

          <div
            className="
              o01-robot-shoulder
              left
            "
          />

          <div
            className="
              o01-robot-shoulder
              right
            "
          />

          <div
            className="
              o01-robot-chest-line
              one
            "
          />

          <div
            className="
              o01-robot-chest-line
              two
            "
          />

        </div>

      </div>


      <div className="o01-holo-rings">

        <span />
        <span />
        <span />

      </div>


      <div className="o01-holo-base">

        <div className="o01-base-light" />

        <strong>
          O-01
        </strong>

        <small>
          AI ASSISTANT
        </small>

      </div>

    </div>
  );
}


/* ============================================================
   COPILOT
============================================================ */

export function Copilot() {

  const [isOpen, setIsOpen] =
    useState(false);

  const [input, setInput] =
    useState("");

  const [isTyping, setIsTyping] =
    useState(false);


  const [messages, setMessages] =
    useState<Message[]>([
      {
        id: 1,

        role: "assistant",

        text:
          "Welcome aboard. I'm O-01, the AI Assistant of Mahanthesh S. I can help you explore his projects, skills, experience, certifications and developer journey.",

        time: getTime(),
      },
    ]);


  const inputRef =
    useRef<HTMLInputElement>(null);


  const messagesRef =
    useRef<HTMLDivElement>(null);


  /* ==========================================================
     AUTO OPEN AFTER 5 SECONDS
  ========================================================== */

  useEffect(() => {

    const timer =
      window.setTimeout(() => {

        setIsOpen(true);

      }, 5000);


    return () => {

      window.clearTimeout(timer);

    };

  }, []);


  /* ==========================================================
     FOCUS INPUT
  ========================================================== */

  useEffect(() => {

    if (!isOpen) {
      return;
    }


    const timer =
      window.setTimeout(() => {

        inputRef.current?.focus();

      }, 350);


    return () => {

      window.clearTimeout(timer);

    };

  }, [isOpen]);


  /* ==========================================================
     SCROLL CHAT
  ========================================================== */

  useEffect(() => {

    if (!messagesRef.current) {
      return;
    }


    messagesRef.current.scrollTo({
      top:
        messagesRef.current.scrollHeight,

      behavior: "smooth",
    });

  }, [
    messages,
    isTyping,
  ]);


  /* ==========================================================
     FALLBACK AI
  ========================================================== */

  function localResponse(
    question: string
  ) {

    const q =
      question.toLowerCase();


    if (
      q.includes("novel journey")
    ) {

      return (
        "Novel Journey is Mahanthesh's novel reading platform built with Spring Boot, React, Spring Security, JWT, PostgreSQL and JPA/Hibernate. It includes role-based access, content workflows and API performance optimization."
      );

    }


    if (
      q.includes("skill") ||
      q.includes("technology") ||
      q.includes("tech stack")
    ) {

      return (
        "Mahanthesh works primarily with Java, Spring Boot, REST APIs, Spring Security, Hibernate/JPA, PostgreSQL, SQL, React and TypeScript. He also has experience with Python, Git, GCP, Postman, OpenAPI, Power BI and Figma."
      );

    }


    if (
      q.includes("experience") ||
      q.includes("intern") ||
      q.includes("work")
    ) {

      return (
        "Mahanthesh has worked as a Web Development Intern at Mindset IT Solution, where he worked with Spring Boot REST APIs, layered architecture, PostgreSQL, Hibernate/JPA, JWT authentication, RBAC, validation, exception handling and deployment/testing. He also has customer service support internship experience at Era Foundation Pvt Ltd."
      );

    }


    if (
      q.includes("certification")
    ) {

      return (
        "Mahanthesh's certifications include Google Cloud Skill Badge – Prompt Design in Vertex AI, Oracle SQL Certification – SQL Basics, Certified Network Security Practitioner (CNSP) from The SecOps Group, and the Tata Cybersecurity Analyst Simulation from Forage."
      );

    }


    if (
      q.includes("resume")
    ) {

      window.open(
        "/assets/resume/resume.pdf",
        "_blank",
        "noopener,noreferrer"
      );


      return (
        "Opening Mahanthesh's resume."
      );

    }


    if (
      q.includes("hire") ||
      q.includes("why")
    ) {

      return (
        "Mahanthesh combines backend development with practical full-stack project experience across Spring Boot, REST APIs, databases, security and React. His projects demonstrate an interest in building complete, usable software."
      );

    }


    if (
      q.includes("journey")
    ) {

      return (
        "Mahanthesh's journey is centered around software engineering, with a strong focus on Java and backend development while also working across React, databases, cloud tools and data visualization."
      );

    }


    return (
      "I can help you explore Mahanthesh's projects, skills, experience, certifications, journey or resume. Select a destination above or ask me a question."
    );
  }


  /* ==========================================================
     SEND MESSAGE
  ========================================================== */

  async function sendMessage(
    question?: string
  ) {

    const message =
      (
        question ??
        input
      ).trim();


    if (
      !message ||
      isTyping
    ) {
      return;
    }


    setInput("");


    const userMessage: Message = {

      id: Date.now(),

      role: "user",

      text: message,

      time: getTime(),

    };


    setMessages(
      previous => [
        ...previous,
        userMessage,
      ]
    );


    setIsTyping(true);


    try {

      const response =
        await fetch(
          "/api/copilot",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              message,
            }),
          }
        );


      if (!response.ok) {

        throw new Error(
          "Copilot API unavailable"
        );

      }


      const data =
        await response.json();


      const assistantMessage: Message = {

        id:
          Date.now() + 1,

        role:
          "assistant",

        text:
          data.reply ||
          data.message ||
          localResponse(message),

        time:
          getTime(),

      };


      setMessages(
        previous => [
          ...previous,
          assistantMessage,
        ]
      );

    } catch {

      const assistantMessage: Message = {

        id:
          Date.now() + 1,

        role:
          "assistant",

        text:
          localResponse(message),

        time:
          getTime(),

      };


      setMessages(
        previous => [
          ...previous,
          assistantMessage,
        ]
      );

    } finally {

      setIsTyping(false);

    }

  }


  /* ==========================================================
     SUBMIT
  ========================================================== */

  function handleSubmit(
    event: React.FormEvent
  ) {

    event.preventDefault();

    sendMessage();

  }


  /* ==========================================================
     CLOSE
  ========================================================== */

  function closeChat() {

    setIsOpen(false);

  }


  /* ==========================================================
     OPEN
  ========================================================== */

  function openChat() {

    setIsOpen(true);

  }


  /* ============================================================
     CLOSED STATE

     IMPORTANT:
     When closed ONLY the launcher exists.
     The chat panel does not exist in the DOM.
  ============================================================ */

  if (!isOpen) {

    return createPortal(

      <div className="o01-root">

        <button
          type="button"
          className="o01-floating"
          onClick={openChat}
          aria-label="Open O-01 AI Assistant"
          aria-expanded="false"
        >

          <div
            className="
              o01-launcher-ring
              ring-one
            "
          />

          <div
            className="
              o01-launcher-ring
              ring-two
            "
          />


          <div className="o01-launcher-status">

            <span />

            O-01

          </div>


          <HologramRobot />


          <div className="o01-launcher-label">

            <strong>
              AI CO-PILOT
            </strong>

            <small>
              TAP TO CONNECT
            </small>

          </div>

        </button>

      </div>,

      document.body

    );

  }


  /* ============================================================
     OPEN STATE

     IMPORTANT:
     When open ONLY the chat exists.
     The floating launcher does not exist in the DOM.
  ============================================================ */

  return createPortal(

    <div className="o01-root">

      <section
        className="o01-chat-panel o01-chat-visible"
        aria-label="O-01 AI Assistant"
      >

        {/* ====================================================
           HEADER
        ==================================================== */}

        <header className="o01-panel-top">

          <div className="o01-panel-brand">

            <div className="o01-brand-mark">
              O-01
            </div>


            <div>

              <div className="o01-brand-title">
                AI ASSISTANT
              </div>

              <div className="o01-brand-subtitle">
                OF MAHANTHESH S
              </div>

            </div>

          </div>


          <div className="o01-system-status">

            <span className="o01-online-dot" />

            ONLINE

          </div>


          <div className="o01-panel-controls">

            <button
              type="button"
              aria-label="Minimize"
              onClick={closeChat}
            >

              <Icon
                name="minimize"
                size={17}
              />

            </button>


            <button
              type="button"
              aria-label="Close"
              onClick={closeChat}
            >

              <Icon
                name="close"
                size={17}
              />

            </button>

          </div>

        </header>


        {/* ====================================================
           TELEMETRY
        ==================================================== */}

        <div className="o01-telemetry">

          <div>
            <span>SYSTEM</span>
            <strong>O-01</strong>
          </div>

          <div>
            <span>MODE</span>
            <strong>ASSIST</strong>
          </div>

          <div>
            <span>STATUS</span>
            <strong>READY</strong>
          </div>

          <div>
            <span>SYNC</span>
            <strong>100%</strong>
          </div>

        </div>


        {/* ====================================================
           CHAT CONTENT
        ==================================================== */}

        <div
          className="o01-messages"
          ref={messagesRef}
        >

          {/* INTRO */}

          <div className="o01-intro-card">

            <div className="o01-intro-avatar">

              <HologramRobot />

            </div>


            <div className="o01-intro-copy">

              <div className="o01-intro-eyebrow">

                <span />

                ONBOARD ASSISTANT

              </div>


              <h3>

                AI ASSISTANT

                <br />

                <em>
                  OF MAHANTHESH S
                </em>

              </h3>


              <p>

                Your co-pilot for exploring
                the engineering work,
                projects and journey of
                Mahanthesh S.

              </p>


              <div className="o01-intro-line">

                <span>
                  ENGINE
                </span>

                <b>
                  READY
                </b>

              </div>

            </div>

          </div>


          {/* DESTINATIONS */}

          <div className="o01-section-heading">

            <span>
              01
            </span>

            SELECT DESTINATION

            <i />

          </div>


          <div className="o01-actions-grid">

            {QUICK_ACTIONS.map(
              action => (

                <button
                  key={action.id}
                  type="button"
                  className="o01-action-card"
                  onClick={() =>
                    sendMessage(
                      action.prompt
                    )
                  }
                >

                  <span className="o01-action-icon">

                    <Icon
                      name={action.icon}
                      size={18}
                    />

                  </span>


                  <span className="o01-action-content">

                    <strong>
                      {action.label}
                    </strong>

                    <small>
                      {action.sub}
                    </small>

                  </span>


                  <span className="o01-action-arrow">
                    →
                  </span>

                </button>

              )
            )}

          </div>


          {/* COMMUNICATION LOG */}

          <div
            className="
              o01-section-heading
              o01-conversation-heading
            "
          >

            <span>
              02
            </span>

            COMMUNICATION LOG

            <i />

          </div>


          {messages.map(
            message => (

              <div
                key={message.id}
                className={`
                  o01-message-row
                  ${
                    message.role ===
                    "user"
                      ? "o01-user-row"
                      : "o01-assistant-row"
                  }
                `}
              >

                {message.role ===
                  "assistant" && (

                  <div className="o01-message-avatar">
                    O-01
                  </div>

                )}


                <div className="o01-message-content">

                  <div className="o01-message-meta">

                    <strong>

                      {
                        message.role ===
                        "assistant"
                          ? "O-01"
                          : "YOU"
                      }

                    </strong>

                    <span>
                      {message.time}
                    </span>

                  </div>


                  <div className="o01-message-bubble">

                    {message.text}

                  </div>

                </div>


                {message.role ===
                  "user" && (

                  <div className="o01-user-marker">
                    YOU
                  </div>

                )}

              </div>

            )
          )}


          {/* TYPING */}

          {isTyping && (

            <div className="o01-typing">

              <div className="o01-typing-avatar">
                O-01
              </div>


              <div className="o01-typing-box">

                <span />
                <span />
                <span />

                <small>
                  PROCESSING RESPONSE
                </small>

              </div>

            </div>

          )}

        </div>


        {/* ====================================================
           INPUT
        ==================================================== */}

        <div className="o01-input-area">

          <div className="o01-input-label">

            <span className="o01-input-engine-dot" />

            O-01 COMMUNICATION CHANNEL

          </div>


          <form
            className="o01-input-shell"
            onSubmit={handleSubmit}
          >

            <input
              ref={inputRef}
              value={input}
              onChange={event =>
                setInput(
                  event.target.value
                )
              }
              placeholder="Ask O-01 anything..."
              aria-label="Ask O-01 anything"
              autoComplete="off"
            />


            <button
              type="button"
              className="o01-mic-button"
              aria-label="Voice input"
            >

              <Icon
                name="microphone"
                size={18}
              />

            </button>


            <button
              type="submit"
              className="o01-accelerator"
              disabled={
                !input.trim() ||
                isTyping
              }
              aria-label="Accelerate and send"
            >

              <span className="o01-accelerator-glow" />

              <Icon
                name="accelerator"
                size={25}
              />

            </button>

          </form>


          <div className="o01-input-footer">

            <span>

              <Icon
                name="spark"
                size={11}
              />

              DRIVEN BY CONVERSATION

            </span>


            <span>
              O-01 // ONLINE
            </span>

          </div>

        </div>


        {/* ====================================================
           FOOTER
        ==================================================== */}

        <div className="o01-panel-bottom">

          <span />

          <small>
            MAHANTHESH S // DIGITAL GARAGE
          </small>

          <span />

        </div>

      </section>

    </div>,

    document.body

  );
}