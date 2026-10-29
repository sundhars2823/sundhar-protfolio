# Sundhareshwar | Portfolio

React + Vite single-page portfolio. No UI libraries; all animation is hand-written CSS and canvas.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

## Build
```bash
npm run build      # outputs to dist/
npm run preview
```

## Deploy (Vercel, free)
1. Push this folder to a GitHub repository.
2. On vercel.com choose **Add New > Project**, import the repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output directory `dist`.
4. Click **Deploy**. Add a custom domain under **Settings > Domains** if you have one.

(Netlify works the same way: build `npm run build`, publish directory `dist`.)

## Edit the content
- All text, skills, projects and bot answers: `src/data.js`
- Contact links: `src/lib.js`
- Photos: replace the files in `public/img/` (`hero.jpg`, `about.jpg`, `portrait.jpg`)
- Styles and colours (CSS variables at the top): `src/styles.css`

## Structure
```
src/
  App.jsx                  page layout and Ctrl+K shortcut
  data.js                  all content
  hooks.js                 scroll reveal and scroll-spy
  network.js               hero node-network canvas
  classifier.js            in-browser logistic regression (ML Lab)
  components/
    Header.jsx  Hero.jsx  Sections.jsx  Labs.jsx  Overlays.jsx
```
