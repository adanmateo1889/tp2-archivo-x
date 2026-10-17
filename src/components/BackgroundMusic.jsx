import { useEffect, useRef, useState } from 'react'

const PREFERENCE_KEY = 'archivo-x-background-music-enabled'
const MAX_VOLUME = 0.12
const FADE_IN_DURATION = 2000
const FADE_OUT_DURATION = 1500

function readPreference() {
  try {
    return {
      enabled:
        typeof window !== 'undefined' &&
        window.localStorage.getItem(PREFERENCE_KEY) === 'true',
      error: '',
    }
  } catch {
    return {
      enabled: false,
      error: 'No se pudo leer la preferencia musical de este navegador.',
    }
  }
}

function BackgroundMusic({ src }) {
  const audioRef = useRef(null)
  const fadeIntervalRef = useRef(0)
  const playbackIntentRef = useRef(false)
  const [preference, setPreference] = useState(readPreference)
  const [isPlaying, setIsPlaying] = useState(false)
  const [statusMessage, setStatusMessage] = useState(preference.error)
  const audioAvailable = Boolean(src)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0
    }

    return () => {
      if (fadeIntervalRef.current) {
        window.clearInterval(fadeIntervalRef.current)
      }
      if (audio) {
        audio.pause()
        audio.volume = 0
      }
      playbackIntentRef.current = false
    }
  }, [audioAvailable, src])

  function cancelFade() {
    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current)
      fadeIntervalRef.current = 0
    }
  }

  function fadeTo(targetVolume, duration, onComplete) {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    cancelFade()
    const initialVolume = audio.volume
    const startedAt = performance.now()
    const intervalId = window.setInterval(() => {
      const now = performance.now()
      const progress = Math.min((now - startedAt) / duration, 1)
      audio.volume = initialVolume + (targetVolume - initialVolume) * progress

      if (progress >= 1) {
        window.clearInterval(intervalId)
        fadeIntervalRef.current = 0
        onComplete?.()
      }
    }, 16)
    fadeIntervalRef.current = intervalId
  }

  function savePreference(enabled) {
    try {
      window.localStorage.setItem(PREFERENCE_KEY, String(enabled))
      setPreference({ enabled, error: '' })
    } catch {
      setPreference({
        enabled,
        error: 'No se pudo guardar la preferencia musical en este navegador.',
      })
      setStatusMessage(
        'La preferencia musical no pudo guardarse; solo se aplicará durante esta visita.',
      )
    }
  }

  async function togglePlayback() {
    const audio = audioRef.current
    if (!audio || !audioAvailable) {
      return
    }

    if (playbackIntentRef.current) {
      playbackIntentRef.current = false
      setIsPlaying(false)
      setStatusMessage('Bajando gradualmente el volumen de la música.')
      savePreference(false)
      fadeTo(0, FADE_OUT_DURATION, () => {
        if (!playbackIntentRef.current) {
          audio.pause()
        }
      })
      return
    }

    playbackIntentRef.current = true
    setIsPlaying(true)
    setStatusMessage('Subiendo gradualmente el volumen de la música.')
    savePreference(true)

    try {
      if (audio.paused) {
        audio.volume = 0
        await audio.play()
      }

      if (!playbackIntentRef.current) {
        return
      }

      fadeTo(MAX_VOLUME, FADE_IN_DURATION, () => {
        if (playbackIntentRef.current) {
          setStatusMessage('Música ambiental activada a volumen bajo.')
        }
      })
    } catch {
      playbackIntentRef.current = false
      setIsPlaying(false)
      setStatusMessage(
        'No se pudo iniciar la grabación. Comprobá que el archivo local esté disponible.',
      )
    }
  }

  function handleAudioError() {
    cancelFade()
    playbackIntentRef.current = false
    setIsPlaying(false)
    setStatusMessage('No se pudo cargar la grabación de audio local.')
  }

  return (
    <div className="background-music">
      {audioAvailable && (
        <audio
          ref={audioRef}
          src={src}
          loop
          preload="none"
          onError={handleAudioError}
        />
      )}

      <button
        className="background-music-button"
        type="button"
        aria-label={
          !audioAvailable
            ? 'Música ambiental pendiente de grabación autorizada'
            : isPlaying
              ? 'Silenciar música ambiental'
              : preference.enabled
                ? 'Reanudar música ambiental'
                : 'Activar música ambiental'
        }
        aria-pressed={isPlaying}
        aria-describedby="background-music-help"
        disabled={!audioAvailable}
        onClick={togglePlayback}
      >
        <span className="background-music-icon" aria-hidden="true">
          {isPlaying ? '♫' : '♪'}
        </span>
        <span>
          {isPlaying
            ? 'Silenciar música'
            : audioAvailable
              ? 'Activar música'
              : 'Música pendiente'}
        </span>
        <span className="background-music-state" aria-hidden="true">
          {isPlaying ? 'ON' : audioAvailable ? 'OFF' : '—'}
        </span>
      </button>
      <p
        className="background-music-help"
        id="background-music-help"
        role="status"
        aria-live="polite"
      >
        {statusMessage ||
          (!audioAvailable
            ? 'Grabación pendiente: agregá un audio autorizado en public/audio.'
            : preference.enabled
              ? 'Preferencia guardada; activá la reproducción con este botón.'
              : 'La música solo comienza cuando la activás.')}
      </p>
    </div>
  )
}

export default BackgroundMusic
