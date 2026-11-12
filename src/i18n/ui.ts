export const languages = {
  en: { code: 'EN', name: 'English', nativeName: 'English', ogLocale: 'en_US', dir: 'ltr' },
  es: { code: 'ES', name: 'Spanish', nativeName: 'Español', ogLocale: 'es_ES', dir: 'ltr' },
  pt: { code: 'PT', name: 'Portuguese', nativeName: 'Português', ogLocale: 'pt_BR', dir: 'ltr' },
  de: { code: 'DE', name: 'German', nativeName: 'Deutsch', ogLocale: 'de_DE', dir: 'ltr' },
  fr: { code: 'FR', name: 'French', nativeName: 'Français', ogLocale: 'fr_FR', dir: 'ltr' },
  ja: { code: 'JA', name: 'Japanese', nativeName: '日本語', ogLocale: 'ja_JP', dir: 'ltr' },
  zh: { code: 'ZH', name: 'Chinese', nativeName: '中文', ogLocale: 'zh_CN', dir: 'ltr' },
  ru: { code: 'RU', name: 'Russian', nativeName: 'Русский', ogLocale: 'ru_RU', dir: 'ltr' },
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = 'en';

export const localeList = Object.keys(languages) as Locale[];

export interface UITranslations {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    brandTitle: string;
    homeAria: string;
    languageAria: string;
    languageLabel: string;
    themeToggleAria: string;
    themeToDark: string;
    themeToLight: string;
    githubAria: string;
    installPwa: string;
    installPwaAria: string;
    installModalTitle: string;
    installModalBody: string;
    installModalIos: string;
    installModalAndroid: string;
    installModalDesktop: string;
    installModalClose: string;
    installedLabel: string;
    supportDev: string;
    supportDevAria: string;
    menuOpenAria: string;
    menuCloseAria: string;
  };
  hero: {
    h1: string;
  };
  workspace: {
    modesToggleAria: string;
    modesLabel: string;
    modes: {
      change: string;
      speedUp: string;
      slowDown: string;
      gif: string;
    };
    step1: {
      dropTitle: string;
      dropSubtitle: string;
      dropActive: string;
      selectBtn: string;
      privacyMicro: string;
    };
    step2: {
      presetsTitle: string;
      presetTagSlowest: string;
      presetTagSlow: string;
      presetTagBrisk: string;
      presetTagFast: string;
      presetTagDouble: string;
      presetTagTimelapse: string;
      sliderLabel: string;
      sliderMin: string;
      sliderMax: string;
      audioTitle: string;
      audioKeep: string;
      audioMute: string;
      audioNotApplicable: string;
      previewLiveBadge: string;
      originalLabel: string;
      estimatedLabel: string;
      processBtn: string;
      processBatchBtn: string;
      addMoreBtn: string;
      changeFileBtn: string;
      queueTitle: string;
      removeFileAria: string;
      batchCountLabel: string;
      mutePreviewAria: string;
    };
    step3: {
      statusLoading: string;
      statusProbing: string;
      statusProcessing: string;
      statusProcessingGif: string;
      statusFinalizing: string;
      statusBatchItem: string;
      trustBadge: string;
      cancelBtn: string;
    };
    step4: {
      doneBadge: string;
      summaryTemplate: string;
      downloadBtn: string;
      downloadGifBtn: string;
      downloadAllBtn: string;
      adjustAgainBtn: string;
      processAnotherBtn: string;
      fileSizeLabel: string;
      batchReadyLabel: string;
    };
    errors: {
      unsupportedFile: string;
      ffmpegLoadFailed: string;
      processingFailed: string;
      cancelled: string;
    };
  };
  breadcrumbs: {
    ariaLabel: string;
    home: string;
    tools: string;
    current: string;
  };
  howTo: {
    title: string;
    schemaName: string;
    subtitle: string;
    steps: {
      title: string;
      desc: string;
    }[];
  };
  features: {
    title: string;
    items: {
      title: string;
      desc: string;
    }[];
  };
  guides: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      desc: string;
    }[];
  };
  comparison: {
    title: string;
    subtitle: string;
    colFeature: string;
    colOurs: string;
    colCapcut: string;
    colClideo: string;
    rows: {
      feature: string;
      ours: string;
      capcut: string;
      clideo: string;
    }[];
  };
  faq: {
    title: string;
    items: {
      q: string;
      a: string;
    }[];
  };
  footer: {
    tagline: string;
    privacyNote: string;
    copyright: string;
    githubLink: string;
    supportLink: string;
  };
}

const TARGET_KEYWORDS_EN =
  'change speed of video, change video speed iphone, speed up video, how to change the speed of a video, change video speed online, how to change youtube video speed, change speed of video iphone, speed test, how to change video speed on iphone, tiktok, how to change the speed of a youtube video, how to change speed of youtube video, how to change speed on tiktok, how to change video speed on tiktok, how to change background of video, capcut, internet speed, prime video, video editor, davinci resolve, how to change speed of video on iphone, change video speed online free, video editing software, google drive, amazon prime video, clipchamp, video speed controller, speed up video online, internet speed test, wifi speed test, change gif speed, crop video, video to mp3, how to speed up video on iphone, how to test internet speed, video to gif, video speed changer, video cutter, how to change slow motion video to normal speed';

export const ui: Record<Locale, UITranslations> = {
  en: {
    meta: {
      title: 'Free Video Speed Changer — Speed Up or Slow Down Video',
      description:
        '100% free, private video speed changer. Speed up or slow down MP4, MOV & GIFs online with zero uploads and no watermarks.',
      keywords: TARGET_KEYWORDS_EN,
    },
    nav: {
      brandTitle: 'VideoSpeed Changer',
      homeAria: 'VideoSpeed Changer Home',
      languageAria: 'Select Language',
      languageLabel: 'Language',
      themeToggleAria: 'Toggle Light and Dark Theme',
      themeToDark: 'Switch to Dark Mode',
      themeToLight: 'Switch to Light Mode',
      githubAria: 'View Source Code on GitHub',
      installPwa: 'Add to Home Screen',
      installPwaAria: 'Add VideoSpeed Changer to Home Screen',
      installModalTitle: 'Install VideoSpeed Changer',
      installModalBody: 'Use VideoSpeed Changer offline anytime as a fast, zero-upload desktop or mobile app.',
      installModalIos: 'Safari (iOS/iPadOS): Tap the Share icon, then choose "Add to Home Screen".',
      installModalAndroid: 'Chrome / Edge (Android): Open browser menu (⋮) and tap "Install app" or "Add to Home screen".',
      installModalDesktop: 'Chrome / Edge (Desktop): Click the install icon in the address bar or menu to install.',
      installModalClose: 'Got it',
      installedLabel: 'App Installed',
      supportDev: 'Support the Developer',
      supportDevAria: 'Support the Developer on Gumroad',
      menuOpenAria: 'Open navigation menu',
      menuCloseAria: 'Close navigation menu',
    },
    hero: {
      h1: 'Free Online Video Speed Changer',
    },
    workspace: {
      modesToggleAria: 'Toggle speed mode presets',
      modesLabel: 'Mode Presets',
      modes: {
        change: 'Change Video Speed',
        speedUp: 'Speed Up Video',
        slowDown: 'Slow Down Video (Slo-Mo)',
        gif: 'Change GIF Speed',
      },
      step1: {
        dropTitle: 'Drop your video here to change speed',
        dropSubtitle: 'MP4, WebM, MOV, MKV, AVI & GIF • Single or batch files',
        dropActive: 'Release to load video',
        selectBtn: 'Select Video to Change Speed',
        privacyMicro: '100% Client-Side RAM • Zero Uploads • No Watermark',
      },
      step2: {
        presetsTitle: 'Speed Presets',
        presetTagSlowest: 'Ultra Slo-Mo',
        presetTagSlow: 'Slow Motion',
        presetTagBrisk: 'Brisk',
        presetTagFast: 'Fast',
        presetTagDouble: 'Double',
        presetTagTimelapse: 'Timelapse',
        sliderLabel: 'Fine-Tune Speed',
        sliderMin: '0.1x',
        sliderMax: '10.0x',
        audioTitle: 'Audio Options',
        audioKeep: 'Keep Audio (Pitch Adjusted)',
        audioMute: 'Mute Audio',
        audioNotApplicable: 'GIF mode — audio track excluded',
        previewLiveBadge: 'Live Speed Preview',
        originalLabel: 'Original',
        estimatedLabel: 'New Speed',
        processBtn: 'Change Speed & Export',
        processBatchBtn: 'Process All Videos',
        addMoreBtn: 'Add More',
        changeFileBtn: 'Change Video',
        queueTitle: 'Selected Queue',
        removeFileAria: 'Remove file from queue',
        batchCountLabel: '{count} files queued',
        mutePreviewAria: 'Toggle preview sound',
      },
      step3: {
        statusLoading: 'Loading local FFmpeg WebAssembly engine...',
        statusProbing: 'Inspecting video and audio tracks...',
        statusProcessing: 'Changing Speed & Syncing Audio...',
        statusProcessingGif: 'Rendering GIF frames at new speed...',
        statusFinalizing: 'Finalizing exported video...',
        statusBatchItem: 'Processing {current} of {total}: {name}',
        trustBadge: '100% Local Browser RAM Processing — Zero Server Uploads, No Watermark',
        cancelBtn: 'Cancel',
      },
      step4: {
        doneBadge: 'Speed Changed Successfully',
        summaryTemplate: 'Original: {orig} → New Speed ({speed}x): {next}',
        downloadBtn: 'Download Video',
        downloadGifBtn: 'Download GIF',
        downloadAllBtn: 'Download All Files',
        adjustAgainBtn: 'Adjust Speed Again',
        processAnotherBtn: 'Change Another Video',
        fileSizeLabel: 'Size',
        batchReadyLabel: 'Ready',
      },
      errors: {
        unsupportedFile: 'Unsupported file format. Please choose a video (MP4, WebM, MOV, MKV, AVI) or GIF.',
        ffmpegLoadFailed: 'Unable to load local FFmpeg engine. Please refresh and try again.',
        processingFailed: 'Processing failed for this file. Try another speed value or format.',
        cancelled: 'Processing cancelled.',
      },
    },
    breadcrumbs: {
      ariaLabel: 'Breadcrumb',
      home: 'Home',
      tools: 'Video Editing Tools',
      current: 'Free Online Video Speed Changer',
    },
    howTo: {
      title: 'How to Change the Speed of a Video in 3 Steps',
      schemaName: 'How to Speed Up or Slow Down a Video Online for Free',
      subtitle: 'A zero-upload free video speed controller built directly inside your browser.',
      steps: [
        {
          title: '1. Select or Drop Your Video',
          desc: "Drop your MP4, MOV, or WebM file into the ChangeVideoSpeed workspace (or click 'Select Video').",
        },
        {
          title: '2. Pick a Preset or Custom Multiplier',
          desc: 'Select a speed preset (like 2x to speed up, or 0.5x for slow motion) or use the custom slider.',
        },
        {
          title: '3. Export & Download Watermark-Free',
          desc: "Click 'Change Video Speed' to process your video instantly in your browser and download the new file.",
        },
      ],
    },
    features: {
      title: 'Why Creators Choose ChangeVideoSpeed',
      items: [
        {
          title: 'Zero Uploads, 100% Private',
          desc: 'Change video speed online free without waiting on cloud queues. All decoding runs inside your local browser RAM.',
        },
        {
          title: 'Synced Video & Audio Engine',
          desc: 'Unified FFmpeg setpts and chained atempo filters keep dialogue and music locked to your chosen speed.',
        },
        {
          title: 'No Watermarks, No Sign-Up',
          desc: 'Export clean MP4 videos and animated GIFs without branding stamps, paywalls, or file limits.',
        },
        {
          title: 'Batch Queue & Video to GIF Speed',
          desc: 'Speed up video online in batches or change GIF speed cleanly from 0.1x slo-mo to 10.0x timelapse.',
        },
      ],
    },
    guides: {
      title: 'How to Change Video Speed for iPhone, TikTok, Reels & YouTube',
      subtitle: 'Practical workflows for mobile creators, social editors, and desktop video software.',
      items: [
        {
          title: 'How to Change Video Speed on iPhone & TikTok',
          desc: 'Want to change speed of video on iPhone or speed up a TikTok clip without installing heavy apps or getting CapCut watermarks? Open ChangeVideoSpeed in Safari or Chrome, pick 1.5x or 2x, and download an instant watermark-free MP4.',
        },
        {
          title: 'Change Slow Motion Video to Normal Speed',
          desc: 'Shot an iPhone slow-mo clip at 120fps or 240fps by mistake? Load the MOV file, select 2x or 4x speed to change slow motion video to normal speed, and preview the timing live before exporting.',
        },
        {
          title: 'Fast Alternative to Desktop Video Editors',
          desc: 'Instead of opening DaVinci Resolve or Clipchamp or uploading large clips to Google Drive just to adjust playback speed, use this lightweight browser video speed controller to fast-forward tutorials or turn video to GIF in seconds.',
        },
      ],
    },
    comparison: {
      title: 'ChangeVideoSpeed vs. CapCut Web & Clideo',
      subtitle: 'Compare privacy, watermarks, speed range, and upload delays before editing your clip.',
      colFeature: 'Feature',
      colOurs: 'ChangeVideoSpeed',
      colCapcut: 'CapCut Web',
      colClideo: 'Clideo',
      rows: [
        {
          feature: 'Zero Server Uploads (100% Local RAM)',
          ours: 'Yes — Instant Local WASM',
          capcut: 'No — Cloud Upload Required',
          clideo: 'No — Cloud Upload Required',
        },
        {
          feature: 'Watermark-Free Free Export',
          ours: 'Yes — Always Zero Watermarks',
          capcut: 'Account / Pro Tiers Needed',
          clideo: 'Watermark Added on Free Plan',
        },
        {
          feature: 'Supported Speed Range',
          ours: '0.1x to 10.0x + GIF Mode',
          capcut: '0.1x to 100x (Cloud)',
          clideo: '0.25x to 4x',
        },
        {
          feature: 'Sign-Up or Account Required',
          ours: 'Never — Instant Start',
          capcut: 'Login Required to Export',
          clideo: 'Optional (Limits Free Files)',
        },
        {
          feature: 'Synced Audio Pitch & Mute Toggle',
          ours: 'Yes — Chained FFmpeg atempo',
          capcut: 'Yes',
          clideo: 'Yes',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'How do I speed up a video for TikTok or Instagram without a watermark?',
          a: 'Upload your video to ChangeVideoSpeed, select the 1.5x or 2x speed preset, and click convert. It changes your video speed 100% free with zero watermarks and no sign-up required.',
        },
        {
          q: 'Does changing the video speed also change the audio pitch?',
          a: 'ChangeVideoSpeed automatically syncs the audio track to your new video speed. By default, it preserves the original audio pitch when speeding up or slowing down, but you can also choose to mute the audio entirely.',
        },
        {
          q: 'Are my videos uploaded to a cloud server when changing speed?',
          a: 'No. ChangeVideoSpeed runs 100% locally inside your device using FFmpeg WebAssembly. Your private videos never upload to any cloud server, saving bandwidth and keeping your files completely secure.',
        },
        {
          q: 'How can I change slow motion video to normal speed on iPhone?',
          a: 'Select your iPhone MOV or MP4 clip directly in Safari, pick the 2x or 4x speed preset (or adjust the fine-tune slider), preview it live, and export your normalized video.',
        },
        {
          q: 'What speed range and file formats are supported?',
          a: 'You can change video speed from 0.1x ultra slow motion up to 10.0x timelapse across MP4, MOV, WebM, MKV, AVI, and animated GIF files.',
        },
      ],
    },
    footer: {
      tagline: '100% Client-Side Video Speed Controller powered by WebAssembly.',
      privacyNote: 'Zero server uploads. Zero tracking. Open-source static web app.',
      copyright: '© 2026 ChangeVideoSpeed. MIT Licensed.',
      githubLink: 'GitHub Repository',
      supportLink: 'Buy Me a Coffee',
    },
  },

  es: {
    meta: {
      title: 'Cambiador de Velocidad de Video Gratis Online',
      description:
        'Cambia la velocidad de video 100% gratis y privado. Acelera o ralentiza MP4, MOV y GIF online sin subir archivos ni marcas de agua.',
      keywords:
        'cambiar velocidad de video, acelerar video online, cámara lenta video, cambiar velocidad video iphone, tiktok, cambiar velocidad gif, editor de video gratis, sin marca de agua',
    },
    nav: {
      brandTitle: 'VideoSpeed Changer',
      homeAria: 'Inicio de VideoSpeed Changer',
      languageAria: 'Seleccionar Idioma',
      languageLabel: 'Idioma',
      themeToggleAria: 'Cambiar Tema Claro u Oscuro',
      themeToDark: 'Cambiar a Modo Oscuro',
      themeToLight: 'Cambiar a Modo Claro',
      githubAria: 'Ver Código Fuente en GitHub',
      installPwa: 'Añadir a Inicio',
      installPwaAria: 'Añadir VideoSpeed Changer a la Pantalla de Inicio',
      installModalTitle: 'Instalar VideoSpeed Changer',
      installModalBody: 'Usa VideoSpeed Changer sin conexión cuando quieras como una app rápida y sin subidas.',
      installModalIos: 'Safari (iOS/iPadOS): Toca el icono Compartir y elige "Añadir a pantalla de inicio".',
      installModalAndroid: 'Chrome / Edge (Android): Abre el menú (⋮) y toca "Instalar aplicación".',
      installModalDesktop: 'Chrome / Edge (Escritorio): Haz clic en el icono de instalación en la barra de direcciones.',
      installModalClose: 'Entendido',
      installedLabel: 'App Instalada',
      supportDev: 'Apoyar al Desarrollador',
      supportDevAria: 'Apoyar al Desarrollador en Gumroad',
      menuOpenAria: 'Abrir menú de navegación',
      menuCloseAria: 'Cerrar menú de navegación',
    },
    hero: {
      h1: 'Cambiador de Velocidad de Video Online Gratis',
    },
    workspace: {
      modesToggleAria: 'Mostrar u ocultar modos de velocidad',
      modesLabel: 'Modos',
      modes: {
        change: 'Cambiar Velocidad',
        speedUp: 'Acelerar Video',
        slowDown: 'Cámara Lenta (Slo-Mo)',
        gif: 'Cambiar Velocidad GIF',
      },
      step1: {
        dropTitle: 'Suelta tu video aquí para cambiar la velocidad',
        dropSubtitle: 'MP4, WebM, MOV, MKV, AVI y GIF • Uno o varios archivos',
        dropActive: 'Suelta para cargar el video',
        selectBtn: 'Seleccionar Video para Cambiar Velocidad',
        privacyMicro: '100% RAM Local • Cero Subidas • Sin Marca de Agua',
      },
      step2: {
        presetsTitle: 'Velocidades Predefinidas',
        presetTagSlowest: 'Súper Lento',
        presetTagSlow: 'Cámara Lenta',
        presetTagBrisk: 'Ágil',
        presetTagFast: 'Rápido',
        presetTagDouble: 'Doble',
        presetTagTimelapse: 'Timelapse',
        sliderLabel: 'Ajuste Fino de Velocidad',
        sliderMin: '0.1x',
        sliderMax: '10.0x',
        audioTitle: 'Opciones de Audio',
        audioKeep: 'Mantener Audio (Tono Ajustado)',
        audioMute: 'Silenciar Audio',
        audioNotApplicable: 'Modo GIF — pista de audio excluida',
        previewLiveBadge: 'Vista Previa en Vivo',
        originalLabel: 'Original',
        estimatedLabel: 'Nueva Velocidad',
        processBtn: 'Cambiar Velocidad y Exportar',
        processBatchBtn: 'Procesar Todos los Videos',
        addMoreBtn: 'Añadir Más',
        changeFileBtn: 'Cambiar Video',
        queueTitle: 'Cola Seleccionada',
        removeFileAria: 'Quitar archivo de la cola',
        batchCountLabel: '{count} archivos en cola',
        mutePreviewAria: 'Silenciar vista previa',
      },
      step3: {
        statusLoading: 'Cargando motor local FFmpeg WebAssembly...',
        statusProbing: 'Analizando pistas de video y audio...',
        statusProcessing: 'Cambiando Velocidad y Sincronizando Audio...',
        statusProcessingGif: 'Renderizando fotogramas GIF a nueva velocidad...',
        statusFinalizing: 'Finalizando video exportado...',
        statusBatchItem: 'Procesando {current} de {total}: {name}',
        trustBadge: 'Procesamiento 100% Local en RAM del Navegador — Cero Subidas, Sin Marca de Agua',
        cancelBtn: 'Cancelar',
      },
      step4: {
        doneBadge: 'Velocidad Cambiada con Éxito',
        summaryTemplate: 'Original: {orig} → Nueva Velocidad ({speed}x): {next}',
        downloadBtn: 'Descargar Video',
        downloadGifBtn: 'Descargar GIF',
        downloadAllBtn: 'Descargar Todos',
        adjustAgainBtn: 'Ajustar Velocidad de Nuevo',
        processAnotherBtn: 'Cambiar Otro Video',
        fileSizeLabel: 'Tamaño',
        batchReadyLabel: 'Listo',
      },
      errors: {
        unsupportedFile: 'Formato no compatible. Selecciona un video (MP4, WebM, MOV, MKV, AVI) o GIF.',
        ffmpegLoadFailed: 'No se pudo cargar el motor FFmpeg local. Recarga la página e inténtalo de nuevo.',
        processingFailed: 'Error al procesar este archivo. Prueba otra velocidad o formato.',
        cancelled: 'Procesamiento cancelado.',
      },
    },
    breadcrumbs: {
      ariaLabel: 'Ruta de navegación',
      home: 'Inicio',
      tools: 'Herramientas de Edición de Video',
      current: 'Cambiador de Velocidad de Video Online Gratis',
    },
    howTo: {
      title: 'Cómo Cambiar la Velocidad de un Video en 3 Pasos',
      schemaName: 'Cómo Acelerar o Ralentizar un Video Online Gratis',
      subtitle: 'Controlador de velocidad de video gratuito sin subidas, directo en tu navegador.',
      steps: [
        {
          title: '1. Selecciona o Suelta tu Video',
          desc: 'Arrastra tu archivo MP4, MOV o WebM al área de ChangeVideoSpeed (o haz clic en Seleccionar Video).',
        },
        {
          title: '2. Elige un Preajuste o Control Deslizante',
          desc: 'Selecciona una velocidad predefinida (como 2x para acelerar o 0.5x para cámara lenta) o ajusta el deslizador.',
        },
        {
          title: '3. Exporta y Descarga Sin Marca de Agua',
          desc: 'Haz clic en Cambiar Velocidad para procesar tu video al instante en el navegador y descargar el archivo final.',
        },
      ],
    },
    features: {
      title: 'Por Qué Elegir ChangeVideoSpeed',
      items: [
        {
          title: 'Cero Subidas, 100% Privado',
          desc: 'Cambia la velocidad de video online gratis sin colas en la nube. Todo ocurre en la RAM local de tu navegador.',
        },
        {
          title: 'Motor de Video y Audio Sincronizado',
          desc: 'Los filtros combinados setpts y atempo de FFmpeg mantienen voz y música perfectamente sincronizadas.',
        },
        {
          title: 'Sin Marcas de Agua ni Registro',
          desc: 'Exporta MP4 y GIF animados limpios sin logotipos, pagos ni límites diarios.',
        },
        {
          title: 'Lotes y Velocidad GIF',
          desc: 'Acelera varios videos seguidos o cambia la velocidad de un GIF de 0.1x a 10.0x fácilmente.',
        },
      ],
    },
    guides: {
      title: 'Guía para iPhone, TikTok, Reels y YouTube',
      subtitle: 'Flujos rápidos para creadores móviles y editores web sin software pesado.',
      items: [
        {
          title: 'Cambiar Velocidad de Video en iPhone y TikTok',
          desc: 'Acelera clips de TikTok o Reels directamente desde Safari o Chrome sin instalar apps ni marcas de agua de CapCut.',
        },
        {
          title: 'Pasar Video en Cámara Lenta a Velocidad Normal',
          desc: 'Convierte grabaciones en cámara lenta del iPhone a velocidad normal (2x o 4x) con vista previa instantánea.',
        },
        {
          title: 'Alternativa Ligera a Editores de Escritorio',
          desc: 'Ajusta el ritmo de tutoriales o convierte video a GIF rápido sin abrir DaVinci Resolve ni subir archivos a la nube.',
        },
      ],
    },
    comparison: {
      title: 'ChangeVideoSpeed vs. CapCut Web y Clideo',
      subtitle: 'Compara privacidad, marcas de agua, rango de velocidad y requisitos de subida.',
      colFeature: 'Característica',
      colOurs: 'ChangeVideoSpeed',
      colCapcut: 'CapCut Web',
      colClideo: 'Clideo',
      rows: [
        {
          feature: 'Cero Subidas al Servidor (RAM Local)',
          ours: 'Sí — WebAssembly Instantáneo',
          capcut: 'No — Requiere Subir a la Nube',
          clideo: 'No — Requiere Subir a la Nube',
        },
        {
          feature: 'Exportación Gratis Sin Marca de Agua',
          ours: 'Sí — Siempre Sin Marca de Agua',
          capcut: 'Requiere Cuenta / Planes Pro',
          clideo: 'Añade Marca de Agua Gratis',
        },
        {
          feature: 'Rango de Velocidad',
          ours: '0.1x a 10.0x + Modo GIF',
          capcut: '0.1x a 100x (Nube)',
          clideo: '0.25x a 4x',
        },
        {
          feature: 'Registro Obligatorio',
          ours: 'Nunca — Uso Inmediato',
          capcut: 'Requiere Iniciar Sesión',
          clideo: 'Opcional (Límites Gratis)',
        },
        {
          feature: 'Sincronización de Tono y Silencio',
          ours: 'Sí — FFmpeg atempo Encadenado',
          capcut: 'Sí',
          clideo: 'Sí',
        },
      ],
    },
    faq: {
      title: 'Preguntas Frecuentes',
      items: [
        {
          q: '¿Cómo acelerar un video para TikTok o Instagram sin marca de agua?',
          a: 'Carga tu video en ChangeVideoSpeed, elige el botón 1.5x o 2x y pulsa exportar. Cambia la velocidad 100% gratis, sin marcas de agua ni registro.',
        },
        {
          q: '¿Cambiar la velocidad del video altera el tono del audio?',
          a: 'ChangeVideoSpeed sincroniza automáticamente el audio con la nueva velocidad preservando el tono original por defecto, aunque también puedes silenciar el audio por completo.',
        },
        {
          q: '¿Se suben mis videos a un servidor en la nube?',
          a: 'No. ChangeVideoSpeed se ejecuta 100% localmente en tu dispositivo mediante FFmpeg WebAssembly. Tus videos privados nunca salen de tu equipo.',
        },
        {
          q: '¿Cómo pasar un video de cámara lenta a velocidad normal en iPhone?',
          a: 'Selecciona el archivo MOV o MP4 desde Safari, elige 2x o 4x, comprueba la vista previa en vivo y descarga el resultado.',
        },
        {
          q: '¿Qué rango de velocidades y formatos admite?',
          a: 'Admite desde 0.1x hasta 10.0x en archivos MP4, MOV, WebM, MKV, AVI y GIF animados.',
        },
      ],
    },
    footer: {
      tagline: 'Controlador de Velocidad de Video 100% en el Navegador con WebAssembly.',
      privacyNote: 'Cero subidas al servidor. Cero rastreo. Aplicación web estática.',
      copyright: '© 2026 ChangeVideoSpeed. Licencia MIT.',
      githubLink: 'Repositorio en GitHub',
      supportLink: 'Invítame un Café',
    },
  },

  pt: {
    meta: {
      title: 'Alterador de Velocidade de Vídeo Grátis Online',
      description:
        'Altere a velocidade de vídeo 100% grátis e privado. Acelere ou desacelere MP4, MOV e GIFs online sem envios e sem marca d’água.',
      keywords:
        'alterar velocidade de vídeo, acelerar vídeo online, câmera lenta vídeo, velocidade vídeo iphone, tiktok, velocidade gif, sem marca dagua',
    },
    nav: {
      brandTitle: 'VideoSpeed Changer',
      homeAria: 'Página Inicial VideoSpeed Changer',
      languageAria: 'Selecionar Idioma',
      languageLabel: 'Idioma',
      themeToggleAria: 'Alternar Tema Claro e Escuro',
      themeToDark: 'Mudar para Modo Escuro',
      themeToLight: 'Mudar para Modo Claro',
      githubAria: 'Ver Código-Fonte no GitHub',
      installPwa: 'Adicionar à Tela Inicial',
      installPwaAria: 'Adicionar VideoSpeed Changer à Tela Inicial',
      installModalTitle: 'Instalar VideoSpeed Changer',
      installModalBody: 'Use o VideoSpeed Changer offline a qualquer hora como um app rápido e sem envios.',
      installModalIos: 'Safari (iOS/iPadOS): Toque em Compartilhar e depois em "Adicionar à Tela de Início".',
      installModalAndroid: 'Chrome / Edge (Android): Abra o menu (⋮) e toque em "Instalar aplicativo".',
      installModalDesktop: 'Chrome / Edge (Desktop): Clique no ícone de instalação na barra de endereços.',
      installModalClose: 'Entendi',
      installedLabel: 'App Instalado',
      supportDev: 'Apoiar o Desenvolvedor',
      supportDevAria: 'Apoiar o Desenvolvedor no Gumroad',
      menuOpenAria: 'Abrir menu de navegação',
      menuCloseAria: 'Fechar menu de navegação',
    },
    hero: {
      h1: 'Alterador de Velocidade de Vídeo Online Grátis',
    },
    workspace: {
      modesToggleAria: 'Alternar predefinições de modo',
      modesLabel: 'Modos',
      modes: {
        change: 'Alterar Velocidade',
        speedUp: 'Acelerar Vídeo',
        slowDown: 'Câmera Lenta (Slo-Mo)',
        gif: 'Velocidade de GIF',
      },
      step1: {
        dropTitle: 'Solte seu vídeo aqui para mudar a velocidade',
        dropSubtitle: 'MP4, WebM, MOV, MKV, AVI e GIF • Um ou vários arquivos',
        dropActive: 'Solte para carregar o vídeo',
        selectBtn: 'Selecionar Vídeo para Alterar Velocidade',
        privacyMicro: '100% RAM Local • Zero Envios • Sem Marca d’Água',
      },
      step2: {
        presetsTitle: 'Velocidades Predefinidas',
        presetTagSlowest: 'Ultra Lento',
        presetTagSlow: 'Câmera Lenta',
        presetTagBrisk: 'Ágil',
        presetTagFast: 'Rápido',
        presetTagDouble: 'Dobro',
        presetTagTimelapse: 'Timelapse',
        sliderLabel: 'Ajuste Fino de Velocidade',
        sliderMin: '0.1x',
        sliderMax: '10.0x',
        audioTitle: 'Opções de Áudio',
        audioKeep: 'Manter Áudio (Tom Ajustado)',
        audioMute: 'Silenciar Áudio',
        audioNotApplicable: 'Modo GIF — faixa de áudio ignorada',
        previewLiveBadge: 'Prévia ao Vivo',
        originalLabel: 'Original',
        estimatedLabel: 'Nova Velocidade',
        processBtn: 'Alterar Velocidade e Exportar',
        processBatchBtn: 'Processar Todos os Vídeos',
        addMoreBtn: 'Adicionar Mais',
        changeFileBtn: 'Trocar Vídeo',
        queueTitle: 'Fila Selecionada',
        removeFileAria: 'Remover arquivo da fila',
        batchCountLabel: '{count} arquivos na fila',
        mutePreviewAria: 'Silenciar prévia',
      },
      step3: {
        statusLoading: 'Carregando motor local FFmpeg WebAssembly...',
        statusProbing: 'Analisando faixas de vídeo e áudio...',
        statusProcessing: 'Alterando Velocidade e Sincronizando Áudio...',
        statusProcessingGif: 'Renderizando quadros GIF na nova velocidade...',
        statusFinalizing: 'Finalizando vídeo exportado...',
        statusBatchItem: 'Processando {current} de {total}: {name}',
        trustBadge: 'Processamento 100% na RAM do Navegador — Zero Envios ao Servidor, Sem Marca d’Água',
        cancelBtn: 'Cancelar',
      },
      step4: {
        doneBadge: 'Velocidade Alterada com Sucesso',
        summaryTemplate: 'Original: {orig} → Nova Velocidade ({speed}x): {next}',
        downloadBtn: 'Baixar Vídeo',
        downloadGifBtn: 'Baixar GIF',
        downloadAllBtn: 'Baixar Todos',
        adjustAgainBtn: 'Ajustar Velocidade Novamente',
        processAnotherBtn: 'Alterar Outro Vídeo',
        fileSizeLabel: 'Tamanho',
        batchReadyLabel: 'Pronto',
      },
      errors: {
        unsupportedFile: 'Formato não suportado. Escolha um vídeo (MP4, WebM, MOV, MKV, AVI) ou GIF.',
        ffmpegLoadFailed: 'Falha ao carregar o motor FFmpeg local. Recarregue a página e tente novamente.',
        processingFailed: 'Falha ao processar este arquivo. Tente outra velocidade ou formato.',
        cancelled: 'Processamento cancelado.',
      },
    },
    breadcrumbs: {
      ariaLabel: 'Navegação estrutural',
      home: 'Início',
      tools: 'Ferramentas de Edição de Vídeo',
      current: 'Alterador de Velocidade de Vídeo Online Grátis',
    },
    howTo: {
      title: 'Como Mudar a Velocidade do Vídeo em 3 Passos',
      schemaName: 'Como Acelerar ou Desacelerar um Vídeo Online Grátis',
      subtitle: 'Controlador de velocidade gratuito sem envios, rodando direto no seu navegador.',
      steps: [
        {
          title: '1. Envie ou Solte seu Vídeo',
          desc: 'Solte seu arquivo MP4, MOV ou WebM no espaço de trabalho (ou clique em Selecionar Vídeo).',
        },
        {
          title: '2. Escolha uma Predefinição ou Deslizador',
          desc: 'Selecione um atalho (como 2x para acelerar ou 0.5x para câmera lenta) ou use o controle deslizante.',
        },
        {
          title: '3. Exporte e Baixe Sem Marca d’Água',
          desc: 'Clique em Alterar Velocidade para processar instantaneamente no navegador e baixar o novo arquivo.',
        },
      ],
    },
    features: {
      title: 'Por Que Escolher o ChangeVideoSpeed',
      items: [
        {
          title: 'Zero Envios, 100% Privado',
          desc: 'Altere a velocidade de vídeo online grátis sem filas na nuvem. Tudo acontece na RAM local do navegador.',
        },
        {
          title: 'Áudio e Vídeo Sincronizados',
          desc: 'Filtros setpts e atempo encadeados mantêm voz e música perfeitamente alinhadas ao ritmo escolhido.',
        },
        {
          title: 'Sem Marca d’Água ou Cadastro',
          desc: 'Exporte vídeos MP4 e GIFs limpos sem logotipos, assinaturas ou limites diários.',
        },
        {
          title: 'Lotes e Velocidade de GIF',
          desc: 'Processe vários clipes seguidos ou ajuste o ritmo de GIFs animados de 0.1x a 10.0x.',
        },
      ],
    },
    guides: {
      title: 'Guia para iPhone, TikTok, Reels e YouTube',
      subtitle: 'Fluxos rápidos para criadores móveis e editores sem programas pesados.',
      items: [
        {
          title: 'Alterar Velocidade de Vídeo no iPhone e TikTok',
          desc: 'Acelere vídeos para TikTok ou Instagram Reels direto no Safari ou Chrome sem instalar apps ou marcas do CapCut.',
        },
        {
          title: 'Converter Câmera Lenta para Velocidade Normal',
          desc: 'Transforme clipes gravados em câmera lenta no iPhone de volta para velocidade normal (2x ou 4x) com prévia ao vivo.',
        },
        {
          title: 'Alternativa Rápida a Editores Pesados',
          desc: 'Em vez de abrir o DaVinci Resolve ou subir arquivos no Google Drive, ajuste a velocidade em segundos no navegador.',
        },
      ],
    },
    comparison: {
      title: 'ChangeVideoSpeed vs. CapCut Web e Clideo',
      subtitle: 'Compare privacidade, marca d’água, faixa de velocidade e tempo de envio.',
      colFeature: 'Recurso',
      colOurs: 'ChangeVideoSpeed',
      colCapcut: 'CapCut Web',
      colClideo: 'Clideo',
      rows: [
        {
          feature: 'Zero Envios ao Servidor (RAM Local)',
          ours: 'Sim — WebAssembly Local',
          capcut: 'Não — Exige Upload na Nuvem',
          clideo: 'Não — Exige Upload na Nuvem',
        },
        {
          feature: 'Exportação Grátis Sem Marca d’Água',
          ours: 'Sim — Sempre Sem Marca d’Água',
          capcut: 'Exige Conta / Plano Pro',
          clideo: 'Marca d’Água no Plano Grátis',
        },
        {
          feature: 'Faixa de Velocidade',
          ours: '0.1x a 10.0x + Modo GIF',
          capcut: '0.1x a 100x (Nuvem)',
          clideo: '0.25x a 4x',
        },
        {
          feature: 'Cadastro Obrigatório',
          ours: 'Nunca — Início Imediato',
          capcut: 'Login Obrigatório para Exportar',
          clideo: 'Opcional (Limita Arquivos Grátis)',
        },
        {
          feature: 'Tom de Áudio Sincronizado e Mudo',
          ours: 'Sim — FFmpeg atempo Encadeado',
          capcut: 'Sim',
          clideo: 'Sim',
        },
      ],
    },
    faq: {
      title: 'Perguntas Frequentes',
      items: [
        {
          q: 'Como acelerar um vídeo para TikTok ou Instagram sem marca d’água?',
          a: 'Envie seu vídeo para o ChangeVideoSpeed, escolha 1.5x ou 2x e clique em exportar. Ele muda a velocidade 100% grátis, sem marca d’água e sem cadastro.',
        },
        {
          q: 'Mudar a velocidade do vídeo altera o tom do áudio?',
          a: 'O ChangeVideoSpeed sincroniza o áudio automaticamente com a nova velocidade preservando o tom original por padrão, mas você também pode silenciar o áudio.',
        },
        {
          q: 'Meus vídeos são enviados para servidores na nuvem?',
          a: 'Não. O ChangeVideoSpeed roda 100% localmente no seu dispositivo usando FFmpeg WebAssembly. Seus vídeos nunca saem do aparelho.',
        },
        {
          q: 'Como passar um vídeo em câmera lenta do iPhone para velocidade normal?',
          a: 'Selecione o arquivo MOV ou MP4 no Safari, escolha 2x ou 4x, veja a prévia ao vivo e baixe o vídeo ajustado.',
        },
        {
          q: 'Quais velocidades e formatos são aceitos?',
          a: 'Você pode ajustar de 0.1x até 10.0x em arquivos MP4, MOV, WebM, MKV, AVI e GIF animado.',
        },
      ],
    },
    footer: {
      tagline: 'Controlador de Velocidade de Vídeo 100% no Navegador com WebAssembly.',
      privacyNote: 'Zero uploads. Zero rastreamento. Web app estático de código aberto.',
      copyright: '© 2026 ChangeVideoSpeed. Licença MIT.',
      githubLink: 'Repositório GitHub',
      supportLink: 'Pagar um Café',
    },
  },

  de: {
    meta: {
      title: 'Kostenloser Video-Geschwindigkeitswechsler Online',
      description:
        '100% kostenloser, privater Video-Speed-Changer. Videos & GIFs im Browser beschleunigen oder verlangsamen – ohne Upload, ohne Wasserzeichen.',
      keywords:
        'video geschwindigkeit ändern, video schneller machen, zeitlupe video, video geschwindigkeit iphone, tiktok, gif geschwindigkeit ändern, ohne wasserzeichen',
    },
    nav: {
      brandTitle: 'VideoSpeed Changer',
      homeAria: 'VideoSpeed Changer Startseite',
      languageAria: 'Sprache wählen',
      languageLabel: 'Sprache',
      themeToggleAria: 'Helles oder dunkles Design umschalten',
      themeToDark: 'Zum Dunkelmodus wechseln',
      themeToLight: 'Zum Hellmodus wechseln',
      githubAria: 'Quellcode auf GitHub ansehen',
      installPwa: 'Zum Startbildschirm',
      installPwaAria: 'VideoSpeed Changer zum Startbildschirm hinzufügen',
      installModalTitle: 'VideoSpeed Changer installieren',
      installModalBody: 'Nutzen Sie VideoSpeed Changer jederzeit offline als schnelle App ohne Datei-Uploads.',
      installModalIos: 'Safari (iOS/iPadOS): Teilen-Symbol antippen und „Zum Home-Bildschirm“ wählen.',
      installModalAndroid: 'Chrome / Edge (Android): Browser-Menü (⋮) öffnen und „App installieren“ antippen.',
      installModalDesktop: 'Chrome / Edge (Desktop): Auf das Installations-Symbol in der Adressleiste klicken.',
      installModalClose: 'Verstanden',
      installedLabel: 'App installiert',
      supportDev: 'Entwickler unterstützen',
      supportDevAria: 'Entwickler auf Gumroad unterstützen',
      menuOpenAria: 'Navigationsmenü öffnen',
      menuCloseAria: 'Navigationsmenü schließen',
    },
    hero: {
      h1: 'Kostenloser Online Video-Geschwindigkeitswechsler',
    },
    workspace: {
      modesToggleAria: 'Geschwindigkeitsmodi ein- oder ausblenden',
      modesLabel: 'Modi',
      modes: {
        change: 'Geschwindigkeit ändern',
        speedUp: 'Video beschleunigen',
        slowDown: 'Zeitlupe (Slo-Mo)',
        gif: 'GIF-Tempo ändern',
      },
      step1: {
        dropTitle: 'Video hier ablegen, um Tempo zu ändern',
        dropSubtitle: 'MP4, WebM, MOV, MKV, AVI & GIF • Einzel- oder Stapelverarbeitung',
        dropActive: 'Loslassen zum Laden',
        selectBtn: 'Video auswählen',
        privacyMicro: '100% lokaler RAM • Kein Upload • Kein Wasserzeichen',
      },
      step2: {
        presetsTitle: 'Tempo-Voreinstellungen',
        presetTagSlowest: 'Ultra Zeitlupe',
        presetTagSlow: 'Zeitlupe',
        presetTagBrisk: 'Flott',
        presetTagFast: 'Schnell',
        presetTagDouble: 'Doppelt',
        presetTagTimelapse: 'Zeitraffer',
        sliderLabel: 'Geschwindigkeit feinjustieren',
        sliderMin: '0.1x',
        sliderMax: '10.0x',
        audioTitle: 'Audio-Optionen',
        audioKeep: 'Ton behalten (Tonhöhe angepasst)',
        audioMute: 'Ton stummschalten',
        audioNotApplicable: 'GIF-Modus — keine Tonspur',
        previewLiveBadge: 'Live-Vorschau',
        originalLabel: 'Original',
        estimatedLabel: 'Neues Tempo',
        processBtn: 'Tempo ändern & Exportieren',
        processBatchBtn: 'Alle Videos verarbeiten',
        addMoreBtn: 'Weitere hinzufügen',
        changeFileBtn: 'Video wechseln',
        queueTitle: 'Warteschlange',
        removeFileAria: 'Datei aus Warteschlange entfernen',
        batchCountLabel: '{count} Dateien ausgewählt',
        mutePreviewAria: 'Vorschau stummschalten',
      },
      step3: {
        statusLoading: 'Lokale FFmpeg-WebAssembly-Engine wird geladen...',
        statusProbing: 'Video- und Tonspuren werden analysiert...',
        statusProcessing: 'Geschwindigkeit ändern & Audio synchronisieren...',
        statusProcessingGif: 'GIF-Bilder mit neuem Tempo rendern...',
        statusFinalizing: 'Exportdatei wird fertiggestellt...',
        statusBatchItem: 'Verarbeite {current} von {total}: {name}',
        trustBadge: '100% lokale Browser-RAM-Verarbeitung — Keine Server-Uploads, Kein Wasserzeichen',
        cancelBtn: 'Abbrechen',
      },
      step4: {
        doneBadge: 'Geschwindigkeit erfolgreich geändert',
        summaryTemplate: 'Original: {orig} → Neues Tempo ({speed}x): {next}',
        downloadBtn: 'Video herunterladen',
        downloadGifBtn: 'GIF herunterladen',
        downloadAllBtn: 'Alle herunterladen',
        adjustAgainBtn: 'Tempo erneut anpassen',
        processAnotherBtn: 'Weiteres Video bearbeiten',
        fileSizeLabel: 'Größe',
        batchReadyLabel: 'Fertig',
      },
      errors: {
        unsupportedFile: 'Nicht unterstütztes Dateiformat. Bitte wählen Sie ein Video (MP4, WebM, MOV, MKV, AVI) oder GIF.',
        ffmpegLoadFailed: 'Lokale FFmpeg-Engine konnte nicht geladen werden. Bitte Seite neu laden.',
        processingFailed: 'Verarbeitung fehlgeschlagen. Versuchen Sie ein anderes Tempo oder Format.',
        cancelled: 'Verarbeitung abgebrochen.',
      },
    },
    breadcrumbs: {
      ariaLabel: 'Brotkrumen-Navigation',
      home: 'Startseite',
      tools: 'Videobearbeitungs-Tools',
      current: 'Kostenloser Online Video-Geschwindigkeitswechsler',
    },
    howTo: {
      title: 'Video-Geschwindigkeit in 3 Schritten ändern',
      schemaName: 'Video online kostenlos beschleunigen oder verlangsamen',
      subtitle: 'Kostenloser Video-Geschwindigkeitsregler ohne Server-Upload direkt im Browser.',
      steps: [
        {
          title: '1. Video ablegen oder auswählen',
          desc: 'Ziehen Sie Ihre MP4-, MOV- oder WebM-Datei in den Arbeitsbereich (oder klicken Sie auf Video auswählen).',
        },
        {
          title: '2. Preset oder Regler festlegen',
          desc: 'Wählen Sie eine Voreinstellung (z. B. 2x zum Beschleunigen oder 0.5x für Zeitlupe) oder den Schieberegler.',
        },
        {
          title: '3. Sofort ohne Wasserzeichen exportieren',
          desc: 'Klicken Sie auf Tempo ändern, um das Video sofort lokal zu verarbeiten und herunterzuladen.',
        },
      ],
    },
    features: {
      title: 'Warum ChangeVideoSpeed nutzen?',
      items: [
        {
          title: 'Kein Upload, 100% Privat',
          desc: 'Videos direkt lokal im Browser-RAM beschleunigen oder verlangsamen — ohne Cloud-Wartezeit.',
        },
        {
          title: 'Perfekte Audio-Video-Synchronisation',
          desc: 'Kombinierte setpts- und atempo-Filter halten Sprache und Musik exakt synchron.',
        },
        {
          title: 'Ohne Wasserzeichen & Anmeldung',
          desc: 'Exportieren Sie MP4-Videos und GIFs in voller Qualität ohne Logos oder Limits.',
        },
        {
          title: 'Stapelverarbeitung & GIF-Tempo',
          desc: 'Mehrere Clips nacheinander verarbeiten oder animierte GIFs von 0.1x bis 10.0x anpassen.',
        },
      ],
    },
    guides: {
      title: 'Tipps für iPhone, TikTok, Reels & YouTube',
      subtitle: 'Schnelle Workflows ohne schwere Schnittprogramme oder Cloud-Konten.',
      items: [
        {
          title: 'Video-Geschwindigkeit auf iPhone & TikTok ändern',
          desc: 'Beschleunigen Sie TikTok- oder Reels-Clips direkt in Safari oder Chrome ohne CapCut-Wasserzeichen.',
        },
        {
          title: 'Zeitlupen-Video auf Normaltempo bringen',
          desc: 'Wandeln Sie 120fps/240fps-iPhone-Zeitlupen mit 2x oder 4x einfach wieder in normales Tempo um.',
        },
        {
          title: 'Schnelle Alternative zu Desktop-Editoren',
          desc: 'Sparen Sie den Start von DaVinci Resolve oder Clipchamp und erstellen Sie MP4s oder GIFs direkt im Tab.',
        },
      ],
    },
    comparison: {
      title: 'ChangeVideoSpeed vs. CapCut Web & Clideo',
      subtitle: 'Privatsphäre, Wasserzeichen, Geschwindigkeitsbereich und Upload-Zeit im Vergleich.',
      colFeature: 'Funktion',
      colOurs: 'ChangeVideoSpeed',
      colCapcut: 'CapCut Web',
      colClideo: 'Clideo',
      rows: [
        {
          feature: 'Keine Server-Uploads (Lokaler RAM)',
          ours: 'Ja — Lokales WebAssembly',
          capcut: 'Nein — Cloud-Upload nötig',
          clideo: 'Nein — Cloud-Upload nötig',
        },
        {
          feature: 'Kostenloser Export ohne Wasserzeichen',
          ours: 'Ja — Immer ohne Wasserzeichen',
          capcut: 'Konto / Pro-Tarif nötig',
          clideo: 'Wasserzeichen im Gratis-Tarif',
        },
        {
          feature: 'Unterstützter Bereich',
          ours: '0.1x bis 10.0x + GIF-Modus',
          capcut: '0.1x bis 100x (Cloud)',
          clideo: '0.25x bis 4x',
        },
        {
          feature: 'Anmeldung erforderlich',
          ours: 'Nie — Sofort starten',
          capcut: 'Login für Export nötig',
          clideo: 'Optional (Gratis-Limits)',
        },
        {
          feature: 'Tonhöhe & Stummschaltung',
          ours: 'Ja — FFmpeg atempo-Kette',
          capcut: 'Ja',
          clideo: 'Ja',
        },
      ],
    },
    faq: {
      title: 'Häufig gestellte Fragen',
      items: [
        {
          q: 'Wie beschleunige ich ein Video für TikTok oder Instagram ohne Wasserzeichen?',
          a: 'Laden Sie Ihr Video in ChangeVideoSpeed, wählen Sie 1.5x oder 2x und klicken Sie auf Exportieren. Komplett kostenlos, ohne Wasserzeichen und ohne Registrierung.',
        },
        {
          q: 'Verändert die Videogeschwindigkeit auch die Tonhöhe?',
          a: 'ChangeVideoSpeed synchronisiert die Audiospur automatisch. Standardmäßig bleibt die Original-Tonhöhe beim Beschleunigen oder Verlangsamen erhalten, oder Sie schalten den Ton komplett stumm.',
        },
        {
          q: 'Werden meine Videos auf einen Cloud-Server hochgeladen?',
          a: 'Nein. ChangeVideoSpeed läuft zu 100% lokal auf Ihrem Gerät per FFmpeg WebAssembly. Ihre privaten Videos verlassen niemals Ihr Gerät.',
        },
        {
          q: 'Wie ändere ich ein iPhone-Zeitlupen-Video zurück auf Normalgeschwindigkeit?',
          a: 'Öffnen Sie Ihre MOV- oder MP4-Datei in Safari, wählen Sie 2x oder 4x, prüfen Sie die Live-Vorschau und laden Sie die fertige Datei herunter.',
        },
        {
          q: 'Welche Geschwindigkeiten und Formate werden unterstützt?',
          a: 'Unterstützt werden 0.1x bis 10.0x für MP4, MOV, WebM, MKV, AVI und animierte GIFs.',
        },
      ],
    },
    footer: {
      tagline: '100% clientseitiger Video-Geschwindigkeitsregler mit WebAssembly.',
      privacyNote: 'Keine Server-Uploads. Kein Tracking. Open-Source Web-App.',
      copyright: '© 2026 ChangeVideoSpeed. MIT-Lizenz.',
      githubLink: 'GitHub-Repository',
      supportLink: 'Kaffee spendieren',
    },
  },

  fr: {
    meta: {
      title: 'Changeur de Vitesse Vidéo Gratuit en Ligne',
      description:
        'Changez la vitesse vidéo 100% gratuitement et en privé. Accélérez ou ralentissez MP4, MOV et GIF en ligne sans envoi ni filigrane.',
      keywords:
        'changer vitesse vidéo, accélérer vidéo en ligne, ralenti vidéo, vitesse vidéo iphone, tiktok, vitesse gif, sans filigrane',
    },
    nav: {
      brandTitle: 'VideoSpeed Changer',
      homeAria: 'Accueil VideoSpeed Changer',
      languageAria: 'Choisir la langue',
      languageLabel: 'Langue',
      themeToggleAria: 'Basculer entre thème clair et sombre',
      themeToDark: 'Passer en mode sombre',
      themeToLight: 'Passer en mode clair',
      githubAria: 'Voir le code source sur GitHub',
      installPwa: 'Ajouter à l’écran',
      installPwaAria: 'Ajouter VideoSpeed Changer à l’écran d’accueil',
      installModalTitle: 'Installer VideoSpeed Changer',
      installModalBody: 'Utilisez VideoSpeed Changer hors ligne à tout moment comme une application rapide sans envoi serveur.',
      installModalIos: 'Safari (iOS/iPadOS) : Touchez Partager puis « Sur l’écran d’accueil ».',
      installModalAndroid: 'Chrome / Edge (Android) : Ouvrez le menu (⋮) et touchez « Installer l’application ».',
      installModalDesktop: 'Chrome / Edge (Bureau) : Cliquez sur l’icône d’installation dans la barre d’adresse.',
      installModalClose: 'Compris',
      installedLabel: 'App installée',
      supportDev: 'Soutenir le Développeur',
      supportDevAria: 'Soutenir le développeur sur Gumroad',
      menuOpenAria: 'Ouvrir le menu de navigation',
      menuCloseAria: 'Fermer le menu de navigation',
    },
    hero: {
      h1: 'Changeur de Vitesse Vidéo en Ligne Gratuit',
    },
    workspace: {
      modesToggleAria: 'Afficher ou masquer les modes de vitesse',
      modesLabel: 'Modes',
      modes: {
        change: 'Changer la Vitesse',
        speedUp: 'Accélérer la Vidéo',
        slowDown: 'Ralenti Vidéo (Slo-Mo)',
        gif: 'Changer Vitesse GIF',
      },
      step1: {
        dropTitle: 'Déposez votre vidéo ici pour changer sa vitesse',
        dropSubtitle: 'MP4, WebM, MOV, MKV, AVI et GIF • Fichier unique ou lot',
        dropActive: 'Relâchez pour charger la vidéo',
        selectBtn: 'Sélectionner une Vidéo',
        privacyMicro: '100% RAM Locale • Zéro Envoi • Sans Filigrane',
      },
      step2: {
        presetsTitle: 'Vitesses Prédéfinies',
        presetTagSlowest: 'Super Ralenti',
        presetTagSlow: 'Ralenti',
        presetTagBrisk: 'Vif',
        presetTagFast: 'Rapide',
        presetTagDouble: 'Double',
        presetTagTimelapse: 'Timelapse',
        sliderLabel: 'Réglage Fin de Vitesse',
        sliderMin: '0.1x',
        sliderMax: '10.0x',
        audioTitle: 'Options Audio',
        audioKeep: 'Garder l’Audio (Tonalité Ajustée)',
        audioMute: 'Couper le Son',
        audioNotApplicable: 'Mode GIF — piste audio exclue',
        previewLiveBadge: 'Aperçu en Direct',
        originalLabel: 'Original',
        estimatedLabel: 'Nouvelle Vitesse',
        processBtn: 'Appliquer & Exporter',
        processBatchBtn: 'Traiter Toutes les Vidéos',
        addMoreBtn: 'Ajouter',
        changeFileBtn: 'Changer Vidéo',
        queueTitle: 'File d’attente',
        removeFileAria: 'Retirer le fichier',
        batchCountLabel: '{count} fichiers en file',
        mutePreviewAria: 'Couper le son de l’aperçu',
      },
      step3: {
        statusLoading: 'Chargement du moteur local FFmpeg WebAssembly...',
        statusProbing: 'Analyse des pistes vidéo et audio...',
        statusProcessing: 'Changement de Vitesse & Synchronisation Audio...',
        statusProcessingGif: 'Rendu des images GIF à la nouvelle vitesse...',
        statusFinalizing: 'Finalisation de la vidéo...',
        statusBatchItem: 'Traitement {current} sur {total} : {name}',
        trustBadge: 'Traitement 100% Local en RAM Navigateur — Zéro Envoi Serveur, Sans Filigrane',
        cancelBtn: 'Annuler',
      },
      step4: {
        doneBadge: 'Vitesse Modifiée avec Succès',
        summaryTemplate: 'Original : {orig} → Nouvelle Vitesse ({speed}x) : {next}',
        downloadBtn: 'Télécharger la Vidéo',
        downloadGifBtn: 'Télécharger le GIF',
        downloadAllBtn: 'Tout Télécharger',
        adjustAgainBtn: 'Réajuster la Vitesse',
        processAnotherBtn: 'Traiter une Autre Vidéo',
        fileSizeLabel: 'Taille',
        batchReadyLabel: 'Prêt',
      },
      errors: {
        unsupportedFile: 'Format non pris en charge. Choisissez une vidéo (MP4, WebM, MOV, MKV, AVI) ou un GIF.',
        ffmpegLoadFailed: 'Impossible de charger FFmpeg localement. Veuillez recharger la page.',
        processingFailed: 'Échec du traitement pour ce fichier. Essayez une autre vitesse ou un autre format.',
        cancelled: 'Traitement annulé.',
      },
    },
    breadcrumbs: {
      ariaLabel: 'Fil d’Ariane',
      home: 'Accueil',
      tools: 'Outils de Montage Vidéo',
      current: 'Changeur de Vitesse Vidéo en Ligne Gratuit',
    },
    howTo: {
      title: 'Comment Changer la Vitesse d’une Vidéo en 3 Étapes',
      schemaName: 'Comment Accélérer ou Ralentir une Vidéo en Ligne Gratuitement',
      subtitle: 'Contrôleur de vitesse gratuit sans aucun téléversement, directement dans votre navigateur.',
      steps: [
        {
          title: '1. Déposez ou Sélectionnez votre Vidéo',
          desc: 'Déposez votre fichier MP4, MOV ou WebM dans ChangeVideoSpeed (ou cliquez sur Sélectionner une Vidéo).',
        },
        {
          title: '2. Choisissez un Préréglage ou le Curseur',
          desc: 'Sélectionnez une vitesse rapide (2x pour accélérer ou 0.5x pour ralentir) ou ajustez avec le curseur.',
        },
        {
          title: '3. Exportez & Téléchargez Sans Filigrane',
          desc: 'Cliquez sur Appliquer & Exporter pour traiter instantanément dans votre navigateur et télécharger.',
        },
      ],
    },
    features: {
      title: 'Pourquoi Choisir ChangeVideoSpeed',
      items: [
        {
          title: 'Zéro Envoi, 100% Privé',
          desc: 'Modifiez la vitesse vidéo en ligne sans attente serveur. Tout s’exécute dans la RAM locale de votre navigateur.',
        },
        {
          title: 'Moteur Vidéo & Audio Synchronisé',
          desc: 'Les filtres combinés setpts et atempo gardent voix et musique parfaitement calées.',
        },
        {
          title: 'Sans Filigrane ni Inscription',
          desc: 'Exportez MP4 et GIF animés en pleine qualité sans logo ni limite quotidienne.',
        },
        {
          title: 'Traitement par Lots & GIF',
          desc: 'Traitez plusieurs clips ou modifiez la cadence des GIF animés de 0.1x à 10.0x.',
        },
      ],
    },
    guides: {
      title: 'Guides iPhone, TikTok, Reels & YouTube',
      subtitle: 'Workflows rapides pour créateurs mobiles sans logiciels lourds.',
      items: [
        {
          title: 'Changer la Vitesse Vidéo sur iPhone & TikTok',
          desc: 'Accélérez vos vidéos TikTok ou Reels directement dans Safari ou Chrome sans installer d’app ni subir le filigrane CapCut.',
        },
        {
          title: 'Remettre un Ralenti iPhone à Vitesse Normale',
          desc: 'Convertissez vos séquences 120fps/240fps filmées au ralenti à vitesse normale (2x ou 4x) avec aperçu instantané.',
        },
        {
          title: 'Alternative Légère aux Logiciels de Montage',
          desc: 'Inutile d’ouvrir DaVinci Resolve ou Clipchamp ou d’envoyer vos fichiers sur Google Drive pour accélérer une vidéo.',
        },
      ],
    },
    comparison: {
      title: 'ChangeVideoSpeed vs. CapCut Web & Clideo',
      subtitle: 'Comparez confidentialité, filigrane, plage de vitesse et délai d’envoi.',
      colFeature: 'Critère',
      colOurs: 'ChangeVideoSpeed',
      colCapcut: 'CapCut Web',
      colClideo: 'Clideo',
      rows: [
        {
          feature: 'Zéro Envoi Serveur (RAM Locale)',
          ours: 'Oui — WebAssembly Local',
          capcut: 'Non — Envoi Cloud Requis',
          clideo: 'Non — Envoi Cloud Requis',
        },
        {
          feature: 'Export Gratuit Sans Filigrane',
          ours: 'Oui — Toujours Sans Filigrane',
          capcut: 'Compte / Offre Pro Requise',
          clideo: 'Filigrane en Version Gratuite',
        },
        {
          feature: 'Plage de Vitesse',
          ours: '0.1x à 10.0x + Mode GIF',
          capcut: '0.1x à 100x (Cloud)',
          clideo: '0.25x à 4x',
        },
        {
          feature: 'Inscription Obligatoire',
          ours: 'Jamais — Démarrage Immédiat',
          capcut: 'Connexion Requise pour Exporter',
          clideo: 'Optionnelle (Quotas Gratuits)',
        },
        {
          feature: 'Synchronisation Audio & Silence',
          ours: 'Oui — FFmpeg atempo Chaîné',
          capcut: 'Oui',
          clideo: 'Oui',
        },
      ],
    },
    faq: {
      title: 'Questions Fréquentes',
      items: [
        {
          q: 'Comment accélérer une vidéo pour TikTok ou Instagram sans filigrane ?',
          a: 'Chargez votre vidéo dans ChangeVideoSpeed, sélectionnez 1.5x ou 2x et cliquez sur exporter. C’est 100% gratuit, sans filigrane et sans inscription.',
        },
        {
          q: 'Changer la vitesse modifie-t-il la hauteur de la voix (pitch) ?',
          a: 'ChangeVideoSpeed synchronise automatiquement la piste audio. Par défaut, la tonalité d’origine est préservée, et vous pouvez aussi couper le son.',
        },
        {
          q: 'Mes vidéos sont-elles envoyées sur un serveur cloud ?',
          a: 'Non. ChangeVideoSpeed fonctionne à 100% localement sur votre appareil grâce à FFmpeg WebAssembly. Vos fichiers privés ne quittent jamais votre navigateur.',
        },
        {
          q: 'Comment remettre une vidéo ralenti iPhone à vitesse normale ?',
          a: 'Ouvrez le fichier MOV ou MP4 dans Safari, sélectionnez 2x ou 4x, vérifiez l’aperçu en direct et téléchargez la vidéo.',
        },
        {
          q: 'Quelles vitesses et formats sont pris en charge ?',
          a: 'De 0.1x à 10.0x sur MP4, MOV, WebM, MKV, AVI et GIF animés.',
        },
      ],
    },
    footer: {
      tagline: 'Contrôleur de Vitesse Vidéo 100% Navigateur propulsé par WebAssembly.',
      privacyNote: 'Zéro envoi serveur. Zéro pistage. Application web statique open-source.',
      copyright: '© 2026 ChangeVideoSpeed. Licence MIT.',
      githubLink: 'Dépôt GitHub',
      supportLink: 'Offrir un Café',
    },
  },

  ja: {
    meta: {
      title: '無料オンライン動画速度変更ツール — 透かしなし',
      description:
        '100%無料・完全非公開の動画速度変更ツール。アップロード不要・透かしなしで、MP4・MOV・GIFをブラウザ内で瞬時に倍速・スロー変換。',
      keywords:
        '動画 速度 変更, 動画 倍速, スローモーション, iPhone 動画 速度変更, TikTok 倍速, GIF 速度変更, 透かしなし, ブラウザ 動画編集',
    },
    nav: {
      brandTitle: 'VideoSpeed Changer',
      homeAria: 'VideoSpeed Changer ホーム',
      languageAria: '言語を選択',
      languageLabel: '言語',
      themeToggleAria: 'ライト/ダークテーマを切り替え',
      themeToDark: 'ダークモードに切り替え',
      themeToLight: 'ライトモードに切り替え',
      githubAria: 'GitHubでソースコードを見る',
      installPwa: 'ホーム画面に追加',
      installPwaAria: 'VideoSpeed Changerをホーム画面に追加',
      installModalTitle: 'VideoSpeed Changer をインストール',
      installModalBody: 'サーバー送信なしの高速アプリとして、いつでもオフラインで利用できます。',
      installModalIos: 'Safari (iOS/iPadOS): 共有アイコンをタップし「ホーム画面に追加」を選択してください。',
      installModalAndroid: 'Chrome / Edge (Android): メニュー (⋮) から「アプリをインストール」をタップしてください。',
      installModalDesktop: 'Chrome / Edge (PC): アドレスバーのインストールアイコンから追加できます。',
      installModalClose: '閉じる',
      installedLabel: 'インストール済み',
      supportDev: '開発者を支援する',
      supportDevAria: 'Gumroadで開発者を支援する',
      menuOpenAria: 'ナビゲーションメニューを開く',
      menuCloseAria: 'ナビゲーションメニューを閉じる',
    },
    hero: {
      h1: '無料オンライン動画速度変更ツール',
    },
    workspace: {
      modesToggleAria: '速度モードの切り替え',
      modesLabel: 'モード',
      modes: {
        change: '動画速度を変更',
        speedUp: '動画を倍速にする',
        slowDown: 'スロー再生 (Slo-Mo)',
        gif: 'GIF速度を変更',
      },
      step1: {
        dropTitle: '動画をここにドロップして速度を変更',
        dropSubtitle: 'MP4, WebM, MOV, MKV, AVI, GIF 対応 • 一括処理可能',
        dropActive: 'ドロップして動画を読み込む',
        selectBtn: '動画を選択して速度を変更',
        privacyMicro: '100% ブラウザメモリ処理 • 送信なし • 透かしなし',
      },
      step2: {
        presetsTitle: '速度プリセット',
        presetTagSlowest: '超スロー',
        presetTagSlow: 'スロー',
        presetTagBrisk: 'やや速め',
        presetTagFast: '高速',
        presetTagDouble: '2倍速',
        presetTagTimelapse: 'タイムラプス',
        sliderLabel: '速度の微調整',
        sliderMin: '0.1x',
        sliderMax: '10.0x',
        audioTitle: '音声オプション',
        audioKeep: '音声を維持（テンポ同期・ピッチ補正）',
        audioMute: '音声をミュート',
        audioNotApplicable: 'GIFモード — 音声トラックなし',
        previewLiveBadge: 'リアルタイムプレビュー',
        originalLabel: '元動画',
        estimatedLabel: '変更後',
        processBtn: '速度を変更して書き出す',
        processBatchBtn: 'すべての動画を処理',
        addMoreBtn: '追加',
        changeFileBtn: '動画を変更',
        queueTitle: '選択中のファイル',
        removeFileAria: 'キューから削除',
        batchCountLabel: '{count} 件を選択中',
        mutePreviewAria: 'プレビュー音声の切り替え',
      },
      step3: {
        statusLoading: 'ローカル FFmpeg WebAssembly エンジンを読み込み中...',
        statusProbing: '映像・音声トラックを解析中...',
        statusProcessing: '速度変更と音声同期を実行中...',
        statusProcessingGif: '新しい速度でGIFフレームを生成中...',
        statusFinalizing: '出力ファイルを仕上げています...',
        statusBatchItem: '{total} 件中 {current} 件目を処理中: {name}',
        trustBadge: '100% ローカルブラウザRAM処理 — サーバーアップロードなし・透かしなし',
        cancelBtn: 'キャンセル',
      },
      step4: {
        doneBadge: '速度変更が完了しました',
        summaryTemplate: '元の長さ: {orig} → 新速度 ({speed}x): {next}',
        downloadBtn: '動画をダウンロード',
        downloadGifBtn: 'GIFをダウンロード',
        downloadAllBtn: 'すべてダウンロード',
        adjustAgainBtn: '速度を再調整する',
        processAnotherBtn: '別の動画を変更',
        fileSizeLabel: 'サイズ',
        batchReadyLabel: '完了',
      },
      errors: {
        unsupportedFile: '未対応のファイル形式です。動画（MP4, WebM, MOV, MKV, AVI）またはGIFを選択してください。',
        ffmpegLoadFailed: 'ローカルFFmpegエンジンの読み込みに失敗しました。ページを再読み込みしてください。',
        processingFailed: 'ファイルの処理に失敗しました。別の速度や形式をお試しください。',
        cancelled: '処理をキャンセルしました。',
      },
    },
    breadcrumbs: {
      ariaLabel: 'パンくずリスト',
      home: 'ホーム',
      tools: '動画編集ツール',
      current: '無料オンライン動画速度変更ツール',
    },
    howTo: {
      title: '3ステップで簡単に動画速度を変更',
      schemaName: '無料でオンライン動画の再生速度を速く・遅くする方法',
      subtitle: 'サーバーアップロード不要。ブラウザ内で完結する高速動画スピードコントローラー。',
      steps: [
        {
          title: '1. 動画またはGIFを選択・ドロップ',
          desc: 'MP4, MOV, WebMファイルをワークスペースにドロップ（または動画を選択をクリック）します。',
        },
        {
          title: '2. 倍率プリセットまたはスライダーを設定',
          desc: '2x（倍速）や0.5x（スロー）のプリセット、または0.1x〜10.0xスライダーを選びます。',
        },
        {
          title: '3. 透かしなしで即座に書き出し',
          desc: '「速度を変更して書き出す」をクリックすると、ブラウザ内で処理され新しい動画がダウンロードできます。',
        },
      ],
    },
    features: {
      title: 'ChangeVideoSpeed が選ばれる理由',
      items: [
        {
          title: 'アップロード不要・完全プライベート',
          desc: '動画データは外部サーバーに一切送信されず、すべてローカルブラウザのRAM内で処理されます。',
        },
        {
          title: '映像と音声をぴったり同期',
          desc: 'FFmpegのsetptsと連結atempoフィルターにより、倍速やスローでも音ズレを防ぎます。',
        },
        {
          title: '透かしなし・登録不要',
          desc: 'ロゴ透かしやアカウント登録なしで、高画質MP4やGIFを自由に書き出せます。',
        },
        {
          title: '一括処理＆GIF速度変更',
          desc: '複数ファイルを連続処理したり、GIFアニメを0.1倍〜10倍に調整できます。',
        },
      ],
    },
    guides: {
      title: 'iPhone・TikTok・YouTube向けの活用ガイド',
      subtitle: 'アプリ不要でSNS動画やスロー映像のテンポを自在に調整。',
      items: [
        {
          title: 'iPhoneやTikTok動画の速度を透かしなしで変更',
          desc: 'CapCutなどのアプリを入れなくても、SafariやChromeから直接動画を1.5倍・2倍速に加工して保存できます。',
        },
        {
          title: 'スローモーション動画を通常速度に戻す',
          desc: 'iPhoneで誤って120fps/240fpsスローで撮影したMOV動画を2xまたは4xにして通常スピードに戻せます。',
        },
        {
          title: '重い動画編集ソフトの高速代替ツール',
          desc: 'DaVinci ResolveやClipchampを起動したりGoogleドライブへアップロードせずに、数秒で速度変換やGIF化が完了します。',
        },
      ],
    },
    comparison: {
      title: 'ChangeVideoSpeed vs. CapCut Web & Clideo',
      subtitle: 'プライバシー、透かし、対応速度、アップロード待ち時間を比較。',
      colFeature: '機能',
      colOurs: 'ChangeVideoSpeed',
      colCapcut: 'CapCut Web',
      colClideo: 'Clideo',
      rows: [
        {
          feature: 'サーバーアップロード不要（ローカルRAM）',
          ours: 'はい — ローカルWebAssembly',
          capcut: 'いいえ — クラウド送信が必要',
          clideo: 'いいえ — クラウド送信が必要',
        },
        {
          feature: '透かしなしの無料書き出し',
          ours: 'はい — 常に透かしなし',
          capcut: 'アカウント / Proプラン条件あり',
          clideo: '無料版では透かしが入る',
        },
        {
          feature: '対応速度レンジ',
          ours: '0.1x 〜 10.0x + GIF対応',
          capcut: '0.1x 〜 100x（クラウド）',
          clideo: '0.25x 〜 4x',
        },
        {
          feature: 'アカウント登録',
          ours: '不要 — すぐ利用可能',
          capcut: '書き出し時にログイン必須',
          clideo: '任意（無料版に制限あり）',
        },
        {
          feature: '音声ピッチ同期・ミュート',
          ours: 'はい — FFmpeg連結atempo',
          capcut: 'はい',
          clideo: 'はい',
        },
      ],
    },
    faq: {
      title: 'よくある質問',
      items: [
        {
          q: 'TikTokやInstagram用の動画を透かしなしで倍速にするには？',
          a: '動画をChangeVideoSpeedに読み込み、1.5xまたは2xを選択して書き出すだけです。100%無料・透かしなし・登録不要で変換できます。',
        },
        {
          q: '動画の速度を変えると音声のピッチ（音程）も変わりますか？',
          a: 'ChangeVideoSpeedは新しい速度に合わせて音声を自動同期します。初期設定では元の音程（ピッチ）を維持したままテンポ変更でき、音声をミュートすることも可能です。',
        },
        {
          q: '速度変更時に動画がクラウドサーバーへ送信されますか？',
          a: 'いいえ。ChangeVideoSpeedはFFmpeg WebAssemblyにより端末内で100%ローカル実行されるため、動画が外部サーバーへアップロードされることはありません。',
        },
        {
          q: 'iPhoneのスローモーション動画を通常速度に戻せますか？',
          a: 'SafariからMOVまたはMP4ファイルを選び、2xまたは4xを選択してライブプレビュー確認後、そのまま書き出して保存できます。',
        },
        {
          q: '対応している速度範囲とファイル形式は？',
          a: '0.1倍のスロー再生から10.0倍のタイムラプスまで、MP4, MOV, WebM, MKV, AVI, GIF形式に対応しています。',
        },
      ],
    },
    footer: {
      tagline: 'WebAssemblyによる100%クライアントサイド動画速度コントローラー。',
      privacyNote: 'サーバー送信ゼロ・トラッキングゼロ・オープンソース静的Webアプリ。',
      copyright: '© 2026 ChangeVideoSpeed. MITライセンス.',
      githubLink: 'GitHub リポジトリ',
      supportLink: 'コーヒーで応援',
    },
  },

  zh: {
    meta: {
      title: '免费在线视频变速器 — 加速慢放无水印',
      description:
        '100% 免费、私密的在线视频变速器。无需上传服务器、无水印，直接在浏览器中快速加速或慢放 MP4、MOV 与 GIF。',
      keywords:
        '视频变速, 视频加速, 视频慢放, iPhone视频变速, 抖音变速, GIF变速, 无水印视频编辑, 在线剪辑',
    },
    nav: {
      brandTitle: 'VideoSpeed Changer',
      homeAria: 'VideoSpeed Changer 首页',
      languageAria: '选择语言',
      languageLabel: '语言',
      themeToggleAria: '切换浅色或深色主题',
      themeToDark: '切换到深色模式',
      themeToLight: '切换到浅色模式',
      githubAria: '在 GitHub 查看源码',
      installPwa: '添加到主屏幕',
      installPwaAria: '将 VideoSpeed Changer 添加到主屏幕',
      installModalTitle: '安装 VideoSpeed Changer',
      installModalBody: '将 VideoSpeed Changer 安装为快速离线桌面或移动应用，无需上传文件即可随时使用。',
      installModalIos: 'Safari (iOS/iPadOS)：轻点底部分享图标，然后选择“添加到主屏幕”。',
      installModalAndroid: 'Chrome / Edge (Android)：打开浏览器菜单 (⋮)，点击“安装应用”或“添加到主屏幕”。',
      installModalDesktop: 'Chrome / Edge (桌面端)：点击地址栏右侧的安装图标即可安装。',
      installModalClose: '知道了',
      installedLabel: '应用已安装',
      supportDev: '支持开发者',
      supportDevAria: '在 Gumroad 上支持开发者',
      menuOpenAria: '打开导航菜单',
      menuCloseAria: '关闭导航菜单',
    },
    hero: {
      h1: '免费在线视频变速器',
    },
    workspace: {
      modesToggleAria: '展开或收起速度模式选项',
      modesLabel: '模式预设',
      modes: {
        change: '调整视频速度',
        speedUp: '视频加速',
        slowDown: '慢动作视频 (Slo-Mo)',
        gif: '调整 GIF 速度',
      },
      step1: {
        dropTitle: '将视频拖放到此处即可变速',
        dropSubtitle: '支持 MP4、WebM、MOV、MKV、AVI 与 GIF • 支持批量处理',
        dropActive: '松开鼠标立即加载视频',
        selectBtn: '选择视频进行变速',
        privacyMicro: '100% 本地浏览器内存 • 零上传 • 无水印',
      },
      step2: {
        presetsTitle: '预设倍速',
        presetTagSlowest: '超慢动作',
        presetTagSlow: '慢放',
        presetTagBrisk: '微快',
        presetTagFast: '快速',
        presetTagDouble: '二倍速',
        presetTagTimelapse: '延时快放',
        sliderLabel: '精细调节倍速',
        sliderMin: '0.1x',
        sliderMax: '10.0x',
        audioTitle: '音频选项',
        audioKeep: '保留音频（音调同步调整）',
        audioMute: '静音音频',
        audioNotApplicable: 'GIF 模式 — 自动忽略音轨',
        previewLiveBadge: '实时倍速预览',
        originalLabel: '原视频',
        estimatedLabel: '新倍速',
        processBtn: '应用倍速并导出',
        processBatchBtn: '批量处理全部视频',
        addMoreBtn: '继续添加',
        changeFileBtn: '更换视频',
        queueTitle: '已选文件队列',
        removeFileAria: '从队列移除文件',
        batchCountLabel: '已加入 {count} 个文件',
        mutePreviewAria: '切换预览静音',
      },
      step3: {
        statusLoading: '正在加载本地 FFmpeg WebAssembly 引擎...',
        statusProbing: '正在分析视频与音轨信息...',
        statusProcessing: '正在调整速度并同步音频...',
        statusProcessingGif: '正在按新速度渲染 GIF 帧...',
        statusFinalizing: '正在封装输出视频...',
        statusBatchItem: '正在处理第 {current} / {total} 个：{name}',
        trustBadge: '100% 本地浏览器内存处理 — 零服务器上传，无水印',
        cancelBtn: '取消',
      },
      step4: {
        doneBadge: '视频变速完成',
        summaryTemplate: '原时长：{orig} → 新倍速 ({speed}x)：{next}',
        downloadBtn: '下载视频',
        downloadGifBtn: '下载 GIF',
        downloadAllBtn: '全部下载',
        adjustAgainBtn: '重新调整倍速',
        processAnotherBtn: '处理其他视频',
        fileSizeLabel: '文件大小',
        batchReadyLabel: '已完成',
      },
      errors: {
        unsupportedFile: '不支持的文件格式，请选择视频（MP4、WebM、MOV、MKV、AVI）或 GIF。',
        ffmpegLoadFailed: '本地 FFmpeg 引擎加载失败，请刷新页面后重试。',
        processingFailed: '处理失败，请尝试其他倍速或文件格式。',
        cancelled: '已取消处理。',
      },
    },
    breadcrumbs: {
      ariaLabel: '面包屑导航',
      home: '首页',
      tools: '视频编辑工具',
      current: '免费在线视频变速器',
    },
    howTo: {
      title: '3 步轻松完成视频变速',
      schemaName: '如何免费在线加速或放慢视频速度',
      subtitle: '零上传纯本地浏览器视频变速控制器，开箱即用。',
      steps: [
        {
          title: '1. 拖入或选择视频文件',
          desc: '将 MP4、MOV 或 WebM 文件拖入 ChangeVideoSpeed 工作区（或点击选择视频）。',
        },
        {
          title: '2. 选择倍速预设或自定义滑块',
          desc: '选择快速预设（如 2x 加速或 0.5x 慢动作）或拖动 0.1x–10.0x 滑块。',
        },
        {
          title: '3. 无水印导出并立即下载',
          desc: '点击应用倍速，在浏览器内即时完成编码并下载纯净新文件。',
        },
      ],
    },
    features: {
      title: '为什么选择 ChangeVideoSpeed',
      items: [
        {
          title: '零上传，100% 隐私安全',
          desc: '视频绝不会发送到任何外部服务器，所有编解码都在您自己的浏览器内存中完成。',
        },
        {
          title: '音画同步引擎',
          desc: '通过 FFmpeg setpts 与级联 atempo 滤镜，确保人声与配乐在任意倍速下精准对齐。',
        },
        {
          title: '无水印，免登录',
          desc: '免费导出清晰 MP4 视频和 GIF，没有任何水印徽标、付费墙或每日限额。',
        },
        {
          title: '支持批量与 GIF 变速',
          desc: '支持多文件排队连续转换，并可轻松将视频或 GIF 调整为 0.1x–10.0x 速度。',
        },
      ],
    },
    guides: {
      title: 'iPhone、TikTok、Reels 与 YouTube 实用教程',
      subtitle: '无需下载庞大剪辑软件，轻松搞定短视频与慢动作修复。',
      items: [
        {
          title: '在 iPhone 和 TikTok 上无水印调整视频速度',
          desc: '不想安装 App 或担心 CapCut 导出水印？直接在 Safari 或 Chrome 打开本工具，选择 1.5x 或 2x 即可快速保存。',
        },
        {
          title: '把 iPhone 慢动作视频恢复为正常速度',
          desc: '误用 120fps/240fps 慢动作拍摄的视频，只需加载 MOV 文件并选择 2x 或 4x，即可预览并恢复正常节奏。',
        },
        {
          title: '桌面剪辑软件的轻量化替代方案',
          desc: '无需启动 DaVinci Resolve 或 Clipchamp，也不用上传到 Google Drive，几秒钟内即可完成视频变速或视频转 GIF。',
        },
      ],
    },
    comparison: {
      title: 'ChangeVideoSpeed 对比 CapCut Web 与 Clideo',
      subtitle: '在隐私保护、无水印导出、倍速范围和等待时间方面直观对比。',
      colFeature: '对比项',
      colOurs: 'ChangeVideoSpeed',
      colCapcut: 'CapCut Web',
      colClideo: 'Clideo',
      rows: [
        {
          feature: '零服务器上传（本地 RAM 处理）',
          ours: '支持 — 本地 WebAssembly',
          capcut: '不支持 — 需上传云端',
          clideo: '不支持 — 需上传云端',
        },
        {
          feature: '免费无水印导出',
          ours: '支持 — 永久无水印',
          capcut: '需登录 / Pro 会员',
          clideo: '免费版带有水印',
        },
        {
          feature: '支持倍速范围',
          ours: '0.1x 至 10.0x + GIF 模式',
          capcut: '0.1x 至 100x（云端）',
          clideo: '0.25x 至 4x',
        },
        {
          feature: '是否强制注册登录',
          ours: '从不 — 打开即用',
          capcut: '导出需登录账号',
          clideo: '可选（免费文件受限）',
        },
        {
          feature: '音调同步与静音切换',
          ours: '支持 — FFmpeg 级联 atempo',
          capcut: '支持',
          clideo: '支持',
        },
      ],
    },
    faq: {
      title: '常见问题',
      items: [
        {
          q: '如何免费无水印地为 TikTok 或 Instagram 视频加速？',
          a: '将视频拖入 ChangeVideoSpeed，选择 1.5x 或 2x 预设并点击导出即可。100% 免费、无水印且无需注册。',
        },
        {
          q: '调整视频速度会改变声音音调吗？',
          a: 'ChangeVideoSpeed 会自动将音轨与新速度同步。默认在加速或慢放时保留原始音调，您也可以选择完全静音。',
        },
        {
          q: '变速时我的视频会上传到云服务器吗？',
          a: '不会。ChangeVideoSpeed 通过 FFmpeg WebAssembly 在您的设备本地 100% 运行，私人视频从不离开您的浏览器。',
        },
        {
          q: '如何把 iPhone 慢动作视频变回正常速度？',
          a: '在 Safari 中选择 MOV 或 MP4 文件，点击 2x 或 4x 预设并实时预览效果后即可直接导出。',
        },
        {
          q: '支持哪些倍速范围和文件格式？',
          a: '支持 0.1x 慢放至 10.0x 快放，兼容 MP4、MOV、WebM、MKV、AVI 以及动态 GIF。',
        },
      ],
    },
    footer: {
      tagline: '基于 WebAssembly 的 100% 客户端视频变速工具。',
      privacyNote: '零服务器上传 · 零追踪 · 开源静态 Web 应用。',
      copyright: '© 2026 ChangeVideoSpeed. MIT 开源协议。',
      githubLink: 'GitHub 仓库',
      supportLink: '请我喝杯咖啡',
    },
  },

  ru: {
    meta: {
      title: 'Изменитель Скорости Видео Онлайн Бесплатно',
      description:
        'Бесплатный и приватный изменитель скорости видео. Ускоряйте и замедляйте MP4, MOV и GIF в браузере без загрузок и водяных знаков.',
      keywords:
        'изменить скорость видео, ускорить видео онлайн, замедлить видео, скорость видео iphone, tiktok, скорость gif, без водяных знаков',
    },
    nav: {
      brandTitle: 'VideoSpeed Changer',
      homeAria: 'Главная страница VideoSpeed Changer',
      languageAria: 'Выбрать язык',
      languageLabel: 'Язык',
      themeToggleAria: 'Переключить светлую или тёмную тему',
      themeToDark: 'Переключить на тёмную тему',
      themeToLight: 'Переключить на светлую тему',
      githubAria: 'Исходный код на GitHub',
      installPwa: 'На экран Домой',
      installPwaAria: 'Добавить VideoSpeed Changer на главный экран',
      installModalTitle: 'Установить VideoSpeed Changer',
      installModalBody: 'Используйте VideoSpeed Changer офлайн в любое время как быстрое приложение без отправки файлов.',
      installModalIos: 'Safari (iOS/iPadOS): Нажмите «Поделиться» и выберите «На экран „Домой“».',
      installModalAndroid: 'Chrome / Edge (Android): Откройте меню (⋮) и нажмите «Установить приложение».',
      installModalDesktop: 'Chrome / Edge (ПК): Нажмите значок установки в адресной строке браузера.',
      installModalClose: 'Понятно',
      installedLabel: 'Установлено',
      supportDev: 'Поддержать Автора',
      supportDevAria: 'Поддержать разработчика на Gumroad',
      menuOpenAria: 'Открыть меню навигации',
      menuCloseAria: 'Закрыть меню навигации',
    },
    hero: {
      h1: 'Бесплатный Онлайн Изменитель Скорости Видео',
    },
    workspace: {
      modesToggleAria: 'Показать или скрыть режимы скорости',
      modesLabel: 'Режимы',
      modes: {
        change: 'Изменить скорость',
        speedUp: 'Ускорить видео',
        slowDown: 'Замедление (Slo-Mo)',
        gif: 'Скорость GIF',
      },
      step1: {
        dropTitle: 'Перетащите видео сюда, чтобы изменить скорость',
        dropSubtitle: 'MP4, WebM, MOV, MKV, AVI и GIF • Один файл или пакетная обработка',
        dropActive: 'Отпустите для загрузки видео',
        selectBtn: 'Выбрать Видео для Изменения Скорости',
        privacyMicro: '100% Локальная RAM • Ноль Загрузок • Без Водяных Знаков',
      },
      step2: {
        presetsTitle: 'Пресеты скорости',
        presetTagSlowest: 'Ультра слоу-мо',
        presetTagSlow: 'Замедление',
        presetTagBrisk: 'Бодро',
        presetTagFast: 'Быстро',
        presetTagDouble: 'Вдвое быстрее',
        presetTagTimelapse: 'Таймлапс',
        sliderLabel: 'Точная настройка скорости',
        sliderMin: '0.1x',
        sliderMax: '10.0x',
        audioTitle: 'Параметры звука',
        audioKeep: 'Сохранить звук (с коррекцией темпа)',
        audioMute: 'Отключить звук',
        audioNotApplicable: 'Режим GIF — звуковая дорожка отключена',
        previewLiveBadge: 'Предпросмотр',
        originalLabel: 'Оригинал',
        estimatedLabel: 'Новая скорость',
        processBtn: 'Изменить скорость и экспортировать',
        processBatchBtn: 'Обработать все видео',
        addMoreBtn: 'Добавить ещё',
        changeFileBtn: 'Сменить видео',
        queueTitle: 'Выбранная очередь',
        removeFileAria: 'Удалить файл из очереди',
        batchCountLabel: 'Файлов в очереди: {count}',
        mutePreviewAria: 'Выключить звук предпросмотра',
      },
      step3: {
        statusLoading: 'Загрузка локального движка FFmpeg WebAssembly...',
        statusProbing: 'Анализ видео- и аудиодорожек...',
        statusProcessing: 'Изменение скорости и синхронизация звука...',
        statusProcessingGif: 'Рендеринг кадров GIF с новой скоростью...',
        statusFinalizing: 'Финализация готового файла...',
        statusBatchItem: 'Обработка {current} из {total}: {name}',
        trustBadge: '100% Локальная обработка в RAM браузера — Без отправки на сервер и водяных знаков',
        cancelBtn: 'Отмена',
      },
      step4: {
        doneBadge: 'Скорость успешно изменена',
        summaryTemplate: 'Оригинал: {orig} → Новая скорость ({speed}x): {next}',
        downloadBtn: 'Скачать видео',
        downloadGifBtn: 'Скачать GIF',
        downloadAllBtn: 'Скачать все',
        adjustAgainBtn: 'Настроить скорость снова',
        processAnotherBtn: 'Изменить другое видео',
        fileSizeLabel: 'Размер',
        batchReadyLabel: 'Готово',
      },
      errors: {
        unsupportedFile: 'Неподдерживаемый формат. Выберите видео (MP4, WebM, MOV, MKV, AVI) или GIF.',
        ffmpegLoadFailed: 'Не удалось загрузить локальный движок FFmpeg. Обновите страницу и повторите попытку.',
        processingFailed: 'Ошибка обработки файла. Попробуйте другую скорость или формат.',
        cancelled: 'Обработка отменена.',
      },
    },
    breadcrumbs: {
      ariaLabel: 'Навигационная цепочка',
      home: 'Главная',
      tools: 'Инструменты видеомонтажа',
      current: 'Бесплатный Онлайн Изменитель Скорости Видео',
    },
    howTo: {
      title: 'Как изменить скорость видео за 3 простых шага',
      schemaName: 'Как бесплатно ускорить или замедлить видео онлайн',
      subtitle: 'Контроллер скорости видео без загрузок на сервер прямо в вашем браузере.',
      steps: [
        {
          title: '1. Выберите или перетащите видео',
          desc: 'Перетащите MP4, MOV или WebM в рабочую область ChangeVideoSpeed (или нажмите Выбрать видео).',
        },
        {
          title: '2. Задайте множитель или ползунок',
          desc: 'Выберите пресет (например, 2x для ускорения или 0.5x для замедления) или настройте слайдер.',
        },
        {
          title: '3. Экспортируйте без водяных знаков',
          desc: 'Нажмите Изменить скорость — видео мгновенно обработается в браузере и станет доступно для скачивания.',
        },
      ],
    },
    features: {
      title: 'Почему выбирают ChangeVideoSpeed',
      items: [
        {
          title: 'Ноль загрузок, 100% Приватность',
          desc: 'Ваши ролики никогда не отправляются на внешние серверы. Всё кодирование идёт в локальной RAM.',
        },
        {
          title: 'Синхронизация видео и звука',
          desc: 'Связанные фильтры FFmpeg setpts и atempo сохраняют речь и музыку в идеальном синхроне.',
        },
        {
          title: 'Без водяных знаков и регистрации',
          desc: 'Сохраняйте видео и GIF в полном качестве без логотипов, подписок и дневных лимитов.',
        },
        {
          title: 'Пакетная обработка и GIF',
          desc: 'Ставьте в очередь сразу несколько роликов или меняйте скорость GIF от 0.1x до 10.0x.',
        },
      ],
    },
    guides: {
      title: 'Руководство для iPhone, TikTok, Reels и YouTube',
      subtitle: 'Удобные сценарии без тяжёлых программ монтажа и облачных ограничений.',
      items: [
        {
          title: 'Изменение скорости видео на iPhone и для TikTok',
          desc: 'Ускоряйте ролики для TikTok и Reels прямо в Safari или Chrome без установки приложений и водяных знаков CapCut.',
        },
        {
          title: 'Перевод Slow-Mo видео в обычную скорость',
          desc: 'Случайно сняли клип на iPhone в режиме 120fps/240fps? Выберите 2x или 4x, чтобы вернуть нормальную скорость.',
        },
        {
          title: 'Быстрая альтернатива видеоредакторам',
          desc: 'Не нужно запускать DaVinci Resolve или Clipchamp или загружать файлы на Google Диск ради смены скорости.',
        },
      ],
    },
    comparison: {
      title: 'Сравнение ChangeVideoSpeed с CapCut Web и Clideo',
      subtitle: 'Приватность, водяные знаки, диапазон скоростей и время ожидания.',
      colFeature: 'Критерий',
      colOurs: 'ChangeVideoSpeed',
      colCapcut: 'CapCut Web',
      colClideo: 'Clideo',
      rows: [
        {
          feature: 'Без загрузок на сервер (RAM браузера)',
          ours: 'Да — Локальный WebAssembly',
          capcut: 'Нет — Нужна загрузка в облако',
          clideo: 'Нет — Нужна загрузка в облако',
        },
        {
          feature: 'Бесплатный экспорт без водяного знака',
          ours: 'Да — Всегда без водяных знаков',
          capcut: 'Нужен аккаунт / Pro',
          clideo: 'Водяной знак в бесплатной версии',
        },
        {
          feature: 'Диапазон скорости',
          ours: '0.1x – 10.0x + режим GIF',
          capcut: '0.1x – 100x (облако)',
          clideo: '0.25x – 4x',
        },
        {
          feature: 'Регистрация для экспорта',
          ours: 'Не требуется — мгновенный старт',
          capcut: 'Требуется вход в аккаунт',
          clideo: 'Опционально (лимиты)',
        },
        {
          feature: 'Коррекция тона звука и отключение',
          ours: 'Да — Цепочка FFmpeg atempo',
          capcut: 'Да',
          clideo: 'Да',
        },
      ],
    },
    faq: {
      title: 'Часто задаваемые вопросы',
      items: [
        {
          q: 'Как ускорить видео для TikTok или Instagram без водяного знака?',
          a: 'Загрузите видео в ChangeVideoSpeed, выберите пресет 1.5x или 2x и нажмите экспорт. Это 100% бесплатно, без водяных знаков и без регистрации.',
        },
        {
          q: 'Меняется ли высота голоса (тон) при изменении скорости видео?',
          a: 'ChangeVideoSpeed автоматически синхронизирует звуковую дорожку. По умолчанию оригинальный тон звука сохраняется, также можно полностью отключить звук.',
        },
        {
          q: 'Загружаются ли мои видео на облачный сервер при смене скорости?',
          a: 'Нет. ChangeVideoSpeed работает на 100% локально на вашем устройстве через FFmpeg WebAssembly. Ваши личные файлы никогда не покидают браузер.',
        },
        {
          q: 'Как вернуть замедленное видео с iPhone в обычную скорость?',
          a: 'Откройте MOV или MP4 в Safari, выберите 2x или 4x, проверьте предпросмотр в реальном времени и скачайте файл.',
        },
        {
          q: 'Какие скорости и форматы поддерживаются?',
          a: 'Поддерживаются скорости от 0.1x до 10.0x для MP4, MOV, WebM, MKV, AVI и анимированных GIF.',
        },
      ],
    },
    footer: {
      tagline: '100% клиентский контроллер скорости видео на базе WebAssembly.',
      privacyNote: 'Без загрузок на сервер. Без трекинга. Открытое статическое веб-приложение.',
      copyright: '© 2026 ChangeVideoSpeed. Лицензия MIT.',
      githubLink: 'Репозиторий GitHub',
      supportLink: 'Угостить кофе',
    },
  },
};
