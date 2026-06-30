# Y2K Retro Aesthetic Guidelines

## Core Principles

**Era:** Late 1990s – early 2000s OS/UI design
**Feel:** Nostalgic, optimistic, "web 1.0" charm with pixel-perfect craftsmanship
**Vibe:** Not ironic, but sincere. Celebrate genuine retro beauty.

## Do's ✓

- **Pixel-perfect alignment:** No sub-pixel rendering, crisp 1px borders everywhere
- **Intentional whitespace:** Generous padding in panels, breathing room in layouts
- **Visible affordances:** Buttons look pressable (inset shadows, visible states)
- **Consistent grid:** Multiples of 4px spacing where possible, visual alignment preferred
- **System coherence:** UI elements behave like OS apps (windows have chrome, buttons have states)
- **Genuine retro fonts:** Press Start 2P (bitmap), Share Tech Mono (monospace), serif for decoration
- **Flat design with depth:** No gradients except title bars; use shadows for button press only
- **Animation restraint:** Smooth 0.05–2s animations, no jank. EQ pulses, marquee scrolls, blinks are fine
- **Metadata visibility:** Show file sizes, dates, specs in retro format (JPEG, 800×600, 56K MODEM)
- **Color scheme:** Navy/cyan/coral palette (modern retro), suggests early 2000s tech & digital optimism

## Don'ts ✗

- **No modern minimalism:** Don't strip UI to bare text (buttons need borders, states)
- **No drop shadows:** Flat stacking, inset shadows only (on press)
- **No rounded corners:** All UI elements have sharp edges (1px borders, 90° joins)
- **No transparency/blur:** Opaque colors only, no frosted glass or backdrop blur
- **No web3/AI aesthetics:** Avoid gradients, glows, holographic effects
- **No oversized typography:** Text should be readable at 6–9px (snappy, not airy)
- **No color psychology push:** Don't use colors to manipulate emotion (retro was straightforward)
- **No animated flourishes:** No entrance animations, no confetti, no page transitions
- **Light mode is the default**, but a dark mode toggle now exists (PREFERENCES → Display Mode) — every palette has a tuned dark variant. Default-on-load is still light; don't change that default without asking.
- **No slick polish:** Intentional quirks (blinking cursor, typewriter effect, loading bars) are better than smooth transitions

## Visual References

**Inspiration:**
- Windows 95/98 UI (title bars, window chrome)
- Mac OS 8/9 (Aqua precursor, beige aesthetics)
- Early 2000s gadgets (iPod, Nokia 3310, portable CD players)
- Geocities / early 2000s personal websites
- Adobe CoolType, Macromedia Flash intros
- Y2K fashion (glossy, iridescent, optimistic)

**Color palette ref:**
- Off-white/white backgrounds (#f5f5f5, #ffffff)
- Navy/teal primary (#46425e, #15788c)
- Bright cyan accents (#00b9be) — highlights, active states
- Salmon/coral accents (#ffb0a3, #ff6973) — hovers, warnings
- Dark purple borders (#46425e) — crisp definition

## Interactions

**Mouse hover:** Background color shift (light → medium)
**Click/press:** Inset shadow + 1px down translation (tactile feedback)
**Active state:** Teal highlight (#a8c4d4) or darker background
**Disabled:** Gray text (#9a7a7a), no cursor change

**Avoid:**
- Scale animations (growing/shrinking buttons)
- Rotation or skew
- Opacity fades (use color shifts instead)
- Bounce or elastic effects

## Content Tone

**Writing:**
- Technical but friendly (mention file sizes, specs, sys reqs)
- Metadata-forward (dates, file names, camera models)
- Lowercase emphasis (no all-caps, use > or — for callouts)
- Retro lingo: "online," "offline," "archived," "loading," "buffering"

**Examples:**
- ✓ "CRYSTALLINE.MP3 — 3:24 · 320kbps · 2001"
- ✗ "A timeless ambient journey through digital memory"
- ✓ "last online: summer 2001 · status: [offline]"
- ✗ "Eternally connected in the digital aether"

## Motion & Sound

**Animations:**
- `eq-pulse`: EQ bars animate when playing (feels alive, not static)
- `marquee-scroll`: Text scrolls when active (retro media player staple)
- `led-blink`: Status indicators pulse (alive signal, Y2K aesthetic)
- No page transitions, no route animations

**Sound (implemented ✅):**
- Synthesized square-wave UI blips via Web Audio API (no audio asset files) — open (rising chirp), close (falling chirp), click (short tick)
- Wired into every generic button, window open/close, modal close
- Independent "Effects Volume" slider in PREFERENCES (separate from Music Volume)
- Splash screen offers an explicit "enable sound" choice before autoplaying music — never autoplay audio without that opt-in

## Typography Specifics

### Press Start 2P
- Used for: window titles, buttons, labels, status text
- Size: 5–7px (tiny, arcade-like)
- Color: Usually #46425e (black) or #a8c4d4 (teal highlight)
- Avoid: Large text (looks like shouting), color backgrounds (too harsh)

### Share Tech Mono
- Used for: file names, metadata, monospace body text
- Size: 8–9px (more readable than PX)
- Color: #46425e (black), #15788c (teal), #7a6a6a (gray)
- Good for: "PENTAX K1000", "2001.06.21", code snippets

### IM Fell English (serif)
- Used for: decorative labels ("Desktop", headers)
- Size: 11px + (large, serif)
- Color: #d8b8b8 (very light, subtle)
- Sparingly (1-2 places per page)

## Icons

**Style:** Lucide React (modern, clean, plays well with retro design)
**Size:** 8–18px depending on context
**Color:** #46425e (black), #15788c (teal), #7a6a6a (gray)
**Avoid:** Emoji, overly detailed icons, gradients

## Imagery

**Photos:**
- CRT scanlines overlay (optional, on album art/hero images)
- Black borders/frames (#2a1a2a, #2a2a2a)
- `objectFit: "cover"` for consistent aspect ratios
- Slight grain/noise (add via CSS filter if needed)

**Mockups:**
- Drop in Figma design previews with retro borders
- Screenshot UI (add fake browser chrome if desired)

## Common Retro Patterns

### Loading Bar
```
████████░░░░░░░░░░ 42%
```

### File List
```
1. SONG.MP3      3:24
2. BEAT.WAV      2:58
3. VIBES.AIFF    5:01
```

### Status
```
● ONLINE
■ OFFLINE
▶ PLAYING
⏸ PAUSED
```

### Error Dialog
```
╔═══════════════════════╗
║ ERROR               ╳ ║
╠═══════════════════════╣
║ File not found.       ║
║ [Retry] [Cancel]      ║
╚═══════════════════════╝
```

## Accessibility + Retro

**Challenge:** Retro aesthetic (tiny fonts, low contrast) vs. accessibility
**Solution:**
- Minimum text size: 6px (visual design), but ensure line height 1.5+ (readability)
- Contrast: #46425e on #faf6f0 = very high (passes WCAG AA)
- Interactive targets: minimum 26×20px (easy to click)
- No color-only info (always pair with text/icons)
- Alt text on images (even if placeholder)

## Testing the Aesthetic

Before shipping a section:
1. **Visual:** Does it feel 1999-2003? (No modern smoothness, intentional quirks visible?)
2. **Consistency:** Colors match DESIGN.md palette? Borders 1px everywhere?
3. **Readability:** Can you read labels at normal zoom (not squinting)?
4. **Interaction:** Buttons feel pressable? Hover/press states visible?
5. **Metadata:** Are file names, dates, specs present? (Makes it "retro-real")
6. **No anachronism:** Check for modern UI patterns (sliders, cards, gradients)

## Future Expansions

If adding new sections, ask: "Would this exist on a 2001 desktop?"
- ✓ Photo viewer, media player, notes, file manager, system info
- ✗ Collaboration tool, real-time chat, analytics dashboard
- ✓ Contact form (old HTML form), guestbook
- ✗ Live notifications, push alerts
- ✓ **Shipped since:** fake browser window (BLOG), boot/splash screen with loading bar, FATAL ERROR crash-screen nag (a deliberately jarring, theme-independent easter egg — this is the one place "no anachronism" bends on purpose, since a crash screen reads as *more* period-authentic the more it breaks the polished UI around it)

## References & Resources

- **DESIGN.md** — Color, typography, spacing details
- **STYLES.md** — CSS/styling implementation rules
- **Figma source** — https://www.figma.com/design/0HsdMumJ7joRvlpwfK3KTw/Y2K-inspired-Retro-Website-Design
- **Y2K inspiration** — Webring, Geocities archives, Wayback Machine (late 90s sites)
