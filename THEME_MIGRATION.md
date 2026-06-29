# Theme System Migration Guide

## Status
✅ Theme infrastructure ready:
- [x] CSS variables defined in `src/styles/themes.css`
- [x] Theme toggle button in system bar
- [x] localStorage persistence
- [x] 2 themes: Color (default) + Mono (high-contrast)
- [ ] App.tsx gradually migrated to use CSS vars (in progress)

## Current Implementation

### App.tsx
- Still uses hardcoded hex colors (for now)
- Theme data-attribute set on document root
- Can see differences when toggling theme (due to CSS var definitions)

### Next: Gradual Migration
Move inline color styles to use CSS variables. This keeps App.tsx readable while enabling full theming.

## How to Migrate a Component

### Before (hardcoded colors)
```tsx
<div style={{ background: "#ffffff", color: "#46425e", border: "1px solid #46425e" }}>
  Content
</div>
```

### After (CSS variables)
```tsx
<div style={{ background: "var(--bg-window)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
  Content
</div>
```

## Available CSS Variables

### Backgrounds
- `--bg-main` — Primary/desktop background
- `--bg-window` — Window/card content background
- `--bg-panel` — Secondary panels, lighter areas
- `--bg-hover` — Hover state background
- `--bg-active` — Active/selected state background
- `--bg-pressed` — Pressed button state background

### Text
- `--text-primary` — Main text, headers, strong text
- `--text-secondary` — Secondary text, labels, metadata
- `--text-tertiary` — Disabled text, placeholders, comments

### Accent
- `--color-accent` — Highlights, focus states, active accents
- `--color-error` — Errors, warnings, delete buttons
- `--border-color` — Borders everywhere

## Priority Components to Migrate

**High impact (visible, frequently used):**
1. System bar (top) — uses many hardcoded colors
2. Title bars (window chrome) — striped gradient uses hardcoded colors
3. Buttons (all types) — hover/press states
4. Status bar (bottom) — taskbar/dock

**Medium impact (common, but less visible):**
5. Window backgrounds & borders
6. Text colors throughout
7. EQ bar colors
8. Playlist/media player backgrounds

**Low impact (details):**
9. Small accents, decorative elements
10. Opacity values
11. Comments/secondary UI

## Migration Checklist

### Phase 1: High-impact components (2-3h)
- [ ] Update system bar colors to use CSS vars
- [ ] Update window title bar gradients
- [ ] Update button hover/press states
- [ ] Update status bar

### Phase 2: Medium components (2-3h)
- [ ] Update window/panel backgrounds
- [ ] Update text colors
- [ ] Update borders
- [ ] Update EQ bar colors

### Phase 3: Polish (1-2h)
- [ ] Test both themes thoroughly
- [ ] Verify accessibility (contrast ratios)
- [ ] Check animations in both themes
- [ ] Update any missed hardcoded colors

## Testing After Each Migration

After updating a component:
1. Run `pnpm dev`
2. Toggle theme button (🎨 ↔ ⚫⚪) in system bar
3. Verify component looks correct in both Color and Mono themes
4. Check hover/press states work
5. Ensure text is readable

## Example: Migrating a Button Component

### Current (hardcoded)
```tsx
<button
  style={{
    background: pressed ? "#00b9be" : "#e8e8e8",
    color: "#46425e",
    border: "1px solid #46425e",
  }}
>
  Click me
</button>
```

### Migrated (CSS vars)
```tsx
<button
  style={{
    background: pressed ? "var(--bg-active)" : "var(--bg-panel)",
    color: "var(--text-primary)",
    border: `1px solid var(--border-color)`,
  }}
>
  Click me
</button>
```

### Both themes work automatically:
- **Color theme:** active = cyan (#00b9be), panel = light gray (#e8e8e8)
- **Mono theme:** active = dark (#222323), panel = slightly darker light (#e6ebe6)

## Common Pitfalls

❌ **Don't mix hardcoded + CSS vars** (confusing to maintain)
```tsx
// Bad
style={{ background: "#ffffff", color: "var(--text-primary)" }}
```

✅ **Use CSS vars consistently within a component**
```tsx
// Good
style={{ background: "var(--bg-window)", color: "var(--text-primary)" }}
```

❌ **Don't create new color values** (breaks theming)
```tsx
// Bad
style={{ color: "#custom-color" }}
```

✅ **Use existing variables, or add to themes.css**
```tsx
// Good
style={{ color: "var(--text-primary)" }}
// If you need a new color, add to themes.css for both themes
```

## Gradual Rollout

You don't need to migrate everything at once. Strategy:
1. Keep App.tsx mostly as-is (already has logic, low benefit to refactor)
2. Migrate new components to use CSS vars from day 1
3. Update old components only when:
   - Fixing bugs in that area
   - Adding new features to that component
   - During planned refactors

This prevents large, risky PRs while still moving toward full theming coverage.

## Future: Computed Theme Colors

If you want to add more themes without editing themes.css, create a theme generator:

```ts
type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
};

function generateTheme(colors: ThemeColors) {
  return `
    :root[data-theme="custom"] {
      --bg-main: ${lighten(colors.primary, 30)};
      --text-primary: ${colors.primary};
      --color-accent: ${colors.accent};
      ...
    }
  `;
}
```

Then users could pick from a color picker and generate instant themes (future feature).
