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
**Portfolio structure & content roadmap.** Data schemas, content organization, feature map.
- When to read: Before building portfolio sections
- Use for: Understanding window → content mapping, data structure design
- Quick ref: Projects, skills, experiences object schemas; content gathering checklist

### [TASKS.md](TASKS.md)
**Work breakdown by phase.** 6 phases, task list, blockers, timeline estimates.
- When to read: To plan what to work on next
- Use for: Tracking progress, quick wins, definition of done
- Quick ref: Phase 1 (foundation) done, Phase 2 next (data structures + content)

### [THEMES.md](THEMES.md)
**Theme system overview.** 2 themes (Color + Mono), CSS variables, implementation guide.
- When to read: When adding new color styles or implementing theming
- Use for: Understanding how themes work, theme toggle mechanism
- Quick ref: CSS var names, both theme color sets, how to add new themes

### [THEME_MIGRATION.md](THEME_MIGRATION.md)
**How to migrate components to CSS variables.** Step-by-step examples, priority components.
- When to read: When migrating a component to use theme vars
- Use for: Actual migration steps, testing checklist, pitfalls to avoid
- Quick ref: Before/after code examples, priority components list

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
- **GitHub:** [Your repo URL here when ready]
- **Live:** [Deployed URL here when ready]
