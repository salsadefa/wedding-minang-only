import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const photos = ['/minang-1.jpg', '/minang-2.jpg', '/minang-3.jpg', '/minang-4.jpg']

function Divider() {
  return (
    <div className="relative h-4 w-20">
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gold" />
      <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold bg-maroon" />
    </div>
  )
}

function Gallery() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [songketSrc, setSongketSrc] = useState('/songket-padang-mobile.svg')

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
    <>
      <motion.section
        id="galeri"
        ref={sectionRef}
        className="relative min-h-[100dvh] overflow-hidden px-6 py-6 font-cormorant"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          minHeight: '100dvh',
          position: 'relative',
          overflow: 'hidden',
          background:
            'linear-gradient(to bottom, #7B1A1A 0%, #5C1A0E 60%, #3B1F0E 100%)',
          scrollSnapAlign: 'start',
          scrollSnapStop: 'always',
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

        <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-2xl flex-col items-center justify-center py-6 text-center">
          <p className="text-[12px] uppercase tracking-[0.45em] text-ivory">Galeri</p>
          <h2 className="mt-1 text-[18px] text-ivory">Momen bersama</h2>
          <div className="my-4">
            <Divider />
          </div>

          <div
            style={{
              columns: 2,
              gap: '8px',
              width: '100%',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            {photos.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Galeri ${index + 1}`}
                onClick={() => setSelectedPhoto(src)}
                style={{
                  width: '100%',
                  marginBottom: '8px',
                  borderRadius: '8px',
                  border: '1px solid rgba(196,154,42,0.3)',
                  cursor: 'pointer',
                  display: 'block',
                  breakInside: 'avoid',
                }}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {selectedPhoto ? (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.img
            src={selectedPhoto}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '28px',
              cursor: 'pointer',
              zIndex: 301,
            }}
          >
            ✕
          </button>
        </div>
      ) : null}
    </>
  )
}

export default Gallery
