import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import { portfolio } from '../../data/portfolio';
import { scrollToId } from '../../lib/scroll';

export function CinematicHero() {
  const root = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const dialogue = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const ctx = gsap.context(() => {
    // Start hidden
    gsap.set(scene.current, {
      opacity: 0,
    });

    gsap.set(dialogue.current, {
      opacity: 0,
      y: 18,
      scale: 0.98,
    });

    const timeline = gsap.timeline();

    // 1. Background fades in immediately
    timeline.to(scene.current, {
      opacity: 1,
      duration: 2,
      ease: 'power2.out',
    });

    // 2. Wait after the image has appeared
    timeline.to({}, {
      duration: 2,
    });

    // 3. Dialogue box appears
    timeline.to(dialogue.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(1.4)',
    });
  }, root);

  return () => ctx.revert();
}, []);

  return (
    <section
      ref={root}
      id="home"
      className="hero"
    >
      <div
        ref={scene}
        className="hero-scene"
      >

        {/* =====================================================
            BACKGROUND IMAGE
            ===================================================== */}

        <div
          className="hero-image"
          aria-hidden="true"
        />

        <div
          className="hero-left-shade"
          aria-hidden="true"
        />

        <div
          className="hero-atmosphere"
          aria-hidden="true"
        />

        <div
          className="hero-rain"
          aria-hidden="true"
        />

        <div
          className="hero-vignette"
          aria-hidden="true"
        />

        <div
          className="grain"
          aria-hidden="true"
        />


        {/* =====================================================
            TOP HUD
            ===================================================== */}

        <div className="hero-topline">

          <button
            className="hero-brand"
            onClick={() => scrollToId('home')}
          >
            DREAMER
            <span>// DRIVE</span>
          </button>

          <span className="hero-rule" />

          <span>
            BUILD · LEARN · DRIVE · REPEAT
          </span>

        </div>


        {/* =====================================================
            LOCATION
            ===================================================== */}

        <div className="hero-location">

          <span>
            BENGALURU / INDIA
          </span>

          <small>
            IDEAS &gt; CODE &gt; IMPACT
          </small>

        </div>


        {/* =====================================================
            CHARACTER DIALOGUE
            ===================================================== */}

        <div
          ref={dialogue}
          className="hero-dialogue"
        >

          {/* Dialogue header */}

          <div className="hero-dialogue-header">

            <div className="dialogue-left">

              <span className="dialogue-indicator" />

              <span>
                01
              </span>

              <span className="dialogue-slash">
                //
              </span>

              <span>
                HELLO THERE
              </span>

            </div>

            <div className="dialogue-dots">
              •••
            </div>

          </div>


          {/* Dialogue content */}

          <div className="hero-dialogue-body">

            <p className="dialogue-greeting">
              HI, I'M
            </p>

            <h1>
              {portfolio.name}
            </h1>

            <p className="dialogue-role">
              SOFTWARE DEVELOPER
            </p>

            <p className="dialogue-text">
              {portfolio.tagline}
            </p>


            {/* Tech stack */}

            <div className="dialogue-stack">

              <span>JAVA</span>

              <i>•</i>

              <span>SPRING BOOT</span>

              <i>•</i>

              <span>REACT</span>

              <i>•</i>

              <span>POSTGRESQL</span>

            </div>

          </div>


          {/* Dialogue footer */}

          <div className="hero-dialogue-footer">

            <span>
              DRIVER / SOFTWARE ENGINEER
            </span>

            <button
              onClick={() => scrollToId('profile')}
            >
              &gt;&gt; LET'S DRIVE
            </button>

          </div>

        </div>


        {/* =====================================================
            SCROLL CUE
            ===================================================== */}

        <button
          className="scroll-cue"
          onClick={() => scrollToId('profile')}
          aria-label="Continue to profile"
        >

          <span className="scroll-line" />

          <span>
            CONTINUE
          </span>

          <b>
            ↓
          </b>

        </button>


        {/* =====================================================
            BOTTOM STATUS
            ===================================================== */}

        <div className="hero-status">

          <span className="status-dot" />

          <span>
            ARRIVAL / 01
          </span>

          <span className="status-muted">
            NIGHT DRIVE
          </span>

        </div>

      </div>
    </section>
  );
}