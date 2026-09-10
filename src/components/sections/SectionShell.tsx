import { ReactNode } from 'react';

export function SectionShell({ id, index, kicker, title, description, children }: { id: string; index: string; kicker: string; title: string; description?: string; children?: ReactNode }) {
  return (
    <section id={id} className="section-shell">
      <div className="section-topline"><span>{index}</span><span>{kicker}</span></div>
      <div className="section-heading"><p className="section-kicker">{kicker}</p><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>
      {children}
    </section>
  );
}
