# Thushan Jayasundara — Portfolio

A one-page portfolio built with React + Vite. No backend.

## Run it locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Edit content

Everything you see on the page lives in `src/data.js`: profile, stats, experience, projects, skills, education and contact details. Change it there; the components update automatically.

## Update the CV

The "Download CV" buttons serve `public/Thushan_Jayasundara_CV.pdf`. To update it, replace that file with your new PDF and keep the same file name.

## Build

```bash
npm run build
```

The finished site is in `dist/`.

## Deploy (pick one)

- **Vercel**: import the GitHub repo at vercel.com, framework "Vite", click Deploy.
- **Netlify**: build command `npm run build`, publish directory `dist`.
- **GitHub Pages**: run `npm run build`, then push the `dist/` folder to a `gh-pages` branch (or use the `peaceiris/actions-gh-pages` GitHub Action). Paths are relative, so it works under `username.github.io/repo-name`.
