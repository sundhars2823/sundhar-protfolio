import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero, { Marquee } from './components/Hero';
import { About, Certs, Contact, Experience, Footer, Glance, Numbers, Projects, Skills } from './components/Sections';
import { MLLab, TerminalSection } from './components/Labs';
import { GuideBot, Palette } from './components/Overlays';
import { useReveal } from './hooks';

export default function App() {
  const [palette, setPalette] = useState(false);
  useReveal();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette((p) => !p); }
      else if (e.key === 'Escape') setPalette(false);
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Header onJump={() => setPalette(true)} />
      <Hero />
      <Marquee />
      <main className="w">
        <Glance />
        <About />
        <Numbers />
        <Experience />
        <Projects />
        <Skills />
        <MLLab />
        <TerminalSection />
        <Certs />
        <Contact />
      </main>
      <Footer />
      <GuideBot />
      <Palette open={palette} onClose={() => setPalette(false)} />
    </>
  );
}
