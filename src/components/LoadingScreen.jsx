import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const minDuration = 2500

    const progressInterval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(progressInterval)
          return 100
        }

        const increment = prev < 70 ? Math.random() * 8 + 2 : Math.random() * 3 + 1
        return Math.min(prev + increment, 99)
      })
    }, 100)

    const images = document.querySelectorAll('img')
    const imagePromises = Array.from(images).map((img) => {
      if (img.complete) {
        return Promise.resolve()
      }

      return new Promise((resolve) => {
        img.onload = resolve
        img.onerror = resolve
      })
    })

    Promise.all([
      Promise.all(imagePromises),
      new Promise((resolve) => window.setTimeout(resolve, minDuration)),
    ]).then(() => {
      setProgress(100)
      window.setTimeout(() => {
        setIsVisible(false)
        window.setTimeout(onComplete, 600)
      }, 400)
    })

    return () => window.clearInterval(progressInterval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'linear-gradient(to bottom, #3B1F0E 0%, #5C1A0E 40%, #7B1A1A 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: "url('/songket-pattern.svg')",
              backgroundRepeat: 'repeat',
              backgroundSize: '600px auto',
              opacity: 0.1,
              pointerEvents: 'none',
            }}
          />

          <motion.img
            src="/rumah-gadang.svg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              width: 'min(140px, 35vw)',
              objectFit: 'contain',
              filter:
                'drop-shadow(0 4px 12px rgba(196,154,42,0.4)) sepia(1) saturate(2) hue-rotate(5deg) brightness(1.1)',
              zIndex: 1,
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            style={{ textAlign: 'center', zIndex: 1 }}
          >
            <p
              style={{
                fontFamily: 'Lora, serif',
                fontSize: 'clamp(36px, 8vw, 52px)',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #C49A2A, #F0D080, #C49A2A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.1em',
                lineHeight: 1.2,
              }}
            >
              S &amp; A
            </p>
            <p
              style={{
                fontFamily: 'Lora, serif',
                fontSize: '12px',
                color: '#F5E6C8',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                opacity: 0.7,
                marginTop: '8px',
              }}
            >
              21 Juni 2026
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{ position: 'relative', height: '16px', width: '120px', zIndex: 1 }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '1px',
                background: '#C49A2A',
                transform: 'translateY(-50%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '10px',
                height: '10px',
                background: '#5C1A0E',
                border: '1px solid #C49A2A',
                transform: 'translate(-50%, -50%) rotate(45deg)',
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              width: 'min(200px, 50vw)',
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '2px',
                background: 'rgba(196,154,42,0.2)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(to right, #C49A2A, #F0D080)',
                  borderRadius: '2px',
                  width: `${progress}%`,
                  transition: 'width 0.1s ease',
                }}
              />
            </div>
            <p
              style={{
                fontFamily: 'Lora, serif',
                fontSize: '10px',
                color: '#C49A2A',
                textAlign: 'center',
                marginTop: '8px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                opacity: 0.6,
              }}
            >
              Memuat undangan...
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default LoadingScreen
