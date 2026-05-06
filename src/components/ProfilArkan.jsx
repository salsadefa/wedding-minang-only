import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function ProfilArkan() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 })

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex h-[100dvh] items-center justify-center overflow-hidden bg-maroon px-8 py-4 font-cormorant"
      style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', overflow: 'hidden' }}
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
              width: 'min(190px, 50vw)',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                width: 'min(190px, 50vw)',
                height: 'min(260px, 35vh)',
                clipPath:
                  "path('M 0,300 L 0,110 Q 0,0 110,0 Q 220,0 220,110 L 220,300 Z')",
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img
                src="/arkan-profile.jpg"
                alt="I Nyoman Krisna Arkandea"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transform: 'scaleX(-1)',
                }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                top: '-3px',
                left: '-3px',
                width: 'calc(min(190px, 50vw) + 6px)',
                height: 'calc(min(260px, 35vh) + 6px)',
                clipPath:
                  "path('M 0,306 L 0,113 Q 0,0 113,0 Q 226,0 226,113 L 226,306 Z')",
                background: '#C49A2A',
                zIndex: -1,
              }}
            />
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
