import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Trophy, Award } from 'lucide-react';

export default function CoupleQuiz({ quizData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = quizData[currentIndex];

  const handleSelect = (option) => {
    if (selectedOption !== null) return; // già risposto a questa domanda
    setSelectedOption(option);
    
    if (option === currentQ.correct) {
      setScore(prev => prev + 1);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
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
        origin: { y: 0.5 }
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
    if (score === quizData.length) return "🏆 Esperto Assoluto della Famiglia (Livello Divino)";
    if (score >= quizData.length / 2) return "🥈 Amico Fidato (Conosce i trucchi del mestiere)";
    return "🥉 Ospite Innocente (Ha ancora tanto da imparare)";
  };

  return (
    <section id="quiz" className="section quiz-section">
      <div className="container">
        <div className="section-header">
          <div className="badge-tag">
            <HelpCircle size={15} />
            <span>Gioco Interattivo per gli Invitati</span>
          </div>
          <h2>Chi ha detto cosa? 🕵️‍♂️</h2>
          <p className="subtitle">
            Pensi di conoscere bene la coppia festeggiata? Mettiti alla prova con le frasi storiche pronunciate in questi 25 anni!
          </p>
        </div>

        <div className="quiz-card-wrapper">
          {!isFinished ? (
            <div className="quiz-box glass-card">
              <div className="quiz-progress-bar">
                <div 
                  className="quiz-progress-fill" 
                  style={{ width: `${((currentIndex + 1) / quizData.length) * 100}%` }}
                ></div>
              </div>

              <div className="quiz-header-meta">
                <span className="quiz-step">Domanda {currentIndex + 1} di {quizData.length}</span>
                <span className="quiz-score-pill">Punti: {score}</span>
              </div>

              <div className="quiz-question-box">
                <p className="quiz-quote handwritten">
                  {currentQ.quote}
                </p>
              </div>

              <div className="quiz-options-list">
                {currentQ.options.map((opt) => {
                  let btnClass = "quiz-opt-btn";
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
                        <CheckCircle2 size={20} className="status-icon" />
                      )}
                      {selectedOption !== null && opt === selectedOption && opt !== currentQ.correct && (
                        <XCircle size={20} className="status-icon" />
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedOption !== null && (
                <div className="quiz-feedback-box animate-float">
                  <p className="quiz-feedback-text">
                    <strong>{selectedOption === currentQ.correct ? "🎯 Esatto!" : "😅 Ahia!"}</strong> {currentQ.funnyComment}
                  </p>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleNext}
                  >
                    {currentIndex + 1 < quizData.length ? "Prossima Domanda ➡️" : "Scopri il tuo Titolo 🏆"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="quiz-result-box glass-card text-center">
              <div className="quiz-trophy-icon">
                <Trophy size={64} className="text-amber animate-glow" />
              </div>

              <h3>Quiz Completato!</h3>
              <div className="quiz-final-score">
                Hai indovinato <strong>{score}</strong> su <strong>{quizData.length}</strong> frasi!
              </div>

              <div className="quiz-certificate">
                <Award size={24} className="text-amber" />
                <div>
                  <span className="diploma-label">Titolo Ufficiale di Laurea:</span>
                  <p className="diploma-title">{getDiplomaTitle()}</p>
                </div>
              </div>

              <p className="quiz-closing-msg">
                Ora puoi andare al banchetto con la coscienza a posto... oppure sfidare chi è seduto vicino a te al tavolo!
              </p>

              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleReset}
              >
                <RotateCcw size={18} />
                <span>Ricomincia il Quiz</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
