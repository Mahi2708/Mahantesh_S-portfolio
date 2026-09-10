import { useEffect, useState } from 'react';
import { SectionShell } from './SectionShell';

type Certification = {
  id: string;
  number: string;
  issuer: string;
  title: string;
  category: string;
  description: string;
  image: string;
};

const certifications: Certification[] = [
  {
    id: 'google-cloud',
    number: '01',
    issuer: 'GOOGLE CLOUD',
    title: 'Prompt Design in Vertex AI',
    category: 'CLOUD / AI',
    description:
      "Skill badge awarded for demonstrating prompt design knowledge using Google Cloud's Vertex AI.",
    image: '/assets/certifications/prompt-design.png',
  },
  {
    id: 'oracle-sql',
    number: '02',
    issuer: 'ORACLE DEV GYM',
    title: 'SQL Fundamentals',
    category: 'DATABASE / SQL',
    description:
      'Certificate of completion covering foundational SQL and database fundamentals.',
    image: '/assets/certifications/Screenshot (78).png',
  },
  {
    id: 'tata-cybersecurity',
    number: '03',
    issuer: 'TATA / FORAGE',
    title: 'Cybersecurity Analyst Job Simulation',
    category: 'CYBERSECURITY',
    description:
      'Certificate of completion for the Tata Cybersecurity Analyst job simulation.',
    image: '/assets/certifications/Screenshot (79).png',
  },
  {
    id: 'cnsp',
    number: '04',
    issuer: 'THE SECOPS GROUP',
    title: 'Certified Network Security Practitioner',
    category: 'NETWORK SECURITY',
    description:
      'Professional certification focused on network security fundamentals and practical security knowledge.',
    image: '/assets/certifications/cnsp.png',
  },
];

export function Certifications() {
  const [selected, setSelected] = useState<Certification | null>(null);

  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selected]);

  return (
    <SectionShell
      id="certifications"
      index="07"
      kicker="CHECK ENGINE"
      title="CREDENTIALS & LESSONS"
      description="Verified credentials collected along the road — displayed through the vehicle's central screen."
    >
      <div className="cert-cockpit">
        <img
          className="cert-cockpit__background"
          src="/assets/certifications/image.png"
          alt=""
          aria-hidden="true"
        />

        <div className="cert-cockpit__shade" />
        <div className="cert-cockpit__reflection" />

        <div className="cert-screen">
          <div className="cert-screen__topbar">
            <div className="cert-screen__brand">
              <strong>DREAMER</strong>
              <span>// DRIVE</span>
            </div>

            <div className="cert-screen__status">
              <span className="cert-status-dot" />
              SYSTEM ONLINE
            </div>

            <div className="cert-screen__clock">CREDENTIALS // 07</div>
          </div>

          <div className="cert-screen__heading">
            <div>
              <span className="cert-screen__eyebrow">
                VEHICLE SYSTEM / DRIVER RECORD
              </span>
              <h3>CHECK ENGINE</h3>
              <p>Credentials &amp; lessons</p>
            </div>

            <div className="cert-screen__stats">
              <div>
                <span>RECORDS</span>
                <strong>04</strong>
              </div>
              <div>
                <span>VERIFIED</span>
                <strong>04</strong>
              </div>
              <div>
                <span>STATUS</span>
                <strong>ACTIVE</strong>
              </div>
            </div>
          </div>

          <div className="cert-grid">
            {certifications.map((certification) => (
              <article className="cert-tile" key={certification.id}>
                <div className="cert-tile__top">
                  <span>INSPECTION {certification.number}</span>
                  <span className="cert-tile__verified">
                    <i />
                    VERIFIED
                  </span>
                </div>

                <button
                  type="button"
                  className="cert-tile__image"
                  onClick={() => setSelected(certification)}
                  aria-label={`Open ${certification.title}`}
                >
                  <img
                    src={certification.image}
                    alt={`${certification.title} certificate`}
                    loading="lazy"
                  />

                  <span className="cert-tile__scan">
                    <span>OPEN RECORD</span>
                    <strong>↗</strong>
                  </span>
                </button>

                <div className="cert-tile__info">
                  <span className="cert-tile__issuer">
                    {certification.issuer}
                  </span>

                  <h4>{certification.title}</h4>

                  <span className="cert-tile__category">
                    {certification.category}
                  </span>
                </div>

                <div className="cert-tile__bottom">
                  <span className="cert-tile__signal">
                    <i />
                    DOCUMENTED
                  </span>

                  <button
                    type="button"
                    className="cert-tile__view"
                    onClick={() => setSelected(certification)}
                    aria-label={`View ${certification.title} certificate`}
                  >
                    <span className="cert-document-icon">
                      <i />
                      <i />
                      <i />
                    </span>
                    <strong>↗</strong>
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="cert-screen__footer">
            <div>
              <span className="cert-footer-light" />
              <span>SYSTEM DIAGNOSTIC</span>
            </div>

            <p>
              KEEP LEARNING. KEEP SHIPPING.
            </p>

            <span>DRIVER RECORD // MAHANTHESH S</span>
          </div>
        </div>
      </div>

      {selected && (
        <div
          className="cert-modal"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          onClick={() => setSelected(null)}
        >
          <div
            className="cert-modal__panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cert-modal__bar">
              <div>
                <span>DOCUMENT VIEWER // {selected.number}</span>
                <strong>{selected.title}</strong>
              </div>

              <button
                type="button"
                className="cert-modal__close"
                onClick={() => setSelected(null)}
                aria-label="Close certificate viewer"
              >
                ×
              </button>
            </div>

            <div className="cert-modal__image">
              <img
                src={selected.image}
                alt={`${selected.title} certificate`}
              />
            </div>

            <div className="cert-modal__meta">
              <span>{selected.issuer}</span>
              <span>{selected.category}</span>
              <span className="is-verified">● VERIFIED</span>
            </div>
          </div>
        </div>
      )}
    </SectionShell>
  );
}
