import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ARCH, CERTS, DECISIONS, GLANCE, GLYPHS, HUES, JOBS, JOURNEY, NUMBERS, SAMPLES, SKILLS, STAGES, WEIGHTS,
} from '../data';
import { EMAIL, GITHUB, LINKEDIN, PHONE, copyEmail, reduced } from '../lib';

const Idx = ({ label }) => <div className="idx rv">{label}</div>;

function Chapter({ id, label, title, sub, children }) {
  return (
    <section id={id}>
      <Idx label={label} />
      <h2 className="rv">{title}</h2>
      <p className="sub rv">{sub}</p>
      {children}
      {GLYPHS[id] && <svg className="glyph" viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: GLYPHS[id] }} />}
    </section>
  );
}

export function Glance() {
  return (
    <section id="glance" style={{ paddingTop: 56 }}>
      <div className="gl">
        {GLANCE.map(([h, p]) => <div className="card rv" key={h}><h4>{h}</h4><p>{p}</p></div>)}
      </div>
      <div className="btns">
        <a className="btn" href={`mailto:${EMAIL}`}>Email</a>
        <a className="btn alt" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a className="btn alt" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
        <button className="btn alt" onClick={() => window.print()}>Print or save as PDF</button>
      </div>
    </section>
  );
}

function PipelineTabs() {
  const [i, setI] = useState(0);
  return (
    <>
      <p className="rv" style={{ color: 'var(--mute)', fontWeight: 700, marginBottom: 6 }}>How I deliver. Tap a stage:</p>
      <div className="pipe rv" role="tablist">
        {STAGES.map((s, j) => (
          <button key={s[0]} role="tab" aria-selected={i === j} onClick={() => setI(j)}>{j + 1}. {s[0]}</button>
        ))}
      </div>
      <div className="card rv" role="tabpanel" aria-live="polite">{STAGES[i][1]}</div>
    </>
  );
}

export function About() {
  return (
    <section id="about">
      <div className="about">
        <figure className="shot rv" style={{ margin: 0 }}>
          <img loading="lazy" decoding="async" src="/img/about.jpg" alt="Sundhareshwar sitting in a stone doorway at night" />
          <figcaption>Bengaluru, India</figcaption>
        </figure>
        <div>
          <Idx label="Chapter 1 · The engineer" />
          <h2 className="rv">From data analysis to AI-native software architecture.</h2>
          <p className="sub rv">I began as a data analyst, moved into AI engineering, and now lead the architecture and development of a company-wide CRM at TRAAEXPLORE. I own the system end to end: data model, backend, frontend, workflows and the AI features built on top.</p>
          <div className="code rv" aria-label="Profile summary as code" style={{ whiteSpace: 'pre' }}>
            <span className="k">class</span> <span className="f">Engineer</span>:{'\n'}
            {'  '}name = <span className="s">"Sundhareshwar"</span>{'\n'}
            {'  '}role = <span className="s">"Lead AI Engineer, Solutions Architect"</span>{'\n'}
            {'  '}owns = [<span className="s">"CRM architecture"</span>, <span className="s">"workflows"</span>, <span className="s">"AI features"</span>]{'\n'}
            {'  '}stack = [<span className="s">"React"</span>, <span className="s">"Node.js"</span>, <span className="s">"PostgreSQL"</span>, <span className="s">"Python"</span>]{'\n'}
            {'  '}certified = <span className="s">"AWS ML Engineer Associate"</span>{'\n'}
            {'  '}<span className="c"># architecture to production, end to end</span>
          </div>
          <PipelineTabs />
        </div>
      </div>
    </section>
  );
}

function Counter({ n, d }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const rm = reduced(), t0 = performance.now();
      const f = (t) => { const p = rm ? 1 : Math.min(1, (t - t0) / 1000); setV(n * p); if (p < 1) requestAnimationFrame(f); };
      requestAnimationFrame(f);
    }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [n]);
  return <b ref={ref}>{v.toFixed(d)}</b>;
}

export function Numbers() {
  return (
    <section id="numbers">
      <div className="nums">
        {NUMBERS.map(([n, d, label]) => <div className="card rv" key={label}><Counter n={n} d={d} /><span>{label}</span></div>)}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <Chapter id="experience" label="Chapter 2 · The journey" title="Professional experience"
      sub="The story so far: from analysing data to architecting the platform a whole company runs on.">
      <ol className="jr rv">
        {JOURNEY.map(([b, s, now]) => (
          <li key={b} className={now ? 'now' : ''}>
            {now && <img src="/img/portrait.jpg" alt="Sundhareshwar" />}
            <b>{b}</b><span>{s}</span>
          </li>
        ))}
      </ol>
      {JOBS.map((j) => (
        <div className="tl rv" key={j.title}>
          <h3>{j.title}</h3>
          <div className="when">{j.when}</div>
          <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      ))}
    </Chapter>
  );
}

const Tags = ({ list }) => list.map((t) => <span className="tag" key={t}>{t}</span>);
const Flow = ({ steps }) => (
  <div className="flow">{steps.map(([a, b]) => <div key={a}><span>{a}<small>{b}</small></span></div>)}</div>
);
function Case({ feat, title, parts, tags, children }) {
  return (
    <div className={`case${feat ? ' feat' : ''} rv`}>
      <div>
        {feat && <div className="live"><i />Live in production</div>}
        <h3>{title}</h3>
        {parts.map(([h, p]) => <div key={h}><h4>{h}</h4><p>{p}</p></div>)}
        <Tags list={tags} />
      </div>
      {children}
    </div>
  );
}

function ArchExplorer() {
  const [i, setI] = useState(0);
  return (
    <div className="arch">
      <h4 style={{ margin: '0 0 4px', color: 'var(--mute)' }}>Architecture explorer. Tap a layer:</h4>
      <div className="al">
        {ARCH.map((a, j) => <button key={a[0]} aria-pressed={i === j} onClick={() => setI(j)}>{a[0]}<small>{a[1]}</small></button>)}
      </div>
      <div className="card ad" aria-live="polite"><b>{ARCH[i][0]}</b><p style={{ margin: '6px 0 0' }}>{ARCH[i][2]}</p></div>
    </div>
  );
}

function PhotoRanker() {
  const [w, setW] = useState(WEIGHTS.map((x) => x[1]));
  const [k, setK] = useState(3);
  const rank = useMemo(() => {
    const sum = w.reduce((a, b) => a + b, 0) || 1;
    const sc = SAMPLES.map((p) => (p.reduce((a, v, i) => a + v * w[i], 0) / sum) * 100);
    const order = sc.map((s, i) => [s, i]).sort((a, b) => b[0] - a[0]);
    const r = {};
    order.forEach(([, i], pos) => { r[i] = pos; });
    return { sc, r };
  }, [w]);
  return (
    <div style={{ gridColumn: '1/-1' }}>
      <h4 style={{ margin: '0 0 8px' }}>Interactive demonstration: adjust the weights to see how the ranking changes. The eight samples are illustrative, not client data.</h4>
      <div className="lab">
        <div>
          {WEIGHTS.map(([name], i) => (
            <div className="sl" key={name}>
              <label htmlFor={`w${i}`}>{name}<span>{w[i]}</span></label>
              <input type="range" id={`w${i}`} min="0" max="100" value={w[i]} onChange={(e) => setW(w.map((x, j) => (j === i ? +e.target.value : x)))} />
            </div>
          ))}
          <div className="sl"><label htmlFor="topk">Photos to keep <span>{k}</span></label><input type="range" id="topk" min="1" max="7" value={k} onChange={(e) => setK(+e.target.value)} /></div>
        </div>
        <div>
          <div className="grid">
            {SAMPLES.map((p, i) => (
              <div key={i} className={`ph ${rank.r[i] < k ? 'keep' : 'drop'}`} style={{ order: rank.r[i], background: `linear-gradient(135deg,hsl(${HUES[i]} 60% ${25 + p[1] * 30}%),hsl(${HUES[i] + 40} 55% ${20 + p[1] * 25}%))` }}>
                <span>#{rank.r[i] + 1} · {Math.round(rank.sc[i])}</span>
              </div>
            ))}
          </div>
          <p style={{ margin: '12px 0 0', color: 'var(--mute)', fontSize: 15 }}>Keeping the top {k} of 8. Outlined photos pass.</p>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <Chapter id="projects" label="Chapter 3 · The work" title="Selected projects"
      sub="The evidence: three systems I designed and built, from a live company-wide CRM to computer vision.">
      <Case feat title="TRAVEN-AI: CRM and performance platform"
        parts={[
          ['The problem', 'A multi-division travel and events company needed one system for leads, workflows and team performance instead of disconnected tools.'],
          ['What I built', 'I architect and develop the platform end to end across the MICE, FIT, Weddings and Events units, used company-wide.'],
          ['Where AI fits', 'I am building AI features into the CRM and extending it with finance, SOP, AI and meeting-scheduling modules.'],
        ]}
        tags={['React', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'Vercel', 'AWS']}>
        <ArchExplorer />
        <div style={{ gridColumn: '1/-1' }}>
          <Tags list={['Lead management', 'Daily, weekly and monthly planner', 'KRA performance dashboards', 'Vendor management', 'Role-based access', 'SOP rule enforcement']} />
        </div>
      </Case>

      <div className="decs">
        <h3 className="dh rv">Engineering decisions behind TRAVEN-AI</h3>
        <div className="dg">{DECISIONS.map(([h, p]) => <div className="card rv" key={h}><h4>{h}</h4><p>{p}</p></div>)}</div>
      </div>

      <Case title="AI Wedding Photo Selector"
        parts={[
          ['The problem', 'Picking the best photos from huge wedding batches was manual and slow.'],
          ['What I built', 'A system that scores every image on blur, brightness, faces and composition, then ranks them so only the best pass through.'],
          ['The result', 'It runs in production and cut manual effort, with a Power BI dashboard tracking performance.'],
        ]}
        tags={['Python', 'OpenCV', 'Scikit-learn', 'Power BI']}>
        <Flow steps={[['Bulk photos in', 'raw batch from an event'], ['Score each image', 'blur · brightness · faces · composition'], ['Rank and filter', 'keep the highest-scoring photos'], ['Track in Power BI', 'performance insights']]} />
        <PhotoRanker />
      </Case>

      <Case title="Sales Data Pipeline and Dashboard"
        parts={[
          ['The problem', 'Sales data needed processing and a reliable way to see KPIs.'],
          ['What I built', 'An ETL pipeline that transforms the data, with automated workflows so it is always available.'],
          ['The result', 'Power BI dashboards that give the team KPIs and sales insights.'],
        ]}
        tags={['Python', 'SQL', 'Pandas', 'Power BI', 'AWS']}>
        <Flow steps={[['Extract', 'sales data from source'], ['Transform', 'clean and reshape with Pandas and SQL'], ['Automate', 'workflows keep data available'], ['Visualise', 'KPI dashboards in Power BI']]} />
      </Case>
    </Chapter>
  );
}

export function Skills() {
  return (
    <Chapter id="skills" label="Chapter 4 · The toolkit" title="Technical expertise"
      sub="What I rely on to deliver, grouped by the part of the system it serves.">
      <div className="skg">
        {SKILLS.map(([title, items]) => (
          <div className="card rv" key={title}>
            <h3>{title}</h3>
            {items.map((s, i) => <span className="sk" key={s} style={{ '--i': i }}>{s}</span>)}
          </div>
        ))}
      </div>
    </Chapter>
  );
}

export function Certs() {
  return (
    <Chapter id="certs" label="Chapter 7 · The credentials" title="Credentials"
      sub="Formal qualifications behind the hands-on experience.">
      <div className="cg">
        {CERTS.map(([seal, name, org]) => (
          <div className="card rv" key={name}><div className="seal">{seal}</div><div><b>{name}</b><span>{org}</span></div></div>
        ))}
      </div>
    </Chapter>
  );
}

export function Contact() {
  const [f, setF] = useState({ n: '', c: '', m: '' });
  const [copied, setCopied] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const send = () => {
    const subject = `Opportunity for Sundhareshwar${f.c ? ` - ${f.c}` : ''}`;
    const body = `${f.m || 'Hello Sundhareshwar,'}\n\nRegards,\n${f.n}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  const copy = async () => { if (await copyEmail()) { setCopied(true); setTimeout(() => setCopied(false), 1800); } };
  return (
    <section id="contact">
      <div className="cta rv">
        <figure className="shot" style={{ margin: 0 }}>
          <img loading="lazy" decoding="async" src="/img/portrait.jpg" alt="Sundhareshwar standing in front of a glass storefront" />
        </figure>
        <div>
          <Idx label="Final chapter · Let us talk" />
          <h2>Let's discuss how I can contribute.</h2>
          <p>I am open to senior AI engineering and solutions architecture roles where I can own system design, from CRM platforms to AI-powered workflows.</p>
          <p className="tg">Open to: Senior AI Engineer · Solutions Architect · Lead Developer on AI-enabled platforms</p>
          <div className="row">
            <a href={`mailto:${EMAIL}?subject=Hello%20Sundhareshwar`}>Email</a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a>
            <button onClick={copy}>{copied ? 'Copied' : 'Copy email'}</button>
          </div>
          <div className="mf">
            <input placeholder="Your name" aria-label="Your name" value={f.n} onChange={set('n')} />
            <input placeholder="Company or role you are hiring for" aria-label="Company or role" value={f.c} onChange={set('c')} />
            <textarea rows="3" placeholder="Message" aria-label="Message" value={f.m} onChange={set('m')} />
            <button className="btn send" onClick={send}>Compose email</button>
          </div>
          <p style={{ marginTop: 16, opacity: 0.8 }}>Bengaluru, India</p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="w" style={{ marginBottom: 8 }}><span>Built with React and Vite. Press Ctrl+K to navigate.</span></div>
      <div className="w">
        <span>© Sundhareshwar · Bengaluru, India</span>
        <span className="fl">
          <a href={`mailto:${EMAIL}`}>Email</a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="#home">Back to top</a>
        </span>
      </div>
    </footer>
  );
}
