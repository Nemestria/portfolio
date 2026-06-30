# Theme System Migration Guide (Historical)

> **Status: superseded.** This doc described the original plan (2 themes, `data-theme` attribute, localStorage persistence, gradual hardcoded-hex → CSS-var migration). The migration described here is **complete** — App.tsx is fully on CSS vars — but the final system differs from this plan (5 palettes × light/dark, no localStorage, switched in PREFERENCES not the system bar). See [THEMES.md](THEMES.md) for the actual current implementation.
>
> Kept for history / reasoning behind the CSS variable names, which are still accurate.

## What actually happened

- All inline colors in App.tsx migrated to `var(--*)` CSS custom properties — no hardcoded hex remains in component styles (verify with `grep -n '#[0-9a-fA-F]\{3,6\}' src/app/App.tsx` if auditing; the only legitimate hits should be inside `PALETTES` data itself and the intentionally-hardcoded splash/FATAL ERROR screens).
- The flat 2-theme plan grew into 5 palettes × light/dark (10 color sets) — see [THEMES.md](THEMES.md).
- Persistence (localStorage) was never implemented — theme/palette resets on reload.

## CSS Variable Reference (still accurate)

### Backgrounds
- `--bg-main` — Primary/desktop background
- `--bg-window` — Window/card content background
- `--bg-panel` — Secondary panels, lighter areas
- `--bg-hover` — Hover state background
- `--bg-active` — Active/selected state background

### Text
- `--text-primary` — Main text, headers, strong text
- `--text-secondary` — Secondary text, labels, metadata
- `--text-tertiary` — Disabled text, placeholders, comments

### Accent
- `--color-accent` — Highlights, focus states, active accents
- `--color-error` — Errors, warnings, delete buttons
- `--border-color` — Borders everywhere

## Pitfalls discovered during the real migration

❌ **Don't leave any element without an explicit color in dark contexts.** Plain `<button>` elements with no inline `color` fell back to the shadcn base `--foreground` (fixed near-black) and went invisible in dark mode — close buttons, zoom buttons, etc. Fixed with a global `button { color: var(--text-primary) }` rule in `GLOBAL_CSS`. Watch for this pattern with any other bare element types.

❌ **Don't mix hardcoded + CSS vars** within one component (confusing to maintain) — except the splash screen and FATAL ERROR modal, which intentionally stay hardcoded so they look theme-independent.

✅ **Use existing variables, or add a new key to every `PALETTES` entry** (light + dark) rather than inventing a one-off color.
