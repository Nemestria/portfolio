# Claude Working Instructions

## Project
Y2K retro portfolio — interactive OS desktop theme for Alejandro Sancho (3D Artist, env/props for games, graphic/web design). Figma source: https://www.figma.com/design/0HsdMumJ7joRvlpwfK3KTw/Y2K-inspired-Retro-Website-Design

Live: https://portfolio-ashen-sigma-63gx2gi92g.vercel.app
Repo: https://github.com/Nemestria/portfolio (connected to Vercel — push to `master` auto-deploys)

## Dev Setup
```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm build
```

## Key Files
- `src/app/App.tsx` — main desktop, all windows, dock, system bar, SFX engine, palette system (~1850 lines, monolithic)
- `src/app/data/tracks.ts` — music playlist (`public/music/song1.mp3`, `song2.mp3`)
- `src/app/components/ui/` — shadcn/ui (read-only, pre-built)
- `src/styles/` — Tailwind config, base theme CSS (mostly superseded by the in-App.tsx palette system, see below)
- `public/projects/PROJECT_0X/` — real renders + (pending) overview videos per project
- `public/photos/` — PHOTOS window images

## Before Starting
1. Read [DESIGN.md](DESIGN.md) — palette, fonts, retro rules
2. Read [STYLES.md](STYLES.md) — CSS/Tailwind conventions
3. Read [PORTFOLIO.md](PORTFOLIO.md) — actual content structure (file-system metaphor, not the old speculative schema)
4. Check [TASKS.md](TASKS.md) for current work

## Work Flow
1. Refactor App.tsx into feature components only when it blocks new work (monolithic by design)
2. New portfolio sections: add to `/src/app/components/portfolio/` if it grows beyond App.tsx
3. Colors/fonts: use theme vars (`var(--text-primary)` etc.), never hardcode hex — see palette system below
4. Test in browser before commit (preview tools / `pnpm dev`)
5. Commit: scope + what + why. Example: `feat(media-player): add shuffle button, enables quick mixing`

## Palette / Theme System (actual implementation — supersedes old THEMES.md plan)
- `PALETTES` array in App.tsx: 5 palettes — `Y2K` (default), `DUSK`, `FOREST`, `SUNSET`, `MONO`. Each has a `light` and `dark` `PaletteVars` object (hand-tuned, not auto-inverted).
- Applied via `document.documentElement.style.setProperty(k, v)` in a `useEffect` keyed on `[palette, darkMode]` — **not** a `data-theme` attribute, **no** localStorage persistence (resets on reload).
- Dark/Light toggle lives in PREFERENCES window ("Display Mode" section, Sun/Moon buttons) — not a system-bar emoji button.
- `src/styles/themes.css` still defines the original 2-theme (`color`/`mono`) `:root[data-theme]` CSS as a fallback base layer; the in-JS palette system overrides it at runtime via inline `style.setProperty`, which always wins.

## SFX Engine
- Synthesized via Web Audio API (`beep()` helper, square-wave blips) — no audio asset files.
- `playClick()` / `playOpen()` / `playClose()` wired into `CtrlBtn`, `Win` (minimize/close), `Modal`, `toggle()` (icon-driven window open/close).
- Volume controlled by `sfxVolume` state → "Effects Volume" slider in PREFERENCES (separate from Music Volume).

## Window System
- Z-index: single monotonic counter (`zCounterRef` in App) shared by every window, including file-viewer popups spawned inside MY PROJECTS — `getNextZ()` passed down as a prop. Do not reintroduce a separate local z-counter for new sub-windows; always thread `getNextZ`/`focus` through.
- File viewers in MY PROJECTS **stack** (new window per file opened) rather than replacing a single viewer — preserves the vintage multi-window feel.
- All `<button>` elements must resolve a visible `color` in both light and dark mode. A global `button { color: var(--text-primary) }` rule in `GLOBAL_CSS` is the safety net — don't remove it, and don't rely on browser default button color.

## Testing
- Manual: run `pnpm dev`, interact all windows, check responsive (resize to 1024×768), toggle dark mode + each palette
- No unit tests (add if complexity grows)

## Handoff Notes
- App.tsx fat by design — window logic, state, event handlers, SFX, palette data. Refactor only when complexity blocks readability/new features.
- EQ bars, animations, draggable: all in-component. Extract to hooks only if reused 2+ times.

## Conventions
- Components: PascalCase
- State: `useState`, keep scope tight
- Animations: CSS keyframes in `GLOBAL_CSS` (top of App.tsx)
- Styling: inline for dynamic, Tailwind for static layout
- Fonts: `PX`, `MONO`, `SERIF` constants in App.tsx

## References
- [DESIGN.md](DESIGN.md) — color token mappings, typography, palette system
- [THEMES.md](THEMES.md) — actual palette/dark-mode implementation
- [RETRO_GUIDELINES.md](RETRO_GUIDELINES.md) — Y2K aesthetic rules
- [PORTFOLIO.md](PORTFOLIO.md) — actual content structure + what's still placeholder
