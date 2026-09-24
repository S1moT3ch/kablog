import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Wine, Check, Star, ThumbsUp, Calendar, Clock, Sparkles } from 'lucide-react';

export default function Hero({ coupleData, onBrindisi }) {
  const [daysCount, setDaysCount] = useState(9131);
  const [hoursCount, setHoursCount] = useState(219144);

  useEffect(() => {
    try {
      const wedding = new Date(coupleData.weddingDate);
      const now = new Date();
      const diffTime = Math.abs(now - wedding);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffDays > 0) {
        setDaysCount(diffDays);
        setHoursCount(diffHours);
      }
    } catch {
      // fallback
    }
  }, [coupleData.weddingDate]);

  const triggerConfetti = () => {
    if (onBrindisi) {
      onBrindisi();
    } else {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#609345', '#93b874', '#f59e0b', '#ffffff', '#e11d48']
      });
    }
  };

  return (
    <section id="top" className="wikihow-hero-section">
      <div className="wikihow-container">
        <div className="wikihow-article-header">
          {/* Titolo Ufficiale dell'Articolo wikiHow */}
          <h1 className="article-main-title">
            Come Sopravvivere a 25 Anni di Matrimonio
          </h1>

          {/* Byline / Metadati wikiHow */}
          <div className="wikihow-byline-bar">
            <div className="byline-author-info">
              <span className="byline-text">
                Co-redatto dallo <strong>Staff di Famiglia</strong>
              </span>
              <span className="byline-dot">•</span>
              <span className="byline-date">
                <Calendar size={13} /> Nozze d'Argento (26 Settembre 2001 - 2026)
              </span>
            </div>

            <div className="byline-stats-badges">
              <span className="wiki-verified-badge" title="Testato direttamente sul campo per 25 anni">
                <span className="wiki-verified-tick-circle">
                  <Check size={11} strokeWidth={3.5} />
                </span>
                <span className="wiki-verified-text">Articolo Verificato da 25 Anni di Convivenza Reale</span>
              </span>
              <span className="wiki-rating-badge">
                <Star size={13} className="fill-amber text-amber" />
                <strong>4.9 / 5.0</strong> ({daysCount.toLocaleString('it-IT')} giorni recensiti)
              </span>
              <span className="wiki-thumbs-badge">
                <ThumbsUp size={13} className="text-green" />
                100% degli invitati approva
              </span>
            </div>
          </div>
        </div>

        {/* Corpo Principale dell'Introduzione dell'Articolo */}
        <div className="wikihow-intro-layout">
          <div className="wikihow-intro-text-column">
            <p className="intro-lead-paragraph">
              Sopravvivere a un quarto di secolo insieme è considerata una delle imprese umane più complesse,
              specialmente quando la coppia è composta da un <strong>commercialista stakanovista</strong> (lavoratore H24 con pausa il weekend... forse!)
              e da una <strong>professoressa di matematica</strong> che combatte quotidianamente con il disordine di due figli (Simone e Andrea).
            </p>

            <p className="intro-secondary-paragraph">
              In questo manuale illustrato passo-passo scoprirai tutti i metodi collaudati per disinnescare la guerra fredda sui trapani casalinghi,
              sopravvivere alla spedizione punitiva della spesa del sabato e mantenere vivo l'amore per oltre 9.100 giorni.
            </p>

            {/* Box Cose che ti serviranno (Things You'll Need) */}
            <div className="wikihow-things-needed-card">
              <h3 className="things-needed-title">
                📋 Cose che ti Serviranno per Completare Questo Metodo:
              </h3>
              <ul className="things-needed-list">
                <li>
                  <strong>18.250+ Caffè caldi:</strong> indispensabili per iniziare a parlare al mattino.
                </li>
                <li>
                  <strong>1 Calcolatrice / F24:</strong> per gestire le scadenze fiscali di Antonio a qualsiasi ora.
                </li>
                <li>
                  <strong>1 Lavagna con gessetti:</strong> per le lezioni pomeridiane no-stop di Katia.
                </li>
                <li>
                  <strong>2 Divani rinforzati:</strong> su cui far accomodare Simone e Andrea mentre la mamma pulisce.
                </li>
                <li>
                  <strong>4 Carrelli capienti:</strong> per la spedizione titanica del sabato al supermercato.
                </li>
                <li>
                  <strong>Pazienza infinita e tantissimo amore:</strong> la formula matematica segreta per arrivare all'Oro!
                </li>
              </ul>
            </div>

            <div className="intro-action-row">
              <button
                type="button"
                className="btn-wiki btn-wiki-primary"
                onClick={triggerConfetti}
              >
                <Wine size={18} />
                <span>Stappa lo Spumante delle Nozze d'Argento! 🍾</span>
              </button>
              <a href="#temi" className="btn-wiki btn-wiki-secondary">
                <span>Vai ai 5 Metodi Illustrati ⬇️</span>
              </a>
            </div>
          </div>

          {/* Illustrazione Ufficiale di Copertina wikiHow */}
          <div className="wikihow-intro-visual-column">
            <div className="wikihow-illustration-frame">
              <img
                src={coupleData.heroCoverImage}
                alt="Antonio e Katia per il manuale wikiHow"
                className="wikihow-illustration-img"
              />
              <div className="wikihow-caption-bar">
                <span className="caption-fig-number">Figura 1</span>
                <p className="caption-text handwritten">
                  «Antonio e Katia fotografati dopo 25 anni: sorridenti, complici e con zero omicidi commessi!»
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
