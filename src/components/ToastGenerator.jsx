import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Wine, Sparkles, Copy, Check, RefreshCw } from 'lucide-react';

export default function ToastGenerator({ toasts }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleNextToast = () => {
    const nextIdx = (currentIndex + 1) % toasts.length;
    setCurrentIndex(nextIdx);
    setCopied(false);

    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#f59e0b', '#d97706', '#ffffff']
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(toasts[currentIndex]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="brindisi" className="section toast-section">
      <div className="container">
        <div className="section-header">
          <div className="badge-tag">
            <Wine size={15} />
            <span>Alza il Calice!</span>
          </div>
          <h2>Generatore di Brindisi da Microfono 🎤</h2>
          <p className="subtitle">
            Ti hanno passato il microfono e non sai cosa dire? Nessun panico: premi il pulsante e leggi ad alta voce!
          </p>
        </div>

        <div className="toast-generator-card glass-card">
          <div className="toast-quote-display">
            <div className="toast-icon-badge">🥂</div>
            <p className="toast-text handwritten">
              {toasts[currentIndex]}
            </p>
          </div>

          <div className="toast-actions">
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleNextToast}
            >
              <RefreshCw size={18} />
              <span>Genera Altro Brindisi</span>
            </button>

            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleCopy}
              title="Copia negli appunti"
            >
              {copied ? <Check size={18} className="text-green" /> : <Copy size={18} />}
              <span>{copied ? "Copiato negli appunti!" : "Copia Frase"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
