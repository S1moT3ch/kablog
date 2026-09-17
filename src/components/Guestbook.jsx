import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MessageSquarePlus, Send, Pin, Sparkles, Heart } from 'lucide-react';

const STICKER_TAGS = [
  "❤️ Tanto Amore",
  "🍷 Più Vino!",
  "🧯 Estintore da Cucina",
  "🏝️ Fuga ai Caraibi",
  "🧘 Pazienza Zen",
  "🛋️ Divano & Serie TV"
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
  const [selectedTag, setSelectedTag] = useState(STICKER_TAGS[0]);
  const [submitted, setSubmitted] = useState(false);

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
      relation: relation.trim() || "Ospite d'onore",
      message: message.trim(),
      tag: selectedTag,
      date: "Proprio adesso!",
    };

    setEntries([newEntry, ...entries]);
    setAuthor('');
    setRelation('');
    setMessage('');
    setSubmitted(true);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="guestbook" className="section guestbook-section">
      <div className="container">
        <div className="section-header">
          <div className="badge-tag">
            <MessageSquarePlus size={15} />
            <span>Spazio Aperto a Tutti</span>
          </div>
          <h2>Il Muro dei Consigli per i Prossimi 25 Anni 📌</h2>
          <p className="subtitle">
            Lascia un augurio sincero, un aneddoto imbarazzante o un consiglio non richiesto per aiutarli ad arrivare alle Nozze d'Oro!
          </p>
        </div>

        <div className="guestbook-layout">
          {/* Form per scrivere */}
          <div className="guestbook-form-card glass-card">
            <h3 className="form-title">
              <Pin size={20} className="text-amber" />
              Attacca il tuo Post-it
            </h3>

            <form onSubmit={handleSubmit} className="guestbook-form">
              <div className="form-group">
                <label htmlFor="author-input">Il tuo Nome / Soprannome *</label>
                <input 
                  id="author-input"
                  type="text" 
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Es. Zia Maria, Gli amici del calcetto..." 
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="relation-input">Chi sei per la coppia?</label>
                <input 
                  id="relation-input"
                  type="text" 
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder="Es. Cugino, Testimone, Amico complice..." 
                />
              </div>

              <div className="form-group">
                <label>Scegli lo Sticker del messaggio</label>
                <div className="sticker-selector">
                  {STICKER_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={`sticker-choice-btn ${selectedTag === tag ? 'active' : ''}`}
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message-input">Il tuo Augurio o Consiglio *</label>
                <textarea 
                  id="message-input"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Scrivi una battuta, un ricordo o il segreto per sopravvivere ad altri 25 anni..."
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                <Send size={18} />
                <span>Affiggi sul Muro! 🎈</span>
              </button>

              {submitted && (
                <div className="form-success-banner animate-float">
                  ✨ Messaggio affisso con successo! Grazie per l'augurio!
                </div>
              )}
            </form>
          </div>

          {/* Bacheca dei post-it */}
          <div className="guestbook-wall">
            <div className="sticky-notes-grid">
              {entries.map((item, idx) => (
                <div 
                  key={item.id} 
                  className={`sticky-note note-color-${(idx % 4) + 1} note-tilt-${(idx % 3) + 1}`}
                >
                  <div className="sticky-pin">📍</div>
                  <div className="sticky-tag">{item.tag}</div>
                  <p className="sticky-message handwritten">
                    "{item.message}"
                  </p>
                  <div className="sticky-footer">
                    <div>
                      <strong className="sticky-author">{item.author}</strong>
                      <span className="sticky-relation">{item.relation}</span>
                    </div>
                    <span className="sticky-date">{item.date}</span>
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
