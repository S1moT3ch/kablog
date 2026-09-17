import React, { useState } from 'react';
import { Camera, Film, Play, Heart, Eye, Sparkles } from 'lucide-react';

export default function ThematicGallery({ sections, onStartSlideshow, photoLikes, onLikePhoto }) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredSections = activeTab === "all" 
    ? sections 
    : sections.filter(s => s.id === activeTab);

  return (
    <section id="temi" className="section gallery-section">
      <div className="container">
        <div className="section-header">
          <div className="badge-tag">
            <Film size={16} />
            <span>Capitoli Tematici per la Video-Registrazione</span>
          </div>
          <h2>Le Sezioni Tematiche & Slideshow</h2>
          <p className="subtitle">
            Ogni sezione introduce un capitolo di questi 25 anni. Clicca su <strong>"Avvia lo Slideshow"</strong> o su una foto qualsiasi per far partire la carrellata a schermo intero con musica e voiceover!
          </p>
        </div>

        {/* Tab Filter Navigation & Menù a tendina rapido */}
        <div className="theme-filter-bar">
          <div className="section-dropdown-box">
            <span className="dropdown-hint-label">Menù a tendina:</span>
            <select
              className="gallery-dropdown-select"
              value={activeTab}
              onChange={(e) => {
                const val = e.target.value;
                setActiveTab(val);
                if (val !== 'all') {
                  setTimeout(() => {
                    document.getElementById(`section-${val}`)?.scrollIntoView({ behavior: 'smooth' });
                  }, 80);
                }
              }}
            >
              <option value="all">🌟 Tutti i Capitoli (Mostra tutto)</option>
              {sections.map((sec) => (
                <option key={sec.id} value={sec.id}>
                  {sec.badge} — {sec.title}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-buttons-group">
            <button
              type="button"
              className={`filter-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              Tutti i capitoli 🎬
            </button>
            {sections.map((sec) => (
              <button
                key={sec.id}
                type="button"
                className={`filter-btn ${activeTab === sec.id ? 'active' : ''}`}
                onClick={() => setActiveTab(sec.id)}
              >
                {sec.badge}
              </button>
            ))}
          </div>
        </div>

        {/* Sections Content */}
        <div className="sections-container">
          {filteredSections.map((sec) => (
            <div key={sec.id} id={`section-${sec.id}`} className="thematic-block glass-card">
              <div className="thematic-block-top">
                <div className="thematic-info-left">
                  <div className="thematic-badge">{sec.badge}</div>
                  <h3 className="thematic-title">{sec.title}</h3>
                  <p className="thematic-subtitle handwritten">"{sec.subtitle}"</p>
                  <p className="thematic-desc">{sec.description}</p>
                </div>

                {/* Pulsante primario per il narratore della registrazione schermo */}
                <div className="thematic-action-right">
                  <button
                    type="button"
                    className="btn btn-primary btn-launch-slideshow animate-glow"
                    onClick={() => onStartSlideshow(sec, 0)}
                    title={`Avvia la riproduzione dello slideshow per ${sec.title}`}
                  >
                    <Play size={20} className="fill-white" />
                    <span>Avvia Slideshow ({sec.photos.length} Foto) 📽️</span>
                  </button>
                  <span className="thematic-cta-subtext">Ideale per passare alla narrazione video</span>
                </div>
              </div>

              {/* Griglia foto con preview cliccabile */}
              <div className="photo-grid">
                {sec.photos.map((photo, index) => {
                  const currentLikes = photoLikes[photo.id] !== undefined 
                    ? photoLikes[photo.id] 
                    : photo.likes;

                  return (
                    <div 
                      key={photo.id} 
                      className={`photo-card polaroid-style card-tilt-${(index % 3) + 1}`}
                      onClick={() => onStartSlideshow(sec, index)}
                    >
                      <div className="photo-thumbnail-box">
                        <img 
                          src={photo.url} 
                          alt={photo.title} 
                          className="photo-img" 
                          loading="lazy"
                        />
                        <span className="photo-corner-badge">{photo.badge}</span>
                        <div className="photo-overlay">
                          <span className="btn-zoom">
                            <Play size={16} className="fill-current" /> Guarda nello Slideshow
                          </span>
                        </div>
                      </div>

                      <div className="photo-card-info">
                        <div className="photo-meta-row">
                          <span className="photo-year-tag">{photo.year}</span>
                          <button 
                            type="button"
                            className="btn-card-like"
                            onClick={(e) => {
                              e.stopPropagation();
                              onLikePhoto(photo.id);
                            }}
                            title="Fai ridere!"
                          >
                            <Heart size={16} className={currentLikes > photo.likes ? "fill-rose text-rose" : "text-slate"} />
                            <span>{currentLikes}</span>
                          </button>
                        </div>

                        <h4 className="photo-card-title">
                          {photo.title}
                        </h4>

                        <p className="photo-card-caption handwritten">
                          «{photo.caption}»
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
