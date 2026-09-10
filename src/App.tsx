import { CinematicHero } from './components/hero/CinematicHero';
import { TopNav } from './components/navigation/TopNav';
import { DriverProfile } from './components/sections/DriverProfile';
import { RaceLog } from './components/sections/RaceLog';
import { EngineSection } from './components/sections/EngineSection';
import { Journey } from './components/sections/Journey';
import { Certifications } from './components/sections/Certifications';
import { Contact } from './components/sections/Contact';
import { Copilot } from './components/chat/Copilot';

export default function App() {
  return (
    <div className="site-shell">
      <TopNav />

      <main>
        <CinematicHero />
        <DriverProfile />
        <RaceLog />
        <EngineSection />
        <Journey />
        <Certifications />
        <Contact />
      </main>

      <Copilot />
    </div>
  );
}