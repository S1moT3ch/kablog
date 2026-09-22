import confetti from 'canvas-confetti';

/**
 * Effetto coriandoli appariscente e spettacolare a più stadi:
 * - ONDA 1: Cannoni simultanei da sinistra e destra ad alta velocità verso il centro
 * - ONDA 2: Esplosione radiale dorata e argentata al centro dello schermo
 * - ONDA 3: Fuochi d'artificio ritardati in quota a ventaglio
 * - ONDA 4: Cascata pirotecnica di glitter e stelle
 */
export function triggerGrandConfetti() {
  const festiveColors = [
    '#f59e0b', // Oro ambrato
    '#fbbf24', // Oro caldo brillante
    '#ffffff', // Bianco brillante / Argento
    '#609345', // Verde iconico wikiHow
    '#93b874', // Verde salvia chiaro
    '#e11d48', // Rosso festa
    '#ec4899', // Rosa acceso
    '#38bdf8'  // Celeste cielo
  ];

  // 1. CANNONI LATERALI: sparano verso l'interno ad arco con alta velocità
  confetti({
    particleCount: 130,
    angle: 60,
    spread: 75,
    origin: { x: 0, y: 0.75 },
    colors: festiveColors,
    startVelocity: 68,
    scalar: 1.15
  });

  confetti({
    particleCount: 130,
    angle: 120,
    spread: 75,
    origin: { x: 1, y: 0.75 },
    colors: festiveColors,
    startVelocity: 68,
    scalar: 1.15
  });

  // 2. ESPLOSIONE CENTRALE: scoppio a tutto tondo
  confetti({
    particleCount: 160,
    spread: 130,
    origin: { x: 0.5, y: 0.5 },
    colors: ['#ffd700', '#ffffff', '#fbbf24', '#609345', '#f43f5e', '#a855f7'],
    startVelocity: 48,
    scalar: 1.2
  });

  // 3. SECONDA ONDATA (dopo 260ms): fuochi d'artificio intermedi
  setTimeout(() => {
    confetti({
      particleCount: 95,
      angle: 70,
      spread: 80,
      origin: { x: 0.15, y: 0.65 },
      colors: festiveColors,
      startVelocity: 58
    });

    confetti({
      particleCount: 95,
      angle: 110,
      spread: 80,
      origin: { x: 0.85, y: 0.65 },
      colors: festiveColors,
      startVelocity: 58
    });
  }, 260);

  // 4. TERZA ONDATA (dopo 520ms): cascata aerea ad effetto pioggia dorata/argentata
  setTimeout(() => {
    confetti({
      particleCount: 140,
      spread: 160,
      origin: { x: 0.5, y: 0.3 },
      colors: ['#f59e0b', '#fbbf24', '#ffffff', '#e2e8f0', '#93b874'],
      startVelocity: 35,
      gravity: 0.85,
      scalar: 1.1
    });
  }, 520);
}
