import { portfolio } from '../../data/portfolio';
import { SectionShell } from './SectionShell';

export function DriverProfile() {
  const experienceCount = portfolio.experience.length;
  const projectCount = portfolio.projects.length;

  return (
    <SectionShell
      id="profile"
      index="02"
      kicker="DRIVER PROFILE"
      title="THE DRIVER"
      description="The person behind the builds, the ideas and the road ahead."
    >
      <div className="driver-profile">

        {/* =========================================
            LEFT — CINEMATIC DRIVER IMAGE
           ========================================= */}

        <div className="driver-visual">

          <div className="driver-visual-grid" />

          <div className="driver-visual-glow" />

          <div className="driver-top-meta">
            <span>DRIVER / 01</span>
            <span>PROFILE ACTIVE</span>
          </div>

          <div className="driver-image-wrap">
            <img
              src="/assets/profile/image.png"
              alt="Mahanthesh S"
              className="driver-image"
            />
          </div>

          <div className="driver-image-caption">
            <span>MAHANTHESH S</span>
            <span>BENGALURU / INDIA</span>
          </div>

          <div className="driver-coordinate">
            13° 04' N<br />
            77° 35' E
          </div>

          <div className="driver-line driver-line-left" />
          <div className="driver-line driver-line-bottom" />

        </div>


        {/* =========================================
            RIGHT — DRIVER INFORMATION
           ========================================= */}

        <div className="driver-info">

          <div className="driver-heading">

            <span className="driver-eyebrow">
              CURRENT DRIVER
            </span>

            <h3>
              {portfolio.name}
            </h3>

            <p className="driver-role">
              ENTRY-LEVEL SOFTWARE ENGINEER
            </p>

          </div>


          <div className="driver-divider" />


          <p className="driver-summary">
            {portfolio.summary}
          </p>


          {/* PRIMARY STACK */}

          <div className="driver-stack">

            <span className="driver-label">
              PRIMARY STACK
            </span>

            <div className="driver-stack-list">

              {[
                'Java',
                'Spring Boot',
                'REST APIs',
                'PostgreSQL',
                'React',
              ].map((skill) => (
                <span
                  key={skill}
                  className="driver-stack-item"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>


          {/* DRIVER DATA */}

          <div className="driver-specs">

            <div className="driver-spec">

              <span>LOCATION</span>

              <strong>
                {portfolio.location}
              </strong>

            </div>


            <div className="driver-spec">

              <span>EDUCATION</span>

              <strong>
                {portfolio.education[0].degree}
              </strong>

              <small>
                {portfolio.education[0].institution}
                {' · '}
                {portfolio.education[0].period}
              </small>

            </div>


            <div className="driver-spec">

              <span>EXPERIENCE</span>

              <strong>
                {String(experienceCount).padStart(2, '0')}
              </strong>

              <small>
                INTERNSHIPS
              </small>

            </div>


            <div className="driver-spec">

              <span>PROJECTS</span>

              <strong>
                {String(projectCount).padStart(2, '0')}
              </strong>

              <small>
                BUILDS
              </small>

            </div>

          </div>


          {/* LINKS */}

          <div className="driver-links">

            <a
              href="/assets/resume/resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              VIEW RESUME
              <span>↗</span>
            </a>

            <a
              href={portfolio.social.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LINKEDIN
              <span>↗</span>
            </a>

            <a
              href={portfolio.social.github}
              target="_blank"
              rel="noreferrer"
            >
              GITHUB
              <span>↗</span>
            </a>

          </div>

        </div>

      </div>


      {/* =========================================
          BOTTOM TELEMETRY
         ========================================= */}

      <div className="driver-bottom-strip">

        <span>02 / DRIVER PROFILE</span>

        <span>MAHANTHESH S</span>

        <span>
          {portfolio.tagline}
        </span>

      </div>

    </SectionShell>
  );
}