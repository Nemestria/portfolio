# Portfolio Structure & Content (Actual Implementation)

> The original plan in this doc (Project/Skill/Experience data schemas, a `data/projects.ts` + `data/skills.ts` split, BPM-as-proficiency metaphor) was **never built that way**. What shipped is a file-system metaphor instead — simpler, fits the "vintage desktop" concept better, and didn't require a skills/experience taxonomy the client didn't actually want. This doc now documents what's real.

## Current State

Desktop UI is fully functional and populated with **real content** for most sections. Remaining gaps are listed in [TASKS.md](TASKS.md).

## Desktop Windows (What Each Actually Does)

### MY PROJECTS → File Manager (`MyProjectsWin` in App.tsx)
Not a project list — a fake file browser. `PROJECTS` constant is an `FsFolder` tree:

```tsx
interface FsFolder { name: string; type: "folder"; date?: string; children: FsEntry[]; }
interface FsImage  { name: string; type: "image";  date?: string; src: string; }
interface FsVideo  { name: string; type: "video";  date?: string; src?: string; }
interface FsTxt    { name: string; type: "txt";    date?: string; content: string; }
type FsEntry = FsFolder | FsImage | FsVideo | FsTxt;
```

Navigate folders by double-click; opening a file (image/video/txt) spawns a **new stacked window** per file (not a replaced single viewer — this was a deliberate fix to preserve the "vintage multi-window" feel). Each viewer window participates in the same global z-index counter as desktop windows (`getNextZ` prop threaded down from App).

**Real content, 3 projects:**
| Folder | Subject | Tools | Year | Images | Video |
|---|---|---|---|---|---|
| PROJECT_01 | Sword set (game-ready, low→high, retopo, UE5-optimized, concept by Maeve) | 3DS Max, Blender, ZBrush, Substance Painter/Designer, UE5.7 | 2025 | 3 real renders in `public/projects/PROJECT_01/` | `OVERVIEW.MP4` — **placeholder, no file yet** |
| PROJECT_02 | Axe set (Darksiders-style stylized, ref by Jakob Gavelli, mentorship by Visual Architects) | same | 2025 | 3 real renders | same — **placeholder** |
| PROJECT_03 | Street environment (Bloodborne-inspired kit, FAB-library decals/foliage only) | same | 2026 | 4 real renders | same — **placeholder** |

Image viewer has 1×–4× zoom that grows/shrinks the **window itself** (not just an internal scroll area).

### MUSIC → `MusicVisualizer`
EQ-bar visualizer, real playlist (`src/app/data/tracks.ts` → `public/music/song1.mp3`, `song2.mp3` — names/artists still generic "SONG 01"/"SONG 02", not yet retitled). Drag-and-drop local file support. Autoplay only if the visitor chose "ENABLE SOUND" on the splash screen.

### PHOTOS → `PhotoViewer`
Real photos (`public/photos/001.png`, `002.png`) replacing the original Unsplash placeholders. Zoom 1×–4×, same window-grows-with-zoom behavior as the image viewer. A third file (`003-screenshot.png`, an apparent accidental upload) sits in the folder unwired — confirm with Alejandro whether to use or delete.

### ABOUT (desktop icon) → `NotesWin`
`README.TXT — NOTEPAD` styled diary/bio. Real content: Wittgenstein quote, intro paragraph (based near Barcelona, 3D artist), and a "here you will find: — my portfolio" list that's **intentionally incomplete** — Alejandro only gave one bullet; ask for the rest or leave as-is.

### ABOUT (dock) → `AboutWin`
Separate, more compact card: avatar placeholder, short tagline, social links (LinkedIn, Instagram, email). Bio text here (`"Crafting worlds between pixels and polygons..."`) is still the **original placeholder** — never updated to match the NotesWin bio. Worth reconciling.

### BG GEN → `BgGenWin`
Procedural animated SVG background generator (plasma/mesh/noise/poly/waves/dots), seeded RNG, live preview, Apply button sets it as the desktop background. Fully built, not placeholder.

### BLOG → `BlogWin`
New addition (not in the original plan). Fake browser chrome (back/forward/refresh/URL bar), collapsible post list. **3 placeholder posts**, generic titles/excerpts — needs real content + decision on whether `http://asancho.dev/blog` is the real intended URL to display.

## Splash / Boot Sequence

Not in the original plan. `SplashScreen` component: animated loading bar → "SYSTEM READY" → choice between "ENABLE SOUND + ENTER" (autoplays music) or "enter without sound". Gates the whole desktop behind it.

## FATAL ERROR Easter Egg

Not in the original plan. If a visitor hasn't opened MY PROJECTS within 40s of the splash dismissing, a crash-screen-styled modal nags them with a "GO TO MY PROJECTS" button that jumps straight to `PROJECT_01`'s first render. A red **DEBUG** button in the system bar (next to FILE/EDIT/VIEW/SPECIAL) triggers it manually for testing/demos.

## Dock (6 icons, no desktop-icon duplication)
HOME (reset layout) · CONTACT (modal) · NETWORK (modal) · PREFS · SYSTEM (tech stack info) · ABOUT

## Desktop Icons (6, left column)
MY PROJECTS · MUSIC · PHOTOS · ABOUT · BG GEN · BLOG

## Content Gaps (see [TASKS.md](TASKS.md) for the actionable list)
- `OVERVIEW.MP4` videos missing for all 3 projects (PDF was explicitly replaced with video per Alejandro's request — folders/UI ready, files not)
- Music track names still generic
- AboutWin (dock) bio is stale placeholder vs. NotesWin's real bio
- NotesWin "here you will find" list incomplete
- BLOG posts are placeholder
- `003-screenshot.png` in `public/photos/` unconfirmed/unwired

## Deployment

- Build: `pnpm build` → `dist/`
- Host: Vercel, linked to GitHub (`Nemestria/portfolio`) — push to `master` auto-deploys
- Live: https://portfolio-ashen-sigma-63gx2gi92g.vercel.app
