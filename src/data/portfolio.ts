import source from './portfolio.json';
export type Portfolio = typeof source;
export const portfolio = source;

export const navItems = [
  { label: 'PROFILE', id: 'profile' },
  { label: 'RACE LOG', id: 'projects' },
  { label: 'ENGINE', id: 'skills' },
  { label: 'PIT STOPS', id: 'experience' },
  { label: 'JOURNEY', id: 'journey' },
  { label: 'GARAGE', id: 'garage' },
  { label: 'O-01', id: 'copilot' },
  { label: 'CONTACT', id: 'contact' }
];
