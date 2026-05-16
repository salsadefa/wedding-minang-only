import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function Divider({ marginTop = '1rem', marginBottom = '0' }) {
  return (
    <div
      className="relative mx-auto h-4 w-20"
      style={{ marginTop, marginBottom }}
    >
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gold" />
      <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold bg-maroon" />
    </div>
  )
}

function Closing() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [songketSrc, setSongketSrc] = useState('/songket-padang-mobile.svg')
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    [],
  )

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)

    window.addEventListener('resize', update)

    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    const update = () => {
      setSongketSrc(
        window.innerWidth >= 768
          ? '/songket-padang.svg'
          : '/songket-padang-mobile.svg',
      )
    }

    update()
    window.addEventListener('resize', update)

    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <section
      id="closing"
      ref={sectionRef}
      className=""
      style={{
        minHeight: '100dvh',
        height: '100dvh',
        width: '100vw',
        maxWidth: '100vw',
        position: 'relative',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        background: 'linear-gradient(to bottom, #3B1F0E 0%, #5C1A0E 40%, #7B1A1A 100%)',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        fontFamily: 'Lora, serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '8px',
        paddingBottom: 'calc(70px + env(safe-area-inset-bottom))',
      }}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          width: '100vw',
          backgroundImage: `url('${songketSrc}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.2,
          animation:
            songketSrc === '/songket-padang-mobile.svg'
              ? 'breathe 6s ease-in-out infinite'
              : 'none',
          transformOrigin: 'center center',
        }}
      />

      {isMobile && (
        <>
          {[
            { src: '/batik-1.svg', size: 38, duration: 9, top: '20%' },
            { src: '/batik-2.svg', size: 28, duration: 13, top: '38%' },
            { src: '/batik-1.svg', size: 44, duration: 7, top: '56%' },
            { src: '/batik-2.svg', size: 32, duration: 11, top: '74%' },
          ].map((item, index) => (
            <img
              key={`batik-left-${index}`}
              src={item.src}
              style={{
                position: 'absolute',
                left: '8px',
                top: item.top,
                width: `${item.size}px`,
                height: `${item.size}px`,
                pointerEvents: 'none',
                zIndex: 1,
                animation: `rotateCW ${item.duration}s ease-in-out infinite`,
                transformOrigin: 'center center',
                opacity: 0.7,
              }}
            />
          ))}
          {[
            { src: '/batik-2.svg', size: 42, duration: 8, top: '20%' },
            { src: '/batik-1.svg', size: 30, duration: 10, top: '38%' },
            { src: '/batik-2.svg', size: 48, duration: 6, top: '56%' },
            { src: '/batik-1.svg', size: 36, duration: 12, top: '74%' },
          ].map((item, index) => (
            <img
              key={`batik-right-${index}`}
              src={item.src}
              style={{
                position: 'absolute',
                right: '8px',
                top: item.top,
                width: `${item.size}px`,
                height: `${item.size}px`,
                pointerEvents: 'none',
                zIndex: 1,
                animation: `rotateCW ${item.duration}s ease-in-out infinite`,
                transformOrigin: 'center center',
                opacity: 0.7,
              }}
            />
          ))}
        </>
      )}

      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: particle.left,
            bottom: 0,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            background: '#C49A2A',
            animation: `floatUp ${particle.duration}s ${particle.delay}s linear infinite`,
            opacity: particle.opacity,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      ))}

      <div
        className="relative z-[2] flex w-full flex-col items-center justify-center px-8 py-2 text-center"
        style={{
          gap: '0.2rem',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 'none',
          margin: 0,
          marginTop: '15px',
          paddingTop: '20px',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <motion.img
              src="/rumah-gadang.svg"
              alt="Rumah Gadang"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: 'easeOut' }}
              style={{
                width: 'min(120px, 30vw)',
                objectFit: 'contain',
                filter:
                  'drop-shadow(0 4px 20px rgba(196,154,42,0.5)) sepia(1) saturate(2) hue-rotate(5deg) brightness(1.1)',
                marginBottom: '0.25rem',
                zIndex: 3,
                position: 'relative',
              }}
            />
          </div>

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              style={{
                width: '170px',
                height: '220px',
                clipPath:
                  "path('M 85,0 C 127,0 170,42 170,85 L 170,220 L 0,220 L 0,85 C 0,42 42,0 85,0 Z')",
                overflow: 'hidden',
                margin: '0 auto',
                marginTop: '12px',
                filter: 'drop-shadow(0 0 3px #C49A2A) drop-shadow(0 0 8px rgba(196,154,42,0.5))',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <img
                src="/latar-rg.png"
                alt="Salsa dan Arkan"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                }}
              />
            </motion.div>
          </div>
        </div>

        <Divider marginTop="0.5rem" marginBottom="0.5rem" />
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
        >
          <h2
            style={{
              fontFamily: 'Lora',
              fontSize: 'clamp(20px, 4.5vw, 26px)',
              fontWeight: 500,
              color: '#F5E6C8',
              textAlign: 'center',
              marginTop: '0.25rem',
              textShadow: '0 0 20px rgba(196,154,42,0.6)',
            }}
          >
            Salsa &amp; Arkan
          </h2>
          <p
            style={{
              color: '#C49A2A',
              fontSize: '14px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginTop: '0.25rem',
            }}
          >
            21 Juni 2026
          </p>
        </motion.div>

        <Divider marginTop="0.5rem" marginBottom="0.5rem" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: 'easeOut' }}
          style={{
            maxWidth: '240px',
            margin: '0 auto',
            fontFamily: 'Lora',
            fontStyle: 'italic',
            fontSize: '11px',
            color: 'rgba(245,230,200,0.85)',
            lineHeight: 1.8,
            textAlign: 'center',
          }}
        >
          Ya Allah, jadikan kami saling menguatkan ketika rapuh, saling
          mengingatkan ketika lalai, dan saling memilih bahkan di hari-hari yang
          tidak mudah.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
          style={{ marginTop: '1rem', textAlign: 'center' }}
        >
          <p
            style={{
              fontFamily: 'Lora',
              fontSize: '10px',
              color: '#C49A2A',
              letterSpacing: '0.1em',
              opacity: 0.7,
              marginBottom: '4px',
              textTransform: 'uppercase',
            }}
          >
            Ikuti perjalanan kami
          </p>
          <p
            style={{
              fontFamily: 'Lora',
              fontSize: 'clamp(14px, 3vw, 18px)',
              fontWeight: '600',
              letterSpacing: '0.05em',
              background: 'linear-gradient(135deg, #C49A2A 0%, #F0D080 50%, #C49A2A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 8px rgba(196,154,42,0.4))',
            }}
          >
            #SALamonyoJoARKAN
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Closing
