# Claude Working Instructions

## Project
Y2K retro portfolio — interactive OS desktop theme. Figma: https://www.figma.com/design/0HsdMumJ7joRvlpwfK3KTw/Y2K-inspired-Retro-Website-Design

## Dev Setup
```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm build
```

## Key Files
- `src/app/App.tsx` — main desktop, all windows, dock, system bar (1200+ lines, monolithic)
- `src/app/components/ui/` — shadcn/ui (read-only, pre-built)
- `src/styles/` — Tailwind config, theme CSS

## Before Starting
1. Read [DESIGN.md](DESIGN.md) — palette, fonts, retro rules
2. Read [STYLES.md](STYLES.md) — CSS/Tailwind conventions
3. Read [PORTFOLIO.md](PORTFOLIO.md) — portfolio content structure
4. Check [TASKS.md](TASKS.md) for current work

## Work Flow
1. Refactor App.tsx into feature components only when it blocks new work (monolithic by design)
2. New portfolio sections: add to `/src/app/components/portfolio/`
3. Colors/fonts: use theme vars, never hardcode hex
4. Test in browser before commit
5. Commit: scope + what + why. Example: `feat(media-player): add shuffle button, enables quick mixing`

## Testing
- Manual: `pnpm dev`, interact all windows, check responsive (resize to 1024×768)
- No unit tests (add if complexity grows)

## Handoff Notes
- App.tsx fat by design — window logic, state, event handlers. Refactor only when complexity blocks readability/new features.
- Theme colors via inline styles + Tailwind vars. Update one place if palette shifts.
- EQ bars, animations, draggable: all in-component. Extract to hooks only if reused 2+ times.

## Conventions
- Components: PascalCase
- State: `useState`, keep scope tight
- Animations: CSS keyframes in GLOBAL_CSS (top of App.tsx)
- Styling: inline for dynamic, Tailwind for static
- Fonts: PX, MONO, SERIF constants in App.tsx

## References
- [DESIGN.md](DESIGN.md) — color token mappings
- [THEMES.md](THEMES.md) — theme system + CSS vars
- [RETRO_GUIDELINES.md](RETRO_GUIDELINES.md) — Y2K aesthetic rules
- [THEME_MIGRATION.md](THEME_MIGRATION.md) — migrate components to CSS vars
