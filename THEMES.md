# Theme System (Actual Implementation)

> Supersedes the original 2-theme (`data-theme` attribute + localStorage) plan. That plan is preserved for history in [THEME_MIGRATION.md](THEME_MIGRATION.md), but was replaced by the system below.

## Overview

5 color palettes, each with a hand-tuned **light** and **dark** variant (10 total color sets):

1. **Y2K** (default) — cyan/coral, navy-purple text
2. **DUSK** — purple
3. **FOREST** — green
4. **SUNSET** — orange/brown
5. **MONO** — strict 2-color duotone (ink ↔ paper inverts between light/dark)

Switched via the **Color Palette** swatches and **Display Mode** (Light/Sun · Dark/Moon) buttons in the PREFERENCES window — not a system-bar toggle, not persisted to localStorage (resets to Y2K + light on reload).

## Implementation

### Data (`App.tsx`)

```tsx
interface PaletteVars { [key: string]: string }
interface Palette { name: string; accent: string; light: PaletteVars; dark: PaletteVars }

const PALETTES: Palette[] = [
  { name: "Y2K", accent: "#00b9be", light: { ... }, dark: { ... } },
  { name: "DUSK", accent: "#9b72cf", light: { ... }, dark: { ... } },
  { name: "FOREST", accent: "#2e8b57", light: { ... }, dark: { ... } },
  { name: "SUNSET", accent: "#e05d2e", light: { ... }, dark: { ... } },
  { name: "MONO", accent: "#222323", light: { ... }, dark: { ... } },
];
```

Dark variants are **not** auto-inverted (no CSS `invert()` filter, no naive lightness flip) — each was manually tuned for contrast and to keep the palette's color identity recognizable.

### Application

```tsx
const [palette, setPalette]   = useState("Y2K");
const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  const p = PALETTES.find(p => p.name === palette);
  if (!p) return;
  const vars = darkMode ? p.dark : p.light;
  Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
}, [palette, darkMode]);
```

Inline `style.setProperty` on `document.documentElement` — always wins over the static `:root[data-theme]` rules in `src/styles/themes.css`, which now only serve as the pre-JS-hydration fallback.

## CSS Variables

```css
--bg-main        /* desktop background */
--bg-window      /* window content background */
--bg-panel       /* secondary panels, toolbars */
--bg-hover       /* hover state */
--bg-active      /* active/selected state, primary accent */
--bg-dark        /* darkest accent (rarely used directly) */

--text-primary   /* main text, borders in some contexts */
--text-secondary /* secondary text, metadata */
--text-tertiary  /* disabled, placeholders, comments */

--color-accent   /* same as bg-active, used for accents */
--color-error    /* errors, close-button hover, FATAL ERROR (note: FATAL ERROR modal uses hardcoded red, not this var — see Caveats) */
--border-color   /* all borders */

--titlebar-bg    /* window titlebar, often a striped gradient */
--titlebar-text  /* window titlebar text */
```

**Critical:** plain `<button>` elements have no explicit `color` by default and will fall back to the Tailwind/shadcn base `--foreground` var (fixed near-black) — invisible against dark panels. `GLOBAL_CSS` in App.tsx sets `button { color: var(--text-primary) }` as a global safety net. Any future button styling should still set its own `color` explicitly when it needs a non-default state (active/highlighted), since inline style always wins over this rule.

## Caveats / Deliberate Exceptions

- **Splash screen** and **FATAL ERROR modal** use hardcoded colors (not theme vars) on purpose — they're meant to look like a system-level event independent of the active palette/theme.
- No localStorage persistence — every reload resets to Y2K + light mode. Add persistence (`localStorage` + init from stored value) if that becomes annoying.

## Adding a New Palette

1. Add an entry to `PALETTES` with `name`, `accent` (swatch preview color), `light`, `dark`.
2. Fill every key from the CSS Variables list above for both variants.
3. No other code changes needed — `PrefsWin` renders the palette list from the array automatically.

## Testing Checklist

- [ ] All windows visible/readable in both light and dark, across all 5 palettes
- [ ] Button text visible (close ×, minimize –, zoom 1×–4×, etc.) — this broke once, see git history `fix(dark-mode)`
- [ ] Hover/press states distinguishable
- [ ] Splash + FATAL ERROR still look correct (they intentionally ignore the palette)
