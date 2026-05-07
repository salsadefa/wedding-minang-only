import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function CurtainTransition({ onComplete }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false)
      window.setTimeout(onComplete, 900)
    }, 1500)

    return () => window.clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 400,
            background: '#7B1A1A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: "url('/songket-pattern.svg')",
              backgroundRepeat: 'repeat',
              backgroundSize: '900px auto',
              opacity: 0.15,
              pointerEvents: 'none',
            }}
          />
          <p
            style={{
              fontFamily: 'Lora',
              fontSize: '12px',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: '#F5E6C8',
              opacity: 0.8,
            }}
          >
            dan di sisi lain
          </p>
          <p
            style={{
              fontFamily: 'Lora',
              fontSize: '24px',
              fontStyle: 'italic',
              color: '#F5E6C8',
              textAlign: 'center',
              padding: '0 32px',
            }}
          >
            ada cerita yang lebih besar menanti
          </p>
          <div style={{ position: 'relative', height: '16px', width: '120px', marginTop: '8px' }}>
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
                background: '#7B1A1A',
                border: '1px solid #C49A2A',
                transform: 'translate(-50%, -50%) rotate(45deg)',
              }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default CurtainTransition
