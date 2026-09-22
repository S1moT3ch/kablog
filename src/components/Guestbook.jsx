import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ThumbsUp, ThumbsDown, MessageSquarePlus, Send, CheckCircle2, Star, ShieldCheck } from 'lucide-react';

const CATEGORY_TAGS = [
  "Consiglio Verificato",
  "Pazienza Familiare",
  "Fisco & Lavoro",
  "Matematica & Studio",
  "Spesa del Sabato",
  "Aiuto Domestico"
];

export default function Guestbook({ initialEntries }) {
  const [entries, setEntries] = useState(() => {
    try {
      const saved = localStorage.getItem('kablog_guestbook_entries');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialEntries;
  });

  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTag, setSelectedTag] = useState(CATEGORY_TAGS[0]);
  const [submitted, setSubmitted] = useState(false);
  const [helpfulVoted, setHelpfulVoted] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('kablog_guestbook_entries', JSON.stringify(entries));
    } catch {
      // ignore
    }
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const newEntry = {
      id: Date.now(),
      author: author.trim(),
      relation: relation.trim() || "Lettore Verificato di wikiHow",
      message: message.trim(),
      tag: selectedTag,
      date: "Proprio adesso",
    };

    setEntries([newEntry, ...entries]);
    setAuthor('');
    setRelation('');
    setMessage('');
    setSubmitted(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#609345', '#93b874', '#ffffff']
    });

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="guestbook" className="wikihow-guestbook-section">
      <div className="wikihow-container">
        {/* Box Valutazione wikiHow: È stato utile questo articolo? */}
        <div className="wikihow-helpful-survey-card">
          <div className="survey-text-side">
            <h3 className="survey-question">Questo articolo è stato utile?</h3>
            <p className="survey-desc">
              Aiuta lo Staff di wikiHow a valutare la resistenza di Antonio & Katia dopo 25 anni di matrimonio.
            </p>
          </div>
          <div className="survey-buttons-side">
            <button 
              type="button" 
              className={`survey-btn ${helpfulVoted === 'yes' ? 'voted-yes' : ''}`}
              onClick={() => {
                setHelpfulVoted('yes');
                confetti({ particleCount: 30, spread: 40 });
              }}
            >
              <ThumbsUp size={18} />
              <span>Sì (100%)</span>
            </button>
            <button 
              type="button" 
              className={`survey-btn ${helpfulVoted === 'no' ? 'voted-no' : ''}`}
              onClick={() => setHelpfulVoted('no')}
              title="Opzione non consentita per festeggiare le nozze d'argento!"
            >
              <ThumbsDown size={18} />
              <span>No</span>
            </button>
          </div>
        </div>

        {helpfulVoted === 'no' && (
          <div className="survey-error-alert animate-fade-in">
            ⚠️ Errore di sistema: Il voto "No" è stato annullato d'ufficio dal Commercialista e dalla Prof di Matematica! 🎉
          </div>
        )}

        <div className="wikihow-section-heading">
          <span className="wiki-badge">
            <MessageSquarePlus size={14} /> Recensioni della Community
          </span>
          <h2>Consigli e Recensioni dei Lettori</h2>
          <p className="wikihow-section-desc">
            Lascia il tuo consiglio da lettore esperto per aiutare Antonio & Katia nei prossimi 25 anni verso le Nozze d'Oro:
          </p>
        </div>

        <div className="guestbook-two-columns">
          {/* Form Inserimento Consiglio stile wikiHow */}
          <div className="guestbook-form-card">
            <h3 className="form-card-title">
              ✍️ Scrivi un Consiglio per i Lettori
            </h3>

            <form onSubmit={handleSubmit} className="wikihow-feedback-form">
              <div className="form-field">
                <label htmlFor="wiki-author-input">Il tuo Nome / Ruolo *</label>
                <input 
                  id="wiki-author-input"
                  type="text" 
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Es. Zio Mario, Collega dello Studio, Studente..." 
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="wiki-relation-input">Chi sei per la coppia?</label>
                <input 
                  id="wiki-relation-input"
                  type="text" 
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder="Es. Figlio latitante, Amico storico, Cliente..." 
                />
              </div>

              <div className="form-field">
                <label>Categoria del Consiglio</label>
                <div className="tags-pill-selector">
                  {CATEGORY_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={`tag-choice-pill ${selectedTag === tag ? 'active' : ''}`}
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="wiki-message-input">Il tuo Consiglio o Recensione *</label>
                <textarea 
                  id="wiki-message-input"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Scrivi un augurio, un consiglio o un aneddoto per i prossimi 25 anni..."
                  required
                />
              </div>

              <button type="submit" className="btn-wiki btn-wiki-primary btn-submit-tip">
                <Send size={16} />
                <span>Pubblica il Consiglio sul Manuale</span>
              </button>

              {submitted && (
                <div className="form-published-alert animate-fade-in">
                  ✓ Consiglio approvato e pubblicato con successo nella guida wikiHow!
                </div>
              )}
            </form>
          </div>

          {/* Lista Recensioni & Consigli wikiHow */}
          <div className="guestbook-reviews-column">
            <div className="reviews-list">
              {entries.map((item) => (
                <div key={item.id} className="wikihow-review-card">
                  <div className="review-top-meta">
                    <div className="reviewer-info">
                      <strong className="reviewer-name">{item.author}</strong>
                      <span className="reviewer-role">({item.relation})</span>
                    </div>
                    <span className="review-verified-pill">
                      <ShieldCheck size={13} className="text-green" /> Verificato
                    </span>
                  </div>

                  <span className="review-tag-badge">{item.tag}</span>

                  <p className="review-text-body handwritten">
                    «{item.message}»
                  </p>

                  <div className="review-bottom-footer">
                    <span className="review-date-label">{item.date}</span>
                    <span className="review-vote-note">👍 Consigliato da questo lettore</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
