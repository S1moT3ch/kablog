import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { spawn, execSync } from 'child_process'
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
// Helper per risolvere la cartella Contributi (da collegamento .lnk o percorso diretto)
let cachedContributiDir = null
function getContributiDir() {
  if (cachedContributiDir && fs.existsSync(cachedContributiDir)) {
    return cachedContributiDir
  }
  const defaultDir = 'D:\\Simone\\Edit\\25_AM\\Contributi'
  if (fs.existsSync(defaultDir)) {
    cachedContributiDir = defaultDir
    return cachedContributiDir
  }
  const lnkPath = path.resolve(__dirname, 'public', 'Contributi.lnk')
  if (fs.existsSync(lnkPath)) {
    try {
      const stdout = execSync(
        `powershell -NoProfile -Command "(New-Object -ComObject WScript.Shell).CreateShortcut('${lnkPath}').TargetPath"`,
        { encoding: 'utf8', timeout: 2000 }
      ).trim()
      if (stdout && fs.existsSync(stdout)) {
        cachedContributiDir = stdout
        return cachedContributiDir
      }
    } catch {
      // fallback
    }
  }
  return null
}

function localVideoLauncherPlugin() {
  return {
    name: 'local-video-launcher',
    configureServer(server) {
      // 1. Endpoint per ottenere la lista dinamica dei file presenti in Contributi
      server.middlewares.use('/api/contributi-list', (req, res) => {
        const cDir = getContributiDir()
        if (!cDir || !fs.existsSync(cDir)) {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, files: [] }))
          return
        }

        try {
          const validExts = ['.mp4', '.mov', '.mkv', '.avi', '.webm', '.jpg', '.jpeg', '.png', '.webp']
          const knownDurations = {
            'anna&ottavio_def.mp4': '00:36',
            'anna&ottaviodefv2.mp4': '00:36',
            'at&ap.mp4': '02:54',
            'cuginek.mp4': '00:09',
            'ema&linda.mp4': '00:31',
            'f&s_a.mp4': '03:22',
            'f&s_b.mp4': '00:29',
            'g&f.mp4': '00:20',
            'm&g.mp4': '02:19',
            'm&p.mp4': '00:04',
            'n&m.mp4': '00:24',
            'vgt.mp4': '00:23',
            'tommy.jpg': 'Foto'
          }

          const rawEntries = fs.readdirSync(cDir)
          const mediaFiles = rawEntries
            .filter(f => !f.startsWith('.') && validExts.includes(path.extname(f).toLowerCase()))
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))

          const files = mediaFiles.map((file, idx) => {
            const fullPath = path.join(cDir, file)
            const stat = fs.statSync(fullPath)
            const ext = path.extname(file).toLowerCase()
            const isVideo = ext === '.mp4' || ext === '.mov' || ext === '.mkv' || ext === '.avi' || ext === '.webm'
            const isPhoto = ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp'
            const duration = knownDurations[file.toLowerCase()] || (isPhoto ? 'Foto' : null)

            return {
              filename: file,
              extension: ext,
              size: stat.size,
              modified: stat.mtimeMs,
              isVideo,
              isPhoto,
              duration,
              index: idx + 1
            }
          })
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: true, count: files.length, files }))
        } catch (err) {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, error: err.message, files: [] }))
        }
      })

      // 2. Endpoint per servire lo streaming video/foto con supporto a byte range
      server.middlewares.use('/api/contributi-media', (req, res) => {
        const cDir = getContributiDir()
        if (!cDir || !fs.existsSync(cDir)) {
          res.statusCode = 404
          res.end('Contributi folder not found')
          return
        }

        let requestedFile = ''
        try {
          const urlObj = new URL(req.url, 'http://localhost')
          requestedFile = decodeURIComponent(urlObj.pathname.replace(/^\//, ''))
          if (!requestedFile) {
            requestedFile = urlObj.searchParams.get('file') || ''
          }
        } catch {
          // ignore
        }

        if (!requestedFile) {
          res.statusCode = 400
          res.end('No file specified')
          return
        }

        const safeFilename = path.basename(requestedFile)
        const filePath = path.join(cDir, safeFilename)

        if (!fs.existsSync(filePath)) {
          res.statusCode = 404
          res.end(`File ${safeFilename} not found`)
          return
        }

        const stat = fs.statSync(filePath)
        const fileSize = stat.size
        const range = req.headers.range
        const ext = path.extname(filePath).toLowerCase()
        const contentType = ext === '.mp4' ? 'video/mp4' : 
                            (ext === '.jpg' || ext === '.jpeg') ? 'image/jpeg' : 
                            ext === '.png' ? 'image/png' : 'application/octet-stream'

        if (range) {
          const parts = range.replace(/bytes=/, '').split('-')
          const start = parseInt(parts[0], 10)
          const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
          const chunksize = (end - start) + 1
          const fileStream = fs.createReadStream(filePath, { start, end })
          res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=3600'
          })
          fileStream.pipe(res)
        } else {
          res.writeHead(200, {
            'Content-Length': fileSize,
            'Content-Type': contentType,
            'Accept-Ranges': 'bytes',
            'Cache-Control': 'public, max-age=3600'
          })
          fs.createReadStream(filePath).pipe(res)
        }
      })

      // 3. Endpoint per avviare il video fullscreen con VLC (per sezioni guida o per contributi)
      server.middlewares.use('/api/play-video', (req, res) => {
        const executePlayback = (targetParam) => {
          const rawTarget = (targetParam || 'commercialista').trim()
          console.log(`\n[KaBlog Video API] Richiesta riproduzione per: "${rawTarget}"`)

          const videosDir = path.resolve(__dirname, 'videos')
          const cDir = getContributiDir()

          let resolvedPath = null
          let foundFileName = null

          // A. Controlla prima se è un file specifico nella cartella Contributi
          if (cDir && fs.existsSync(cDir)) {
            const directContributo = path.join(cDir, path.basename(rawTarget))
            if (fs.existsSync(directContributo)) {
              resolvedPath = directContributo
              foundFileName = path.basename(rawTarget)
            } else {
              // Cerca senza distinzione maiuscole/minuscole
              const cFiles = fs.readdirSync(cDir)
              const match = cFiles.find(f => f.toLowerCase() === rawTarget.toLowerCase() || f.toLowerCase() === `${rawTarget.toLowerCase()}.mp4`)
              if (match) {
                resolvedPath = path.join(cDir, match)
                foundFileName = match
              }
            }
          }

          // B. Se non trovato nei Contributi, cerca nella cartella videos/ del progetto
          if (!resolvedPath && fs.existsSync(videosDir)) {
            const candidates = SECTION_VIDEO_CANDIDATES[rawTarget.toLowerCase()] || [rawTarget, `${rawTarget}.mp4`]
            const existingFiles = fs.readdirSync(videosDir)
            for (const cand of candidates) {
              const match = existingFiles.find(f => f.toLowerCase() === cand.toLowerCase())
              if (match) {
                resolvedPath = path.resolve(videosDir, match)
                foundFileName = match
                break
              }
            }

            // Fallback se nessun candidato corrisponde
            if (!resolvedPath) {
              const anyMp4 = existingFiles.find(f => f.toLowerCase().endsWith('.mp4'))
              if (anyMp4) {
                resolvedPath = path.resolve(videosDir, anyMp4)
                foundFileName = anyMp4
              }
            }
          }

          if (!resolvedPath || !fs.existsSync(resolvedPath)) {
            console.log(`[KaBlog Video API] [NON TROVATO] Nessun file video presente per "${rawTarget}"`)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({
              ok: false,
              fileFound: false,
              target: rawTarget,
              message: `File video per "${rawTarget}" non trovato né in Contributi né in videos/`
            }))
            return
          }

          const isPhoto = /\.(jpe?g|png|webp)$/i.test(resolvedPath)
          const vlcCandidates = [
            'C:\\Program Files\\VideoLAN\\VLC\\vlc.exe',
            'C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe',
            process.env.VLC_PATH
          ].filter(Boolean)
          
          const vlcExe = vlcCandidates.find(p => fs.existsSync(p))

          if (!isPhoto && vlcExe) {
            console.log(`[KaBlog Video API] Avvio diretto VLC a tutto schermo: "${resolvedPath}"`)
            try {
              const vlcProc = spawn(vlcExe, [
                '--fullscreen',
                '--video-on-top',
                '--play-and-exit',
                '--no-video-title-show',
                '--no-qt-privacy-ask',
                resolvedPath
              ], {
                detached: true,
                stdio: 'ignore'
              })
              vlcProc.unref()
            } catch (err) {
              console.error('[KaBlog Video API] Errore avvio VLC diretto:', err)
            }
          } else if (isPhoto) {
            // Per immagini (es. Tommy.jpg), apre con comando di sistema
            console.log(`[KaBlog Video API] Apertura foto: "${resolvedPath}"`)
            try {
              spawn('cmd', ['/c', 'start', '""', resolvedPath], {
                detached: true,
                stdio: 'ignore'
              }).unref()
            } catch (err) {
              console.error('[KaBlog Video API] Errore apertura foto:', err)
            }
          } else {
            // Fallback con script Python
            const scriptPath = path.resolve(__dirname, 'scripts', 'play_video.py')
            const pythonExe = fs.existsSync('C:\\Python314\\python.exe') ? 'C:\\Python314\\python.exe' : 'python'
            
            const pyProcess = spawn(pythonExe, [scriptPath, '--file', resolvedPath], {
              cwd: __dirname,
              detached: true,
              stdio: 'ignore'
            })
            pyProcess.unref()
          }

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            ok: true,
            fileFound: true,
            fileName: foundFileName,
            filePath: resolvedPath,
            message: `Avvio a schermo intero per "${foundFileName}"!`
          }))
        }

        // 1. Controlla parametri query URL
        let targetParam = ''
        if (req.url) {
          try {
            const urlObj = new URL(req.url, 'http://localhost')
            targetParam = urlObj.searchParams.get('file') || 
                          urlObj.searchParams.get('fileName') || 
                          urlObj.searchParams.get('filePath') || 
                          urlObj.searchParams.get('sectionId') || 
                          urlObj.searchParams.get('section') || ''
          } catch {
            // ignore
          }
        }

        if (targetParam) {
          executePlayback(targetParam)
          return
        }

        // 2. Body JSON
        let body = ''
        req.on('data', chunk => {
          body += chunk
        })

        req.on('end', () => {
          let param = ''
          try {
            if (body) {
              const parsed = JSON.parse(body)
              param = parsed.file || parsed.fileName || parsed.filePath || parsed.sectionId || parsed.section || ''
            }
          } catch {
            // ignore
          }
          executePlayback(param)
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
