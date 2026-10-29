/** Drifting node network drawn on the hero canvas. Returns a cleanup function. */
export function startNetwork(c, hero, rm) {
  const x = c.getContext('2d');
  const dpr = Math.min(devicePixelRatio || 1, 2);
  let N = [], W = 0, H = 0, mx = -999, my = -999, on = true, vis = true, inv = true, raf = 0, t;

  function size() {
    const r = c.getBoundingClientRect();
    W = r.width; H = r.height;
    c.width = W * dpr; c.height = H * dpr;
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    let n = Math.min(55, Math.round((W * H) / 26000));
    if ((navigator.connection && navigator.connection.saveData) || (navigator.hardwareConcurrency || 8) < 4) n = Math.round(n / 2);
    N = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 }));
  }
  const line = (a, b, d, m, al) => {
    x.strokeStyle = `rgba(255,176,128,${(1 - d / m) * al})`;
    x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke();
  };
  function step() {
    x.clearRect(0, 0, W, H);
    for (let i = 0; i < N.length; i++) {
      const p = N[i];
      if (!rm) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      for (let j = i + 1; j < N.length; j++) {
        const q = N[j], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 130) line(p, q, d, 130, 0.45);
      }
      const dm = Math.hypot(p.x - mx, p.y - my);
      if (dm < 170) line(p, { x: mx, y: my }, dm, 170, 0.9);
      x.fillStyle = 'rgba(255,205,170,.9)';
      x.beginPath(); x.arc(p.x, p.y, 1.8, 0, 6.3); x.fill();
    }
    if (!rm && on) raf = requestAnimationFrame(step);
  }
  const upd = () => {
    const want = vis && inv;
    if (want && !on && !rm) { on = true; step(); }
    on = want;
  };
  const onResize = () => {
    clearTimeout(t);
    t = setTimeout(() => {
      if (Math.abs(c.getBoundingClientRect().width - W) > 2) { size(); if (rm) step(); }
    }, 200);
  };
  const onMove = (e) => { const r = hero.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
  const onLeave = () => { mx = my = -999; };
  const onVis = () => { vis = !document.hidden; upd(); };
  const io = new IntersectionObserver((e) => { inv = e[0].isIntersecting; upd(); });

  size(); step();
  io.observe(hero);
  addEventListener('resize', onResize);
  hero.addEventListener('mousemove', onMove);
  hero.addEventListener('mouseleave', onLeave);
  document.addEventListener('visibilitychange', onVis);
  return () => {
    on = false; cancelAnimationFrame(raf); clearTimeout(t); io.disconnect();
    removeEventListener('resize', onResize);
    hero.removeEventListener('mousemove', onMove);
    hero.removeEventListener('mouseleave', onLeave);
    document.removeEventListener('visibilitychange', onVis);
  };
}
