import { useEffect, useState } from 'react';

/** Fades/slides in every element with class "rv" once it enters the viewport. */
export function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll('.rv')];
    const seen = new Map();
    els.forEach((e) => {
      const n = seen.get(e.parentNode) || 0;
      seen.set(e.parentNode, n + 1);
      const d = Math.min(n, 5) * 70;
      e.style.transitionDelay = `${d}ms,${d}ms,0s,0s,0s`;
    });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        io.unobserve(en.target);
        setTimeout(() => { en.target.style.transitionDelay = ''; }, 1200);
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

/** Tracks the active section and the scroll progress bar, once per animation frame. */
export function useScroll(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    let ticking = false;
    const run = () => {
      ticking = false;
      let cur = ids[0];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 180) cur = id;
      });
      setActive(cur);
      const h = document.documentElement;
      const bar = document.getElementById('prog');
      if (bar) bar.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } };
    addEventListener('scroll', onScroll, { passive: true });
    run();
    return () => removeEventListener('scroll', onScroll);
  }, [ids]);
  return active;
}
