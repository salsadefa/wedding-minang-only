import { useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function ProfilArkan({ isLowEnd = false }) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 })
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1.5,
        duration: Math.random() * 6 + 5,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.25 + 0.05,
      })),
    [],
  )

  return (
    <section
      id="marapulai"
      ref={sectionRef}
      className="relative isolate flex h-[100dvh] items-center justify-center bg-maroon px-8 py-4 font-cormorant"
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        overflow: 'visible',
        paddingBottom: 'calc(70px + env(safe-area-inset-bottom))',
      }}
    >
      <div className="absolute inset-0 z-0 bg-maroon" />

      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: "url('/songket-pattern.svg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '900px auto',
          backgroundPosition: 'center',
          opacity: 0.15,
        }}
      />

      {!isLowEnd ? (
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
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
                pointerEvents: 'none',
              }}
            />
          ))}
        </div>
      ) : null}

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="text-[12px] uppercase tracking-[0.45em] text-ivory"
        >
          pengantin pria
        </motion.p>

        <div className="my-4 h-px w-20 bg-gold" />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
          className="relative z-10 inline-block opacity-100 mix-blend-normal"
        >
          <div
            style={{
              position: 'relative',
              width: '220px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-3px',
                left: '-3px',
                width: '226px',
                height: '296px',
                clipPath:
                  "path('M 113,0 C 169,0 226,56 226,113 L 226,296 L 0,296 L 0,113 C 0,56 56,0 113,0 Z')",
                background: 'linear-gradient(135deg, #C49A2A, #F0D080, #C49A2A)',
                filter: 'blur(4px)',
                opacity: 0.8,
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                width: '224px',
                height: '294px',
                clipPath:
                  "path('M 112,0 C 168,0 224,56 224,112 L 224,294 L 0,294 L 0,112 C 0,56 56,0 112,0 Z')",
                background: 'linear-gradient(135deg, #C49A2A, #F0D080, #C49A2A)',
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'relative',
                width: '220px',
                height: '290px',
                clipPath:
                  "path('M 110,0 C 165,0 220,55 220,110 L 220,290 L 0,290 L 0,110 C 0,55 55,0 110,0 Z')",
                overflow: 'hidden',
                zIndex: 1,
              }}
            >
              <img
                src="/arkan-profile.jpg"
                alt="I Nyoman Krisna Arkandea"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 40%',
                  transform: 'scaleX(-1) scale(1.3) translateX(-8px)',
                  transformOrigin: 'center 40%',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          className="mt-[0.3rem] font-medium leading-tight text-ivory"
          style={{ fontSize: 'clamp(20px, 5vw, 28px)' }}
        >
          I Nyoman Krisna Arkandea
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
          className="mt-[0.3rem] text-[14px] text-gold"
        >
          Putra Ketiga
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
          className="mt-[0.3rem] max-w-md text-[13px] font-light leading-relaxed text-ivory"
        >
          Alm. Bapak I Made Balik, S.P. &amp; Ibu Since Tabitha Kilikily
        </motion.p>

        <motion.a
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
          href="https://instagram.com/krisnaarkandea"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '10px',
            padding: '5px 14px',
            borderRadius: '20px',
            border: '1px solid #C49A2A',
            background: 'rgba(196,154,42,0.1)',
            color: '#C49A2A',
            fontSize: '13px',
            fontFamily: 'Lora, serif',
            textDecoration: 'none',
            letterSpacing: '0.03em',
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C49A2A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="#C49A2A" stroke="none" />
          </svg>
          @krisnaarkandea
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
          className="relative mt-6 h-4 w-20"
        >
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gold" />
          <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold bg-maroon" />
        </motion.div>
      </div>
    </section>
  )
}

export default ProfilArkan
