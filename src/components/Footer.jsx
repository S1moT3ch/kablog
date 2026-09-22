import React from 'react';
import confetti from 'canvas-confetti';
import { Heart, ArrowUp, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

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
        {/* Box informativo personalizzazione foto */}
        <div className="wikihow-footer-info-card">
          <div className="footer-info-left">
            <div className="footer-info-icon">
              <BookOpen size={24} className="text-green" />
            </div>
            <div>
              <h4 className="footer-info-title">
                Pronto a inserire le vostre foto reali nel manuale? 📸
              </h4>
              <p className="footer-info-desc">
                Tutte le foto, i testi dei passaggi e le statistiche si modificano facilmente nel file <code>src/data/blogData.js</code>. 
                Puoi posizionare le tue foto in <code>public/photos/</code> per completare la guida ufficiale delle Nozze d'Argento!
              </p>
            </div>
          </div>

          <button 
            type="button" 
            className="btn-wiki btn-wiki-primary"
            onClick={triggerCelebration}
          >
            <Heart size={16} />
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
