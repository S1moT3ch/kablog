#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script per il lancio automatico di video MP4 associati alle sezioni di KaBlog.
Ricerca automatica di VLC Media Player con avvio a schermo intero.
Funziona sia come comando singolo sia come server locale (se avviato con doppio clic).
"""

import sys
import os
import shutil
import subprocess
import argparse
import threading
import time
import ctypes
from pathlib import Path

# Assicura supporto UTF-8 per l'output su console Windows
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Cartella radice del progetto
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
VIDEOS_DIR = PROJECT_ROOT / "videos"

# Mappa ID Sezione -> Nomi di file candidati supportati (in ordine di priorità)
SECTION_CANDIDATES = {
    "commercialista": [
        "commercialista.mp4", "antonio.mp4", "metodo1.mp4", "metodo_1.mp4", "1.mp4"
    ],
    "matematica_faidate": [
        "matematica_faidate.mp4", "matematica.mp4", "faidate.mp4", "katia.mp4", "bricolage.mp4", "metodo2.mp4", "metodo_2.mp4", "2.mp4"
    ],
    "casa_figli": [
        "casa_figli.mp4", "casa.mp4", "figli.mp4", "simone_andrea.mp4", "divano.mp4", "metodo3.mp4", "metodo_3.mp4", "3.mp4"
    ],
    "spesa_sabato": [
        "spesa_sabato.mp4", "spesa.mp4", "sabato.mp4", "supermercato.mp4", "metodo4.mp4", "metodo_4.mp4", "4.mp4"
    ],
    "ierieoggi": [
        "ierioggi.mp4", "ierieoggi.mp4", "ieri_oggi.mp4", "ieri_e_oggi.mp4", "nozze.mp4", "matrimonio.mp4", "25anni.mp4", "metodo5.mp4", "metodo_5.mp4", "5.mp4"
    ]
}

def find_vlc():
    """Cerca l'eseguibile di VLC nei percorsi tipici di Windows e nel PATH."""
    # 0. Controlla variabile d'ambiente personalizzata
    custom_vlc = os.environ.get("VLC_PATH")
    if custom_vlc and os.path.isfile(custom_vlc):
        return custom_vlc

    # 1. Controlla nel PATH di sistema
    vlc_in_path = shutil.which("vlc") or shutil.which("vlc.exe")
    if vlc_in_path:
        return vlc_in_path

    # 2. Percorsi standard su Windows
    candidate_paths = [
        r"C:\Program Files\VideoLAN\VLC\vlc.exe",
        r"C:\Program Files (x86)\VideoLAN\VLC\vlc.exe",
        os.path.expandvars(r"%ProgramFiles%\VideoLAN\VLC\vlc.exe"),
        os.path.expandvars(r"%ProgramFiles(x86)%\VideoLAN\VLC\vlc.exe"),
        os.path.expandvars(r"%LOCALAPPDATA%\Programs\VideoLAN\VLC\vlc.exe"),
        os.path.expandvars(r"%LOCALAPPDATA%\VLC\vlc.exe"),
    ]

    for p in candidate_paths:
        if p and os.path.isfile(p):
            return p

    return None

def resolve_video_file(section_key):
    """Cerca il file video tra i candidati ufficiali o cerca corrispondenze parziali nella cartella videos."""
    VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
    candidates = SECTION_CANDIDATES.get(section_key, [f"{section_key}.mp4"])

    # 1. Cerca corrispondenza esatta tra i candidati
    for name in candidates:
        target = VIDEOS_DIR / name
        if target.exists():
            return target

    # 2. Cerca corrispondenza case-insensitive nella cartella
    try:
        existing_files = list(VIDEOS_DIR.glob("*.mp4"))
        for f in existing_files:
            for name in candidates:
                if f.name.lower() == name.lower():
                    return f
        # 3. Match parziale sul nome
        for f in existing_files:
            if section_key.lower() in f.name.lower():
                return f
    except Exception:
        pass

    # Se non trovato, restituisce il candidato principale per il messaggio d'errore
    return VIDEOS_DIR / candidates[0]

def unblock_file(file_path):
    """Rimuove il blocco di Windows (Zone.Identifier) dai file scaricati."""
    if sys.platform == "win32":
        try:
            subprocess.run(
                ["powershell", "-Command", f"Unblock-File -LiteralPath '{file_path}'"],
                capture_output=True,
                creationflags=0x08000000
            )
        except Exception:
            pass

def bring_vlc_to_front():
    """Forza la finestra di VLC in primo piano assoluto sopra Chrome e le altre finestre."""
    if sys.platform != "win32":
        return

    def _worker():
        try:
            user32 = ctypes.windll.user32
            # Intercetta la finestra di VLC nei primi 3 secondi dall'apertura
            for _ in range(15):
                time.sleep(0.2)
                found = []

                def _enum_cb(hwnd, lparam):
                    if user32.IsWindowVisible(hwnd):
                        length = user32.GetWindowTextLengthW(hwnd)
                        if length > 0:
                            buff = ctypes.create_unicode_buffer(length + 1)
                            user32.GetWindowTextW(hwnd, buff, length + 1)
                            t = buff.value
                            if "vlc" in t.lower():
                                found.append(hwnd)
                    return True

                WNDENUMPROC = ctypes.WINFUNCTYPE(ctypes.c_bool, ctypes.c_int, ctypes.c_int)
                user32.EnumWindows(WNDENUMPROC(_enum_cb), 0)

                if found:
                    for hwnd in found:
                        # HWND_TOPMOST = -1, SWP_NOMOVE = 2, SWP_NOSIZE = 1, SWP_SHOWWINDOW = 0x0040
                        user32.ShowWindow(hwnd, 3) # SW_MAXIMIZE = 3
                        user32.SetWindowPos(hwnd, -1, 0, 0, 0, 0, 0x0001 | 0x0002 | 0x0040)
                        user32.BringWindowToTop(hwnd)
                        user32.SetForegroundWindow(hwnd)
                    break
        except Exception:
            pass

def refocus_browser(target_hwnd=None):
    """Riporta il focus sulla finestra del browser web al termine del video."""
    if sys.platform != "win32":
        return

    try:
        user32 = ctypes.windll.user32
        hwnd_to_focus = target_hwnd

        # Se non avevamo il riferimento o non è più valido, cerca la finestra del browser
        if not hwnd_to_focus or not user32.IsWindow(hwnd_to_focus):
            candidates = []
            def _find_browser(hwnd, lparam):
                if user32.IsWindowVisible(hwnd):
                    length = user32.GetWindowTextLengthW(hwnd)
                    if length > 0:
                        buff = ctypes.create_unicode_buffer(length + 1)
                        user32.GetWindowTextW(hwnd, buff, length + 1)
                        t = buff.value.lower()
                        # Finestre del browser con il blog
                        if any(k in t for k in ["wikihow", "kablog", "5173", "chrome", "edge"]):
                            candidates.append(hwnd)
                return True

            WNDENUMPROC = ctypes.WINFUNCTYPE(ctypes.c_bool, ctypes.c_int, ctypes.c_int)
            user32.EnumWindows(WNDENUMPROC(_find_browser), 0)
            if candidates:
                hwnd_to_focus = candidates[0]

        if hwnd_to_focus:
            time.sleep(0.2)
            # Sblocca il blocco di Windows premendo e rilasciando un ALT virtuale
            user32.keybd_event(0x12, 0, 0, 0)
            user32.keybd_event(0x12, 0, 2, 0)
            # SW_MAXIMIZE = 3: ingrandisce la finestra occupando l'intero schermo senza rimpicciolirla
            user32.ShowWindow(hwnd_to_focus, 3)
            user32.BringWindowToTop(hwnd_to_focus)
            user32.SetForegroundWindow(hwnd_to_focus)
    except Exception:
        pass

def play_video(video_path):
    """Avvia il video con VLC (schermo intero), chiudendosi al termine e riportando il focus sul sito."""
    video_path = Path(video_path).resolve()

    if not video_path.exists():
        print(f"\n[ERRORE] File video non trovato:")
        print(f" -> Percorso cercato: {video_path}")
        print(f" -> Posiziona il file MP4 nella cartella: {VIDEOS_DIR}")
        return False

    # Memorizza la finestra che aveva il focus prima di avviare il video (il browser web)
    prev_hwnd = None
    if sys.platform == "win32":
        try:
            prev_hwnd = ctypes.windll.user32.GetForegroundWindow()
        except Exception:
            pass

    # Sblocca il file da eventuali blocchi SmartScreen di Windows
    unblock_file(video_path)

    vlc_path = find_vlc()

    if vlc_path:
        print(f"\n[OK] Avvio VLC Media Player a schermo intero (in primo piano):")
        print(f" -> Eseguibile VLC: {vlc_path}")
        print(f" -> File video:    {video_path.name}")
        
        # Parametri VLC:
        # --fullscreen: a tutto schermo
        # --video-on-top: sempre in primo piano
        # --play-and-exit: chiude automaticamente VLC appena il video finisce
        cmd = [
            vlc_path,
            "--fullscreen",
            "--video-on-top",
            "--play-and-exit",
            "--no-video-title-show",
            "--no-qt-privacy-ask",
            str(video_path)
        ]
        
        creation_flags = 0
        if sys.platform == "win32":
            creation_flags = 0x00000200

        proc = subprocess.Popen(
            cmd,
            creationflags=creation_flags,
            shell=False
        )

        # 1. Porta attivamente VLC in primo piano sopra tutte le altre finestre
        bring_vlc_to_front()

        # 2. Attende il termine del video e ripristina il focus sul browser
        def _wait_and_refocus():
            try:
                proc.wait()
                print(f"\n[FINE VIDEO] Video terminato: VLC chiuso, ripristino focus sul sito web...")
                refocus_browser(prev_hwnd)
            except Exception:
                pass

        threading.Thread(target=_wait_and_refocus, daemon=True).start()
        return True
    else:
        print(f"\n[AVVISO] VLC non individuato nei percorsi standard.")
        print(f" -> Avvio con il lettore multimediale predefinito di Windows...")
        try:
            os.startfile(str(video_path))
            return True
        except Exception as e:
            print(f"[ERRORE] Impossibile avviare il file: {e}")
            return False

def run_server(port=5005):
    """Avvia un server HTTP locale che rimane in ascolto dei click dal sito web."""
    from http.server import HTTPServer, BaseHTTPRequestHandler
    import urllib.parse

    class VideoRequestHandler(BaseHTTPRequestHandler):
        def do_OPTIONS(self):
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()

        def do_GET(self):
            parsed = urllib.parse.urlparse(self.path)
            if parsed.path.startswith('/play') or parsed.path.startswith('/api/play'):
                params = urllib.parse.parse_qs(parsed.query)
                sec = params.get('section', params.get('sectionId', ['commercialista']))[0]
                print(f"\n[CLICK DAL SITO] Avvio video per: '{sec}'")
                target = resolve_video_file(sec)
                ok = play_video(target)
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(b'{"ok": true}')
            else:
                self.send_response(200)
                self.send_header('Content-Type', 'text/plain; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(b"KaBlog Video Server Attivo")

        def log_message(self, format, *args):
            pass

    server = HTTPServer(('localhost', port), VideoRequestHandler)
    print("\n" + "=" * 60)
    print("🎬 KABLOG VLC SERVER ATTIVO")
    print(f"📡 In ascolto su: http://localhost:{port}")
    print("=" * 60)
    print("✓ Lascia aperta questa finestra!")
    print("✓ Quando clicchi 'Riproduci Video (VLC)' nel sito web,")
    print("  VLC si aprira' istantaneamente a tutto schermo.")
    print("=" * 60)
    print("Stato dei file video in 'videos/':")
    for sec, candidates in SECTION_CANDIDATES.items():
        resolved = resolve_video_file(sec)
        st = "PRESENTE [OK]" if resolved.exists() else "NON TROVATO"
        print(f"  [{st:13}] {sec:20} -> {resolved.name}")
    print("=" * 60)
    print("Premi Ctrl+C per terminare.\n")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer arrestato.")

def main():
    parser = argparse.ArgumentParser(description="KaBlog Video Launcher per VLC")
    parser.add_argument("--section", "-s", type=str, help="ID della sezione (es. commercialista, matematica_faidate, ecc.)")
    parser.add_argument("--file", "-f", type=str, help="Nome o percorso del file video da riprodurre")
    parser.add_argument("--check-vlc", action="store_true", help="Verifica se VLC è installato e mostra il percorso")
    parser.add_argument("--list", action="store_true", help="Elenca le sezioni e lo stato dei file video")
    parser.add_argument("--server", action="store_true", help="Avvia il server listener locale")

    args = parser.parse_args()

    if args.check_vlc:
        vlc = find_vlc()
        if vlc:
            print(f"VLC trovato: {vlc}")
        else:
            print("VLC non trovato nei percorsi standard.")
        return

    if args.list:
        print("\n--- Stato dei file video in videos/ ---")
        VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
        for sec, candidates in SECTION_CANDIDATES.items():
            resolved = resolve_video_file(sec)
            status = "PRESENTE" if resolved.exists() else "NON TROVATO"
            display_name = resolved.name if resolved.exists() else candidates[0]
            print(f"[{status:11}] {sec:20} -> {display_name}")
        return

    # Se viene passato l'argomento esplicito di sezione o file, riproduce direttamente
    if args.section:
        sec_key = args.section.strip().lower()
        target_video = resolve_video_file(sec_key)
        success = play_video(target_video)
        sys.exit(0 if success else 1)
    elif args.file:
        file_arg = Path(args.file)
        if file_arg.is_absolute():
            target_video = file_arg
        else:
            target_video = VIDEOS_DIR / file_arg
        success = play_video(target_video)
        sys.exit(0 if success else 1)
    else:
        # Se avviato senza argomenti (ad esempio doppio clic dal file explorer), avvia il server listener!
        run_server(5005)

if __name__ == "__main__":
    main()
