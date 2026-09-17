import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Wine, Sparkles, Heart, Menu, X, ChevronDown, Film, Play, BookOpen } from 'lucide-react';

export default function Navbar({ groomName, brideName, sections = [], onStartSlideshow }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Chiudi il menù a tendina se si clicca fuori
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
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.2 },
      colors: ['#f59e0b', '#d97706', '#94a3b8', '#f43f5e', '#ffffff']
    });
  };

  const handleSelectSection = (sec, e) => {
    e.preventDefault();
    setDropdownOpen(false);
    setMobileMenuOpen(false);

    // Scorri fino alla sezione desiderata
    const el = document.getElementById(`section-${sec.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const themesEl = document.getElementById('temi');
      themesEl?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLaunchDirectSlideshow = (sec, e) => {
    e.stopPropagation();
    e.preventDefault();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onStartSlideshow) {
      onStartSlideshow(sec, 0);
    }
  };

  return (
    <header className={`navbar-wrapper ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="#top" className="navbar-logo">
          <div className="logo-ring-badge">
            💍 <span>25</span>
          </div>
          <div className="logo-text">
            <span className="logo-title">KaBlog</span>
            <span className="logo-subtitle">{groomName} & {brideName}</span>
          </div>
        </a>

        <nav className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {/* Menù a tendina per le Sezioni Tematiche */}
          <div className="nav-dropdown-wrapper" ref={dropdownRef}>
            <button
              type="button"
              className={`nav-dropdown-trigger ${dropdownOpen ? 'open' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
            >
              <BookOpen size={16} className="text-amber" />
              <span>Sezioni & Slideshow</span>
              <ChevronDown size={15} className={`chevron-icon ${dropdownOpen ? 'rotated' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="nav-dropdown-menu glass-card animate-fade-in">
                <div className="dropdown-menu-header">
                  <span className="dropdown-menu-label">Scegli un Capitolo da Esplorare:</span>
                </div>
                <div className="dropdown-items-list">
                  {sections.map((sec) => (
                    <div 
                      key={sec.id}
                      className="dropdown-item-row"
                      onClick={(e) => handleSelectSection(sec, e)}
                    >
                      <div className="dropdown-item-info">
                        <span className="dropdown-item-badge">{sec.badge}</span>
                        <h4 className="dropdown-item-title">{sec.title}</h4>
                        <span className="dropdown-item-sub">
                          {sec.photos.length} foto con voiceover
                        </span>
                      </div>

                      {/* Tasto rapido per avviare subito lo slideshow */}
                      <button
                        type="button"
                        className="btn-dropdown-play"
                        onClick={(e) => handleLaunchDirectSlideshow(sec, e)}
                        title="Avvia direttamente lo Slideshow a tutto schermo"
                      >
                        <Play size={14} className="fill-current" />
                        <span>Slideshow</span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="dropdown-menu-footer">
                  <a 
                    href="#temi" 
                    onClick={() => {
                      setDropdownOpen(false);
                      setMobileMenuOpen(false);
                    }}
                    className="dropdown-all-link"
                  >
                    Vedi tutte le sezioni insieme 🌟
                  </a>
                </div>
              </div>
            )}
          </div>

          <a href="#statistiche" onClick={() => setMobileMenuOpen(false)}>Statistiche</a>
          <a href="#quiz" onClick={() => setMobileMenuOpen(false)}>Quiz della Coppia</a>
          <a href="#brindisi" onClick={() => setMobileMenuOpen(false)}>Brindisi</a>
          <a href="#guestbook" onClick={() => setMobileMenuOpen(false)}>Muro dei Consigli</a>
        </nav>

        <div className="navbar-actions">
          <button 
            type="button" 
            className="btn btn-primary btn-toast-nav"
            onClick={triggerToastConfetti}
            title="Clicca per brindare con noi!"
          >
            <Wine size={18} />
            <span>Fai un Brindisi! 🥂</span>
          </button>

          <button 
            type="button" 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Apri menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
