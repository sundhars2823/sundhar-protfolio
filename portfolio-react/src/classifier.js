/** Tiny in-browser logistic regression with a live decision-boundary canvas. */
export function createClassifier(cv, onStatus) {
  const cx = cv.getContext('2d');
  const dpr = Math.min(devicePixelRatio || 1, 2);
  let pts = [], cls = 0, deg = 1, w = [0, 0, 0], ep = 0, run = false, W = 0, H = 0, prev = 1e9, alive = true, lw = 0;

  const F = (x, y) => (deg === 1 ? [1, x, y] : [1, x, y, x * x, y * y, x * y]);
  const pr = (x, y) => { const f = F(x, y); let z = 0; for (let i = 0; i < f.length; i++) z += w[i] * f[i]; return 1 / (1 + Math.exp(-z)); };

  function draw(L) {
    cx.clearRect(0, 0, W, H);
    const cs = 14;
    if (pts.length >= 2) {
      for (let X = 0; X < W; X += cs) for (let Y = 0; Y < H; Y += cs) {
        const q = pr(((X + cs / 2) / W) * 2 - 1, ((Y + cs / 2) / H) * 2 - 1);
        cx.fillStyle = q > 0.5 ? `rgba(79,124,255,${0.08 + (q - 0.5) * 0.5})` : `rgba(232,96,44,${0.08 + (0.5 - q) * 0.5})`;
        cx.fillRect(X, Y, cs, cs);
      }
    }
    pts.forEach((p) => {
      cx.beginPath(); cx.arc(((p.x + 1) / 2) * W, ((p.y + 1) / 2) * H, 6, 0, 6.3);
      cx.fillStyle = p.c ? '#4f7cff' : '#e8602c'; cx.fill();
      cx.lineWidth = 2; cx.strokeStyle = '#fff'; cx.stroke();
    });
    const acc = pts.length ? pts.filter((p) => (pr(p.x, p.y) > 0.5) === !!p.c).length / pts.length : 0;
    onStatus(pts.length < 2 ? 'Add at least two points' : `Epoch ${ep} · loss ${L === undefined ? '-' : L.toFixed(3)} · accuracy ${Math.round(acc * 100)}%`);
  }
  function size() {
    const r = cv.getBoundingClientRect();
    W = r.width; H = r.height;
    cv.width = W * dpr; cv.height = H * dpr;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }
  function tick() {
    if (!alive) return;
    if (pts.length < 2) { run = false; draw(); return; }
    const n = pts.length; let L = 0;
    for (let s = 0; s < 25; s++) {
      const g = w.map(() => 0); L = 0;
      pts.forEach((p) => {
        const f = F(p.x, p.y), q = pr(p.x, p.y), e = q - p.c;
        for (let i = 0; i < f.length; i++) g[i] += (e * f[i]) / n;
        L -= Math.log((p.c ? q : 1 - q) + 1e-9) / n;
      });
      for (let i = 0; i < w.length; i++) w[i] -= 1.2 * g[i];
      ep++;
    }
    draw(L);
    if (Math.abs(prev - L) < 1e-6 || ep > 1500) run = false; else { prev = L; requestAnimationFrame(tick); }
  }
  const go = () => { prev = 1e9; ep = 0; if (!run) { run = true; requestAnimationFrame(tick); } };
  const kick = () => { w = F(0, 0).map(() => 0); go(); };
  const r3 = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

  function gen(t) {
    pts = [];
    for (let i = 0; i < 24 && t; i++) {
      if (t === 1) {
        pts.push({ x: -0.45 + r3() * 0.35, y: -0.2 + r3() * 0.35, c: 0 });
        pts.push({ x: 0.45 + r3() * 0.35, y: 0.2 + r3() * 0.35, c: 1 });
      } else {
        const a = Math.random() * 6.28, rd = 0.7 + Math.random() * 0.15;
        pts.push({ x: Math.cos(a) * rd * 0.9, y: Math.sin(a) * rd, c: 0 });
        pts.push({ x: r3() * 0.3, y: r3() * 0.3, c: 1 });
      }
    }
    deg = t === 2 ? 2 : 1;
    kick();
    return deg;
  }
  const onClick = (e) => {
    const r = cv.getBoundingClientRect();
    pts.push({ x: ((e.clientX - r.left) / r.width) * 2 - 1, y: ((e.clientY - r.top) / r.height) * 2 - 1, c: cls });
    go();
  };
  const onResize = () => { const nw = cv.getBoundingClientRect().width; if (Math.abs(nw - lw) > 2) { lw = nw; size(); } };
  cv.addEventListener('click', onClick);
  addEventListener('resize', onResize);
  size(); lw = W; gen(1);

  return {
    setClass: (c) => { cls = c; },
    setModel: (d) => { deg = d; kick(); },
    gen,
    destroy() { alive = false; cv.removeEventListener('click', onClick); removeEventListener('resize', onResize); },
  };
}
