import React, { useState } from 'react';
import { Award, Coffee, Wrench, Heart, Luggage, Utensils, CheckCircle2, BarChart2 } from 'lucide-react';

const iconMap = {
  Award: Award,
  Coffee: Coffee,
  Wrench: Wrench,
  Heart: Heart,
  Luggage: Luggage,
  Utensils: Utensils,
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
    <section id="statistiche" className="wikihow-stats-section">
      <div className="wikihow-container">
        <div className="wikihow-section-heading">
          <span className="wiki-badge">
            <BarChart2 size={14} /> Dati Sperimentali
          </span>
          <h2>Dati e Statistiche Certificate dal Metodo</h2>
          <p className="wikihow-section-desc">
            Riepilogo delle metriche ufficiali rilevate dallo staff durante i 25 anni di sperimentazione sul campo:
          </p>
        </div>

        <div className="wikihow-stats-grid">
          {stats.map((item) => {
            const IconComponent = iconMap[item.icon] || Heart;
            const extraLikes = reactions[item.id] || 0;

            return (
              <div 
                key={item.id} 
                className="wikihow-stat-card"
                onClick={() => handleStatClick(item.id)}
                title="Clicca per confermare il dato!"
              >
                <div className="stat-card-topbar">
                  <div className="stat-icon-box">
                    <IconComponent size={20} />
                  </div>
                  <span className="stat-cert-badge">
                    <CheckCircle2 size={12} /> Certificato
                  </span>
                </div>

                <div className="stat-number">{item.value}</div>
                <h3 className="stat-title">{item.label}</h3>
                <p className="stat-explanation">{item.detail}</p>

                <div className="stat-action-footer">
                  <span className="stat-vote-pill">
                    {extraLikes > 0 ? `👍 Approvato da te (+${extraLikes})` : "Clicca per confermare"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
