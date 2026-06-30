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
- MUSIC: real 4-track playlist, EQ visualizer, drag-and-drop local files
- PHOTOS: 3 real photos, all wired in, zoom 1×–4× with window resize
- ABOUT (desktop): real bio + Wittgenstein quote in retro notepad styling
- BLOG: long-form post model (paragraph + inline-image blocks), browser-chrome window; post #1 is real content
- FATAL ERROR easter egg: nags visitors who haven't opened MY PROJECTS after 40s; DEBUG button in system bar to trigger manually

**Bilingual (ES/EN)**
- Full i18n system (`src/app/data/i18n.ts`, `LanguageContext`/`useLang()`), Spanish default, English secondary
- Language picked on splash screen, switchable via system-bar ES/EN toggle
- All UI chrome translated both ways; open file viewers re-resolve content live on language switch
- Video viewer supports YouTube embeds (`youtube-nocookie.com`) as an alternative to uploaded `.mp4`

**Metadata & deploy**
- Real `<title>`, description, OG/Twitter tags, favicon
- GitHub repo (`Nemestria/portfolio`) + Vercel, linked for auto-deploy on push to `master`

**Workflow**
- Standing auto-wire: new files dropped into `public/music/`, `public/photos/`, `public/projects/PROJECT_0X/` get wired into their data structures proactively, no need to ask each time

## Remaining — Content Gaps (what's left to call the site "done")

- [ ] `OVERVIEW.MP4` or YouTube ID — for all 3 projects, drop file into `public/projects/PROJECT_0{1,2,3}/` (or send YouTube links to wire `youtubeId`)
- [ ] Music track names — currently generic "SONG 01"–"SONG 04" in `src/app/data/tracks.ts`, need real titles/artists
- [ ] AboutWin (dock card) bio — still original placeholder text vs. the real bio already written for the desktop NotesWin. Reconcile or intentionally keep them different.
- [ ] NotesWin "here you will find:" list — only has one bullet ("my portfolio"), confirm with Alejandro if more items are wanted
- [ ] BLOG post #1 — image placeholder pending a desktop screenshot
- [ ] BLOG posts #2/#3 — still single-paragraph stubs, need real content
- [ ] **Spanish copy in his own voice** — `notes.lines`, `projectContent.project01/02/03`, `blog.posts[*]` are currently Claude's draft translations; Alejandro to rewrite/approve
- [ ] PROJECT folder names — currently `PROJECT_01/02/03`, confirmed OK to keep as-is per Alejandro

## Remaining — Possible Future Work
- [ ] localStorage persistence for palette/dark-mode/volume/language choices (currently resets every reload)
- [ ] Project filtering or additional projects beyond the current 3
- [ ] Testimonials/recommendations window
- [ ] Keyboard shortcuts
- [ ] Mobile/narrow-viewport layout pass (currently desktop-first, ~1024×768 target)

## Checkpoints to Call the Site Complete

1. **Content lock** — all items in "Remaining — Content Gaps" above resolved (videos, track names, bios reconciled, all 3 blog posts real, Spanish in Alejandro's own voice)
2. **Pass** — full manual click-through in both languages (`pnpm dev` or preview tools): every window, every palette × light/dark, splash → desktop flow, FATAL ERROR trigger
3. **Responsive check** — resize to ~1024×768 and a couple of common viewports; decide if a mobile pass (see Future Work) is needed before launch or after
4. **Final deploy** — confirm live Vercel URL matches `master`, no console errors, OG/share preview looks right
5. **Optional:** connect `3d-gateway` entry point once that project reaches its own Checkpoint 5 (see `../3d-gateway/CHECKPOINTS.md`) — out of scope for this repo until then

## Notes
- App.tsx is ~1900+ lines, monolithic by design — refactor only when it blocks new work
- No unit tests — manual testing via `pnpm dev` + preview tools
