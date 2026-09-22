import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Wine, Copy, Check, RefreshCw, Quote } from 'lucide-react';

export default function ToastGenerator({ toasts, onBrindisi }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleNextToast = () => {
    const nextIdx = (currentIndex + 1) % toasts.length;
    setCurrentIndex(nextIdx);
    setCopied(false);

    if (onBrindisi) {
      onBrindisi();
    } else {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#609345', '#93b874', '#ffffff']
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(toasts[currentIndex]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="brindisi" className="wikihow-toast-section">
      <div className="wikihow-container">
        <div className="wikihow-section-heading">
          <span className="wiki-badge">
            <Wine size={14} /> Citazioni per la Festa
          </span>
          <h2>Frasi e Brindisi Consigliati per il Discorso</h2>
          <p className="wikihow-section-desc">
            Ti hanno passato il microfono alla festa e non sai cosa dire? Ecco i modelli di discorso approvati da wikiHow per le Nozze d'Argento:
          </p>
        </div>

        <div className="wikihow-toast-card">
          <div className="toast-content-wrapper">
            <Quote size={28} className="quote-mark-icon" />
            <p className="toast-text-quote handwritten">
              {toasts[currentIndex]}
            </p>
          </div>

          <div className="toast-buttons-toolbar">
            <button 
              type="button" 
              className="btn-wiki btn-wiki-primary"
              onClick={handleNextToast}
            >
              <RefreshCw size={16} />
              <span>Genera un Altro Discorso</span>
            </button>

            <button 
              type="button" 
              className="btn-wiki btn-wiki-secondary"
              onClick={handleCopy}
              title="Copia negli appunti"
            >
              {copied ? <Check size={16} className="text-green" /> : <Copy size={16} />}
              <span>{copied ? "Copiato negli Appunti!" : "Copia Frase"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
