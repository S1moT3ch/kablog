import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Play, Pause, ChevronLeft, ChevronRight, 
  Maximize, Minimize, Clock, Sparkles, Film, Volume2, Eye, EyeOff
} from 'lucide-react';

export default function ThemeSlideshow({ section, initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(6); // secondi per diapositiva (ottimale per voiceover)
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  const photos = section?.photos || [];
  const currentPhoto = photos[currentIndex] || photos[0];

  // Auto-hide dei controlli per non rovinare la registrazione video dello schermo
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2800);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  // Gestione timer di autoplay per sincronizzare la voce narrante
  useEffect(() => {
    if (!isPlaying || photos.length <= 1) {
      setProgress(0);
      return;
    }

    const intervalTime = 50; // aggiornamento fluido ogni 50ms
    const totalSteps = (speed * 1000) / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentPct = (currentStep / totalSteps) * 100;
      setProgress(currentPct);

      if (currentStep >= totalSteps) {
        currentStep = 0;
        setProgress(0);
        setCurrentIndex((prev) => (prev + 1) % photos.length);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, speed, currentIndex, photos.length]);

  // Gestione scorciatoie da tastiera per la registrazione dello schermo
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          onClose();
        }
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
        setShowControls(true);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'h' || e.key === 'H') {
        // Tasto H per nascondere/mostrare manualmente tutti i tasti durante la registrazione
        setShowControls((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, photos.length, isPlaying]);

  const handleNext = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  if (!section || photos.length === 0) return null;

  return (
    <div 
      className={`slideshow-backdrop ${showControls ? '' : 'hide-ui-controls'}`} 
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Sfondo sfumato d'atmosfera ricavato dalla foto corrente */}
      <div 
        className="slideshow-ambient-bg" 
        style={{ backgroundImage: `url(${currentPhoto.url})` }}
      />

      {/* Barra superiore per la regia del video */}
      <div className="slideshow-topbar">
        <div className="slideshow-title-info">
          <span className="slideshow-badge">
            <Film size={15} />
            {section.badge}
          </span>
          <div className="slideshow-section-name">
            <h3>{section.title}</h3>
            <span className="slideshow-counter">
              Foto {currentIndex + 1} di {photos.length}
            </span>
          </div>
        </div>

        <div className="slideshow-controls-group">
          {/* Selettore Velocità (ideale per sincronizzarsi al voiceover) */}
          <div className="speed-selector" title="Tempo di permanenza per ogni foto">
            <Clock size={16} />
            <select 
              value={speed} 
              onChange={(e) => {
                setSpeed(Number(e.target.value));
                setProgress(0);
              }}
              className="speed-dropdown"
            >
              <option value={4}>4s (Veloce)</option>
              <option value={6}>6s (Consigliato per Voiceover)</option>
              <option value={8}>8s (Narrativo)</option>
              <option value={12}>12s (Lento)</option>
            </select>
          </div>

          {/* Tasto Play/Pausa */}
          <button 
            type="button" 
            className="slideshow-btn play-pause-btn"
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Metti in pausa (Spazio)" : "Riproduci slideshow (Spazio)"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            <span>{isPlaying ? "Pausa" : "Play"}</span>
          </button>

          {/* Modalità Cinema (Nascondi UI per registrare) */}
          <button 
            type="button" 
            className="slideshow-btn cinema-mode-btn"
            onClick={() => setShowControls(false)}
            title="Nascondi comandi per la registrazione (tasto H)"
          >
            <EyeOff size={18} />
            <span>Nascondi Comandi (H)</span>
          </button>

          {/* Schermo Intero */}
          <button 
            type="button" 
            className="slideshow-btn icon-only-btn"
            onClick={toggleFullscreen}
            title="Schermo intero (tasto F)"
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>

          {/* Chiudi e torna al blog */}
          <button 
            type="button" 
            className="slideshow-btn btn-close-slideshow"
            onClick={onClose}
            title="Torna al Blog (Esc)"
          >
            <X size={20} />
            <span>Esci dallo Slideshow</span>
          </button>
        </div>
      </div>

      {/* Barra di avanzamento temporale continua (visibile solo durante il play) */}
      {isPlaying && (
        <div className="slideshow-progress-track">
          <div 
            className="slideshow-progress-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Area Centrale con la Foto & Frecce di Scorrimento */}
      <div className="slideshow-main-viewport">
        <button 
          type="button" 
          className="slideshow-nav-arrow arrow-left" 
          onClick={handlePrev}
          title="Foto precedente (Freccia Sinistra)"
        >
          <ChevronLeft size={36} />
        </button>

        <div className="slideshow-media-frame">
          <img 
            key={currentPhoto.id}
            src={currentPhoto.url} 
            alt={currentPhoto.title} 
            className="slideshow-photo-display animate-fade-in"
          />

          {/* Badge Anno & Etichetta */}
          <div className="slideshow-photo-tags">
            <span className="photo-tag-badge year-badge">Anno {currentPhoto.year}</span>
            <span className="photo-tag-badge humor-badge">{currentPhoto.badge}</span>
          </div>
        </div>

        <button 
          type="button" 
          className="slideshow-nav-arrow arrow-right" 
          onClick={handleNext}
          title="Foto successiva (Freccia Destra)"
        >
          <ChevronRight size={36} />
        </button>
      </div>

      {/* Pannello Didascalia Narrativa per la Registrazione Schermo */}
      <div className="slideshow-bottom-narrator">
        <div className="narrator-card">
          <div className="narrator-header">
            <span className="voiceover-cue">
              <Volume2 size={16} /> Spunto per la voce narrante:
            </span>
            <h4 className="narrator-photo-title">{currentPhoto.title}</h4>
          </div>
          <p className="narrator-caption handwritten">
            «{currentPhoto.caption}»
          </p>
        </div>

        {/* Striscia miniature scorrevole per regia rapida */}
        <div className="slideshow-thumbnails-strip">
          {photos.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              className={`thumbnail-item ${idx === currentIndex ? 'active-thumb' : ''}`}
              onClick={() => {
                setCurrentIndex(idx);
                setProgress(0);
              }}
              title={p.title}
            >
              <img src={p.url} alt={p.title} />
              <span className="thumb-idx">{idx + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
