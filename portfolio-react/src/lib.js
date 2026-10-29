export const EMAIL = 'sundhars2823@gmail.com';
export const PHONE = '+91 75581 54541';
export const LINKEDIN = 'https://www.linkedin.com/in/sundhars2823';
export const GITHUB = 'https://github.com/sundhars2823';

export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const goTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
export const openExt = (u) => window.open(u, '_blank', 'noopener');
export const mailTo = () => { window.location.href = `mailto:${EMAIL}`; };
export const copyEmail = async () => {
  try { await navigator.clipboard.writeText(EMAIL); return true; } catch { return false; }
};
export function toggleTheme() {
  const r = document.documentElement;
  const dark = r.dataset.theme ? r.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  r.dataset.theme = dark ? 'light' : 'dark';
}
