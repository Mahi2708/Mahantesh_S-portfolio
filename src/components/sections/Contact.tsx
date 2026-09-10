import { useEffect, useRef, useState } from "react";
import { portfolio } from "../../data/portfolio";
import { SectionShell } from "./SectionShell";

type Destination = {
  id: "email" | "linkedin" | "github" | "resume";
  number: string;
  label: string;
  subtitle: string;
  url: string;
  x: number;
  y: number;
};

export function Contact() {
  const [isLaunching, setIsLaunching] = useState(false);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [progress, setProgress] = useState(0);

  const animationFrameRef =
    useRef<number | null>(null);

  const finishTimerRef =
    useRef<number | null>(null);

  const redirectTimerRef =
    useRef<number | null>(null);

  /*
   * ---------------------------------------------------------
   * CONTACT DATA
   * ---------------------------------------------------------
   */

  const email =
    portfolio.email || "mahantheshs61@gmail.com";

  const linkedin =
    portfolio.social?.linkedin || "#";

  const github =
    portfolio.social?.github || "#";

  /*
   * Gmail compose URL
   */

  const gmailComposeUrl =
    "https://mail.google.com/mail/?view=cm&fs=1" +
    `&to=${encodeURIComponent(email)}` +
    `&su=${encodeURIComponent(
      "Portfolio Inquiry - Mahanthesh S"
    )}` +
    `&body=${encodeURIComponent(
      `Hi Mahanthesh,

I came across your portfolio and would like to discuss an opportunity.

Best regards,`
    )}`;

  /*
   * ---------------------------------------------------------
   * DESTINATIONS
   * ---------------------------------------------------------
   */

  const destinations: Destination[] = [
    {
      id: "email",
      number: "01",
      label: "EMAIL",
      subtitle: "GMAIL COMPOSE",
      url: gmailComposeUrl,
      x: 24,
      y: 42,
    },

    {
      id: "linkedin",
      number: "02",
      label: "LINKEDIN",
      subtitle: "PROFESSIONAL NETWORK",
      url: linkedin,
      x: 45,
      y: 61,
    },

    {
      id: "github",
      number: "03",
      label: "GITHUB",
      subtitle: "CODE REPOSITORIES",
      url: github,
      x: 67,
      y: 40,
    },

    {
      id: "resume",
      number: "04",
      label: "RESUME",
      subtitle: "CAREER FILE / PDF",
      url: "/assets/resume/resume.pdf",
      x: 87,
      y: 59,
    },
  ];

  /*
   * ---------------------------------------------------------
   * CLEANUP
   * ---------------------------------------------------------
   */

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      if (finishTimerRef.current !== null) {
        window.clearTimeout(
          finishTimerRef.current
        );
      }

      if (redirectTimerRef.current !== null) {
        window.clearTimeout(
          redirectTimerRef.current
        );
      }
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * OPEN DESTINATION
   *
   * Navigation happens after:
   *
   * 1. Drive animation = 2.2 seconds
   * 2. Waiting period = 5 seconds
   *
   * Total = approximately 7.2 seconds
   * ---------------------------------------------------------
   */

  const openDestination = (
    destination: Destination
  ) => {
    if (!destination.url) {
      return;
    }

    window.location.href = destination.url;
  };

  /*
   * ---------------------------------------------------------
   * START DRIVE
   * ---------------------------------------------------------
   */

  const runDrive = (
    destination: Destination
  ) => {
    if (isLaunching) {
      return;
    }

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    /*
     * Reduced motion:
     * Skip animation and navigate immediately.
     */

    if (prefersReducedMotion) {
      openDestination(destination);
      return;
    }

    setSelectedDestination(destination);
    setIsLaunching(true);
    setProgress(0);

    const startTime =
      performance.now();

    /*
     * Main driving animation.
     */

    const duration = 2200;

    const animate = (
      currentTime: number
    ) => {
      const elapsed =
        currentTime - startTime;

      const raw =
        Math.min(
          elapsed / duration,
          1
        );

      /*
       * Smooth acceleration.
       */

      let eased: number;

      if (raw < 0.18) {
        eased =
          (raw / 0.18) *
          (raw / 0.18) *
          0.08;
      } else if (raw < 0.78) {
        const middle =
          (raw - 0.18) / 0.60;

        eased =
          0.08 +
          middle *
            0.78;
      } else {
        const finalPart =
          (raw - 0.78) / 0.22;

        eased =
          0.86 +
          finalPart *
            0.14;
      }

      setProgress(
        Math.min(
          eased * 100,
          100
        )
      );

      if (raw < 1) {
        animationFrameRef.current =
          window.requestAnimationFrame(
            animate
          );
      }
    };

    animationFrameRef.current =
      window.requestAnimationFrame(
        animate
      );

    /*
     * After the 2.2 second drive animation,
     * keep the destination screen visible for
     * another 5 seconds before navigation.
     */

    finishTimerRef.current =
      window.setTimeout(() => {
        setProgress(100);

        redirectTimerRef.current =
  window.setTimeout(() => {
    // End the animation/overlay BEFORE navigation
    setIsLaunching(false);
    setSelectedDestination(null);
    setProgress(100);

    // Give React a moment to remove the overlay
    window.setTimeout(() => {
      openDestination(destination);
    }, 100);
  }, 5000);
      }, duration);
  };

  /*
   * ---------------------------------------------------------
   * RENDER
   * ---------------------------------------------------------
   */

  return (
    <SectionShell
      id="contact"
      index="09"
      kicker="NEXT DESTINATION"
      title="WHERE TO NEXT?"
      description="Choose a destination. The drive begins."
    >

      <section className="contact-map">

        {/* =================================================
            MAP HEADER
        ================================================= */}

        <div className="map-header">

          <div>
            <span className="map-kicker">
              NAVIGATION SYSTEM
            </span>

            <h2>
              NEXT
              <span> DESTINATION</span>
            </h2>
          </div>

          <div className="map-system-status">
            <i />

            <span>
              {isLaunching
                ? "ROUTE ACTIVE"
                : "SYSTEM READY"}
            </span>
          </div>

        </div>


        {/* =================================================
            MAP
        ================================================= */}

        <div className="navigation-map">

          {/* map grid */}

          <div className="map-grid" />


          {/* map terrain */}

          <div className="map-terrain terrain-one" />
          <div className="map-terrain terrain-two" />
          <div className="map-terrain terrain-three" />


          {/* city blocks */}

          <div className="map-city-blocks">

            {Array.from({
              length: 28,
            }).map((_, index) => (
              <span key={index} />
            ))}

          </div>


          {/* decorative roads */}

          <div className="map-side-road road-one" />
          <div className="map-side-road road-two" />
          <div className="map-side-road road-three" />


          {/* =================================================
              MAIN ROAD
          ================================================= */}

          <div className="main-road">

            <div className="road-edge road-edge-top" />

            <div className="road-surface">

              <div className="road-lane-markings">

                {Array.from({
                  length: 12,
                }).map((_, index) => (
                  <span key={index} />
                ))}

              </div>

            </div>

            <div className="road-edge road-edge-bottom" />

          </div>


          {/* =================================================
              ROUTE LINE
          ================================================= */}

          <div className="route-path">

            <div
              className="route-progress"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>


          {/* =================================================
              START LOCATION
          ================================================= */}

          <div
            className="map-location start-location"
            style={{
              left: "8%",
              top: "50%",
            }}
          >

            <div className="location-pin origin-pin">
              <span />
            </div>

            <div className="location-label">

              <strong>
                START
              </strong>

              <small>
                BENGALURU
              </small>

            </div>

          </div>


          {/* =================================================
              DESTINATION LOCATIONS
          ================================================= */}

          {destinations.map(
            (destination) => {

              const active =
                selectedDestination?.id ===
                destination.id;

              const reached =
                active &&
                progress >=
                  ((destination.x - 8) /
                    79) *
                    100;

              return (
                <button
                  key={destination.id}
                  type="button"
                  className={`map-location destination-location ${
                    active
                      ? "active"
                      : ""
                  } ${
                    reached
                      ? "reached"
                      : ""
                  }`}
                  style={{
                    left: `${destination.x}%`,
                    top: `${destination.y}%`,
                  }}
                  onClick={() =>
                    runDrive(
                      destination
                    )
                  }
                  disabled={isLaunching}
                  aria-label={`Drive to ${destination.label}`}
                >

                  {/* =================================================
                      DESTINATION PIN
                  ================================================= */}

                  <div
                    className={`destination-pin destination-pin-${destination.id}`}
                  >

                    <span className="pin-pulse" />


                    {/* =================================================
                        GMAIL ICON
                    ================================================= */}

                    {destination.id === "email" && (
                      <span
                        className="destination-icon"
                        style={{
                          color: "#EA4335",
                        }}
                      >

                        <svg
                          viewBox="0 0 24 24"
                          width="21"
                          height="21"
                          aria-hidden="true"
                        >

                          {/* Gmail M */}

                          <path
                            d="M3 5.5v13h3V9.1l6 4.5 6-4.5v9.4h3v-13h-3l-6 4.6-6-4.6H3z"
                            fill="#EA4335"
                          />

                          <path
                            d="M3 5.5l3 2.4v5.5L3 16V5.5z"
                            fill="#4285F4"
                          />

                          <path
                            d="M21 5.5l-3 2.4v5.5l3 2.6V5.5z"
                            fill="#34A853"
                          />

                          <path
                            d="M3 5.5l9 7 9-7h-3l-6 4.6-6-4.6H3z"
                            fill="#FBBC04"
                          />

                        </svg>

                      </span>
                    )}


                    {/* =================================================
                        LINKEDIN ICON
                    ================================================= */}

                    {destination.id === "linkedin" && (
                      <span
                        className="destination-icon"
                        style={{
                          color: "#0A66C2",
                        }}
                      >

                        <svg
                          viewBox="0 0 24 24"
                          width="21"
                          height="21"
                          aria-hidden="true"
                        >

                          <path
                            d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2Z"
                            fill="#0A66C2"
                          />

                          <path
                            d="M6.5 8.25H4V20h2.5V8.25ZM5.25 4A1.5 1.5 0 1 0 5.25 7a1.5 1.5 0 0 0 0-3ZM20 13.25c0-3.54-1.9-5.19-4.43-5.19-2.05 0-2.97 1.13-3.48 1.92V8.25H9.6V20h2.49v-5.8c0-1.53.29-3.01 2.18-3.01 1.86 0 1.88 1.75 1.88 3.11V20h2.5l-.01-6.75Z"
                            fill="#fff"
                          />

                        </svg>

                      </span>
                    )}


                    {/* =================================================
                        GITHUB ICON
                    ================================================= */}

                    {destination.id === "github" && (
                      <span
                        className="destination-icon"
                        style={{
                          color: "#F0F0F0",
                        }}
                      >

                        <svg
                          viewBox="0 0 24 24"
                          width="21"
                          height="21"
                          aria-hidden="true"
                        >

                          <path
                            fill="currentColor"
                            d="M12 .7A11.3 11.3 0 0 0 8.4 22.7c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.5-2.8 5.5-5.4 5.8.4.3.7 1 .7 2v2.9c0 .3.2.7.8.6A11.3 11.3 0 0 0 12 .7Z"
                          />

                        </svg>

                      </span>
                    )}


                    {/* =================================================
                        RESUME / PDF ICON
                    ================================================= */}

                    {destination.id === "resume" && (
                      <span
                        className="destination-icon"
                        style={{
                          color: "#22C55E",
                        }}
                      >

                        <svg
                          viewBox="0 0 24 24"
                          width="21"
                          height="21"
                          aria-hidden="true"
                        >

                          <path
                            d="M6 2.5h8l4 4V21H6V2.5Z"
                            fill="#22C55E"
                            opacity="0.18"
                          />

                          <path
                            d="M6 2.5h8l4 4V21H6V2.5Z"
                            fill="none"
                            stroke="#22C55E"
                            strokeWidth="1.7"
                            strokeLinejoin="round"
                          />

                          <path
                            d="M14 2.5V7h4"
                            fill="none"
                            stroke="#22C55E"
                            strokeWidth="1.7"
                            strokeLinejoin="round"
                          />

                          <path
                            d="M9 11h6M9 14h6M9 17h4"
                            fill="none"
                            stroke="#22C55E"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />

                        </svg>

                      </span>
                    )}

                  </div>


                  {/* =================================================
                      DESTINATION LABEL
                  ================================================= */}

                  <div className="destination-label">

                    <strong>
                      {destination.label}
                    </strong>

                    <small>
                      {destination.subtitle}
                    </small>

                  </div>

                </button>
              );
            }
          )}


          {/* =================================================
              LANDSCAPE F1 CAR
          ================================================= */}

          <div
            className={`map-f1-car ${
              isLaunching
                ? "driving"
                : ""
            }`}
            style={{
              left: `${Math.max(
                8,
                Math.min(
                  progress * 0.79 + 8,
                  87
                )
              )}%`,
            }}
          >

            <div className="f1-car-shadow" />


            <div className="f1-rear-wing">
              <span />
              <span />
            </div>


            <div className="f1-body">

              <div className="f1-front-wing">
                <span />
                <span />
              </div>

              <div className="f1-nose" />

              <div className="f1-wheel f1-wheel-front" />

              <div className="f1-sidepod" />

              <div className="f1-cockpit">
                <span />
              </div>

              <div className="f1-airbox" />

              <div className="f1-wheel f1-wheel-rear" />

            </div>


            <div className="f1-light-trail">
              <span />
              <span />
              <span />
            </div>

          </div>


          {/* =================================================
              MAP HUD
          ================================================= */}

          <div className="map-hud top-left-hud">

            <span>
              MAP / 01
            </span>

            <strong>
              BENGALURU
            </strong>

          </div>


          <div className="map-hud top-right-hud">

            <span>
              VEHICLE
            </span>

            <strong>
              DREAMER-01
            </strong>

          </div>


          <div className="map-distance">

            <span>
              ROUTE
            </span>

            <strong>
              {Math.round(progress)}
              <small>%</small>
            </strong>

          </div>


          <div className="map-compass">

            <span>
              N
            </span>

            <div />

            <span>
              E
            </span>

          </div>

        </div>


        {/* =================================================
            DESTINATION CONTROL BAR
        ================================================= */}

        <div className="destination-control">

          <div className="control-origin">

            <span>
              ORIGIN
            </span>

            <strong>
              BENGALURU, INDIA
            </strong>

          </div>


          <div className="control-message">

            <i />

            <span>
              {isLaunching
                ? `DRIVING TO ${selectedDestination?.label}`
                : "SELECT A LOCATION ON THE MAP"}
            </span>

          </div>


          <div className="control-destination">

            <span>
              DESTINATION
            </span>

            <strong>
              {selectedDestination
                ? selectedDestination.label
                : "—"}
            </strong>

          </div>

        </div>


        {/* =================================================
            CONTACT STRIP
        ================================================= */}

        <div className="contact-map-footer">

          <div>

            <span>
              EMAIL
            </span>

            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noreferrer"
            >
              {email}
            </a>

          </div>


          <div>

            <span>
              PHONE
            </span>

            <a
              href={`tel:${portfolio.phone.replace(
                /\s/g,
                ""
              )}`}
            >
              {portfolio.phone}
            </a>

          </div>


          <div>

            <span>
              LOCATION
            </span>

            <strong>
              BENGALURU / INDIA
            </strong>

          </div>

        </div>

      </section>


      {/* ===================================================
          FULL SCREEN DRIVE
      =================================================== */}

      {isLaunching &&
        selectedDestination && (
          <div className="drive-overlay">

            <div className="overlay-speed-lines" />


            {/* =================================================
                OVERLAY HUD
            ================================================= */}

            <div className="overlay-hud">

              <div>

                <span>
                  DRIVE COMMAND
                </span>

                <strong>
                  DREAMER-01
                </strong>

              </div>


              <div>

                <span>
                  DESTINATION
                </span>

                <strong>
                  {selectedDestination.label}
                </strong>

              </div>

            </div>


            {/* =================================================
                STARTING LIGHTS
            ================================================= */}

            <div className="starting-lights">

              <i />
              <i />
              <i />
              <i />
              <i />

            </div>


            {/* =================================================
                HORIZONTAL TRACK
            ================================================= */}

            <div className="overlay-track">

              <div className="overlay-road">

                <div className="overlay-road-lines">

                  {Array.from({
                    length: 18,
                  }).map((_, index) => (
                    <span key={index} />
                  ))}

                </div>

              </div>


              {/* =================================================
                  LARGE LANDSCAPE F1
              ================================================= */}

              <div
                className="overlay-f1"
                style={{
                  left: `${Math.max(
                    4,
                    Math.min(
                      progress,
                      94
                    )
                  )}%`,
                }}
              >

                <div className="overlay-car-shadow" />


                <div className="overlay-rear-wing">

                  <span />
                  <span />

                </div>


                <div className="overlay-car-body">

                  <div className="overlay-front-wing">

                    <span />
                    <span />

                  </div>

                  <div className="overlay-nose" />

                  <div className="overlay-wheel front" />

                  <div className="overlay-sidepod" />

                  <div className="overlay-cockpit">
                    <span />
                  </div>

                  <div className="overlay-airbox" />

                  <div className="overlay-wheel rear" />

                </div>


                <div className="overlay-exhaust">

                  <i />
                  <i />

                </div>

              </div>

            </div>


            {/* =================================================
                DRIVE STATUS
            ================================================= */}

            <div className="overlay-status">

              <span>

                {progress < 12
                  ? "IGNITION"
                  : progress < 70
                  ? "FULL THROTTLE"
                  : progress < 95
                  ? "APPROACHING DESTINATION"
                  : "ARRIVED"}

              </span>


              <strong>

                {Math.round(progress)}

                <small>
                  %
                </small>

              </strong>

            </div>


            {/* =================================================
                PROGRESS BAR
            ================================================= */}

            <div className="overlay-progress">

              <span
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>
        )}

    </SectionShell>
  );
}