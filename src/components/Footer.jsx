import React from 'react';
import confetti from 'canvas-confetti';
import { Heart, ArrowUp, Sparkles, Image, Edit3 } from 'lucide-react';

export default function Footer({ groomName, brideName }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerSilverBurst = () => {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.9 },
      colors: ['#cbd5e1', '#94a3b8', '#f59e0b', '#f43f5e', '#ffffff']
    });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top-box glass-card">
          <div className="footer-guide-content">
            <div className="guide-icon-box">
              <Sparkles size={28} className="text-amber" />
            </div>
            <div>
              <h4>Pronti a personalizzarlo con le vostre foto reali? 📸</h4>
              <p>
                Tutti i nomi, i testi delle sezioni e le foto sono centralizzati nel file <code>src/data/blogData.js</code>. 
                Puoi aggiungere le tue foto nella cartella <code>public/photos/</code> o inserire i file direttamente per rendere questo album davvero unico!
              </p>
            </div>
          </div>
          <button 
            type="button" 
            className="btn btn-rose"
            onClick={triggerSilverBurst}
          >
            <Heart size={18} />
            <span>Viva gli Sposi! 🥂</span>
          </button>
        </div>

        <div className="footer-bottom-row">
          <div className="footer-copyright">
            <p>
              💍 <strong>KaBlog</strong> • Festeggiando i 25 Anni di {groomName} & {brideName}
            </p>
            <p className="footer-subtext">
              Realizzato con amore, risate e una buona scorta di pazienza per le Nozze d'Argento.
            </p>
          </div>

          <button 
            type="button" 
            className="btn btn-secondary btn-back-to-top"
            onClick={scrollToTop}
            title="Torna all'inizio"
          >
            <ArrowUp size={18} />
            <span>Torna su</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
