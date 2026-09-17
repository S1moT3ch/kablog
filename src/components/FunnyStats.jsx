import React, { useState } from 'react';
import { Coffee, Wrench, Award, Utensils, Luggage, Heart, Smile } from 'lucide-react';

const iconMap = {
  Coffee: Coffee,
  Wrench: Wrench,
  Award: Award,
  Utensils: Utensils,
  Luggage: Luggage,
  Heart: Heart,
};

export default function FunnyStats({ stats }) {
  const [reactions, setReactions] = useState({});

  const handleStatClick = (id) => {
    setReactions(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <section id="statistiche" className="section stats-section">
      <div className="container">
        <div className="section-header">
          <div className="badge-tag">
            <Smile size={15} />
            <span>Numeri Ufficiali e Inconfutabili</span>
          </div>
          <h2>Le Statistiche di Sopravvivenza</h2>
          <p className="subtitle">
            Un'analisi rigorosamente non scientifica di cosa è servito per raggiungere il traguardo delle Nozze d'Argento.
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((item) => {
            const IconComponent = iconMap[item.icon] || Heart;
            const extraLikes = reactions[item.id] || 0;

            return (
              <div 
                key={item.id} 
                className="stat-card glass-card"
                onClick={() => handleStatClick(item.id)}
                title="Clicca per confermare!"
              >
                <div className="stat-card-top">
                  <div className="stat-icon-wrapper">
                    <IconComponent size={24} />
                  </div>
                  {extraLikes > 0 && (
                    <span className="stat-reaction-badge animate-float">
                      👍 +{extraLikes}
                    </span>
                  )}
                </div>

                <div className="stat-value">{item.value}</div>
                <h3 className="stat-label">{item.label}</h3>
                <p className="stat-detail">{item.detail}</p>

                <div className="stat-card-footer">
                  <span className="stat-hint">Clicca per votare se ti ci ritrovi!</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
