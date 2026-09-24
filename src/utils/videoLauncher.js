// Utility per avviare istantaneamente i video MP4 con VLC
export async function launchLocalVideo(sectionId) {
  // 1. Chiamata diretta e immediata all'endpoint locale Vite (same-origin, latenza immediata < 10ms)
  try {
    const res = await fetch(`/api/play-video?sectionId=${encodeURIComponent(sectionId)}`);
    if (res.ok) {
      const data = await res.json();
      console.log('[VLC] Risposta API Vite:', data);
      if (data && data.ok) {
        return data;
      }
    }
  } catch (err) {
    console.warn('[VLC] Endpoint Vite non raggiungibile, provo server Python:', err.message);
  }

  // 2. Chiamata di fallback al server Python dedicato (IPv4 127.0.0.1 porta 5005 con timeout rapido)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);

    const pyRes = await fetch(`http://127.0.0.1:5005/play?section=${encodeURIComponent(sectionId)}`, {
      method: 'GET',
      mode: 'cors',
      signal: controller.signal
    }).catch(() => null);

    clearTimeout(timeoutId);

    if (pyRes && pyRes.ok) {
      const pyData = await pyRes.json();
      console.log('[VLC] Risposta server Python 5005:', pyData);
      return pyData;
    }
  } catch (err) {
    console.warn('[VLC] Server Python porta 5005 non disponibile:', err.message);
  }

  return { ok: false, error: 'Impossibile avviare il video tramite VLC' };
}
