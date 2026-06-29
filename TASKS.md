# Portfolio Development Tasks

## Phase 1: Foundation (In Progress)
- [x] Set up React + Vite + Tailwind + shadcn/ui
- [x] Build Y2K desktop UI (windows, dock, draggable interface)
- [ ] Create CLAUDE.md, DESIGN.md, STYLES.md, PORTFOLIO.md, RETRO_GUIDELINES.md
- [ ] Define data structures (projects, skills, experiences)

## Phase 2: Content Population (Next)
- [ ] Create `src/app/data/projects.ts` with your 5-10 best projects
- [ ] Create `src/app/data/skills.ts` with your skill list
- [ ] Create `src/app/data/experiences.ts` with work history
- [ ] Gather/prepare project images (hero, screenshots)
- [ ] Write project descriptions (50–150 words each)
- [ ] Test data loads in UI (no errors, layout holds)

## Phase 3: Portfolio Windows (Core Features)
- [ ] **Media Player → Featured Projects**
  - Replace fake tracks with real projects
  - Click project → show details (description, link, skills)
  - Album art → project hero image
  - Add "next/prev" for browsing

- [ ] **Photo Viewer → Gallery**
  - Replace photos with project screenshots
  - Metadata → project name, date, tools
  - Add lightbox view (expand on click)

- [ ] **Playlist → Skills**
  - Replace tracks with skills (category, proficiency)
  - BPM → skill proficiency (80–120)
  - Filter by category (frontend, design, tools)

- [ ] **Notes → About Section**
  - Write bio (3–5 paragraphs)
  - Add "quick stats" (years exp, projects built)
  - Include personal interests / approach
  - Contact info at bottom

- [ ] **System Info → Resume/Experience**
  - Experience timeline (company, title, years)
  - Education / certifications
  - Achievements / highlights
  - Download resume button (PDF link)

## Phase 4: Interactivity & Polish
- [ ] Window state: open/close persists (localStorage)
- [ ] Project links: click → open in new tab (GitHub, live demo, Figma)
- [ ] Contact form: email form or link (formspree / mailto)
- [ ] Dock icons: functional (open windows on click)
- [ ] Desktop icons: links to main sections
- [ ] Scrollable content in windows (if content > window height)
- [ ] Loading states (placeholder images while loading)

## Phase 5: Optimization & Deployment
- [ ] Image optimization (compress, webp format)
- [ ] Code splitting (separate portfolio data)
- [ ] Build & test production build locally
- [ ] Set up domain / hosting (Vercel, Netlify, GitHub Pages)
- [ ] Add meta tags (title, description, og:image for sharing)
- [ ] Analytics setup (optional: Plausible or PostHog)
- [ ] Deploy to staging, test on mobile/tablet
- [ ] Go live on main domain

## Phase 6: Future Enhancements
- [ ] Dark mode toggle (DESIGN.md foundation ready)
- [ ] Project filtering (by skill, year, status)
- [ ] Blog/articles section (markdown posts)
- [ ] Testimonials/recommendations window
- [ ] Easter eggs (hidden commands, retro games)
- [ ] Internationalization (i18n)
- [ ] Video demos for projects (embedded)
- [ ] Project detail modal (expand from list)

## Current Blockers / Notes
- App.tsx is monolithic (1200+ lines) — OK for now; refactor if adding 5+ new windows
- Need real portfolio data before Phase 3 starts
- Image hosting: use Unsplash placeholders now, replace with real images later
- Contact flow: decide on tool (formspree, Netlify forms, own API)

## Quick Wins (If blocked elsewhere)
- Add more desktop icons (currently 4, could add: Blog, Contact, Resume)
- Improve window shadows / styling (optional visual polish)
- Add keyboard shortcuts (arrows to navigate, enter to open)
- Implement system clock (real-time, not hardcoded)
- Add sound effects (optional, mute button)

## Definition of Done

Each window is "done" when:
1. Displays real portfolio data (not fake placeholder)
2. Interactions work (click, scroll, navigate)
3. Responsive (fits 1024×768, but works at any size)
4. Matches retro aesthetic (fonts, colors, borders per DESIGN.md)
5. Tested in Chrome, Firefox, Safari
6. No console errors or warnings
7. Performance: loads in <2s, smooth 60fps animations

## Timeline (Estimates)

| Phase | Tasks | Estimate |
|-------|-------|----------|
| 1 | Foundation docs | 1–2h |
| 2 | Data gathering & prep | 2–3h |
| 3 | Portfolio windows (each ~2h) | 8–10h |
| 4 | Polish & interaction | 3–5h |
| 5 | Deploy & optimize | 2–3h |
| **Total** | **Foundation → Live** | **18–25h** |

Adjust based on scope (5 vs. 10 projects, simple vs. complex interactions).
