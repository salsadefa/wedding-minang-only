import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { supabase } from '../lib/supabase'

function Divider() {
  return (
    <div className="relative h-4 w-20">
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gold" />
      <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold bg-maroon" />
    </div>
  )
}

function RSVP() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 })
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [attendance, setAttendance] = useState('')
  const [guestCount, setGuestCount] = useState(1)
  const [pesan, setPesan] = useState('')
  const [wishes, setWishes] = useState([])
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [songketSrc, setSongketSrc] = useState('/songket-padang-mobile.svg')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

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

  useEffect(() => {
    const fetchWishes = async () => {
      const { data, error } = await supabase
        .from('wishes')
        .select('nama, pesan')
        .order('created_at', { ascending: false })
        .limit(20)

      if (!error && data) {
        setWishes(data)
      }
    }

    fetchWishes()
  }, [])

  const handleSubmit = async () => {
    const trimmedName = fullName.trim()
    const trimmedPhoneNumber = phoneNumber.trim()
    const trimmedPesan = pesan.trim()

    if (!trimmedName || !trimmedPhoneNumber || !attendance) {
      setErrorMessage('Mohon lengkapi nama, nomor HP, dan status kehadiran.')
      setSuccessMessage('')
      return
    }

    try {
      const { error: rsvpError } = await supabase
        .from('rsvp')
        .insert({
          full_name: trimmedName,
          phone_number: trimmedPhoneNumber,
          attendance,
          guest_count: guestCount,
          pesan: trimmedPesan,
        })

      if (rsvpError) {
        throw rsvpError
      }

      if (trimmedPesan) {
        const { error: wishError } = await supabase
          .from('wishes')
          .insert({
            nama: trimmedName,
            pesan: trimmedPesan,
          })

        if (wishError) {
          throw wishError
        }
      }

      setWishes((current) => [
        {
          nama: trimmedName,
          pesan: trimmedPesan || 'Turut berbahagia atas hari istimewa kalian.',
        },
        ...current,
      ])

      setFullName('')
      setPhoneNumber('')
      setAttendance('')
      setGuestCount(1)
      setPesan('')
      setErrorMessage('')
      setSuccessMessage('Konfirmasi tersimpan!')
      setHasSubmitted(true)
    } catch (err) {
      console.error('Supabase error:', err)
      setErrorMessage('Gagal menyimpan konfirmasi. Coba lagi ya!')
    }
  }

  return (
    <section
      id="rsvp"
      data-no-autoscroll="true"
      ref={sectionRef}
      className="relative flex h-[100dvh] flex-col justify-center overflow-hidden px-4 py-3 font-cormorant"
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
        {!hasSubmitted ? (
          <div className="flex w-full h-full flex-col items-center justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            >
              <p className="text-[12px] uppercase tracking-[0.45em] text-ivory">
                konfirmasi kehadiran
              </p>

              <h2 className="mt-2 text-ivory" style={{ fontSize: 'clamp(13px, 3vw, 16px)' }}>
                Kehadiran Anda adalah kebahagiaan kami
              </h2>

              <p className="mt-2 text-[11px] text-gold">
                Mohon konfirmasi sebelum 14 Juni 2026
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              className="relative my-1 h-4 w-20"
            >
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gold" />
              <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold bg-maroon" />
            </motion.div>

            <div className="flex w-full max-w-md flex-col gap-[0.3rem] text-left">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              >
                <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ivory">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => {
                    setFullName(event.target.value)
                    if (errorMessage) {
                      setErrorMessage('')
                    }
                  }}
                  placeholder="Masukkan nama lengkap"
                  className="w-full rounded-[8px] border border-gold bg-[#8C2020] px-[10px] py-[6px] text-[13px] text-ivory placeholder:text-ivory placeholder:opacity-50 focus:outline-none"
                />
              </motion.div>

              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.55, ease: 'easeOut' }}
              >
                <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ivory">
                  Nomor HP
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(event) => {
                    setPhoneNumber(event.target.value)
                    if (errorMessage) {
                      setErrorMessage('')
                    }
                  }}
                  placeholder="Masukkan nomor HP"
                  className="w-full rounded-[8px] border border-gold bg-[#8C2020] px-[10px] py-[6px] text-[13px] text-ivory placeholder:text-ivory placeholder:opacity-50 focus:outline-none"
                />
              </motion.div>

              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
              >
                <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ivory">
                  Konfirmasi Kehadiran
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAttendance('Hadir')
                      if (errorMessage) {
                        setErrorMessage('')
                      }
                    }}
                    className={`w-1/2 rounded-full border px-2 py-1 text-center text-[13px] transition-colors ${
                      attendance === 'Hadir'
                        ? 'border-gold bg-gold font-medium text-maroon'
                        : 'border-gold bg-transparent text-gold'
                    }`}
                  >
                    Hadir
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAttendance('Tidak Hadir')
                      if (errorMessage) {
                        setErrorMessage('')
                      }
                    }}
                    className={`w-1/2 rounded-full border px-2 py-1 text-center text-[13px] transition-colors ${
                      attendance === 'Tidak Hadir'
                        ? 'border-gold bg-gold font-medium text-maroon'
                        : 'border-gold bg-transparent text-gold'
                    }`}
                  >
                    Tidak Hadir
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.85, ease: 'easeOut' }}
              >
                <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ivory">
                  Jumlah Tamu
                </label>
                <div className="flex items-center justify-center gap-4 rounded-[8px] border border-gold bg-[#8C2020] px-4 py-2">
                  <button
                    type="button"
                    onClick={() => setGuestCount((count) => Math.max(1, count - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-gold bg-transparent text-gold"
                  >
                    -
                  </button>
                  <span className="min-w-10 text-center text-[15px] text-ivory">
                    {guestCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuestCount((count) => count + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-gold bg-transparent text-gold"
                  >
                    +
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.95, ease: 'easeOut' }}
              >
                <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ivory">
                  Pesan untuk Pengantin
                </label>
                <textarea
                  value={pesan}
                  onChange={(event) => {
                    setPesan(event.target.value)
                    if (errorMessage) {
                      setErrorMessage('')
                    }
                  }}
                  placeholder="Tuliskan doa dan pesanmu untuk kami"
                  style={{
                    background: '#8C2020',
                    border: '1px solid #C49A2A',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    color: '#F5E6C8',
                    fontFamily: 'Lora',
                    fontSize: '13px',
                    width: '100%',
                    height: '70px',
                    resize: 'none',
                  }}
                  className="placeholder:text-ivory placeholder:opacity-50 focus:outline-none"
                />
              </motion.div>

              <motion.button
                type="button"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
                onClick={handleSubmit}
                className="mt-1 w-full rounded-[8px] bg-gold px-4 py-2 text-[14px] font-medium text-maroon"
              >
                Kirim Konfirmasi
              </motion.button>

              {errorMessage ? (
                <p className="text-center text-[13px] text-[#FFD7D7]">{errorMessage}</p>
              ) : null}

              {successMessage ? (
                <p className="text-center text-[13px] text-gold">{successMessage}</p>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="flex w-full h-full flex-col items-center justify-center gap-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <p className="text-[12px] uppercase tracking-[0.45em] text-ivory">Terima Kasih</p>
              <h2 className="text-ivory" style={{ fontSize: 'clamp(18px, 4vw, 24px)' }}>
                Konfirmasi diterima 🤍
              </h2>
              <p className="text-[13px] text-gold">Kami tidak sabar menyambut Anda</p>
              <div className="relative my-2 h-4 w-20">
                <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gold" />
                <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold bg-maroon" />
              </div>
            </motion.div>

            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Pesan &amp; Doa</p>

            <div className="w-full max-w-md flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: 'calc(100dvh - 240px)' }}>
              {wishes.map((item, index) => (
                <motion.div
                  key={`${item.nama}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="rounded-[8px] border border-gold bg-[#8C2020] p-3 text-left"
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{item.nama}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ivory">{item.pesan}</p>
                </motion.div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setHasSubmitted(false)}
              className="mt-1 text-[12px] text-gold underline opacity-70"
            >
              Edit konfirmasi
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default RSVP
