import { useEffect, useState } from 'react'

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
  const [songketSrc, setSongketSrc] = useState('/songket-padang-mobile.svg')
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [dragStart, setDragStart] = useState(null)

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

  const goNext = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, photos.length - 1))
  const goPrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0))

  const getCardStyle = (index) => {
    const offset = index - currentIndex
    const absOffset = Math.abs(offset)

    if (absOffset > 3) {
      return { opacity: 0, pointerEvents: 'none', zIndex: -10 }
    }

    const translateX = offset * 120
    const scale = 1 - 0.2 * absOffset
    const rotateY = offset > 0 ? -1 : offset < 0 ? 1 : 0
    const blur = absOffset > 0 ? 5 : 0
    const opacity = absOffset > 2 ? 0 : absOffset > 0 ? 0.6 : 1
    const zIndex = absOffset === 0 ? 1 : -absOffset

    return {
      transform:
        absOffset === 0
          ? 'none'
          : `translateX(${translateX}px) scale(${scale}) perspective(16px) rotateY(${rotateY}deg)`,
      zIndex,
      filter: blur > 0 ? `blur(${blur}px)` : 'none',
      opacity,
      transition: 'all 0.5s ease',
    }
  }

  const handleTouchStart = (event) => setDragStart(event.touches[0].clientX)

  const handleTouchEnd = (event) => {
    if (dragStart === null) return

    const diff = dragStart - event.changedTouches[0].clientX

    if (diff > 50) goNext()
    else if (diff < -50) goPrev()

    setDragStart(null)
  }

  const handleMouseDown = (event) => setDragStart(event.clientX)

  const handleMouseUp = (event) => {
    if (dragStart === null) return

    const diff = dragStart - event.clientX

    if (diff > 50) goNext()
    else if (diff < -50) goPrev()

    setDragStart(null)
  }

  return (
    <section
      id="galeri"
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
        userSelect: 'none',
        paddingBottom: 'calc(70px + env(safe-area-inset-bottom))',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
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
            { src: '/batik-1.svg', size: 36, duration: 9, top: '8%' },
            { src: '/batik-2.svg', size: 26, duration: 13, top: '78%' },
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
            { src: '/batik-2.svg', size: 40, duration: 8, top: '8%' },
            { src: '/batik-1.svg', size: 28, duration: 11, top: '78%' },
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
            margin: 0,
          }}
        >
          Galeri
        </p>
        <p
          style={{
            fontSize: '16px',
            color: '#F5E6C8',
            fontStyle: 'italic',
            margin: '4px 0 0',
          }}
        >
          Momen bersama
        </p>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: 'min(320px, 46vh)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        {photos.map((src, index) => (
          <div
            key={index}
            onClick={() => {
              if (index > currentIndex) goNext()
              else if (index < currentIndex) goPrev()
            }}
            style={{
              position: 'absolute',
              width: 'min(180px, 46vw)',
              height: 'min(280px, 42vh)',
              borderRadius: '12px',
              overflow: 'hidden',
              border:
                index === currentIndex
                  ? '2px solid #C49A2A'
                  : '1px solid rgba(196,154,42,0.3)',
              boxShadow:
                index === currentIndex
                  ? '0 25px 50px rgba(0,0,0,0.5)'
                  : '0 8px 24px rgba(0,0,0,0.3)',
              cursor: index !== currentIndex ? 'pointer' : 'default',
              left: 'calc(50% - min(90px, 23vw))',
              top: 0,
              ...getCardStyle(index),
            }}
          >
            <img
              src={src}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <button
          onClick={goPrev}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid #C49A2A',
            background: 'rgba(123,26,26,0.6)',
            color: '#C49A2A',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            transition: 'all 0.2s',
          }}
        >
          ‹
        </button>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {photos.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
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
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid #C49A2A',
            background: 'rgba(123,26,26,0.6)',
            color: '#C49A2A',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            transition: 'all 0.2s',
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
