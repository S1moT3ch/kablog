import React, { useState, useEffect } from 'react';
import { 
  X, Play, BookOpen, Home, BarChart2, 
  HelpCircle, Wine, MessageSquare, CheckSquare, Film
} from 'lucide-react';

const shortTitles = {
  commercialista: "1. Il Commercialista H24",
  matematica_faidate: "2. Matematica vs Fai-da-te",
  casa_figli: "3. La Casa & i Figli",
  spesa_sabato: "4. La Spesa del Sabato",
  ierieoggi: "5. 26 Settembre vs Oggi"
};

export default function SidebarNav({ sections = [], onLaunchVideo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');

  useEffect(() => {
    const sectionIds = [
      'top',
      'statistiche',
      ...sections.map(s => `section-${s.id}`),
      'quiz',
      'brindisi',
      'guestbook'
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToId = (id, e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const handlePlayVideo = (sec, shortTitle, e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onLaunchVideo) {
      onLaunchVideo(sec.id, shortTitle);
    }
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Linguetta Fluttuante Verde Stile wikiHow */}
      <button
        type="button"
        className={`wikihow-sidebar-toggle ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Chiudi Indice" : "Indice dei Contenuti wikiHow"}
        aria-label="Indice dei Contenuti"
      >
        {isOpen ? (
          <X size={17} />
        ) : (
          <>
            <BookOpen size={15} />
            <span className="toggle-label-text">Indice Articolo</span>
          </>
        )}
      </button>

      {/* Sfondo oscurato */}
      {isOpen && (
        <div 
          className="sidebar-backdrop-overlay" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menù Laterale Indice Contenuti wikiHow */}
      <aside className={`wikihow-sidebar-drawer ${isOpen ? 'drawer-open' : ''}`}>
        <div className="wiki-sidebar-header">
          <div className="wiki-sidebar-brand">
            <span className="wiki-toc-icon">📑</span>
            <div>
              <h3 className="wiki-toc-title">Indice dei Contenuti</h3>
              <span className="wiki-toc-sub">Guida 25 Anni Insieme</span>
            </div>
          </div>
          <button 
            type="button" 
            className="wiki-sidebar-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Chiudi"
          >
            <X size={16} />
          </button>
        </div>

        <div className="wiki-sidebar-body">
          {/* Sezione Panoramica */}
          <div className="wiki-sidebar-group">
            <span className="wiki-sidebar-label">Introduzione</span>
            <ul className="wiki-sidebar-list">
              <li>
                <a 
                  href="#top" 
                  className={`wiki-sidebar-link ${activeSection === 'top' ? 'active' : ''}`}
                  onClick={(e) => scrollToId('top', e)}
                >
                  <Home size={14} />
                  <span>Inizio & Cose che Servono</span>
                </a>
              </li>
              <li>
                <a 
                  href="#statistiche" 
                  className={`wiki-sidebar-link ${activeSection === 'statistiche' ? 'active' : ''}`}
                  onClick={(e) => scrollToId('statistiche', e)}
                >
                  <BarChart2 size={14} />
                  <span>Dati & Statistiche Certificate</span>
                </a>
              </li>
            </ul>
          </div>

          {/* I 5 Metodi della Guida */}
          <div className="wiki-sidebar-group">
            <span className="wiki-sidebar-label">I 5 Metodi Illustrati</span>
            <ul className="wiki-sidebar-list">
              {sections.map((sec) => {
                const secId = `section-${sec.id}`;
                const isActive = activeSection === secId;
                const shortTitle = shortTitles[sec.id] || sec.title;

                return (
                  <li key={sec.id}>
                    <div 
                      className={`wiki-method-nav-row ${isActive ? 'active' : ''}`}
                      onClick={(e) => scrollToId(secId, e)}
                    >
                      <span className="wiki-method-nav-title" title={sec.title}>
                        {shortTitle}
                      </span>

                      {/* Bottone Tondo Verde Play che avvia VLC */}
                      <button
                        type="button"
                        className="btn-wiki-nav-play"
                        onClick={(e) => handlePlayVideo(sec, shortTitle, e)}
                        title={`Avvia il Video di ${shortTitle} in VLC`}
                      >
                        <Play size={10} className="fill-current" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sezioni di Chiusura */}
          <div className="wiki-sidebar-group">
            <span className="wiki-sidebar-label">Community & Festa</span>
            <ul className="wiki-sidebar-list">
              <li>
                <a 
                  href="#quiz" 
                  className={`wiki-sidebar-link ${activeSection === 'quiz' ? 'active' : ''}`}
                  onClick={(e) => scrollToId('quiz', e)}
                >
                  <HelpCircle size={14} />
                  <span>Domande della Community (Quiz)</span>
                </a>
              </li>
              <li>
                <a 
                  href="#brindisi" 
                  className={`wiki-sidebar-link ${activeSection === 'brindisi' ? 'active' : ''}`}
                  onClick={(e) => scrollToId('brindisi', e)}
                >
                  <Wine size={14} />
                  <span>Frasi Consigliate per il Discorso</span>
                </a>
              </li>
              <li>
                <a 
                  href="#guestbook" 
                  className={`wiki-sidebar-link ${activeSection === 'guestbook' ? 'active' : ''}`}
                  onClick={(e) => scrollToId('guestbook', e)}
                >
                  <MessageSquare size={14} />
                  <span>Recensioni dei Lettori</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="wiki-sidebar-footer">
          <span>✓ wikiHow Verified Marriage Guide</span>
        </div>
      </aside>
    </>
  );
}
