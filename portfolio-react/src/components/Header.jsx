import { useEffect, useRef } from 'react';
import { NAV } from '../data';
import { useScroll } from '../hooks';
import { toggleTheme } from '../lib';

const IDS = NAV.map((n) => n[0]);

export default function Header({ onJump }) {
  const active = useScroll(IDS);
  const nav = useRef(null);

  // Keep the active tab visible inside the horizontally scrolling menu.
  useEffect(() => {
    const n = nav.current;
    const a = n?.querySelector('a.on');
    if (a) n.scrollTo({ left: a.offsetLeft - n.clientWidth / 2 + a.offsetWidth / 2, behavior: 'smooth' });
  }, [active]);

  return (
    <header>
      <div className="w bar">
        <a className="logo" href="#home"><span>Sundhareshwar</span></a>
        <nav id="nav" ref={nav}>
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{label}</a>
          ))}
        </nav>
        <button id="pk" title="Press Ctrl+K" onClick={onJump}>Jump</button>
        <button id="th" aria-label="Toggle light and dark theme" onClick={toggleTheme}>Theme</button>
      </div>
      <div id="prog" />
    </header>
  );
}
