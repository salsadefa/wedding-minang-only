import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const TARGET_TIME = Date.UTC(2026, 5, 21, 1, 0, 0)

function getTimeLeft() {
  const diff = Math.max(TARGET_TIME - Date.now(), 0)

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds }
}

function CircleTimer({ value, max, label }) {
  const size = 80
  const strokeWidth = 3
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = value / max
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(196,154,42,0.2)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#C49A2A"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'Hurricane, cursive',
              fontSize: 'clamp(28px, 7vw, 36px)',
              color: '#F5E6C8',
              lineHeight: 1,
              textShadow: '0 0 20px rgba(196,154,42,0.5)',
            }}
          >
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span
        style={{
          fontFamily: 'Lora, serif',
          fontSize: '9px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#C49A2A',
          fontWeight: '400',
        }}
      >
        {label}
      </span>
    </div>
  )
}

function SaveTheDate() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 })
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft())
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [songketSrc, setSongketSrc] = useState('/songket-padang-mobile.svg')

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

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
      id="tanggal"
      ref={sectionRef}
      className="relative flex h-[100dvh] flex-col justify-center overflow-hidden px-8 py-6 font-cormorant"
      style={{
        background:
          'linear-gradient(to bottom, #7B1A1A 0%, #5C1A0E 60%, #3B1F0E 100%)',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        overflow: 'hidden',
        paddingBottom: 'calc(70px + env(safe-area-inset-bottom))',
      }}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
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

      <div className="relative z-10 mx-auto flex h-full w-full max-w-2xl flex-col items-center justify-center py-4 text-center">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="text-[12px] uppercase tracking-[0.45em] text-ivory"
        >
          insyaallah akan dilangsungkan
        </motion.p>

        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="mt-[0.25rem] font-medium leading-none text-ivory"
          style={{ fontSize: 'clamp(24px, 6vw, 36px)' }}
        >
          21 Juni 2026
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          className="relative my-[0.5rem] h-4 w-20"
        >
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gold" />
          <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold bg-maroon" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: '0.5rem',
          }}
        >
          <CircleTimer value={timeLeft.days} max={365} label="Hari" />
          <CircleTimer value={timeLeft.hours} max={24} label="Jam" />
          <CircleTimer value={timeLeft.minutes} max={60} label="Menit" />
          <CircleTimer value={timeLeft.seconds} max={60} label="Detik" />
        </motion.div>

        <div className="mt-[0.5rem] flex w-full flex-col items-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
            style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '360px' }}
          >
            <div
              style={{
                flex: 1,
                background: '#8C2020',
                border: '1px solid #C49A2A',
                borderRadius: '8px',
                padding: '0.75rem',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  color: '#C49A2A',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Akad Nikah
              </p>
              <p
                style={{
                  color: '#F5E6C8',
                  fontSize: '16px',
                  fontFamily: 'Lora',
                  margin: '4px 0',
                }}
              >
                08.00 — 10.00
              </p>
              <p style={{ color: '#F5E6C8', fontSize: '10px', opacity: 0.7 }}>WIB</p>
            </div>
            <div
              style={{
                flex: 1,
                background: '#8C2020',
                border: '1px solid #C49A2A',
                borderRadius: '8px',
                padding: '0.75rem',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  color: '#C49A2A',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Resepsi
              </p>
              <p
                style={{
                  color: '#F5E6C8',
                  fontSize: '16px',
                  fontFamily: 'Lora',
                  margin: '4px 0',
                }}
              >
                10.00 — 17.00
              </p>
              <p style={{ color: '#F5E6C8', fontSize: '10px', opacity: 0.7 }}>WIB</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.25, ease: 'easeOut' }}
            style={{
              width: '100%',
              maxWidth: '360px',
              background: '#8C2020',
              border: '1px solid #C49A2A',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              textAlign: 'center',
              marginTop: '8px',
            }}
          >
            <p
              style={{
                color: '#F5E6C8',
                fontSize: '13px',
                fontWeight: 500,
                marginBottom: '4px',
              }}
            >
              Aula SMK Pertanian Pembangunan Negeri Padang
            </p>
            <p
              style={{
                color: '#F5E6C8',
                fontSize: '11px',
                opacity: 0.7,
                lineHeight: 1.5,
              }}
            >
              Komplek BBI Lubuk Minturun, Jl. Pertanian, Lubuk Minturun, Kec.
              Koto Tangah, Padang
            </p>
            <a
              href="https://maps.app.goo.gl/uobPZQJnyQU5tE627"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '8px',
                border: '1px solid #C49A2A',
                color: '#C49A2A',
                borderRadius: '6px',
                padding: '4px 12px',
                fontSize: '11px',
                textDecoration: 'none',
              }}
            >
              Buka di Google Maps
            </a>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.5, ease: 'easeOut' }}
          className="mt-[0.5rem] text-[13px] italic text-ivory opacity-70"
        >
          Dua momen, satu hari, satu tempat.
        </motion.p>
      </div>
    </section>
  )
}

export default SaveTheDate
