import { useEffect, useMemo, useState } from "react";
import { portfolio } from "../../data/portfolio";
import { SectionShell } from "./SectionShell";

type Project = {
  id?: string;
  number?: string;
  date?: string;
  category?: string;
  title: string;
  description: string;
  impact: string[];
  tech: string[];
  github?: string;
  live?: string;
};

type Slide = Project & {
  image?: string;
  isComingSoon?: boolean;
};

/* ============================================================
   PROJECT IMAGE + LINK CONFIGURATION
   ============================================================ */

/*
 * IMPORTANT:
 *
 * Do NOT rely on exact project titles here.
 *
 * portfolio.json may contain titles such as:
 *
 *   "Novel Journey — Novel Reading Platform"
 *   "M-ai-L — AI Email Agent"
 *
 * Therefore we use getProjectConfig() below and match
 * important words instead of requiring an exact title match.
 */

type ProjectConfig = {
  image: string;
  github?: string;
  live?: string;
};

const getProjectConfig = (
  title: string,
): ProjectConfig => {
  const normalizedTitle = title
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .trim();

  /*
   * BANKING SYSTEM
   */
  if (
    normalizedTitle.includes("banking")
  ) {
    return {
      image:
        "/assets/projects/bank.png",
      github:
        "https://github.com/Mahi2708/Banking-System",
      live:
        "https://banking-system-tau-seven.vercel.app/",
    };
  }

  /*
   * NOVEL JOURNEY
   *
   * Works for:
   * "Novel Journey"
   * "Novel Journey V2"
   * "Novel Journey — Novel Reading Platform"
   * etc.
   */
  if (
    normalizedTitle.includes(
      "novel journey",
    )
  ) {
    return {
      image:
        "/assets/projects/novel.png",
      github:
        "https://github.com/Mahi2708",
      live: undefined,
    };
  }

  /*
   * BLINKIT DASHBOARD
   */
  if (
    normalizedTitle.includes("blinkit")
  ) {
    return {
      image:
        "/assets/projects/blinkit.png",
      github:
        "https://github.com/Mahi2708/Blinkit-data-anlaysis-using-Power-BI",
      live: undefined,
    };
  }

  /*
   * M-AI-L / AI EMAIL AGENT
   *
   * Works for:
   * "M-ai-L"
   * "M-ai-L — AI Email Agent"
   * "M-ai-L (AI Email Agent)"
   * "M-ai-L (AI Email Assistant)"
   * etc.
   */
  if (
    normalizedTitle.includes("m-ai-l") ||
    normalizedTitle.includes("m-ai") ||
    normalizedTitle.includes("ai email") ||
    normalizedTitle.includes("email agent") ||
    normalizedTitle.includes("email assistant")
  ) {
    return {
      image:
        "/assets/projects/mail.png",
      github:
        "https://github.com/Mahi2708/chatbot",
      live:
        "https://chatbot-three-xi-45.vercel.app/",
    };
  }

  /*
   * FALLBACK
   *
   * image.png is intentionally used only when
   * a project cannot be identified.
   */
  return {
    image:
      "/assets/projects/image.png",
    github: undefined,
    live: undefined,
  };
};


/* ============================================================
   TECH ICON
   ============================================================ */

function TechIcon({
  tech,
}: {
  tech: string;
}) {
  const value = tech.toLowerCase();

  /*
   * Java
   */
  if (value === "java") {
    return (
      <span className="tech-icon tech-java">
        ☕
      </span>
    );
  }

  /*
   * Spring Boot
   */
  if (value.includes("spring")) {
    return (
      <span className="tech-icon tech-spring">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M19.2 3.2c-2.8 1.3-5.4 2-8 2.1-2.9.1-5.1-.5-7.2-1.8.5 2.1 1.7 3.9 3.5 5.2-2.2.1-3.9-.5-5.2-1.5.7 2.7 2.3 4.6 4.7 5.5-1.2.3-2.5.2-3.6-.2 1.2 2.2 3.2 3.5 5.6 3.7-2 1.5-4.2 2-6.4 1.7 2.2 1.4 4.7 2.1 7.2 2.1 7.3 0 11.4-6 11.4-11.2v-.5c.8-.6 1.5-1.3 2-2.1-.8.4-1.7.7-2.6.8.9-.5 1.5-1.3 1.8-2.3-.8.5-1.8.8-2.7 1z"
          />
        </svg>
      </span>
    );
  }

  /*
   * React
   */
  if (value === "react") {
    return (
      <span className="tech-icon tech-react">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="2.2"
            fill="currentColor"
          />

          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />

          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            transform="rotate(60 12 12)"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />

          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            transform="rotate(120 12 12)"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      </span>
    );
  }

  /*
   * TypeScript
   */
  if (
    value === "typescript" ||
    value === "ts"
  ) {
    return (
      <span className="tech-icon tech-typescript">
        TS
      </span>
    );
  }

  /*
   * PostgreSQL
   */
  if (value.includes("postgres")) {
    return (
      <span className="tech-icon tech-postgres">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M5 5.5C5 3.6 8.1 2 12 2s7 1.6 7 3.5v8.8c0 2.2-2.1 3.7-4.7 4.1l-.5 2.1c-.2.8-1 1.3-1.8 1.1-.6-.1-1-.7-1-1.3l.2-1.8c-.4 0-.8-.1-1.2-.2l-.4 1.7c-.2.8-1 1.3-1.8 1.1-.7-.2-1.1-.8-1-1.5l.5-2.2C6.5 16.8 5 15.4 5 13.7V5.5Z"
            fill="currentColor"
          />

          <path
            d="M9 7.3c1.8 1 4.2 1.5 6.5 1.2"
            fill="none"
            stroke="#071018"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  }

  /*
   * SQL
   */
  if (
    value === "sql" ||
    value.includes("database")
  ) {
    return (
      <span className="tech-icon tech-sql">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <ellipse
            cx="12"
            cy="5"
            rx="7"
            ry="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />

          <path
            d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />

          <path
            d="M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
        </svg>
      </span>
    );
  }

  /*
   * REST API
   */
  if (
    value.includes("rest") ||
    value.includes("api")
  ) {
    return (
      <span className="tech-icon tech-api">
        <span>
          {"{ }"}
        </span>
      </span>
    );
  }

  /*
   * WebSockets
   */
  if (
    value.includes("websocket")
  ) {
    return (
      <span className="tech-icon tech-websocket">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M4 16c2-5 4-7 6-7s3 2 5 2 3-2 5-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M4 20c2-5 4-7 6-7s3 2 5 2 3-2 5-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            opacity=".55"
          />
        </svg>
      </span>
    );
  }

  /*
   * Power BI
   */
  if (
    value.includes("power bi")
  ) {
    return (
      <span className="tech-icon tech-powerbi">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <rect
            x="4"
            y="12"
            width="3"
            height="8"
            rx="1"
          />

          <rect
            x="9"
            y="8"
            width="3"
            height="12"
            rx="1"
          />

          <rect
            x="14"
            y="5"
            width="3"
            height="15"
            rx="1"
          />

          <rect
            x="19"
            y="2"
            width="2"
            height="18"
            rx="1"
          />
        </svg>
      </span>
    );
  }

  /*
   * DAX
   */
  if (value === "dax") {
    return (
      <span className="tech-icon tech-dax">
        Σ
      </span>
    );
  }

  /*
   * Power Query
   */
  if (
    value.includes("power query")
  ) {
    return (
      <span className="tech-icon tech-query">
        ⚡
      </span>
    );
  }

  /*
   * OpenAI
   */
  if (
    value.includes("openai")
  ) {
    return (
      <span className="tech-icon tech-openai">
        ✦
      </span>
    );
  }

  /*
   * Gmail
   */
  if (
    value.includes("gmail")
  ) {
    return (
      <span className="tech-icon tech-gmail">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M3 6.5 12 13l9-6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M4 19V6.5L12 13l8-6.5V19"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </span>
    );
  }

  /*
   * Express
   */
  if (
    value.includes("express")
  ) {
    return (
      <span className="tech-icon tech-express">
        <span>
          EX
        </span>
      </span>
    );
  }

  /*
   * OAuth
   */
  if (
    value.includes("oauth")
  ) {
    return (
      <span className="tech-icon tech-oauth">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M12 3 20 6v5c0 5-3.2 8.5-8 10-4.8-1.5-8-5-8-10V6l8-3Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />

          <path
            d="m8.5 12 2.2 2.2 4.8-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      </span>
    );
  }

  /*
   * Default icon
   */
  return (
    <span className="tech-icon tech-default">
      ◆
    </span>
  );
}


/* ============================================================
   GITHUB ICON
   ============================================================ */

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="button-icon"
    >
      <path
        fill="currentColor"
        d="M12 .7C5.7.7.7 5.8.7 12.1c0 5 3.2 9.2 7.7 10.7.6.1.8-.3.8-.6v-2.1c-3.1.7-3.8-1.5-3.8-1.5-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.9-.7 2.3-1.1.1-.7.4-1.1.7-1.4-2.5-.3-5.1-1.3-5.1-5.6 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-3 0 0 .9-.3 3.1 1.1a10.7 10.7 0 0 1 5.6 0C16.1 2.9 17 3.2 17 3.2c.6 1.6.2 2.7.1 3 .7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.3-5.1 5.6.4.3.7.9.7 1.8v2.7c0 .3.2.7.8.6 4.5-1.5 7.7-5.7 7.7-10.7C23.3 5.8 18.3.7 12 .7Z"
      />
    </svg>
  );
}


/* ============================================================
   LIVE ICON
   ============================================================ */

function LiveIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="button-icon"
    >
      <path
        d="M12 3a9 9 0 1 0 9 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M15 3h6v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="m21 3-8 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}


/* ============================================================
   RACE LOG
   ============================================================ */

export function RaceLog() {
  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [
    isAnimating,
    setIsAnimating,
  ] = useState(false);

  const [
    wheelRotation,
    setWheelRotation,
  ] = useState(0);


  /*
   * ----------------------------------------------------------
   * BUILD SLIDES
   * ----------------------------------------------------------
   */

  const slides = useMemo<Slide[]>(
    () => {
      const projectSlides: Slide[] =
  (portfolio.projects as Project[]).map(
          (project, index) => {
            /*
             * FIX:
             *
             * Instead of:
             *
             * projectConfig[project.title]
             *
             * we now intelligently identify the
             * project from its title.
             */
            const config =
              getProjectConfig(
                project.title,
              );

            return {
              ...project,

              number:
                project.number ||
                String(
                  index + 1,
                ).padStart(3, "0"),

              /*
               * Correct project image.
               */
              image:
                config.image,

              /*
               * Prefer a real project.github
               * when available.
               *
               * Otherwise use our configured
               * GitHub link.
               */
              github:
                project.github &&
                !project.github
                  .toLowerCase()
                  .includes(
                    "add github",
                  )
                  ? project.github
                  : config.github,

              /*
               * Prefer a real project.live
               * when available.
               *
               * Otherwise use our configured
               * live link.
               */
              live:
                project.live &&
                !project.live
                  .toLowerCase()
                  .includes(
                    "add live",
                  )
                  ? project.live
                  : config.live,
            };
          },
        );

      /*
       * Final "coming soon" card.
       */

      projectSlides.push({
        id: "coming-soon",

        number: "05",

        date: "NEXT",

        category: "INCOMING",

        title: "More Projects",

        description:
          "The road is still moving. More builds, experiments and engineering missions are coming soon.",

        impact: [
          "New ideas are already in development.",
          "More engineering stories will be added here.",
        ],

        tech: [
          "BUILDING",
          "EXPERIMENTING",
          "STAY TUNED",
        ],

        /*
         * image.png is ONLY used
         * for the coming-soon card.
         */
        image:
          "/assets/projects/image.png",

        isComingSoon: true,
      });

      return projectSlides;
    },
    [],
  );


  /*
   * ----------------------------------------------------------
   * NAVIGATION
   * ----------------------------------------------------------
   */

  const navigate = (
    direction: 1 | -1,
  ) => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);

    setActiveIndex(
      (current) => {
        let next =
          current + direction;

        if (next < 0) {
          next =
            slides.length - 1;
        }

        if (
          next >= slides.length
        ) {
          next = 0;
        }

        return next;
      },
    );

    setWheelRotation(
      (current) =>
        current +
        direction * 24,
    );

    window.setTimeout(
      () => {
        setIsAnimating(false);
      },
      720,
    );
  };


  /*
   * ----------------------------------------------------------
   * KEYBOARD
   * ----------------------------------------------------------
   */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key ===
        "ArrowLeft"
      ) {
        navigate(-1);
      }

      if (
        event.key ===
        "ArrowRight"
      ) {
        navigate(1);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    isAnimating,
    slides.length,
  ]);


  /*
   * ----------------------------------------------------------
   * RELATIVE POSITION
   * ----------------------------------------------------------
   */

  const getRelativePosition = (
    index: number,
  ) => {
    const total =
      slides.length;

    let difference =
      index - activeIndex;

    if (
      difference >
      total / 2
    ) {
      difference -= total;
    }

    if (
      difference <
      -total / 2
    ) {
      difference += total;
    }

    return difference;
  };


  return (
    <SectionShell
      id="projects"
      index="02"
      kicker="RACE LOG"
      title="PROJECTS AS MISSIONS"
      description="Real problems. Meaningful builds. Always learning."
    >
      <section className="race-log-carousel">

        {/* ==================================================
            BACKGROUND
        ================================================== */}

        <div className="race-log-bg" />

        <div className="race-log-dark-overlay" />

        <div className="race-log-glow" />


        {/* ==================================================
            TOP HUD
        ================================================== */}

        <div className="race-log-topbar">

          <div className="race-log-status">

            <span className="status-light" />

            <span>
              RACE LOG / LIVE
            </span>

          </div>


          <div className="race-log-counter">

            <span>
              {String(
                activeIndex + 1,
              ).padStart(2, "0")}
            </span>

            <span className="counter-slash">
              /
            </span>

            <span>
              {String(
                slides.length,
              ).padStart(2, "0")}
            </span>

          </div>

        </div>


        {/* ==================================================
            MISSION STAGE
        ================================================== */}

        <div className="mission-stage">

          {/* LEFT BUTTON */}

          <button
            type="button"
            className="mission-nav mission-nav-left"
            onClick={() =>
              navigate(-1)
            }
            aria-label="Previous project"
          >
            <span>
              ‹
            </span>
          </button>


          {/* CARDS */}

          <div className="mission-carousel">

            {slides.map(
              (
                project,
                index,
              ) => {
                const position =
                  getRelativePosition(
                    index,
                  );

                /*
                 * Completely hide all cards
                 * except center / previous / next.
                 */

                if (
                  position < -1 ||
                  position > 1
                ) {
                  return null;
                }

                const isActive =
                  position === 0;

                const isPrevious =
                  position === -1;

                const isNext =
                  position === 1;

                return (
                  <article
                    key={
                      project.id ||
                      project.title
                    }
                    className={[
                      "mission-card",

                      isActive
                        ? "mission-card-active"
                        : "",

                      isPrevious
                        ? "mission-card-previous"
                        : "",

                      isNext
                        ? "mission-card-next"
                        : "",

                      project.isComingSoon
                        ? "mission-card-coming-soon"
                        : "",
                    ]
                      .filter(
                        Boolean,
                      )
                      .join(" ")}
                  >

                    {/* --------------------------------------
                        HEADER
                    --------------------------------------- */}

                    <div className="mission-card-header">

                      <div className="mission-label">

                        <span className="mission-flag">
                          ◆
                        </span>

                        <span>
                          MISSION{" "}
                          {project.number}
                        </span>

                      </div>


                      <div className="mission-date">
                        {project.date}
                      </div>

                    </div>


                    {/* --------------------------------------
                        HEADING
                    --------------------------------------- */}

                    <div className="mission-heading">

                      <div className="mission-category">
                        {project.category}
                      </div>

                      <h3>
                        {project.title}
                      </h3>

                      <p>
                        {project.description}
                      </p>

                    </div>


                    {/* --------------------------------------
                        IMAGE
                    --------------------------------------- */}

                    <div className="mission-project-visual">

                      <div className="mission-image-frame">

                        <div className="mission-image-grid" />

                        {project.isComingSoon ? (
                          <div className="coming-soon-visual">

                            <div className="coming-soon-question">
                              ?
                            </div>

                            <span>
                              NEXT BUILD
                            </span>

                          </div>
                        ) : (
                          <img
                            src={
                              project.image
                            }
                            alt={`${project.title} preview`}
                            className="mission-project-image"
                          />
                        )}

                        <div className="mission-image-scan" />

                        <div className="mission-image-corner mission-corner-tl" />

                        <div className="mission-image-corner mission-corner-tr" />

                        <div className="mission-image-corner mission-corner-bl" />

                        <div className="mission-image-corner mission-corner-br" />

                      </div>

                    </div>


                    {/* --------------------------------------
                        BOTTOM INFORMATION
                    --------------------------------------- */}

                    <div className="mission-bottom">

                      {/* TELEMETRY */}

                      <div className="mission-impact">

                        <div className="mission-section-label">
                          ENGINEERING TELEMETRY
                        </div>

                        {project.impact
                          .slice(0, 2)
                          .map(
                            (
                              impact,
                            ) => (
                              <div
                                className="mission-impact-line"
                                key={impact}
                              >

                                <span>
                                  +
                                </span>

                                <span>
                                  {impact}
                                </span>

                              </div>
                            ),
                          )}

                      </div>


                      {/* STACK */}

                      <div className="mission-stack">

                        <div className="mission-section-label">
                          STACK
                        </div>

                        <div className="mission-tags">

                          {project.tech
                            .slice(0, 7)
                            .map(
                              (
                                tech,
                              ) => (
                                <span
                                  key={tech}
                                  className="mission-tech-tag"
                                >

                                  <TechIcon
                                    tech={
                                      tech
                                    }
                                  />

                                  <span>
                                    {tech}
                                  </span>

                                </span>
                              ),
                            )}

                        </div>

                      </div>


                      {/* LINKS */}

                      {!project.isComingSoon && (
                        <div className="mission-links">

                          {project.github && (
                            <a
                              href={
                                project.github
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="mission-github"
                            >

                              <GithubIcon />

                              <span>
                                GITHUB
                              </span>

                              <span className="link-arrow">
                                ↗
                              </span>

                            </a>
                          )}


                          {project.live && (
                            <a
                              href={
                                project.live
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="mission-live"
                            >

                              <LiveIcon />

                              <span>
                                LIVE PROJECT
                              </span>

                              <span className="link-arrow">
                                ↗
                              </span>

                            </a>
                          )}

                        </div>
                      )}


                      {/* COMING SOON */}

                      {project.isComingSoon && (
                        <div className="coming-soon-message">

                          <span>
                            STAY TUNED
                          </span>

                          <span className="coming-soon-dots">
                            ● ● ●
                          </span>

                        </div>
                      )}

                    </div>

                  </article>
                );
              },
            )}

          </div>


          {/* RIGHT BUTTON */}

          <button
            type="button"
            className="mission-nav mission-nav-right"
            onClick={() =>
              navigate(1)
            }
            aria-label="Next project"
          >
            <span>
              ›
            </span>
          </button>

        </div>


        {/* ==================================================
            STEERING WHEEL
        ================================================== */}

        <div className="steering-area">

          <div className="steering-label steering-label-left">

            <span>
              PREVIOUS
            </span>

            <strong>
              ◀
            </strong>

          </div>


          <div
            className="steering-wheel"
            style={{
              transform:
                `rotate(${wheelRotation}deg)`,
            }}
          >

            <div className="wheel-outer">

              <div className="wheel-spoke wheel-spoke-top" />

              <div className="wheel-spoke wheel-spoke-left" />

              <div className="wheel-spoke wheel-spoke-right" />

              <div className="wheel-center">

                <span className="wheel-center-letter">
                  D
                </span>

              </div>

              <div className="wheel-button wheel-button-1" />

              <div className="wheel-button wheel-button-2" />

              <div className="wheel-button wheel-button-3" />

              <div className="wheel-button wheel-button-4" />

            </div>

          </div>


          <div className="steering-label steering-label-right">

            <span>
              NEXT
            </span>

            <strong>
              ▶
            </strong>

          </div>

        </div>


        {/* ==================================================
            BOTTOM TELEMETRY
        ================================================== */}

        <div className="race-log-bottom">

          <div className="bottom-stat">

            <strong>
              {String(
                slides.length - 1,
              ).padStart(2, "0")}
            </strong>

            <span>
              MISSIONS
            </span>

          </div>


          <div className="bottom-divider" />


          <div className="bottom-stat">

            <strong>
              ∞
            </strong>

            <span>
              IDEAS
            </span>

          </div>


          <div className="bottom-divider" />


          <div className="bottom-stat">

            <strong>
              01
            </strong>

            <span>
              PURPOSE
            </span>

          </div>


          <div className="bottom-route">

            <div className="route-line">

              <span className="route-progress" />

              <span className="route-car">
                ◆
              </span>

            </div>

            <span>
              KEEP EXPLORING ///
            </span>

          </div>

        </div>

      </section>
    </SectionShell>
  );
}