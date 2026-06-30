# Portfolio Development Tasks

> Old phase plan (data schemas, BPM-as-proficiency, etc.) didn't match what got built — see [PORTFOLIO.md](PORTFOLIO.md) for the real architecture. This file now tracks actual status.

## Done ✅

**Foundation & desktop shell**
- React + Vite + Tailwind + shadcn/ui
- Y2K desktop UI: draggable windows, dock, system bar, real-time clock
- Global z-index unified into one monotonic counter shared by every window, including file-viewer popups (was previously a separate, buggy local counter — fixed)
- Splash/boot screen: loading bar → "enable sound + enter" or "enter without sound" choice, gates autoplay
- Synthesized retro SFX (Web Audio API beeps, no audio files) for open/close/click, with an Effects Volume slider in PREFERENCES (separate from Music Volume)

**Theming**
- 5 color palettes (Y2K default, DUSK, FOREST, SUNSET, MONO), each with hand-tuned light + dark variants
- Light/Dark toggle in PREFERENCES (not a system-bar button, not persisted — see [THEMES.md](THEMES.md))
- Fixed: button text invisible in dark mode (global `button { color: var(--text-primary) }` safety net)
- Background pattern picker (flat/grid/dots/scanlines, default dots) + procedural animated SVG generator (BG GEN app: plasma/mesh/noise/poly/waves/dots)

**MY PROJECTS (file browser)**
- Folder navigation, fake file-system metaphor
- File viewers (image/video/txt) now **stack** as separate windows instead of replacing a single viewer
- Image zoom 1×–4× that resizes the window/container itself (not just internal scroll)
- 3 real projects wired in with real renders, descriptions, tools, years (see [PORTFOLIO.md](PORTFOLIO.md) for details)
- PDF viewer replaced with video viewer per request — `OVERVIEW.MP4` slots exist, **files not uploaded yet**

**Other apps**
- MUSIC: real 2-track playlist, EQ visualizer, drag-and-drop local files
- PHOTOS: real photos (2 of 3 uploaded files wired in), zoom 1×–4× with window resize
- ABOUT (desktop): real bio + Wittgenstein quote in retro notepad styling
- BLOG: new app, fake browser chrome, placeholder posts
- FATAL ERROR easter egg: nags visitors who haven't opened MY PROJECTS after 40s; DEBUG button in system bar to trigger manually

**Metadata & deploy**
- Real `<title>`, description, OG/Twitter tags, favicon
- GitHub repo (`Nemestria/portfolio`) + Vercel, linked for auto-deploy on push to `master`

## Remaining — Content Gaps

- [ ] `OVERVIEW.MP4` — record/export and drop into `public/projects/PROJECT_0{1,2,3}/`, update `src` in `PROJECTS` data in App.tsx
- [ ] Music track names — currently generic "SONG 01"/"SONG 02" in `src/app/data/tracks.ts`, need real titles/artists
- [ ] AboutWin (dock card) bio — still original placeholder text ("Crafting worlds between pixels and polygons...") vs. the real bio already written for the desktop NotesWin. Reconcile or intentionally keep them different.
- [ ] NotesWin "here you will find:" list — only has one bullet ("my portfolio"), confirm with Alejandro if more items are wanted
- [ ] BLOG posts — 3 placeholders, need real titles/excerpts, confirm intended URL (currently shows `http://asancho.dev/blog`)
- [ ] `public/photos/003-screenshot.png` — uploaded but unwired, looks like an accidental file (literal screenshot filename); confirm intent
- [ ] PROJECT folder names — currently `PROJECT_01/02/03`, confirmed OK to keep as-is per Alejandro

## Remaining — Possible Future Work
- [ ] localStorage persistence for palette/dark-mode/volume choices (currently resets every reload)
- [ ] Project filtering or additional projects beyond the current 3
- [ ] Testimonials/recommendations window
- [ ] Keyboard shortcuts
- [ ] Mobile/narrow-viewport layout pass (currently desktop-first, ~1024×768 target)

## Notes
- App.tsx is ~1850 lines, monolithic by design — refactor only when it blocks new work
- No unit tests — manual testing via `pnpm dev` + preview tools
