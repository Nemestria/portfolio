# Design System — Y2K Retro Portfolio

## Color Palette

### Primary (Navy/Dark Purple — UI chrome & borders)
- **#46425e** — Dark purple (borders, primary text, emphasis)
- **#15788c** — Navy blue (secondary text, inactive states)
- **#f5f5f5** — Off-white background (desktop, windows, light panels)
- **#ffffff** — Pure white (card backgrounds, high contrast areas)
- **#e8e8e8** — Light gray (secondary panels, hover states)

### Accent (Cyan & Coral — highlights, interactions)
- **#00b9be** — Bright cyan (active states, highlights, focus, EQ bars)
- **#ffb0a3** — Salmon (hover states, secondary highlights, warm accent)
- **#ff6973** — Coral red (error, warning, close button, strong action)

### Neutral/Secondary
- **#7a7a7a** — Medium gray (secondary text, disabled states)
- **#999999** — Light gray (tertiary text, placeholders)
- **#1a1a1a** — Near-black (strong text, fallback dark)

### System/Dark Backgrounds
- **#2a2a2a** — Dark charcoal (album art bg, image viewer bg, dark panels)
- **#1a1a1a** — Near-black (deepest backgrounds)

## Color Mapping (Old → New)

For reference if updating existing code:

| Old | New | Use Case |
|-----|-----|----------|
| #1a1212 | #46425e | Borders, text, dark accents |
| #5f8a7e, #709e96 | #15788c | Secondary elements, muted accents |
| #a8c4d4 | #00b9be | Active states, highlights, focus |
| #f7dede, #faf6f0 | #f5f5f5 | Background, window bg |
| #e8e0dc | #e8e8e8 | Hover states, secondary bg |
| #c8c0bc | #15788c | Pressed states (or darken active color) |
| (new) | #ffb0a3 | Hover, soft accents |
| (new) | #ff6973 | Errors, warnings, close buttons |

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

## Theme Toggle (Active ✅)
Two themes available, toggle via system bar button (🎨 ↔ ⚫⚪):

1. **Color** (default) — Navy/cyan/coral palette, vibrant & engaging
2. **Mono** (high-contrast) — #222323 & #f0f6f0, bold & minimal, accessibility-focused

Persistence: Theme choice saved to localStorage, persists on reload.

Implementation: CSS custom properties in `src/styles/themes.css`. Gradual migration to vars in App.tsx (see THEME_MIGRATION.md).

## Accessibility Notes
- High contrast text (#46425e on #f5f5f5 or #ffffff)
- Large clickable areas (26×20px minimum)
- No color-only info (e.g., use text labels + icons)
- Hover states visible (salmon #ffb0a3, cyan #00b9be backgrounds)
- Error states use #ff6973 (red) with text label, not just color
