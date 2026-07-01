export type Lang = "es" | "en" | "ca";

export interface NoteLine { text: string; type: "comment" | "blank" | "accent" | "body" }
export type BlogBlock = { type: "p"; text: string } | { type: "img"; src: string; caption?: string };
export interface BlogPost { title: string; date: string; excerpt: string; body: BlogBlock[] }

export interface Strings {
  splash: {
    pickLanguage: string;
    title: string;
    tagline: string;
    initializing: string;
    systemReady: string;
    enterSound: string;
    enterNoSound: string;
    footer: string;
  };
  systemBar: {
    menuFile: string; menuEdit: string; menuView: string; menuSpecial: string;
    debug: string; online: string;
  };
  dock: {
    home: string; contact: string; network: string; prefs: string; system: string; about: string;
  };
  desktop: {
    label: string;
    myProjects: string; music: string; photos: string; about: string; bgGen: string; blog: string;
  };
  fatalError: {
    title: string; subtitle: string; body: string; cta: string;
  };
  contact: {
    title: string; name: string; namePlaceholder: string; email: string; emailPlaceholder: string;
    message: string; messagePlaceholder: string; send: string; cancel: string;
  };
  network: {
    title: string; subscribed: string; subscribedBody: string; intro: string;
    emailLabel: string; emailPlaceholder: string; subscribe: string; footer: string;
  };
  prefs: {
    title: string; statusBar: string; displayMode: string; light: string; dark: string;
    colorPalette: string; background: string; bgFlat: string; bgGrid: string; bgDots: string; bgLines: string;
    musicVolume: string; effectsVolume: string; language: string;
  };
  sysInfo: {
    title: string; statusBar: string; techStack: string; version: string;
    lblFramework: string; lblBundler: string; lblStyling: string; lblUi: string; lblAudio: string;
    lblFonts: string; lblPkgMgr: string; lblSource: string;
  };
  about: {
    title: string; lastUpdated: string; role: string; roleSub: string; bio: string;
  };
  blog: {
    title: string; heading: string; tagline: string; statusBar: string; backToList: string;
    noImage: string;
    posts: BlogPost[];
  };
  bgGen: {
    title: string; livePreview: string; algorithm: string;
    genPlasma: string; genMesh: string; genNoise: string; genPoly: string; genWaves: string; genDots: string;
    seed: string; roll: string; applied: string; apply: string; clear: string; footer: string;
  };
  music: {
    title: string; oscilloscope: string; spectrum: string; noTrack: string;
    noSignal: string; live: string; ready: string; idle: string;
    dropToLoad: string; dropFile: string;
  };
  photo: {
    lblFile: string; lblDate: string; lblDims: string; lblCamera: string; prev: string; next: string; zoom: string;
  };
  projects: {
    windowTitle: string; nameCol: string; typeCol: string; dateCol: string;
    emptyFolder: string; itemsSuffix: string; itemsWord: string; root: string; hintBar: string;
  };
  fileViewer: {
    notepadSuffix: string; videoSuffix: string; imageSuffix: string;
    fileMenu: string; editMenu: string; formatMenu: string; viewMenu: string;
    noVideo: string; noVideoHint: string; noImage: string; noImageHint: string; zoom: string;
  };
  notes: {
    windowTitle: string; lines: NoteLine[];
  };
  projectContent: { project01: string; project02: string; project03: string };
}

const ES: Strings = {
  splash: {
    pickLanguage: "ELIGE IDIOMA",
    title: "ALEJANDRO SANCHO",
    tagline: "PORTAFOLIO",
    initializing: "INICIANDO SISTEMA...",
    systemReady: "▶  SISTEMA LISTO",
    enterSound: "[ ACTIVAR SONIDO + ENTRAR ]",
    enterNoSound: "entrar sin sonido",
    footer: "ARTISTA 3D · ENTORNOS Y PROPS · DISEÑO GRÁFICO · DISEÑO WEB",
  },
  systemBar: {
    menuFile: "ARCHIVO", menuEdit: "EDITAR", menuView: "VER", menuSpecial: "ESPECIAL",
    debug: "DEBUG", online: "EN LÍNEA",
  },
  dock: {
    home: "INICIO", contact: "CONTACTO", network: "RED", prefs: "AJUSTES", system: "SISTEMA", about: "SOBRE MÍ",
  },
  desktop: {
    label: "Escritorio",
    myProjects: "MIS PROYECTOS", music: "MÚSICA", photos: "FOTOS", about: "SOBRE MÍ", bgGen: "GEN. FONDO", blog: "BLOG",
  },
  fatalError: {
    title: "ERROR FATAL",
    subtitle: "COMPORTAMIENTO INACEPTABLE DETECTADO",
    body: "¡Eh! Llevas un buen rato dando vueltas por aquí sin entrar en mis proyectos. ¡Eso es inaceptable!",
    cta: "→ IR A MIS PROYECTOS",
  },
  contact: {
    title: "CONTACTO.EXE",
    name: "Tu nombre", namePlaceholder: "nombre completo",
    email: "Tu email", emailPlaceholder: "tu@ejemplo.com",
    message: "Mensaje", messagePlaceholder: "escribe algo...",
    send: "ENVIAR →", cancel: "CANCELAR",
  },
  network: {
    title: "RED.EXE — BOLETÍN",
    subscribed: "SUSCRITO ✓",
    subscribedBody: "tendrás noticias mías eventualmente.",
    intro: "Novedades sobre proyectos nuevos, experimentos y cosas que me parecen interesantes. Sin spam. Poco frecuente.",
    emailLabel: "Correo electrónico", emailPlaceholder: "tu@ejemplo.com",
    subscribe: "SUSCRIBIRSE →",
    footer: "integración del boletín pendiente",
  },
  prefs: {
    title: "AJUSTES.EXE", statusBar: "LOS CAMBIOS SE APLICAN AL INSTANTE",
    displayMode: "Modo de Visualización", light: "CLARO", dark: "OSCURO",
    colorPalette: "Paleta de Colores", background: "Fondo",
    bgFlat: "LISO", bgGrid: "REJILLA", bgDots: "PUNTOS", bgLines: "LÍNEAS",
    musicVolume: "Volumen de Música", effectsVolume: "Volumen de Efectos", language: "Idioma",
  },
  sysInfo: {
    title: "SYSTEM_INFO.EXE", statusBar: "SISTEMA OK · SIN ERRORES",
    techStack: "TECNOLOGÍAS", version: "portfolio v2.1.0",
    lblFramework: "FRAMEWORK", lblBundler: "BUNDLER", lblStyling: "ESTILOS", lblUi: "UI", lblAudio: "AUDIO",
    lblFonts: "FUENTES", lblPkgMgr: "GESTOR PKG", lblSource: "FUENTE",
  },
  about: {
    title: "SOBRE_MI.EXE", lastUpdated: "ÚLTIMA ACTUALIZACIÓN · 2024",
    role: "Artista de Entornos", roleSub: "& Desarrollador Creativo",
    bio: "Construyendo mundos entre píxeles y polígonos. Artista de entornos de día, trasteador de webs retro de noche.",
  },
  blog: {
    title: "BLOG.EXE — NAVEGADOR", heading: "EL BLOG", tagline: "notas sobre arte 3d, diseño y proceso", statusBar: "LISTO",
    backToList: "← volver al listado", noImage: "SIN IMAGEN",
    posts: [
      {
        title: "Cómo construí este sitio (y por qué tiene pinta de Windows 98)", date: "2026.06.30",
        excerpt: "La idea, las referencias y las decisiones técnicas detrás de este portafolio — por qué un escritorio retro, por qué React monolítico, y por qué no hay ni un solo archivo de audio en toda la web.",
        body: [
          { type: "p", text: "Llevaba tiempo dándole vueltas a cómo quería presentar mi trabajo, y los portafolios típicos — grid de imágenes, scroll infinito, tipografía minimalista — no terminaban de representarme. Quería algo con personalidad, algo en lo que se notara que detrás hay alguien a quien le gustan los videojuegos, los sistemas operativos viejos y la estética de cuando internet todavía sonaba a módem. De ahí salió la idea: un escritorio Y2K funcional, con ventanas que se arrastran, un dock, una barra de sistema y un easter egg de error fatal si te quedas demasiado tiempo sin entrar en mis proyectos." },
          { type: "p", text: "A nivel técnico fue React + TypeScript con Vite y Tailwind, pero la decisión más rara — y la que mejor ha funcionado — fue mantener casi todo en un único archivo, App.tsx. En cualquier proyecto \"serio\" eso suena a mala práctica, pero aquí el sitio entero es básicamente un solo sistema interconectado: un contador de z-index compartido por todas las ventanas, un sistema de paletas de color que se aplica en caliente sobre variables CSS, y un gestor de archivos virtual para MIS PROYECTOS. Separarlo en quince componentes habría significado pasar las mismas props por todos lados sin ganar claridad real." },
          { type: "img", src: "", caption: "Pendiente — captura del escritorio con alguna paleta de color aplicada." },
          { type: "p", text: "Otra decisión que me gusta especialmente: no hay ni un solo archivo de sonido en el proyecto. Todos los clics, aperturas y cierres de ventana son beeps sintetizados en tiempo real con la Web Audio API. Es una tontería técnica, pero encaja perfecto con la estética — esos pitidos cuadrados de sistema operativo de los 2000 no suenan a nada que puedas grabar, hay que generarlos." },
          { type: "p", text: "El sistema de paletas también merece mención: cinco paletas de color (Y2K, DUSK, FOREST, SUNSET, MONO), cada una con su versión clara y oscura ajustada a mano, no invertida automáticamente. Cambiar de paleta o de modo aplica las variables CSS al instante sin recargar nada — toda la web reacciona en vivo." },
          { type: "p", text: "Lo que más me ha costado hasta ahora no es código, es contenido: escribir mis propios textos, decidir cómo sonar en español sin parecer un folleto corporativo, y elegir qué proyectos enseñar primero. Esa parte va más lenta que el código, pero es la que de verdad importa." },
        ],
      },
      {
        title: "Sustituye por un título real", date: "2025.12.01",
        excerpt: "Sustituye por un extracto breve — notas de proceso, desglose de proyectos, lo que quieras que cubra el blog.",
        body: [
          { type: "p", text: "Sustituye por el contenido real de esta entrada." },
        ],
      },
      {
        title: "Sustituye por un título real", date: "2025.11.01",
        excerpt: "Sustituye por un extracto breve — notas de proceso, desglose de proyectos, lo que quieras que cubra el blog.",
        body: [
          { type: "p", text: "Sustituye por el contenido real de esta entrada." },
        ],
      },
    ],
  },
  bgGen: {
    title: "BG_GENERATOR.EXE", livePreview: "VISTA PREVIA EN VIVO", algorithm: "Algoritmo",
    genPlasma: "PLASMA", genMesh: "MALLA", genNoise: "RUIDO", genPoly: "POLY", genWaves: "ONDAS", genDots: "PUNTOS",
    seed: "SEMILLA", roll: "NUEVA", applied: "✓ APLICADO", apply: "▶ APLICAR AL ESCRITORIO", clear: "QUITAR FONDO",
    footer: "animado · vectorial · adaptado a la paleta",
  },
  music: {
    title: "VISUALIZER.EXE", oscilloscope: "OSCILOSCOPIO", spectrum: "ESPECTRO", noTrack: "// NINGUNA PISTA CARGADA",
    noSignal: "SIN SEÑAL · ARRASTRA UN AUDIO O ELIGE PISTA",
    live: "▶ EN VIVO", ready: "■ LISTO", idle: "○ INACTIVO",
    dropToLoad: "SUELTA PARA CARGAR ↓", dropFile: "ARRASTRA UN ARCHIVO · CLIC PARA EXPLORAR",
  },
  photo: {
    lblFile: "ARCHIVO", lblDate: "FECHA", lblDims: "DIMENSIONES", lblCamera: "CÁMARA",
    prev: "◀ ANT", next: "SIG ▶", zoom: "ZOOM",
  },
  projects: {
    windowTitle: "MIS PROYECTOS — GESTOR DE ARCHIVOS",
    nameCol: "NOMBRE", typeCol: "TIPO", dateCol: "FECHA",
    emptyFolder: "CARPETA VACÍA", itemsSuffix: "ELEMENTOS", itemsWord: "elementos", root: "RAÍZ",
    hintBar: "CLIC SELECCIONAR  ·  DOBLE CLIC ABRIR",
  },
  fileViewer: {
    notepadSuffix: "— BLOC DE NOTAS", videoSuffix: "— REPRODUCTOR DE VIDEO", imageSuffix: "— VISOR DE IMÁGENES",
    fileMenu: "ARCHIVO", editMenu: "EDITAR", formatMenu: "FORMATO", viewMenu: "VER",
    noVideo: "SIN VIDEO", noVideoHint: "añade el src en los datos de PROJECTS",
    noImage: "SIN IMAGEN", noImageHint: "añade el src en los datos de PROJECTS",
    zoom: "ZOOM",
  },
  notes: {
    windowTitle: "README.TXT — BLOC DE NOTAS",
    lines: [
      { text: "// README.TXT — v1.0", type: "comment" },
      { text: "", type: "blank" },
      { text: "> Los límites de mi", type: "accent" },
      { text: "  lenguaje son los", type: "accent" },
      { text: "  límites de mi mundo.", type: "accent" },
      { text: "          — Wittgenstein", type: "accent" },
      { text: "", type: "blank" },
      { text: "  ¡hola! bienvenido a mi", type: "body" },
      { text: "  página / portafolio /", type: "body" },
      { text: "  retrato digital de mí", type: "body" },
      { text: "  mismo (?)", type: "body" },
      { text: "", type: "blank" },
      { text: "  vivo cerca de las", type: "body" },
      { text: "  montañas de barcelona,", type: "body" },
      { text: "  españa.", type: "body" },
      { text: "", type: "blank" },
      { text: "  artista 3d y diseñador", type: "body" },
      { text: "  creativo que no para", type: "body" },
      { text: "  de pensar — o como", type: "body" },
      { text: "  quieras llamar a", type: "body" },
      { text: "  alguien que nunca deja", type: "body" },
      { text: "  de pensar, aprender", type: "body" },
      { text: "  y crear.", type: "body" },
      { text: "", type: "blank" },
      { text: "// aquí encontrarás:", type: "comment" },
      { text: "  - mi portfolio", type: "body" },
      { text: "  - música que me gusta", type: "body" },
      { text: "    para concentrarme", type: "body" },
      { text: "  - diseños, fotos, pósters", type: "body" },
      { text: "  - diario de desarrollo", type: "body" },
      { text: "    de videojuegos", type: "body" },
      { text: "  - donde he trabajado y", type: "body" },
      { text: "    he estudiado", type: "body" },
      { text: "  - posts, trucos y análisis", type: "body" },
      { text: "    de lo que estudio y voy", type: "body" },
      { text: "    aprendiendo", type: "body" },
      { text: "  - cosas graciosas, útiles", type: "body" },
      { text: "    y no tan útiles.", type: "body" },
      { text: "", type: "blank" },
      { text: "// fin del archivo_", type: "comment" },
    ],
  },
  projectContent: {
    project01: "// PROYECTO_01 — SET DE ESPADAS\n\nAsset listo para videojuego, flujo de\ntrabajo de low a high poly y retopologizado.\nTexturas comprimidas y optimizadas para UE5.\n\nNo me ceñí del todo al concepto, ya que\nquise acercarme algo más al realismo en\nlugar de quedarme solo en lo estilizado.\n\nArte conceptual original de Maeve.\n\nHERRAMIENTAS: 3DS Max, Blender, ZBrush,\n       Substance Painter, Substance Designer,\n       Unreal Engine 5.7\nAÑO:  2025",
    project02: "// PROYECTO_02 — SET DE HACHAS\n\nCon este trabajo me centré en el texturizado\nestilizado al estilo Darksiders y formas\nexageradas para desarrollar un asset listo\npara videojuego.\n\nGracias a Jakob Gavelli por la referencia\ny a Visual Architects por la mentoría.\n\nHERRAMIENTAS: 3DS Max, Blender, ZBrush,\n       Substance Painter, Substance Designer,\n       Unreal Engine 5.7\nAÑO:  2025",
    project03: "// PROYECTO_03 — ENTORNO URBANO\n\nEntorno inspirado en la estética de\nBloodborne. Me centré en desarrollar piezas\nque pudieran usarse como kit.\n\nTodas las piezas y materiales están hechos\npor mí — solo algunas piezas de ambientación\ndel kit (decals, vegetación) vienen de las\nlibrerías gratuitas de FAB.\n\nHERRAMIENTAS: 3DS Max, Blender, ZBrush,\n       Substance Painter, Substance Designer,\n       Unreal Engine 5.7\nAÑO:  2026",
  },
};

const EN: Strings = {
  splash: {
    pickLanguage: "SELECT LANGUAGE",
    title: "ALEJANDRO SANCHO",
    tagline: "PORTFOLIO",
    initializing: "INITIALIZING SYSTEM...",
    systemReady: "▶  SYSTEM READY",
    enterSound: "[ ENABLE SOUND + ENTER ]",
    enterNoSound: "enter without sound",
    footer: "3D ARTIST · ENVIRONMENT & PROPS · GRAPHIC DESIGN · WEB DESIGN",
  },
  systemBar: {
    menuFile: "FILE", menuEdit: "EDIT", menuView: "VIEW", menuSpecial: "SPECIAL",
    debug: "DEBUG", online: "ONLINE",
  },
  dock: {
    home: "HOME", contact: "CONTACT", network: "NETWORK", prefs: "PREFS", system: "SYSTEM", about: "ABOUT",
  },
  desktop: {
    label: "Desktop",
    myProjects: "MY PROJECTS", music: "MUSIC", photos: "PHOTOS", about: "ABOUT", bgGen: "BG GEN", blog: "BLOG",
  },
  fatalError: {
    title: "FATAL ERROR",
    subtitle: "UNACCEPTABLE BEHAVIOR DETECTED",
    body: "Hey! You've been wandering this page a lot without checking my projects. That's unacceptable!",
    cta: "→ GO TO MY PROJECTS",
  },
  contact: {
    title: "CONTACT.EXE",
    name: "Your name", namePlaceholder: "full name",
    email: "Your email", emailPlaceholder: "you@example.com",
    message: "Message", messagePlaceholder: "say something...",
    send: "SEND →", cancel: "CANCEL",
  },
  network: {
    title: "NETWORK.EXE — NEWSLETTER",
    subscribed: "SUBSCRIBED ✓",
    subscribedBody: "you'll hear from me eventually.",
    intro: "Get updates on new projects, experiments and things I find interesting. No spam. Infrequent.",
    emailLabel: "Email address", emailPlaceholder: "you@example.com",
    subscribe: "SUBSCRIBE →",
    footer: "newsletter integration TBD",
  },
  prefs: {
    title: "PREFERENCES.EXE", statusBar: "CHANGES APPLY INSTANTLY",
    displayMode: "Display Mode", light: "LIGHT", dark: "DARK",
    colorPalette: "Color Palette", background: "Background",
    bgFlat: "FLAT", bgGrid: "GRID", bgDots: "DOTS", bgLines: "LINES",
    musicVolume: "Music Volume", effectsVolume: "Effects Volume", language: "Language",
  },
  sysInfo: {
    title: "SYSTEM_INFO.EXE", statusBar: "SYSTEM OK · NO ERRORS",
    techStack: "TECH STACK", version: "portfolio v2.1.0",
    lblFramework: "FRAMEWORK", lblBundler: "BUNDLER", lblStyling: "STYLING", lblUi: "UI", lblAudio: "AUDIO",
    lblFonts: "FONTS", lblPkgMgr: "PKG MGR", lblSource: "SOURCE",
  },
  about: {
    title: "ABOUT.EXE", lastUpdated: "LAST UPDATED · 2024",
    role: "Environment Artist", roleSub: "& Creative Dev",
    bio: "Crafting worlds between pixels and polygons. Environment artist by day, retro web tinkerer by night.",
  },
  blog: {
    title: "BLOG.EXE — BROWSER", heading: "THE BLOG", tagline: "notes on 3d art, design & process", statusBar: "DONE",
    backToList: "← back to list", noImage: "NO IMAGE SET",
    posts: [
      {
        title: "How I built this site (and why it looks like Windows 98)", date: "2026.06.30",
        excerpt: "The idea, the references and the technical decisions behind this portfolio — why a retro desktop, why a monolithic React file, and why there isn't a single audio file anywhere on the site.",
        body: [
          { type: "p", text: "I'd been turning over how I wanted to present my work for a while, and the typical portfolio format — image grid, infinite scroll, minimal typography — never quite felt like me. I wanted something with personality, something that made it obvious there's someone behind it who grew up on video games, old operating systems, and that early-internet aesthetic from back when the web still sounded like a modem handshake. That's where the idea came from: a working Y2K desktop, with draggable windows, a dock, a system bar, and a fatal-error easter egg if you wander around too long without checking out my projects." },
          { type: "p", text: "On the technical side it's React + TypeScript with Vite and Tailwind, but the strangest decision — and the one that's worked out best — was keeping almost everything in a single file, App.tsx. In most \"serious\" projects that screams bad practice, but here the whole site is essentially one interconnected system: a z-index counter shared across every window, a color-palette system applied live over CSS variables, and a virtual file manager for MY PROJECTS. Splitting it into fifteen components would have meant threading the same props everywhere without any real gain in clarity." },
          { type: "img", src: "", caption: "Pending — screenshot of the desktop with one of the color palettes applied." },
          { type: "p", text: "Another decision I'm especially fond of: there isn't a single audio file anywhere in the project. Every click, window open, and window close is a beep synthesized live with the Web Audio API. It's a small technical indulgence, but it fits the aesthetic perfectly — those square-wave system beeps from early-2000s operating systems aren't something you record, you have to generate them." },
          { type: "p", text: "The palette system is worth mentioning too: five color palettes (Y2K, DUSK, FOREST, SUNSET, MONO), each with a hand-tuned light and dark version rather than an auto-inverted one. Switching palette or mode applies the CSS variables instantly with no reload — the whole site reacts live." },
          { type: "p", text: "What's actually been the hardest part so far isn't code, it's content: writing my own copy, figuring out how to sound like myself in Spanish without it reading like a corporate brochure, and deciding which projects to lead with. That part moves a lot slower than the code, but it's the part that actually matters." },
        ],
      },
      {
        title: "Replace with a real post title", date: "2025.12.01",
        excerpt: "Replace with a short excerpt — workflow notes, project breakdowns, whatever you want the blog to cover.",
        body: [
          { type: "p", text: "Replace with the real content of this post." },
        ],
      },
      {
        title: "Replace with a real post title", date: "2025.11.01",
        excerpt: "Replace with a short excerpt — workflow notes, project breakdowns, whatever you want the blog to cover.",
        body: [
          { type: "p", text: "Replace with the real content of this post." },
        ],
      },
    ],
  },
  bgGen: {
    title: "BG_GENERATOR.EXE", livePreview: "LIVE PREVIEW", algorithm: "Algorithm",
    genPlasma: "PLASMA", genMesh: "MESH", genNoise: "NOISE", genPoly: "POLY", genWaves: "WAVES", genDots: "DOTS",
    seed: "SEED", roll: "ROLL", applied: "✓ APPLIED", apply: "▶ APPLY TO DESKTOP", clear: "CLEAR BACKGROUND",
    footer: "animated · vector · palette-aware",
  },
  music: {
    title: "VISUALIZER.EXE", oscilloscope: "OSCILLOSCOPE", spectrum: "SPECTRUM", noTrack: "// NO TRACK LOADED",
    noSignal: "NO SIGNAL · DROP AUDIO FILE OR SELECT TRACK",
    live: "▶ LIVE", ready: "■ READY", idle: "○ IDLE",
    dropToLoad: "DROP TO LOAD ↓", dropFile: "DROP FILE · CLICK TO BROWSE",
  },
  photo: {
    lblFile: "FILE", lblDate: "DATE", lblDims: "DIMS", lblCamera: "CAMERA",
    prev: "◀ PREV", next: "NEXT ▶", zoom: "ZOOM",
  },
  projects: {
    windowTitle: "MY PROJECTS — FILE MANAGER",
    nameCol: "NAME", typeCol: "TYPE", dateCol: "DATE",
    emptyFolder: "EMPTY FOLDER", itemsSuffix: "ITEMS", itemsWord: "items", root: "ROOT",
    hintBar: "CLICK SELECT  ·  DOUBLE-CLICK OPEN",
  },
  fileViewer: {
    notepadSuffix: "— NOTEPAD", videoSuffix: "— VIDEO PLAYER", imageSuffix: "— IMAGE VIEWER",
    fileMenu: "FILE", editMenu: "EDIT", formatMenu: "FORMAT", viewMenu: "VIEW",
    noVideo: "NO VIDEO SET", noVideoHint: "add src to PROJECTS data",
    noImage: "NO IMAGE SET", noImageHint: "add src to PROJECTS data",
    zoom: "ZOOM",
  },
  notes: {
    windowTitle: "README.TXT — NOTEPAD",
    lines: [
      { text: "// README.TXT — v1.0", type: "comment" },
      { text: "", type: "blank" },
      { text: "> The limits of my", type: "accent" },
      { text: "  language are the", type: "accent" },
      { text: "  limits of my world.", type: "accent" },
      { text: "          — Wittgenstein", type: "accent" },
      { text: "", type: "blank" },
      { text: "  hi! welcome to my", type: "body" },
      { text: "  webpage / portfolio /", type: "body" },
      { text: "  digital portrait of", type: "body" },
      { text: "  myself (?)", type: "body" },
      { text: "", type: "blank" },
      { text: "  based near the", type: "body" },
      { text: "  mountains of barcelona,", type: "body" },
      { text: "  spain.", type: "body" },
      { text: "", type: "blank" },
      { text: "  3d artist & non-stop", type: "body" },
      { text: "  brainy creative", type: "body" },
      { text: "  designer — or whatever", type: "body" },
      { text: "  etiquette fits someone", type: "body" },
      { text: "  who never stops", type: "body" },
      { text: "  thinking, learning,", type: "body" },
      { text: "  creating.", type: "body" },
      { text: "", type: "blank" },
      { text: "// here you will find:", type: "comment" },
      { text: "  - my portfolio", type: "body" },
      { text: "  - music I like to", type: "body" },
      { text: "    focus while working", type: "body" },
      { text: "  - designs, photos, posters", type: "body" },
      { text: "  - game dev diary", type: "body" },
      { text: "  - where I've worked", type: "body" },
      { text: "    and studied", type: "body" },
      { text: "  - posts, tricks & analysis", type: "body" },
      { text: "    of what I study and", type: "body" },
      { text: "    learn along the way", type: "body" },
      { text: "  - funny, useful and not", type: "body" },
      { text: "    so useful things.", type: "body" },
      { text: "", type: "blank" },
      { text: "// end of file_", type: "comment" },
    ],
  },
  projectContent: {
    project01: "// PROJECT_01 — SWORD SET\n\nGame-ready asset, workflow from low to high\nand retopologized. Textures compressed and\noptimized for UE5.\n\nI didn't stick completely to the concept\nsince I wanted to approach a bit of realism\nmore than just stylized.\n\nOriginal concept art from Maeve.\n\nTOOLS: 3DS Max, Blender, ZBrush,\n       Substance Painter, Substance Designer,\n       Unreal Engine 5.7\nYEAR:  2025",
    project02: "// PROJECT_02 — AXE SET\n\nWith this work I focused on Darksiders-\nstyle stylized texturing and exaggerated\nforms to develop a game-ready asset for\nvideogames.\n\nThanks to Jakob Gavelli for the reference\nand to Visual Architects for the mentorship.\n\nTOOLS: 3DS Max, Blender, ZBrush,\n       Substance Painter, Substance Designer,\n       Unreal Engine 5.7\nYEAR:  2025",
    project03: "// PROJECT_03 — STREET ENVIRONMENT\n\nEnvironment inspired by Bloodborne's\naesthetic. I focused on developing pieces\nthat can be used as a kit.\n\nAll pieces and materials are made by\nmyself — only some kit-dressing pieces\n(decals, foliage) are from FAB's free\nlibraries.\n\nTOOLS: 3DS Max, Blender, ZBrush,\n       Substance Painter, Substance Designer,\n       Unreal Engine 5.7\nYEAR:  2026",
  },
};

const CA: Strings = {
  splash: {
    pickLanguage: "TRIA IDIOMA",
    title: "ALEJANDRO SANCHO",
    tagline: "PORTFOLI",
    initializing: "INICIANT SISTEMA...",
    systemReady: "▶  SISTEMA LLEST",
    enterSound: "[ ACTIVAR SO + ENTRAR ]",
    enterNoSound: "entrar sense so",
    footer: "ARTISTA 3D · ENTORNS I PROPS · DISSENY GRÀFIC · DISSENY WEB",
  },
  systemBar: {
    menuFile: "ARXIU", menuEdit: "EDITAR", menuView: "VEURE", menuSpecial: "ESPECIAL",
    debug: "DEBUG", online: "EN LÍNIA",
  },
  dock: {
    home: "INICI", contact: "CONTACTE", network: "XARXA", prefs: "AJUSTOS", system: "SISTEMA", about: "SOBRE MI",
  },
  desktop: {
    label: "Escriptori",
    myProjects: "ELS MEUS PROJECTES", music: "MÚSICA", photos: "FOTOS", about: "SOBRE MI", bgGen: "GEN. FONS", blog: "BLOG",
  },
  fatalError: {
    title: "ERROR FATAL",
    subtitle: "COMPORTAMENT INACCEPTABLE DETECTAT",
    body: "Ei! Portes una bona estona voltant per aquí sense entrar als meus projectes. Això és inacceptable!",
    cta: "→ ANAR ALS MEUS PROJECTES",
  },
  contact: {
    title: "CONTACTE.EXE",
    name: "El teu nom", namePlaceholder: "nom complet",
    email: "El teu correu", emailPlaceholder: "tu@exemple.com",
    message: "Missatge", messagePlaceholder: "escriu alguna cosa...",
    send: "ENVIAR →", cancel: "CANCEL·LAR",
  },
  network: {
    title: "XARXA.EXE — BUTLLETÍ",
    subscribed: "SUBSCRIT ✓",
    subscribedBody: "tindràs notícies meves amb el temps.",
    intro: "Novetats sobre projectes nous, experiments i coses que trobo interessants. Sense spam. Poc freqüent.",
    emailLabel: "Adreça de correu", emailPlaceholder: "tu@exemple.com",
    subscribe: "SUBSCRIURE'S →",
    footer: "integració del butlletí pendent",
  },
  prefs: {
    title: "AJUSTOS.EXE", statusBar: "ELS CANVIS S'APLIQUEN A L'INSTANT",
    displayMode: "Mode de Visualització", light: "CLAR", dark: "FOSC",
    colorPalette: "Paleta de Colors", background: "Fons",
    bgFlat: "PLA", bgGrid: "QUADRÍCULA", bgDots: "PUNTS", bgLines: "LÍNIES",
    musicVolume: "Volum de Música", effectsVolume: "Volum d'Efectes", language: "Idioma",
  },
  sysInfo: {
    title: "SYSTEM_INFO.EXE", statusBar: "SISTEMA OK · SENSE ERRORS",
    techStack: "TECNOLOGIES", version: "portfolio v2.1.0",
    lblFramework: "FRAMEWORK", lblBundler: "BUNDLER", lblStyling: "ESTILS", lblUi: "UI", lblAudio: "ÀUDIO",
    lblFonts: "FONTS", lblPkgMgr: "GESTOR PKG", lblSource: "FONT",
  },
  about: {
    title: "SOBRE_MI.EXE", lastUpdated: "ÚLTIMA ACTUALITZACIÓ · 2024",
    role: "Artista d'Entorns", roleSub: "& Desenvolupador Creatiu",
    bio: "Construint mons entre píxels i polígons. Artista d'entorns de dia, trasteador de webs retro de nit.",
  },
  blog: {
    title: "BLOG.EXE — NAVEGADOR", heading: "EL BLOG", tagline: "notes sobre art 3d, disseny i procés", statusBar: "LLEST",
    backToList: "← tornar al llistat", noImage: "SENSE IMATGE",
    posts: [
      {
        title: "Com vaig construir aquest lloc (i per què sembla Windows 98)", date: "2026.06.30",
        excerpt: "La idea, les referències i les decisions tècniques darrere d'aquest portfoli — per què un escriptori retro, per què React monolític, i per què no hi ha ni un sol arxiu d'àudio a tota la web.",
        body: [
          { type: "p", text: "Feia temps que li donava voltes a com volia presentar la meva feina, i els portfolis típics — graella d'imatges, scroll infinit, tipografia minimalista — no m'acabaven de representar. Volia alguna cosa amb personalitat, alguna cosa on es notés que darrere hi ha algú a qui li agraden els videojocs, els sistemes operatius antics i l'estètica de quan internet encara sonava a mòdem. D'aquí va sortir la idea: un escriptori Y2K funcional, amb finestres que s'arrosseguen, un dock, una barra de sistema i un easter egg d'error fatal si et quedes massa temps sense entrar als meus projectes." },
          { type: "p", text: "A nivell tècnic va ser React + TypeScript amb Vite i Tailwind, però la decisió més estranya — i la que millor ha funcionat — va ser mantenir gairebé tot en un únic arxiu, App.tsx. En qualsevol projecte \"seriós\" això sona a mala pràctica, però aquí el lloc sencer és bàsicament un sol sistema interconnectat: un comptador de z-index compartit per totes les finestres, un sistema de paletes de color que s'aplica en calent sobre variables CSS, i un gestor d'arxius virtual per ELS MEUS PROJECTES. Separar-ho en quinze components hauria significat passar les mateixes props per tot arreu sense guanyar claredat real." },
          { type: "img", src: "", caption: "Pendent — captura de l'escriptori amb alguna paleta de color aplicada." },
          { type: "p", text: "Una altra decisió que m'agrada especialment: no hi ha ni un sol arxiu de so al projecte. Tots els clics, obertures i tancaments de finestra són beeps sintetitzats en temps real amb la Web Audio API. És una ximpleria tècnica, però encaixa perfectament amb l'estètica — aquells pitits quadrats de sistema operatiu dels 2000 no sonen a res que puguis gravar, cal generar-los." },
          { type: "p", text: "El sistema de paletes també mereix menció: cinc paletes de color (Y2K, DUSK, FOREST, SUNSET, MONO), cada una amb la seva versió clara i fosca ajustada a mà, no invertida automàticament. Canviar de paleta o de mode aplica les variables CSS a l'instant sense recarregar res — tota la web reacciona en viu." },
          { type: "p", text: "El que més m'ha costat fins ara no és codi, és contingut: escriure els meus propis textos, decidir com sonar en català sense semblar un fullet corporatiu, i triar quins projectes ensenyar primer. Aquesta part va molt més lenta que el codi, però és la que de veritat importa." },
        ],
      },
      {
        title: "Substitueix per un títol real", date: "2025.12.01",
        excerpt: "Substitueix per un extracte breu — notes de procés, desglossament de projectes, el que vulguis que cobreixi el blog.",
        body: [
          { type: "p", text: "Substitueix pel contingut real d'aquesta entrada." },
        ],
      },
      {
        title: "Substitueix per un títol real", date: "2025.11.01",
        excerpt: "Substitueix per un extracte breu — notes de procés, desglossament de projectes, el que vulguis que cobreixi el blog.",
        body: [
          { type: "p", text: "Substitueix pel contingut real d'aquesta entrada." },
        ],
      },
    ],
  },
  bgGen: {
    title: "BG_GENERATOR.EXE", livePreview: "PREVISUALITZACIÓ EN VIU", algorithm: "Algorisme",
    genPlasma: "PLASMA", genMesh: "MALLA", genNoise: "SOROLL", genPoly: "POLY", genWaves: "ONES", genDots: "PUNTS",
    seed: "LLAVOR", roll: "NOVA", applied: "✓ APLICAT", apply: "▶ APLICAR A L'ESCRIPTORI", clear: "TREURE FONS",
    footer: "animat · vectorial · adaptat a la paleta",
  },
  music: {
    title: "VISUALIZER.EXE", oscilloscope: "OSCIL·LOSCOPI", spectrum: "ESPECTRE", noTrack: "// CAP PISTA CARREGADA",
    noSignal: "SENSE SENYAL · ARROSSEGA UN ÀUDIO O TRIA PISTA",
    live: "▶ EN VIU", ready: "■ LLEST", idle: "○ INACTIU",
    dropToLoad: "DEIXA ANAR PER CARREGAR ↓", dropFile: "ARROSSEGA UN ARXIU · CLIC PER EXPLORAR",
  },
  photo: {
    lblFile: "ARXIU", lblDate: "DATA", lblDims: "DIMENSIONS", lblCamera: "CÀMERA",
    prev: "◀ ANT", next: "SEG ▶", zoom: "ZOOM",
  },
  projects: {
    windowTitle: "ELS MEUS PROJECTES — GESTOR D'ARXIUS",
    nameCol: "NOM", typeCol: "TIPUS", dateCol: "DATA",
    emptyFolder: "CARPETA BUIDA", itemsSuffix: "ELEMENTS", itemsWord: "elements", root: "ARREL",
    hintBar: "CLIC SELECCIONAR  ·  DOBLE CLIC OBRIR",
  },
  fileViewer: {
    notepadSuffix: "— BLOC DE NOTES", videoSuffix: "— REPRODUCTOR DE VÍDEO", imageSuffix: "— VISOR D'IMATGES",
    fileMenu: "ARXIU", editMenu: "EDITAR", formatMenu: "FORMAT", viewMenu: "VEURE",
    noVideo: "SENSE VÍDEO", noVideoHint: "afegeix el src a les dades de PROJECTS",
    noImage: "SENSE IMATGE", noImageHint: "afegeix el src a les dades de PROJECTS",
    zoom: "ZOOM",
  },
  notes: {
    windowTitle: "README.TXT — BLOC DE NOTES",
    lines: [
      { text: "// README.TXT — v1.0", type: "comment" },
      { text: "", type: "blank" },
      { text: "> Els límits del meu", type: "accent" },
      { text: "  llenguatge són els", type: "accent" },
      { text: "  límits del meu món.", type: "accent" },
      { text: "          — Wittgenstein", type: "accent" },
      { text: "", type: "blank" },
      { text: "  hola! benvingut a la", type: "body" },
      { text: "  meva pàgina / portfoli /", type: "body" },
      { text: "  retrat digital de mi", type: "body" },
      { text: "  mateix (?)", type: "body" },
      { text: "", type: "blank" },
      { text: "  visc prop de les", type: "body" },
      { text: "  muntanyes de barcelona,", type: "body" },
      { text: "  espanya.", type: "body" },
      { text: "", type: "blank" },
      { text: "  artista 3d i dissenyador", type: "body" },
      { text: "  creatiu que no para", type: "body" },
      { text: "  de pensar — o com", type: "body" },
      { text: "  vulguis anomenar algú", type: "body" },
      { text: "  que mai deixa de", type: "body" },
      { text: "  pensar, aprendre", type: "body" },
      { text: "  i crear.", type: "body" },
      { text: "", type: "blank" },
      { text: "// aquí trobaràs:", type: "comment" },
      { text: "  - el meu portfoli", type: "body" },
      { text: "  - música que m'agrada", type: "body" },
      { text: "    per concentrar-me", type: "body" },
      { text: "  - dissenys, fotos, pòsters", type: "body" },
      { text: "  - diari de dev de jocs", type: "body" },
      { text: "  - on he treballat i", type: "body" },
      { text: "    he estudiat", type: "body" },
      { text: "  - posts, trucs i anàlisis", type: "body" },
      { text: "    del que estudio i vaig", type: "body" },
      { text: "    aprenent", type: "body" },
      { text: "  - coses divertides, útils", type: "body" },
      { text: "    i no tan útils.", type: "body" },
      { text: "", type: "blank" },
      { text: "// fi de l'arxiu_", type: "comment" },
    ],
  },
  projectContent: {
    project01: "// PROJECTE_01 — SET D'ESPASES\n\nAsset llest per a videojoc, flux de\ntreball de low a high poly i retopologitzat.\nTextures comprimides i optimitzades per UE5.\n\nNo em vaig cenyir del tot al concepte, ja\nque vaig voler apropar-me una mica més al\nrealisme en lloc de quedar-me només en\nl'estilitzat.\n\nArt conceptual original de Maeve.\n\nEINES: 3DS Max, Blender, ZBrush,\n       Substance Painter, Substance Designer,\n       Unreal Engine 5.7\nANY:   2025",
    project02: "// PROJECTE_02 — SET DE DESTRALS\n\nAmb aquest treball em vaig centrar en el\ntexturitzat estilitzat a l'estil Darksiders\ni formes exagerades per desenvolupar un\nasset llest per a videojoc.\n\nGràcies a Jakob Gavelli per la referència\ni a Visual Architects per la mentoria.\n\nEINES: 3DS Max, Blender, ZBrush,\n       Substance Painter, Substance Designer,\n       Unreal Engine 5.7\nANY:   2025",
    project03: "// PROJECTE_03 — ENTORN URBÀ\n\nEntorn inspirat en l'estètica de\nBloodborne. Em vaig centrar en desenvolupar\npeces que poguessin usar-se com a kit.\n\nTotes les peces i materials estan fetes\nper mi — només algunes peces d'ambientació\ndel kit (decals, vegetació) venen de les\nbiblioteques gratuïtes de FAB.\n\nEINES: 3DS Max, Blender, ZBrush,\n       Substance Painter, Substance Designer,\n       Unreal Engine 5.7\nANY:   2026",
  },
};

export const STRINGS: Record<Lang, Strings> = { es: ES, en: EN, ca: CA };
