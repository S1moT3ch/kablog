import React, { useState, useEffect } from 'react';
import { 
  X, Play, BookOpen, Home, BarChart2, 
  HelpCircle, Wine, MessageSquare, ChevronRight
} from 'lucide-react';

// Nomi brevi e compatti per il menù laterale
const shortTitles = {
  commercialista: "Antonio Commercialista H24",
  matematica_faidate: "Katia Matematica vs Fai-da-te",
  casa_figli: "Casa & Figli (Simone e Andrea)",
  spesa_sabato: "La Spesa del Sabato",
  ierieoggi: "26 Settembre vs Oggi (25 Anni)"
};

export default function SidebarNav({ sections = [], onStartSlideshow }) {
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

  const handleQuickSlideshow = (sec, e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onStartSlideshow) {
      onStartSlideshow(sec, 0);
    }
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Pulsante Fluttuante Compatto sul bordo sinistro */}
      <button
        type="button"
        className={`sidebar-compact-toggle ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Chiudi menù" : "Indice veloce dei capitoli"}
        aria-label="Menù laterale"
      >
        {isOpen ? (
          <X size={18} />
        ) : (
          <>
            <BookOpen size={16} className="text-amber" />
            <span className="compact-toggle-label">Indice</span>
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

      {/* Menù Laterale Compatto (Drawer snello da 265px) */}
      <aside className={`sidebar-compact-drawer ${isOpen ? 'drawer-open' : ''}`}>
        <div className="compact-sidebar-header">
          <div className="compact-brand">
            <span className="compact-ring">💍</span>
            <span className="compact-brand-title">KaBlog 25</span>
          </div>
          <button 
            type="button" 
            className="compact-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Chiudi"
          >
            <X size={16} />
          </button>
        </div>

        <div className="compact-sidebar-body">
          {/* Panoramica */}
          <div className="compact-group">
            <span className="compact-group-label">Panoramica</span>
            <ul className="compact-list">
              <li>
                <a 
                  href="#top" 
                  className={`compact-link ${activeSection === 'top' ? 'active' : ''}`}
                  onClick={(e) => scrollToId('top', e)}
                >
                  <Home size={15} />
                  <span>Inizio & Copertina</span>
                </a>
              </li>
              <li>
                <a 
                  href="#statistiche" 
                  className={`compact-link ${activeSection === 'statistiche' ? 'active' : ''}`}
                  onClick={(e) => scrollToId('statistiche', e)}
                >
                  <BarChart2 size={15} />
                  <span>Statistiche 25 Anni</span>
                </a>
              </li>
            </ul>
          </div>

          {/* I 5 Capitoli Tematici */}
          <div className="compact-group">
            <span className="compact-group-label">I 5 Capitoli</span>
            <ul className="compact-list">
              {sections.map((sec, idx) => {
                const secId = `section-${sec.id}`;
                const isActive = activeSection === secId;
                const shortTitle = shortTitles[sec.id] || sec.title;

                return (
                  <li key={sec.id}>
                    <div 
                      className={`compact-chapter-row ${isActive ? 'active' : ''}`}
                      onClick={(e) => scrollToId(secId, e)}
                    >
                      <div className="compact-chapter-info">
                        <span className="compact-idx">#{idx + 1}</span>
                        <span className="compact-chapter-name" title={sec.title}>
                          {shortTitle}
                        </span>
                      </div>

                      {/* Tasto Play compatto per lo Slideshow */}
                      <button
                        type="button"
                        className="compact-play-btn"
                        onClick={(e) => handleQuickSlideshow(sec, e)}
                        title={`Avvia Slideshow: ${shortTitle}`}
                      >
                        <Play size={11} className="fill-current" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Per la Festa */}
          <div className="compact-group">
            <span className="compact-group-label">Per la Festa</span>
            <ul className="compact-list">
              <li>
                <a 
                  href="#quiz" 
                  className={`compact-link ${activeSection === 'quiz' ? 'active' : ''}`}
                  onClick={(e) => scrollToId('quiz', e)}
                >
                  <HelpCircle size={15} />
                  <span>Quiz della Coppia</span>
                </a>
              </li>
              <li>
                <a 
                  href="#brindisi" 
                  className={`compact-link ${activeSection === 'brindisi' ? 'active' : ''}`}
                  onClick={(e) => scrollToId('brindisi', e)}
                >
                  <Wine size={15} />
                  <span>Generatore Brindisi</span>
                </a>
              </li>
              <li>
                <a 
                  href="#guestbook" 
                  className={`compact-link ${activeSection === 'guestbook' ? 'active' : ''}`}
                  onClick={(e) => scrollToId('guestbook', e)}
                >
                  <MessageSquare size={15} />
                  <span>Muro dei Consigli</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="compact-sidebar-footer">
          <span>💍 Antonio & Katia (2001 - 2026)</span>
        </div>
      </aside>
    </>
  );
}
