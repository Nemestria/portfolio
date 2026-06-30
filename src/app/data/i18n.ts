export type Lang = "es" | "en";

export interface NoteLine { text: string; type: "comment" | "blank" | "accent" | "body" }
export interface BlogPost { title: string; date: string; excerpt: string }

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
    title: string; heading: string; tagline: string; statusBar: string;
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
    posts: [
      { title: "Sustituye por un título real", date: "2026.01.01", excerpt: "Sustituye por un extracto breve — notas de proceso, desglose de proyectos, lo que quieras que cubra el blog." },
      { title: "Sustituye por un título real", date: "2025.12.01", excerpt: "Sustituye por un extracto breve — notas de proceso, desglose de proyectos, lo que quieras que cubra el blog." },
      { title: "Sustituye por un título real", date: "2025.11.01", excerpt: "Sustituye por un extracto breve — notas de proceso, desglose de proyectos, lo que quieras que cubra el blog." },
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
      { text: "  - mi portafolio", type: "body" },
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
    posts: [
      { title: "Replace with a real post title", date: "2026.01.01", excerpt: "Replace with a short excerpt — workflow notes, project breakdowns, whatever you want the blog to cover." },
      { title: "Replace with a real post title", date: "2025.12.01", excerpt: "Replace with a short excerpt — workflow notes, project breakdowns, whatever you want the blog to cover." },
      { title: "Replace with a real post title", date: "2025.11.01", excerpt: "Replace with a short excerpt — workflow notes, project breakdowns, whatever you want the blog to cover." },
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

export const STRINGS: Record<Lang, Strings> = { es: ES, en: EN };
