import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Wine, Search, ChevronDown, Play, BookOpen, Menu, X, CheckCircle2 } from 'lucide-react';

export default function Navbar({ groomName, brideName, sections = [], onLaunchVideo, onBrindisi }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFeedback, setSearchFeedback] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerToastConfetti = () => {
    if (onBrindisi) {
      onBrindisi();
    } else {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.2 }
      });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchFeedback(true);
    setTimeout(() => setSearchFeedback(false), 2800);
    // Scrolla alla prima sezione o ai capitoli
    const el = document.getElementById('temi');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (secId, e) => {
    e.preventDefault();
    setDropdownOpen(false);
    const el = document.getElementById(`section-${secId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLaunchVideo = (sec, e) => {
    e.stopPropagation();
    e.preventDefault();
    setDropdownOpen(false);
    if (onLaunchVideo) {
      onLaunchVideo(sec.id, sec.title);
    }
  };

  return (
    <header className="wikihow-header-wrapper">
      {/* Barra Verde Superiore Ufficiale wikiHow */}
      <div className="wikihow-topbar">
        <div className="wikihow-container wikihow-topbar-inner">
          {/* Logo wikiHow iconico */}
          <a href="#top" className="wikihow-logo" title="wikiHow to Survive 25 Anni">
            <span className="logo-wiki">wiki</span>
            <span className="logo-how">How</span>
            <span className="logo-tagline">to Survive</span>
          </a>

          {/* Barra di Ricerca Spiritosa wikiHow */}
          <form onSubmit={handleSearchSubmit} className="wikihow-search-box">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca come gestire Simone e Andrea, o le scadenze F24..." 
              className="wikihow-search-input"
            />
            <button type="submit" className="wikihow-search-btn">
              Cerca
            </button>
            {searchFeedback && (
              <span className="search-popup-tip animate-fade-in">
                💡 Risultato: Nessun manuale al mondo può prepararti a questo! Scorri in basso!
              </span>
            )}
          </form>

          {/* Tasto Brindisi Ufficiale */}
          <div className="wikihow-top-actions">
            <button 
              type="button" 
              className="btn-wiki btn-wiki-toast"
              onClick={triggerToastConfetti}
              title="Stappa lo spumante e festeggia!"
            >
              <Wine size={16} />
              <span>Brindisi 🥂</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sottobarra Breadcrumbs & Indice Metodi */}
      <div className="wikihow-subbar">
        <div className="wikihow-container wikihow-subbar-inner">
          <nav className="wikihow-breadcrumbs" aria-label="Breadcrumb">
            <a href="#top">wikiHow</a>
            <span className="breadcrumb-separator">»</span>
            <a href="#statistiche">Famiglia & Relazioni</a>
            <span className="breadcrumb-separator">»</span>
            <a href="#temi">Matrimonio</a>
            <span className="breadcrumb-separator">»</span>
            <span className="breadcrumb-current">25 Anni: {groomName} & {brideName}</span>
          </nav>

          {/* Menù a Tendina Metodi della Guida */}
          <div className="wikihow-methods-dropdown" ref={dropdownRef}>
            <button 
              type="button" 
              className={`methods-dropdown-btn ${dropdownOpen ? 'active' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <BookOpen size={14} className="text-green" />
              <span>Indice dei 5 Metodi</span>
              <ChevronDown size={14} className={`dropdown-chevron ${dropdownOpen ? 'open' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="methods-dropdown-menu animate-fade-in">
                <div className="methods-menu-header">
                  <strong>I 5 Metodi Ufficiali di Sopravvivenza:</strong>
                </div>
                <div className="methods-list">
                  {sections.map((sec, idx) => (
                    <div 
                      key={sec.id} 
                      className="methods-menu-item"
                      onClick={(e) => scrollToSection(sec.id, e)}
                    >
                      <div className="methods-item-text">
                        <span className="methods-step-num">Metodo {idx + 1}</span>
                        <span className="methods-title">{sec.title.split(':')[0]}</span>
                      </div>
                      <button
                        type="button"
                        className="btn-wiki-nav-play"
                        onClick={(e) => handleLaunchVideo(sec, e)}
                        title="Avvia il Video in VLC"
                      >
                        <Play size={10} className="fill-current" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
