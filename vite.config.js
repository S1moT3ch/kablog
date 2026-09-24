import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const SECTION_VIDEO_CANDIDATES = {
  giovinezza: ['giovinezza.mp4', 'giovani.mp4', 'metodo1.mp4', 'metodo_1.mp4', '1.mp4', 'commercialista.mp4', 'ierioggi.mp4'],
  matrimonio: ['matrimonio.mp4', 'nozze.mp4', 'metodo2.mp4', 'metodo_2.mp4', '2.mp4', 'matematica_faidate.mp4', 'ierioggi.mp4', 'commercialista.mp4'],
  famiglia: ['famiglia.mp4', 'casa_figli.mp4', 'figli.mp4', 'simone_andrea.mp4', 'metodo3.mp4', 'metodo_3.mp4', '3.mp4', 'commercialista.mp4', 'ierioggi.mp4'],
  viaggi: ['viaggi.mp4', 'viaggio.mp4', 'vacanze.mp4', 'metodo4.mp4', 'metodo_4.mp4', '4.mp4', 'spesa_sabato.mp4', 'ierioggi.mp4', 'commercialista.mp4'],
  amici: ['amici.mp4', 'festa.mp4', 'compagnia.mp4', 'metodo5.mp4', 'metodo_5.mp4', '5.mp4', 'ierioggi.mp4', 'ierieoggi.mp4', 'commercialista.mp4'],
  commercialista: ['giovinezza.mp4', 'commercialista.mp4', 'metodo1.mp4', '1.mp4'],
  matematica_faidate: ['matrimonio.mp4', 'matematica_faidate.mp4', 'ierioggi.mp4', 'metodo2.mp4', '2.mp4'],
  casa_figli: ['famiglia.mp4', 'casa_figli.mp4', 'commercialista.mp4', 'metodo3.mp4', '3.mp4'],
  spesa_sabato: ['viaggi.mp4', 'spesa_sabato.mp4', 'ierioggi.mp4', 'metodo4.mp4', '4.mp4'],
  ierieoggi: ['amici.mp4', 'ierioggi.mp4', 'ierieoggi.mp4', 'metodo5.mp4', '5.mp4']
}

// Plugin Vite per gestire il trigger dello script Python locale
function localVideoLauncherPlugin() {
  return {
    name: 'local-video-launcher',
    configureServer(server) {
      server.middlewares.use('/api/play-video', (req, res) => {
        const executeScript = (sectionId) => {
          const targetSec = sectionId || 'commercialista'
          console.log(`\n[KaBlog Video API] Richiesta riproduzione video per: "${targetSec}"`)

          const videosDir = path.resolve(__dirname, 'videos')
          const candidates = SECTION_VIDEO_CANDIDATES[targetSec] || [`${targetSec}.mp4`]
          
          let foundFile = null
          if (fs.existsSync(videosDir)) {
            const existingFiles = fs.readdirSync(videosDir)
            for (const cand of candidates) {
              const match = existingFiles.find(f => f.toLowerCase() === cand.toLowerCase())
              if (match) {
                foundFile = match
                break
              }
            }
            // Fallback: se nessun candidato corrisponde, usa il primo video disponibile
            if (!foundFile) {
              const anyMp4 = existingFiles.find(f => f.toLowerCase().endsWith('.mp4'))
              if (anyMp4) {
                foundFile = anyMp4
              }
            }
          }

          if (!foundFile) {
            console.log(`[KaBlog Video API] [NON TROVATO] Nessun file video presente in videos/ per "${targetSec}"`)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({
              ok: false,
              fileFound: false,
              sectionId: targetSec,
              expectedFile: candidates[0],
              message: `File "${candidates[0]}" non trovato nella cartella videos/`
            }))
            return
          }

          const videoFilePath = path.resolve(videosDir, foundFile)
          const vlcCandidates = [
            'C:\\Program Files\\VideoLAN\\VLC\\vlc.exe',
            'C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe',
            process.env.VLC_PATH
          ].filter(Boolean)
          
          const vlcExe = vlcCandidates.find(p => fs.existsSync(p))

          if (vlcExe) {
            console.log(`[KaBlog Video API] Avvio diretto VLC a tutto schermo: "${foundFile}"`)
            try {
              const vlcProc = spawn(vlcExe, [
                '--fullscreen',
                '--video-on-top',
                '--play-and-exit',
                '--no-video-title-show',
                '--no-qt-privacy-ask',
                videoFilePath
              ], {
                detached: true,
                stdio: 'ignore'
              })
              vlcProc.unref()
            } catch (err) {
              console.error('[KaBlog Video API] Errore avvio VLC diretto:', err)
            }
          } else {
            const scriptPath = path.resolve(__dirname, 'scripts', 'play_video.py')
            const pythonExe = fs.existsSync('C:\\Python314\\python.exe') ? 'C:\\Python314\\python.exe' : 'python'
            
            // Esegue lo script Python in modo autonomo
            const pyProcess = spawn(pythonExe, [scriptPath, '--section', targetSec], {
              cwd: __dirname,
              detached: true,
              stdio: 'ignore'
            })
            pyProcess.unref()

            pyProcess.on('error', (err) => {
              console.error('[KaBlog Video API] Errore esecuzione Python:', err)
            })
          }

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            ok: true,
            fileFound: true,
            fileName: foundFile,
            sectionId: targetSec,
            message: `Avvio di VLC per "${foundFile}"!`
          }))
        }

        // 1. Controlla prima i parametri URL query (es. ?sectionId=...)
        let querySection = ''
        if (req.url) {
          try {
            const urlObj = new URL(req.url, 'http://localhost')
            querySection = urlObj.searchParams.get('sectionId') || urlObj.searchParams.get('section') || ''
          } catch {
            // ignore
          }
        }

        if (querySection) {
          executeScript(querySection)
          return
        }

        // 2. Altrimenti leggi il body JSON
        let body = ''
        req.on('data', chunk => {
          body += chunk
        })

        req.on('end', () => {
          let sectionId = ''
          try {
            if (body) {
              const parsed = JSON.parse(body)
              sectionId = parsed.sectionId || parsed.section || ''
            }
          } catch {
            // ignore
          }
          executeScript(sectionId)
        })
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localVideoLauncherPlugin()],
  server: {
    watch: {
      ignored: ['**/videos/**', '**/scripts/**']
    }
  }
})
