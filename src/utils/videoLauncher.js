// Utility per richiamare lo script Python locale e avviare il video MP4 con VLC
export async function launchLocalVideo(sectionId) {
  // 1. Prova il server Python dedicato (porta 5005) se avviato dall'utente
  try {
    const pyRes = await fetch(`http://localhost:5005/play?section=${encodeURIComponent(sectionId)}`, {
      method: 'GET',
      mode: 'cors'
    }).catch(() => null);

    if (pyRes && pyRes.ok) {
      return await pyRes.json();
    }
  } catch {
    // ignora se non in ascolto
  }

  // 2. Chiamata diretta al server Vite
  try {
    const res = await fetch(`/api/play-video?sectionId=${encodeURIComponent(sectionId)}`);
    return await res.json();
  } catch (err) {
    console.warn('Avviso: impossibile contattare il server per avviare il video:', err);
    return { ok: false, error: err.message };
  }
}
