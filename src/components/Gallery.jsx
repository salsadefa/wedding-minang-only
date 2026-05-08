import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const photos = [
  '/minang-1.jpg',
  '/minang-2.jpg',
  '/minang-3.jpg',
  '/minang-4.jpg',
  '/minang-5.jpg',
  '/minang-6.jpg',
  '/minang-7.jpg',
  '/minang-8.jpg',
  '/minang-9.jpg',
]

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [flipping, setFlipping] = useState(false)
  const [songketSrc, setSongketSrc] = useState('/songket-padang-mobile.svg')
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const sectionRef = useRef(null)

  useEffect(() => {
    const update = () => {
      setSongketSrc(
        window.innerWidth >= 768
          ? '/songket-padang.svg'
          : '/songket-padang-mobile.svg',
      )
      setIsMobile(window.innerWidth < 768)
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const goNext = () => {
    setFlipping(true)
    window.setTimeout(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % photos.length)
      setFlipping(false)
    }, 300)
  }

  const goPrev = () => {
    setFlipping(true)
    window.setTimeout(() => {
      setDirection(-1)
      setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
      setFlipping(false)
    }, 300)
  }

  const getCardIndex = (offset) =>
    (currentIndex + offset + photos.length) % photos.length

  const visibleCards = [
    { offset: -2, scale: 0.82, x: '-105%', zIndex: 2, opacity: 0.5 },
    { offset: -1, scale: 0.91, x: '-55%', zIndex: 3, opacity: 0.75 },
    { offset: 1, scale: 0.91, x: '55%', zIndex: 3, opacity: 0.75 },
    { offset: 2, scale: 0.82, x: '105%', zIndex: 2, opacity: 0.5 },
  ]

  return (
    <section
      id="galeri"
      ref={sectionRef}
      style={{
        height: '100dvh',
        position: 'relative',
        overflow: 'hidden',
        background:
          'linear-gradient(to bottom, #7B1A1A 0%, #5C1A0E 60%, #3B1F0E 100%)',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Lora, serif',
        gap: '1rem',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
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

      {isMobile ? (
        <>
          {[
            { src: '/batik-1.svg', size: 36, duration: 9, top: '12%' },
            { src: '/batik-2.svg', size: 26, duration: 13, top: '75%' },
          ].map((item, index) => (
            <img
              key={`bl-${index}`}
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
                opacity: 0.7,
              }}
            />
          ))}
          {[
            { src: '/batik-2.svg', size: 40, duration: 8, top: '12%' },
            { src: '/batik-1.svg', size: 28, duration: 11, top: '75%' },
          ].map((item, index) => (
            <img
              key={`br-${index}`}
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
                opacity: 0.7,
              }}
            />
          ))}
        </>
      ) : null}

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: '#F5E6C8',
            marginBottom: '4px',
          }}
        >
          Galeri
        </p>
        <p
          style={{
            fontSize: '16px',
            color: '#F5E6C8',
            fontStyle: 'italic',
            margin: 0,
          }}
        >
          Momen bersama
        </p>
      </div>

      <div
        className="gallery-scene"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: 'min(320px, 46vh)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1000px',
        }}
      >
        {visibleCards.map(({ offset, scale, x, zIndex, opacity }) => {
          const index = getCardIndex(offset)

          return (
            <motion.div
              key={`${index}-${offset}-${direction}`}
              animate={{ scale, x, opacity, zIndex }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 25,
                duration: 0.5,
              }}
              style={{
                position: 'absolute',
                width: 'min(200px, 52vw)',
                height: 'min(280px, 42vh)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(196,154,42,0.4)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                cursor: 'pointer',
              }}
              onClick={() => {
                if (offset > 0) {
                  setDirection(1)
                  setCurrentIndex(index)
                }

                if (offset < 0) {
                  setDirection(-1)
                  setCurrentIndex(index)
                }
              }}
            >
              <img
                src={photos[index]}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
                draggable={false}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.25)',
                }}
              />
            </motion.div>
          )
        })}

        <motion.div
          key={`center-${currentIndex}`}
          className="gallery-card"
          animate={{
            rotateY: flipping ? 90 : 0,
            scale: flipping ? 0.95 : 1,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: 'min(200px, 52vw)',
            height: 'min(280px, 42vh)',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '2px solid #C49A2A',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(196,154,42,0.2)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            zIndex: 5,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={photos[currentIndex]}
              src={photos[currentIndex]}
              alt=""
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                userSelect: 'none',
                pointerEvents: 'none',
                position: 'absolute',
                inset: 0,
                backfaceVisibility: 'hidden',
              }}
              draggable={false}
            />
          </AnimatePresence>
        </motion.div>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <button
          onClick={goPrev}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '1px solid #C49A2A',
            background: 'rgba(123,26,26,0.6)',
            color: '#C49A2A',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}
        >
          ‹
        </button>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {photos.map((_, index) => (
            <div
              key={index}
              onClick={() => {
                if (index > currentIndex) goNext()
                else if (index < currentIndex) goPrev()
              }}
              style={{
                width: index === currentIndex ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background:
                  index === currentIndex
                    ? '#C49A2A'
                    : 'rgba(196,154,42,0.3)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '1px solid #C49A2A',
            background: 'rgba(123,26,26,0.6)',
            color: '#C49A2A',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}
        >
          ›
        </button>
      </div>

      <p
        style={{
          position: 'relative',
          zIndex: 10,
          fontSize: '12px',
          color: '#C49A2A',
          opacity: 0.7,
          margin: 0,
        }}
      >
        {currentIndex + 1} / {photos.length}
      </p>
    </section>
  )
}

export default Gallery
