// Dati e contenuti del KaBlog - 25 Anni di Matrimonio
// Personalizzato per Antonio & Katia - Nozze d'Argento (26 Settembre 2001 - 2026)

export const coupleData = {
  groomName: "Antonio",
  brideName: "Katia",
  weddingDate: "2001-09-26",
  yearsMarried: 25,
  subtitle: "25 anni di bilanci fiscali, equazioni di secondo grado, trapani proibiti e la spesa titanica del sabato!",
  heroTagline: "Il bilancio è in attivo, il teorema dell'amore è dimostrato (e nessun omicidio in 25 anni!)",
  introStory: `Correva il 26 settembre 2001 quando Antonio e Katia hanno detto «Sì, lo voglio». Non sapevano ancora che quel «Sì» avrebbe incluso: 25 anni di F24 e clienti che chiamano pure la domenica, migliaia di lezioni pomeridiane di matematica con la lavagna sempre piena, una guerra fredda dichiarata contro ogni tentativo di bricolage di Antonio, due figli (Simone e Andrea) campioni mondiali di mimetismo sul divano quando c'è da pulire casa, e l'epica maratona della spesa del sabato al supermercato. Eppure, dopo un quarto di secolo, il risultato torna al centesimo: lo rifarebbero altre mille volte!`,
  heroCoverImage: "/photos/PolaroidUP.JPG",
};

export const survivalStats = [
  {
    id: "fisco",
    value: "94.800+",
    label: "Fatture & Dichiarazioni dei Redditi",
    detail: "Antonio lavora h24; il commercialista non va in pensione nemmeno nei sogni!",
    icon: "Award",
  },
  {

    id: "matematica",
    value: "15.000+",
    label: "Ore di Lezioni di Matematica di Katia",
    detail: "Risolvendo equazioni complesse per tutti i ragazzi della città ogni pomeriggio.",
    icon: "Coffee",
  },
  {
    id: "pisolini",
    value: "8.000+",
    label: "Ore di Pisolini sul Divano",
    detail: "«Non stavo mica dormendo: stavo solo riposando gli occhi cinque minuti ascoltando la TV!»",
    icon: "Moon",
  },
  {
    id: "divano",
    value: "99.9%",
    label: "Aiuto in casa da Simone & Andrea",
    detail: "«Mamma stavo giusto per passare l'aspirapolvere, dammi solo altri 40 minuti!»",
    icon: "Heart",
  },
  {
    id: "spesa",
    value: "1.300+",
    label: "Spese del Sabato al Supermercato",
    detail: "L'unico spiraglio di tempo libero: 4 carrelli stracolmi per sfamare la tribù.",
    icon: "Luggage",
  },
  {
    id: "pause",
    value: "Sab & Dom (Forse!)",
    label: "Pause e Ferie di Antonio",
    detail: "«Chiudo solo l'ultimo bilancio su Excel e arrivo subito a tavola...»",
    icon: "Utensils",
  }
];

export const thematicSections = [
  {
    id: "giovinezza",
    title: "1. La Giovinezza: Il Gruppo di Amici, la Spensieratezza e l'Inizio di Tutto",
    shortTitle: "1. La Giovinezza",
    subtitle: "«Nel cuore della storica comitiva, tra scampagnate e risate: quando è nata la scintilla tra Antonio e Katia!»",
    badge: "🌱 Il Gruppo & la Giovinezza",
    description: "Il primo capitolo della nostra storia: gli anni indimenticabili delle uscite con la comitiva di amici di allora, le giornate in campagna, le risate spensierate e la scintilla speciale che ha acceso un legame lungo oltre un quarto di secolo.",
    methodImage: {
      url: "/photos/Giovani.jpg",
      fallbackUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
      caption: "I Giovani e la loro spensieratezza durante una giornata in campagna",
      alt: "1. La Giovinezza - Antonio e Katia con il gruppo di amici"
    },
    paragraphs: [
      "Tutto è iniziato nella **storica comitiva di amici degli anni '90**: ritrovi in piazza, risate spensierate e memorabili **giornate in campagna**. Prima dei bilanci fiscali di Antonio e delle lezioni di Katia, c'era solo un gruppo unito e pieno di vita.",
      "Tra una scampagnata e una battuta in compagnia, è scoccata la **scintilla tra Antonio e Katia**: sguardi complici, passeggiate a due a fine serata e una **rara sintonia** sbocciata sotto gli occhi affettuosi degli amici di sempre.",
      "Rivedere quelle foto a **25 anni di distanza** ricorda le radici genuine del loro amore: un legame nato con naturalezza, custodito con la stessa **allegria e complicità del primo giorno**."
    ],
    photos: [
      {
        id: "gio1",
        url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
        title: "Il Primo Incontro e la Scintilla degli Inizi",
        text: "Era una serata come tante in compagnia degli amici, ma è bastato un incrocio di sguardi per cambiare per sempre la traiettoria delle loro vite. Antonio rimase folgorato dal sorriso e dalla vivacità di Katia, mentre lei fu subito incuriosita da quel ragazzo garbato, un po' riservato ma dalla battuta sempre pronta. Fu la classica scintilla che non fa rumore ma che accende un fuoco destinato a scaldare un quarto di secolo.",
        caption: "Quello sguardo che valeva più di mille parole: galeotta fu la serata in cui i nostri mondi si sono incrociati!",
        badge: "Primi Sguardi",
        year: "1998",
        likes: 95,
      },
      {
        id: "gio2",
        url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
        title: "I Primi Viaggi in Due e le Avventure Spensierate",
        text: "Senza navigatori satellitari né smartphone a portata di mano, i primi viaggi insieme erano autentiche spedizioni esplorative. Bastavano una cartina stradale spiegazzata nel cruscotto, il finestrino aperto al vento estivo e una cassetta musicale mandata a nastro continuo. Ogni deviazione imprevista diventava l'occasione per scoprire un borgo sconosciuto, imparando a fidarsi l'uno dell'altra chilometro dopo chilometro.",
        caption: "Niente GPS né programmi rigidi: si partiva all'avventura con tanta voglia di ridere e di scoprire il mondo insieme!",
        badge: "Spensieratezza",
        year: "1999",
        likes: 112,
      },
      {
        id: "gio3",
        url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80",
        title: "Le Risate e le Serate con la Storica Comitiva",
        text: "La giovinezza di Antonio e Katia è stata indissolubilmente legata alla loro cerchia di amici più cari. Dalle interminabili serate al pub alle cene improvvisate a base di pizza, il gruppo fu il primo testimone e complice della nascita del loro amore. Tra prese in giro affettuose e previsioni sul loro futuro insieme, la comitiva rappresentava la cornice perfetta di quegli anni irripetibili.",
        caption: "Prima che arrivassero i modelli unici e le equazioni complesse: le risate vere con chi ci ha visto nascere come coppia!",
        badge: "Comitiva Storica",
        year: "2000",
        likes: 128,
      },
      {
        id: "gio4",
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        title: "La Consapevolezza di un Amore Destinato a Durare",
        text: "Con il passare dei mesi e delle stagioni, quello che era iniziato come un fresco innamoramento giovanile si è trasformato in una certezza profonda e incrollabile. Parlare del domani non faceva più paura: c'era il desiderio maturo di camminare fianco a fianco, di condividere sogni e progetti concreti, e di prepararsi al grande passo che avrebbe unito per sempre le loro esistenze.",
        caption: "Capire che quello che sembrava un semplice colpo di fulmine era in realtà l'inizio della nostra favola più bella.",
        badge: "La Promessa",
        year: "2001",
        likes: 150,
      }
    ]
  },
  {
    id: "matrimonio",
    title: "2. Il Matrimonio: Quel Fatidico 26 Settembre 2001",
    shortTitle: "2. Il Matrimonio",
    subtitle: "«Antonio in abito elegante senza cartellette sotto braccio, Katia radiosa: la firma del contratto a vita!»",
    badge: "💍 Il Grande Giorno (26-09-2001)",
    description: "Il giorno in cui tutto è diventato ufficiale. Quel 26 settembre 2001 davanti a parenti e amici, Antonio e Katia hanno pronunciato il fatidico «Sì, lo voglio», dando il via a 25 anni di complicità incrollabile (e zero omicidi commessi!).",
    methodImage: {
      url: "/photos/Matrimonio.jpg",
      fallbackUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      caption: "26 Settembre 2001: il giorno del sì, l'inizio ufficiale di una splendida avventura a due!",
      alt: "2. Il Matrimonio - Antonio e Katia"
    },
    paragraphs: [
      "La mattina del **26 settembre 2001** Antonio e Katia hanno suggellato la promessa di una vita. **Antonio emozionatissimo** (rigorosamente senza cartellette d'ufficio al seguito) e **Katia radiosa in abito bianco** hanno pronunciato il fatidico **«Sì, lo voglio»** davanti a parenti e amici.",
      "Dallo **scambio delle fedi** alla festa scatenata tra canti, risate e **brindisi fino a notte fonda**, è iniziato un cammino fondato su lealtà, rispetto e reciproco sostegno quotidiano.",
      "Oggi, festeggiare **25 anni di matrimonio** e **zero omicidi commessi** è la prova vivente che l'amore vero, condito da una buona dose di ironia, sa superare brillantemente la prova del tempo."
    ],
    photos: [
      {
        id: "mat1",
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        title: "L'Ingresso in Chiesa e l'Incontro all'Altare",
        text: "Il momento più toccante della giornata: le porte della chiesa che si aprono, gli sguardi di tutti gli invitati puntati sulla sposa e il respiro che si ferma. Katia, bellissima e con gli occhi colmi di gioia, avanza verso Antonio. Lo sposo, che solitamente domina con fermezza numeri e bilanci, in quell'istante si è lasciato andare a un'emozione pura, accogliendo la sua sposa con una tenerezza infinita.",
        caption: "Katia meravigliosa che avanza verso l'altare; Antonio che trattiene a stento le lacrime di pura commozione.",
        badge: "Il Grande Sì",
        year: "2001",
        likes: 185,
      },
      {
        id: "mat2",
        url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
        title: "Lo Scambio delle Fedi e il Patto Solenne",
        text: "Due anelli dorati scivolati al dito per simboleggiare un patto eterno. Le promesse pronunciate davanti ai testimoni andavano ben oltre le formule di rito: significavano promettersi di ascoltarsi sempre, di non andare mai a dormire arrabbiati, di dividersi fatiche e soddisfazioni e di affrontare il futuro come una squadra affiatata e imbattibile.",
        caption: "Il patto solenne: amarsi e sostenersi a vicenda nella gioia, nei momenti complessi e in ogni scadenza della vita.",
        badge: "Fedi d'Argento",
        year: "2001",
        likes: 192,
      },
      {
        id: "mat3",
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        title: "Il Taglio della Torta e i Calici Alzati",
        text: "Al banchetto nuziale, tra le prelibatezze della cucina e i cori festosi degli amici, il momento del taglio della torta fu salutato da una pioggia di applausi e calici levati in alto. Gli sposi, abbracciati e con il sorriso splendente, hanno condiviso la prima fetta con la promessa non scritta di riservarsi sempre a vicenda il boccone più dolce della vita quotidiana.",
        caption: "Il primo brindisi da marito e moglie: promettendosi di ridere insieme ogni singolo giorno per i prossimi 25 anni!",
        badge: "Torta Nuziale",
        year: "2001",
        likes: 210,
      },
      {
        id: "mat4",
        url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
        title: "Festa, Balli e l'Abbraccio di Tutti i Cari",
        text: "La giornata si è conclusa con una festa travolgente: canti, scherzi organizzati dagli amici storici e balli lenti e scatenati che hanno fatto vibrare la pista. Circondati dall'affetto sincero di chi voleva loro bene, Antonio e Katia hanno inaugurato il loro cammino coniugale con tutta la gioia e la gratitudine possibili nel cuore.",
        caption: "Circondati dall'affetto di tutti gli invitati: l'inizio trionfale della favola che oggi festeggia le sue Nozze d'Argento!",
        badge: "Viva gli Sposi!",
        year: "2001",
        likes: 240,
      }
    ]
  },
  {
    id: "famiglia",
    title: "3. La Famiglia: La Nostra Casa, l'Amore e i Nostri Ragazzi",
    shortTitle: "3. La Famiglia",
    subtitle: "«Katia pulisce e riordina con precisione chirurgica; Simone e Andrea offrono prezioso supporto morale dal divano!»",
    badge: "🏠 Focolare & I Nostri Ragazzi",
    description: "Costruire una famiglia significa condividere tutto: la crescita dei figli Simone e Andrea, le maratone quotidiane per far quadrare compiti e orari, l'eterna lotta al disordine casalingo e quel calore unico che si respira ogni sera rientrando a casa.",
    methodImage: {
      url: "/photos/Famiglia.jpeg",
      fallbackUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      caption: "La famiglia: l'amore più grande e il capolavoro più prezioso di questi 25 anni!",
      alt: "3. La Famiglia - Simone, Andrea, Katia e Antonio"
    },
    paragraphs: [
      "Con la nascita dei figli, **Simone e Andrea**, la casa si è riempita di giochi, compiti e risate. Crescere insieme i ragazzi è stata l'avventura più travolgente e gratificante per Antonio e Katia.",
      "Negli anni la routine familiare è diventata un capolavoro comico: **mamma Katia** che coordina casa con **precisione chirurgica**, **papà Antonio** instancabile lavoratore e Simone e Andrea campioni del **supporto morale dal divano**.",
      "Oggi che **i ragazzi sono ormai adulti**, guardare il loro cammino è l'orgoglio più grande: la famiglia è il vero **capolavoro di questi 25 anni** e il porto sicuro in cui ritrovarsi ogni sera."
    ],
    photos: [
      {
        id: "fam1",
        url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
        title: "I Primi Passi di Simone e Andrea",
        text: "L'arrivo dei figli ha portato una ventata di meraviglia assoluta. Vederli muovere i primi passi incerti sul tappeto del salotto, ascoltare le prime parole balbettate e assistere alla loro curiosità nel toccare ogni oggetto di casa ha regalato ai genitori emozioni indescrivibili, facendoli sentire più uniti e complici che mai.",
        caption: "Quando erano piccoli e l'unico disordine sul tappeto erano i giocattoli colorati (e non ancora le felpe ovunque!).",
        badge: "Primi Passi",
        year: "2006",
        likes: 130,
      },
      {
        id: "fam2",
        url: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80",
        title: "L'Arte della Convivenza e il Divano dei Ragazzi",
        text: "Con la crescita dei ragazzi e gli anni dell'adolescenza, il divano di casa è stato elevato a quartier generale permanente. Un piccolo grande teatro comico in cui mamma Katia passa con energia l'aspirapolvere e i ragazzi, con riflessi da atleti olimpici, sollevano contemporaneamente le gambe senza staccare gli occhi dallo smartphone o dalla televisione!",
        caption: "Katia che pulisce con precisione chirurgica; Simone e Andrea che offrono prezioso e fondamentale supporto morale dal divano!",
        badge: "Supporto dal Divano",
        year: "2014",
        likes: 165,
      },
      {
        id: "fam3",
        url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
        title: "Il Rito della Tavola e le Cene Insieme",
        text: "La cena serale è sempre stata il cuore pulsante della casa: il momento in cui ci si siede tutti attorno allo stesso tavolo per raccontarsi com'è andata la giornata. Tra gli aneddoti d'ufficio raccontati da papà Antonio, le riflessioni scolastiche di mamma Katia e i progetti dei ragazzi, la cucina si trasforma ogni sera in uno spazio di calore, confronto e complicità sincera.",
        caption: "Tra una battuta di papà, un consiglio attento di mamma e le risate che riempiono la stanza: il valore di essere famiglia.",
        badge: "A Tavola Insieme",
        year: "2020",
        likes: 178,
      },
      {
        id: "fam4",
        url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
        title: "L'Orgoglio Più Grande: Vedervi Crescere",
        text: "Guardare oggi Simone e Andrea, ormai uomini, rappresenta per Antonio e Katia la soddisfazione più grande di questi primi 25 anni insieme. Sapere di aver trasmesso loro valori solidi, rispetto, onestà e il gusto per le cose buone della vita è il regalo più bello che due genitori potessero desiderare per le proprie Nozze d'Argento.",
        caption: "Simone e Andrea sono il nostro orgoglio più grande: il vero capolavoro di questi 25 anni d'amore e di vita insieme!",
        badge: "Orgoglio di Famiglia",
        year: "2026",
        likes: 260,
      }
    ]
  },
  {
    id: "viaggi",
    title: "4. I Viaggi: Alla Scoperta del Mondo Insieme",
    shortTitle: "4. I Viaggi",
    subtitle: "«Antonio chiude le valigie con precisione millimetrica; Katia ama la montagna per stendere la sua copertina sull'erba e riposare!»",
    badge: "✈️ Esplorando il Mondo Insieme",
    description: "Viaggiare insieme è il modo migliore per staccare la spina dalla routine quotidiana. Dalle vette alpine alle città d'arte, dalle gite di pochi giorni alle grandi avventure: ogni viaggio ha aggiunto una pagina indimenticabile al nostro album dei ricordi.",
    methodImage: {
      url: "/photos/Viaggi.jpeg",
      fallbackUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
      caption: "In viaggio per il mondo: esplorando insieme orizzonti lontani e collezionando ricordi indimenticabili.",
      alt: "4. I Viaggi - Alla scoperta del mondo insieme"
    },
    paragraphs: [
      "Per Antonio e Katia **viaggiare insieme** è sempre stato l'antidoto ideale alla routine: l'occasione per staccare dal lavoro e **scoprire il mondo mano nella mano** con curiosità ed entusiasmo.",
      "I preparativi sono un siparietto fisso: **Antonio è il maestro assoluto delle valigie**, che chiude con **precisione ingegneristica al millimetro** incastrando tutto alla perfezione. Dal canto suo, **Katia ama profondamente la montagna**: l'aria fresca, il silenzio dei boschi e soprattutto quel momento sacro in cui può **stendere la sua amata copertina sull'erba per riposare** in totale quiete.",
      "Dalle vette alpine alle **città d'arte e ai mari lontani**, ogni meta ha regalato ricordi indelebili, confermando che la vera bellezza del viaggio è avere accanto **la persona giusta con cui condividere la strada** (e la copertina!)."
    ],
    photos: [
      {
        id: "via1",
        url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        title: "La Luna di Miele e la Prima Avventura Oltreoceano",
        text: "Il viaggio di nozze è stato il battesimo del fuoco come viaggiatori in tandem: paesaggi sconfinati, tramonti mozzafiato su mari turchesi e la straordinaria sensazione di libertà di trovarsi dall'altra parte del mondo mano nella mano. Un viaggio fondativo che ha acceso per sempre la passione per la scoperta di nuovi orizzonti.",
        caption: "La prima grande avventura oltreoceano: paesaggi da favola e la meraviglia di godersi ogni momento come marito e moglie.",
        badge: "Luna di Miele",
        year: "2001",
        likes: 145,
      },
      {
        id: "via2",
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        title: "La Montagna di Katia: La Copertina sull'Erba e la Quiete",
        text: "Tra tutte le mete, la montagna occupa un posto speciale nel cuore di Katia: niente fretta, la brezza tra i pini e, immancabile nello zaino, la sua fedele copertina da stendere sul prato. Mentre Antonio si gode il panorama dopo aver organizzato e caricato i bagagli con la consueta precisione, Katia si stende sull'erba per un sonnellino rigenerante a contatto con la natura.",
        caption: "Katia e la sua celebre copertina stesa sull'erba d'alta quota: la definizione perfetta di pace, natura e meritato riposo!",
        badge: "Montagna & Copertina",
        year: "2012",
        likes: 185,
      },
      {
        id: "via3",
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
        title: "Le Capitali Europee a Passo di Marcia",
        text: "I viaggi nelle capitali europee hanno consacrato Katia come guida turistica ufficiale della famiglia: sveglia puntuale, scarpe comode e maratone a piedi per esplorare quartieri storici, pinacoteche e castelli. Antonio la segue instancabile (anche se con una segreta preferenza per le tappe di ristoro nei caffè tradizionali!), godendosi ogni scorcio con ammirazione.",
        caption: "Katia con la mappa che pianifica 25 km a piedi per non perdersi nessun museo; Antonio che individua la caffetteria più vicina!",
        badge: "Turisti Instancabili",
        year: "2018",
        likes: 172,
      },
      {
        id: "via4",
        url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
        title: "Verso Nuove Mete: Il Viaggio Più Bello Continua",
        text: "A 25 anni di distanza dal primo viaggio insieme, la voglia di fare i bagagli e scoprire nuovi luoghi è più viva che mai. Con passaporti rinnovati e tanta curiosità nel cuore, Antonio e Katia sono pronti a scegliere la prossima destinazione da esplorare, consapevoli che il viaggio più bello è la vita che continuano a costruire insieme ogni giorno.",
        caption: "25 anni di valigie chiuse a regola d'arte da Antonio e copertine stese da Katia: pronti a partire verso il prossimo meraviglioso orizzonte!",
        badge: "Sempre in Partenza",
        year: "2026",
        likes: 215,
      }
    ]
  },
  {
    id: "amici",
    title: "5. Gli Amici: Una Vita di Feste, Risate e Condivisione",
    shortTitle: "5. Gli Amici",
    subtitle: "«Perché un quarto di secolo insieme è ancora più bello se festeggiato con le persone che ci vogliono bene!»",
    badge: "🥂 Amici di Sempre & Allegria",
    description: "Gli amici sono la famiglia che ci si sceglie: compagni di cene memorabili, testimoni delle tappe più importanti, complici di scherzi e brindisi infiniti. Questo capitolo è dedicato a tutte le persone speciali che hanno camminato al nostro fianco in questi 25 anni.",
    methodImage: {
      url: "/photos/Amici.jpg",
      fallbackUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
      caption: "Con gli amici di sempre: tavolate piene e risate sincere che scaldano il cuore!",
      alt: "5. Gli Amici - Serate e momenti indimenticabili"
    },
    paragraphs: [
      "Gli **amici sono la famiglia che ci si sceglie**: in 25 anni di matrimonio, la casa di Antonio e Katia è sempre stata un porto caloroso, animato da **tavolate infinite** e risate sincere.",
      "Dagli **amici storici della comitiva** a quelli incontrati lungo il cammino, ogni momento condiviso — tra pizze fumanti, un buon calice di vino e le vacanze insieme — ha arricchito questo splendido percorso.",
      "Festeggiare le **Nozze d'Argento** è l'occasione perfetta per dire un **grazie di cuore a tutti voi**: per esserci stati in ogni tappa, con lo stesso affetto e la stessa contagiosa allegria di sempre!"
    ],
    photos: [
      {
        id: "ami1",
        url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        title: "Le Storiche Tavolate del Sabato Sera",
        text: "La tavola del sabato sera è da sempre il teatro prediletto della convivialità: pizze fumanti, piatti della tradizione, antipasti ricchi e bottiglie stappate con allegria. La tavola sembra allungarsi per magia per fare posto a tutti, e le chiacchiere scorrono fluide fino a tarda notte senza che nessuno guardi mai l'orologio.",
        caption: "Tavolate infinite, profumo di pizza e grigliata, chiacchiere che continuavano fino a notte fonda senza accorgersi del tempo.",
        badge: "Tavolata Infinita",
        year: "2005",
        likes: 125,
      },
      {
        id: "ami2",
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        title: "Le Feste, i Compleanni e le Notti Indimenticabili",
        text: "Le ricorrenze importanti sono sempre state celebrate con spirito festoso e genuino: compleanni, capodanni memorabili e feste a sorpresa organizzate con cura e complicità. Ricordi preziosi di serate animate da buona musica, brindisi affettuosi e una gioia condivisa che riscalda il cuore anche a distanza di anni.",
        caption: "Quando bastano un brindisi sincero, buona musica e la giusta compagnia per trasformare una serata ordinaria in pura magia!",
        badge: "Momenti di Festa",
        year: "2015",
        likes: 148,
      },
      {
        id: "ami3",
        url: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80",
        title: "L'Amicizia Sincera che Non Teme gli Anni",
        text: "Il valore più bello delle amicizie vere è che non hanno bisogno di grandi formalità: ci si può non sentire per qualche settimana presa dalla frenesia del lavoro, ma quando ci si ritrova è come se il tempo non fosse mai trascorso. Uno sguardo complice, una battuta spontanea e il filo del discorso riprende con naturalezza, dimostrando che l'affetto autentico resiste a qualsiasi distanza.",
        caption: "Gli amici che ci conoscono da sempre: quelli con cui basta uno sguardo per capirsi al volo e ridere delle stesse cose di vent'anni fa!",
        badge: "Memorie Condivise",
        year: "2022",
        likes: 180,
      },
      {
        id: "ami4",
        url: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
        title: "Il Brindisi d'Argento: Un Grazie dal Cuore a Tutti Voi",
        text: "Tagliare il traguardo delle Nozze d'Argento circondati da amici così meravigliosi è il regalo più prezioso che Antonio e Katia potessero ricevere. Questo brindisi è dedicato a ciascuno di voi: grazie per esserci stati, per aver arricchito questi 25 anni con la vostra presenza e per continuare a camminare insieme verso i prossimi splendidi capitoli della nostra storia!",
        caption: "Alziamo tutti i calici in alto: grazie di cuore a ciascuno di voi per aver reso questi 25 anni ancora più ricchi di gioia e affetto! 🥂",
        badge: "Brindisi d'Argento 🥂",
        year: "2026",
        likes: 295,
      }
    ]
  }
];

export const coupleQuiz = [
  {
    id: 1,
    quote: "«Chiudi quel computer, sono le 21:30 ed è pronto a tavola da mezz'ora!»",
    options: ["Katia", "Antonio", "Il cliente che deve pagare l'F24"],
    correct: "Katia",
    funnyComment: "Esatto! La classica esclamazione serale di Katia mentre Antonio cerca di inviare l'ultimo bilancio telematico!"
  },
  {
    id: 2,
    quote: "«Ho solo comprato una punta nuova per il trapano, serviva per una riparazione urgente...»",
    options: ["Antonio", "Katia", "Simone & Andrea"],
    correct: "Antonio",
    funnyComment: "Proprio Antonio! E infatti Katia ha risposto mettendo il lucchetto alla cassetta degli attrezzi!"
  },
  {
    id: 3,
    quote: "«Se calcolo il tempo che impiego a pulire e lo divido per due figli, il risultato fa sempre disastro!»",
    options: ["Katia", "Antonio", "Il prof di ripetizioni"],
    correct: "Katia",
    funnyComment: "La matematica applicata alle faccende domestiche: il teorema infallibile di Katia contro il disordine dei ragazzi!"
  },
  {
    id: 4,
    quote: "«Mamma, giuro che la camera la riordino domani mattina dopo colazione!»",
    options: ["Simone e Andrea in coro", "Antonio", "Nessuno dei due ci ha mai creduto"],
    correct: "Simone e Andrea in coro",
    funnyComment: "La leggendaria promessa dei figli: tramandata dal 2008 e ancora in attesa di essere collaudata!"
  },
  {
    id: 5,
    quote: "«Sabato mattina sveglia presto: dobbiamo fare la spesa al supermercato prima che si riempia!»",
    options: ["Katia", "Antonio", "Il cassiere del supermercato"],
    correct: "Katia",
    funnyComment: "Sacrosanto! Il piano strategico di Katia per completare la spesa settimanale in tempo record!"
  }
];

export const funnyToasts = [
  "«25 anni di matrimonio: la dimostrazione vivente che Antonio ha trovato la migliore detrazione fiscale della sua vita e Katia la frazione complementare perfetta!» ❤️",
  "«Un brindisi ad Antonio e Katia: 25 anni insieme! Il bilancio è in perfetto attivo, le tasse sull'amore sono deducibili al 100% e il teorema della felicità è ufficialmente dimostrato!» 🥂",
  "«A Katia per la pazienza infinita nel sopportare le scadenze fiscali e i tentativi di bricolage di Antonio... e ad Antonio per aver capito che contro una professoressa di matematica non si vince mai una discussione!» 😂",
  "«Un brindisi speciale da parte di Simone e Andrea: 'Auguri mamma e papà! Per festeggiare i vostri 25 anni promettiamo solennemente di... mettere i piatti nel lavandino almeno una volta questo mese!'» 🎉",
];

export const initialGuestbook = [
  {
    id: 1,
    author: "Simone & Andrea",
    relation: "I vostri adorati figli (dal divano)",
    message: "Auguri mamma e papà per questi 25 anni! Mamma ti giuriamo che stasera sparecchiamo noi... oppure convinciamo papà a farci una fattura forfettaria! Vi vogliamo un bene infinito! ❤️",
    tag: "🛋️ Promettiamo di Aiutare",
    date: "Oggi alla festa"
  },
  {
    id: 2,
    author: "I Clienti dello Studio",
    relation: "I contribuenti disperati",
    message: "Dottor Antonio, congratulazioni per le Nozze d'Argento! Ci promette che per oggi non risponderà alle nostre mail sulle scadenze F24? Un grandissimo abbraccio alla mitica Katia per la santa pazienza!",
    tag: "💼 Fisco & Pazienza",
    date: "Oggi alla festa"
  },
  {
    id: 3,
    author: "Gli Studenti di Matematica",
    relation: "I fan delle equazioni",
    message: "Cara Prof Katia, abbiamo calcolato che 25 anni corrispondono a 9.131 giorni di amore esponenziale! Complimenti a lei e ad Antonio (e non gli faccia fare troppi problemi di geometria stasera)!",
    tag: "📐 Teorema Dimostrato",
    date: "Oggi alla festa"
  },
  {
    id: 4,
    author: "Il Personale del Supermercato",
    relation: "I fornitori del Sabato",
    message: "Tanti auguri alla nostra coppia preferita del sabato mattina! Per i vostri 25 anni di matrimonio vi teniamo da parte due carrelli omaggio e la corsia riservata!",
    tag: "🛒 Spesa del Sabato",
    date: "Oggi alla festa"
  }
];
