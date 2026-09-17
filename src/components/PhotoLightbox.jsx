import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Calendar, MapPin } from 'lucide-react';

export default function PhotoLightbox({ photo, onClose, onNext, onPrev, onLike }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!photo) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="lightbox-close-btn" 
          onClick={onClose}
          aria-label="Chiudi"
        >
          <X size={24} />
        </button>

        {onPrev && (
          <button 
            type="button" 
            className="lightbox-nav-btn nav-prev" 
            onClick={onPrev}
            aria-label="Foto precedente"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {onNext && (
          <button 
            type="button" 
            className="lightbox-nav-btn nav-next" 
            onClick={onNext}
            aria-label="Foto successiva"
          >
            <ChevronRight size={28} />
          </button>
        )}

        <div className="lightbox-media">
          <img src={photo.url} alt={photo.title} className="lightbox-image" />
          <span className="lightbox-badge">{photo.badge}</span>
        </div>

        <div className="lightbox-info">
          <div className="lightbox-header-meta">
            <span className="lightbox-year">
              <Calendar size={15} />
              Anno {photo.year}
            </span>
            <button 
              type="button" 
              className="lightbox-like-btn"
              onClick={() => onLike(photo.id)}
            >
              <Heart size={18} className="text-rose fill-rose" />
              <span>{photo.likes} Mi fa ridere!</span>
            </button>
          </div>

          <h3 className="lightbox-title">{photo.title}</h3>
          
          <div className="lightbox-caption-box">
            <p className="lightbox-caption handwritten">
              «{photo.caption}»
            </p>
          </div>

          <div className="lightbox-tip">
            💡 <em>Usa le frecce della tastiera per scorrere le foto o premi ESC per chiudere</em>
          </div>
        </div>
      </div>
    </div>
  );
}
