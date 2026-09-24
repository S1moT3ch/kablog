import React, { useState } from 'react';
import { Play, Lightbulb, AlertTriangle, BookOpen } from 'lucide-react';

const sectionTipsAndWarnings = {
  giovinezza: {
    tip: "Conservare le foto e i ricordi dei primi appuntamenti serve a dimostrare ai figli che anche mamma e papà sono stati giovani e spensierati!",
    warning: "Rivedere le pettinature e la moda degli anni '90 e 2000 può provocare improvvisi attacchi di risa incontrollata."
  },
  matrimonio: {
    tip: "Quel 26 settembre 2001 la promessa era solenne: sostenersi a vicenda nella gioia, nel dolore e durante ogni scadenza dell'anno!",
    warning: "Dopo 25 anni di matrimonio, pronunciare la frase 'Hai ragione tu, cara' non è una resa, ma una brillante mossa strategica."
  },
  famiglia: {
    tip: "Per far alzare Simone e Andrea dal divano in meno di 3 secondi netti, basta staccare momentaneamente la spina del router Wi-Fi.",
    warning: "Chiedere a un figlio di cercare qualcosa nell'armadio attiva istantaneamente una cecità selettiva temporanea."
  },
  viaggi: {
    tip: "In vacanza la valigia di Katia è organizzata con precisione millimetrica; quella di Antonio contiene almeno un fascicolo di scorta 'non si sa mai'.",
    warning: "Partire per un viaggio senza aver prima controllato 4 volte di aver chiuso il gas, le finestre e la dichiarazione dei redditi è severamente vietato."
  },
  amici: {
    tip: "Gli amici veri sono quelli che brindano con te dopo 25 anni e ricordano ancora tutti gli aneddoti più imbarazzanti degli inizi!",
    warning: "Non lasciare mai il microfono della festa in mano all'amico del cuore dopo il terzo calice di spumante."
  },
  commercialista: {
    tip: "Se Antonio dice che 'chiude solo una partita doppia e arriva a tavola', hai tutto il tempo di cucinare un arrosto di 3 ore.",
    warning: "Non nominare mai cartelle esattoriali o scadenze F24 durante la cena di anniversario."
  },
  ierieoggi: {
    tip: "Ridere insieme ogni giorno è l'unico ingrediente segreto collaudato per superare le Nozze d'Argento e puntare all'Oro!",
    warning: "Dopo 25 anni, pronunciare la frase 'Hai ragione tu, cara' non è una resa, ma una brillante mossa da maestro."
  }
};

function renderFormattedText(text) {
  if (typeof text !== 'string') return text;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="narrative-keyword">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

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
                  </div>
                </div>

                {/* Foto Singola del Metodo */}
                {sec.methodImage && (
                  <figure className="method-featured-photo-card">
                    <div className="method-featured-photo-frame">
                      <img
                        src={sec.methodImage.url}
                        alt={sec.methodImage.alt || sec.title}
                        className="method-featured-img"
                        loading="lazy"
                        onError={(e) => {
                          if (sec.methodImage.fallbackUrl && e.target.src !== sec.methodImage.fallbackUrl) {
                            e.target.src = sec.methodImage.fallbackUrl;
                          }
                        }}
                      />
                    </div>
                    {sec.methodImage.caption && (
                      <figcaption className="method-featured-caption">
                        <span className="method-caption-icon">📷</span>
                        <span>{sec.methodImage.caption}</span>
                      </figcaption>
                    )}
                  </figure>
                )}

                {/* Paragrafi Discorsivi del Metodo */}
                <div className="method-discursive-body">
                  {(sec.paragraphs || [sec.description]).map((paragraph, pIdx) => (
                    <p key={pIdx} className="method-discursive-paragraph">
                      {renderFormattedText(paragraph)}
                    </p>
                  ))}
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
