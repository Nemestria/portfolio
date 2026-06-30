# Design System — Y2K Retro Portfolio

## Color Palette

**The site ships 5 selectable palettes, each with a light and dark variant — see [THEMES.md](THEMES.md) for the full system and implementation.** The values below are the **Y2K palette's light variant** (the default on load) — useful as the reference palette when designing new UI, since all new components should use CSS vars (`var(--bg-window)` etc.) rather than these hex values directly.

### Primary (Navy/Dark Purple — UI chrome & borders)
- **#46425e** — Dark purple (`--text-primary`, `--border-color`)
- **#15788c** — Navy blue (`--text-secondary`)
- **#f5f5f5** — Off-white background (`--bg-main`)
- **#ffffff** — Pure white (`--bg-window`)
- **#e8e8e8** — Light gray (`--bg-panel`)

### Accent (Cyan & Coral — highlights, interactions)
- **#00b9be** — Bright cyan (`--bg-active`, `--color-accent` — active states, highlights, focus, EQ bars)
- **#ffb0a3** — Salmon (`--bg-hover`)
- **#ff6973** — Coral red (`--color-error`)

### Other Palettes (quick reference, light variant accent only)
- **DUSK** — `#9b72cf` (purple)
- **FOREST** — `#2e8b57` (green)
- **SUNSET** — `#e05d2e` (orange)
- **MONO** — `#222323` (strict duotone, ink/paper inverts in dark mode)

Each palette's full light + dark color sets live in the `PALETTES` array in `App.tsx`. Dark variants are hand-tuned per palette, not auto-inverted.

## Typography

### Fonts
Three font families (defined as constants in App.tsx):
```
PX:    'Press Start 2P', monospace   (bitmap, arcade-style labels)
MONO:  'Share Tech Mono', monospace  (code/metadata display)
SERIF: 'IM Fell English', Georgia, serif (decorative desktop label)
```

### Sizes & Usage
| Size | Context |
|------|---------|
| 5-6px | Dock labels, small buttons, status bar |
| 6-7px | Menu items, window titles, tab labels |
| 7-9px | Button text, metadata, playlist items |
| 9-11px | Body text, notes content |
| 11px | Desktop "Desktop" label (decorative) |

### Line Height
- Compact: 1.0 (control labels)
- Normal: 1.5 (UI text)
- Loose: 1.8 (readable body text)

## Spacing

Grid: 4px base unit (not strict, visual alignment preferred)
- Padding: 6px, 8px, 10px (inline); 4px, 6px, 8px (vertical)
- Gap: 4px (tight), 6px (normal), 10px (loose)
- Border: 1px solid #46425e (dark purple)

## Borders & Shadows

**Borders:** All UI elements use crisp 1px solid #46425e (dark purple)

**Shadows:** None for retro flat look. Instead:
- Pressed buttons: `inset 1px 1px 0 rgba(0,0,0,0.2)` + slight translateY down
- No drop shadows on windows (flat stacking)

## Windows (Chrome)

**Title Bar:**
- Height: 22px
- Background: Repeating gradient `90deg, #15788c 0px, #15788c 1px, #1a5a70 1px, #1a5a70 2px` (striped navy)
- Text: White, Press Start 2P 7px, uppercase
- Buttons (min/close): 13×13px, #e8e8e8, #46425e borders

**Content:**
- Background: #ffffff (white)
- Border: 1px #46425e (dark purple)
- Padding: 6-8px

**Status Bar:**
- Height: 10px
- Background: #e8e8e8
- Text: Press Start 2P 6px, #15788c, uppercase
- Padding: 2px 8px

## Buttons

**States:**
- Default: bg #e8e8e8, border 1px #46425e
- Hover: bg #ffb0a3 (salmon)
- Pressed: bg #00b9be (cyan), inset shadow, +1px translateY
- Active: bg #00b9be (cyan highlight)

**Sizes:**
- Small: 13×13px (window close/min)
- Medium: 26-28px × 20-22px (playback controls)
- Large: 56px × 18px (prev/next in photo viewer)

## Inputs (Range Sliders)

**Track:** #e8e8e8 bg, 1px #46425e border, 4px height
**Thumb:** 10px × 14px, #ffffff bg, 1px #46425e border, ew-resize cursor

## Special Effects

**Animations:**
- `eq-pulse`: 0.55s–0.95s durations (randomized), 8% → 94% height, using #00b9be (cyan)
- `marquee-scroll`: 10s linear infinite, text scrolls left
- `led-blink`: 2s ease-in-out, opacity 1 → 0.2 (status indicator, use #00b9be)
- `scanline`: CRT effect overlay (optional, on album art)

**Scanline Overlay:**
```css
repeating-linear-gradient(
  0deg,
  transparent,
  transparent 3px,
  rgba(70, 66, 94, 0.07) 3px,
  rgba(70, 66, 94, 0.07) 4px
)
```

**Noise Texture:**
SVG fractal noise at 0.038 opacity, 140px scale (global overlay, subtle)

## Responsive

Target: 1024×768 (Y2K standard), but flexible to browser viewport
- Desktop canvas: `top: 20px (system bar), bottom: 58px (dock), left/right: 0`
- Desktop bg: #f5f5f5 (off-white)
- Windows: positioned absolute (draggable)
- No media queries (retro desktop doesn't shrink; scroll if needed)

## Palette + Dark Mode (Active ✅)
5 palettes (Y2K default, DUSK, FOREST, SUNSET, MONO) × light/dark — toggled inside the **PREFERENCES** window, not the system bar:
- "Display Mode" section: Light (Sun) / Dark (Moon) buttons
- "Color Palette" section: 5 swatches

No localStorage persistence — resets to Y2K + light on every reload (not yet implemented, see TASKS.md).

Implementation: `PALETTES` array in `App.tsx`, applied via `document.documentElement.style.setProperty()` in a `useEffect`. `src/styles/themes.css` still exists as a static pre-hydration fallback but the in-JS system always overrides it. Full detail in [THEMES.md](THEMES.md).

## Accessibility Notes
- High contrast text (`--text-primary` on `--bg-main`/`--bg-window`)
- Large clickable areas (26×20px minimum)
- No color-only info (e.g., use text labels + icons)
- Hover states visible (`--bg-hover`, `--bg-active` backgrounds)
- Error states use `--color-error` with text label, not just color
- **Every `<button>` must resolve a visible `color` in all 10 palette/mode combinations.** A global `button { color: var(--text-primary) }` rule covers the default case, but custom-colored buttons (active states, etc.) should set `color` explicitly per state — don't assume the browser default is visible, it broke silently in dark mode once already.
