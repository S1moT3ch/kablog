import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Wine, Sparkles, Heart, Camera, Calendar, ArrowDown } from 'lucide-react';

export default function Hero({ coupleData }) {
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
      // fallback to 9131 days (25 years)
    }
  }, [coupleData.weddingDate]);

  const triggerMassiveConfetti = () => {
    // Esplosione festosa di coriandoli
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#d97706', '#94a3b8', '#e11d48', '#fbbf24']
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 250);
  };

  return (
    <section id="top" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge animate-float">
            <Sparkles size={16} className="text-amber" />
            <span>Edizione Speciale Nozze d'Argento (2001 - 2026)</span>
          </div>

          <h1 className="hero-title">
            25 Anni Insieme... <br />
            <span className="hero-title-highlight">e Nessun Omicidio!</span>
          </h1>

          <p className="hero-subtitle">
            Il diario segreto e semi-serio di <strong>{coupleData.groomName}</strong> e <strong>{coupleData.brideName}</strong>. 
            Tra valigie stracolme, cene bruciate, mobili traballanti e un amore che non si è mai arreso.
          </p>

          {/* Survival counter pills */}
          <div className="survival-counter-grid">
            <div className="counter-pill">
              <span className="pill-number">25</span>
              <span className="pill-label">Anni Insieme</span>
            </div>
            <div className="counter-pill">
              <span className="pill-number">{daysCount.toLocaleString('it-IT')}</span>
              <span className="pill-label">Giorni di Pazienza</span>
            </div>
            <div className="counter-pill">
              <span className="pill-number">~{hoursCount.toLocaleString('it-IT')}</span>
              <span className="pill-label">Ore di Chiacchiere</span>
            </div>
            <div className="counter-pill highlight-pill">
              <span className="pill-number">100%</span>
              <span className="pill-label">Felici di Esserci</span>
            </div>
          </div>

          <div className="hero-actions">
            <button 
              type="button" 
              className="btn btn-primary btn-lg"
              onClick={triggerMassiveConfetti}
            >
              <Wine size={20} />
              <span>Stappa lo Spumante! 🍾</span>
            </button>
            <a href="#temi" className="btn btn-secondary btn-lg">
              <Camera size={20} />
              <span>Esplora le Fotogallery</span>
            </a>
          </div>

          <div className="hero-quote-box">
            <span className="quote-icon">“</span>
            <p className="handwritten">
              {coupleData.introStory}
            </p>
          </div>
        </div>

        {/* Hero visual / Polaroid collage */}
        <div className="hero-visual">
          <div className="polaroid-main-card">
            <div className="polaroid-tape"></div>
            <div className="polaroid-image-wrapper">
              <img 
                src={coupleData.heroCoverImage} 
                alt="Foto della coppia ai 25 anni di matrimonio" 
                className="polaroid-img"
              />
              <span className="polaroid-seal">🏅 25 ANNI</span>
            </div>
            <div className="polaroid-caption">
              <p className="polaroid-text handwritten">
                «Ancora noi, 25 anni dopo... e con la stessa voglia di ridere!»
              </p>
              <span className="polaroid-date">Nozze d'Argento • 2001 - 2026</span>
            </div>
          </div>

          {/* Floating funny sticker badge */}
          <div className="hero-floating-sticker">
            <Heart size={20} className="text-rose fill-rose" />
            <div>
              <strong>Resistenza record:</strong>
              <p>Collaudati e garantiti a vita!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
