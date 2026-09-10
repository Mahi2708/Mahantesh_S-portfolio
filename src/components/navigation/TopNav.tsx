import { useState } from 'react';
import { scrollToId } from '../../lib/scroll';

const navItems = [
  { id: 'profile', label: 'PROFILE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'certifications', label: 'CERTIFICATIONS' },
  { id: 'contact', label: 'CONTACT' },
];

export function TopNav() {
  const [open, setOpen] = useState(false);

  const handleNavigation = (id: string) => {
    scrollToId(id);
    setOpen(false);
  };

  return (
    <header className="top-nav">
      <button
        className="brand"
        onClick={() => handleNavigation('home')}
        aria-label="Go to home"
      >
        DREAMER
        <span>// DRIVE</span>
      </button>

      <button
        className="menu-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        {open ? 'CLOSE' : 'MENU'}
      </button>

      <nav className={open ? 'nav-links open' : 'nav-links'}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.id)}
          >
            {item.label}
          </button>
        ))}

        <a
          href="/assets/resume/resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          RESUME ↗
        </a>
      </nav>
    </header>
  );
}