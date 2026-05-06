import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const WISHES_STORAGE_KEY = 'wedding-maroon-wishes'

const initialWishes = [
  {
    name: 'Budi Santoso',
    wish: 'Semoga menjadi keluarga yang sakinah mawaddah warahmah. Bahagia selalu!',
  },
  {
    name: 'Rina & Keluarga',
    wish: 'Selamat menempuh hidup baru, semoga langgeng sampai tua.',
  },
  {
    name: 'Tim Kantor',
    wish: 'Congrats Salsa & Arkan! Happily ever after starts now.',
  },
]

const photoSources = [
  '/minang-1.jpg',
  '/minang-2.jpg',
  '/minang-3.jpg',
  '/minang-4.jpg',
]

const doubledPhotoSources = [...photoSources, ...photoSources]

function Divider() {
  return (
    <div className="relative my-6 h-4 w-20">
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gold" />
      <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold bg-maroon" />
    </div>
  )
}

function PhotoCard({ src, alt }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className="h-[180px] w-[130px] shrink-0 rounded-[4px] border border-gold bg-[#8C2020]" />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className="h-[180px] w-[130px] shrink-0 rounded-[4px] border border-gold object-cover"
    />
  )
}

function Ucapan() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const [name, setName] = useState('')
  const [wish, setWish] = useState('')
  const [wishes, setWishes] = useState(() => {
    const savedWishes = window.localStorage.getItem(WISHES_STORAGE_KEY)

    if (!savedWishes) {
      return initialWishes
    }

    try {
      const parsed = JSON.parse(savedWishes)
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialWishes
    } catch {
      return initialWishes
    }
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)

  const handleSubmit = () => {
    const trimmedName = name.trim()
    const trimmedWish = wish.trim()

    if (!trimmedName || !trimmedWish) {
      setErrorMessage('Mohon isi nama dan ucapan terlebih dahulu.')
      return
    }

    const nextWishes = [
      {
        name: trimmedName,
        wish: trimmedWish,
      },
      ...wishes,
    ]

    setWishes(nextWishes)
    window.localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(nextWishes))

    setName('')
    setWish('')
    setErrorMessage('')
  }

  return (
    <section
      id="ucapan"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-maroon px-8 py-8 font-cormorant"
      style={{
        minHeight: '100dvh',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'normal',
        overflowY: 'auto',
      }}
    >
      <div className="absolute inset-0 bg-maroon" />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/songket-pattern.svg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '900px auto',
          backgroundPosition: 'center',
          opacity: 0.15,
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center py-8 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          <p className="text-[12px] uppercase tracking-[0.45em] text-ivory">
            kirim ucapan
          </p>

          <h2 className="mt-2 text-[20px] text-ivory">
            Tuliskan doa dan harapan Anda untuk kami
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        >
          <Divider />
        </motion.div>

        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          className="w-full max-w-md overflow-hidden pb-2"
          style={{
            overflow: 'hidden',
            width: '100%',
            position: 'relative',
          }}
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
        >
          <div
            style={{
              display: 'flex',
              gap: '12px',
              width: 'max-content',
              animation: 'scrollCarousel 12s linear infinite',
              animationPlayState: isCarouselPaused ? 'paused' : 'running',
            }}
          >
            {doubledPhotoSources.map((src, index) => (
              <PhotoCard key={`${src}-${index}`} src={src} alt={`Minang ${index + 1}`} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
        >
          <Divider />
        </motion.div>

        <div className="flex w-full max-w-md flex-col gap-4 text-left">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
          >
            <label className="mb-2 block text-[12px] uppercase tracking-[0.3em] text-ivory">
              Nama
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                if (errorMessage) {
                  setErrorMessage('')
                }
              }}
              placeholder="Masukkan nama Anda"
              className="w-full rounded-[8px] border border-gold bg-[#8C2020] px-[14px] py-[10px] text-[15px] text-ivory placeholder:text-ivory placeholder:opacity-50 focus:outline-none"
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.85, ease: 'easeOut' }}
          >
            <label className="mb-2 block text-[12px] uppercase tracking-[0.3em] text-ivory">
              Ucapan &amp; Doa
            </label>
            <textarea
              value={wish}
              onChange={(event) => {
                setWish(event.target.value)
                if (errorMessage) {
                  setErrorMessage('')
                }
              }}
              placeholder="Tuliskan ucapan dan doa Anda di sini"
              className="h-[120px] w-full resize-none rounded-[8px] border border-gold bg-[#8C2020] px-[14px] py-[10px] text-[15px] text-ivory placeholder:text-ivory placeholder:opacity-50 focus:outline-none"
            />
          </motion.div>

          <motion.button
            type="button"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
            onClick={handleSubmit}
            className="mt-4 w-full rounded-[8px] bg-gold px-4 py-3 text-[16px] font-medium text-maroon"
          >
            Kirim Ucapan
          </motion.button>

          {errorMessage ? (
            <p className="text-center text-[13px] text-[#FFD7D7]">{errorMessage}</p>
          ) : null}

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: 'easeOut' }}
            className="mt-6 flex max-h-[300px] flex-col gap-3 overflow-y-auto"
          >
            {wishes.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="rounded-[8px] border border-gold bg-[#8C2020] p-4"
              >
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
                  {item.name}
                </p>
                <p className="mt-1 text-[14px] leading-relaxed text-ivory">
                  {item.wish}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.7, delay: 1.4, ease: 'easeOut' }}
          className="mt-8 flex w-full flex-col items-center"
        >
          <Divider />

          <h3 className="mt-6 text-[32px] font-medium text-ivory">
            Salsa &amp; Arkan
          </h3>
          <p className="mt-2 text-[14px] text-gold">21 Juni 2026</p>
          <p className="mt-3 max-w-[280px] text-[13px] italic text-ivory opacity-70">
            Dengan penuh syukur dan kebahagiaan, kami mengundang Anda untuk
            menjadi bagian dari hari istimewa kami
          </p>
          <p className="mt-3 text-[12px] text-gold">#SalsaDanArkan2026</p>
        </motion.div>
      </div>
    </section>
  )
}

export default Ucapan
