import confetti from 'canvas-confetti';

/**
 * Gestione ottimizzata dei coriandoli a 60 FPS:
 * 1. Rendering delegato a un Web Worker asincrono (OffscreenCanvas) per non appesantire il thread principale.
 * 2. Numero di particelle contemporanee calibrate (~350 picco massimo invece di 3.500) per evitare drop di FPS.
 * 3. Ticks ridotti (160-200 frame) per una fisica fluida e ricambio continuo.
 * 4. Cancellazione delle raffiche precedenti in caso di click ripetuti sul tasto Brindisi.
 */

let customConfettiInstance = null;
let activeIntervalId = null;
let activeTimeouts = [];

const festiveColors = [
  '#f59e0b', // Oro ambrato
  '#fbbf24', // Oro brillante caldo
  '#ffd700', // Oro zecchino
  '#ffffff', // Bianco puro / Argento brillante
  '#609345', // Verde wikiHow
  '#84cc16', // Verde brillante festivo
  '#e11d48', // Rosso festa
  '#ec4899', // Rosa acceso
  '#a855f7', // Viola regale
  '#38bdf8'  // Celeste cielo
];

const goldColors = [
  '#f59e0b', '#fbbf24', '#ffd700', '#fef08a', '#ffffff', '#e2e8f0', '#93b874'
];

function getConfettiEngine() {
  if (typeof window === 'undefined') return confetti;

  if (!customConfettiInstance) {
    try {
      let canvas = document.getElementById('kablog-confetti-canvas');
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'kablog-confetti-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '999999';
        document.body.appendChild(canvas);
      }
      customConfettiInstance = confetti.create(canvas, {
        resize: true,
        useWorker: true,
        disableForReducedMotion: true
      });
    } catch {
      customConfettiInstance = confetti;
    }
  }

  return customConfettiInstance;
}

export function clearConfetti() {
  if (activeIntervalId) {
    clearInterval(activeIntervalId);
    activeIntervalId = null;
  }
  activeTimeouts.forEach(t => clearTimeout(t));
  activeTimeouts = [];
  try {
    if (customConfettiInstance && typeof customConfettiInstance.reset === 'function') {
      customConfettiInstance.reset();
    } else if (typeof confetti.reset === 'function') {
      confetti.reset();
    }
  } catch {
    // Ignore reset errors
  }
}

export function triggerGrandConfetti() {
  // Pulisce eventuali raffiche precedenti per non sovraccaricare la memoria in caso di click multipli
  clearConfetti();

  const fire = getConfettiEngine();

  // ========================================================
  // 1. ONDA 1 (t=0): ESPLOSIONE INIZIALE FLUIDA E DIFFUSA
  // ========================================================
  // Cannone sinistro dal basso
  fire({
    particleCount: 75,
    angle: 60,
    spread: 75,
    origin: { x: 0, y: 0.8 },
    colors: festiveColors,
    startVelocity: 68,
    scalar: 1.15,
    ticks: 180,
    shapes: ['square', 'circle']
  });

  // Cannone destro dal basso
  fire({
    particleCount: 75,
    angle: 120,
    spread: 75,
    origin: { x: 1, y: 0.8 },
    colors: festiveColors,
    startVelocity: 68,
    scalar: 1.15,
    ticks: 180,
    shapes: ['square', 'circle']
  });

  // Esplosione centrale a tutto tondo
  fire({
    particleCount: 80,
    spread: 360,
    origin: { x: 0.5, y: 0.4 },
    colors: ['#ffd700', '#ffffff', '#fbbf24', '#609345', '#e11d48', '#38bdf8'],
    startVelocity: 48,
    scalar: 1.2,
    ticks: 170,
    shapes: ['square', 'circle']
  });

  // Cascata aerea dorata
  fire({
    particleCount: 45,
    spread: 120,
    origin: { x: 0.5, y: 0.08 },
    colors: goldColors,
    startVelocity: 30,
    gravity: 0.85,
    scalar: 1.1,
    ticks: 200
  });

  // ========================================================
  // 2. ONDA 2: RAFFICA CONTINUA A BASSO IMPATTO CPU (~2.2s)
  // ========================================================
  const startTime = Date.now();
  const duration = 2200;

  activeIntervalId = setInterval(() => {
    const elapsed = Date.now() - startTime;
    if (elapsed > duration) {
      clearInterval(activeIntervalId);
      activeIntervalId = null;
      return;
    }

    // Mini getto sinistro
    fire({
      particleCount: 22,
      angle: 55 + Math.random() * 20,
      spread: 50,
      origin: { x: 0.02, y: 0.75 + Math.random() * 0.1 },
      colors: festiveColors,
      startVelocity: 55 + Math.random() * 15,
      scalar: 1.05,
      ticks: 150,
      shapes: ['square', 'circle']
    });

    // Mini getto destro
    fire({
      particleCount: 22,
      angle: 125 - Math.random() * 20,
      spread: 50,
      origin: { x: 0.98, y: 0.75 + Math.random() * 0.1 },
      colors: festiveColors,
      startVelocity: 55 + Math.random() * 15,
      scalar: 1.05,
      ticks: 150,
      shapes: ['square', 'circle']
    });

    // Piccolo fuoco d'artificio casuale
    if (Math.random() > 0.4) {
      fire({
        particleCount: 26,
        spread: 90,
        origin: { 
          x: 0.25 + Math.random() * 0.5, 
          y: 0.2 + Math.random() * 0.25 
        },
        colors: goldColors,
        startVelocity: 35,
        gravity: 0.9,
        scalar: 1.1,
        ticks: 160
      });
    }
  }, 260);

  // ========================================================
  // 3. ONDA 3: FINALE DORATO A CASCATA (t=1200ms e t=1800ms)
  // ========================================================
  const t1 = setTimeout(() => {
    fire({
      particleCount: 65,
      spread: 140,
      origin: { x: 0.35, y: 0.2 },
      colors: goldColors,
      startVelocity: 34,
      gravity: 0.8,
      scalar: 1.15,
      ticks: 180
    });
  }, 1100);

  const t2 = setTimeout(() => {
    fire({
      particleCount: 70,
      spread: 150,
      origin: { x: 0.65, y: 0.2 },
      colors: ['#ffd700', '#ffffff', '#fbbf24', '#609345', '#e11d48'],
      startVelocity: 36,
      gravity: 0.8,
      scalar: 1.2,
      ticks: 190
    });
  }, 1700);

  activeTimeouts.push(t1, t2);
}
