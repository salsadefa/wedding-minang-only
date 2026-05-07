import { useEffect, useRef, useState } from 'react'

function MusicPlayer() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return undefined
    }

    audio.volume = 0.4
    audio.loop = true

    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true)
            setHasInteracted(true)
          })
          .catch(() => {})
      }
    }

    document.addEventListener('click', handleFirstInteraction, { once: true })
    document.addEventListener('touchstart', handleFirstInteraction, { once: true })

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [hasInteracted])

  const toggleMusic = (event) => {
    event.stopPropagation()
    const audio = audioRef.current

    if (!audio) {
      return
    }

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => {
        setIsPlaying(true)
        setHasInteracted(true)
      }).catch(() => {})
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/musik-minang.mp3" preload="auto" />
      <button
        onClick={toggleMusic}
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 200,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          width: '52px',
          height: '52px',
        }}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      >
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle at center, #1a1a1a 20%, #2a2a2a 20%, #2a2a2a 35%, #1a1a1a 35%, #1a1a1a 50%, #2a2a2a 50%, #2a2a2a 65%, #1a1a1a 65%)',
            border: '2px solid #C49A2A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: isPlaying ? 'spinVinyl 3s linear infinite' : 'none',
            boxShadow: '0 0 8px rgba(196,154,42,0.4)',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: '#C49A2A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            {isPlaying ? (
              <svg width="8" height="8" viewBox="0 0 24 24" fill="#1a1a1a">
                <rect x="5" y="4" width="4" height="16" />
                <rect x="15" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="8" height="8" viewBox="0 0 24 24" fill="#1a1a1a">
                <polygon points="6,3 20,12 6,21" />
              </svg>
            )}
          </div>
        </div>
      </button>
    </>
  )
}

export default MusicPlayer
