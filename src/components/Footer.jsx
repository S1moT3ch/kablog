import React from 'react';
import confetti from 'canvas-confetti';
import { Heart, ArrowUp } from 'lucide-react';

export default function Footer({ groomName, brideName, onBrindisi }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerCelebration = () => {
    if (onBrindisi) {
      onBrindisi();
    } else {
      confetti({
        particleCount: 90,
        spread: 90,
        origin: { y: 0.85 },
        colors: ['#609345', '#93b874', '#f59e0b', '#ffffff']
      });
    }
  };

  return (
    <footer className="wikihow-footer">
      <div className="wikihow-container">
        {/* Bottone Verde Celebrativo Viva Antonio & Katia */}
        <div className="wikihow-footer-action-row">
          <button 
            type="button" 
            className="btn-wiki btn-wiki-primary btn-footer-celebration"
            onClick={triggerCelebration}
          >
            <Heart size={18} />
            <span>Viva Antonio & Katia! 🥂</span>
          </button>
        </div>

        {/* Footer Link & Copyright wikiHow */}
        <div className="wikihow-footer-bottom">
          <div className="footer-brand-column">
            <div className="wikihow-logo-mini">
              <span className="logo-wiki">wiki</span>
              <span className="logo-how">How</span>
              <span className="logo-tagline">to Survive</span>
            </div>
            <p className="footer-disclaimer">
              Guida non ufficiale per festeggiare 25 anni di matrimonio di {groomName} e {brideName}. 
              Nessun commercialista o professoressa di matematica è stato maltrattato per la realizzazione di questo sito.
            </p>
          </div>

          <button 
            type="button" 
            className="btn-wiki btn-wiki-secondary btn-back-top"
            onClick={scrollToTop}
            title="Torna all'inizio dell'articolo"
          >
            <ArrowUp size={16} />
            <span>Torna su</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
