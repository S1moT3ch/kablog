import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Play,
  MessageSquare,
  ShieldCheck,
  Star,
  ThumbsUp,
  Heart,
  Sparkles,
  Maximize2,
  X,
  Film,
  Paperclip
} from 'lucide-react';
import BoomerAvatar from './BoomerAvatar';
import { CONTRIBUTI_DATA as INITIAL_DATA } from '../data/contributiData';




export default function ContributiSection({ onLaunchVideo }) {
  const [items, setItems] = useState(INITIAL_DATA);
  const [playingId, setPlayingId] = useState(null);
  const [revealedIds, setRevealedIds] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dynamicDurations, setDynamicDurations] = useState({});

  // Sincronizza dinamicamente i file presenti nella cartella Contributi
  const syncContributiFiles = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/contributi-list');
      if (res.ok) {
        const data = await res.json();
        if (data && data.ok && Array.isArray(data.files) && data.files.length > 0) {
          // Tommy.jpg viene trattato come foto-allegato del video delle cugine
          const tommyFile = data.files.find(f => f.filename.toLowerCase() === 'tommy.jpg');
          const videoFiles = data.files.filter(f => f.filename.toLowerCase() !== 'tommy.jpg');

          const mapped = videoFiles.map((file, idx) => {
            const clean = (s) => (s || '').toLowerCase()
              .replace(/\.[^/.]+$/, '')
              .replace(/(_def|def|v\d+|_v\d+)/gi, '')
              .replace(/[^a-z0-9]/g, '');
            const existing = INITIAL_DATA.find(d => clean(d.filename) === clean(file.filename));
            const id = existing ? existing.id : `dyn-${file.filename.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

            const isCugine = file.filename.toLowerCase().includes('cugine');
            const attachmentPhoto = (isCugine && tommyFile) ? {
              filename: tommyFile.filename,
              title: "Tommy ❤️",
              dedication: "«Felice anniversario Katia e Antonio ❤️»",
              photoUrl: `/api/contributi-media/${encodeURIComponent(tommyFile.filename)}`
            } : (existing?.attachmentPhoto || null);

            return {
              id,
              filename: file.filename,
              author: existing ? existing.author : `@utente_community_${idx + 1}`,
              badge: existing ? existing.badge : "Membro della Community",
              commentTitle: existing ? existing.commentTitle : `Video-Recensione #${idx + 1}`,
              tagline: existing ? existing.tagline : (attachmentPhoto ? "Ha lasciato un allegro video-augurio corale a 5 stelle con uno scatto a sorpresa allegato!" : "Ha pubblicato una video-recensione a 5 stelle per la coppia"),
              stars: 5,
              type: 'video',
              duration: file.duration || existing?.duration || dynamicDurations[file.filename] || 'Video',
              realTitle: existing ? existing.realTitle : file.filename.replace(/\.[^/.]+$/, ""),
              attachmentPhoto,
              date: "Settembre 2026"
            };
          });

          setItems(mapped);
        }
      }
    } catch (err) {
      console.warn('[Contributi] Impossibile sincronizzare lista dinamica, uso dati locali:', err.message);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  }, [dynamicDurations]);

  useEffect(() => {
    syncContributiFiles();

    const handleFocus = () => {
      syncContributiFiles();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [syncContributiFiles]);

  const handleCardClick = async (item) => {
    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#609345', '#93b874', '#f59e0b', '#3b82f6', '#ffffff']
    });

    setRevealedIds(prev => ({ ...prev, [item.id]: true }));

    setPlayingId(item.id);
    console.log(`[Community Video-Commenti] Riproduzione commento di ${item.author} (${item.filename})`);

    if (onLaunchVideo) {
      await onLaunchVideo(item.filename, item.realTitle);
    }

    setTimeout(() => {
      setPlayingId(null);
    }, 2800);
  };

  const handleVideoMetadataLoaded = (filename, e) => {
    const durSec = e.target.duration;
    if (durSec && !isNaN(durSec) && isFinite(durSec)) {
      const mins = Math.floor(durSec / 60);
      const secs = Math.floor(durSec % 60);
      const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      setDynamicDurations(prev => ({ ...prev, [filename]: formatted }));
    }
  };


  return (
    <section id="contributi" className="wikihow-contributi-section">
      <div id="guestbook" style={{ position: 'relative', top: '-80px', visibility: 'hidden' }} />
      <div className="wikihow-container">

        {/* Intestazione Ufficiale Stile wikiHow: Recensioni e Commenti della Community */}
        <div className="wikihow-section-heading">
          <span className="wiki-badge">
            <MessageSquare size={14} /> Recensioni &amp; Commenti della Community
          </span>
          <h2>I Video-Commenti dei Lettori Verificati</h2>
          <p className="wikihow-section-desc">
            Le video-testimonianze, i consigli e le recensioni a 5 stelle lasciate dai lettori più fidati di wikiHow per aiutare Antonio &amp; Katia
            ad affrontare i prossimi 25 anni di matrimonio
          </p>

          {/* Valutazione Complessiva della Community wikiHow */}
          <div className="community-rating-summary">
            <div className="summary-stars-box">
              <div className="summary-stars-row" title="Valutazione complessiva: 5.0 stelle su 5.0">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="review-star-gold" />
                ))}
              </div>
              <strong className="summary-score-bold">5.0 su 5.0</strong>
            </div>
            <span className="summary-rating-count">({items.length} recensioni della festa)</span>
            <span className="summary-badge-pill">
              ✓ 100% degli invitati raccomanda questa coppia
            </span>
          </div>
        </div>

        {/* Griglia Card stile Recensioni / Commenti Community wikiHow */}
        <div className="contributi-grid">
          {items.map((item, index) => {
            const isPlaying = playingId === item.id;
            const isRevealed = !!revealedIds[item.id];
            const displayDuration = dynamicDurations[item.filename] || item.duration || 'Video';

            return (
              <div
                key={item.id}
                className={`contributi-card community-review-card ${isPlaying ? 'card-playing' : ''} ${isRevealed ? 'card-unlocked' : ''}`}
                onClick={() => handleCardClick(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(item);
                  }
                }}
                aria-label={`Guarda il video-commento di ${item.author}`}
              >
                {/* Video metadata loader se necessario */}
                {!item.duration && (
                  <video
                    src={`/api/contributi-media/${encodeURIComponent(item.filename)}`}
                    preload="metadata"
                    style={{ display: 'none' }}
                    onLoadedMetadata={(e) => handleVideoMetadataLoaded(item.filename, e)}
                  />
                )}

                {/* Intestazione Recensore Stile wikiHow con Boomer Avatar Offline */}
                <div className="review-card-header">
                  <BoomerAvatar 
                    author={item.author} 
                    badge={item.badge} 
                    index={index} 
                    size={46} 
                  />
                  <div className="reviewer-meta">
                    <div className="reviewer-name-row">
                      <strong className="reviewer-name">
                        {item.author}
                      </strong>
                      <span className="review-badge-verified">
                        <ShieldCheck size={13} className="verified-shield-icon" /> Verificato
                      </span>
                    </div>
                    <div className="reviewer-sub-info">
                      <span className="reviewer-role-badge">{item.badge}</span>
                      <span className="reviewer-date-badge">{item.date}</span>
                    </div>
                  </div>
                </div>

                {/* Striscia di Valutazione a 5 Stelle Dedicata e Ben Visibile */}
                <div className="card-rating-strip">
                  <div className="card-stars-row" title="Valutazione 5 stelle su 5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className="review-star-gold" />
                    ))}
                  </div>
                  <span className="card-rating-text">5.0 / 5.0</span>
                  <span className="card-rating-label">• Recensione a 5 Stelle</span>
                </div>

                {/* Box Allegato Video Stile wikiHow */}
                <div className="community-media-attachment">
                  <div className="attachment-header">
                    <span className="attachment-label">
                      <Film size={12} />
                      <span>{`VIDEO-COMMENTO (${displayDuration})`}</span>
                    </span>
                    {isRevealed && (
                      <span className="attachment-badge-secret is-revealed">
                        ✓ RIPRODOTTO
                      </span>
                    )}
                  </div>

                  {/* Player Box interattivo */}
                  <div className="attachment-player-box">
                    <div className="player-inner-emblem">
                      {isPlaying ? (
                        <Sparkles size={28} className="player-spin-icon text-amber-400" />
                      ) : (
                        <div className="player-play-btn">
                          <Play size={20} className="fill-current ml-0.5" />
                        </div>
                      )}
                    </div>
                    <span className="player-cta-hint">
                      {isPlaying ? "Apertura su VLC in corso..." : "Clicca per avviare il video a tutto schermo"}
                    </span>
                  </div>
                </div>

                {/* Corpo del Commento stile wikiHow */}
                <div className="community-comment-body">

                  {/* Foto-Allegato a Sorpresa (Compatto e Senza Spoiler) */}
                  {item.attachmentPhoto && (
                    <button
                      type="button"
                      className="review-surprise-pill"
                      onClick={(e) => {
                        e.stopPropagation();
                        confetti({
                          particleCount: 50,
                          spread: 70,
                          origin: { y: 0.6 }
                        });
                        setSelectedPhoto(item.attachmentPhoto);
                      }}
                      title="Clicca per aprire la foto-allegato a sorpresa!"
                    >
                      <div className="surprise-pill-left">
                        <Paperclip size={13} className="surprise-pill-clip" />
                        <span className="surprise-pill-label">1 Foto-Allegato</span>
                      </div>
                      <span className="surprise-pill-badge">
                        <Sparkles size={11} /> Scopri
                      </span>
                    </button>
                  )}

                  <div className="review-recommends-row">
                    <ThumbsUp size={13} className="text-green-600" />
                    <span>Questo lettore consiglia Antonio &amp; Katia per i prossimi 25 anni!</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        {/* Modal Lightbox per la Foto di Tommy */}
        {selectedPhoto && (
          <div
            className="photo-modal-backdrop animate-fade-in"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="photo-modal-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="photo-modal-close"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Chiudi finestra"
              >
                <X size={22} />
              </button>

              <div className="photo-modal-image-wrapper">
                <img
                  src={selectedPhoto.photoUrl || `/api/contributi-media/${encodeURIComponent(selectedPhoto.filename)}`}
                  alt="Foto-Dedica della Community"
                  className="photo-modal-img"
                />
              </div>

              <div className="photo-modal-info">
                <div className="photo-modal-header">
                  <span className="wiki-badge">
                    <Heart size={14} className="text-red-500 fill-current" /> Foto-Dedica Verificata
                  </span>
                  <h3>Lo scatto di auguri di Tommaso!</h3>
                </div>
                <p className="photo-modal-subtitle">
                  <Paperclip size={13} className="attachment-clip-icon" /> Allegato al video-commento di: <strong>@franco_e_rossana_profilo_unico</strong>
                </p>
                <p className="photo-modal-dedication handwritten">
                  «Felice anniversario Katia e Antonio ❤️»
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
