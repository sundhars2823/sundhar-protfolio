import { useEffect, useRef, useState } from 'react';
import { createClassifier } from '../classifier';
import { TERM, TERM_BUTTONS } from '../data';
import { toggleTheme } from '../lib';

const Idx = ({ label }) => <div className="idx rv">{label}</div>;

export function MLLab() {
  const cv = useRef(null);
  const api = useRef(null);
  const [status, setStatus] = useState('');
  const [cls, setCls] = useState(0);
  const [deg, setDeg] = useState(1);

  useEffect(() => {
    api.current = createClassifier(cv.current, setStatus);
    return () => api.current.destroy();
  }, []);

  const pickClass = (c) => { setCls(c); api.current.setClass(c); };
  const pickModel = (d) => { setDeg(d); api.current.setModel(d); };
  const dataset = (t) => setDeg(api.current.gen(t));

  return (
    <section id="mllab">
      <Idx label="Chapter 5 · Hands-on: ML lab" />
      <h2 className="rv">Train a classifier live</h2>
      <p className="sub rv">Click the canvas to place data points. A logistic regression model trains in your browser and redraws its decision boundary as you add data.</p>
      <div className="card lab2 rv">
        <div className="ctl">
          <h4>Class to place</h4>
          <div className="g"><button aria-pressed={cls === 0} onClick={() => pickClass(0)}>Class A</button><button aria-pressed={cls === 1} onClick={() => pickClass(1)}>Class B</button></div>
          <h4>Model</h4>
          <div className="g"><button aria-pressed={deg === 1} onClick={() => pickModel(1)}>Linear</button><button aria-pressed={deg === 2} onClick={() => pickModel(2)}>Polynomial</button></div>
          <h4>Dataset</h4>
          <div className="g"><button onClick={() => dataset(1)}>Two clusters</button><button onClick={() => dataset(2)}>Ring</button><button onClick={() => dataset(0)}>Clear</button></div>
          <p>Try the ring dataset with the linear model, then switch to polynomial.</p>
        </div>
        <div><canvas id="cv" ref={cv} aria-label="Interactive classifier canvas" /><div id="mst">{status}</div></div>
      </div>
      <svg className="glyph" viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="6" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" /><path d="M7 6l3 5M7 18l3-5M14 12h3" /></svg>
    </section>
  );
}

export function TerminalSection() {
  const [lines, setLines] = useState([{ t: 'Welcome. Type help to list commands.' }]);
  const [value, setValue] = useState('');
  const history = useRef([]);
  const cursor = useRef(0);
  const out = useRef(null);
  const input = useRef(null);

  useEffect(() => { if (out.current) out.current.scrollTop = out.current.scrollHeight; }, [lines]);

  const run = (raw) => {
    const c = raw.trim().toLowerCase();
    if (!c) return;
    history.current.push(c);
    cursor.current = history.current.length;
    if (c === 'clear') { setLines([]); return; }
    const add = [{ t: `$ ${c}`, c: 'cmd' }];
    if (c === 'theme') { toggleTheme(); add.push({ t: 'Theme toggled.' }); }
    else if (TERM[c]) add.push({ t: TERM[c] });
    else add.push({ t: `command not found: ${c}. Type help.`, c: 'err' });
    setLines((l) => [...l, ...add]);
  };

  const onKey = (e) => {
    const h = history.current;
    if (e.key === 'Enter') { run(value); setValue(''); }
    else if (e.key === 'ArrowUp' && h.length) { cursor.current = Math.max(0, cursor.current - 1); setValue(h[cursor.current]); e.preventDefault(); }
    else if (e.key === 'ArrowDown') { cursor.current = Math.min(h.length, cursor.current + 1); setValue(h[cursor.current] || ''); e.preventDefault(); }
  };

  return (
    <section id="terminal">
      <Idx label="Chapter 6 · Hands-on: terminal" />
      <h2 className="rv">Command line</h2>
      <p className="sub rv">Browse my profile the way an engineer would. Type a command, or tap one below.</p>
      <div className="card cli rv" onClick={(e) => { if (e.target.tagName !== 'BUTTON') input.current?.focus({ preventScroll: true }); }}>
        <div id="out" ref={out} role="log">{lines.map((l, i) => <div key={i} className={l.c}>{l.t}</div>)}</div>
        <div className="pr"><span>$</span><input id="ci" ref={input} aria-label="Command" autoCapitalize="off" autoComplete="off" spellCheck="false" placeholder="type help" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={onKey} /></div>
        <div className="cmds">{TERM_BUTTONS.map((c) => <button key={c} onClick={() => run(c)}>{c}</button>)}</div>
      </div>
      <svg className="glyph" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 10l3 2-3 2M12 15h5" /></svg>
    </section>
  );
}
