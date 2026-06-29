# Theme System

## Overview

Portfolio supports multiple themes via CSS custom properties (variables). Currently 2 themes:

1. **Color** (default) — Navy/cyan/coral, vibrant accents
2. **Mono** — High-contrast dark/light, bold & minimal

Toggle via theme switcher in system bar or localStorage key `portfolio-theme`.

## Themes

### Color Theme
**Primary use:** Default portfolio, eye-catching, modern retro

Colors:
- Dark: #46425e (navy purple)
- Light: #f5f5f5 (off-white) / #ffffff (white)
- Accent: #00b9be (bright cyan)
- Hover: #ffb0a3 (salmon)
- Error: #ff6973 (coral)

### Mono Theme
**Primary use:** High contrast, accessibility, minimal aesthetic

Colors:
- Dark: #222323 (near-black)
- Light: #f0f6f0 (near-white, slight warmth)
- No accent colors — use opacity/borders for state changes

## CSS Variables

Global theme variables (set on `:root` or `.theme-mono`):

```css
/* Backgrounds */
--bg-main: #f5f5f5;          /* Desktop/primary bg */
--bg-window: #ffffff;         /* Window content bg */
--bg-panel: #e8e8e8;          /* Secondary panels */
--bg-hover: #ffb0a3;          /* Hover state */
--bg-active: #00b9be;         /* Active/selected state */

/* Text & Borders */
--text-primary: #46425e;      /* Main text, borders */
--text-secondary: #15788c;    /* Secondary text */
--text-tertiary: #999999;     /* Disabled, placeholders */

/* Accent */
--color-accent: #00b9be;      /* Highlights, focus */
--color-error: #ff6973;       /* Errors, warnings */
```

## Implementation

### Setup (in App.tsx root)

```tsx
const [theme, setTheme] = useState<"color" | "mono">(() => {
  return (localStorage.getItem("portfolio-theme") as "color" | "mono") || "color";
});

useEffect(() => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);
}, [theme]);

// In JSX:
<div data-theme={theme}>
  {/* App content */}
</div>
```

### CSS (in globals or theme file)

```css
:root[data-theme="color"] {
  --bg-main: #f5f5f5;
  --bg-window: #ffffff;
  --bg-panel: #e8e8e8;
  --bg-hover: #ffb0a3;
  --bg-active: #00b9be;
  --text-primary: #46425e;
  --text-secondary: #15788c;
  --text-tertiary: #999999;
  --color-accent: #00b9be;
  --color-error: #ff6973;
}

:root[data-theme="mono"] {
  --bg-main: #f0f6f0;
  --bg-window: #f0f6f0;
  --bg-panel: #f0f6f0;
  --bg-hover: #e0e6e0;        /* Slightly darker for hover */
  --bg-active: #222323;       /* Dark for active/selected */
  --text-primary: #222323;
  --text-secondary: #444444;
  --text-tertiary: #888888;
  --color-accent: #222323;    /* Use dark for accents in mono */
  --color-error: #222323;     /* Same as primary */
}
```

Then use in components:

```tsx
// Replace inline hex colors with CSS vars
style={{
  background: "var(--bg-window)",
  color: "var(--text-primary)",
  border: "1px solid var(--text-primary)",
}}
```

## Theme Switcher UI

Add button to system bar or dock to toggle theme:

```tsx
<button
  onClick={() => setTheme(theme === "color" ? "mono" : "color")}
  title={`Switch to ${theme === "color" ? "mono" : "color"} theme`}
  style={{
    padding: "4px 8px",
    background: "var(--bg-panel)",
    border: `1px solid var(--text-primary)`,
    cursor: "pointer",
  }}
>
  {theme === "color" ? "🎨" : "⚫⚪"}
</button>
```

## Mono Theme Interaction States

With only 2 colors, simulate states via:

1. **Hover:** Slightly darker (#e0e6e0) or lighter bg
2. **Pressed:** Toggle to dark bg (#222323) + light text
3. **Active:** Dark bg (#222323), maintain text color
4. **Disabled:** #888888 text on light bg
5. **Focus:** Dark border (1px solid #222323) around elements

Example button states in mono:

```tsx
<button
  style={{
    background: isPressed ? "var(--bg-active)" : "var(--bg-panel)",
    color: isPressed ? "var(--bg-panel)" : "var(--text-primary)",
    border: `1px solid var(--text-primary)`,
  }}
>
  {label}
</button>
```

## Migration Path

### Phase 1: Add CSS vars to globals
Define variables, leave App.tsx code as-is (no refactor yet)

### Phase 2: Gradual inline → CSS var migration
Update high-value components (buttons, windows, statusbar) to use CSS vars

### Phase 3: Full coverage
All colors use CSS vars, theme toggling works end-to-end

## Future Themes

Can easily add more by defining new `[data-theme="name"]` blocks:
- **Sepia** — warm browns + cream (vintage photo aesthetic)
- **Neon** — bright lime/magenta on black (cyberpunk)
- **Pastel** — soft pinks/blues (gentle retro)

Just add new var set, no code changes needed.

## Testing Themes

Manual testing checklist:

- [ ] All windows visible in both themes
- [ ] Text readable (sufficient contrast)
- [ ] Buttons/states distinguishable (not just color, use shading/borders)
- [ ] Hover/press states work (background/opacity shift)
- [ ] EQ bars, animations visible in both
- [ ] Theme persists on reload (localStorage)
- [ ] Dock/system bar updated for both themes
- [ ] Window titles readable (title bar color adapted)

## Accessibility

**Mono theme advantages:**
- High contrast (#222323 on #f0f6f0 = max contrast)
- No reliance on color to convey state (uses borders, opacity, text)
- Better for color-blind users
- Better for low-vision users

**Color theme advantages:**
- Visually rich, engaging
- Easier to scan (colors create visual hierarchy)
- Follows retro aesthetic

Both should pass WCAG AA at minimum.
