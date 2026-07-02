export type Lang = "es" | "en" | "ca";

export interface NoteLine { text: string; type: "comment" | "blank" | "accent" | "body" }
export type BlogBlock = { type: "p"; text: string } | { type: "img"; src: string; caption?: string };
export interface BlogPost { title: string; date: string; excerpt: string; body: BlogBlock[] }
export type TrackerStatus = "wip" | "next" | "done" | "hold";
export interface TrackerItem { label: string; status: TrackerStatus; note?: string; }
export interface TrackerLane { label: string; items: TrackerItem[]; }
export type JournalMediaType = "movie" | "book";
export interface JournalEntry { type: JournalMediaType; title: string; author?: string; year?: number; date?: string; rating?: number; note?: string; }

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
    myProjects: string; music: string; photos: string; about: string; bgGen: string; blog: string; tracker: string; journal: string; feedback: string;
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
    notWorking: string; socialMsg: string; instagram: string; linkedin: string;
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
  tracker: {
    title: string; statusBar: string;
    wipLabel: string; nextLabel: string; doneLabel: string; holdLabel: string;
    lanes: TrackerLane[];
  };
  journal: {
    title: string; moviesTab: string; booksTab: string;
    noNote: string; ratingLabel: string;
    entries: JournalEntry[];
  };
  feedback: {
    title: string; question: string;
    hate: string; neutral: string; love: string; other: string;
    otherPlaceholder: string; send: string;
    thanks: string; thanksDetail: string;
    hateTip: string;
  };
  pet: {
    name: string; chatTitle: string; inputPlaceholder: string; greeting: string;
    funnyQuips: string[];
    quickReplies: Array<{ label: string; query: string }>;
    responses: {
      hello: string; navigate: string; password: string;
      projects: string; about: string; contact: string;
      music: string; stack: string; tracker: string;
    };
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
    home: "INICIO", contact: "CONTACTO", network: "RED", prefs: "AJUSTES", system: "SISTEMA", about: "ALEJANDRO SANCHO",
  },
  desktop: {
    label: "Escritorio",
    myProjects: "MIS PROYECTOS", music: "MÚSICA", photos: "FOTOS", about: "SOBRE MÍ", bgGen: "GEN. FONDO", blog: "BLOG", tracker: "TRACKER", journal: "DIARIO", feedback: "BUZÓN",
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
    subscribed: "¡RECIBIDO! ✓",
    subscribedBody: "No funciona de verdad, ¡pero aprecio mucho la intención! Si quieres, mándame un hola por aquí:",
    intro: "Novedades sobre proyectos nuevos, experimentos y cosas que me parecen interesantes. Sin spam. Poco frecuente.",
    emailLabel: "Correo electrónico", emailPlaceholder: "tu@ejemplo.com",
    subscribe: "SUSCRIBIRSE →",
    footer: "integración del boletín pendiente",
    notWorking: "No funciona de verdad, ¡pero aprecio mucho la intención!",
    socialMsg: "Si quieres, mándame un hola por aquí:",
    instagram: "@soyvertigo",
    linkedin: "LinkedIn",
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
      { text: "> Los límites de mi lenguaje son los límites de mi mundo.", type: "accent" },
      { text: "          — Wittgenstein", type: "accent" },
      { text: "", type: "blank" },
      { text: "¡hola! bienvenido a mi página / portafolio / retrato digital de mí mismo (?)", type: "body" },
      { text: "", type: "blank" },
      { text: "vivo cerca de las montañas de barcelona, españa. artista 3d y diseñador creativo que no para de pensar — o como quieras llamar a alguien que nunca deja de pensar, aprender y crear.", type: "body" },
      { text: "", type: "blank" },
      { text: "// aquí encontrarás:", type: "comment" },
      { text: "  - mi portfolio y proyectos 3d", type: "body" },
      { text: "  - música que me gusta para concentrarme", type: "body" },
      { text: "  - diseños, fotos, pósters", type: "body" },
      { text: "  - diario de desarrollo de videojuegos", type: "body" },
      { text: "  - donde he trabajado y he estudiado", type: "body" },
      { text: "  - posts, trucos y análisis de lo que estudio y voy aprendiendo", type: "body" },
      { text: "  - cosas graciosas, útiles y no tan útiles.", type: "body" },
      { text: "", type: "blank" },
      { text: "// fin del archivo_", type: "comment" },
    ],
  },
  tracker: {
    title: "TRACKER.EXE", statusBar: "ACTUALIZADO · 2026.07",
    wipLabel: "EN CURSO", nextLabel: "SIGUIENTE", doneLabel: "HECHO ✓", holdLabel: "PAUSADO",
    lanes: [
      {
        label: "WEB DESIGN",
        items: [
          { label: "Portfolio web retro", status: "wip", note: "¡Estás mirando!" },
          { label: "Dominio personalizado", status: "next", note: "pendiente de decidir" },
          { label: "[Cliente — sustitúyeme]", status: "next" },
        ],
      },
      {
        label: "3D ART",
        items: [
          { label: "Set de espadas", status: "done" },
          { label: "Set de hachas", status: "done" },
          { label: "Entorno Bloodborne", status: "wip", note: "Puliendo iluminación" },
          { label: "Proyecto personaje", status: "next" },
        ],
      },
      {
        label: "GAME DESIGN",
        items: [
          { label: "Concepto de juego", status: "next" },
          { label: "Documento de diseño", status: "hold", note: "pendiente de ideas" },
        ],
      },
      {
        label: "SPORT & LIFE",
        items: [
          { label: "Entrenamiento regular", status: "wip" },
          { label: "[Objetivo — sustitúyeme]", status: "wip" },
          { label: "[Meta — sustitúyeme]", status: "next" },
        ],
      },
    ],
  },
  journal: {
    title: "DIARIO.EXE", moviesTab: "PELÍCULAS", booksTab: "LIBROS",
    noNote: "sin nota", ratingLabel: "valoración",
    entries: [
      { type: "movie", title: "[Peli 1 — sustitúyeme]", author: "Director", year: 2024, date: "2026.01", rating: 4, note: "Añade tu reseña aquí." },
      { type: "movie", title: "[Peli 2 — sustitúyeme]", author: "Director", year: 2023, date: "2025.11", rating: 3 },
      { type: "book", title: "[Libro 1 — sustitúyeme]", author: "Autor", year: 2022, date: "2026.03", rating: 5, note: "Añade tu reseña aquí." },
      { type: "book", title: "[Libro 2 — sustitúyeme]", author: "Autor", year: 2024, date: "2025.12", rating: 4 },
    ],
  },
  feedback: {
    title: "BUZÓN.EXE — FEEDBACK",
    question: "¿Te ha gustado la web?",
    hate: "La odio", neutral: "Meh", love: "¡Me encanta!", other: "Otro",
    otherPlaceholder: "cuéntame más...",
    send: "ENVIAR →",
    thanks: "¡Recibido! Gracias por tu feedback.",
    thanksDetail: "Draven lo leerá primero.",
    hateTip: "(si puedes alcanzarlo)",
  },
  pet: {
    name: "Draven", chatTitle: "DRAVEN.EXE — MI GATO", inputPlaceholder: "pregunta algo...",
    greeting: "¡Miau! Soy Draven, el gato de Alejandro. Llevo vigilando este escritorio desde que él me adoptó. Puedo ayudarte a navegar, hablar de proyectos, el stack... ¡o simplemente chatear!",
    funnyQuips: [
      "Ese prompt tiene menos polígonos que un cubo de Blender.",
      "Error 404: respuesta no encontrada. Mis normales apuntan en otra dirección.",
      "Stack overflow en mi corteza felina. Por favor, reinicia la pregunta.",
      "Eso está fuera de mi bounding box de conocimiento.",
      "Mi UV map no cubre esa área geográfica de datos.",
      "He subdividido demasiado la malla para procesar eso.",
      "Null pointer exception en mis pensamientos felinos. Inténtalo de nuevo.",
      "Ese tema tiene más artifacts que una textura a 4×4 píxeles.",
      "He consultado mi shader graph y no hay output node para eso.",
      "Error de compilación en mi cerebro: topología no triangulada.",
    ],
    quickReplies: [
      { label: "NAVEGAR", query: "cómo navegar" },
      { label: "PROYECTOS", query: "proyectos" },
      { label: "SOBRE MÍ", query: "sobre alejandro" },
      { label: "CONTACTO", query: "contacto" },
      { label: "MÚSICA", query: "música" },
      { label: "STACK", query: "stack" },
      { label: "TRACKER", query: "tracker" },
    ],
    responses: {
      hello: "¡Hola! Me alegra verte por aquí. ¿En qué puedo ayudarte?",
      navigate: "Haz doble clic en los iconos del escritorio para abrir apps. Arrastra las ventanas. El dock de abajo tiene accesos rápidos. ¡Revisa MIS PROYECTOS!",
      password: "¿La contraseña? Échale un vistazo al escritorio de la escena 3D... puede que haya una nota por ahí. 👀",
      projects: "Alejandro es artista de entornos 3D. En MIS PROYECTOS puedes ver el set de espadas, el de hachas y el entorno urbano.",
      about: "Alejandro es artista 3D y desarrollador creativo, vive cerca de Barcelona. ¡Construye entornos, props y webs retro como ésta! (Y me alimenta a mí, lo cual es lo más importante.)",
      contact: "Pulsa CONTACTO en el dock. O NETWORK para suscribirte al boletín. ¡No muerde! Yo sí, pero eso es otra historia.",
      music: "Abre MÚSICA desde el escritorio para cargar pistas o usar las integradas. ¡El osciloscopio es muy satisfactorio!",
      stack: "React + TypeScript + Vite, todo en un App.tsx. Audio sintetizado puro sin archivos. Estética retro en CSS puro.",
      tracker: "Abre el TRACKER desde el escritorio para ver en qué está trabajando Alejandro ahora mismo y qué viene después.",
    },
  },
  projectContent: {
    project01: "// PROYECTO_01 — SET DE ESPADAS\n\nAsset listo para videojuego, flujo de trabajo de low a high poly y retopologizado. Texturas comprimidas y optimizadas para UE5.\n\nNo me ceñí del todo al concepto, ya que quise acercarme algo más al realismo en lugar de quedarme solo en lo estilizado.\n\nArte conceptual original de Maeve.\n\nHERRAMIENTAS: 3DS Max, Blender, ZBrush,\n       Substance Painter, Substance Designer,\n       Unreal Engine 5.7\nAÑO:  2025",
    project02: "// PROYECTO_02 — SET DE HACHAS\n\nCon este trabajo me centré en el texturizado estilizado al estilo Darksiders y formas exageradas para desarrollar un asset listo para videojuego.\n\nGracias a Jakob Gavelli por la referencia y a Visual Architects por la mentoría.\n\nHERRAMIENTAS: 3DS Max, Blender, ZBrush,\n       Substance Painter, Substance Designer,\n       Unreal Engine 5.7\nAÑO:  2025",
    project03: "// PROYECTO_03 — ENTORNO URBANO\n\nEntorno inspirado en la estética de Bloodborne. Me centré en desarrollar piezas que pudieran usarse como kit.\n\nTodas las piezas y materiales están hechos por mí — solo algunas piezas de ambientación del kit (decals, vegetación) vienen de las librerías gratuitas de FAB.\n\nHERRAMIENTAS: 3DS Max, Blender, ZBrush,\n       Substance Painter, Substance Designer,\n       Unreal Engine 5.7\nAÑO:  2026",
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
    home: "HOME", contact: "CONTACT", network: "NETWORK", prefs: "PREFS", system: "SYSTEM", about: "ALEJANDRO SANCHO",
  },
  desktop: {
    label: "Desktop",
    myProjects: "MY PROJECTS", music: "MUSIC", photos: "PHOTOS", about: "ABOUT", bgGen: "BG GEN", blog: "BLOG", tracker: "TRACKER", journal: "JOURNAL", feedback: "MAILBOX",
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
    subscribed: "GOT IT! ✓",
    subscribedBody: "Not actually working, but I appreciate the intention! If you want, just hit me a hello here:",
    intro: "Get updates on new projects, experiments and things I find interesting. No spam. Infrequent.",
    emailLabel: "Email address", emailPlaceholder: "you@example.com",
    subscribe: "SUBSCRIBE →",
    footer: "newsletter integration TBD",
    notWorking: "Not actually working, but I appreciate the intention!",
    socialMsg: "If you want, just hit me a hello here:",
    instagram: "@soyvertigo",
    linkedin: "LinkedIn",
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
      { text: "> The limits of my language are the limits of my world.", type: "accent" },
      { text: "          — Wittgenstein", type: "accent" },
      { text: "", type: "blank" },
      { text: "hi! welcome to my webpage / portfolio / digital portrait of myself (?)", type: "body" },
      { text: "", type: "blank" },
      { text: "based near the mountains of barcelona, spain. 3d artist & non-stop brainy creative designer — or whatever etiquette fits someone who never stops thinking, learning, creating.", type: "body" },
      { text: "", type: "blank" },
      { text: "// here you will find:", type: "comment" },
      { text: "  - my portfolio and 3d projects", type: "body" },
      { text: "  - music I like to focus while working", type: "body" },
      { text: "  - designs, photos, posters", type: "body" },
      { text: "  - game dev diary", type: "body" },
      { text: "  - where I've worked and studied", type: "body" },
      { text: "  - posts, tricks & analysis of what I study and learn along the way", type: "body" },
      { text: "  - funny, useful and not so useful things.", type: "body" },
      { text: "", type: "blank" },
      { text: "// end of file_", type: "comment" },
    ],
  },
  tracker: {
    title: "TRACKER.EXE", statusBar: "UPDATED · 2026.07",
    wipLabel: "IN PROGRESS", nextLabel: "NEXT UP", doneLabel: "DONE ✓", holdLabel: "ON HOLD",
    lanes: [
      {
        label: "WEB DESIGN",
        items: [
          { label: "Retro web portfolio", status: "wip", note: "You're looking at it!" },
          { label: "Custom domain", status: "next", note: "decision pending" },
          { label: "[Client — replace me]", status: "next" },
        ],
      },
      {
        label: "3D ART",
        items: [
          { label: "Sword set", status: "done" },
          { label: "Axe set", status: "done" },
          { label: "Bloodborne env.", status: "wip", note: "Polishing lighting" },
          { label: "Character project", status: "next" },
        ],
      },
      {
        label: "GAME DESIGN",
        items: [
          { label: "Game concept", status: "next" },
          { label: "Design document", status: "hold", note: "ideas pending" },
        ],
      },
      {
        label: "SPORT & LIFE",
        items: [
          { label: "Regular training", status: "wip" },
          { label: "[Goal — replace me]", status: "wip" },
          { label: "[Target — replace me]", status: "next" },
        ],
      },
    ],
  },
  journal: {
    title: "JOURNAL.EXE", moviesTab: "MOVIES", booksTab: "BOOKS",
    noNote: "no note", ratingLabel: "rating",
    entries: [
      { type: "movie", title: "[Movie 1 — replace me]", author: "Director", year: 2024, date: "2026.01", rating: 4, note: "Add your review here." },
      { type: "movie", title: "[Movie 2 — replace me]", author: "Director", year: 2023, date: "2025.11", rating: 3 },
      { type: "book", title: "[Book 1 — replace me]", author: "Author", year: 2022, date: "2026.03", rating: 5, note: "Add your review here." },
      { type: "book", title: "[Book 2 — replace me]", author: "Author", year: 2024, date: "2025.12", rating: 4 },
    ],
  },
  feedback: {
    title: "MAILBOX.EXE — FEEDBACK",
    question: "Did you like this website?",
    hate: "Hate it", neutral: "Meh", love: "Love it!", other: "Other",
    otherPlaceholder: "tell me more...",
    send: "SEND →",
    thanks: "Got it! Thanks for the feedback.",
    thanksDetail: "Draven will read it first.",
    hateTip: "(if you can catch it)",
  },
  pet: {
    name: "Draven", chatTitle: "DRAVEN.EXE — MY CAT", inputPlaceholder: "ask something...",
    greeting: "Meow! I'm Draven, Alejandro's cat. I've been guarding this desk since he adopted me. Ask me about navigation, projects, the tech stack... or just chat!",
    funnyQuips: [
      "That query has fewer polygons than a default Blender cube.",
      "Error 404: answer not found. My normals are pointing the wrong way.",
      "Stack overflow in my feline cortex. Please restart the question.",
      "That's outside my knowledge bounding box.",
      "My UV map doesn't cover that geographic data area.",
      "I've over-subdivided my mesh and can't process that.",
      "Null pointer exception in my cat brain. Try again.",
      "That topic has more artifacts than a 4×4 texture.",
      "I checked my shader graph and there's no output node for that.",
      "Compile error in my brain: untriangulated topology.",
    ],
    quickReplies: [
      { label: "NAVIGATE", query: "how to navigate" },
      { label: "PROJECTS", query: "projects" },
      { label: "ABOUT", query: "about alejandro" },
      { label: "CONTACT", query: "contact" },
      { label: "MUSIC", query: "music" },
      { label: "STACK", query: "tech stack" },
      { label: "TRACKER", query: "tracker" },
    ],
    responses: {
      hello: "Hey there! Glad you're here. What can I help you with?",
      navigate: "Double-click desktop icons to open apps. Drag windows around. The dock at the bottom has quick access. Check MY PROJECTS!",
      password: "The password? Look around the desk in the 3D scene... there might be a note somewhere. 👀",
      projects: "Alejandro is a 3D environment artist. Open MY PROJECTS to see the sword set, axe set and urban environment.",
      about: "Alejandro is a 3D artist and creative developer based near Barcelona. He builds environments, props and retro websites like this one! (And he feeds me, which is the most important thing.)",
      contact: "Hit CONTACT in the dock. Or NETWORK to subscribe to his newsletter. He doesn't bite! I do, but that's another story.",
      music: "Open MUSIC from the desktop to load tracks or use the built-in ones. The oscilloscope is very satisfying!",
      stack: "React + TypeScript + Vite, all in one App.tsx. Pure synthesized audio, no audio files. Retro aesthetics through pure CSS.",
      tracker: "Open the TRACKER from the desktop to see what Alejandro is working on right now and what's coming next.",
    },
  },
  projectContent: {
    project01: "// PROJECT_01 — SWORD SET\n\nGame-ready asset, workflow from low to high poly and retopologized. Textures compressed and optimized for UE5.\n\nI didn't stick completely to the concept since I wanted to approach a bit of realism more than just stylized.\n\nOriginal concept art from Maeve.\n\nTOOLS: 3DS Max, Blender, ZBrush,\n       Substance Painter, Substance Designer,\n       Unreal Engine 5.7\nYEAR:  2025",
    project02: "// PROJECT_02 — AXE SET\n\nWith this work I focused on Darksiders-style stylized texturing and exaggerated forms to develop a game-ready asset for videogames.\n\nThanks to Jakob Gavelli for the reference and to Visual Architects for the mentorship.\n\nTOOLS: 3DS Max, Blender, ZBrush,\n       Substance Painter, Substance Designer,\n       Unreal Engine 5.7\nYEAR:  2025",
    project03: "// PROJECT_03 — STREET ENVIRONMENT\n\nEnvironment inspired by Bloodborne's aesthetic. I focused on developing pieces that can be used as a kit.\n\nAll pieces and materials are made by myself — only some kit-dressing pieces (decals, foliage) are from FAB's free libraries.\n\nTOOLS: 3DS Max, Blender, ZBrush,\n       Substance Painter, Substance Designer,\n       Unreal Engine 5.7\nYEAR:  2026",
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
    home: "INICI", contact: "CONTACTE", network: "XARXA", prefs: "AJUSTOS", system: "SISTEMA", about: "ALEJANDRO SANCHO",
  },
  desktop: {
    label: "Escriptori",
    myProjects: "ELS MEUS PROJECTES", music: "MÚSICA", photos: "FOTOS", about: "SOBRE MI", bgGen: "GEN. FONS", blog: "BLOG", tracker: "TRACKER", journal: "DIARI", feedback: "BÚSTIA",
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
    subscribed: "REBUT! ✓",
    subscribedBody: "No funciona de veritat, però agraeixo molt la intenció! Si vols, envia'm un hola per aquí:",
    intro: "Novetats sobre projectes nous, experiments i coses que trobo interessants. Sense spam. Poc freqüent.",
    emailLabel: "Adreça de correu", emailPlaceholder: "tu@exemple.com",
    subscribe: "SUBSCRIURE'S →",
    footer: "integració del butlletí pendent",
    notWorking: "No funciona de veritat, però agraeixo molt la intenció!",
    socialMsg: "Si vols, envia'm un hola per aquí:",
    instagram: "@soyvertigo",
    linkedin: "LinkedIn",
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
      { text: "> Els límits del meu llenguatge són els límits del meu món.", type: "accent" },
      { text: "          — Wittgenstein", type: "accent" },
      { text: "", type: "blank" },
      { text: "hola! benvingut a la meva pàgina / portfoli / retrat digital de mi mateix (?)", type: "body" },
      { text: "", type: "blank" },
      { text: "visc prop de les muntanyes de barcelona, espanya. artista 3d i dissenyador creatiu que no para de pensar — o com vulguis anomenar algú que mai deixa de pensar, aprendre i crear.", type: "body" },
      { text: "", type: "blank" },
      { text: "// aquí trobaràs:", type: "comment" },
      { text: "  - el meu portfoli i projectes 3d", type: "body" },
      { text: "  - música que m'agrada per concentrar-me", type: "body" },
      { text: "  - dissenys, fotos, pòsters", type: "body" },
      { text: "  - diari de dev de jocs", type: "body" },
      { text: "  - on he treballat i he estudiat", type: "body" },
      { text: "  - posts, trucs i anàlisis del que estudio i vaig aprenent", type: "body" },
      { text: "  - coses divertides, útils i no tan útils.", type: "body" },
      { text: "", type: "blank" },
      { text: "// fi de l'arxiu_", type: "comment" },
    ],
  },
  tracker: {
    title: "TRACKER.EXE", statusBar: "ACTUALITZAT · 2026.07",
    wipLabel: "EN CURS", nextLabel: "SEGÜENT", doneLabel: "FET ✓", holdLabel: "EN PAUSA",
    lanes: [
      {
        label: "WEB DESIGN",
        items: [
          { label: "Portfolio web retro", status: "wip", note: "Ho estàs mirant!" },
          { label: "Domini personalitzat", status: "next", note: "pendent de decidir" },
          { label: "[Client — substitueix-me]", status: "next" },
        ],
      },
      {
        label: "3D ART",
        items: [
          { label: "Conjunt d'espases", status: "done" },
          { label: "Conjunt de destrals", status: "done" },
          { label: "Entorn Bloodborne", status: "wip", note: "Polint il·luminació" },
          { label: "Projecte personatge", status: "next" },
        ],
      },
      {
        label: "GAME DESIGN",
        items: [
          { label: "Concepte de joc", status: "next" },
          { label: "Document de disseny", status: "hold", note: "idees pendents" },
        ],
      },
      {
        label: "SPORT & LIFE",
        items: [
          { label: "Entrenament regular", status: "wip" },
          { label: "[Objectiu — substitueix-me]", status: "wip" },
          { label: "[Meta — substitueix-me]", status: "next" },
        ],
      },
    ],
  },
  journal: {
    title: "DIARI.EXE", moviesTab: "PEL·LÍCULES", booksTab: "LLIBRES",
    noNote: "sense nota", ratingLabel: "valoració",
    entries: [
      { type: "movie", title: "[Pel·li 1 — substitueix-me]", author: "Director", year: 2024, date: "2026.01", rating: 4, note: "Afegeix la teva ressenya aquí." },
      { type: "movie", title: "[Pel·li 2 — substitueix-me]", author: "Director", year: 2023, date: "2025.11", rating: 3 },
      { type: "book", title: "[Llibre 1 — substitueix-me]", author: "Autor", year: 2022, date: "2026.03", rating: 5, note: "Afegeix la teva ressenya aquí." },
      { type: "book", title: "[Llibre 2 — substitueix-me]", author: "Autor", year: 2024, date: "2025.12", rating: 4 },
    ],
  },
  feedback: {
    title: "BÚSTIA.EXE — FEEDBACK",
    question: "T'ha agradat la web?",
    hate: "La odio", neutral: "Meh", love: "M'encanta!", other: "Altre",
    otherPlaceholder: "explica'm més...",
    send: "ENVIAR →",
    thanks: "Rebut! Gràcies pel feedback.",
    thanksDetail: "En Draven ho llegirà primer.",
    hateTip: "(si pots atrapar-lo)",
  },
  pet: {
    name: "Draven", chatTitle: "DRAVEN.EXE — EL MEU GAT", inputPlaceholder: "pregunta alguna cosa...",
    greeting: "Miol! Soc en Draven, el gat de l'Alejandro. Porto vigilant aquest escriptori des que ell em va adoptar. Pregunta'm com navegar, els projectes, el stack... o simplement xerrem!",
    funnyQuips: [
      "Aquesta consulta té menys polígons que un cub de Blender.",
      "Error 404: resposta no trobada. Les meves normals apunten cap a l'altra banda.",
      "Stack overflow a la meva escorça felina. Reinicia la pregunta, si us plau.",
      "Això està fora del meu bounding box de coneixement.",
      "El meu UV map no cobreix aquesta àrea geogràfica de dades.",
      "He subdividit massa la meva malla per processar-ho.",
      "Null pointer exception als meus pensaments felins. Torna-ho a intentar.",
      "Aquest tema té més artefactes que una textura de 4×4 px.",
      "He consultat el meu shader graph i no hi ha cap output node per a això.",
      "Error de compilació al meu cervell: topologia no triangulada.",
    ],
    quickReplies: [
      { label: "NAVEGAR", query: "com navegar" },
      { label: "PROJECTES", query: "projectes" },
      { label: "SOBRE MI", query: "sobre alejandro" },
      { label: "CONTACTE", query: "contacte" },
      { label: "MÚSICA", query: "música" },
      { label: "STACK", query: "stack" },
      { label: "TRACKER", query: "tracker" },
    ],
    responses: {
      hello: "Hola! M'alegra veure't per aquí. En què et puc ajudar?",
      navigate: "Fes doble clic als icones de l'escriptori per obrir apps. Arrossega les finestres. El dock a baix té accés ràpid. Revisa ELS MEUS PROJECTES!",
      password: "La contrasenya? Dona una ullada a l'escriptori de l'escena 3D... pot ser hi ha una nota per allà. 👀",
      projects: "L'Alejandro és artista d'entorns 3D. Obre ELS MEUS PROJECTES per veure el conjunt d'espases, destrals i l'entorn urbà.",
      about: "L'Alejandro és artista 3D i desenvolupador creatiu, viu prop de Barcelona. Construeix entorns, props i webs retro com aquesta! (I em dona menjar, que és el més important.)",
      contact: "Clica CONTACTE al dock. O XARXA per subscriure't al butlletí. No mossega! Jo sí, però això és una altra història.",
      music: "Obre MÚSICA des de l'escriptori per carregar pistes o fer servir les integrades. L'oscil·loscopi és molt satisfactori!",
      stack: "React + TypeScript + Vite, tot en un App.tsx. Àudio sintetitzat pur sense arxius. Estètica retro en CSS pur.",
      tracker: "Obre el TRACKER des de l'escriptori per veure en què treballa l'Alejandro ara mateix i què ve després.",
    },
  },
  projectContent: {
    project01: "// PROJECTE_01 — SET D'ESPASES\n\nAsset llest per a videojoc, flux de treball de low a high poly i retopologitzat. Textures comprimides i optimitzades per UE5.\n\nNo em vaig cenyir del tot al concepte, ja que vaig voler apropar-me una mica més al realisme en lloc de quedar-me només en l'estilitzat.\n\nArt conceptual original de Maeve.\n\nEINES: 3DS Max, Blender, ZBrush,\n       Substance Painter, Substance Designer,\n       Unreal Engine 5.7\nANY:   2025",
    project02: "// PROJECTE_02 — SET DE DESTRALS\n\nAmb aquest treball em vaig centrar en el texturitzat estilitzat a l'estil Darksiders i formes exagerades per desenvolupar un asset llest per a videojoc.\n\nGràcies a Jakob Gavelli per la referència i a Visual Architects per la mentoria.\n\nEINES: 3DS Max, Blender, ZBrush,\n       Substance Painter, Substance Designer,\n       Unreal Engine 5.7\nANY:   2025",
    project03: "// PROJECTE_03 — ENTORN URBÀ\n\nEntorn inspirat en l'estètica de Bloodborne. Em vaig centrar en desenvolupar peces que poguessin usar-se com a kit.\n\nTotes les peces i materials estan fetes per mi — només algunes peces d'ambientació del kit (decals, vegetació) venen de les biblioteques gratuïtes de FAB.\n\nEINES: 3DS Max, Blender, ZBrush,\n       Substance Painter, Substance Designer,\n       Unreal Engine 5.7\nANY:   2026",
  },
};

export const STRINGS: Record<Lang, Strings> = { es: ES, en: EN, ca: CA };
