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
| PROJECT_01 | Sword set (game-ready, low→high, retopo, UE5-optimized, concept by Maeve) | 3DS Max, Blender, ZBrush, Substance Painter/Designer, UE5.7 | 2025 | 3 real renders in `public/projects/PROJECT_01/` | `OVERVIEW.MP4` — **placeholder, no file/YouTube ID yet** |
| PROJECT_02 | Axe set (Darksiders-style stylized, ref by Jakob Gavelli, mentorship by Visual Architects) | same | 2025 | 3 real renders | same — **placeholder** |
| PROJECT_03 | Street environment (Bloodborne-inspired kit, FAB-library decals/foliage only) | same | 2026 | 4 real renders | same — **placeholder** |

Image viewer has 1×–4× zoom that grows/shrinks the **window itself** (not just an internal scroll area). Project copy (`projectContent.project01/02/03` in i18n.ts) is bilingual, Spanish is a draft translation pending Alejandro's own wording. Video viewer supports a YouTube embed (`youtube-nocookie.com`) as an alternative to an uploaded `.mp4`, via an optional `youtubeId` field on `FsVideo` — falls back to native `<video>` if `src` is set, or a "no video" placeholder if neither is set.

### MUSIC → `MusicVisualizer`
EQ-bar visualizer, real playlist (`src/app/data/tracks.ts` → `public/music/song1–4.mp3`, 4 tracks — names/artists still generic "SONG 01"–"SONG 04", not yet retitled). Drag-and-drop local file support. Autoplay only if the visitor chose "ENABLE SOUND" on the splash screen.

### PHOTOS → `PhotoViewer`
Real photos (`public/photos/001.png`, `002.png`, `003-screenshot.png`), all 3 wired into the `PHOTOS` array. Zoom 1×–4×, same window-grows-with-zoom behavior as the image viewer.

### ABOUT (desktop icon) → `NotesWin`
`README.TXT — NOTEPAD` styled diary/bio, **bilingual** (`notes.lines` in `src/app/data/i18n.ts`, ES + EN). Real content: Wittgenstein quote, intro paragraph (based near Barcelona, 3D artist), and a "here you will find: — my portfolio" list that's **intentionally incomplete** — Alejandro only gave one bullet; ask for the rest or leave as-is. Spanish copy is a draft translation pending his own wording.

### ABOUT (dock) → `AboutWin`
Separate, more compact card: avatar placeholder, short tagline, social links (LinkedIn, Instagram, email). Bio text here (`t.about.bio`) is still the **original placeholder** — never updated to match the NotesWin bio. Worth reconciling.

### BG GEN → `BgGenWin`
Procedural animated SVG background generator (plasma/mesh/noise/poly/waves/dots), seeded RNG, live preview, Apply button sets it as the desktop background. Fully built, not placeholder.

### BLOG → `BlogWin`
New addition (not in the original plan), **bilingual** (`blog.posts` in `src/app/data/i18n.ts`). Fake browser chrome (back/forward/refresh/URL bar), collapsible post list, long-form posts with paragraph + inline-image blocks (`BlogBlock` union type, supports arbitrary length). **Post #1 is real content** ("Cómo construí este sitio…" / "How I built this site…" — a making-of writeup covering the Y2K concept, the monolithic App.tsx decision, synthesized SFX, and the palette system), with one pending image placeholder for a desktop screenshot. **Posts #2 and #3 are still single-paragraph stubs**, need real content. URL shown is `http://asancho.dev/blog` — confirm if that's the real intended domain.

## Splash / Boot Sequence

Not in the original plan. `SplashScreen` component: animated loading bar → "SYSTEM READY" → choice between "ENABLE SOUND + ENTER" (autoplays music) or "enter without sound". Gates the whole desktop behind it.

## FATAL ERROR Easter Egg

Not in the original plan. If a visitor hasn't opened MY PROJECTS within 40s of the splash dismissing, a crash-screen-styled modal nags them with a "GO TO MY PROJECTS" button that jumps straight to `PROJECT_01`'s first render. A red **DEBUG** button in the system bar (next to FILE/EDIT/VIEW/SPECIAL) triggers it manually for testing/demos.

## Dock (6 icons, no desktop-icon duplication)
HOME (reset layout) · CONTACT (modal) · NETWORK (modal) · PREFS · SYSTEM (tech stack info) · ABOUT

## Desktop Icons (6, left column)
MY PROJECTS · MUSIC · PHOTOS · ABOUT · BG GEN · BLOG

## Language System (ES/EN)
Not in the original plan. `src/app/data/i18n.ts` exports `Lang` (`"es" | "en"`), a `Strings` interface covering every piece of UI copy, and `STRINGS: Record<Lang, Strings>` (`ES`/`EN` objects). Consumed via a `LanguageContext`/`useLang()` hook (`{ lang, setLang, t }`) — a deliberate exception to the project's general prop-drilling convention, since `t` is needed almost everywhere.

- **Language picked on the splash screen** (first thing a visitor sees, before the loading bar) and switchable anytime via an ES/EN toggle in the system bar.
- **Spanish is the default language** (`lang` initial state `"es"`) since Alejandro is Spanish — English is the secondary/translated language.
- All UI chrome (labels, buttons, window titles, menus) is fully translated both ways.
- Personal-voice content (NotesWin bio, project descriptions, blog posts) currently has **draft Spanish translations written by Claude**, explicitly pending Alejandro rewriting them in his own voice — not meant to ship as final copy.
- `MyProjectsWin` re-resolves open file-viewer content live from the current-language `PROJECTS` tree (`resolveEntry(id)`) so switching language with a file already open updates its text without needing to reopen it.

## Auto-Wire Workflow (standing instruction)
Per Alejandro's request, any file dropped into `public/music/`, `public/photos/`, or `public/projects/PROJECT_0X/` gets proactively wired into the corresponding data (`tracks.ts`, `PHOTOS` array in App.tsx, `PROJECTS`/`getProjects()` tree) when detected — no need to ask each time. Ambiguous cases (unclear track titles, which project a new render belongs to) get a sensible guess flagged for confirmation rather than silently skipped.

## Content Gaps (see [TASKS.md](TASKS.md) for the actionable list)
- `OVERVIEW.MP4` / YouTube IDs missing for all 3 projects (folders/UI ready, no source set)
- Music track names still generic ("SONG 01"–"SONG 04")
- AboutWin (dock) bio is stale placeholder vs. NotesWin's real bio
- NotesWin "here you will find" list incomplete
- BLOG: post #1 is real content, posts #2/#3 still placeholder stubs; post #1 has a pending image placeholder
- Spanish copy for notes/project descriptions/blog is a draft translation, pending Alejandro's own wording

## Deployment

- Build: `pnpm build` → `dist/`
- Host: Vercel, linked to GitHub (`Nemestria/portfolio`) — push to `master` auto-deploys
- Live: https://portfolio-ashen-sigma-63gx2gi92g.vercel.app
