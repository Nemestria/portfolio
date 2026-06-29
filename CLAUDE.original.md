# Claude Working Instructions

## Project
Y2K retro portfolio — interactive OS desktop theme. Figma source: https://www.figma.com/design/0HsdMumJ7joRvlpwfK3KTw/Y2K-inspired-Retro-Website-Design

## Dev Setup
```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm build
```

## Key Files
- `src/app/App.tsx` — Main desktop, all windows, dock, system bar (1200+ lines, monolithic)
- `src/app/components/ui/` — shadcn/ui library (read-only, pre-built)
- `src/styles/` — Tailwind config, theme CSS

## Before Starting
1. Read [DESIGN.md](DESIGN.md) — palette, fonts, retro rules
2. Read [STYLES.md](STYLES.md) — CSS/Tailwind conventions
3. Read [PORTFOLIO.md](PORTFOLIO.md) — portfolio content structure
4. Check [TASKS.md](TASKS.md) for current work

## Work Flow
1. Refactor App.tsx into feature components only when it blocks new work (it's monolithic by design now)
2. New portfolio sections: add to `/src/app/components/portfolio/` (create as needed)
3. All colors/fonts: use theme vars, never hardcode hex
4. Test in browser before committing
5. Commit message: scope + what + why. Example: `feat(media-player): add shuffle button, enables quick mixing`

## Testing
- Manual: run `pnpm dev`, interact with all windows, check responsive (resize to 1024×768 for retro feel)
- No unit tests yet (add if component complexity grows)

## Handoff Notes
- App.tsx is fat by design — contains all window logic, state, event handlers. Refactor only when complexity genuinely blocks readability or new features.
- Theme colors injected via inline styles + Tailwind vars. Update in one place if palette shifts.
- EQ bars, animations, draggable state: all in-component. Extract to custom hooks only if reused 2+ times.

## Conventions
- Components: PascalCase
- State hooks: use `useState`, keep scope tight
- Animations: CSS keyframes in GLOBAL_CSS (top of App.tsx)
- Styling: inline styles for complex/dynamic, Tailwind classes for static
- Fonts: Use PX, MONO, SERIF constants defined in App.tsx

## References
- See [DESIGN.md](DESIGN.md) for color token mappings
- See [THEMES.md](THEMES.md) for theme system + CSS variables
- See [RETRO_GUIDELINES.md](RETRO_GUIDELINES.md) for Y2K aesthetic rules
- See [THEME_MIGRATION.md](THEME_MIGRATION.md) for how to migrate components to CSS vars
