# Documentation Index

Quick reference for all portfolio project docs. Read in this order when starting work.

## Core Docs (Read First)

### [CLAUDE.md](CLAUDE.md)
**Working instructions for Claude.** Dev setup, key files, workflow, conventions.
- When to read: Before asking Claude for help
- Use for: Reminding Claude of project structure, linking to other docs

### [DESIGN.md](DESIGN.md)
**Visual & design system.** Color palette, typography, spacing, components, animations.
- When to read: Before styling anything
- Use for: Copy exact hex values, font specs, shadow rules
- Quick ref: All 40+ colors mapped, 3 font families, layout grid

### [STYLES.md](STYLES.md)
**CSS/styling conventions.** How to write styles (inline vs. Tailwind), button templates, common patterns.
- When to read: When adding new UI elements
- Use for: Copy button/window templates, spacing patterns
- Quick ref: Always `flexShrink: 0`, no hardcoded colors, 1px borders everywhere

### [RETRO_GUIDELINES.md](RETRO_GUIDELINES.md)
**Y2K aesthetic rules.** Do's/don'ts, interaction patterns, content tone, visual references.
- When to read: Before designing new sections
- Use for: Checking if something "feels retro," interaction ideas
- Quick ref: No rounded corners, no drop shadows, flat colors, earnest tone

## Implementation Docs

### [PORTFOLIO.md](PORTFOLIO.md)
**Actual portfolio structure & content status.** What each window really does, what's real content vs. placeholder.
- When to read: Before touching any window's content or data
- Use for: Understanding the file-system metaphor (`PROJECTS` as `FsFolder` tree), what's wired vs. still placeholder
- Quick ref: 3 real projects with renders, videos still missing; BLOG/AboutWin bio still placeholder

### [TASKS.md](TASKS.md)
**Actual completion status + remaining content gaps.** Most of the original 6-phase plan shipped, in a different shape than planned.
- When to read: To plan what to work on next
- Use for: Tracking progress, content gaps (videos, bio reconciliation, blog posts)
- Quick ref: Desktop shell, theming, MY PROJECTS, FATAL ERROR easter egg all done; remaining work is mostly content (videos, real blog posts)

### [THEMES.md](THEMES.md)
**Actual theme system.** 5 palettes (Y2K/DUSK/FOREST/SUNSET/MONO) × light/dark variants, CSS variables, implementation guide.
- When to read: When adding new color styles, palettes, or touching dark mode
- Use for: Understanding how palettes/dark-mode work, how to add a new palette
- Quick ref: Switched in PREFERENCES window (not system bar), no localStorage persistence, `button { color: var(--text-primary) }` safety net for dark-mode visibility

### [THEME_MIGRATION.md](THEME_MIGRATION.md)
**Historical.** Original migration plan — now complete and superseded by THEMES.md, kept for the CSS variable reference and pitfalls (e.g. invisible buttons in dark mode) it documents.
- When to read: Rarely — THEMES.md is the current source of truth
- Use for: CSS var name reference, lessons learned from the real migration

---

## How These Connect

```
CLAUDE.md (project overview)
    ├─ DESIGN.md (visual foundation)
    │   └─ STYLES.md (implement design)
    │       └─ RETRO_GUIDELINES.md (aesthetic rules)
    ├─ PORTFOLIO.md (what to build)
    │   └─ TASKS.md (how to build it)
    └─ [Work on code]
```

## Workflow Example

**"Claude, add a project window to the media player"**

1. Claude reads **CLAUDE.md** → understands project, finds App.tsx location
2. Claude reads **PORTFOLIO.md** → sees Media Player → Featured Projects mapping
3. Claude reads **DESIGN.md** → gets window chrome specs, color values
4. Claude reads **STYLES.md** → knows how to write button styles
5. Claude reads **RETRO_GUIDELINES.md** → ensures interactions feel Y2K
6. Claude writes code, commits, references **TASKS.md** to mark done

## For You (The User)

**Planning:**
- Read PORTFOLIO.md + TASKS.md first (what are we building?)
- Gather content (projects, images, bio) per PORTFOLIO.md checklist

**Working with Claude:**
- Always link to relevant docs in your request (e.g., "per PORTFOLIO.md, the media player should show projects")
- Claude will reference these automatically when working on the project

**Making decisions:**
- Visual: Check DESIGN.md (colors, fonts) + RETRO_GUIDELINES.md (do's/don'ts)
- Technical: Check CLAUDE.md (conventions) + STYLES.md (patterns)
- Scope: Check TASKS.md (phases, estimates)

## Document Maintenance

**Update when:**
- Adding new design rules → DESIGN.md
- Adding new conventions → CLAUDE.md or STYLES.md
- Changing data structure → PORTFOLIO.md
- Completing tasks → TASKS.md
- Finalizing aesthetic decisions → RETRO_GUIDELINES.md

**Don't update:**
- Code-specific info (file paths, line numbers) — these change too fast, link from CLAUDE.md instead
- In-progress notes — use TASKS.md for that
- Historical decisions — let git log handle it

## Quick Links

- **Figma source:** https://www.figma.com/design/0HsdMumJ7joRvlpwfK3KTw/Y2K-inspired-Retro-Website-Design
- **GitHub:** https://github.com/Nemestria/portfolio
- **Live:** https://portfolio-ashen-sigma-63gx2gi92g.vercel.app

Vercel is linked to GitHub — every push to `master` auto-deploys to the live URL.
