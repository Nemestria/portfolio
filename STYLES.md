# Styling Conventions

## CSS Approach

**Primary:** Inline `React.CSSProperties` for dynamic/positioned elements
**Secondary:** Tailwind classes for static layout (margins, flex)
**Animations:** CSS keyframes in GLOBAL_CSS (top of App.tsx)

Rationale: Retro aesthetic needs pixel-perfect control; Tailwind handles spacing/layout. Avoid complex CSS-in-JS for performance.

## Color Usage

**NEVER hardcode hex colors.** Always reference theme:
```tsx
// ❌ Wrong
style={{ background: "#e8e8e8" }}

// ✅ Right
style={{ background: "#e8e8e8" }} // From DESIGN.md palette, documented reason
// OR use a constant if reused:
const BTN_HOVER = "#d8d0cc";
```

For new sections/components:
1. Check DESIGN.md for closest match
2. Add to constant at top of component
3. Leave inline comment linking to DESIGN.md section if non-obvious

## Font Sizes

Use defined constants:
```tsx
const PX = { fontFamily: "'Press Start 2P', monospace" };
const MONO = { fontFamily: "'Share Tech Mono', monospace" };
const SERIF = { fontFamily: "'IM Fell English', Georgia, serif" };

// Apply
style={{ ...PX, fontSize: 7, color: "#46425e" }}
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

All interactive elements: `border: "1px solid #46425e"`

```tsx
// ✅ Consistent
style={{
  border: "1px solid #46425e",
  borderBottom: "1px solid #46425e",
  borderTop: "1px solid #46425e",
}}
```

## Button Styling

**Template:**
```tsx
<button
  style={{
    width: 28, height: 22,
    background: pressed ? "#c8c0bc" : "#e8e8e8",
    border: "1px solid #46425e",
    cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: pressed ? "inset 1px 1px 0 rgba(0,0,0,0.25)" : "none",
    transform: pressed ? "translateY(1px)" : "none",
    transition: "background 0.05s, transform 0.05s",
    flexShrink: 0,
  }}
>
  {children}
</button>
```

Key points:
- Always include `flexShrink: 0` (prevent squishing)
- Pressed: darker bg + inset shadow + translateY(1px)
- Smooth 0.05s transition (snappy, not sluggish)

## Windows

**Structure:**
```tsx
<div style={{ position: "absolute", left: pos.x, top: pos.y, width, zIndex }}>
  {/* Title bar */}
  <div style={{ ...TITLEBAR, height: 22, borderBottom: "1px solid #46425e", /* rest */ }}>
    <span>{title}</span>
    <div>{closeButtons}</div>
  </div>

  {/* Content */}
  <div style={{ border: "1px solid #46425e", background: "#ffffff" }}>
    {/* ... */}
  </div>

  {/* Status bar (optional) */}
  {statusBar && <div style={{ borderTop: "1px solid #46425e", /* ... */ }}>{statusBar}</div>}
</div>
```

**Title bar pattern:**
```tsx
const TITLEBAR = {
  background: "repeating-linear-gradient(90deg, #15788c 0px, #15788c 1px, #709e96 1px, #709e96 2px)",
};
```

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

**Global CSS:**
```tsx
input[type=range] {
  -webkit-appearance: none; appearance: none;
  background: transparent; cursor: pointer; width: 100%;
}
input[type=range]::-webkit-slider-runnable-track {
  background: #d8d0cc; height: 4px; border: 1px solid #46425e;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none; width: 10px; height: 14px;
  background: #ede5e5; border: 1px solid #46425e; margin-top: -6px; cursor: ew-resize;
}
/* + moz versions */
```

**In component:**
```tsx
<input type="range" min={0} max={100} value={val} onChange={...} style={{ width: 64, height: 14 }} />
```

## Scrollbar

**Global CSS:**
```tsx
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #ede5e5; }
::-webkit-scrollbar-thumb { background: #c8c0bc; border: 1px solid black; }
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
2. Text contrast: #46425e readable on all backgrounds
3. Pixel alignment: no sub-pixel rendering (should be crisp)
4. Animation smoothness: 60fps in DevTools
5. Cross-browser: Chrome, Firefox, Safari

## Common Gotchas

**Flexshrink:** Always add `flexShrink: 0` to prevent buttons/icons from squishing
**Border rendering:** Use exactly `1px solid #46425e`, avoid 0.5px or rgb()
**Font fallbacks:** Always include fallback (e.g., `monospace`, `Georgia`)
**Z-index:** Reserve 10-100 for UI (windows, buttons); 998+ for overlays (noise, scanlines)
