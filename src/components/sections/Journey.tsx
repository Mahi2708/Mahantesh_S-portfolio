import { useState } from 'react';
import { SectionShell } from './SectionShell';

type Experience = {
  id: string;
  year: string;
  period: string;
  role: string;
  company: string;
  location?: string;
  logo?: string;
  description: string;
  highlights: string[];
  document?: {
    label: string;
    src: string;
  };
};

const experiences: Experience[] = [
  {
    id: 'emberquest',
    year: '2024',
    period: 'NOV 2024 — DEC 2024',
    role: 'Intern',
    company: 'Emberquest',
    location: 'Bengaluru',
    logo: '/assets/experience/emberquest-logo.svg',
    description:
      'Worked on transforming ideas into practical business models while gaining exposure to validation, networking, pitching and problem-solving.',
    highlights: [
      'Business model validation and practical idea development.',
      'Exposure to networking and pitching.',
      'Problem-solving around venture development.',
    ],
    document: {
      label: 'INTERNSHIP COMPLETION CERTIFICATE',
      src: '/assets/experience/ember-completion.jpeg',
    },
  },

  {
    id: 'mindset',
    year: '2025',
    period: 'MAR 2025 — JUN 2025',
    role: 'Web Development Intern',
    company: 'Mindset IT Solution',
    location: 'Bengaluru',
    logo: '/assets/experience/mindset-logo.svg',
    description:
      'Worked on backend and web development using Java and Spring Boot, focusing on REST APIs, database integration, authentication and performance.',
    highlights: [
      'Developed scalable REST APIs using Spring Boot.',
      'Improved database query efficiency through indexing and optimized joins.',
      'Implemented JWT authentication and role-based access control.',
      'Worked with PostgreSQL using Hibernate/JPA.',
    ],
    document: {
      label: 'INTERNSHIP COMPLETION CERTIFICATE',
      src: '/assets/experience/mindset-completion.png',
    },
  },

  {
    id: 'era-foundation',
    year: '2026',
    period: 'JUN 2026 — PRESENT',
    role: 'Customer Support Intern',
    company: 'Era Foundation Pvt. Ltd.',
    location: 'Bengaluru',
    logo: '/assets/experience/era-foundation-logo.svg',
    description:
      'Supporting customers by resolving queries, investigating issues, documenting findings and helping ensure timely and accurate resolution.',
    highlights: [
      'Resolved customer queries with focus on accuracy and service quality.',
      'Investigated customer issues and documented findings.',
      'Worked toward timely and accurate issue resolution.',
    ],
  },
];

export function Journey() {
  const [activeExperience, setActiveExperience] = useState(
    experiences[0].id,
  );

  const [selectedDocument, setSelectedDocument] = useState<
    Experience['document'] | null
  >(null);

  const activeIndex = Math.max(
    0,
    experiences.findIndex(
      (experience) => experience.id === activeExperience,
    ),
  );

  return (
    <SectionShell
      id="journey"
      index="05"
      kicker="THE ROAD SO FAR"
      title="THE EXPERIENCE ROUTE"
      description="Every stop added another layer to the journey — from early business exposure to web development and customer support."
    >
      <div className="journey-road-header">
        <div className="journey-road-status">
          <span className="journey-road-status__light" />
          <div>
            <span>ROUTE STATUS</span>
            <strong>IN MOTION</strong>
          </div>
        </div>

        <div className="journey-road-distance">
          <span>EXPERIENCE STOPS</span>
          <strong>{String(experiences.length).padStart(2, '0')}</strong>
        </div>

        <div className="journey-road-year">
          <span>CURRENT ROUTE</span>
          <strong>2024 → PRESENT</strong>
        </div>
      </div>

      <div
        className="experience-road"
        style={
          {
            '--active-progress': `${(
              (activeIndex / Math.max(experiences.length - 1, 1)) *
              100
            ).toFixed(2)}%`,
          } as React.CSSProperties
        }
      >
        <div className="experience-road__surface">
          <div className="experience-road__edge experience-road__edge--left" />
          <div className="experience-road__edge experience-road__edge--right" />

          <div className="experience-road__lane">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="experience-road__progress">
            <div className="experience-road__progress-glow" />
          </div>

          <div className="journey-car" aria-hidden="true">
            <div className="journey-car__shadow" />
            <div className="journey-car__body">
              <span className="journey-car__window" />
              <span className="journey-car__light journey-car__light--front" />
              <span className="journey-car__light journey-car__light--rear" />
            </div>
            <span className="journey-car__wheel journey-car__wheel--one" />
            <span className="journey-car__wheel journey-car__wheel--two" />
          </div>
        </div>

        <div className="experience-stops">
          {experiences.map((experience, index) => {
            const isActive = experience.id === activeExperience;
            const isPassed = index <= activeIndex;

            return (
              <article
                key={experience.id}
                className={[
                  'experience-stop',
                  index % 2 === 0
                    ? 'experience-stop--left'
                    : 'experience-stop--right',
                  isActive ? 'is-active' : '',
                  isPassed ? 'is-passed' : '',
                ].join(' ')}
                tabIndex={0}
                onMouseEnter={() => setActiveExperience(experience.id)}
                onFocus={() => setActiveExperience(experience.id)}
                onClick={() => setActiveExperience(experience.id)}
              >
                <div className="experience-stop__point">
                  <div className="experience-stop__point-inner">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </div>

                <div className="experience-stop__connector">
                  <span />
                </div>

                <div className="experience-card">
                  <div className="experience-card__top">
                    <div className="experience-card__date">
                      <span>{experience.year}</span>
                      <small>{experience.period}</small>
                    </div>
                    <span className="experience-card__sequence">
                      STOP {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="experience-card__role">
                    <span>//</span>
                    <h3>{experience.role}</h3>
                  </div>

                  <div className="experience-card__company">
                    <span className="experience-card__company-logo">
                      {experience.logo ? (
                        <img
                          src={experience.logo}
                          alt={`${experience.company} logo`}
                          loading="lazy"
                        />
                      ) : (
                        <span className="experience-card__company-icon">●</span>
                      )}
                    </span>

                    <div>
                      <strong>{experience.company}</strong>
                      {experience.location && (
                        <small>
                          <span>⌖</span>
                          {experience.location}
                        </small>
                      )}
                    </div>
                  </div>

                  <p className="experience-card__description">
                    {experience.description}
                  </p>

                  <ul className="experience-card__highlights">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}>
                        <span>+</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {experience.document && (
                    <button
                      type="button"
                      className="experience-document"
                      title={`View ${experience.document.label}`}
                      aria-label={`View ${experience.document.label}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedDocument(experience.document ?? null);
                      }}
                    >
                      <span className="experience-document__icon">
                        <span />
                        <span />
                        <span />
                      </span>
                      <span className="experience-document__text">
                        <small>DOCUMENT</small>
                        <strong>VIEW LETTER</strong>
                      </span>
                      <span className="experience-document__arrow">↗</span>
                    </button>
                  )}

                  <div className="experience-card__corner" aria-hidden="true" />
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="journey-route-footer">
        <div>
          <span className="journey-route-footer__signal" />
          <span>ROAD LOG</span>
        </div>
        <p>
          Hover or tap each experience stop to move the car through the route. Select the document icon to inspect available internship evidence.
        </p>
      </div>

      {selectedDocument && (
        <div
          className="experience-document-modal"
          role="dialog"
          aria-modal="true"
          aria-label={selectedDocument.label}
          onClick={() => setSelectedDocument(null)}
        >
          <div
            className="experience-document-modal__box"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="experience-document-modal__close"
              aria-label="Close document"
              onClick={() => setSelectedDocument(null)}
            >
              ×
            </button>

            <div className="experience-document-modal__header">
              <div>
                <span>DOCUMENT VIEWER</span>
                <strong>{selectedDocument.label}</strong>
              </div>
              <span className="experience-document-modal__status">
                VERIFIED DOCUMENT
              </span>
            </div>

            <div className="experience-document-modal__image">
              <img src={selectedDocument.src} alt={selectedDocument.label} />
            </div>
          </div>
        </div>
      )}
    </SectionShell>
  );
}
