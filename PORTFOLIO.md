# Portfolio Structure & Content

## Goal
Transform Y2K retro desktop into interactive portfolio showcasing your work, projects, skills, and contact.

## Current State
- Desktop UI: fully functional (windows, dock, draggable UI, animations)
- Content: placeholder data (fake music tracks, photos, system info)
- Ready to populate with real portfolio data

## Proposed Portfolio Structure

### 1. Desktop Windows (Replace Placeholder Content)

#### Media Player → Project Showcase
- "Album art" → Project hero image
- Track list → List of projects (clickable)
- Metadata → Project details (year, skills, link)
- Play/pause → Project status (active/archived)

#### Photo Viewer → Gallery / Work Samples
- Photos → Screenshots/mockups of projects
- Metadata → Image credits, dates, tech used
- Navigation → Portfolio galleries

#### Notes/README → About Section
- Bio
- Skills list
- Core values/approach
- Contact info

#### Playlist → Skills/Tags
- Categorized skills (Frontend, Design, Tools)
- Proficiency level (BPM = speed, kbps = quality)
- Filter by skill

#### System Info → Resume / Stats
- Experience years
- Projects completed
- Languages/tools
- Certifications

### 2. Data Organization

**New folder structure:**
```
src/
  app/
    components/
      portfolio/          ← NEW
        ProjectCard.tsx
        SkillsPanel.tsx
        GalleryViewer.tsx
        AboutWindow.tsx
    data/                ← NEW
      projects.ts        (array of project objects)
      skills.ts          (array of skills)
      experiences.ts     (array of experiences)
```

### 3. Project Object Schema

```typescript
interface Project {
  id: number;
  title: string;
  description: string;
  year: number;
  image: string;           // hero image URL
  link?: string;           // live demo or GitHub
  skills: string[];        // ["React", "TypeScript", "Tailwind"]
  role: string;            // "Designer" | "Developer" | "Lead"
  status: "active" | "archived";
  bpm?: number;            // playfulness metric (80-120)
  duration?: string;       // "3:24" format or project timeline
}
```

### 4. Skills Object Schema

```typescript
interface Skill {
  id: number;
  name: string;
  category: "frontend" | "backend" | "design" | "tools";
  proficiency: number;     // 1-100 (visualized as kbps)
  icon?: string;
  years?: number;
}
```

### 5. Experience Object Schema

```typescript
interface Experience {
  id: number;
  title: string;
  company: string;
  startYear: number;
  endYear?: number;        // undefined = current
  description: string;
  skills: string[];
}
```

## Portfolio Sections Map

| Window | Content | Status |
|--------|---------|--------|
| Media Player | Featured projects, project details | To do |
| Photo Viewer | Project galleries, screenshots | To do |
| Playlist | Skills, proficiencies | To do |
| Notes | About, bio, values | To do |
| System Info | Experience, stats, resume | To do |

## Desktop Icons

Update to link to sections:
- **MY FILES** → Projects list (modal or new window)
- **MUSIC** → Featured projects
- **PHOTOS** → Gallery
- **ABOUT** → Resume/contact

## Dock Icons

Add or repurpose:
- Home → Landing/intro
- Music → Featured projects
- Photos → Gallery
- Files → All projects
- Network → Contact / social links
- Prefs → (future: theme toggle, font size)
- System → About/resume
- About → Links / contact

## Portfolio Pages (Future)

If expanding beyond desktop windows:
```
/portfolio     (main, showing desktop)
/projects      (grid view, filter by skill)
/about         (full bio, values, contact)
/contact       (form or social links)
```

## Content Gathering Checklist

- [ ] List 5-10 best projects
- [ ] Gather hero images/screenshots for each
- [ ] Write 1-2 sentence descriptions
- [ ] Tag with skills used
- [ ] Get links (GitHub, live demo, figma, etc.)
- [ ] Collect "featured" 3-5 for hero position
- [ ] Write short bio (100-150 words)
- [ ] List core skills + proficiency levels
- [ ] Gather work experience/timeline
- [ ] Prepare social links (GitHub, LinkedIn, Twitter, etc.)

## Styling Notes

**Portfolio windows should:**
- Match retro aesthetic (fonts, colors, borders)
- Be scannable (compact, organized)
- Support interactivity (clickable items, expand on click)
- Load real images without breaking layout (use `objectFit: "cover"`)

**Example window content:**
```tsx
{projects.map(project => (
  <button
    key={project.id}
    onClick={() => setSelected(project)}
    style={{
      width: "100%", padding: "8px 6px",
      background: selected?.id === project.id ? "#a8c4d4" : "#faf6f0",
      border: "1px solid #1a1212",
      textAlign: "left", cursor: "pointer",
    }}
  >
    <div style={{ ...PX, fontSize: 6, color: "#1a1212" }}>{project.title}</div>
    <div style={{ ...MONO, fontSize: 7, color: "#7a6a6a" }}>{project.year} · {project.skills.join(", ")}</div>
  </button>
))}
```

## Contact Integration

**Goal:** Easy visitor contact without leaving desktop metaphor

**Options:**
1. Contact window (email form, opens email client link)
2. Dock "Mail" icon → opens contact form in new window
3. About window → email link at bottom

**Data to capture:**
- Name, email, message
- Store in formspree, emailjs, or own backend

## Analytics (Optional)

Track:
- Most visited projects
- Skills viewed most
- Contact form submissions
- Time spent on portfolio

Use: Plausible Analytics (privacy-friendly, Y2K theme aesthetic)

## Deployment

- Build: `pnpm build`
- Output: `dist/`
- Host on: Vercel, Netlify, GitHub Pages, personal server
- Domain: yourname.dev or portfolio.yourname.com
