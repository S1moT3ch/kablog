import React from 'react';

// Configurazione completa dei profili Boomer con stato WhatsApp, colori e badge
export const BOOMER_PROFILES = {
  '@gianni_pesca_e_funghi59': {
    badgeEmoji: '🐟',
    status: '«A pesca al lago, non rispondo a nessuno! 🐟🎣»',
    bgGradient: ['#e0f2fe', '#bae6fd'],
    borderColor: '#7dd3fc',
    renderAvatar: () => (
      <svg viewBox="0 0 100 100" className="boomer-svg-face">
        <defs>
          <radialGradient id="bg-gianni" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f0f9ff" />
            <stop offset="100%" stopColor="#bae6fd" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#bg-gianni)" />
        {/* Spalle e camicia da pesca a quadretti */}
        <path d="M18 96 C22 76 34 72 50 72 C66 72 78 76 82 96 Z" fill="#65a30d" />
        <path d="M44 72 L44 96 M56 72 L56 96 M28 84 L72 84" stroke="#4d7c0f" strokeWidth="1.5" />
        {/* Collo e Testa */}
        <rect x="42" y="62" width="16" height="15" rx="4" fill="#fbd38d" />
        <circle cx="50" cy="52" r="23" fill="#fbd38d" />
        {/* Orecchie */}
        <circle cx="27" cy="53" r="5" fill="#f6ad55" />
        <circle cx="73" cy="53" r="5" fill="#f6ad55" />
        {/* Occhi ridenti */}
        <path d="M39 48 Q43 45 47 48" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M53 48 Q57 45 61 48" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Nasone bonario */}
        <path d="M48 50 Q50 56 53 54" stroke="#dd6b20" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Guanciotte rosate */}
        <circle cx="36" cy="55" r="4" fill="#f87171" opacity="0.35" />
        <circle cx="64" cy="55" r="4" fill="#f87171" opacity="0.35" />
        {/* Baffoni bianchi da pescatore */}
        <path d="M36 57 Q49 59 49 57 Q51 57 51 59 Q64 57 64 61 Q56 67 50 63 Q44 67 36 57 Z" fill="#f3f4f6" stroke="#cbd5e1" strokeWidth="1.2" />
        {/* Sorriso sotto i baffi */}
        <path d="M45 65 Q50 68 55 65" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Cappello da pescatore verde oliva */}
        <path d="M29 38 L34 21 Q50 18 66 21 L71 38 Z" fill="#4d7c0f" />
        <ellipse cx="50" cy="38" rx="27" ry="7" fill="#65a30d" />
        {/* Amo da pesca sul cappello */}
        <path d="M60 27 Q64 30 62 33 Q59 34 58 32" stroke="#e2e8f0" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <circle cx="60" cy="26" r="1.5" fill="#e2e8f0" />
      </svg>
    )
  },

  '@mariella_caffettino_buongiornissimo': {
    badgeEmoji: '☕',
    status: '«BUONGIORNOOO!! Kaffè pronto con tanto affetto! ☕✨»',
    bgGradient: ['#fef3c7', '#fde68a'],
    borderColor: '#fcd34d',
    renderAvatar: () => (
      <svg viewBox="0 0 100 100" className="boomer-svg-face">
        <defs>
          <radialGradient id="bg-mariella" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="100%" stopColor="#fde68a" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#bg-mariella)" />
        {/* Permanente riccioluta marrone/castana - sfondo */}
        <circle cx="32" cy="38" r="14" fill="#92400e" />
        <circle cx="68" cy="38" r="14" fill="#92400e" />
        <circle cx="50" cy="30" r="16" fill="#92400e" />
        <circle cx="26" cy="48" r="12" fill="#92400e" />
        <circle cx="74" cy="48" r="12" fill="#92400e" />
        {/* Maglioncino lilla/rosa */}
        <path d="M20 96 C24 76 34 72 50 72 C66 72 76 76 80 96 Z" fill="#ec4899" />
        {/* Testa e collo */}
        <rect x="42" y="62" width="16" height="15" rx="4" fill="#fed7aa" />
        <circle cx="50" cy="52" r="22" fill="#fed7aa" />
        {/* Ricciolini frontali */}
        <circle cx="38" cy="35" r="8" fill="#b45309" />
        <circle cx="50" cy="33" r="8" fill="#b45309" />
        <circle cx="62" cy="35" r="8" fill="#b45309" />
        {/* Orecchini di perla */}
        <circle cx="27" cy="56" r="3.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <circle cx="73" cy="56" r="3.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        {/* Occhiali rossi da lettura */}
        <circle cx="41" cy="50" r="7" fill="none" stroke="#dc2626" strokeWidth="2.2" />
        <circle cx="59" cy="50" r="7" fill="none" stroke="#dc2626" strokeWidth="2.2" />
        <path d="M48 50 L52 50" stroke="#dc2626" strokeWidth="2.2" />
        <path d="M34 49 L28 47 M66 49 L72 47" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
        {/* Occhi dietro le lenti */}
        <circle cx="41" cy="50" r="2.2" fill="#1f2937" />
        <circle cx="59" cy="50" r="2.2" fill="#1f2937" />
        {/* Guance e Rossetto */}
        <circle cx="35" cy="57" r="4.5" fill="#fb7185" opacity="0.45" />
        <circle cx="65" cy="57" r="4.5" fill="#fb7185" opacity="0.45" />
        <path d="M44 63 Q50 70 56 63" stroke="#be123c" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        {/* Tazzina di caffè in basso a destra con vapore */}
        <g transform="translate(62, 70) scale(0.7)">
          <path d="M10 10 L26 10 L24 24 L12 24 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
          <path d="M24 13 Q30 13 30 18 Q30 22 23 22" fill="none" stroke="#ffffff" strokeWidth="2" />
          <path d="M15 6 Q17 3 15 0" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M21 6 Q23 3 21 0" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    )
  },

  '@franco_e_rossana_profilo_unico': {
    badgeEmoji: '👫',
    status: '«Profilo gestito da entrambi. Non accettiamo richieste strane! 👫❤️»',
    bgGradient: ['#fce7f3', '#fbcfe8'],
    borderColor: '#f472b6',
    renderAvatar: () => (
      <svg viewBox="0 0 100 100" className="boomer-svg-face">
        <defs>
          <radialGradient id="bg-franco-rossana" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fff1f2" />
            <stop offset="100%" stopColor="#fbcfe8" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#bg-franco-rossana)" />
        {/* Capelli biondi di Rossana a destra */}
        <circle cx="64" cy="42" r="16" fill="#fde047" />
        <circle cx="76" cy="52" r="11" fill="#fde047" />
        {/* Spalle congiunte */}
        <path d="M14 96 C18 78 28 74 44 74 C50 74 54 78 54 96 Z" fill="#3b82f6" />
        <path d="M46 96 C46 76 56 72 70 72 C82 72 88 78 90 96 Z" fill="#ec4899" />
        {/* Testa di Franco (sinistra) */}
        <circle cx="36" cy="52" r="17" fill="#fbd38d" />
        {/* Capelli brizzolati ai lati di Franco */}
        <path d="M20 54 Q19 44 26 42" stroke="#9ca3af" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M44 42 Q49 44 49 52" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Occhiali quadrati di Franco */}
        <rect x="26" y="48" width="8" height="7" rx="1.5" fill="none" stroke="#1f2937" strokeWidth="1.8" />
        <rect x="37" y="48" width="8" height="7" rx="1.5" fill="none" stroke="#1f2937" strokeWidth="1.8" />
        <line x1="34" y1="51" x2="37" y2="51" stroke="#1f2937" strokeWidth="1.8" />
        <circle cx="30" cy="51.5" r="1.5" fill="#1f2937" />
        <circle cx="41" cy="51.5" r="1.5" fill="#1f2937" />
        <path d="M31 61 Q36 64 41 61" stroke="#1f2937" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Testa di Rossana (destra) */}
        <circle cx="65" cy="52" r="16" fill="#fed7aa" />
        {/* Occhiali tondi fucsia di Rossana */}
        <circle cx="58" cy="50" r="5.5" fill="none" stroke="#db2777" strokeWidth="1.8" />
        <circle cx="71" cy="50" r="5.5" fill="none" stroke="#db2777" strokeWidth="1.8" />
        <line x1="63.5" y1="50" x2="65.5" y2="50" stroke="#db2777" strokeWidth="1.8" />
        <circle cx="58" cy="50" r="1.5" fill="#1f2937" />
        <circle cx="71" cy="50" r="1.5" fill="#1f2937" />
        <path d="M60 61 Q65 66 70 61" stroke="#be123c" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        {/* Cuoricino rosso che unisce la coppia in alto */}
        <path d="M50 20 C48 16 43 16 43 21 C43 26 50 31 50 31 C50 31 57 26 57 21 C57 16 52 16 50 20 Z" fill="#ef4444" />
      </svg>
    )
  },

  '@silvano_esperto_cantieri_61': {
    badgeEmoji: '🚧',
    status: '«Stanno asfaltando la provinciale, vado a controllare i lavori! 🚧📐»',
    bgGradient: ['#ffedd5', '#fed7aa'],
    borderColor: '#fb923c',
    renderAvatar: () => (
      <svg viewBox="0 0 100 100" className="boomer-svg-face">
        <defs>
          <radialGradient id="bg-silvano" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fff7ed" />
            <stop offset="100%" stopColor="#fed7aa" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#bg-silvano)" />
        {/* Giubbotto da cantiere arancione con striscia catarifrangente */}
        <path d="M18 96 C22 76 34 72 50 72 C66 72 78 76 82 96 Z" fill="#ea580c" />
        <rect x="22" y="83" width="56" height="6" fill="#f1f5f9" opacity="0.9" />
        {/* Testa e collo */}
        <rect x="42" y="62" width="16" height="15" rx="4" fill="#fbd38d" />
        <circle cx="50" cy="52" r="23" fill="#fbd38d" />
        {/* Occhi socchiusi da osservatore esperto */}
        <path d="M37 51 L46 51" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
        <path d="M54 51 L63 51" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
        <path d="M38 46 L46 48" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
        <path d="M62 46 L54 48" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
        {/* Naso autorevole */}
        <path d="M49 51 Q50 58 53 56" stroke="#c2410c" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        {/* Bocca critica e pensierosa */}
        <path d="M43 65 L57 64" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
        {/* Elmetto giallo da cantiere */}
        <path d="M25 43 C25 21 75 21 75 43 Z" fill="#eab308" />
        <path d="M20 43 L80 43" stroke="#ca8a04" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M46 22 L54 22 L52 43 L48 43 Z" fill="#facc15" />
      </svg>
    )
  },

  '@claudio_camperista_doc': {
    badgeEmoji: '🚐',
    status: '«In sosta libera a 1.400 metri. W il camper e la libertà! 🚐⛰️»',
    bgGradient: ['#ecfdf5', '#a7f3d0'],
    borderColor: '#34d399',
    renderAvatar: () => (
      <svg viewBox="0 0 100 100" className="boomer-svg-face">
        <defs>
          <radialGradient id="bg-claudio" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f0fdf4" />
            <stop offset="100%" stopColor="#a7f3d0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#bg-claudio)" />
        {/* Giubbotto verde trekking */}
        <path d="M18 96 C22 76 34 72 50 72 C66 72 78 76 82 96 Z" fill="#047857" />
        {/* Collo e testa abbronzata */}
        <rect x="42" y="62" width="16" height="15" rx="4" fill="#ed8936" />
        <circle cx="50" cy="52" r="23" fill="#ed8936" />
        {/* Capelli brizzolati al vento */}
        <path d="M25 46 Q28 26 50 25 Q72 26 75 46" fill="#64748b" />
        {/* Occhiali da sole a goccia stile pilota */}
        <path d="M34 46 Q44 44 46 54 Q38 61 34 54 Z" fill="#0f172a" />
        <path d="M54 54 Q56 44 66 46 Q66 54 62 61 Z" fill="#0f172a" />
        <path d="M46 48 L54 48" stroke="#94a3b8" strokeWidth="2" />
        {/* Riflesso azzurro sugli occhiali */}
        <line x1="37" y1="48" x2="43" y2="56" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <line x1="57" y1="48" x2="63" y2="56" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        {/* Barbetta da avventuriero */}
        <path d="M35 56 C35 73 65 73 65 56" fill="none" stroke="#64748b" strokeWidth="3" strokeDasharray="2,3" />
        {/* Sorrisone aperto */}
        <path d="M42 64 Q50 71 58 64" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      </svg>
    )
  },

  '@marisa_gattara_e_uncinetto': {
    badgeEmoji: '🐱',
    status: '«I miei 4 micetti accuditi e coperta quasi finita 🐱🧶»',
    bgGradient: ['#f3e8ff', '#e9d5ff'],
    borderColor: '#c084fc',
    renderAvatar: () => (
      <svg viewBox="0 0 100 100" className="boomer-svg-face">
        <defs>
          <radialGradient id="bg-marisa" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#faf5ff" />
            <stop offset="100%" stopColor="#e9d5ff" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#bg-marisa)" />
        {/* Chignon grigio/argento con ferri da maglia */}
        <circle cx="50" cy="24" r="14" fill="#cbd5e1" />
        <line x1="28" y1="18" x2="72" y2="30" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="30" y1="30" x2="70" y2="18" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
        {/* Maglione lilla fatto a maglia */}
        <path d="M18 96 C22 76 34 72 50 72 C66 72 78 76 82 96 Z" fill="#8b5cf6" />
        {/* Testa e collo */}
        <rect x="42" y="62" width="16" height="15" rx="4" fill="#fed7aa" />
        <circle cx="50" cy="52" r="23" fill="#fed7aa" />
        {/* Capelli raccolti ai lati */}
        <path d="M26 48 Q28 32 50 32 Q72 32 74 48" fill="#e2e8f0" />
        {/* Occhiali cat-eye viola */}
        <path d="M33 48 L46 51 L44 58 L33 55 Z" fill="none" stroke="#7e22ce" strokeWidth="2.2" />
        <path d="M67 48 L54 51 L56 58 L67 55 Z" fill="none" stroke="#7e22ce" strokeWidth="2.2" />
        <line x1="46" y1="51" x2="54" y2="51" stroke="#7e22ce" strokeWidth="2.2" />
        <circle cx="40" cy="53" r="2" fill="#1f2937" />
        <circle cx="60" cy="53" r="2" fill="#1f2937" />
        {/* Sorriso affettuoso */}
        <path d="M43 64 Q50 69 57 64" stroke="#be123c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Gattino rosso tigrato che sbuca dalla spalla sinistra */}
        <g transform="translate(14, 62) scale(0.65)">
          <circle cx="20" cy="20" r="14" fill="#f97316" />
          <polygon points="10,10 16,3 19,10" fill="#ea580c" />
          <polygon points="21,10 24,3 30,10" fill="#ea580c" />
          <circle cx="16" cy="18" r="2" fill="#1f2937" />
          <circle cx="24" cy="18" r="2" fill="#1f2937" />
          <path d="M20 22 L20 25" stroke="#1f2937" strokeWidth="1.5" />
          <line x1="8" y1="21" x2="2" y2="20" stroke="#1f2937" strokeWidth="1" />
          <line x1="8" y1="23" x2="2" y2="24" stroke="#1f2937" strokeWidth="1" />
        </g>
      </svg>
    )
  },

  '@enzo_interista_doc1960': {
    badgeEmoji: '⚽',
    status: '«Tutti al Bar Sport per il derby! Arbitro venduto! ⚽🍺»',
    bgGradient: ['#dbeafe', '#bfdbfe'],
    borderColor: '#60a5fa',
    renderAvatar: () => (
      <svg viewBox="0 0 100 100" className="boomer-svg-face">
        <defs>
          <radialGradient id="bg-enzo" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#eff6ff" />
            <stop offset="100%" stopColor="#bfdbfe" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#bg-enzo)" />
        {/* Sciarpa nerazzurra a strisce avvolta al collo */}
        <path d="M18 96 C22 76 34 72 50 72 C66 72 78 76 82 96 Z" fill="#1d4ed8" />
        <path d="M28 82 L72 82 M24 90 L76 90" stroke="#0f172a" strokeWidth="5" />
        {/* Collo e testa */}
        <rect x="42" y="60" width="16" height="15" rx="4" fill="#fbd38d" />
        <circle cx="50" cy="50" r="23" fill="#fbd38d" />
        {/* Capelli scuri con ciuffo vintage */}
        <path d="M26 44 Q28 24 50 24 Q72 24 74 44" fill="#334155" />
        {/* Occhi vivaci da tifoso */}
        <circle cx="40" cy="47" r="3" fill="#1f2937" />
        <circle cx="60" cy="47" r="3" fill="#1f2937" />
        {/* Baffoni anni 80 nerissimi */}
        <path d="M35 55 Q50 54 50 56 Q50 54 65 55 Q58 62 50 58 Q42 62 35 55 Z" fill="#1e293b" />
        {/* Bocca spalancata per esultanza allo stadio */}
        <path d="M42 61 Q50 73 58 61 Z" fill="#991b1b" stroke="#1f2937" strokeWidth="1.5" />
        {/* Denti superiori */}
        <rect x="45" y="61" width="10" height="3" rx="1" fill="#ffffff" />
      </svg>
    )
  },

  '@teresa_ricette_e_rosari': {
    badgeEmoji: '🍝',
    status: '«Ho preparato 3 teglie di lasagne, venite a prendere la porzione! 🍝👵»',
    bgGradient: ['#fee2e2', '#fecaca'],
    borderColor: '#f87171',
    renderAvatar: () => (
      <svg viewBox="0 0 100 100" className="boomer-svg-face">
        <defs>
          <radialGradient id="bg-teresa" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fff1f2" />
            <stop offset="100%" stopColor="#fecaca" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#bg-teresa)" />
        {/* Chignon bianco da nonna */}
        <circle cx="50" cy="25" r="13" fill="#f1f5f9" />
        {/* Grembiule da cucina a quadretti rossi */}
        <path d="M18 96 C22 76 34 72 50 72 C66 72 78 76 82 96 Z" fill="#ef4444" />
        <path d="M34 72 L34 96 M66 72 L66 96" stroke="#ffffff" strokeWidth="2" strokeDasharray="3,3" />
        {/* Testa e collo */}
        <rect x="42" y="62" width="16" height="15" rx="4" fill="#fed7aa" />
        <circle cx="50" cy="52" r="23" fill="#fed7aa" />
        {/* Capelli ondulati bianchi */}
        <path d="M26 48 Q28 32 50 32 Q72 32 74 48" fill="#f8fafc" />
        {/* Occhi dolci e sorridenti con rughette d'espressione */}
        <path d="M38 49 Q42 46 46 49" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M54 49 Q58 46 62 49" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Guanciotte rosse tonde */}
        <circle cx="35" cy="57" r="5" fill="#f87171" opacity="0.4" />
        <circle cx="65" cy="57" r="5" fill="#f87171" opacity="0.4" />
        {/* Sorriso materno felice */}
        <path d="M42 63 Q50 71 58 63" stroke="#b91c1c" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        {/* Mestolo di legno col pomodoro in mano */}
        <g transform="translate(68, 62) rotate(15) scale(0.7)">
          <ellipse cx="14" cy="12" rx="7" ry="10" fill="#d97706" />
          <ellipse cx="14" cy="12" rx="4" ry="6" fill="#dc2626" />
          <rect x="12" y="20" width="4" height="24" rx="2" fill="#b45309" />
        </g>
      </svg>
    )
  },

  '@pino_orto_bio_e_motoseghe': {
    badgeEmoji: '🥬',
    status: '«Pomodori dell’orto a km zero e legna spaccata per l’inverno! 🍅🪓»',
    bgGradient: ['#dcfce7', '#bbf7d0'],
    borderColor: '#4ade80',
    renderAvatar: () => (
      <svg viewBox="0 0 100 100" className="boomer-svg-face">
        <defs>
          <radialGradient id="bg-pino" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f0fdf4" />
            <stop offset="100%" stopColor="#bbf7d0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#bg-pino)" />
        {/* Salopette verde da contadino */}
        <path d="M18 96 C22 76 34 72 50 72 C66 72 78 76 82 96 Z" fill="#15803d" />
        <rect x="36" y="80" width="28" height="16" fill="#166534" rx="2" />
        {/* Testa abbronzata da sole nei campi */}
        <rect x="42" y="62" width="16" height="15" rx="4" fill="#ea580c" opacity="0.8" />
        <circle cx="50" cy="52" r="23" fill="#ea580c" opacity="0.85" />
        {/* Occhi vispi */}
        <circle cx="41" cy="49" r="2.5" fill="#1f2937" />
        <circle cx="59" cy="49" r="2.5" fill="#1f2937" />
        {/* Sorriso bonario con spiga/filo d'erba in bocca */}
        <path d="M43 62 Q50 67 57 62" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M55 63 Q70 60 78 50" stroke="#84cc16" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Cappellone di paglia contadino */}
        <ellipse cx="50" cy="38" rx="34" ry="9" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
        <path d="M32 38 C32 23 68 23 68 38 Z" fill="#eab308" />
        <rect x="32" y="35" width="36" height="3" fill="#b45309" />
      </svg>
    )
  },

  '@giorgio_fai_da_te_brico': {
    badgeEmoji: '🔨',
    status: '«Se non si ripara con due viti e un po’ di nastro, non serve! 🔨🔧»',
    bgGradient: ['#f1f5f9', '#cbd5e1'],
    borderColor: '#94a3b8',
    renderAvatar: () => (
      <svg viewBox="0 0 100 100" className="boomer-svg-face">
        <defs>
          <radialGradient id="bg-giorgio" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#bg-giorgio)" />
        {/* Tuta blu da lavoro */}
        <path d="M18 96 C22 76 34 72 50 72 C66 72 78 76 82 96 Z" fill="#1e3a8a" />
        {/* Collo e testa */}
        <rect x="42" y="62" width="16" height="15" rx="4" fill="#fbd38d" />
        <circle cx="50" cy="52" r="23" fill="#fbd38d" />
        {/* Matita da falegname rossa infilata dietro l'orecchio! */}
        <line x1="63" y1="46" x2="80" y2="33" stroke="#dc2626" strokeWidth="4.5" strokeLinecap="round" />
        {/* Cappellino con visiera all'indietro */}
        <path d="M26 44 C26 25 74 25 74 44 Z" fill="#0284c7" />
        <path d="M42 25 Q50 20 58 25" stroke="#0369a1" strokeWidth="4" fill="none" />
        {/* Occhio sinistro aperto, destro che fa l'occhiolino ammiccante */}
        <circle cx="41" cy="51" r="3" fill="#1f2937" />
        <path d="M55 52 Q60 48 65 52" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Sorrisetto furbetto e soddisfatto */}
        <path d="M42 63 Q52 68 62 61" stroke="#1f2937" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      </svg>
    )
  },

  '@annarosa_cuore_di_mamma58': {
    badgeEmoji: '💖',
    status: '«Copritevi bene che rinfresca! Vi voglio bene ragazzi ❤️🌸»',
    bgGradient: ['#ffe4e6', '#fecdd3'],
    borderColor: '#fb7185',
    renderAvatar: () => (
      <svg viewBox="0 0 100 100" className="boomer-svg-face">
        <defs>
          <radialGradient id="bg-annarosa" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fff1f2" />
            <stop offset="100%" stopColor="#fecdd3" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#bg-annarosa)" />
        {/* Capelli vaporosi castano-chiari */}
        <circle cx="34" cy="40" r="14" fill="#a16207" />
        <circle cx="66" cy="40" r="14" fill="#a16207" />
        <circle cx="50" cy="32" r="16" fill="#a16207" />
        {/* Camicetta floreale rosa */}
        <path d="M18 96 C22 76 34 72 50 72 C66 72 78 76 82 96 Z" fill="#f43f5e" />
        {/* Collana di perle eleganti */}
        <circle cx="38" cy="74" r="2.5" fill="#ffffff" />
        <circle cx="44" cy="76" r="2.5" fill="#ffffff" />
        <circle cx="50" cy="77" r="2.5" fill="#ffffff" />
        <circle cx="56" cy="76" r="2.5" fill="#ffffff" />
        <circle cx="62" cy="74" r="2.5" fill="#ffffff" />
        {/* Testa e collo */}
        <rect x="42" y="62" width="16" height="15" rx="4" fill="#fed7aa" />
        <circle cx="50" cy="52" r="22" fill="#fed7aa" />
        {/* Occhi dolcissimi */}
        <path d="M38 49 Q42 45 46 49" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M54 49 Q58 45 62 49" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Guance piene d'affetto */}
        <circle cx="34" cy="56" r="5" fill="#fb7185" opacity="0.45" />
        <circle cx="66" cy="56" r="5" fill="#fb7185" opacity="0.45" />
        {/* Sorriso affettuoso */}
        <path d="M42 63 Q50 70 58 63" stroke="#be123c" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        {/* Due cuoricini fluttuanti */}
        <path d="M72 26 C70 23 66 23 66 27 C66 31 72 35 72 35 C72 35 78 31 78 27 C78 23 74 23 72 26 Z" fill="#f43f5e" />
      </svg>
    )
  }
};

// Fallback per eventuali video aggiunti al volo
const DYNAMIC_FALLBACKS = [
  {
    badgeEmoji: '🎉',
    status: '«Viva gli sposi e 100 di questi giorni! 🥂✨»',
    bgGradient: ['#fef3c7', '#fde68a'],
    borderColor: '#f59e0b'
  },
  {
    badgeEmoji: '❤️',
    status: '«Tantissimi auguri di vero cuore! ❤️🥂»',
    bgGradient: ['#ffe4e6', '#fecdd3'],
    borderColor: '#f43f5e'
  },
  {
    badgeEmoji: '🍰',
    status: '«Ci vediamo al taglio della torta! 🍰🎉»',
    bgGradient: ['#e0f2fe', '#bae6fd'],
    borderColor: '#38bdf8'
  }
];

export default function BoomerAvatar({ author, badge, index = 0, size = 48 }) {
  const profile = BOOMER_PROFILES[author] || {
    ...DYNAMIC_FALLBACKS[index % DYNAMIC_FALLBACKS.length],
    renderAvatar: () => (
      <svg viewBox="0 0 100 100" className="boomer-svg-face">
        <circle cx="50" cy="50" r="48" fill="#fef3c7" />
        <circle cx="50" cy="52" r="24" fill="#fed7aa" />
        <circle cx="41" cy="49" r="3" fill="#1f2937" />
        <circle cx="59" cy="49" r="3" fill="#1f2937" />
        <path d="M42 62 Q50 70 58 62" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Cappellino da festa */}
        <polygon points="50,14 40,36 60,36" fill="#f43f5e" />
        <circle cx="50" cy="12" r="3" fill="#facc15" />
      </svg>
    )
  };

  const RenderAvatar = profile.renderAvatar;

  return (
    <div 
      className="boomer-avatar-wrapper"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <div 
        className="boomer-avatar-circle"
        style={{ 
          borderColor: profile.borderColor,
          background: `linear-gradient(135deg, ${profile.bgGradient[0]}, ${profile.bgGradient[1]})`
        }}
      >
        <RenderAvatar />
      </div>

      {/* Mini badge galleggiante con sticker del passatempo */}
      <span 
        className="boomer-avatar-badge"
        aria-hidden="true"
      >
        {profile.badgeEmoji}
      </span>

      {/* Tooltip WhatsApp del Boomer al passaggio del mouse */}
      <div className="boomer-status-tooltip" role="tooltip">
        <div className="tooltip-author-name">{author}</div>
        <div className="tooltip-status-quote">{profile.status}</div>
      </div>
    </div>
  );
}
