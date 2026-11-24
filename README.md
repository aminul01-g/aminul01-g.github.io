# Aminul Islam Bhuiyan Amin – Portfolio & Blog

Welcome to the source code for [Aminul Islam Bhuiyan Amin’s](https://aminul01-g.github.io) personal portfolio and blog!  
This project is a modern, accessible, and highly customizable React-based site to showcase my work, skills, and thoughts in AI, ML, and software engineering.

---

## 🚀 Features

- **Modern UI**: Restrained glass surfaces, typographic hierarchy and a quiet grid
- **Two Themes**: Dark (default) and light, with no flash of the wrong theme on load
- **Accessibility**: Skip link, keyboard navigation, visible focus states, reduced-motion support
- **Responsive Design**: Verified at desktop and 390px mobile with no horizontal overflow
- **Dynamic Content**: Projects, blog posts, skills and achievements
- **SEO Optimized**: Meta tags, Open Graph and structured data aligned with hash routes
- **Performance**: Code splitting, hashed routes and a ~5 MB published artifact

> **Note:** the earlier testimonials, vanity counters and sample demo videos were removed because
> they were unverified/placeholder content. Add them back only with real, attributable material.

---

## 🖥️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Animation**: Framer Motion
- **Routing**: React Router
- **Icons**: React Icons
- **SEO**: React Helmet Async
- **Other**: Custom hooks, lazy loading, and more

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```bash
git clone https://github.com/aminul01-g/aminul01-g.github.io.git
cd aminul01-g.github.io
npm install
# or
yarn install
```

### Running Locally

```bash
npm start
# or
yarn start
```
The app will run at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
# or
yarn build
```

---

## 🛠️ Customization

- **Themes**: Easily switch between Light, Dark, Amoled, Nord, Solarized, and High Contrast modes.
- **Content**: Update your profile, projects, blog posts, and skills in the `/src/data/` directory.
- **Images**: Place your optimized images in `/public/images/optimized/`.

---

## 📁 Project Structure

```
src/
  components/      # Reusable UI components
  data/            # Profile, projects, blog, etc.
  hooks/           # Custom React hooks
  pages/           # Main pages (Home, About, etc.)
  styles/          # Global and theme CSS
  App.tsx          # App entry point
  index.css        # Main CSS (themes, accessibility)
  ...
public/
  images/optimized/  # Profile and project images
```

---

## ♿ Accessibility

- **High Contrast Mode**: For users with visual impairments
- **Keyboard Navigation**: All interactive elements are focusable
- **Screen Reader Support**: Proper ARIA labels and roles
- **Color Contrast**: Carefully tuned for all themes

---

## ✅ Quality checks

```bash
npm run type-check
CI=true npm test
npm run lint        # pre-existing prettier warnings remain in src/data/blog.ts
npm run build
```

All 13 Jest tests pass. Build output is ~5 MB (source maps disabled via `.env`).

---

## 🌐 Deployment (GitHub Pages)

The site is published from the `main` branch by `.github/workflows/deploy.yml`
(GitHub Pages source: **GitHub Actions**). No manual upload is needed.

1. Merge changes into `main` (or push to `main`).
2. The workflow runs `npm ci && npm run build` and uploads `build/` as a Pages artifact.
3. Verify with `gh run list --repo aminul01-g/aminul01-g.github.io` and open
   https://aminul01-g.github.io/.

Routing uses `HashRouter`, so deep links look like `https://aminul01-g.github.io/#/projects`.
Plain paths such as `/about` are not served by GitHub Pages and will 404 — always share hash URLs.

---

## 🙋‍♂️ Author

**Md Aminul Islam Bhuiyan Amin**  
- [Portfolio & Blog](https://aminul01-g.github.io)
- [GitHub](https://github.com/aminul01-g)
- [LinkedIn](https://linkedin.com/in/aminulai)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## ⭐️ Show your support

If you like this project, please consider starring the repo or sharing it!
