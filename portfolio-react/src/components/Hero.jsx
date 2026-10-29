import { useEffect, useRef, useState } from 'react';
import { HERO_LOG, TECH, TYPED } from '../data';
import { reduced } from '../lib';
import { startNetwork } from '../network';

function Typed({ lines }) {
  const [text, setText] = useState('');
  useEffect(() => {
    let li = 0, ci = 0, id;
    const rm = reduced();
    const tick = () => {
      const line = lines[li];
      if (rm) { setText(line); li = (li + 1) % lines.length; id = setTimeout(tick, 2600); return; }
      if (ci <= line.length) { setText(line.slice(0, ci++)); id = setTimeout(tick, 45); }
      else { ci = 0; li = (li + 1) % lines.length; id = setTimeout(tick, 1800); }
    };
    tick();
    return () => clearTimeout(id);
  }, [lines]);
  return <div className="say" aria-live="polite">{text}</div>;
}

function HeroLog() {
  const L = HERO_LOG.length;
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduced()) { setN(L + 1); return undefined; }
    let id;
    const go = (i) => { setN(i); id = setTimeout(() => go(i > L ? 0 : i + 1), i > L ? 3600 : 650); };
    go(1);
    return () => clearTimeout(id);
  }, [L]);
  return (
    <div className="term" aria-hidden="true">
      <div className="tb"><i /><i /><i />deploy.log</div>
      <pre id="tp">
        {HERO_LOG.slice(0, Math.min(n, L)).map((l, i) => (
          <div key={l}>{l}{i > 0 && <span className="ok"> ✓</span>}</div>
        ))}
        {n > L && <div className="ok">status: ready</div>}
      </pre>
    </div>
  );
}

export default function Hero() {
  const canvas = useRef(null);
  const section = useRef(null);
  useEffect(() => startNetwork(canvas.current, section.current, reduced()), []);

  return (
    <section id="home" className="hero" style={{ padding: 0 }} ref={section}>
      <canvas id="net" ref={canvas} aria-hidden="true" />
      <HeroLog />
      <div className="w">
        <div className="pill"><i />Open to senior AI engineering and architecture roles</div>
        <div className="hi">Lead AI Engineer · Solutions Architect</div>
        <h1>Sundhareshwar</h1>
        <p className="role">Architecting CRM platforms, workflow systems and AI features at TRAAEXPLORE, Bengaluru.</p>
        <Typed lines={TYPED} />
        <div className="btns"><a className="btn" href="#projects">View projects</a><a className="btn alt" href="#contact">Get in touch</a></div>
        <div className="hstats">
          <div><b>TRAAEXPLORE</b><span>Bengaluru · current</span></div>
          <div><b>Full stack + AI</b><span>architecture to delivery</span></div>
          <div><b>2+ years</b><span>in data and AI</span></div>
        </div>
      </div>
      <div className="scroll">Scroll to explore</div>
    </section>
  );
}

export function Marquee() {
  const items = [...TECH, ...TECH];
  return (
    <div className="mq" aria-hidden="true">
      <div>{items.map((t, i) => <span key={i}>{t}<i> ●</i></span>)}</div>
    </div>
  );
}
