import React, { useState } from 'react';
import { Play, Heart, Lightbulb, AlertTriangle, BookOpen, Film } from 'lucide-react';

const sectionTipsAndWarnings = {
  commercialista: {
    tip: "Se Antonio dice che 'chiude solo una partita doppia e arriva a tavola', hai tutto il tempo di cucinare un arrosto di 3 ore.",
    warning: "Non nominare mai cartelle esattoriali o scadenze F24 durante la cena di anniversario."
  },
  matematica_faidate: {
    tip: "Se una mensola montata da Antonio pende di 15 gradi, puoi compensarla inclinando la testa quando entri nella stanza.",
    warning: "L'uso del trapano a percussione è severamente vietato dalle 15:00 alle 19:00 durante le lezioni pomeridiane di Katia."
  },
  casa_figli: {
    tip: "Per far alzare Simone e Andrea dal divano in meno di 3 secondi, basta staccare la spina del router Wi-Fi.",
    warning: "Chiedere a un figlio maschio di cercare qualcosa nel cassetto attiva istantaneamente una cecità selettiva temporanea."
  },
  spesa_sabato: {
    tip: "Posiziona gli snack e i dolciumi sotto il sacco delle patate per superare indenne il controllo doganale di Katia alla cassa.",
    warning: "Entrare al supermercato il sabato mattina senza la lista ordinata per corsie porta a un inevitabile smarrimento in corsia 4."
  },
  ierieoggi: {
    tip: "Ridere insieme ogni giorno è l'unico ingrediente segreto collaudato per superare le Nozze d'Argento e puntare all'Oro!",
    warning: "Dopo 25 anni, pronunciare la frase 'Hai ragione tu, cara' non è una resa, ma una brillante mossa da maestro."
  }
};

export default function ThematicGallery({ sections, onLaunchVideo, photoLikes, onLikePhoto }) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredSections = activeTab === "all" 
    ? sections 
    : sections.filter(s => s.id === activeTab);

  return (
    <section id="temi" className="wikihow-methods-section">
      <div className="wikihow-container">
        {/* Intestazione Sezione Metodi */}
        <div className="wikihow-section-heading">
          <span className="wiki-badge">
            <BookOpen size={14} /> Guida Ufficiale Passo-Passo
          </span>
          <h2>I 5 Metodi Illustrati di Sopravvivenza</h2>
          <p className="wikihow-section-desc">
            Segui attentamente le istruzioni illustrate per ciascun metodo. Clicca sul tasto verde <strong>"Avvia Video"</strong> per riprodurre il video a schermo intero!
          </p>
        </div>

        {/* Barra Filtri e Selettore a Tendina stile wikiHow */}
        <div className="wikihow-filter-bar">
          <div className="wikihow-dropdown-select-box">
            <label htmlFor="method-select" className="filter-dropdown-label">
              Seleziona Metodo:
            </label>
            <select
              id="method-select"
              className="wikihow-select-input"
              value={activeTab}
              onChange={(e) => {
                const val = e.target.value;
                setActiveTab(val);
                if (val !== 'all') {
                  setTimeout(() => {
                    document.getElementById(`section-${val}`)?.scrollIntoView({ behavior: 'smooth' });
                  }, 80);
                }
              }}
            >
              <option value="all">🌟 Tutti i 5 Metodi della Guida</option>
              {sections.map((sec, idx) => (
                <option key={sec.id} value={sec.id}>
                  Metodo {idx + 1}: {sec.badge} — {sec.title.split(':')[0]}
                </option>
              ))}
            </select>
          </div>

          <div className="wikihow-filter-pills">
            <button
              type="button"
              className={`wiki-filter-pill ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              Tutti i 5 Metodi
            </button>
            {sections.map((sec, idx) => (
              <button
                key={sec.id}
                type="button"
                className={`wiki-filter-pill ${activeTab === sec.id ? 'active' : ''}`}
                onClick={() => setActiveTab(sec.id)}
              >
                Metodo {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Contenuto dei Metodi (Parti di wikiHow) */}
        <div className="methods-wrapper">
          {filteredSections.map((sec, secIdx) => {
            const advice = sectionTipsAndWarnings[sec.id] || sectionTipsAndWarnings.commercialista;

            return (
              <article 
                key={sec.id} 
                id={`section-${sec.id}`} 
                className="wikihow-method-article"
              >
                {/* Banner di Testata del Metodo */}
                <div className="method-header-banner">
                  <div className="method-header-left">
                    <span className="method-part-pill">
                      Metodo {secIdx + 1} di {sections.length}
                    </span>
                    <h3 className="method-part-title">{sec.title}</h3>
                    <p className="method-part-subtitle handwritten">"{sec.subtitle}"</p>
                    <p className="method-part-intro">{sec.description}</p>
                  </div>

                  <div className="method-header-right">
                    <button
                      type="button"
                      className="btn-wiki btn-wiki-primary btn-launch-method-play"
                      onClick={() => onLaunchVideo && onLaunchVideo(sec.id, sec.title)}
                      title="Avvia il Video di questo Metodo in VLC a tutto schermo"
                    >
                      <span className="method-round-play-icon">
                        <Play size={14} className="fill-white" />
                      </span>
                      <span>Avvia Video (Metodo {secIdx + 1}) ▶</span>
                    </button>
                    <span className="method-video-hint">Riproduzione video in VLC a schermo intero</span>
                  </div>
                </div>

                {/* Lista dei Passaggi Numerati di wikiHow (Step 1, 2, 3...) */}
                <div className="method-steps-list">
                  {sec.photos.map((photo, pIdx) => {
                    const currentLikes = photoLikes[photo.id] !== undefined 
                      ? photoLikes[photo.id] 
                      : photo.likes;

                    return (
                      <div key={photo.id} className="wikihow-step-row">
                        {/* Numero del Passaggio (cerchio verde wikiHow) */}
                        <div className="step-number-circle">
                          {pIdx + 1}
                        </div>

                        {/* Contenuto del Passaggio */}
                        <div className="step-body-content">
                          <div className="step-title-row">
                            <h4 className="step-action-headline">
                              {photo.title}
                            </h4>
                            <span className="step-year-tag">Anno {photo.year}</span>
                          </div>

                          <div className="step-layout-grid">
                            {/* Illustrazione wikiHow del Passaggio */}
                            <div 
                              className="step-illustration-box"
                              onClick={() => onLaunchVideo && onLaunchVideo(sec.id, sec.title)}
                              title="Clicca per riprodurre il video di questo metodo"
                            >
                              <img 
                                src={photo.url} 
                                alt={photo.title} 
                                className="step-illustration-img"
                                loading="lazy"
                              />
                              <span className="step-corner-badge">{photo.badge}</span>
                              <div className="step-image-overlay">
                                <span className="btn-step-overlay">
                                  <Play size={14} className="fill-current" /> Guarda il Video ▶
                                </span>
                              </div>
                            </div>

                            {/* Spiegazione & Reazioni */}
                            <div className="step-description-box">
                              <p className="step-text handwritten">
                                «{photo.caption}»
                              </p>

                              <div className="step-meta-footer">
                                <span className="step-verified-note">
                                  ✓ Passaggio testato sul campo
                                </span>
                                <button
                                  type="button"
                                  className="btn-step-like"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onLikePhoto(photo.id);
                                  }}
                                  title="Fai ridere!"
                                >
                                  <Heart size={15} className={currentLikes > photo.likes ? "fill-rose text-rose" : "text-gray"} />
                                  <span>{currentLikes} Approvazioni</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Box Ufficiali wikiHow: Consiglio & Avvertenza */}
                <div className="method-callouts-group">
                  <div className="wikihow-callout wikihow-callout-tip">
                    <Lightbulb size={22} className="callout-icon text-green" />
                    <div>
                      <h4 className="callout-title">Consiglio wikiHow</h4>
                      <p className="callout-content">{advice.tip}</p>
                    </div>
                  </div>

                  <div className="wikihow-callout wikihow-callout-warn">
                    <AlertTriangle size={22} className="callout-icon text-amber" />
                    <div>
                      <h4 className="callout-title">Avvertenza</h4>
                      <p className="callout-content">{advice.warning}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
