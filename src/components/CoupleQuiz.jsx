import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Trophy, Award, MessageCircleQuestion } from 'lucide-react';

export default function CoupleQuiz({ quizData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = quizData[currentIndex];

  const handleSelect = (option) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    
    if (option === currentQ.correct) {
      setScore(prev => prev + 1);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#609345', '#93b874', '#ffffff']
      });
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < quizData.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#609345', '#93b874', '#f59e0b', '#ffffff']
      });
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  const getDiplomaTitle = () => {
    if (score === quizData.length) return "🏆 Editore Capo Onorario di wikiHow (Livello Divino)";
    if (score >= quizData.length / 2) return "🥈 Collaboratore Verificato di wikiHow (Conosce i trucchi)";
    return "🥉 Lettore Alle Prime Armi (Deve rileggere il manuale)";
  };

  return (
    <section id="quiz" className="wikihow-qa-section">
      <div className="wikihow-container">
        <div className="wikihow-section-heading">
          <span className="wiki-badge">
            <MessageCircleQuestion size={14} /> Community Q&A
          </span>
          <h2>Domande e Risposte della Community di wikiHow</h2>
          <p className="wikihow-section-desc">
            I lettori pongono domande frequenti sulla vita con Antonio & Katia. Mettiti alla prova e indovina chi ha pronunciato queste celebri frasi!
          </p>
        </div>

        <div className="wikihow-qa-card">
          {!isFinished ? (
            <div className="qa-inner-box">
              <div className="qa-progress-bar">
                <div 
                  className="qa-progress-fill" 
                  style={{ width: `${((currentIndex + 1) / quizData.length) * 100}%` }}
                />
              </div>

              <div className="qa-header-meta">
                <span className="qa-step-badge">
                  Domanda {currentIndex + 1} di {quizData.length}
                </span>
                <span className="qa-score-pill">
                  Punteggio: {score} punti
                </span>
              </div>

              <div className="qa-question-box">
                <span className="qa-question-label">Domanda del lettore:</span>
                <p className="qa-quote handwritten">
                  «{currentQ.quote}»
                </p>
                <span className="qa-sub-hint">Chi tra Antonio e Katia ha pronunciato questa frase?</span>
              </div>

              <div className="qa-options-list">
                {currentQ.options.map((opt) => {
                  let btnClass = "qa-opt-btn";
                  if (selectedOption !== null) {
                    if (opt === currentQ.correct) {
                      btnClass += " correct";
                    } else if (opt === selectedOption) {
                      btnClass += " wrong";
                    } else {
                      btnClass += " disabled";
                    }
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      className={btnClass}
                      onClick={() => handleSelect(opt)}
                      disabled={selectedOption !== null}
                    >
                      <span>{opt}</span>
                      {selectedOption !== null && opt === currentQ.correct && (
                        <CheckCircle2 size={18} className="text-green" />
                      )}
                      {selectedOption !== null && opt === selectedOption && opt !== currentQ.correct && (
                        <XCircle size={18} className="text-red" />
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedOption !== null && (
                <div className="qa-editorial-answer animate-fade-in">
                  <div className="qa-answer-header">
                    <span className="qa-answer-tag">Risposta dell'Esperto wikiHow:</span>
                    <strong>{selectedOption === currentQ.correct ? "🎯 Risposta Esatta!" : "😅 Errore!"}</strong>
                  </div>
                  <p className="qa-answer-text">
                    {currentQ.funnyComment}
                  </p>
                  <button 
                    type="button" 
                    className="btn-wiki btn-wiki-primary"
                    onClick={handleNext}
                  >
                    {currentIndex + 1 < quizData.length ? "Prossima Domanda ➡️" : "Visualizza il tuo Titolo 🏆"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="qa-result-box text-center">
              <div className="qa-trophy-circle">
                <Trophy size={48} className="text-green" />
              </div>

              <h3>Verifica della Community Completata!</h3>
              <p className="qa-final-score-text">
                Hai risposto correttamente a <strong>{score}</strong> su <strong>{quizData.length}</strong> domande della guida.
              </p>

              <div className="qa-certificate-banner">
                <Award size={26} className="text-green" />
                <div>
                  <span className="cert-subtitle">Attestato Ufficiale di Competenze wikiHow:</span>
                  <h4 className="cert-title">{getDiplomaTitle()}</h4>
                </div>
              </div>

              <p className="qa-closing-advice">
                Ora sei ufficialmente qualificato per mediare tra un F24 e un'equazione di secondo grado!
              </p>

              <button 
                type="button" 
                className="btn-wiki btn-wiki-secondary"
                onClick={handleReset}
              >
                <RotateCcw size={16} />
                <span>Riprova il Test</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
