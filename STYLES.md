# Styling Conventions

## CSS Approach

**Primary:** Inline `React.CSSProperties` for dynamic/positioned elements
**Secondary:** Tailwind classes for static layout (margins, flex)
**Animations:** CSS keyframes in GLOBAL_CSS (top of App.tsx)

Rationale: Retro aesthetic needs pixel-perfect control; Tailwind handles spacing/layout. Avoid complex CSS-in-JS for performance.

## Color Usage

**NEVER hardcode hex colors.** This migration is now complete — App.tsx uses CSS vars exclusively (see [THEMES.md](THEMES.md)). Always reference theme vars:
```tsx
// ❌ Wrong
style={{ background: "#e8e8e8" }}

// ✅ Right
style={{ background: "var(--bg-panel)" }}
```

**Deliberate exceptions** (don't theme these — see THEMES.md "Caveats"): the splash screen and the FATAL ERROR modal use hardcoded colors on purpose, so they read as theme-independent system events.

For new sections/components:
1. Check the CSS Variables list in [THEMES.md](THEMES.md) for the right var
2. If you need a genuinely new color, add it to **every** entry (light + dark) in the `PALETTES` array in App.tsx, not just one
3. Remember: plain `<button>` elements need an explicit `color` for non-default states — the global `button { color: var(--text-primary) }` rule only covers the default case

## Font Sizes

Use defined constants:
```tsx
const PX = { fontFamily: "'Press Start 2P', monospace" };
const MONO = { fontFamily: "'Share Tech Mono', monospace" };
const SERIF = { fontFamily: "'IM Fell English', Georgia, serif" };

// Apply
style={{ ...PX, fontSize: 7, color: "var(--text-primary)" }}
```

**Size mapping:**
- 5-6px: Labels, status text
- 7px: Menu items, titles
- 8-9px: Body text
- 9-11px: Larger text, metadata

## Spacing

**Margin:** Use Tailwind classes (`m-2`, `my-4`, etc.) for layout flow
**Padding:** Inline styles for component internals (`padding: "6px 8px"`)
**Gap:** Inline `gap: 6` for flex containers

```tsx
// Layout wrapper — Tailwind
<div className="flex gap-4 p-6">

// Internal spacing — inline
<div style={{ padding: "6px 8px", display: "flex", gap: 6 }}>
```

## Borders

All interactive elements: `border: "1px solid var(--border-color)"`

```tsx
// ✅ Consistent
style={{
  border: "1px solid var(--border-color)",
  borderBottom: "1px solid var(--border-color)",
  borderTop: "1px solid var(--border-color)",
}}
```

## Button Styling

**Template** (this is the real `CtrlBtn` component in App.tsx):
```tsx
<button
  onClick={() => { playClick(); onClick?.(); }}   // SFX — see below
  style={{
    width: 28, height: 22,
    background: down ? "var(--bg-active)" : "var(--bg-panel)",
    color: down ? "var(--bg-window)" : "var(--text-primary)",   // explicit color, see Color Usage
    border: "1px solid var(--border-color)",
    cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: down ? "inset 1px 1px 0 rgba(0,0,0,0.25)" : "none",
    transform: down ? "translateY(1px)" : "none",
    transition: "background 0.05s, transform 0.05s",
    flexShrink: 0,
  }}
>
  {children}
</button>
```

Key points:
- Always include `flexShrink: 0` (prevent squishing)
- Pressed/active: brighter bg (`--bg-active`) + inset shadow + translateY(1px)
- Smooth 0.05s transition (snappy, not sluggish)
- `CtrlBtn` plays a click SFX automatically (see Sound Effects below) — use it instead of a raw `<button>` for any generic control

## Windows

**Structure:**
```tsx
<div style={{ position: "absolute", left: pos.x, top: pos.y, width, zIndex, transition: "width 0.15s" }}>
  {/* Title bar */}
  <div style={{ ...TITLEBAR, height: 22, borderBottom: "1px solid var(--border-color)", /* rest */ }}>
    <span>{title}</span>
    <div>{closeButtons}</div>
  </div>

  {/* Content */}
  <div style={{ border: "1px solid var(--border-color)", background: "var(--bg-window)" }}>
    {/* ... */}
  </div>

  {/* Status bar (optional) */}
  {statusBar && <div style={{ borderTop: "1px solid var(--border-color)", /* ... */ }}>{statusBar}</div>}
</div>
```

`width` can be a computed value (e.g. driven by a zoom level) — the real `Win` component has `transition: "width 0.15s"` on its outer wrapper so resizing animates smoothly. See the image/photo viewers in `App.tsx` for the pattern: window grows/shrinks with zoom rather than just scrolling internally.

**Title bar pattern:**
```tsx
const TITLEBAR: React.CSSProperties = { background: "var(--titlebar-bg)" };
```
`--titlebar-bg` is itself a striped `repeating-linear-gradient(...)` string defined per-palette in `PALETTES` (App.tsx) — don't hardcode the gradient in the component.

## Sound Effects

Every generic button (`CtrlBtn`), window open/close (`toggle()` in App, `Win`'s close/minimize, `Modal`), plays a short synthesized SFX via Web Audio API — no audio files:

```tsx
const playClick = () => beep(1100, 850, 0.04, "square", 0.18);
const playOpen  = () => beep(480, 1200, 0.1, "square", 0.22);
const playClose = () => beep(900, 320, 0.1, "square", 0.22);
```

Volume controlled by the `sfxVolume` state → "Effects Volume" slider in PREFERENCES. When adding a new interactive element, call the appropriate `play*()` before/alongside the action — see `CtrlBtn`'s `onClick` wrapper for the pattern.

## Animations

Add to `GLOBAL_CSS`:
```tsx
const GLOBAL_CSS = `
  @keyframes my-anim { 0% { /* ... */ } 100% { /* ... */ } }
`;
```

Usage in inline style:
```tsx
style={{
  animation: active ? "my-anim 0.5s ease-in-out infinite" : undefined,
  animationDelay: `${delay}s`,
}}
```

**Common patterns:**
- Duration: 0.05s (snappy UI), 0.35s (smooth transitions), 2s+ (long effects)
- Easing: `ease-in-out` (natural), `linear` (mechanical/looped), `ease` (default, OK)

## Tailwind

**Use for:**
- Layout (`flex`, `grid`, `absolute`, `relative`)
- Responsive spacing (`p-4`, `gap-6`)
- Overflow/display utilities (`overflow-hidden`, `hidden`, `flex-shrink-0`)

**Avoid:**
- Colors (use theme constants)
- Custom font sizes (use design system)
- Complex animations (use CSS keyframes)

**Example:**
```tsx
<div className="absolute top-20 left-4 flex flex-col gap-2 overflow-hidden">
```

## Range Inputs (Sliders)

There are now 3 sliders in the app (Music Volume, Effects Volume, BG Gen controls) — all share this global CSS in `GLOBAL_CSS`:
```tsx
input[type=range] {
  -webkit-appearance: none; appearance: none;
  background: transparent; cursor: pointer; width: 100%;
}
input[type=range]::-webkit-slider-runnable-track {
  background: var(--bg-panel); height: 4px; border: 1px solid var(--border-color);
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none; width: 10px; height: 14px;
  background: var(--bg-window); border: 1px solid var(--border-color); margin-top: -6px; cursor: ew-resize;
}
/* + moz versions, same var names */
```

**In component:**
```tsx
<input type="range" min={0} max={1} step={0.01} value={val} onChange={e => onChange(Number(e.target.value))} style={{ width: 64, height: 14 }} />
```

## Scrollbar

**Global CSS:**
```tsx
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: var(--bg-panel); }
::-webkit-scrollbar-thumb { background: var(--text-secondary); border: 1px solid var(--border-color); }
```

## Responsive Images

```tsx
<img
  src={url}
  alt={label}
  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
/>
```

## Testing Styles

Before commit:
1. All states: default, hover, pressed, active, disabled
2. Text contrast: readable on all backgrounds, **in all 5 palettes × light/dark (10 combos)** — not just the default Y2K light
3. Pixel alignment: no sub-pixel rendering (should be crisp)
4. Animation smoothness: 60fps in DevTools
5. Cross-browser: Chrome, Firefox, Safari

## Common Gotchas

**Flexshrink:** Always add `flexShrink: 0` to prevent buttons/icons from squishing
**Border rendering:** Use exactly `1px solid var(--border-color)`, avoid 0.5px or rgb()
**Font fallbacks:** Always include fallback (e.g., `monospace`, `Georgia`)
**Z-index:** Don't invent a new local z-counter for a sub-window — thread `getNextZ()`/`focus()` from App so every window (including file-viewer popups) shares one monotonic counter. Reserve ~10-30 for desktop windows, 300+ used historically for MY PROJECTS file viewers before the unification (now just uses the shared counter too); 900 for Modal overlays; 998+ for visual-only overlays (noise, scanlines); 9000 for FATAL ERROR; 9999 for splash.
**Button color:** Never assume a bare `<button>` is visible by default — set `color` explicitly for any non-default state (the global rule only covers the unstated default).
