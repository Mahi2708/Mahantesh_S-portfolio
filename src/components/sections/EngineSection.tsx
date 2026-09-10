import { portfolio } from '../../data/portfolio';
import { SectionShell } from './SectionShell';

type SkillKey =
  | 'core'
  | 'backend'
  | 'frontend'
  | 'databases'
  | 'tools'
  | 'methodologies';

type SkillLogoData = {
  url: string;
  fallback: string;
};

/*
 * Real technology logos.
 * The URLs point directly to Devicon SVG files.
 */
const skillLogos: Record<string, SkillLogoData> = {
  Java: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    fallback: 'JAVA',
  },
  Python: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    fallback: 'PY',
  },

  'Spring Boot': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
    fallback: 'SPR',
  },
  'Spring Security': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
    fallback: 'SEC',
  },
  'Hibernate/JPA': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hibernate/hibernate-original.svg',
    fallback: 'HIB',
  },

  React: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    fallback: 'RE',
  },
  TypeScript: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    fallback: 'TS',
  },
  HTML: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    fallback: 'HTML',
  },
  CSS: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    fallback: 'CSS',
  },

  PostgreSQL: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    fallback: 'PG',
  },
  MySQL: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
    fallback: 'SQL',
  },

  Git: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    fallback: 'GIT',
  },
  GCP: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',
    fallback: 'GCP',
  },
  'VS Code': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
    fallback: 'VS',
  },
  Postman: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
    fallback: 'PM',
  },
  Figma: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
    fallback: 'FIG',
  },
};

/*
 * These are skills rather than products/technologies,
 * so use compact technical badges.
 */
const technicalBadges: Record<string, string> = {
  DSA: 'DSA',
  OOP: 'OOP',
  'REST APIs': 'API',
  JDBC: 'DB',
  JWT: 'JWT',
  'API Design': '</>',
  Microservices: 'MS',
  'Exception Handling': '!',
  SQL: 'SQL',
  OpenAPI: 'API',
  Vercel: '▲',
  Render: 'R',
  'Power BI': 'PBI',
  Agile: '↻',
  SDLC: 'SDLC',
  'Manual Testing': '✓',
  'Unit Testing': 'UT',
};

const groupMeta: Array<{
  key: SkillKey;
  code: string;
  title: string;
  eyebrow: string;
  description: string;
  icon: string;
}> = [
  {
    key: 'core',
    code: '01',
    title: 'ENGINE / CORE',
    eyebrow: 'PROGRAMMING',
    description: 'Programming foundations used to build application logic.',
    icon: '</>',
  },
  {
    key: 'backend',
    code: '02',
    title: 'BACKEND SYSTEMS',
    eyebrow: 'SERVER',
    description: 'APIs, security and server-side application architecture.',
    icon: '▤',
  },
  {
    key: 'frontend',
    code: '03',
    title: 'FRONTEND',
    eyebrow: 'INTERFACE',
    description: 'Technologies used to build responsive application interfaces.',
    icon: '▣',
  },
  {
    key: 'databases',
    code: '04',
    title: 'DATABASE',
    eyebrow: 'DATA',
    description: 'Data storage, querying and database management.',
    icon: '◉',
  },
  {
    key: 'tools',
    code: '05',
    title: 'TOOLS / PLATFORM',
    eyebrow: 'TOOLING',
    description: 'Development, cloud and productivity tooling.',
    icon: '⚒',
  },
  {
    key: 'methodologies',
    code: '06',
    title: 'ENGINEERING PRACTICE',
    eyebrow: 'PROCESS',
    description: 'Methodologies and practices used during development.',
    icon: '⚙',
  },
];

function SkillLogo({ name }: { name: string }) {
  const logo = skillLogos[name];

  if (!logo) {
    return (
      <span
        className="skill-logo skill-logo--technical"
        aria-hidden="true"
      >
        {technicalBadges[name] ?? '•'}
      </span>
    );
  }

  return (
    <img
      className="skill-logo skill-logo--brand"
      src={logo.url}
      alt={`${name} logo`}
      loading="lazy"
      width="32"
      height="32"
    />
  );
}

export function EngineSection() {
  const skillGroups = groupMeta.map((group) => ({
    ...group,
    items: portfolio.skills[group.key],
  }));

  const totalSkills = skillGroups.reduce(
    (total, group) => total + group.items.length,
    0,
  );

  return (
    <SectionShell
      id="skills"
      index="03"
      kicker="UNDER THE HOOD"
      title="THE ENGINE"
      description="The technical stack behind Mahanthesh's builds — organized by function rather than artificial proficiency percentages."
    >
      <div className="engine-readout">
        <div className="engine-status">
          <span className="engine-status__dot" />

          <div>
            <span className="engine-status__label">
              SYSTEM STATUS
            </span>

            <strong>OPERATIONAL</strong>
          </div>
        </div>

        <div className="engine-meter" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <span
              key={index}
              className={index < 6 ? 'is-active' : ''}
            />
          ))}
        </div>

        <div className="engine-stats">
          <div>
            <span>PRIMARY STACK</span>
            <strong>JAVA / SPRING BOOT</strong>
          </div>

          <div>
            <span>CAPABILITY GROUPS</span>
            <strong>
              {String(skillGroups.length).padStart(2, '0')}
            </strong>
          </div>

          <div>
            <span>TECHNICAL ITEMS</span>
            <strong>
              {String(totalSkills).padStart(2, '0')}
            </strong>
          </div>
        </div>
      </div>

      <div className="engine-grid">
        {skillGroups.map((group) => (
          <article
            className="engine-card"
            key={group.key}
          >
            <div className="engine-card__header">
              <div className="engine-category-icon">
                {group.icon}
              </div>

              <div className="engine-card__meta">
                <span>{group.eyebrow}</span>
                <strong>{group.code} / 06</strong>
              </div>
            </div>

            <div className="engine-card__heading">
              <span>//</span>
              <h3>{group.title}</h3>
            </div>

            <p>{group.description}</p>

            <div className="skill-logo-grid">
              {group.items.map((item) => (
                <div
                  className="skill-tile"
                  key={item}
                  title={item}
                >
                  <div className="skill-tile__icon">
                    <SkillLogo name={item} />
                  </div>

                  <span className="skill-tile__name">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="engine-card__corner"
              aria-hidden="true"
            />
          </article>
        ))}
      </div>

      <div className="engine-footer">
        <div className="engine-footer__label">
          <span className="engine-footer__dot" />
          <span>DIAGNOSTIC NOTE</span>
        </div>

        <p>
          Strongest focus: backend development with Java and Spring Boot,
          REST APIs, authentication, database integration and performance
          optimization.
        </p>
      </div>
    </SectionShell>
  );
}
