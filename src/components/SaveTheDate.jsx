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

function SaveTheDate() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 })
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft())
  const [songketSrc, setSongketSrc] = useState('/songket-padang-mobile.svg')

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => window.clearInterval(intervalId)
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

  const timerItems = [
    { value: timeLeft.days, label: 'hari' },
    { value: timeLeft.hours, label: 'jam' },
    { value: timeLeft.minutes, label: 'menit' },
    { value: timeLeft.seconds, label: 'detik' },
  ]

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
        }}
      />

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

        <div
          className="flex w-full flex-nowrap justify-center gap-2"
          style={{
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            marginTop: '0.5rem',
          }}
        >
          {timerItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + index * 0.15,
                ease: 'easeOut',
              }}
              className="rounded-[8px] border border-gold bg-[#8C2020] px-[6px] py-[8px]"
              style={{
                width: 'calc(25% - 6px)',
                minWidth: 0,
                flexShrink: 1,
                flexGrow: 0,
              }}
            >
              <p className="text-[18px] font-medium leading-none text-ivory">
                {String(item.value).padStart(2, '0')}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-gold">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

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
