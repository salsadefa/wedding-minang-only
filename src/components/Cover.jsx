import { useEffect, useState } from 'react'

const OPEN_PRELOAD_IMAGES = [
  '/salsa-profile.png',
  '/arkan-profile.jpg',
  '/rumah-gadang.svg',
  '/latar-rg.png',
]

const DEFERRED_PRELOAD_IMAGES = [
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

const preloadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = resolve
    img.onerror = resolve
    img.src = src
  })

const warmImages = (sources) => {
  let index = 0

  const loadNext = () => {
    if (index >= sources.length) {
      return
    }

    const img = new Image()
    img.decoding = 'async'
    img.src = sources[index]
    index += 1

    schedule(loadNext)
  }

  const schedule = (callback) => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(callback, { timeout: 3000 })
      return
    }

    window.setTimeout(callback, 250)
  }

  schedule(loadNext)
}

const warmImagesAfterDelay = (sources) => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => warmImages(sources), { timeout: 3000 })
    return
  }

  window.setTimeout(() => warmImages(sources), 1500)
}

function Cover({ isLowEnd = false, onOpen }) {
  const [guestName, setGuestName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= 768 && window.innerWidth > window.innerHeight,
  )

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const name = params.get('to')

    if (name) {
      setGuestName(decodeURIComponent(name))
    }
  }, [])

  useEffect(() => {
    const update = () => {
      setIsDesktop(window.innerWidth >= 768 && window.innerWidth > window.innerHeight)
    }

    update()
    window.addEventListener('resize', update)

    return () => window.removeEventListener('resize', update)
  }, [])

  const MOBILE = { w: 393, h: 852 }
  const DESKTOP = { w: 1280, h: 800 }
  const canvas = isDesktop ? DESKTOP : MOBILE

  const coords = isDesktop
    ? {
        goldflower: { x: 346, y: 293.31, w: 287.89 },
        rosegoldflower: { x: 626, y: 93, w: 259 },
        flower1: { x: 356, y: 215, w: 251 },
        envelope: { x: 465, y: 139, w: 316, h: 363 },
        prangko: { x: 647, y: 391, w: 111 },
      }
    : {
        goldflower: { x: 29, y: 241, w: 176.78 },
        rosegoldflower: { x: 200.95, y: 118, w: 159 },
        flower1: { x: 35, y: 193.02, w: 154 },
        envelope: { x: 101.95, y: 146, w: 194, h: 222.67 },
        prangko: { x: 214, y: 351, w: 68 },
      }

  const prangkoLeft = isDesktop
    ? `${((coords.prangko.x - coords.envelope.x) / coords.envelope.w) * 100}%`
    : '57.8%'
  const prangkoTop = isDesktop
    ? `${((coords.prangko.y - coords.envelope.y) / coords.envelope.h) * 100}%`
    : '69.6%'
  const prangkoWidth = `${(coords.prangko.w / coords.envelope.w) * 100}%`
  const flowerSrc = isDesktop ? '/flower1.png' : '/flower1-mobile.png'
  const envelopeSrc = isDesktop ? '/envelope-love.png' : '/envelope-love-mobile.png'
  const prangkoSrc = isDesktop ? '/Prangko.png' : '/Prangko-mobile.png'

  const handleOpen = () => {
    setIsLoading(true)

    Promise.all(OPEN_PRELOAD_IMAGES.map(preloadImage)).then(() => {
      onOpen()
      warmImagesAfterDelay(DEFERRED_PRELOAD_IMAGES)
    })
  }

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={isDesktop ? '/background-merah-desktop.png' : '/background-merah.png'}
        alt=""
        loading="eager"
        fetchPriority="high"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 0,
        }}
      />

      <img
        src="/goldflower.webp"
        alt=""
        loading="eager"
        decoding="async"
        style={{
          position: 'absolute',
          left: `${(coords.goldflower.x / canvas.w) * 100}%`,
          top: `${(coords.goldflower.y / canvas.h) * 100}%`,
          width: `${(coords.goldflower.w / canvas.w) * 100}%`,
          height: 'auto',
          zIndex: 1,
          transformOrigin: 'center center',
          pointerEvents: 'none',
          animation: isLowEnd ? 'none' : 'coverRotateSway 4s ease-in-out infinite',
        }}
      />

      <img
        src="/rosegoldflower.webp"
        alt=""
        loading="eager"
        decoding="async"
        style={{
          position: 'absolute',
          left: `${(coords.rosegoldflower.x / canvas.w) * 100}%`,
          top: `${(coords.rosegoldflower.y / canvas.h) * 100}%`,
          width: `${(coords.rosegoldflower.w / canvas.w) * 100}%`,
          height: 'auto',
          zIndex: 1,
          transformOrigin: 'center center',
          pointerEvents: 'none',
          animation: isLowEnd ? 'none' : 'spinVinyl 6s linear infinite',
        }}
      />

      <img
        src={flowerSrc}
        alt=""
        loading="eager"
        decoding="async"
        style={{
          position: 'absolute',
          left: `${(coords.flower1.x / canvas.w) * 100}%`,
          top: `${(coords.flower1.y / canvas.h) * 100}%`,
          width: `${(coords.flower1.w / canvas.w) * 100}%`,
          height: 'auto',
          zIndex: 5,
          transformOrigin: 'center center',
          pointerEvents: 'none',
          animation: isLowEnd ? 'none' : 'coverFloatX 3s ease-in-out infinite',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: `${(coords.envelope.x / canvas.w) * 100}%`,
          top: `${(coords.envelope.y / canvas.h) * 100}%`,
          width: `${(coords.envelope.w / canvas.w) * 100}%`,
          zIndex: 3,
        }}
      >
        <img
          src={envelopeSrc}
          alt=""
          loading="eager"
          decoding="async"
          width="316"
          height="363"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            transformOrigin: 'center center',
            pointerEvents: 'none',
            animation: isLowEnd ? 'none' : 'coverPulse 3s ease-in-out infinite',
          }}
        />
        <img
          src={prangkoSrc}
          alt=""
          loading="eager"
          decoding="async"
          style={{
            position: 'absolute',
            left: prangkoLeft,
            top: prangkoTop,
            width: prangkoWidth,
            height: 'auto',
            pointerEvents: 'none',
            animation: 'stampDrop 0.6s cubic-bezier(0.2, 0.9, 0.35, 1.25) 0.5s both',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          top: isDesktop ? '68%' : '55%',
          left: 0,
          right: 0,
          zIndex: 10,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          padding: '0 32px',
        }}
      >
        <p
          style={{
            fontFamily: 'Lora, serif',
            fontSize: '13px',
            color: '#F5E6C8',
            opacity: 0.85,
            margin: 0,
          }}
        >
          Kepada Yth.
        </p>
        <p
          style={{
            fontFamily: 'Lora, serif',
            fontSize: '13px',
            color: '#F5E6C8',
            opacity: 0.85,
            margin: 0,
          }}
        >
          Bapak/Ibu/Saudara/i
        </p>
        <p
          style={{
            fontFamily: 'Lora, serif',
            fontSize: '20px',
            fontWeight: '600',
            color: '#F5E6C8',
            letterSpacing: '0.05em',
            margin: '4px 0',
            textTransform: 'uppercase',
          }}
        >
          {guestName || 'Nama Tamu'}
        </p>

        <p
          style={{
            fontFamily: 'Lora, serif',
            fontSize: '10px',
            color: '#F5E6C8',
            opacity: 0.6,
            fontStyle: 'italic',
            margin: 0,
            maxWidth: '280px',
          }}
        >
          *Mohon maaf apabila terdapat kesalahan dalam penulisan nama / gelar
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginTop: '20px' }}>
          <button
            className="cover-open-button"
            onClick={handleOpen}
            disabled={isLoading}
            style={{
              background: '#F5E6C8',
              border: 'none',
              borderRadius: '50px',
              padding: '12px 40px',
              color: '#7B1A1A',
              fontFamily: 'Lora, serif',
              fontSize: '15px',
              fontWeight: '500',
              letterSpacing: '0.05em',
              cursor: isLoading ? 'default' : 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              opacity: isLoading ? 0.8 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minWidth: '180px',
              justifyContent: 'center',
              width: '220px',
              whiteSpace: 'nowrap',
            }}
          >
            {isLoading ? (
              <>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #7B1A1A',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spinVinyl 1s linear infinite',
                  }}
                />
                Memuat...
              </>
            ) : (
              'Buka Undangan'
            )}
          </button>
          <button
            onClick={() => window.open('https://arkansalsa.duajiwa.com', '_blank')}
            style={{
              background: 'transparent',
              border: '1.5px solid #F5E6C8',
              borderRadius: '50px',
              padding: '12px 32px',
              color: '#F5E6C8',
              fontFamily: 'Lora, serif',
              fontSize: '15px',
              fontWeight: '500',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              opacity: 0.85,
              width: '220px',
              whiteSpace: 'nowrap',
            }}
          >
            Kisah Kami
          </button>
        </div>
      </div>
    </section>
  )
}

export default Cover
