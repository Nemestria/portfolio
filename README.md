# Alejandro Sancho — Portfolio

Y2K-inspired retro desktop OS portfolio for Alejandro Sancho (3D Artist — environment & props for video games, graphic/web designer). Started from a Figma Make code bundle (https://www.figma.com/design/0HsdMumJ7joRvlpwfK3KTw/Y2K-inspired-Retro-Website-Design), since extended into a fully interactive desktop metaphor.

**Live:** https://portfolio-ashen-sigma-63gx2gi92g.vercel.app
**Repo:** https://github.com/Nemestria/portfolio

## Running the code

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # outputs to dist/
```

Uses pnpm — see `pnpm-lock.yaml`. `npm i` / `npm run dev` also work but aren't the maintained path.

## What's in here

A boot-up desktop OS with a splash screen (loading bar → choice to enable sound), then a draggable-window desktop:

- **MY PROJECTS** — file-manager-style browser into `PROJECT_01/02/03` folders, each with a `README.TXT`, `OVERVIEW.MP4`, and renders. Opening a file spawns a new stacked window (vintage multi-window feel) with 1×–4× zoom that resizes the window itself.
- **MUSIC** — visualizer with EQ bars, playlist, drag-and-drop local file support.
- **PHOTOS** — gallery viewer with zoom.
- **ABOUT** (desktop icon) — `README.TXT` notepad with bio/quote.
- **BG GEN** — procedural animated SVG desktop backgrounds (plasma, mesh, noise, poly, waves, dots).
- **BLOG** — fake browser window, placeholder posts (content TBD).
- **Dock**: Home, Contact, Network, Preferences, System, About.
- **Preferences** — 5 color palettes (Y2K/DUSK/FOREST/SUNSET/MONO) each with a light + dark variant, background pattern picker, music volume, effects volume.
- Synthesized retro UI sound effects (open/close/click blips, Web Audio API, no audio files).
- A FATAL ERROR easter egg nags visitors who haven't opened MY PROJECTS after a while (DEBUG button in the system bar triggers it manually for testing).

See [DOCS_INDEX.md](DOCS_INDEX.md) for the full doc set.
