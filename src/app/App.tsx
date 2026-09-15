import React, { useState, useRef, useEffect, useCallback, useContext, createContext } from "react";
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Folder, Music, Image, Info, Home, Monitor,
  Mail, Rss, SlidersHorizontal, User, ExternalLink, Paintbrush,
  ArrowLeft, ArrowRight, RotateCw, File, Film, Globe, Sun, Moon, AlertTriangle, ListChecks, BookOpen, MessageSquare,
} from "lucide-react";
import "../styles/themes.css";
import { BUILTIN_TRACKS } from "./data/tracks";
import { STRINGS, type Lang, type Strings, type TrackerLane, type JournalEntry } from "./data/i18n";

// ── Language Context ─────────────────────────────────────────────────────────

const LanguageContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Strings }>({
  lang: "es", setLang: () => {}, t: STRINGS.es,
});
const useLang = () => useContext(LanguageContext);

// z-index of whichever open Win is currently on top — lets Win render its
// own highlight without every wrapper (MusicVisualizer, PhotoViewer, etc.)
// having to thread an extra "active" prop down just for this.
const ActiveWinContext = createContext<number>(-1);

// ── Global styles ─────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
  @keyframes eq-pulse { from { height: 8% } to { height: 94% } }
  @keyframes marquee-scroll { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
  @keyframes led-blink { 0%,100% { opacity: 1 } 50% { opacity: 0.2 } }
  @keyframes splash-fadein { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
  @keyframes splash-exit { from { opacity: 1 } to { opacity: 0 } }
  @keyframes pet-bob { 0%,100% { transform: translateY(0px) } 50% { transform: translateY(-5px) } }
  @keyframes pet-attn { 0%,100% { transform: translateY(0) rotate(0deg) scale(1) } 25% { transform: translateY(-7px) rotate(-9deg) scale(1.07) } 75% { transform: translateY(-7px) rotate(9deg) scale(1.07) } }
  @keyframes pet-ping { 0% { transform: scale(1); opacity: 0.9 } 100% { transform: scale(2.6); opacity: 0 } }
  @keyframes draven-think { 0%,66% { opacity: 1 } 33%,100% { opacity: 0.15 } }

  button { color: var(--text-primary); font-family: inherit; transition: opacity 0.12s, transform 0.12s ease, background 0.1s, color 0.1s, border-color 0.1s, box-shadow 0.12s; }
  button:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }

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
  input[type=range]::-moz-range-track {
    background: var(--bg-panel); height: 4px; border: 1px solid var(--border-color);
  }
  input[type=range]::-moz-range-thumb {
    width: 10px; height: 14px; border-radius: 0;
    background: var(--bg-window); border: 1px solid var(--border-color); cursor: ew-resize;
  }
  input[type=text], input[type=email], textarea {
    font-family: 'Share Tech Mono', monospace; font-size: 11px;
    background: var(--bg-panel); color: var(--text-primary);
    border: 1px solid var(--border-color); padding: 5px 7px;
    width: 100%; resize: none; outline: none;
    box-sizing: border-box;
  }
  input[type=text]:focus, input[type=email]:focus, textarea:focus {
    border-color: var(--bg-active);
  }
  * { box-sizing: border-box; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg-panel); }
  ::-webkit-scrollbar-thumb { background: var(--text-secondary); border: 1px solid var(--border-color); }

  /* ── Mobile (narrow viewport) ──────────────────────────────────────────────
     Windows are absolutely positioned at desktop pixel coords (some, like
     PhotoViewer's initX=672, sit fully off-screen below ~768px) and dragged/
     resized via mouse-only handlers with no touch equivalent — unusable as
     authored on a phone. Rather than touch-enable free-floating drag/resize
     (bad fit for touch anyway), each window is pinned near the top below this
     breakpoint, capped at 40% of viewport height so several stacked windows
     don't each swallow the whole screen — content beyond that clips and
     scrolls with a finger instead.

     Also bumps tap targets and the retro UI chrome's font sizes for
     legibility, per explicit direction that some visual tidiness can be
     traded for that. (A CSS zoom transform on the whole app was tried first —
     it scaled everything uniformly in one line, but broke layout badly:
     boxes sized in vw/vh don't scale with an ancestor's zoom, so the app's
     own 100vw/100vh root rendered at the wrong footprint. Explicit
     per-element overrides below are more code but don't have that failure
     mode.) Body copy itself (BODY_FS) is bumped in JS, not here — see its
     definition. Every rule here is scoped to the media query so nothing
     changes above it. */
  @media (max-width: 768px) {
    .win-root {
      position: fixed !important;
      top: 30px !important;
      left: 6px !important;
      right: 6px !important;
      bottom: auto !important;
      width: auto !important;
      height: 40vh !important;
      max-height: 40vh !important;
    }
    .win-box { height: 100% !important; display: flex !important; flex-direction: column !important; }
    .win-content { flex: 1 1 auto !important; min-height: 0 !important; overflow-y: auto !important; -webkit-overflow-scrolling: touch !important; }
    .resize-handle { display: none !important; }
    .win-maximize-btn { display: none !important; }

    .win-titlebar { height: 34px !important; padding: 0 10px !important; }
    .win-title-text { font-size: 12px !important; }
    .win-ctrl-btn { width: 26px !important; height: 26px !important; font-size: 15px !important; }

    .modal-box { width: calc(100vw - 32px) !important; max-width: 420px !important; }

    .system-bar { height: 30px !important; overflow-x: auto !important; }
    .sysbar-decorative { display: none !important; }
    .lang-btn { font-size: 12px !important; padding: 4px 9px !important; }

    .icon-box { width: 48px !important; height: 48px !important; }
    .icon-box svg { width: 22px !important; height: 22px !important; }
    /* Some dock labels (e.g. "ALEJANDRO SANCHO") are far wider than the
       48px icon column at the bumped font size — cap and wrap instead of
       letting them force the whole dock wider than the viewport. */
    .icon-label { font-size: 10px !important; max-width: 54px !important; white-space: normal !important; text-align: center !important; }
    .dock { height: 76px !important; gap: 8px !important; overflow-x: auto !important; }

    /* Matches the taller .system-bar/.dock above — the workspace's own
       top/bottom offsets are set inline against their old 20px/58px sizes. */
    .workspace { top: 30px !important; bottom: 76px !important; overflow-y: auto !important; -webkit-overflow-scrolling: touch !important; }
  }
`;

// ── Embed mode ────────────────────────────────────────────────────────────────
// True when loaded as the 3d-gateway's iframe (?embed=1). main.tsx also sets
// html[data-embed="1"] for CSS-handled overrides (--font-size, inputs).
const EMBED = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("embed");
// Body-copy baseline: bump 11→12.5 in embed mode so prose is legible after the
// gateway's ~0.9× CSS scale. Retro UI chrome (7-8px PX labels) is intentionally
// small and stays unchanged — it's decoration, not reading content.
const MOBILE = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
const BODY_FS = EMBED ? 12.5 : MOBILE ? 14 : 11;

// 3d-gateway passes its chosen language as ?lang=es|en|ca on the iframe src.
// localStorage can't carry this across origins (gateway and portfolio are
// separate Vercel deployments), so the URL param is the only inheritance
// channel — read once at load, same pattern as EMBED above.
const URL_LANG = (() => {
  if (typeof window === "undefined") return null;
  const l = new URLSearchParams(window.location.search).get("lang");
  return l === "es" || l === "en" || l === "ca" ? (l as Lang) : null;
})();

// ── Fonts ─────────────────────────────────────────────────────────────────────

const PX: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };
const MONO: React.CSSProperties = { fontFamily: "'Share Tech Mono', monospace" };
// Matches 3d-gateway's WelcomeSign text font — the project caps itself at 3
// fonts total (PX, MONO, this one), reused here instead of a 4th one-off.
const BOLDONSE: React.CSSProperties = { fontFamily: "'Boldonse', sans-serif" };

// ── SFX Engine — synthesized retro UI sounds (no audio files needed) ───────────

let sfxCtx: AudioContext | null = null;
let sfxGain: GainNode | null = null;
let desiredSfxVolume = 0.5;

function getSfx() {
  if (!sfxCtx) {
    sfxCtx = new AudioContext();
    sfxGain = sfxCtx.createGain();
    sfxGain.gain.value = desiredSfxVolume;
    sfxGain.connect(sfxCtx.destination);
  }
  if (sfxCtx.state === "suspended") sfxCtx.resume();
  return { ctx: sfxCtx, gain: sfxGain! };
}

function setSfxVolumeGain(v: number) {
  desiredSfxVolume = v;
  if (sfxGain) sfxGain.gain.value = v;
}

function beep(freqStart: number, freqEnd: number, duration: number, type: OscillatorType = "square", peak = 0.25) {
  const { ctx, gain } = getSfx();
  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freqStart, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 1), ctx.currentTime + duration);
  env.gain.setValueAtTime(peak, ctx.currentTime);
  env.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(env); env.connect(gain);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

const playClick = () => beep(1100, 850, 0.04, "square", 0.18);
const playOpen  = () => beep(480, 1200, 0.1, "square", 0.22);
const playClose = () => beep(900, 320, 0.1, "square", 0.22);

// ── Data ──────────────────────────────────────────────────────────────────────

const PHOTOS = [
  { src: "/photos/001.png", label: "001.PNG", date: "2026.06.30", size: "—", cam: "ASANCHO" },
  { src: "/photos/002.png", label: "002.PNG", date: "2025.10.31", size: "—", cam: "ASANCHO" },
  { src: "/photos/003-screenshot.png", label: "003.PNG", date: "2026.06.30", size: "—", cam: "ASANCHO" },
];

// ── Color palettes ────────────────────────────────────────────────────────────

interface PaletteVars { [key: string]: string }
interface Palette { name: string; accent: string; light: PaletteVars; dark: PaletteVars }

const PALETTES: Palette[] = [
  {
    name: "Y2K", accent: "#00b9be",
    light: {
      "--bg-main": "#f5f5f5", "--bg-window": "#ffffff", "--bg-panel": "#e8e8e8",
      "--bg-hover": "#ffb0a3", "--bg-active": "#00b9be", "--bg-dark": "#2a1a2a",
      "--text-primary": "#46425e", "--text-secondary": "#15788c", "--text-tertiary": "#999999",
      "--color-accent": "#00b9be", "--color-error": "#ff6973", "--border-color": "#46425e",
      "--titlebar-bg": "repeating-linear-gradient(90deg,#15788c 0,#15788c 1px,#1a5a70 1px,#1a5a70 2px)",
      "--titlebar-text": "#ffffff",
    },
    dark: {
      "--bg-main": "#14141c", "--bg-window": "#1c1c26", "--bg-panel": "#262631",
      "--bg-hover": "#3a2a30", "--bg-active": "#00d4da", "--bg-dark": "#0a0a0f",
      "--text-primary": "#e8e6f0", "--text-secondary": "#4dd9e0", "--text-tertiary": "#8888a0",
      "--color-accent": "#00d4da", "--color-error": "#ff8990", "--border-color": "#4a4860",
      "--titlebar-bg": "repeating-linear-gradient(90deg,#0d4854 0,#0d4854 1px,#0a2e38 1px,#0a2e38 2px)",
      "--titlebar-text": "#e8e6f0",
    },
  },
  {
    name: "DUSK", accent: "#9b72cf",
    light: {
      "--bg-main": "#f2f0f8", "--bg-window": "#faf9fe", "--bg-panel": "#e4e0f4",
      "--bg-hover": "#d4b8e8", "--bg-active": "#9b72cf", "--bg-dark": "#1a0a3a",
      "--text-primary": "#2d1b5e", "--text-secondary": "#7c5cbf", "--text-tertiary": "#9080c0",
      "--color-accent": "#9b72cf", "--color-error": "#cc4488", "--border-color": "#2d1b5e",
      "--titlebar-bg": "repeating-linear-gradient(90deg,#7c5cbf 0,#7c5cbf 1px,#5a3d99 1px,#5a3d99 2px)",
      "--titlebar-text": "#ffffff",
    },
    dark: {
      "--bg-main": "#15101f", "--bg-window": "#1d1729", "--bg-panel": "#281f38",
      "--bg-hover": "#43305a", "--bg-active": "#b48ee0", "--bg-dark": "#0a0614",
      "--text-primary": "#ece6f7", "--text-secondary": "#c9a8f0", "--text-tertiary": "#a89bc8",
      "--color-accent": "#b48ee0", "--color-error": "#e06aa8", "--border-color": "#4a3a66",
      "--titlebar-bg": "repeating-linear-gradient(90deg,#5a3d99 0,#5a3d99 1px,#3d2a66 1px,#3d2a66 2px)",
      "--titlebar-text": "#ece6f7",
    },
  },
  {
    name: "FOREST", accent: "#2e8b57",
    light: {
      "--bg-main": "#f0f5f0", "--bg-window": "#f8faf8", "--bg-panel": "#deeade",
      "--bg-hover": "#b8e0b8", "--bg-active": "#2e8b57", "--bg-dark": "#0a1f0a",
      "--text-primary": "#1b3a1b", "--text-secondary": "#388e3c", "--text-tertiary": "#7a9e7a",
      "--color-accent": "#2e8b57", "--color-error": "#c62828", "--border-color": "#1b3a1b",
      "--titlebar-bg": "repeating-linear-gradient(90deg,#2e8b57 0,#2e8b57 1px,#1b5e20 1px,#1b5e20 2px)",
      "--titlebar-text": "#ffffff",
    },
    dark: {
      "--bg-main": "#0d160d", "--bg-window": "#121f12", "--bg-panel": "#1a2e1a",
      "--bg-hover": "#234d23", "--bg-active": "#4caf7d", "--bg-dark": "#060d06",
      "--text-primary": "#e2f0e2", "--text-secondary": "#6fd98f", "--text-tertiary": "#84a884",
      "--color-accent": "#4caf7d", "--color-error": "#e05a5a", "--border-color": "#2e4a2e",
      "--titlebar-bg": "repeating-linear-gradient(90deg,#1b5e20 0,#1b5e20 1px,#123d15 1px,#123d15 2px)",
      "--titlebar-text": "#e2f0e2",
    },
  },
  {
    name: "SUNSET", accent: "#e05d2e",
    light: {
      "--bg-main": "#fef5ec", "--bg-window": "#fffaf6", "--bg-panel": "#fde8d4",
      "--bg-hover": "#ffccaa", "--bg-active": "#e05d2e", "--bg-dark": "#2a0a00",
      "--text-primary": "#5c1a00", "--text-secondary": "#c04010", "--text-tertiary": "#aa8870",
      "--color-accent": "#e05d2e", "--color-error": "#cc0000", "--border-color": "#5c1a00",
      "--titlebar-bg": "repeating-linear-gradient(90deg,#e05d2e 0,#e05d2e 1px,#b83a10 1px,#b83a10 2px)",
      "--titlebar-text": "#ffffff",
    },
    dark: {
      "--bg-main": "#1a0f08", "--bg-window": "#21140b", "--bg-panel": "#2e1c10",
      "--bg-hover": "#4d2c18", "--bg-active": "#ff7a45", "--bg-dark": "#100a05",
      "--text-primary": "#fbe8da", "--text-secondary": "#ff9a5c", "--text-tertiary": "#bd9d80",
      "--color-accent": "#ff7a45", "--color-error": "#ff5a3a", "--border-color": "#5c3a20",
      "--titlebar-bg": "repeating-linear-gradient(90deg,#b83a10 0,#b83a10 1px,#7a2608 1px,#7a2608 2px)",
      "--titlebar-text": "#fbe8da",
    },
  },
  {
    name: "MONO", accent: "#222323",
    light: {
      "--bg-main": "#f0f6f0", "--bg-window": "#f0f6f0", "--bg-panel": "#e6ebe6",
      "--bg-hover": "#dce2dc", "--bg-active": "#222323", "--bg-dark": "#222323",
      "--text-primary": "#222323", "--text-secondary": "#222323", "--text-tertiary": "#888888",
      "--color-accent": "#222323", "--color-error": "#222323", "--border-color": "#222323",
      "--titlebar-bg": "#222323", "--titlebar-text": "#f0f6f0",
    },
    dark: {
      "--bg-main": "#16171c", "--bg-window": "#16171c", "--bg-panel": "#20222a",
      "--bg-hover": "#2c2f38", "--bg-active": "#f0f6f0", "--bg-dark": "#f0f6f0",
      "--text-primary": "#f0f6f0", "--text-secondary": "#f0f6f0", "--text-tertiary": "#888888",
      "--color-accent": "#f0f6f0", "--color-error": "#f0f6f0", "--border-color": "#f0f6f0",
      "--titlebar-bg": "#f0f6f0", "--titlebar-text": "#16171c",
    },
  },
];

type BgPattern = "flat" | "grid" | "dots" | "scanlines";

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useResizable(initW: number, minW = 160, minH = 120, initH: number | null = null) {
  const [w, setW] = useState(initW);
  // null = natural/auto height (untouched) — only becomes a fixed px value once
  // the visitor actually drags the corner handle vertically, so windows that
  // are never resized look pixel-identical to before this existed. A window
  // whose content used to be capped by its own inner max-height (see Win's
  // initHeight prop) passes that same number as initH so it keeps its exact
  // prior default size but is now genuinely resizable rather than internally
  // double-scrolling.
  const [h, setH] = useState<number | null>(initH);
  const drag = useRef({ on: false, startX: 0, startY: 0, startW: 0, startH: 0 });
  // Points at the content wrapper so its live rendered height can be used as
  // the drag baseline the first time h is still null.
  const boxRef = useRef<HTMLDivElement>(null);

  const onResizeDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const startH = h ?? boxRef.current?.getBoundingClientRect().height ?? minH;
    drag.current = { on: true, startX: e.clientX, startY: e.clientY, startW: w, startH };
  }, [w, h, minH]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!drag.current.on) return;
      setW(Math.max(minW, drag.current.startW + e.clientX - drag.current.startX));
      setH(Math.max(minH, drag.current.startH + e.clientY - drag.current.startY));
    };
    const onUp = () => { drag.current.on = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [minW, minH]);

  return { w, h, onResizeDown, boxRef };
}

function useDraggable(init: { x: number; y: number }) {
  const [pos, setPos] = useState(init);
  const drag = useRef({ on: false, ox: 0, oy: 0, sx: 0, sy: 0 });

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as Element).closest("button, input, select, a, textarea")) return;
    drag.current = { on: true, ox: e.clientX, oy: e.clientY, sx: pos.x, sy: pos.y };
    e.preventDefault();
  }, [pos.x, pos.y]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!drag.current.on) return;
      setPos({ x: drag.current.sx + e.clientX - drag.current.ox, y: drag.current.sy + e.clientY - drag.current.oy });
    };
    const onUp = () => { drag.current.on = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  return { pos, onMouseDown };
}

function useClock() {
  const [t, setT] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id); }, []);
  return t;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const TITLEBAR: React.CSSProperties = { background: "var(--titlebar-bg)" };

function fmtSecs(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

// ── CtrlBtn ───────────────────────────────────────────────────────────────────

function CtrlBtn({ children, onClick, w = 28, h = 22, active = false, title }: {
  children: React.ReactNode; onClick?: () => void;
  w?: number; h?: number; active?: boolean; title?: string;
}) {
  const [pressed, setPressed] = useState(false);
  const down = pressed || active;
  return (
    <button title={title} onClick={() => { playClick(); onClick?.(); }}
      onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)} onMouseLeave={() => setPressed(false)}
      style={{
        width: w, height: h,
        background: down ? "var(--bg-active)" : "var(--bg-panel)",
        color: down ? "var(--bg-window)" : "var(--text-primary)",
        border: "1px solid var(--border-color)", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: down ? "inset 1px 1px 0 rgba(0,0,0,0.25)" : "none",
        transform: down ? "translateY(1px)" : "none",
        transition: "background 0.05s, transform 0.05s, color 0.05s", flexShrink: 0,
      }}>
      {children}
    </button>
  );
}

// ── Win ───────────────────────────────────────────────────────────────────────

interface WinProps {
  title: string; width: number; initX: number; initY: number;
  zIndex: number; onFocus: () => void; children: React.ReactNode;
  statusBar?: React.ReactNode; open?: boolean; onClose?: () => void;
  resizable?: boolean;
  // Only for windows whose content used to be capped by its own inner
  // max-height (NotesWin/AboutWin/BlogWin) — keeps their existing default
  // size while making the outer chrome (not an inner scroll box) the thing
  // that actually grows when resized.
  initHeight?: number;
}

function Win({ title, width, initX, initY, zIndex, onFocus, children, statusBar, open, onClose, resizable, initHeight }: WinProps) {
  const { pos, onMouseDown } = useDraggable({ x: initX, y: initY });
  const { w, h, onResizeDown, boxRef } = useResizable(width, 180, 120, initHeight ?? null);
  const [minimized, setMinimized] = useState(false);
  const [internalClosed, setInternalClosed] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const activeZ = useContext(ActiveWinContext);
  const isActive = zIndex === activeZ;

  useEffect(() => { if (open) setMinimized(false); }, [open]);

  const closed = onClose !== undefined ? !open : internalClosed;
  if (closed) return null;
  const handleClose = () => { playClose(); if (onClose) onClose(); else setInternalClosed(true); };
  const currentWidth = resizable ? w : width;
  const toggleMaximize = () => { playClick(); setMaximized(v => !v); };

  const rootStyle: React.CSSProperties = maximized
    ? { position: "fixed", left: "5vw", top: "5vh", width: "90vw", height: "90vh", zIndex, userSelect: "none" }
    : { left: pos.x, top: pos.y, width: currentWidth, zIndex, userSelect: "none" };

  return (
    <div className="absolute win-root" style={rootStyle} onMouseDown={onFocus}>
      <div className="win-box" style={{
        border: `1px solid ${isActive ? "var(--bg-active)" : "var(--border-color)"}`,
        // A same-color border swap alone is invisible in MONO, whose
        // --bg-active equals --border-color by design — the glow reads
        // against --bg-main (the desktop behind the window) instead, so it
        // stays visible even when the border color itself doesn't change.
        boxShadow: isActive ? "0 0 0 1px var(--bg-active), 0 0 12px 1px var(--bg-active)" : "none",
        background: "var(--bg-window)", position: "relative",
        ...(maximized ? { height: "100%", display: "flex", flexDirection: "column" } : {}),
      }}>
        <div className="win-titlebar" onMouseDown={maximized ? undefined : onMouseDown} style={{ ...TITLEBAR, height: 22, borderBottom: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6px", cursor: maximized ? "default" : "move" }}>
          <span className="win-title-text" style={{ ...PX, fontSize: 9, color: "var(--titlebar-text)", textTransform: "uppercase", letterSpacing: "0.04em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "calc(100% - 52px)" }}>
            {title}
          </span>
          <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
            <button className="win-ctrl-btn" onClick={() => { playClick(); setMinimized(v => !v); }} style={{ width: 13, height: 13, background: "var(--bg-panel)", border: "1px solid var(--border-color)", cursor: "pointer", fontSize: 10, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>–</button>
            <button className="win-ctrl-btn win-maximize-btn" title={maximized ? "Restore" : "Maximize"} onClick={toggleMaximize} style={{ width: 13, height: 13, background: "var(--bg-panel)", border: "1px solid var(--border-color)", cursor: "pointer", fontSize: 9, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>{maximized ? "❐" : "□"}</button>
            <button className="win-ctrl-btn" onClick={handleClose}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--color-error)"; e.currentTarget.style.color = "var(--bg-window)"; e.currentTarget.style.transform = "scale(1.18)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--bg-panel)"; e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.transform = "scale(1)"; }}
              style={{ width: 13, height: 13, background: "var(--bg-panel)", color: "var(--text-primary)", border: "1px solid var(--border-color)", cursor: "pointer", fontSize: 10, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          </div>
        </div>
        {!minimized && (
          <>
            <div ref={boxRef} className="win-content" style={maximized ? { flex: "1 1 auto", minHeight: 0, overflowY: "auto" } : (resizable && h != null ? { height: h, overflowY: "auto" } : undefined)}>
              {children}
            </div>
            {statusBar && (
              <div style={{ borderTop: "1px solid var(--border-color)", background: "var(--bg-window)", padding: "2px 8px", ...PX, fontSize: 8, color: "var(--text-secondary)", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden" }}>
                {statusBar}
              </div>
            )}
            {resizable && !maximized && (
              <div
                onMouseDown={onResizeDown}
                title="Resize"
                className="resize-handle"
                style={{
                  position: "absolute", bottom: 0, right: 0,
                  width: 14, height: 14, cursor: "nwse-resize",
                  backgroundImage: "radial-gradient(circle, var(--text-tertiary) 1px, transparent 1px)",
                  backgroundSize: "4px 4px", backgroundPosition: "1px 1px",
                  opacity: 0.55,
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Modal (non-draggable overlay) ─────────────────────────────────────────────

function Modal({ title, onClose, children, width = 360 }: { title: string; onClose: () => void; children: React.ReactNode; width?: number }) {
  const handleClose = () => { playClose(); onClose(); };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.45)" }}
      onClick={handleClose}>
      <div className="modal-box" style={{ width, background: "var(--bg-window)", border: "2px solid var(--border-color)", boxShadow: "4px 4px 0 var(--border-color)" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ ...TITLEBAR, height: 24, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px" }}>
          <span style={{ ...PX, fontSize: 9, color: "var(--titlebar-text)", textTransform: "uppercase" }}>{title}</span>
          <button onClick={handleClose}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--color-error)"; (e.currentTarget as HTMLElement).style.color = "var(--bg-window)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-panel)"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
            style={{ width: 14, height: 14, background: "var(--bg-panel)", color: "var(--text-primary)", border: "1px solid var(--border-color)", cursor: "pointer", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Fatal Error Modal ─────────────────────────────────────────────────────────

function FatalErrorModal({ onGoToProjects }: { onGoToProjects: () => void }) {
  const { t } = useLang();
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.65)" }}>
      <div className="modal-box" style={{ width: 340, background: "#1a0000", border: "2px solid #ff3b3b", boxShadow: "0 0 0 4px #000, 6px 6px 0 rgba(0,0,0,0.4)" }}>
        <div style={{ background: "repeating-linear-gradient(90deg,#ff3b3b 0,#ff3b3b 1px,#8a0000 1px,#8a0000 2px)", height: 24, display: "flex", alignItems: "center", padding: "0 8px", gap: 6 }}>
          <AlertTriangle size={12} strokeWidth={2} style={{ color: "#fff" }}/>
          <span style={{ ...PX, fontSize: 9, color: "#fff", letterSpacing: 1 }}>{t.fatalError.title}</span>
        </div>
        <div style={{ padding: "20px 20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
            <AlertTriangle size={36} strokeWidth={1.5} style={{ color: "#ff3b3b", animation: "led-blink 1.2s ease-in-out infinite" }}/>
          </div>
          <div style={{ ...PX, fontSize: 9, color: "#ff6a6a", textAlign: "center", marginBottom: 14, lineHeight: 1.7 }}>
            {t.fatalError.subtitle}
          </div>
          <div style={{ ...MONO, fontSize: 12, color: "#ffd9d9", lineHeight: 1.8, textAlign: "center", marginBottom: 22 }}>
            {t.fatalError.body}
          </div>
          <button onClick={() => { playOpen(); onGoToProjects(); }}
            style={{ display: "block", width: "100%", padding: "12px 0", background: "#ff3b3b", border: "2px solid #ff3b3b", cursor: "pointer", ...PX, fontSize: 8, color: "#1a0000", letterSpacing: 1 }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
            {t.fatalError.cta}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Music Visualizer ──────────────────────────────────────────────────────────

function MusicVisualizer({ zIndex, onFocus, open, onClose, volume, onVolumeChange, autoplay }: {
  zIndex: number; onFocus: () => void; open?: boolean; onClose?: () => void;
  volume: number; onVolumeChange: (v: number) => void; autoplay?: boolean;
}) {
  const scopeRef = useRef<HTMLCanvasElement>(null);
  const barsRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const actxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const rafRef = useRef<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const peaksRef = useRef(new Float32Array(64));
  const colorsRef = useRef({ accent: "#00b9be", secondary: "#15788c" });
  const activeIdxRef = useRef(-1);

  const [playing, setPlaying] = useState(false);
  const [trackName, setTrackName] = useState("");
  const [duration, setDuration] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [ready, setReady] = useState(false);
  const [dropping, setDropping] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const { t } = useLang();

  useEffect(() => {
    const sync = () => {
      const s = getComputedStyle(document.documentElement);
      colorsRef.current = {
        accent: s.getPropertyValue("--bg-active").trim() || "#00b9be",
        secondary: s.getPropertyValue("--text-secondary").trim() || "#15788c",
      };
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "style"] });
    return () => obs.disconnect();
  }, []);

  const setupAudio = useCallback((src: string, displayName: string, onEnded?: () => void) => {
    audioRef.current?.pause();
    cancelAnimationFrame(rafRef.current);
    if (!actxRef.current || actxRef.current.state === "closed") actxRef.current = new AudioContext();
    const actx = actxRef.current;
    const audio = new Audio(src);
    audioRef.current = audio;
    const analyser = actx.createAnalyser();
    analyser.fftSize = 2048; analyser.smoothingTimeConstant = 0.82;
    analyserRef.current = analyser;
    peaksRef.current = new Float32Array(64);
    const gain = actx.createGain();
    gain.gain.value = gainRef.current?.gain.value ?? volume;
    gainRef.current = gain;
    actx.createMediaElementSource(audio).connect(analyser);
    analyser.connect(gain); gain.connect(actx.destination);
    audio.addEventListener("loadedmetadata", () => { setDuration(audio.duration); setReady(true); });
    audio.addEventListener("timeupdate", () => setElapsed(audio.currentTime));
    audio.addEventListener("ended", () => { setPlaying(false); onEnded?.(); });
    setTrackName(displayName); setElapsed(0); setReady(false); setPlaying(false);
  }, []); // eslint-disable-line

  const loadTrack = useCallback((idx: number) => {
    const t = BUILTIN_TRACKS[idx]; if (!t) return;
    activeIdxRef.current = idx; setActiveIdx(idx);
    setupAudio(t.src, t.name, () => { loadTrack((activeIdxRef.current + 1) % BUILTIN_TRACKS.length); });
  }, [setupAudio]);

  const loadFile = useCallback((file: File) => {
    if (!file.type.startsWith("audio/") && !/\.(mp3|wav|ogg|flac|aac|m4a)$/i.test(file.name)) return;
    activeIdxRef.current = -1; setActiveIdx(-1);
    setupAudio(URL.createObjectURL(file), file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ").toUpperCase());
  }, [setupAudio]);

  useEffect(() => { if (BUILTIN_TRACKS.length > 0) loadTrack(0); }, []); // eslint-disable-line

  useEffect(() => { if (gainRef.current) gainRef.current.gain.value = volume; }, [volume]);

  const togglePlay = async () => {
    const audio = audioRef.current; if (!audio || !ready) return;
    if (actxRef.current?.state === "suspended") await actxRef.current.resume();
    if (playing) { audio.pause(); setPlaying(false); }
    else { await audio.play(); setPlaying(true); }
  };

  useEffect(() => {
    if (autoplay && ready && !playing) { togglePlay(); }
  }, [autoplay, ready]); // eslint-disable-line

  const skipPrev = () => { if (activeIdx >= 0) loadTrack((activeIdx - 1 + BUILTIN_TRACKS.length) % BUILTIN_TRACKS.length); };
  const skipNext = () => { if (activeIdx >= 0) loadTrack((activeIdx + 1) % BUILTIN_TRACKS.length); };

  useEffect(() => {
    const scope = scopeRef.current; const bars = barsRef.current;
    if (!scope || !bars) return;
    const sc = scope.getContext("2d")!; const bc = bars.getContext("2d")!;
    const BAR_N = 64;
    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      const analyser = analyserRef.current; const { accent, secondary } = colorsRef.current;
      const sw = scope.width, sh = scope.height; const bw = bars.width, bh = bars.height;
      sc.fillStyle = "rgba(10,6,15,0.22)"; sc.fillRect(0, 0, sw, sh);
      sc.strokeStyle = "rgba(0,185,190,0.07)"; sc.lineWidth = 0.5;
      for (let gx = 0; gx <= sw; gx += sw / 8) { sc.beginPath(); sc.moveTo(gx, 0); sc.lineTo(gx, sh); sc.stroke(); }
      for (let gy = 0; gy <= sh; gy += sh / 4) { sc.beginPath(); sc.moveTo(0, gy); sc.lineTo(sw, gy); sc.stroke(); }
      if (analyser && playing) {
        const td = new Uint8Array(analyser.fftSize); analyser.getByteTimeDomainData(td);
        sc.shadowBlur = 14; sc.shadowColor = accent; sc.strokeStyle = accent; sc.lineWidth = 2;
        sc.beginPath();
        for (let i = 0; i < td.length; i++) { const y = (td[i] / 128) * (sh / 2); i === 0 ? sc.moveTo(0, y) : sc.lineTo(i * (sw / td.length), y); }
        sc.stroke(); sc.shadowBlur = 0;
      } else {
        const t = Date.now() / 1200; sc.strokeStyle = accent; sc.globalAlpha = 0.35; sc.lineWidth = 1.5;
        sc.beginPath(); sc.moveTo(0, sh / 2);
        for (let x = 0; x < sw; x++) sc.lineTo(x, sh / 2 + Math.sin((x / sw) * Math.PI * 6 + t) * (ready ? 5 : 1.5));
        sc.stroke(); sc.globalAlpha = 1;
      }
      bc.fillStyle = "rgba(10,6,15,0.3)"; bc.fillRect(0, 0, bw, bh);
      if (analyser && playing) {
        const fd = new Uint8Array(analyser.frequencyBinCount); analyser.getByteFrequencyData(fd);
        const binSz = Math.floor(fd.length / BAR_N); const barW = (bw / BAR_N) - 1; const peaks = peaksRef.current;
        for (let i = 0; i < BAR_N; i++) {
          let s = 0; for (let j = 0; j < binSz; j++) s += fd[i * binSz + j];
          const norm = (s / binSz) / 255; const h = norm * bh; const x = i * (barW + 1);
          peaks[i] = norm > peaks[i] ? norm : Math.max(0, peaks[i] - 0.013);
          bc.fillStyle = i % 2 === 0 ? secondary : accent; bc.fillRect(x, bh - h, barW, h);
          bc.fillStyle = "#ffffff"; bc.globalAlpha = 0.75; bc.fillRect(x, bh - peaks[i] * bh - 1, barW, 1); bc.globalAlpha = 1;
        }
      } else {
        const barW = (bw / BAR_N) - 1;
        for (let i = 0; i < BAR_N; i++) {
          const h = Math.sin(Date.now() / 900 + i * 0.45) * 2 + 3;
          bc.fillStyle = i % 2 === 0 ? secondary : accent; bc.globalAlpha = 0.25;
          bc.fillRect(i * (barW + 1), bh - h, barW, h); bc.globalAlpha = 1;
        }
      }
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, ready]);

  useEffect(() => () => { cancelAnimationFrame(rafRef.current); audioRef.current?.pause(); actxRef.current?.close(); }, []);

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = Number(e.target.value); setElapsed(t); if (audioRef.current) audioRef.current.currentTime = t;
  };

  return (
    <Win title={t.music.title} width={480} initX={760} initY={45} zIndex={zIndex} onFocus={onFocus} open={open} onClose={onClose}
      statusBar={ready ? `${playing ? "▶" : "■"} ${trackName.slice(0, 26)} · ${fmtSecs(elapsed)} / ${fmtSecs(duration)}` : t.music.noSignal}>
      <div style={{ position: "relative", background: "#0a060f", borderBottom: "1px solid var(--border-color)" }}>
        <canvas ref={scopeRef} width={478} height={120} style={{ display: "block", width: "100%", height: 120 }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.18) 2px,rgba(0,0,0,0.18) 3px)" }} />
        <span style={{ position: "absolute", top: 4, left: 6, ...PX, fontSize: 7, color: "rgba(0,185,190,0.4)" }}>{t.music.oscilloscope}</span>
      </div>
      <div style={{ position: "relative", background: "#0a060f", borderBottom: "1px solid var(--border-color)" }}>
        <canvas ref={barsRef} width={478} height={80} style={{ display: "block", width: "100%", height: 80 }} />
        <span style={{ position: "absolute", top: 4, left: 6, ...PX, fontSize: 7, color: "rgba(0,185,190,0.4)" }}>{t.music.spectrum}</span>
      </div>
      <div style={{ padding: "6px 8px 4px", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ ...MONO, fontSize: 11, color: "var(--text-secondary)", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {trackName || t.music.noTrack}
        </div>
        <input type="range" min={0} max={duration || 1} value={elapsed} step={0.1} onChange={seek} style={{ height: 14, opacity: ready ? 1 : 0.3 }} disabled={!ready} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2, ...PX, fontSize: 7, color: "var(--text-tertiary)" }}>
          <span>{fmtSecs(elapsed)}</span><span>{duration ? fmtSecs(duration) : "--:--"}</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 8px", background: "var(--bg-panel)", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ display: "flex", gap: 4 }}>
          <CtrlBtn onClick={skipPrev} w={26} h={22}><SkipBack size={9} strokeWidth={2} /></CtrlBtn>
          <CtrlBtn onClick={togglePlay} w={36} h={22} active={playing}>{playing ? <Pause size={11} strokeWidth={2} /> : <Play size={11} strokeWidth={2} />}</CtrlBtn>
          <CtrlBtn onClick={skipNext} w={26} h={22}><SkipForward size={9} strokeWidth={2} /></CtrlBtn>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <VolumeX size={9} strokeWidth={1.5} style={{ color: "var(--text-secondary)" }} />
          <input type="range" min={0} max={1} step={0.01} value={volume} onChange={e => onVolumeChange(Number(e.target.value))} style={{ width: 80, height: 14 }} />
          <Volume2 size={9} strokeWidth={1.5} style={{ color: "var(--text-secondary)" }} />
        </div>
        <span style={{ ...PX, fontSize: 7, color: playing ? "var(--bg-active)" : "var(--text-tertiary)" }}>
          {playing ? t.music.live : ready ? t.music.ready : t.music.idle}
        </span>
      </div>
      {BUILTIN_TRACKS.length > 0 && (
        <div style={{ borderBottom: "1px solid var(--border-color)" }}>
          {BUILTIN_TRACKS.map((t, i) => (
            <button key={i} onClick={() => loadTrack(i)}
              style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 8, height: 24, padding: "0 8px", background: i === activeIdx ? "var(--bg-active)" : i % 2 === 0 ? "var(--bg-window)" : "var(--bg-panel)", borderBottom: i < BUILTIN_TRACKS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none", cursor: "pointer", border: "none", ...PX, fontSize: 8, textTransform: "uppercase" }}>
              <span style={{ color: i === activeIdx ? "var(--bg-window)" : "var(--text-tertiary)", minWidth: 16 }}>{i === activeIdx && playing ? "▶" : `${i + 1}.`}</span>
              <span style={{ color: i === activeIdx ? "var(--bg-window)" : "var(--text-primary)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textTransform: "none" }}>{t.name}</span>
              {t.artist && <span style={{ color: i === activeIdx ? "var(--bg-window)" : "var(--text-secondary)", ...MONO, fontSize: 10 }}>{t.artist}</span>}
            </button>
          ))}
        </div>
      )}
      <div onDragOver={e => { e.preventDefault(); setDropping(true); }} onDragLeave={() => setDropping(false)}
        onDrop={e => { e.preventDefault(); setDropping(false); const f = e.dataTransfer.files[0]; if (f) loadFile(f); }}
        onClick={() => fileInputRef.current?.click()}
        style={{ padding: "8px", textAlign: "center", background: dropping ? "var(--bg-hover)" : "var(--bg-window)", cursor: "pointer", transition: "background 0.1s" }}>
        <input ref={fileInputRef} type="file" accept="audio/*,.mp3,.wav,.ogg,.flac,.aac,.m4a" style={{ display: "none" }}
          onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f); e.target.value = ""; }} />
        <div style={{ ...PX, fontSize: 7, color: dropping ? "var(--text-primary)" : "var(--text-secondary)" }}>
          {dropping ? t.music.dropToLoad : t.music.dropFile}
        </div>
      </div>
    </Win>
  );
}

// ── Photo Viewer ──────────────────────────────────────────────────────────────

function PhotoViewer({ zIndex, onFocus, open, onClose }: { zIndex: number; onFocus: () => void; open?: boolean; onClose?: () => void }) {
  const [idx, setIdx] = useState(0);
  const [zoom, setZoom] = useState(1);
  const { t } = useLang();
  const photo = PHOTOS[idx];
  const baseWidth = 254;
  const baseImgHeight = 172;
  const winWidth = baseWidth + (zoom - 1) * 100;
  const imgHeight = baseImgHeight + (zoom - 1) * 80;

  // Left/Right arrows browse photos, but only while this window is the one
  // actually on top — otherwise arrow keys typed elsewhere (chat input,
  // another window) would silently flip photos in the background.
  const activeZ = useContext(ActiveWinContext);
  const isActive = !!open && zIndex === activeZ;
  useEffect(() => {
    if (!isActive) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { playClick(); setIdx(i => (i - 1 + PHOTOS.length) % PHOTOS.length); }
      else if (e.key === "ArrowRight") { playClick(); setIdx(i => (i + 1) % PHOTOS.length); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isActive]);

  return (
    <Win title={`PHOTO_VIEWER — ${photo.label}`} width={winWidth} initX={110} initY={90} zIndex={zIndex} onFocus={onFocus} open={open} onClose={onClose} statusBar={`${idx + 1} OF ${PHOTOS.length} · ${zoom}× · RGB · 24BIT`}>
      <div style={{ height: imgHeight, borderBottom: "1px solid var(--border-color)", overflow: "hidden", background: "var(--bg-dark)", transition: "height 0.15s" }}>
        <img src={photo.src} alt={photo.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 8px", borderBottom: "1px solid var(--border-color)", background: "var(--bg-panel)" }}>
        <span style={{ ...PX, fontSize: 7, color: "var(--text-secondary)", marginRight: "auto" }}>{t.photo.zoom}</span>
        {[1, 2, 3, 4].map(zVal => (
          <CtrlBtn key={zVal} onClick={() => setZoom(zVal)} active={zoom === zVal} w={24} h={16}>
            <span style={{ ...PX, fontSize: 6 }}>{zVal}×</span>
          </CtrlBtn>
        ))}
      </div>
      <div style={{ padding: "5px 8px", borderBottom: "1px solid var(--border-color)" }}>
        {([[t.photo.lblFile, photo.label], [t.photo.lblDate, photo.date], [t.photo.lblDims, photo.size], [t.photo.lblCamera, photo.cam]] as [string, string][]).map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", ...PX, fontSize: 8, lineHeight: "2.2", color: "var(--text-primary)" }}>
            <span style={{ color: "var(--text-secondary)" }}>{k}</span><span>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 8px" }}>
        <CtrlBtn onClick={() => setIdx(i => (i - 1 + PHOTOS.length) % PHOTOS.length)} w={56} h={18}><span style={{ ...PX, fontSize: 8 }}>{t.photo.prev}</span></CtrlBtn>
        <span style={{ ...PX, fontSize: 8, color: "var(--text-secondary)" }}>{idx + 1} / {PHOTOS.length}</span>
        <CtrlBtn onClick={() => setIdx(i => (i + 1) % PHOTOS.length)} w={56} h={18}><span style={{ ...PX, fontSize: 8 }}>{t.photo.next}</span></CtrlBtn>
      </div>
    </Win>
  );
}

// ── My Projects ───────────────────────────────────────────────────────────────

// ── FS types ──────────────────────────────────────────────────────────────────

interface FsFolder { name: string; type: "folder"; date?: string; children: FsEntry[]; }
interface FsImage  { name: string; type: "image";  date?: string; src: string; }
interface FsVideo  { name: string; type: "video";  date?: string; src?: string; youtubeId?: string; }
interface FsTxt    { name: string; type: "txt";    date?: string; content: string; }
type FsEntry = FsFolder | FsImage | FsVideo | FsTxt;

// ── Project data (fill in real content here) — README content is language-aware,
// file/folder names stay constant across languages (they're filenames, not prose) ─

function getProjects(t: Strings): FsFolder {
  return {
    name: "MY_PROJECTS", type: "folder",
    children: [
      {
        name: "PROJECT_01",  type: "folder", date: "2025.01.01",
        children: [
          { name: "README.TXT",    type: "txt",   date: "2025.01.01", content: t.projectContent.project01 },
          { name: "OVERVIEW.MP4",  type: "video", date: "2025.01.02", src: "/projects/PROJECT_01/OVERVIEW.MP4" },
          { name: "RENDER_01.JPG", type: "image", date: "2025.01.03", src: "/projects/PROJECT_01/sword1.jpg" },
          { name: "RENDER_02.JPG", type: "image", date: "2025.01.04", src: "/projects/PROJECT_01/sword2.jpg" },
          { name: "RENDER_03.JPG", type: "image", date: "2025.01.05", src: "/projects/PROJECT_01/sword3.jpg" },
        ],
      },
      {
        name: "PROJECT_02",  type: "folder", date: "2025.02.01",
        children: [
          { name: "README.TXT",    type: "txt",   date: "2025.02.01", content: t.projectContent.project02 },
          { name: "OVERVIEW.MP4",  type: "video", date: "2025.02.02" },
          { name: "RENDER_01.JPG", type: "image", date: "2025.02.03", src: "/projects/PROJECT_02/axe1.webp" },
          { name: "RENDER_02.JPG", type: "image", date: "2025.02.04", src: "/projects/PROJECT_02/axe2.webp" },
          { name: "RENDER_03.JPG", type: "image", date: "2025.02.05", src: "/projects/PROJECT_02/axe3.webp" },
        ],
      },
      {
        name: "PROJECT_03",  type: "folder", date: "2026.01.01",
        children: [
          { name: "README.TXT",    type: "txt",   date: "2026.01.01", content: t.projectContent.project03 },
          { name: "OVERVIEW.MP4",  type: "video", date: "2026.01.02", src: "/projects/PROJECT_03/OVERVIEW.MP4" },
          { name: "RENDER_01.JPG", type: "image", date: "2026.01.03", src: "/projects/PROJECT_03/street1.webp" },
          { name: "RENDER_02.JPG", type: "image", date: "2026.01.04", src: "/projects/PROJECT_03/street2.webp" },
          { name: "RENDER_03.JPG", type: "image", date: "2026.01.05", src: "/projects/PROJECT_03/street3.webp" },
          { name: "RENDER_04.JPG", type: "image", date: "2026.01.06", src: "/projects/PROJECT_03/street4.webp" },
        ],
      },
    ],
  };
}

// ── File viewers ──────────────────────────────────────────────────────────────

interface ViewerProps { zIndex: number; onFocus: () => void; onClose: () => void; offsetIndex?: number }

function TxtViewerWin({ entry, zIndex, onFocus, onClose, offsetIndex = 0 }: { entry: FsTxt } & ViewerProps) {
  const { t } = useLang();
  return (
    <Win title={`${entry.name} ${t.fileViewer.notepadSuffix}`} width={280} initX={590 + offsetIndex * 22} initY={120 + offsetIndex * 22} zIndex={zIndex} onFocus={onFocus} open onClose={onClose}
      statusBar={`${entry.name} · UTF-8`} resizable>
      <div style={{ display: "flex", borderBottom: "1px solid var(--border-color)", background: "var(--bg-panel)" }}>
        {[t.fileViewer.fileMenu, t.fileViewer.editMenu].map(m => (
          <button key={m} style={{ ...PX, fontSize: 8, padding: "3px 7px", background: "transparent", border: "none", cursor: "pointer", color: "var(--text-primary)" }}>{m}</button>
        ))}
      </div>
      <div style={{ padding: "10px 12px", minHeight: 120, whiteSpace: "pre-wrap", ...MONO, fontSize: BODY_FS, color: "var(--text-primary)", lineHeight: 1.85 }}>
        {entry.content}
      </div>
    </Win>
  );
}

function VideoViewerWin({ entry, zIndex, onFocus, onClose, offsetIndex = 0 }: { entry: FsVideo } & ViewerProps) {
  const { t } = useLang();
  return (
    <Win title={`${entry.name} ${t.fileViewer.videoSuffix}`} width={420} initX={560 + offsetIndex * 22} initY={70 + offsetIndex * 22} zIndex={zIndex} onFocus={onFocus} open onClose={onClose}
      statusBar={entry.youtubeId ? `${entry.name} · YOUTUBE` : `${entry.name} · MP4`}>
      <div style={{ background: "#0a060f", minHeight: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {entry.youtubeId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${entry.youtubeId}`}
            title={entry.name}
            style={{ width: "100%", aspectRatio: "16/9", border: "none", display: "block" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : entry.src ? (
          <video src={entry.src} controls style={{ width: "100%", maxHeight: 400, display: "block" }}/>
        ) : (
          <div style={{ textAlign: "center", padding: 40 }}>
            <div style={{ width: 56, height: 56, border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
              <Film size={24} strokeWidth={1} style={{ color: "rgba(255,255,255,0.25)" }}/>
            </div>
            <div style={{ ...PX, fontSize: 7, color: "rgba(255,255,255,0.25)" }}>{t.fileViewer.noVideo}</div>
            <div style={{ ...MONO, fontSize: 10, color: "rgba(255,255,255,0.15)", marginTop: 6 }}>{t.fileViewer.noVideoHint}</div>
          </div>
        )}
      </div>
    </Win>
  );
}

function ImageViewerWin({ entry, zIndex, onFocus, onClose, offsetIndex = 0 }: { entry: FsImage } & ViewerProps) {
  const [zoom, setZoom] = useState(1);
  const { t } = useLang();
  const baseWidth = 400;
  const baseHeight = 320;
  const winWidth = baseWidth + (zoom - 1) * 160;
  const contentHeight = baseHeight + (zoom - 1) * 120;
  return (
    <Win title={`${entry.name} ${t.fileViewer.imageSuffix}`} width={winWidth} initX={570 + offsetIndex * 22} initY={90 + offsetIndex * 22} zIndex={zIndex} onFocus={onFocus} open onClose={onClose}
      statusBar={`${entry.name} · JPG · ${zoom}×`}>
      <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 8px", borderBottom: "1px solid var(--border-color)", background: "var(--bg-panel)" }}>
        <span style={{ ...PX, fontSize: 7, color: "var(--text-secondary)", marginRight: "auto" }}>{t.fileViewer.zoom}</span>
        {[1, 2, 3, 4].map(zVal => (
          <CtrlBtn key={zVal} onClick={() => setZoom(zVal)} active={zoom === zVal} w={26} h={18}>
            <span style={{ ...PX, fontSize: 7 }}>{zVal}×</span>
          </CtrlBtn>
        ))}
      </div>
      <div style={{ background: "#0a060f", height: contentHeight, display: "flex", alignItems: "center", justifyContent: "center", transition: "height 0.15s" }}>
        {entry.src ? (
          <img src={entry.src} alt={entry.name} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}/>
        ) : (
          <div style={{ textAlign: "center", padding: 40, margin: "auto" }}>
            <div style={{ width: 56, height: 56, border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
              <Image size={24} strokeWidth={1} style={{ color: "rgba(255,255,255,0.25)" }}/>
            </div>
            <div style={{ ...PX, fontSize: 7, color: "rgba(255,255,255,0.25)" }}>{t.fileViewer.noImage}</div>
            <div style={{ ...MONO, fontSize: 10, color: "rgba(255,255,255,0.15)", marginTop: 6 }}>{t.fileViewer.noImageHint}</div>
          </div>
        )}
      </div>
    </Win>
  );
}

// ── MyProjectsWin ─────────────────────────────────────────────────────────────

interface OpenWin { id: string; entry: FsEntry; z: number }

function MyProjectsWin({ zIndex, onFocus, open, onClose, getNextZ, autoNavigate }: { zIndex: number; onFocus: () => void; open?: boolean; onClose?: () => void; getNextZ: () => number; autoNavigate?: number }) {
  const [path, setPath] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [openWins, setOpenWins] = useState<OpenWin[]>([]);
  const stackCount = useRef(0);
  const lastAutoNav = useRef(autoNavigate);
  const { t } = useLang();
  const PROJECTS = getProjects(t);

  const currentFolder = path.reduce((node: FsFolder, seg) => {
    const child = node.children.find(c => c.name === seg);
    return (child?.type === "folder" ? child : node) as FsFolder;
  }, PROJECTS);

  // Resolves an open window's entry fresh from the current-language PROJECTS
  // tree by id (a "/"-joined path) — keeps already-open file content (e.g.
  // README.TXT) in sync when the visitor switches language mid-session,
  // instead of freezing it to whatever language was active when opened.
  const resolveEntry = (id: string): FsEntry | undefined => {
    const segs = id.split("/");
    let node: FsEntry = PROJECTS;
    for (const seg of segs) {
      if (node.type !== "folder") return undefined;
      const next = node.children.find(c => c.name === seg);
      if (!next) return undefined;
      node = next;
    }
    return node;
  };

  const openEntry = (entry: FsEntry) => {
    if (entry.type === "folder") { setPath(p => [...p, entry.name]); setSelected(null); return; }
    const id = [...path, entry.name].join("/");
    const z = getNextZ();
    setOpenWins(prev => {
      if (prev.some(w => w.id === id)) return prev.map(w => w.id === id ? { ...w, z } : w);
      stackCount.current += 1;
      return [...prev, { id, entry, z }];
    });
  };

  const closeWin = (id: string) => setOpenWins(prev => prev.filter(w => w.id !== id));
  const focusWin = (id: string) => {
    const z = getNextZ();
    setOpenWins(prev => prev.map(w => w.id === id ? { ...w, z } : w));
  };

  // Triggered by the FATAL ERROR modal's "GO TO MY PROJECTS" button — jumps
  // straight to the first project folder and opens its first render.
  useEffect(() => {
    if (autoNavigate === undefined || autoNavigate === lastAutoNav.current) return;
    lastAutoNav.current = autoNavigate;
    const firstProject = PROJECTS.children.find(c => c.type === "folder") as FsFolder | undefined;
    if (!firstProject) return;
    setPath([firstProject.name]);
    setSelected(null);
    const firstImage = firstProject.children.find(c => c.type === "image");
    if (firstImage) {
      const id = [firstProject.name, firstImage.name].join("/");
      const z = getNextZ();
      setOpenWins(prev => prev.some(w => w.id === id) ? prev : [...prev, { id, entry: firstImage, z }]);
    }
  }, [autoNavigate]); // eslint-disable-line

  const goBack = () => { setPath(p => p.slice(0, -1)); setSelected(null); };

  const pathLabel = [t.projects.root, ...path].join("  /  ");

  const typeIcon = (ty: FsEntry["type"]) =>
    ty === "folder" ? Folder : ty === "video" ? Film : ty === "image" ? Image : File;

  return (
    <>
      <Win title={t.projects.windowTitle} width={420} initX={100} initY={52} zIndex={zIndex} onFocus={onFocus} open={open} onClose={onClose}
        statusBar={`${currentFolder.children.length} ${t.projects.itemsSuffix}  ·  ${pathLabel}`}>

        {/* Breadcrumb toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 8px", borderBottom: "1px solid var(--border-color)", background: "var(--bg-panel)" }}>
          <CtrlBtn onClick={goBack} w={24} h={18}><ArrowLeft size={9} strokeWidth={2}/></CtrlBtn>
          <div style={{ width: 1, height: 14, background: "var(--border-color)" }}/>
          <span style={{ ...MONO, fontSize: 10, color: "var(--text-secondary)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {pathLabel}
          </span>
        </div>

        {/* Column headers */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 90px", borderBottom: "2px solid var(--border-color)", background: "var(--bg-panel)" }}>
          {[t.projects.nameCol, t.projects.typeCol, t.projects.dateCol].map(h => (
            <div key={h} style={{ ...PX, fontSize: 7, color: "var(--text-secondary)", padding: "4px 8px", textTransform: "uppercase", borderRight: "1px solid var(--border-color)" }}>
              {h}
            </div>
          ))}
        </div>

        {/* Entries */}
        <div style={{ minHeight: 220, maxHeight: 340, overflowY: "auto" }}>
          {currentFolder.children.length === 0 ? (
            <div style={{ padding: 24, textAlign: "center", ...MONO, fontSize: 11, color: "var(--text-tertiary)" }}>{t.projects.emptyFolder}</div>
          ) : currentFolder.children.map((entry, i) => {
            const IconComp = typeIcon(entry.type);
            const isSel = selected === entry.name;
            const isOpenFile = entry.type !== "folder" && openWins.some(w => w.id === [...path, entry.name].join("/"));
            return (
              <div key={i}
                style={{ display: "grid", gridTemplateColumns: "1fr 60px 90px", borderBottom: "1px solid rgba(0,0,0,0.06)", background: isOpenFile ? "var(--bg-active)" : isSel ? "var(--bg-hover)" : i % 2 === 0 ? "var(--bg-window)" : "var(--bg-panel)", cursor: "pointer", userSelect: "none" }}
                onClick={() => setSelected(entry.name)}
                onDoubleClick={() => openEntry(entry)}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px", height: 28 }}>
                  <IconComp size={11} strokeWidth={1.5} style={{ color: isOpenFile ? "var(--bg-window)" : entry.type === "folder" ? "var(--bg-active)" : "var(--text-secondary)", flexShrink: 0 }}/>
                  <span style={{ ...PX, fontSize: 8, color: isOpenFile ? "var(--bg-window)" : "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {entry.name}
                  </span>
                  {entry.type === "folder" && (
                    <span style={{ ...MONO, fontSize: 9, color: isOpenFile ? "var(--bg-window)" : "var(--text-tertiary)", marginLeft: "auto", flexShrink: 0 }}>
                      {(entry as FsFolder).children.length} {t.projects.itemsWord}
                    </span>
                  )}
                </div>
                <div style={{ ...PX, fontSize: 7, color: isOpenFile ? "var(--bg-window)" : "var(--text-tertiary)", padding: "0 8px", display: "flex", alignItems: "center", borderLeft: "1px solid rgba(0,0,0,0.06)" }}>
                  {entry.type.toUpperCase()}
                </div>
                <div style={{ ...PX, fontSize: 7, color: isOpenFile ? "var(--bg-window)" : "var(--text-tertiary)", padding: "0 8px", display: "flex", alignItems: "center", borderLeft: "1px solid rgba(0,0,0,0.06)" }}>
                  {entry.date ?? "—"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Hint bar */}
        <div style={{ padding: "3px 8px", borderTop: "1px solid var(--border-color)", background: "var(--bg-panel)", ...MONO, fontSize: 10, color: "var(--text-tertiary)" }}>
          {t.projects.hintBar}
        </div>
      </Win>

      {openWins.map((w, i) => {
        const off = i % 8;
        const entry = resolveEntry(w.id) ?? w.entry;
        const common = { zIndex: w.z, onFocus: () => focusWin(w.id), onClose: () => closeWin(w.id), offsetIndex: off };
        if (entry.type === "txt")   return <TxtViewerWin   key={w.id} entry={entry as FsTxt}   {...common}/>;
        if (entry.type === "video") return <VideoViewerWin key={w.id} entry={entry as FsVideo} {...common}/>;
        if (entry.type === "image") return <ImageViewerWin key={w.id} entry={entry as FsImage} {...common}/>;
        return null;
      })}
    </>
  );
}

// ── Notes / Diary ─────────────────────────────────────────────────────────────

function NotesWin({ zIndex, onFocus, open, onClose }: { zIndex: number; onFocus: () => void; open?: boolean; onClose?: () => void }) {
  const { t } = useLang();
  const [fontDelta, setFontDelta] = useState(0);
  const fs = BODY_FS + fontDelta;
  return (
    <Win title={t.notes.windowTitle} width={268} initX={500} initY={200} zIndex={zIndex} onFocus={onFocus} open={open} onClose={onClose} statusBar="LN 28  COL 1 · UTF-8 · CRLF" resizable initHeight={259}>
      <div style={{ display: "flex", borderBottom: "1px solid var(--border-color)", background: "var(--bg-panel)", alignItems: "center" }}>
        {[t.fileViewer.fileMenu, t.fileViewer.editMenu, t.fileViewer.formatMenu, t.fileViewer.viewMenu].map(m => (
          <button key={m} style={{ ...PX, fontSize: 8, padding: "3px 6px", background: "transparent", border: "none", cursor: "pointer", color: "var(--text-primary)", textTransform: "uppercase" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>{m}</button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 2, paddingRight: 4 }}>
          <button onClick={() => setFontDelta(d => Math.max(d - 1, -2))} style={{ ...PX, fontSize: 7, width: 16, height: 14, background: "transparent", border: "none", cursor: "pointer", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center" }}>A-</button>
          <button onClick={() => setFontDelta(d => Math.min(d + 1, 4))} style={{ ...PX, fontSize: 8, width: 16, height: 14, background: "transparent", border: "none", cursor: "pointer", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center" }}>A+</button>
        </div>
      </div>
      <div style={{ padding: "8px 10px", width: "100%", boxSizing: "border-box" }}>
        {t.notes.lines.map((line, i) => (
          <div key={i} style={{ ...MONO, fontSize: fs, lineHeight: 1.8, color: line.type === "comment" ? "var(--text-tertiary)" : line.type === "accent" ? "var(--text-secondary)" : "var(--text-primary)", whiteSpace: "pre-wrap", width: "100%" }}>
            {line.text || " "}
          </div>
        ))}
      </div>
    </Win>
  );
}

// ── System Info ───────────────────────────────────────────────────────────────

function SysInfo({ zIndex, onFocus, open, onClose }: { zIndex: number; onFocus: () => void; open?: boolean; onClose?: () => void }) {
  const { t } = useLang();
  const stack = [
    [t.sysInfo.lblFramework, "React 18 + TypeScript"],
    [t.sysInfo.lblBundler, "Vite 6"],
    [t.sysInfo.lblStyling, "Tailwind 4 + Inline CSS"],
    [t.sysInfo.lblUi, "shadcn/ui + Radix UI"],
    [t.sysInfo.lblAudio, "Web Audio API"],
    [t.sysInfo.lblFonts, "Press Start 2P · Share Tech Mono · Boldonse"],
    [t.sysInfo.lblPkgMgr, "pnpm"],
    [t.sysInfo.lblSource, "github.com/Nemestria"],
  ];
  return (
    <Win title={t.sysInfo.title} width={260} initX={620} initY={380} zIndex={zIndex} onFocus={onFocus} open={open} onClose={onClose} statusBar={t.sysInfo.statusBar}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderBottom: "1px solid var(--border-color)", background: "var(--bg-panel)" }}>
        <div style={{ width: 28, height: 28, background: "var(--bg-panel)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Monitor size={16} strokeWidth={1.5} />
        </div>
        <div>
          <div style={{ ...PX, fontSize: 9, color: "var(--text-primary)" }}>{t.sysInfo.techStack}</div>
          <div style={{ ...MONO, fontSize: 10, color: "var(--text-secondary)" }}>{t.sysInfo.version}</div>
        </div>
      </div>
      {stack.map(([k, v]) => (
        <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 8px", height: 20, borderBottom: "1px solid rgba(0,0,0,0.06)", ...PX, fontSize: 7 }}>
          <span style={{ color: "var(--text-secondary)" }}>{k}</span>
          <span style={{ color: "var(--text-primary)", ...MONO, fontSize: 10 }}>{v}</span>
        </div>
      ))}
      <div style={{ padding: "8px 10px" }}>
        <a href="https://github.com/Nemestria/" target="_blank" rel="noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-secondary)", textDecoration: "none", ...PX, fontSize: 8 }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--bg-active)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}>
          <ExternalLink size={10} strokeWidth={2} /> GITHUB.COM/NEMESTRIA
        </a>
      </div>
    </Win>
  );
}

// ── Contact Modal ─────────────────────────────────────────────────────────────

function ContactModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const { t } = useLang();

  const send = () => {
    const subject = encodeURIComponent(`Portfolio contact from ${name || "visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
    window.open(`mailto:asanchomarmol@gmail.com?subject=${subject}&body=${body}`);
    onClose();
  };

  const row = (label: string, el: React.ReactNode) => (
    <div style={{ marginBottom: 10 }}>
      <div style={{ ...PX, fontSize: 7, color: "var(--text-secondary)", marginBottom: 4, textTransform: "uppercase" }}>{label}</div>
      {el}
    </div>
  );

  return (
    <Modal title={t.contact.title} onClose={onClose}>
      <div style={{ padding: "14px 14px 10px" }}>
        {row(t.contact.name, <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t.contact.namePlaceholder} />)}
        {row(t.contact.email, <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t.contact.emailPlaceholder} />)}
        {row(t.contact.message, <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder={t.contact.messagePlaceholder} rows={5} />)}
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <button onClick={send}
            style={{ flex: 1, padding: "7px 0", background: "var(--bg-active)", border: "1px solid var(--border-color)", cursor: "pointer", ...PX, fontSize: 8, color: "var(--bg-window)", textTransform: "uppercase" }}>
            {t.contact.send}
          </button>
          <button onClick={onClose}
            style={{ padding: "7px 14px", background: "var(--bg-panel)", border: "1px solid var(--border-color)", cursor: "pointer", ...PX, fontSize: 8, color: "var(--text-primary)", textTransform: "uppercase" }}>
            {t.contact.cancel}
          </button>
        </div>
        <div style={{ ...MONO, fontSize: 10, color: "var(--text-tertiary)", marginTop: 8, textAlign: "center" }}>
          → asanchomarmol@gmail.com
        </div>
      </div>
    </Modal>
  );
}

// ── Network Modal ─────────────────────────────────────────────────────────────

function NetworkModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const { t } = useLang();

  return (
    <Modal title={t.network.title} onClose={onClose}>
      <div style={{ padding: "20px 14px" }}>
        {done ? (
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <div style={{ ...PX, fontSize: 9, color: "var(--bg-active)", marginBottom: 8 }}>{t.network.subscribed}</div>
            <div style={{ ...MONO, fontSize: 11, color: "var(--text-secondary)", marginBottom: 12, lineHeight: 1.7 }}>{t.network.subscribedBody}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              <a href="https://www.instagram.com/soyvertigo/" target="_blank" rel="noopener noreferrer"
                style={{ ...PX, fontSize: 8, color: "var(--bg-active)", textDecoration: "none", padding: "5px 10px", border: "1px solid var(--border-color)", background: "var(--bg-panel)", transition: "background 0.1s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-hover)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--bg-panel)")}>
                {t.network.instagram}
              </a>
              <a href="https://www.linkedin.com/in/environment-artist" target="_blank" rel="noopener noreferrer"
                style={{ ...PX, fontSize: 8, color: "var(--bg-active)", textDecoration: "none", padding: "5px 10px", border: "1px solid var(--border-color)", background: "var(--bg-panel)", transition: "background 0.1s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-hover)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--bg-panel)")}>
                {t.network.linkedin}
              </a>
            </div>
          </div>
        ) : (
          <>
            <div style={{ ...MONO, fontSize: 11, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.7 }}>
              {t.network.intro}
            </div>
            <div style={{ ...PX, fontSize: 7, color: "var(--text-secondary)", marginBottom: 4, textTransform: "uppercase" }}>{t.network.emailLabel}</div>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t.network.emailPlaceholder} style={{ marginBottom: 10 }} />
            <button onClick={() => { if (email) setDone(true); }}
              style={{ width: "100%", padding: "8px 0", background: "var(--bg-active)", border: "1px solid var(--border-color)", cursor: "pointer", ...PX, fontSize: 8, color: "var(--bg-window)", textTransform: "uppercase" }}>
              {t.network.subscribe}
            </button>
            <div style={{ ...MONO, fontSize: 10, color: "var(--text-tertiary)", marginTop: 8, textAlign: "center" }}>
              {t.network.footer}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

// ── Preferences Window ────────────────────────────────────────────────────────

function PrefsWin({ zIndex, onFocus, open, onClose, palette, onPalette, volume, onVolumeChange, sfxVolume, onSfxVolumeChange, bgPattern, onBgPattern, darkMode, onDarkMode }: {
  zIndex: number; onFocus: () => void; open?: boolean; onClose?: () => void;
  palette: string; onPalette: (name: string) => void;
  volume: number; onVolumeChange: (v: number) => void;
  sfxVolume: number; onSfxVolumeChange: (v: number) => void;
  bgPattern: BgPattern; onBgPattern: (p: BgPattern) => void;
  darkMode: boolean; onDarkMode: (v: boolean) => void;
}) {
  const { t } = useLang();
  const BG_OPTIONS: { name: BgPattern; label: string }[] = [
    { name: "flat",      label: t.prefs.bgFlat },
    { name: "grid",      label: t.prefs.bgGrid },
    { name: "dots",      label: t.prefs.bgDots },
    { name: "scanlines", label: t.prefs.bgLines },
  ];
  const section = (label: string) => (
    <div style={{ ...PX, fontSize: 7, color: "var(--text-secondary)", padding: "6px 10px 3px", textTransform: "uppercase", borderBottom: "1px solid var(--border-color)", background: "var(--bg-panel)" }}>
      {label}
    </div>
  );

  return (
    <Win title={t.prefs.title} width={300} initX={200} initY={100} zIndex={zIndex} onFocus={onFocus} open={open} onClose={onClose} statusBar={t.prefs.statusBar}>
      {section(t.prefs.displayMode)}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, padding: "10px" }}>
        <button onClick={() => onDarkMode(false)}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px 4px", background: !darkMode ? "var(--bg-active)" : "var(--bg-panel)", border: `1px solid ${!darkMode ? "var(--bg-active)" : "var(--border-color)"}`, cursor: "pointer", ...PX, fontSize: 7, color: !darkMode ? "var(--bg-window)" : "var(--text-primary)" }}>
          <Sun size={11} strokeWidth={2}/> {t.prefs.light}
        </button>
        <button onClick={() => onDarkMode(true)}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px 4px", background: darkMode ? "var(--bg-active)" : "var(--bg-panel)", border: `1px solid ${darkMode ? "var(--bg-active)" : "var(--border-color)"}`, cursor: "pointer", ...PX, fontSize: 7, color: darkMode ? "var(--bg-window)" : "var(--text-primary)" }}>
          <Moon size={11} strokeWidth={2}/> {t.prefs.dark}
        </button>
      </div>

      {section(t.prefs.colorPalette)}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, padding: "10px" }}>
        {PALETTES.map(p => (
          <button key={p.name} onClick={() => onPalette(p.name)}
            title={p.name}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "6px 4px", background: p.name === palette ? "var(--bg-active)" : "var(--bg-panel)", border: `1px solid ${p.name === palette ? "var(--bg-active)" : "var(--border-color)"}`, cursor: "pointer" }}>
            <div style={{ width: 24, height: 24, background: p.accent, border: "1px solid var(--border-color)" }} />
            <span style={{ ...PX, fontSize: 6, color: p.name === palette ? "var(--bg-window)" : "var(--text-primary)", textTransform: "uppercase" }}>{p.name}</span>
          </button>
        ))}
      </div>

      {section(t.prefs.background)}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, padding: "10px" }}>
        {BG_OPTIONS.map(bg => (
          <button key={bg.name} onClick={() => onBgPattern(bg.name)}
            style={{ padding: "6px 4px", background: bg.name === bgPattern ? "var(--bg-active)" : "var(--bg-panel)", border: `1px solid ${bg.name === bgPattern ? "var(--bg-active)" : "var(--border-color)"}`, cursor: "pointer", ...PX, fontSize: 6, color: bg.name === bgPattern ? "var(--bg-window)" : "var(--text-primary)" }}>
            {bg.label}
          </button>
        ))}
      </div>

      {section(t.prefs.musicVolume)}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px" }}>
        <VolumeX size={10} strokeWidth={1.5} style={{ color: "var(--text-secondary)", flexShrink: 0 }} />
        <input type="range" min={0} max={1} step={0.01} value={volume} onChange={e => onVolumeChange(Number(e.target.value))} style={{ flex: 1, height: 14 }} />
        <Volume2 size={10} strokeWidth={1.5} style={{ color: "var(--text-secondary)", flexShrink: 0 }} />
        <span style={{ ...PX, fontSize: 7, color: "var(--text-tertiary)", minWidth: 28 }}>{Math.round(volume * 100)}%</span>
      </div>

      {section(t.prefs.effectsVolume)}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px" }}>
        <VolumeX size={10} strokeWidth={1.5} style={{ color: "var(--text-secondary)", flexShrink: 0 }} />
        <input type="range" min={0} max={1} step={0.01} value={sfxVolume} onChange={e => onSfxVolumeChange(Number(e.target.value))} style={{ flex: 1, height: 14 }} />
        <Volume2 size={10} strokeWidth={1.5} style={{ color: "var(--text-secondary)", flexShrink: 0 }} />
        <span style={{ ...PX, fontSize: 7, color: "var(--text-tertiary)", minWidth: 28 }}>{Math.round(sfxVolume * 100)}%</span>
      </div>
    </Win>
  );
}

// ── About Window ──────────────────────────────────────────────────────────────

function AboutWin({ zIndex, onFocus, open, onClose }: { zIndex: number; onFocus: () => void; open?: boolean; onClose?: () => void }) {
  const { t } = useLang();
  const [fontDelta, setFontDelta] = useState(0);
  const fs = BODY_FS + fontDelta;
  const links = [
    { label: "LINKEDIN", url: "https://www.linkedin.com/in/environment-artist", icon: ExternalLink },
    { label: "INSTAGRAM", url: "https://www.instagram.com/soyvertigo/", icon: ExternalLink },
    { label: "EMAIL", url: "mailto:asanchomarmol@gmail.com", icon: Mail },
  ];
  return (
    <Win title={t.about.title} width={340} initX={560} initY={80} zIndex={zIndex} onFocus={onFocus} open={open} onClose={onClose} statusBar={t.about.lastUpdated} resizable initHeight={246}>
      {/* Avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 12px", borderBottom: "1px solid var(--border-color)", background: "var(--bg-panel)" }}>
        <div style={{ width: 44, height: 44, border: "2px solid var(--border-color)", flexShrink: 0, overflow: "hidden" }}>
          <img src="/photos/002.png" alt="ASANCHO" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ ...PX, fontSize: 9, color: "var(--text-primary)", marginBottom: 3 }}>ASANCHO</div>
          <div style={{ ...MONO, fontSize: 10, color: "var(--text-secondary)" }}>{t.about.role}</div>
          <div style={{ ...MONO, fontSize: 10, color: "var(--text-tertiary)" }}>{t.about.roleSub}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <button onClick={() => setFontDelta(d => Math.max(d - 1, -2))} style={{ ...PX, fontSize: 7, width: 16, height: 14, background: "transparent", border: "none", cursor: "pointer", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center" }}>A-</button>
          <button onClick={() => setFontDelta(d => Math.min(d + 1, 4))} style={{ ...PX, fontSize: 8, width: 16, height: 14, background: "transparent", border: "none", cursor: "pointer", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center" }}>A+</button>
        </div>
      </div>

      {/* Bio */}
      <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ ...MONO, fontSize: fs, color: "var(--text-primary)", lineHeight: 1.75 }}>
          {t.about.bio}
        </div>
      </div>

      {/* Links */}
      <div>
        {links.map(({ label, url, icon: Icon }) => (
          <a key={label} href={url} target="_blank" rel="noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", height: 32, borderBottom: "1px solid rgba(0,0,0,0.07)", textDecoration: "none", color: "var(--text-secondary)", transition: "background 0.08s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            <span style={{ ...PX, fontSize: 8, textTransform: "uppercase" }}>{label}</span>
            <Icon size={10} strokeWidth={2} />
          </a>
        ))}
      </div>
    </Win>
  );
}

// ── Blog Window (fake browser) ───────────────────────────────────────────────

function BlogWin({ zIndex, onFocus, open, onClose }: { zIndex: number; onFocus: () => void; open?: boolean; onClose?: () => void }) {
  const [openPost, setOpenPost] = useState<number | null>(null);
  const [fontDelta, setFontDelta] = useState(0);
  const { t } = useLang();
  const post = openPost !== null ? t.blog.posts[openPost] : null;
  const url = post ? `http://asancho.dev/blog/post-${openPost! + 1}` : "http://asancho.dev/blog";
  const fs = BODY_FS + fontDelta;

  return (
    <Win title={t.blog.title} width={420} initX={140} initY={70} zIndex={zIndex} onFocus={onFocus} open={open} onClose={onClose}
      statusBar={t.blog.statusBar} resizable initHeight={422}>
      {/* Browser toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 8px", borderBottom: "1px solid var(--border-color)", background: "var(--bg-panel)" }}>
        <CtrlBtn onClick={() => setOpenPost(null)} w={22} h={18}><ArrowLeft size={9} strokeWidth={2}/></CtrlBtn>
        <CtrlBtn w={22} h={18}><ArrowRight size={9} strokeWidth={2}/></CtrlBtn>
        <CtrlBtn w={22} h={18}><RotateCw size={9} strokeWidth={2}/></CtrlBtn>
        <div style={{ flex: 1, ...MONO, fontSize: 10, color: "var(--text-secondary)", background: "var(--bg-window)", border: "1px solid var(--border-color)", padding: "3px 7px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {url}
        </div>
        <button onClick={() => setFontDelta(d => Math.max(d - 1, -2))} style={{ ...PX, fontSize: 7, width: 16, height: 14, background: "transparent", border: "none", cursor: "pointer", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center" }}>A-</button>
        <button onClick={() => setFontDelta(d => Math.min(d + 1, 4))} style={{ ...PX, fontSize: 8, width: 16, height: 14, background: "transparent", border: "none", cursor: "pointer", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center" }}>A+</button>
      </div>

      {/* Page content */}
      <div style={{ padding: "14px 14px 16px", minHeight: 240 }}>
        {post ? (
          <div>
            <button onClick={() => setOpenPost(null)}
              style={{ display: "block", marginBottom: 14, background: "transparent", border: "none", cursor: "pointer", ...MONO, fontSize: 11, color: "var(--text-secondary)", padding: 0 }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--bg-active)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--text-secondary)"; }}>
              {t.blog.backToList}
            </button>
            <div style={{ ...PX, fontSize: 12, color: "var(--text-primary)", lineHeight: 1.5, marginBottom: 6 }}>{post.title}</div>
            <div style={{ ...MONO, fontSize: 10, color: "var(--text-tertiary)", marginBottom: 18 }}>{post.date}</div>
            {post.body.map((block, i) => block.type === "p" ? (
              <p key={i} style={{ ...MONO, fontSize: fs, color: "var(--text-primary)", lineHeight: 1.8, marginBottom: 14 }}>
                {block.text}
              </p>
            ) : (
              <figure key={i} style={{ margin: "0 0 14px" }}>
                {block.src ? (
                  <img src={block.src} alt={block.caption ?? post.title} style={{ width: "100%", display: "block", border: "1px solid var(--border-color)" }}/>
                ) : (
                  <div style={{ width: "100%", height: 140, background: "#0a060f", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ ...PX, fontSize: 7, color: "rgba(255,255,255,0.25)" }}>{t.blog.noImage}</span>
                  </div>
                )}
                {block.caption && (
                  <figcaption style={{ ...MONO, fontSize: 10, color: "var(--text-tertiary)", marginTop: 5, fontStyle: "italic" }}>{block.caption}</figcaption>
                )}
              </figure>
            ))}
          </div>
        ) : (
          <>
            <div style={{ ...PX, fontSize: 11, color: "var(--text-primary)", marginBottom: 4 }}>{t.blog.heading}</div>
            <div style={{ ...MONO, fontSize: 10, color: "var(--text-tertiary)", marginBottom: 18 }}>{t.blog.tagline}</div>

            {t.blog.posts.map((p, i) => (
              <div key={i} style={{ borderTop: "1px solid var(--border-color)", padding: "12px 0", cursor: "pointer" }}
                onClick={() => setOpenPost(i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                  <span style={{ ...PX, fontSize: 9, color: "var(--text-primary)" }}>{p.title}</span>
                  <span style={{ ...MONO, fontSize: 9, color: "var(--text-tertiary)", flexShrink: 0 }}>{p.date}</span>
                </div>
                <div style={{ ...MONO, fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.7, marginTop: 8 }}>
                  {p.excerpt}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </Win>
  );
}

// ── Background Generator — SVG ────────────────────────────────────────────────

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type GenType = "plasma" | "mesh" | "noise" | "poly" | "waves" | "dots";
type BgSvgCfg = { type: GenType; seed: number };

const PAL = ["var(--bg-main)", "var(--text-secondary)", "var(--bg-active)", "var(--text-primary)", "var(--bg-hover)"] as const;

// ── SVG sub-generators ────────────────────────────────────────────────────────

function PlasmaBg({ seed }: { seed: number }) {
  const id = `pf${seed}`;
  const bf1 = (0.004 + (seed % 11) * 0.0005).toFixed(4);
  const bf2 = (0.003 + (seed % 7)  * 0.0005).toFixed(4);
  const bf1b = (parseFloat(bf1) * 1.65).toFixed(4);
  const bf2b = (parseFloat(bf2) * 1.5).toFixed(4);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id={id} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency={`${bf1} ${bf2}`} numOctaves="5" seed={seed}>
            <animate attributeName="baseFrequency" values={`${bf1} ${bf2};${bf1b} ${bf2b};${bf1} ${bf2}`} dur={`${14 + seed % 9}s`} repeatCount="indefinite"/>
          </feTurbulence>
          <feColorMatrix type="saturate" values="2.4"/>
          <feColorMatrix type="hueRotate" values="0">
            <animate attributeName="values" from="0" to="360" dur={`${22 + seed % 14}s`} repeatCount="indefinite"/>
          </feColorMatrix>
        </filter>
      </defs>
      <rect width="100%" height="100%" style={{ fill: "var(--bg-main)" }}/>
      <rect width="100%" height="100%" filter={`url(#${id})`} opacity="0.68"/>
      <rect width="100%" height="100%" style={{ fill: "var(--bg-active)" }} opacity="0.16"/>
    </svg>
  );
}

function MeshBg({ seed }: { seed: number }) {
  const rng = mulberry32(seed);
  const blobs = Array.from({ length: 7 }, (_, i) => ({
    cx: (10 + rng() * 80).toFixed(1),
    cy: (10 + rng() * 80).toFixed(1),
    rx: (22 + rng() * 40).toFixed(1),
    ry: (16 + rng() * 32).toFixed(1),
    dur: (9 + rng() * 14).toFixed(1),
    dx: ((rng() - 0.5) * 26).toFixed(1),
    dy: ((rng() - 0.5) * 20).toFixed(1),
    color: PAL[(i * 2) % PAL.length],
    opacity: (0.5 + rng() * 0.42).toFixed(2),
  }));
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        {blobs.map((b, i) => (
          <radialGradient key={i} id={`mg${seed}${i}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   style={{ stopColor: b.color, stopOpacity: b.opacity }}/>
            <stop offset="100%" style={{ stopColor: b.color, stopOpacity: "0" }}/>
          </radialGradient>
        ))}
      </defs>
      <rect width="100" height="100" style={{ fill: "var(--bg-main)" }}/>
      {blobs.map((b, i) => (
        <ellipse key={i} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} fill={`url(#mg${seed}${i})`}>
          <animateTransform attributeName="transform" type="translate"
            values={`0,0; ${b.dx},${b.dy}; 0,0`} dur={`${b.dur}s`} repeatCount="indefinite" additive="sum"/>
        </ellipse>
      ))}
    </svg>
  );
}

function NoiseBg({ seed }: { seed: number }) {
  const id = `nf${seed}`;
  const bf = (0.022 + (seed % 8) * 0.003).toFixed(3);
  const bf2 = (parseFloat(bf) * 1.5).toFixed(3);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id={id} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency={`${bf} ${(parseFloat(bf)*0.7).toFixed(3)}`} numOctaves="4" seed={seed}>
            <animate attributeName="baseFrequency" values={`${bf} ${(parseFloat(bf)*0.7).toFixed(3)};${bf2} ${(parseFloat(bf2)*0.7).toFixed(3)};${bf} ${(parseFloat(bf)*0.7).toFixed(3)}`} dur={`${18 + seed % 12}s`} repeatCount="indefinite"/>
          </feTurbulence>
          <feColorMatrix type="saturate" values="1.6"/>
        </filter>
      </defs>
      <rect width="100%" height="100%" style={{ fill: "var(--bg-main)" }}/>
      <rect width="100%" height="100%" filter={`url(#${id})`} opacity="0.6"/>
      <rect width="100%" height="100%" style={{ fill: "var(--text-secondary)" }} opacity="0.1"/>
    </svg>
  );
}

function PolyBg({ seed }: { seed: number }) {
  const rng = mulberry32(seed);
  const COLS = 9 + Math.floor(rng() * 7), ROWS = Math.max(4, Math.round(COLS * 0.5625));
  const VW = 160, VH = 90;
  const pts = Array.from({ length: (COLS + 1) * (ROWS + 1) }, (_, idx) => {
    const i = idx % (COLS + 1), j = Math.floor(idx / (COLS + 1));
    return { x: (i / COLS) * VW + (rng() - 0.5) * (VW / COLS) * 0.72, y: (j / ROWS) * VH + (rng() - 0.5) * (VH / ROWS) * 0.72 };
  });
  const tris: { d: string; fill: string }[] = [];
  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i < COLS; i++) {
      const idx = j * (COLS + 1) + i;
      [[pts[idx], pts[idx+1], pts[idx+COLS+1]], [pts[idx+1], pts[idx+COLS+2], pts[idx+COLS+1]]].forEach(tri => {
        const cx = (tri[0].x + tri[1].x + tri[2].x) / 3, cy = (tri[0].y + tri[1].y + tri[2].y) / 3;
        const t = Math.max(0, Math.min(1, cx / VW * 0.55 + cy / VH * 0.45 + (rng() - 0.5) * 0.38));
        tris.push({
          d: `M${tri[0].x.toFixed(1)},${tri[0].y.toFixed(1)} L${tri[1].x.toFixed(1)},${tri[1].y.toFixed(1)} L${tri[2].x.toFixed(1)},${tri[2].y.toFixed(1)} Z`,
          fill: PAL[Math.round(t * (PAL.length - 1)) % PAL.length],
        });
      });
    }
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      {tris.map((t, i) => <path key={i} d={t.d} style={{ fill: t.fill }} opacity="0.92"/>)}
    </svg>
  );
}

function WavesBg({ seed }: { seed: number }) {
  const rng = mulberry32(seed);
  const N = 5, VW = 100, VH = 100;
  const waves = Array.from({ length: N }, (_, i) => {
    const freq = 0.7 + rng() * 1.8;
    const amp = 5 + rng() * 12;
    const phase = rng() * Math.PI * 2;
    const yBase = 15 + (i / (N - 1)) * 70;
    const period = VW / freq;
    const step = 2;
    let d = `M ${(-period).toFixed(1)},${VH}`;
    for (let x = -period; x <= VW + period; x += step) {
      d += ` L ${x.toFixed(1)},${(yBase + Math.sin((x / VW) * Math.PI * 2 * freq + phase) * amp).toFixed(1)}`;
    }
    d += ` L ${(VW + period).toFixed(1)},${VH} Z`;
    return { d, period: period.toFixed(2), dur: (7 + rng() * 10).toFixed(1), opacity: (0.45 + rng() * 0.4).toFixed(2), color: PAL[(i * 2) % PAL.length] };
  });
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <rect width={VW} height={VH} style={{ fill: "var(--bg-main)" }}/>
      {waves.map((w, i) => (
        <path key={i} d={w.d} style={{ fill: w.color }} opacity={w.opacity}>
          <animateTransform attributeName="transform" type="translate" from="0,0" to={`-${w.period},0`} dur={`${w.dur}s`} repeatCount="indefinite"/>
        </path>
      ))}
    </svg>
  );
}

function DotsBg({ seed }: { seed: number }) {
  const rng = mulberry32(seed);
  const COLS = 14, ROWS = 8, VW = 140, VH = 80;
  const dots = Array.from({ length: COLS * ROWS }, (_, idx) => {
    const i = idx % COLS, j = Math.floor(idx / COLS);
    return {
      cx: ((i + 0.5) / COLS * VW + (rng() - 0.5) * (VW / COLS) * 0.5).toFixed(1),
      cy: ((j + 0.5) / ROWS * VH + (rng() - 0.5) * (VH / ROWS) * 0.5).toFixed(1),
      r:  (1.6 + rng() * 2.4).toFixed(1),
      dur: (2.2 + rng() * 3.8).toFixed(1),
      begin: (rng() * -6).toFixed(1),
      color: PAL[Math.floor(rng() * 3)],
    };
  });
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <rect width={VW} height={VH} style={{ fill: "var(--bg-main)" }}/>
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} style={{ fill: d.color }}>
          <animate attributeName="opacity" values="0.25;0.85;0.25" dur={`${d.dur}s`} begin={`${d.begin}s`} repeatCount="indefinite"/>
          <animate attributeName="r" values={`${d.r};${(parseFloat(d.r) * 1.5).toFixed(1)};${d.r}`} dur={`${(parseFloat(d.dur) * 1.4).toFixed(1)}s`} begin={`${d.begin}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </svg>
  );
}

function BackgroundSvg({ type, seed }: { type: GenType; seed: number }) {
  switch (type) {
    case "plasma": return <PlasmaBg seed={seed}/>;
    case "mesh":   return <MeshBg   seed={seed}/>;
    case "noise":  return <NoiseBg  seed={seed}/>;
    case "poly":   return <PolyBg   seed={seed}/>;
    case "waves":  return <WavesBg  seed={seed}/>;
    case "dots":   return <DotsBg   seed={seed}/>;
  }
}

// ── BgGenWin ──────────────────────────────────────────────────────────────────

function BgGenWin({ zIndex, onFocus, open, onClose, onApplyBg, bgSvg }: {
  zIndex: number; onFocus: () => void; open?: boolean; onClose?: () => void;
  onApplyBg: (cfg: BgSvgCfg | null) => void;
  bgSvg: BgSvgCfg | null;
}) {
  const [genType, setGenType] = useState<GenType>("plasma");
  const [seed, setSeed] = useState(1337);
  const roll = () => setSeed(Math.floor(Math.random() * 99999) + 1);
  const isApplied = bgSvg?.type === genType && bgSvg?.seed === seed;
  const { t } = useLang();
  const GEN_TYPES: { id: GenType; label: string }[] = [
    { id: "plasma", label: t.bgGen.genPlasma }, { id: "mesh",  label: t.bgGen.genMesh  },
    { id: "noise",  label: t.bgGen.genNoise  }, { id: "poly",  label: t.bgGen.genPoly  },
    { id: "waves",  label: t.bgGen.genWaves  }, { id: "dots",  label: t.bgGen.genDots  },
  ];

  return (
    <Win title={t.bgGen.title} width={330} initX={320} initY={70} zIndex={zIndex} onFocus={onFocus} open={open} onClose={onClose}
      statusBar={`${t.bgGen.seed}: ${seed} · ${genType.toUpperCase()}${isApplied ? " · ACTIVE" : ""}`}>

      {/* Live SVG preview */}
      <div style={{ height: 186, borderBottom: "1px solid var(--border-color)", position: "relative", overflow: "hidden" }}>
        <BackgroundSvg type={genType} seed={seed}/>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 3px)" }}/>
        <span style={{ position: "absolute", top: 4, left: 6, ...PX, fontSize: 7, color: "rgba(255,255,255,0.4)", textShadow: "0 0 4px rgba(0,0,0,0.9)" }}>{t.bgGen.livePreview}</span>
      </div>

      {/* Algorithm */}
      <div style={{ padding: "7px 8px", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ ...PX, fontSize: 7, color: "var(--text-secondary)", marginBottom: 5, textTransform: "uppercase" }}>{t.bgGen.algorithm}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 4 }}>
          {GEN_TYPES.map(g => (
            <button key={g.id} onClick={() => setGenType(g.id)}
              style={{ padding: "5px 0", background: g.id === genType ? "var(--bg-active)" : "var(--bg-panel)", border: "1px solid var(--border-color)", cursor: "pointer", ...PX, fontSize: 7, color: g.id === genType ? "var(--bg-window)" : "var(--text-primary)" }}>
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Seed */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 8px", borderBottom: "1px solid var(--border-color)", background: "var(--bg-panel)" }}>
        <span style={{ ...PX, fontSize: 7, color: "var(--text-secondary)" }}>{t.bgGen.seed}</span>
        <span style={{ ...MONO, fontSize: 11, color: "var(--text-primary)", flex: 1, textAlign: "center" }}>{seed}</span>
        <button onClick={roll}
          style={{ padding: "4px 9px", background: "var(--bg-window)", border: "1px solid var(--border-color)", cursor: "pointer", ...PX, fontSize: 7, color: "var(--text-primary)" }}>
          {t.bgGen.roll}
        </button>
      </div>

      {/* Actions */}
      <div style={{ padding: "8px", display: "flex", flexDirection: "column", gap: 6 }}>
        <button onClick={() => onApplyBg({ type: genType, seed })}
          style={{ width: "100%", padding: "9px 0", background: isApplied ? "var(--bg-panel)" : "var(--bg-active)", border: "1px solid var(--border-color)", cursor: "pointer", ...PX, fontSize: 9, color: isApplied ? "var(--text-secondary)" : "var(--bg-window)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {isApplied ? t.bgGen.applied : t.bgGen.apply}
        </button>
        {bgSvg && (
          <button onClick={() => onApplyBg(null)}
            style={{ width: "100%", padding: "6px 0", background: "var(--bg-panel)", border: "1px solid var(--border-color)", cursor: "pointer", ...PX, fontSize: 8, color: "var(--text-secondary)", textTransform: "uppercase" }}>
            {t.bgGen.clear}
          </button>
        )}
        <div style={{ ...MONO, fontSize: 10, color: "var(--text-tertiary)", textAlign: "center" }}>
          {t.bgGen.footer}
        </div>
      </div>
    </Win>
  );
}

// ── TrackerWin ────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  wip:  { bg: "var(--bg-active)",  text: "var(--bg-window)" },
  next: { bg: "var(--bg-panel)",   text: "var(--text-secondary)" },
  done: { bg: "#1a3a1a",           text: "#4dffaa" },
  hold: { bg: "var(--bg-panel)",   text: "var(--text-tertiary)" },
};

// One accent colour per lane — fixed so they're legible on every palette.
const LANE_COLORS = ["var(--bg-active)", "#c084fc", "#fb923c", "#4ade80"];

function TrackerWin({ zIndex, onFocus, open, onClose }: { zIndex: number; onFocus: () => void; open?: boolean; onClose?: () => void }) {
  const { t } = useLang();
  const labels: Record<string, string> = {
    wip: t.tracker.wipLabel, next: t.tracker.nextLabel,
    done: t.tracker.doneLabel, hold: t.tracker.holdLabel,
  };

  return (
    <Win title={t.tracker.title} width={920} initX={60} initY={40} zIndex={zIndex} onFocus={onFocus} open={open} onClose={onClose}
      statusBar={t.tracker.statusBar} resizable initHeight={232}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {(t.tracker.lanes as TrackerLane[]).map((lane, li) => (
          <div key={li} style={{ borderRight: li < 3 ? "1px solid var(--border-color)" : "none" }}>
            {/* Lane accent bar + header */}
            <div style={{ height: 3, background: LANE_COLORS[li] }} />
            <div style={{ padding: "5px 7px", borderBottom: "1px solid var(--border-color)", background: "var(--bg-panel)" }}>
              <span style={{ ...PX, fontSize: 7, color: LANE_COLORS[li], letterSpacing: "0.03em" }}>{lane.label}</span>
            </div>
            {/* Items */}
            {lane.items.map((item, ii) => {
              const col = STATUS_COLORS[item.status] ?? STATUS_COLORS.hold;
              return (
                <div key={ii}
                  style={{ padding: "5px 7px", borderBottom: "1px solid var(--border-color)", borderLeft: `2px solid ${LANE_COLORS[li]}22`, transition: "transform 0.12s ease, background 0.1s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.background = "var(--bg-hover)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.background = ""; }}
                >
                  <span style={{ ...PX, fontSize: 6, padding: "1px 4px", background: col.bg, color: col.text, display: "inline-block", marginBottom: 3 }}>
                    {labels[item.status] ?? item.status}
                  </span>
                  <div style={{ ...MONO, fontSize: 9.5, color: "var(--text-primary)", lineHeight: 1.35 }}>{item.label}</div>
                  {item.note && <div style={{ ...MONO, fontSize: 8.5, color: "var(--text-tertiary)", marginTop: 1 }}>{item.note}</div>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Win>
  );
}

// ── JournalWin ────────────────────────────────────────────────────────────────

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <span style={{ color: "var(--bg-active)", fontSize: 11, letterSpacing: 1 }}>
      {"★".repeat(rating)}
      <span style={{ color: "var(--text-tertiary)" }}>{"★".repeat(max - rating)}</span>
    </span>
  );
}

function JournalWin({ zIndex, onFocus, open, onClose }: { zIndex: number; onFocus: () => void; open?: boolean; onClose?: () => void }) {
  const { t } = useLang();
  const [tab, setTab] = useState<"movie" | "book">("movie");
  const [expanded, setExpanded] = useState<number | null>(null);
  const entries = (t.journal.entries as JournalEntry[]).filter(e => e.type === tab);

  return (
    <Win title={t.journal.title} width={340} initX={420} initY={100} zIndex={zIndex} onFocus={onFocus} open={open} onClose={onClose} resizable initHeight={107}>
      {/* Tab bar */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border-color)" }}>
        {(["movie", "book"] as const).map((type) => {
          const label = type === "movie" ? t.journal.moviesTab : t.journal.booksTab;
          const active = tab === type;
          return (
            <button key={type} onClick={() => { playClick(); setTab(type); setExpanded(null); }}
              style={{ flex: 1, padding: "6px 0", ...PX, fontSize: 7, cursor: "pointer",
                background: active ? "var(--bg-active)" : "var(--bg-panel)",
                color: active ? "var(--bg-window)" : "var(--text-secondary)",
                border: "none", borderRight: type === "movie" ? "1px solid var(--border-color)" : "none",
              }}>
              {label}
            </button>
          );
        })}
      </div>
      {/* Entry list */}
      <div>
        {entries.map((e, i) => (
          <div key={i}>
            <div
              onClick={() => { playClick(); setExpanded(expanded === i ? null : i); }}
              style={{ padding: "6px 8px", borderBottom: "1px solid var(--border-color)", cursor: "pointer", display: "flex", gap: 8, alignItems: "flex-start",
                background: expanded === i ? "var(--bg-panel)" : "transparent",
                transition: "transform 0.12s ease, background 0.1s",
              }}
              onMouseEnter={el => { el.currentTarget.style.background = "var(--bg-hover)"; el.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={el => { el.currentTarget.style.background = expanded === i ? "var(--bg-panel)" : "transparent"; el.currentTarget.style.transform = ""; }}
            >
              <div style={{ flexShrink: 0 }}>
                <StarRating rating={e.rating ?? 0} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ ...MONO, fontSize: BODY_FS - 1, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.title}</div>
                <div style={{ ...MONO, fontSize: 9, color: "var(--text-tertiary)" }}>
                  {e.author}{e.year ? ` · ${e.year}` : ""}{e.date ? ` · ${e.date}` : ""}
                </div>
              </div>
              <span style={{ ...PX, fontSize: 7, color: "var(--text-tertiary)", flexShrink: 0 }}>{expanded === i ? "▲" : "▼"}</span>
            </div>
            {expanded === i && (
              <div style={{ padding: "6px 10px 8px", borderBottom: "1px solid var(--border-color)", background: "var(--bg-panel)", ...MONO, fontSize: BODY_FS - 1, color: "var(--text-secondary)", lineHeight: 1.55, fontStyle: "italic" }}>
                {e.note ?? t.journal.noNote}
              </div>
            )}
          </div>
        ))}
        {entries.length === 0 && (
          <div style={{ padding: 16, textAlign: "center", ...MONO, fontSize: 10, color: "var(--text-tertiary)" }}>—</div>
        )}
      </div>
    </Win>
  );
}

// ── Feedback ──────────────────────────────────────────────────────────────────

type FeedbackChoice = "hate" | "neutral" | "love" | "other" | null;

function RepelButton({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const animating = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const btn = ref.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const threshold = 90;
      if (dist < threshold) {
        const force = (threshold - dist) / threshold;
        const nx = -dx * force * 3.5;
        const ny = -dy * force * 3.5;
        setOffset({ x: nx, y: ny });
        animating.current = true;
      } else if (animating.current) {
        setOffset({ x: 0, y: 0 });
        animating.current = false;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...PX, fontSize: 8, padding: "5px 10px", cursor: "pointer",
        background: "var(--bg-panel)", color: "var(--text-primary)",
        border: "1px solid var(--border-color)",
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: animating.current ? "transform 0.06s ease-out" : "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        userSelect: "none",
      }}
    >
      {label}
    </button>
  );
}

function FeedbackWin({ zIndex, onFocus, open, onClose }: { zIndex: number; onFocus: () => void; open?: boolean; onClose?: () => void }) {
  const { t } = useLang();
  const [choice, setChoice] = useState<FeedbackChoice>(null);
  const [otherText, setOtherText] = useState("");
  const [sent, setSent] = useState(false);

  const choose = (c: FeedbackChoice) => { playClick(); setChoice(c); };

  const send = () => {
    if (!choice) return;
    playClick();
    setSent(true);
  };

  const btnStyle = (active: boolean): React.CSSProperties => ({
    ...PX, fontSize: 8, padding: "5px 10px", cursor: "pointer",
    background: active ? "var(--bg-active)" : "var(--bg-panel)",
    color: active ? "var(--bg-window)" : "var(--text-primary)",
    border: `1px solid ${active ? "var(--bg-active)" : "var(--border-color)"}`,
  });

  return (
    <Win title={t.feedback.title} width={260} initX={500} initY={280} zIndex={zIndex} onFocus={onFocus} open={open} onClose={onClose}>
      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 12 }}>
        {sent ? (
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <div style={{ ...PX, fontSize: 10, color: "var(--bg-active)", marginBottom: 6 }}>✓ {t.feedback.thanks}</div>
            <div style={{ ...MONO, fontSize: 9, color: "var(--text-secondary)" }}>{t.feedback.thanksDetail}</div>
          </div>
        ) : (
          <>
            <div style={{ ...PX, fontSize: 9, color: "var(--text-primary)", textAlign: "center" }}>{t.feedback.question}</div>
            {/* Row with repelling Hate button + normal buttons */}
            <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", minHeight: 36 }}>
              {/* Hate button in its own overflow-visible container so it can escape */}
              <div style={{ position: "relative", overflow: "visible" }}>
                <RepelButton label={t.feedback.hate} onClick={() => choose("hate")} />
              </div>
              <button style={btnStyle(choice === "neutral")} onClick={() => choose("neutral")}>{t.feedback.neutral}</button>
              <button style={btnStyle(choice === "love")} onClick={() => choose("love")}>{t.feedback.love}</button>
              <button style={btnStyle(choice === "other")} onClick={() => choose("other")}>{t.feedback.other}</button>
            </div>
            {choice === "other" && (
              <textarea
                value={otherText} onChange={e => setOtherText(e.target.value)}
                placeholder={t.feedback.otherPlaceholder}
                rows={3}
                style={{ ...MONO, fontSize: 9, padding: "5px 7px", background: "var(--bg-panel)", color: "var(--text-primary)", border: "1px solid var(--border-color)", outline: "none", resize: "none" }}
              />
            )}
            {choice && (
              <button onClick={send} style={{ ...PX, fontSize: 8, padding: "5px 10px", background: "var(--bg-active)", color: "var(--bg-window)", border: "none", cursor: "pointer", alignSelf: "flex-end" }}>
                {t.feedback.send}
              </button>
            )}
          </>
        )}
      </div>
    </Win>
  );
}

// ── Pet ───────────────────────────────────────────────────────────────────────

type PetMsg = { from: "pet" | "user"; text: string; showReplies?: boolean };
type PetAnimState = { msgIdx: number; phase: "thinking" | "typing" | "done"; chars: number };

function matchPetResponse(input: string, t_pet: Strings["pet"]): { text: string; showReplies: boolean } {
  const q = input.toLowerCase().trim();
  const r = t_pet.responses;
  if (/^(hi|hello|hey|hola|ey|bon|buenas|salut|que pasa|que tal|com va)/.test(q)) return { text: r.hello, showReplies: false };
  if (/navigate|navegar|use|usar|how|cómo|what do|que faig|qué hago|explore|funciona/.test(q)) return { text: r.navigate, showReplies: false };
  if (/password|contrasenya|contraseña|pista|clue|hint|code|codi|clau|clave/.test(q)) return { text: r.password, showReplies: false };
  if (/project|proyect|work|treballs|treball|obra|portfolio|portafolio|portfoli|sword|axe|espada|destral/.test(q)) return { text: r.projects, showReplies: false };
  if (/who|quien|qui |alejandro|about|sobre|acerca/.test(q)) return { text: r.about, showReplies: false };
  if (/contact|contacto|contacte|hire|contratar|email|mail|newsletter|network/.test(q)) return { text: r.contact, showReplies: false };
  if (/music|musica|música|sound|audio|play|visua/.test(q)) return { text: r.music, showReplies: false };
  if (/stack|tech|react|tools|code|código|codi|tecnolog|built|construi/.test(q)) return { text: r.stack, showReplies: false };
  if (/tracker|todo|goal|objectiu|objetivo|working|trabajando|treballant|next|siguiente/.test(q)) return { text: r.tracker, showReplies: false };
  const quips = t_pet.funnyQuips as string[];
  return { text: quips[Math.floor(Math.random() * quips.length)], showReplies: true };
}

function ThinkingDots() {
  return (
    <span>
      {[0, 0.33, 0.66].map((delay, i) => (
        <span key={i} style={{ animation: `draven-think 1s ease-in-out ${delay}s infinite`, display: "inline-block", marginRight: 2 }}>●</span>
      ))}
    </span>
  );
}

function PetChatWin({ zIndex, onFocus, open, onClose }: { zIndex: number; onFocus: () => void; open?: boolean; onClose?: () => void }) {
  const { t } = useLang();
  const [msgs, setMsgs] = useState<PetMsg[]>(() => [{ from: "pet", text: t.pet.greeting }]);
  const [input, setInput] = useState("");
  const [anim, setAnim] = useState<PetAnimState>({ msgIdx: 0, phase: "thinking", chars: 0 });
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset on language change, re-animate greeting
  useEffect(() => {
    setMsgs([{ from: "pet", text: t.pet.greeting }]);
    setAnim({ msgIdx: 0, phase: "thinking", chars: 0 });
  }, [t.pet.greeting]);

  // Drive typing animation
  useEffect(() => {
    if (anim.phase === "done" || anim.msgIdx < 0) return;
    if (anim.phase === "thinking") {
      const delay = 500 + Math.random() * 600;
      const tid = setTimeout(() => setAnim(prev => ({ ...prev, phase: "typing", chars: 0 })), delay);
      return () => clearTimeout(tid);
    }
    const msg = msgs[anim.msgIdx];
    if (!msg) return;
    if (anim.chars >= msg.text.length) {
      setAnim(prev => ({ ...prev, phase: "done" }));
      return;
    }
    const tid = setTimeout(() => setAnim(prev => ({ ...prev, chars: prev.chars + 1 })), 18);
    return () => clearTimeout(tid);
  }, [anim.phase, anim.chars, anim.msgIdx, msgs]);

  useEffect(() => { const el = scrollRef.current; if (el) el.scrollTop = el.scrollHeight; }, [msgs, anim.chars]);

  const sendText = (q: string) => {
    if (!q.trim()) return;
    playClick();
    const { text: reply, showReplies } = matchPetResponse(q.trim(), t.pet);
    const newMsgs: PetMsg[] = [...msgs, { from: "user", text: q.trim() }, { from: "pet", text: reply, showReplies }];
    setMsgs(newMsgs);
    setInput("");
    setAnim({ msgIdx: newMsgs.length - 1, phase: "thinking", chars: 0 });
  };

  const send = () => sendText(input);

  const isAnimating = (i: number) => i === anim.msgIdx && anim.phase !== "done";

  return (
    <Win title={t.pet.chatTitle} width={300} initX={720} initY={260} zIndex={zIndex} onFocus={onFocus} open={open} onClose={onClose}>
      <div ref={scrollRef} style={{ height: 280, overflowY: "auto", padding: "6px 8px", display: "flex", flexDirection: "column", gap: 6 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.from === "pet" ? "flex-start" : "flex-end" }}>
            <div style={{
              maxWidth: "85%", padding: "4px 7px",
              background: m.from === "pet" ? "var(--bg-panel)" : "var(--bg-active)",
              color: m.from === "pet" ? "var(--text-primary)" : "var(--bg-window)",
              border: "1px solid var(--border-color)",
              ...MONO, fontSize: 12, lineHeight: 1.55,
            }}>
              {m.from === "pet" && <span style={{ ...PX, fontSize: 7, color: "var(--text-secondary)", display: "block", marginBottom: 2 }}>{t.pet.name}</span>}
              {m.from === "pet" && isAnimating(i)
                ? (anim.phase === "thinking" ? <ThinkingDots /> : <>{m.text.slice(0, anim.chars)}<span style={{ opacity: 0.7 }}>▌</span></>)
                : m.text}
            </div>
            {/* Quick-reply suggestion buttons */}
            {m.from === "pet" && !isAnimating(i) && i === msgs.length - 1 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 4, maxWidth: "85%" }}>
                {(t.pet.quickReplies as Array<{ label: string; query: string }>).map((qr, qi) => (
                  <button key={qi} onClick={() => sendText(qr.query)} style={{
                    ...PX, fontSize: 7, padding: "2px 5px", cursor: "pointer",
                    background: "var(--bg-panel)", color: "var(--text-secondary)",
                    border: "1px solid var(--border-color)", transition: "background 0.1s",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-hover)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "var(--bg-panel)")}
                  >
                    {qr.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ borderTop: "1px solid var(--border-color)", display: "flex" }}>
        <input
          type="text" value={input} placeholder={t.pet.inputPlaceholder}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); send(); } }}
          style={{ flex: 1, border: "none", borderRight: "1px solid var(--border-color)", padding: "5px 7px", ...MONO, fontSize: 12, background: "var(--bg-panel)", color: "var(--text-primary)", outline: "none" }}
        />
        <button onClick={send} style={{ padding: "5px 10px", background: "var(--bg-active)", color: "var(--bg-window)", border: "none", cursor: "pointer", ...PX, fontSize: 8 }}>▶</button>
      </div>
    </Win>
  );
}

// ── Mobile "better on desktop" hint ──────────────────────────────────────────
// Mobile-only decorative watermark: bounces corner-to-corner like an old
// screensaver, sitting behind the windows/dock/system-bar (low z-index) so it
// only peeks through wherever the desktop shows through. Position is driven
// via a ref + direct style mutation (not React state) since it updates every
// animation frame — routing that through setState would re-render the whole
// tree 60x/sec for a purely decorative element.
function MobileDesktopHint() {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = 24, y = 90;
    let vx = 1.15, vy = 0.85;
    let raf = 0;
    const tick = () => {
      // Defensive: if the text is ever wider/taller than the viewport (long
      // translation, tiny device), max would go negative — clamp to 0 so it
      // sticks to a corner instead of drifting off-screen.
      const maxX = Math.max(0, window.innerWidth - el.offsetWidth);
      const maxY = Math.max(0, window.innerHeight - el.offsetHeight);
      x += vx; y += vy;
      if (x <= 0 || x >= maxX) { vx = -vx; x = Math.min(Math.max(x, 0), maxX); }
      if (y <= 0 || y >= maxY) { vy = -vy; y = Math.min(Math.max(y, 0), maxY); }
      el.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
      <div ref={ref} style={{
        position: "absolute", ...PX, fontSize: 9, letterSpacing: 1.5,
        textTransform: "uppercase", whiteSpace: "nowrap",
        color: "var(--text-tertiary)", opacity: 0.4,
      }}>
        {t.mobileHint.text}
      </div>
    </div>
  );
}

function PetWidget({ onOpen, attention }: { onOpen: () => void; attention: boolean }) {
  const { t } = useLang();
  const [hov, setHov] = useState(false);
  // Periodic "hey, check me" pulse — a stronger wiggle plus a notification-dot
  // ping, distinct from the ambient pet-bob float. Purely visual (no copy),
  // per request: it should read as a nudge, not say anything literally.
  // Stops entirely once the visitor opens the chat for the first time
  // (attention flips false from the parent) — never re-nags a session.
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (!attention) { setPulse(false); return; }
    let onT: ReturnType<typeof setTimeout>, offT: ReturnType<typeof setTimeout>;
    let cancelled = false;
    const cycle = () => {
      onT = setTimeout(() => {
        if (cancelled) return;
        setPulse(true);
        offT = setTimeout(() => {
          if (cancelled) return;
          setPulse(false);
          cycle();
        }, 2200);
      }, 7000);
    };
    cycle();
    return () => { cancelled = true; clearTimeout(onT); clearTimeout(offT); };
  }, [attention]);

  return (
    <div
      onClick={() => { playOpen(); setPulse(false); onOpen(); }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      title={`Chat with ${t.pet.name}`}
      style={{ position: "fixed", bottom: 68, right: 16, cursor: "pointer", userSelect: "none", zIndex: 99, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}
    >
      <div style={{ position: "relative" }}>
        <pre style={{
          ...MONO, fontSize: 11, lineHeight: 1.3, margin: 0, padding: "4px 6px",
          background: hov ? "var(--bg-hover)" : "var(--bg-window)",
          border: `1px solid ${pulse ? "var(--color-error)" : "var(--border-color)"}`,
          boxShadow: pulse ? "0 0 10px var(--color-error)" : "none",
          color: "var(--text-primary)",
          animation: pulse ? "pet-attn 0.7s ease-in-out infinite" : "pet-bob 2.4s ease-in-out infinite",
          transition: "background 0.1s, border-color 0.15s, box-shadow 0.15s",
        }}>
          {"/\\_/\\\n( •ω•)\n > ♥ <"}
        </pre>
        {pulse && (
          <span style={{ position: "absolute", top: -3, right: -3, width: 9, height: 9, borderRadius: "50%", background: "var(--color-error)" }}>
            <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--color-error)", animation: "pet-ping 1.3s ease-out infinite" }} />
          </span>
        )}
      </div>
      <span style={{ ...PX, fontSize: 6, color: "var(--text-secondary)" }}>{t.pet.name}</span>
    </div>
  );
}

// ── Dock Icon ─────────────────────────────────────────────────────────────────

function DockIcon({ icon: Icon, label, onClick, active = false }: { icon: React.ElementType; label: string; onClick?: () => void; active?: boolean }) {
  const [hov, setHov] = useState(false);
  const [press, setPress] = useState(false);
  const lit = press || active;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => { setHov(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)} onClick={onClick}>
      <div className="icon-box" style={{ width: 36, height: 36, background: lit ? "var(--bg-active)" : hov ? "var(--bg-hover)" : "var(--bg-panel)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", transform: press ? "translateY(1px)" : hov ? "translateY(-2px)" : "none", transition: "background 0.1s, transform 0.13s ease" }}>
        <Icon size={16} strokeWidth={1.5} style={{ color: lit ? "var(--bg-window)" : "var(--text-primary)" }} />
      </div>
      <span className="icon-label" style={{ ...PX, fontSize: 7, textTransform: "uppercase", color: lit ? "var(--bg-active)" : "var(--text-primary)" }}>{label}</span>
    </div>
  );
}

// ── Desktop Icon ──────────────────────────────────────────────────────────────

function DesktopIcon({ icon: Icon, label, x, y, onOpen }: { icon: React.ElementType; label: string; x: number; y: number; onOpen?: () => void }) {
  const [hov, setHov] = useState(false);
  const [press, setPress] = useState(false);
  return (
    <div style={{ position: "absolute", left: x, top: y, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", width: 60, userSelect: "none" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => { setHov(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      onClick={onOpen}>
      <div className="icon-box" style={{ width: 36, height: 36, background: press ? "var(--bg-hover)" : hov ? "var(--bg-hover)" : "var(--bg-panel)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", transform: press ? "translateY(1px)" : hov ? "translateY(-2px)" : "none", transition: "background 0.1s, transform 0.13s ease" }}>
        <Icon size={18} strokeWidth={1.5} style={{ color: "var(--text-primary)" }} />
      </div>
      <span className="icon-label" style={{ ...PX, fontSize: 7, textTransform: "uppercase", textAlign: "center", color: hov ? "var(--bg-window)" : "var(--text-primary)", lineHeight: 1.5, padding: "1px 3px", background: hov ? "var(--bg-active)" : "transparent", transition: "background 0.06s, color 0.06s" }}>
        {label}
      </span>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

type WinId = "visualizer" | "photo" | "notes" | "sysinfo" | "prefs" | "about" | "bggen" | "projects" | "blog" | "tracker" | "chat" | "journal" | "feedback";

const DEFAULT_Z: Record<WinId, number> = { visualizer: 12, photo: 13, notes: 14, sysinfo: 10, prefs: 9, about: 8, bggen: 7, projects: 15, blog: 11, tracker: 16, chat: 17, journal: 18, feedback: 19 };

function bgStyle(pattern: BgPattern): React.CSSProperties {
  if (pattern === "grid") return { backgroundImage: "repeating-linear-gradient(0deg,rgba(0,0,0,0.04) 0,rgba(0,0,0,0.04) 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,rgba(0,0,0,0.04) 0,rgba(0,0,0,0.04) 1px,transparent 1px,transparent 32px)" };
  if (pattern === "dots") return { backgroundImage: "radial-gradient(circle,rgba(0,0,0,0.12) 1px,transparent 1px)", backgroundSize: "20px 20px" };
  if (pattern === "scanlines") return { backgroundImage: "repeating-linear-gradient(0deg,rgba(0,0,0,0.035) 0,rgba(0,0,0,0.035) 1px,transparent 1px,transparent 4px)" };
  return {};
}

// ── Splash Buttons ────────────────────────────────────────────────────────────
// Splash always has a fixed dark background (#04040a) and never depends on
// the runtime palette — so these use hardcoded colors, not CSS vars, to
// guarantee contrast regardless of when the JS palette useEffect fires.

function SplashBtnPrimary({ children, onClick, mb = 12, style }: {
  children: React.ReactNode; onClick: () => void; mb?: number; style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      onFocus={e => { e.currentTarget.style.outline = "2px solid #04040a"; e.currentTarget.style.outlineOffset = "3px"; }}
      onBlur={e => { e.currentTarget.style.outline = "none"; }}
      onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
      style={{ display: "block", width: "100%", marginBottom: mb, cursor: "pointer", ...PX, fontSize: 8, letterSpacing: 1, background: "#fff", color: "#04040a", border: "2px solid #fff", padding: "14px 0", transition: "opacity 0.15s", ...style }}
    >{children}</button>
  );
}

function SplashBtnGhost({ children, onClick, mb = 0, dim = false, style }: {
  children: React.ReactNode; onClick: () => void; mb?: number; dim?: boolean; style?: React.CSSProperties;
}) {
  const tc = dim ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.7)";
  const bc = dim ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.3)";
  return (
    <button
      onClick={onClick}
      onFocus={e => { e.currentTarget.style.outline = "2px solid #fff"; e.currentTarget.style.outlineOffset = "3px"; }}
      onBlur={e => { e.currentTarget.style.outline = "none"; }}
      onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = dim ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.8)"; }}
      onMouseLeave={e => { e.currentTarget.style.color = tc; e.currentTarget.style.borderColor = bc; }}
      style={{ display: "block", width: "100%", marginBottom: mb, cursor: "pointer", ...PX, fontSize: 8, letterSpacing: 1, background: "transparent", color: tc, border: `1px solid ${bc}`, padding: "14px 0", transition: "color 0.15s, border-color 0.15s", ...style }}
    >{children}</button>
  );
}

// ── Splash Screen ─────────────────────────────────────────────────────────────

function SplashScreen({ onEnter, exiting, skipLanguage }: { onEnter: (withSound: boolean) => void; exiting: boolean; skipLanguage?: boolean }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"language" | "loading" | "ready">(skipLanguage ? "loading" : "language");
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    if (phase !== "loading") return;
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 9 + 3;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setTimeout(() => setPhase("ready"), 400);
      }
      setProgress(Math.floor(p));
    }, 55);
    return () => clearInterval(iv);
  }, [phase]);

  const pickLanguage = (l: Lang) => { playClick(); setLang(l); setPhase("loading"); };

  const blocks = Math.round(progress / 5);
  const bar = "█".repeat(blocks) + "░".repeat(20 - blocks);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#04040a",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      animation: exiting ? "splash-exit 0.5s ease forwards" : undefined,
    }}>
      {/* Scanlines */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(0deg,rgba(0,0,0,0.18) 0,rgba(0,0,0,0.18) 1px,transparent 1px,transparent 3px)" }}/>
      {/* Noise */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.04, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "140px" }}/>

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", width: "100%", maxWidth: 440, padding: "0 32px" }}>
        <div style={{ ...PX, fontSize: 11, color: "var(--bg-active)", letterSpacing: 3, marginBottom: 6 }}>
          {t.splash.title}
        </div>
        <div style={{ ...MONO, fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: 8, marginBottom: 52 }}>
          {t.splash.tagline}
        </div>

        {phase === "language" ? (
          <div style={{ animation: "splash-fadein 0.3s ease" }}>
            <div style={{ ...MONO, fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 22, letterSpacing: 1 }}>
              ELIGE IDIOMA / SELECT LANGUAGE / TRIA IDIOMA
            </div>
            <SplashBtnPrimary onClick={() => pickLanguage("es")} mb={12}>ESPAÑOL</SplashBtnPrimary>
            <SplashBtnGhost onClick={() => pickLanguage("en")} mb={12}>ENGLISH</SplashBtnGhost>
            <SplashBtnGhost onClick={() => pickLanguage("ca")}>CATALÀ</SplashBtnGhost>
          </div>
        ) : phase === "loading" ? (
          <div style={{ animation: "splash-fadein 0.3s ease" }}>
            <div style={{ ...MONO, fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 18, letterSpacing: 1 }}>
              {t.splash.initializing}
            </div>
            <div style={{ ...MONO, fontSize: 13, color: "var(--bg-active)", letterSpacing: 2, marginBottom: 10 }}>
              [{bar}]
            </div>
            <div style={{ ...MONO, fontSize: 10, color: "rgba(255,255,255,0.2)" }}>{progress}%</div>
          </div>
        ) : (
          <div style={{ animation: "splash-fadein 0.4s ease" }}>
            <div style={{ ...MONO, fontSize: 11, color: "#4dffaa", marginBottom: 36, letterSpacing: 2 }}>
              {t.splash.systemReady}
            </div>
            <SplashBtnPrimary onClick={() => onEnter(true)} mb={12} style={{ fontSize: 7, padding: "16px 0" }}>
              {t.splash.enterSound}
            </SplashBtnPrimary>
            <SplashBtnGhost onClick={() => onEnter(false)} dim style={{ ...MONO, fontSize: 11, padding: "11px 0" }}>
              {t.splash.enterNoSound}
            </SplashBtnGhost>
          </div>
        )}

        <div style={{ ...MONO, fontSize: 9, color: "rgba(255,255,255,0.1)", marginTop: 52, letterSpacing: 2 }}>
          {t.splash.footer}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const clock = useClock();
  const [layoutKey, setLayoutKey] = useState(0);
  const [z, setZ] = useState<Record<WinId, number>>(DEFAULT_Z);

  // Language — inherit from 3d-gateway's ?lang= param first (see URL_LANG),
  // else this project's own last choice (localStorage), else default ES.
  const [lang, setLang] = useState<Lang>(() => {
    if (URL_LANG) return URL_LANG;
    const saved = localStorage.getItem("vertigo-lang") as Lang | null;
    return (saved === "es" || saved === "en" || saved === "ca") ? saved : "es";
  });
  const t = STRINGS[lang];

  // Window open states
  const [projOpen,    setProjOpen]    = useState(false);
  const [vizOpen,     setVizOpen]     = useState(true);
  const [photoOpen,   setPhotoOpen]   = useState(true);
  const [notesOpen,   setNotesOpen]   = useState(true);
  const [sysinfoOpen, setSysinfoOpen] = useState(false);
  const [prefsOpen,   setPrefsOpen]   = useState(false);
  const [aboutOpen,   setAboutOpen]   = useState(false);
  const [bggenOpen,   setBggenOpen]   = useState(false);
  const [blogOpen,    setBlogOpen]    = useState(false);
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [chatOpen,     setChatOpen]     = useState(false);
  const [journalOpen,  setJournalOpen]  = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  // First-run onboarding — shown once per session right after the splash
  // screen exits, dismissible; not persisted (matches the rest of the app's
  // no-localStorage-for-layout stance).
  const [onboardingOpen, setOnboardingOpen] = useState(true);

  // SVG background from generator
  const [bgSvg, setBgSvg] = useState<BgSvgCfg | null>(null);

  // Modal states
  const [contactOpen,  setContactOpen]  = useState(false);
  const [networkOpen,  setNetworkOpen]  = useState(false);

  // Splash + audio unlock — a resolved language (inherited from the gateway,
  // or remembered from a previous visit) skips the picker step
  const langPreset = !!URL_LANG || !!(localStorage.getItem("vertigo-lang"));
  const [splashVisible, setSplashVisible] = useState(!langPreset);
  const [splashExiting, setSplashExiting] = useState(false);
  const [autoplay,      setAutoplay]      = useState(false);

  const handleEnter = (withSound: boolean) => {
    if (withSound) setAutoplay(true);
    setSplashExiting(true);
    setTimeout(() => setSplashVisible(false), 480);
  };

  // Global preferences
  const [palette,    setPalette]    = useState("MONO");
  const [bgPattern,  setBgPattern]  = useState<BgPattern>("dots");
  const [volume,     setVolume]     = useState(0.8);
  const [sfxVolume,  setSfxVolumeState] = useState(0.5);
  const [darkMode,   setDarkMode]   = useState(true);

  // Apply palette CSS vars
  useEffect(() => {
    const p = PALETTES.find(p => p.name === palette);
    if (!p) return;
    const vars = darkMode ? p.dark : p.light;
    Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
  }, [palette, darkMode]);

  useEffect(() => { setSfxVolumeGain(sfxVolume); }, [sfxVolume]);
  useEffect(() => { localStorage.setItem("vertigo-lang", lang); }, [lang]);

  // Draven's "check me" pulse should only ever nag once per visit — once the
  // chat has been opened for the first time, it's off for the rest of the session.
  const [petEverOpened, setPetEverOpened] = useState(false);
  useEffect(() => { if (chatOpen) setPetEverOpened(true); }, [chatOpen]);
  // Single monotonic z-counter shared by every window in the app, including
  // file-viewer popups spawned inside MyProjectsWin — guarantees whatever was
  // clicked last is always strictly on top, regardless of window type.
  const zCounterRef = useRef(Math.max(...Object.values(DEFAULT_Z)));
  const nextZ = () => { zCounterRef.current += 1; return zCounterRef.current; };

  const focus = (id: WinId) => setZ(prev => ({ ...prev, [id]: nextZ() }));

  const toggle = (id: WinId, isOpen: boolean, setOpen: (v: boolean) => void) => {
    if (isOpen) { playClose(); setOpen(false); }
    else { playOpen(); setOpen(true); focus(id); }
  };

  // FATAL ERROR nag — fires once if the visitor hasn't opened MY PROJECTS
  // within a while of the splash screen dismissing.
  const [showFatalError, setShowFatalError] = useState(false);
  const [autoNavSignal,  setAutoNavSignal]  = useState(0);
  const fatalShownRef = useRef(false);
  const projectsEverOpenedRef = useRef(false);

  useEffect(() => { if (projOpen) projectsEverOpenedRef.current = true; }, [projOpen]);

  useEffect(() => {
    if (splashVisible) return;
    const t = setTimeout(() => {
      if (!projectsEverOpenedRef.current && !fatalShownRef.current) {
        fatalShownRef.current = true;
        setShowFatalError(true);
      }
    }, 40000);
    return () => clearTimeout(t);
  }, [splashVisible]);

  const handleGoToProjects = () => {
    setShowFatalError(false);
    setProjOpen(true);
    focus("projects");
    setAutoNavSignal(s => s + 1);
  };

  const resetLayout = () => {
    setVizOpen(true); setPhotoOpen(true); setNotesOpen(true);
    setSysinfoOpen(false); setPrefsOpen(false); setAboutOpen(false);
    setProjOpen(false); setBggenOpen(false); setContactOpen(false); setNetworkOpen(false); setBlogOpen(false);
    setTrackerOpen(false); setChatOpen(false); setJournalOpen(false); setFeedbackOpen(false);
    setBgSvg(null);
    setZ(DEFAULT_Z);
    zCounterRef.current = Math.max(...Object.values(DEFAULT_Z));
    setLayoutKey(k => k + 1);
  };

  const locale = lang === "es" ? "es-ES" : lang === "ca" ? "ca-ES" : "en-US";
  const timeStr = clock.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit", hour12: false });
  const dateStr = clock.toLocaleDateString(locale, { year: "numeric", month: "2-digit", day: "2-digit" });

  // Highest z-index among currently-open windows only — a closed window can
  // still hold the numerically-highest z from its last focus, so it must be
  // excluded or nothing would end up highlighted as "active".
  const openMap: Record<WinId, boolean> = {
    visualizer: vizOpen, photo: photoOpen, notes: notesOpen, sysinfo: sysinfoOpen,
    prefs: prefsOpen, about: aboutOpen, bggen: bggenOpen, projects: projOpen,
    blog: blogOpen, tracker: trackerOpen, chat: chatOpen, journal: journalOpen, feedback: feedbackOpen,
  };
  const activeZ = (Object.keys(z) as WinId[]).reduce((best, id) => (openMap[id] && z[id] > best ? z[id] : best), -1);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
    <ActiveWinContext.Provider value={activeZ}>
      <style>{GLOBAL_CSS}</style>
      <div className="app-root" style={{ width: "100vw", height: "100vh", background: "var(--bg-main)", position: "relative", overflow: "hidden", ...(bgSvg ? {} : bgStyle(bgPattern)) }}>

        {/* SVG background layer */}
        {bgSvg && (
          <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
            <BackgroundSvg type={bgSvg.type} seed={bgSvg.seed}/>
          </div>
        )}

        {/* Noise overlay */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 998, opacity: 0.038, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "140px" }} />

        {/* Mobile-only "better on desktop" bouncing watermark */}
        {MOBILE && <MobileDesktopHint />}

        {/* System bar */}
        <div className="system-bar" style={{ position: "fixed", top: 0, left: 0, right: 0, height: 20, background: "var(--bg-panel)", borderBottom: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", zIndex: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span className="sysbar-decorative" style={{ ...PX, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text-primary)" }}>SYSTEM v2.1</span>
            <div className="sysbar-decorative" style={{ display: "flex", gap: 12 }}>
              {[t.systemBar.menuFile, t.systemBar.menuEdit, t.systemBar.menuView, t.systemBar.menuSpecial].map(m => (
                <button key={m} style={{ ...PX, fontSize: 8, textTransform: "uppercase", background: "transparent", border: "none", cursor: "pointer", color: "var(--text-primary)", padding: "0 2px" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>{m}</button>
              ))}
            </div>
            <button onClick={() => { playClick(); setShowFatalError(true); }} title="Trigger the FATAL ERROR nag manually"
              style={{ ...PX, fontSize: 8, textTransform: "uppercase", background: "transparent", border: "none", cursor: "pointer", color: "var(--color-error)", padding: "0 2px" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>{t.systemBar.debug}</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", gap: 2 }}>
              {(["es", "ca", "en"] as Lang[]).map(l => (
                <button key={l} className="lang-btn" onClick={() => { playClick(); setLang(l); }} title={l === "es" ? "Español" : l === "ca" ? "Català" : "English"}
                  style={{ ...PX, fontSize: 8, textTransform: "uppercase", background: lang === l ? "var(--bg-active)" : "transparent", color: lang === l ? "var(--bg-window)" : "var(--text-secondary)", border: "1px solid var(--border-color)", cursor: "pointer", padding: "1px 5px" }}>
                  {l}
                </button>
              ))}
            </div>
            <span className="sysbar-decorative" style={{ ...PX, fontSize: 8, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 3 }}>
              <span style={{ animation: "led-blink 2s ease-in-out infinite" }}>●</span> {t.systemBar.online}
            </span>
            <span className="sysbar-decorative" style={{ ...PX, fontSize: 8, color: "var(--text-secondary)" }}>guest@desktop</span>
            <span className="sysbar-decorative" style={{ ...PX, fontSize: 8, color: "var(--text-primary)" }}>{dateStr}</span>
            <span style={{ ...PX, fontSize: 9, color: "var(--text-primary)" }}>{timeStr}</span>
          </div>
        </div>

        <div className="workspace" style={{ position: "absolute", top: 20, bottom: 58, left: 0, right: 0 }}>
          <div style={{ position: "absolute", top: 22, left: 20, ...BOLDONSE, fontSize: 11, color: "var(--text-tertiary)", letterSpacing: "0.2em", textTransform: "uppercase", userSelect: "none", pointerEvents: "none" }}>
            {t.desktop.label}
          </div>

          <DesktopIcon icon={Folder}     label={t.desktop.myProjects} x={18} y={54}  onOpen={() => toggle("projects", projOpen, setProjOpen)} />
          <DesktopIcon icon={Music}      label={t.desktop.music}      x={18} y={130} onOpen={() => toggle("visualizer", vizOpen,   setVizOpen)} />
          <DesktopIcon icon={Image}      label={t.desktop.photos}     x={18} y={206} onOpen={() => toggle("photo",      photoOpen, setPhotoOpen)} />
          <DesktopIcon icon={Info}       label={t.desktop.about}      x={18} y={282} onOpen={() => toggle("notes",      notesOpen, setNotesOpen)} />
          <DesktopIcon icon={Paintbrush} label={t.desktop.bgGen}      x={18} y={358} onOpen={() => toggle("bggen",     bggenOpen, setBggenOpen)} />
          <DesktopIcon icon={Globe}      label={t.desktop.blog}       x={18} y={434} onOpen={() => toggle("blog",      blogOpen,  setBlogOpen)} />
          <DesktopIcon icon={ListChecks} label={t.desktop.tracker}   x={18} y={510} onOpen={() => toggle("tracker", trackerOpen, setTrackerOpen)} />
          <DesktopIcon icon={BookOpen}     label={t.desktop.journal}   x={18} y={586} onOpen={() => toggle("journal",  journalOpen,  setJournalOpen)} />
          <DesktopIcon icon={MessageSquare} label={t.desktop.feedback}  x={18} y={662} onOpen={() => toggle("feedback", feedbackOpen, setFeedbackOpen)} />

          <React.Fragment key={layoutKey}>
            <MyProjectsWin   zIndex={z.projects}   onFocus={() => focus("projects")}   open={projOpen}    onClose={() => setProjOpen(false)} getNextZ={nextZ} autoNavigate={autoNavSignal} />
            <MusicVisualizer zIndex={z.visualizer} onFocus={() => focus("visualizer")} open={vizOpen}     onClose={() => setVizOpen(false)}     volume={volume} onVolumeChange={setVolume} autoplay={autoplay} />
            <PhotoViewer     zIndex={z.photo}       onFocus={() => focus("photo")}      open={photoOpen}   onClose={() => setPhotoOpen(false)} />
            <NotesWin        zIndex={z.notes}       onFocus={() => focus("notes")}      open={notesOpen}   onClose={() => setNotesOpen(false)} />
            <SysInfo         zIndex={z.sysinfo}     onFocus={() => focus("sysinfo")}    open={sysinfoOpen} onClose={() => setSysinfoOpen(false)} />
            <PrefsWin        zIndex={z.prefs}       onFocus={() => focus("prefs")}      open={prefsOpen}   onClose={() => setPrefsOpen(false)}   palette={palette} onPalette={setPalette} volume={volume} onVolumeChange={setVolume} sfxVolume={sfxVolume} onSfxVolumeChange={setSfxVolumeState} bgPattern={bgPattern} onBgPattern={setBgPattern} darkMode={darkMode} onDarkMode={setDarkMode} />
            <AboutWin        zIndex={z.about}       onFocus={() => focus("about")}      open={aboutOpen}   onClose={() => setAboutOpen(false)} />
            <BgGenWin        zIndex={z.bggen}       onFocus={() => focus("bggen")}      open={bggenOpen}   onClose={() => setBggenOpen(false)} bgSvg={bgSvg} onApplyBg={cfg => { setBgSvg(cfg); if (cfg) setBgPattern("flat"); }} />
            <BlogWin         zIndex={z.blog}        onFocus={() => focus("blog")}       open={blogOpen}    onClose={() => setBlogOpen(false)} />
            <TrackerWin      zIndex={z.tracker}     onFocus={() => focus("tracker")}    open={trackerOpen} onClose={() => setTrackerOpen(false)} />
            <PetChatWin      zIndex={z.chat}        onFocus={() => focus("chat")}       open={chatOpen}    onClose={() => setChatOpen(false)} />
            <JournalWin      zIndex={z.journal}     onFocus={() => focus("journal")}    open={journalOpen}   onClose={() => setJournalOpen(false)} />
            <FeedbackWin     zIndex={z.feedback}    onFocus={() => focus("feedback")}   open={feedbackOpen}  onClose={() => setFeedbackOpen(false)} />
          </React.Fragment>
        </div>

        {/* Modals */}
        {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
        {networkOpen && <NetworkModal onClose={() => setNetworkOpen(false)} />}

        {/* Fatal error nag */}
        {showFatalError && <FatalErrorModal onGoToProjects={handleGoToProjects} />}

        {/* First-run onboarding, once the splash has exited */}
        {!splashVisible && onboardingOpen && (
          <Modal title={t.onboarding.title} onClose={() => setOnboardingOpen(false)} width={360}>
            <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ ...MONO, fontSize: 11, color: "var(--text-primary)", lineHeight: 1.7 }}>
                {t.onboarding.body.map((line, i) => <div key={i} style={{ marginBottom: 6 }}>• {line}</div>)}
              </div>
              <button onClick={() => { playClick(); setOnboardingOpen(false); }}
                style={{ ...PX, fontSize: 9, padding: "9px 0", background: "var(--bg-active)", color: "var(--bg-window)", border: "1px solid var(--bg-active)", cursor: "pointer" }}>
                {t.onboarding.cta}
              </button>
            </div>
          </Modal>
        )}

        {/* Splash */}
        {splashVisible && <SplashScreen onEnter={handleEnter} exiting={splashExiting} skipLanguage={langPreset} />}

        {/* Pet — always visible after splash */}
        {!splashVisible && <PetWidget attention={!petEverOpened} onOpen={() => { if (!chatOpen) { playOpen(); setChatOpen(true); focus("chat"); } else focus("chat"); }} />}

        {/* Dock */}
        <div className="dock" style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 58, background: "var(--bg-panel)", borderTop: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", gap: 18, zIndex: 100 }}>
          <DockIcon icon={Home}             label={t.dock.home}    onClick={() => { playClick(); resetLayout(); }} />
          <DockIcon icon={Mail}             label={t.dock.contact} onClick={() => { playOpen(); setContactOpen(true); }} active={contactOpen} />
          <DockIcon icon={Rss}              label={t.dock.network} onClick={() => { playOpen(); setNetworkOpen(true); }}  active={networkOpen} />
          <DockIcon icon={SlidersHorizontal} label={t.dock.prefs}  onClick={() => toggle("prefs", prefsOpen, setPrefsOpen)}  active={prefsOpen} />
          <DockIcon icon={Monitor}          label={t.dock.system}  onClick={() => toggle("sysinfo", sysinfoOpen, setSysinfoOpen)} active={sysinfoOpen} />
          <DockIcon icon={User}             label={t.dock.about}   onClick={() => toggle("about", aboutOpen, setAboutOpen)}   active={aboutOpen} />
        </div>
      </div>
    </ActiveWinContext.Provider>
    </LanguageContext.Provider>
  );
}
