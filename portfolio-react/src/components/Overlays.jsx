import { useEffect, useRef, useState } from 'react';
import { BOT, BOT_DEFAULT, BOT_LABELS, BOT_PATTERNS, TOUR } from '../data';
import { GITHUB, LINKEDIN, copyEmail, goTo, mailTo, openExt, reduced, toggleTheme } from '../lib';

const ACTIONS = { email: mailTo, linkedin: () => openExt(LINKEDIN), github: () => openExt(GITHUB) };

/* ---------- Command palette (Ctrl/Cmd + K) ---------- */
const COMMANDS = [
  ['Go to About', () => goTo('#about')], ['Go to Journey', () => goTo('#experience')], ['Go to Work', () => goTo('#projects')],
  ['Go to Toolkit', () => goTo('#skills')], ['Go to ML Lab', () => goTo('#mllab')], ['Go to Terminal', () => goTo('#terminal')],
  ['Go to Contact', () => goTo('#contact')], ['Open GitHub', ACTIONS.github], ['Open LinkedIn', ACTIONS.linkedin],
  ['Send email', mailTo], ['Copy email', copyEmail], ['Toggle theme', toggleTheme], ['Print or save as PDF', () => window.print()],
];

export function Palette({ open, onClose }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const input = useRef(null);
  const cur = COMMANDS.filter((c) => c[0].toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    if (open) { setQ(''); setSel(0); setTimeout(() => input.current?.focus(), 0); }
  }, [open]);
  if (!open) return null;

  const run = (c) => { onClose(); c[1](); };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { setSel(Math.min(cur.length - 1, sel + 1)); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { setSel(Math.max(0, sel - 1)); e.preventDefault(); }
    else if (e.key === 'Enter' && cur[sel]) run(cur[sel]);
  };
  return (
    <div id="pal" role="dialog" aria-modal="true" aria-label="Command palette" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pbox">
        <input id="pi" ref={input} placeholder="Jump to a chapter or action" aria-label="Search commands" autoComplete="off" value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }} onKeyDown={onKey} />
        <ul id="pl">{cur.map((c, i) => <li key={c[0]} className={i === sel ? 'sel' : ''} onClick={() => run(c)}>{c[0]}</li>)}</ul>
        <div className="phint">Up and down to move · Enter to run · Esc to close</div>
      </div>
    </div>
  );
}

/* ---------- Guide bot, guided tour and breathing break ---------- */
export function GuideBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [chips, setChips] = useState(BOT_DEFAULT);
  const [nudge, setNudge] = useState(false);
  const [ti, setTi] = useState(-1);
  const [breathing, setBreathing] = useState(false);
  const [bv, setBv] = useState({ text: 'Get comfortable', inh: false });
  const [text, setText] = useState('');
  const seen = useRef(false);
  const box = useRef(null);

  useEffect(() => { if (box.current) box.current.scrollTop = box.current.scrollHeight; }, [msgs, open]);

  useEffect(() => {
    let hide;
    const t = setTimeout(() => { if (!seen.current) { setNudge(true); hide = setTimeout(() => setNudge(false), 8000); } }, 9000);
    return () => { clearTimeout(t); clearTimeout(hide); };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (breathing) setBreathing(false); else if (open) setOpen(false); else if (ti >= 0) setTi(-1);
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [breathing, open, ti]);

  useEffect(() => { if (ti >= 0) goTo(TOUR[ti][0]); }, [ti]);

  useEffect(() => {
    if (!breathing) return undefined;
    setBv({ text: 'Get comfortable', inh: false });
    let n = 0, inh = true, id, t1;
    const phase = () => {
      if (n >= 6) { setBv({ text: 'Well done. Welcome back.', inh: false }); clearInterval(id); t1 = setTimeout(() => setBreathing(false), 2200); return; }
      setBv({ text: inh ? 'Breathe in' : 'Breathe out', inh });
      inh = !inh; n++;
    };
    const t0 = setTimeout(() => { phase(); id = setInterval(phase, 4000); }, 1200);
    return () => { clearTimeout(t0); clearInterval(id); clearTimeout(t1); };
  }, [breathing]);

  const openBot = (extra) => {
    setOpen(true); setNudge(false);
    const first = !seen.current;
    seen.current = true;
    setMsgs((m) => [...(first ? [{ w: 'bot', t: BOT.hi[0] }] : m), ...(extra ? [{ w: 'bot', t: extra }] : [])]);
    setChips(BOT_DEFAULT);
  };

  const reply = (k) => {
    if (k === 'tour') { setOpen(false); setTi(0); return; }
    if (k === 'relax') { setOpen(false); setBreathing(true); return; }
    setMsgs((m) => [...m, { w: 'bot t', t: '' }]);
    setTimeout(() => {
      const a = BOT[k];
      setMsgs((m) => [...m.slice(0, -1), { w: 'bot', t: a[0] }]);
      const extra = (a[1] || []).map(([l, act]) => ({ l, f: ACTIONS[act] }));
      setChips([...extra, ...BOT_DEFAULT.filter((x) => x !== k).slice(0, 5)]);
    }, reduced() ? 0 : 550);
  };

  const ask = (txt, key) => {
    setMsgs((m) => [...m, { w: 'u', t: txt }]);
    let k = key;
    if (!k) { const hit = BOT_PATTERNS.find(([re]) => re.test(txt.toLowerCase())); k = hit ? hit[1] : ''; }
    if (!k) {
      setMsgs((m) => [...m, { w: 'bot', t: 'I can talk about his background, projects, skills, and what he is looking for. Try a button below, or ask about one of those.' }]);
      setChips(BOT_DEFAULT);
      return;
    }
    reply(k);
  };

  const send = () => { const v = text.trim(); if (v) { setText(''); ask(v); } };
  const finishTour = () => { setTi(-1); openBot('That is the tour. Ask me anything else about him.'); };

  return (
    <>
      <button id="bot" aria-label="Open the portfolio guide" onClick={() => (open ? setOpen(false) : openBot())}>
        <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true"><line x1="16" y1="3" x2="16" y2="8" stroke="#fff" strokeWidth="2" /><circle className="ant" cx="16" cy="3" r="2" fill="#fff" /><rect x="5" y="8" width="22" height="17" rx="6" fill="#fff" /><circle cx="12" cy="16" r="2.4" fill="#d6336c" /><circle cx="20" cy="16" r="2.4" fill="#d6336c" /><path d="M12 21h8" stroke="#d6336c" strokeWidth="2" strokeLinecap="round" /></svg>
      </button>
      {nudge && <div id="bnudge" onClick={() => openBot()}>Hi! Want a 30-second tour?</div>}

      {open && (
        <div id="bp" role="dialog" aria-label="Portfolio guide">
          <div className="bh"><div><b>Portfolio guide</b><small>Ask me about Sundhareshwar</small></div><button id="bx" aria-label="Close guide" onClick={() => setOpen(false)}>×</button></div>
          <div id="bm" ref={box} aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`m ${m.w}`}>{m.w === 'bot t' ? (<><span /><span /><span /></>) : m.t}</div>
            ))}
          </div>
          <div className="bch">
            {chips.map((c) => (typeof c === 'string'
              ? <button key={c} onClick={() => ask(BOT_LABELS[c], c)}>{BOT_LABELS[c]}</button>
              : <button key={c.l} onClick={c.f}>{c.l}</button>))}
          </div>
          <div className="bf">
            <input id="bin" placeholder="Ask about skills, projects, roles" aria-label="Ask the guide" autoComplete="off" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} />
            <button id="bs" onClick={send}>Send</button>
          </div>
        </div>
      )}

      {ti >= 0 && (
        <div id="tc" role="region" aria-label="Guided tour">
          <div>Step {ti + 1} of {TOUR.length}. {TOUR[ti][1]}</div>
          <div className="trow">
            <button disabled={ti === 0} onClick={() => setTi(ti - 1)}>Back</button>
            <button className="pri" onClick={() => (ti >= TOUR.length - 1 ? finishTour() : setTi(ti + 1))}>{ti === TOUR.length - 1 ? 'Finish' : 'Next'}</button>
            <button onClick={() => setTi(-1)}>Stop</button>
          </div>
        </div>
      )}

      {breathing && (
        <div id="br" role="dialog" aria-label="Breathing break">
          <div className={`bc${bv.inh ? ' in' : ''}`} />
          <p id="btx">{bv.text}</p>
          <button id="bcl" onClick={() => setBreathing(false)}>Close</button>
        </div>
      )}
    </>
  );
}
