import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const RSVP_STORAGE_KEY = 'wedding-maroon-rsvp'

const initialWishes = [
  {
    nama: 'Budi Santoso',
    pesan: 'Semoga menjadi keluarga yang sakinah mawaddah warahmah. Bahagia selalu!',
  },
  {
    nama: 'Rina & Keluarga',
    pesan: 'Selamat menempuh hidup baru, semoga langgeng sampai tua.',
  },
  {
    nama: 'Tim Kantor',
    pesan: 'Congrats Salsa & Arkan! Happily ever after starts now.',
  },
]

function getStoredRsvp() {
  const fallback = {
    fullName: '',
    phoneNumber: '',
    attendance: '',
    guestCount: 1,
    hasSavedData: false,
  }

  const savedRsvp = window.localStorage.getItem(RSVP_STORAGE_KEY)

  if (!savedRsvp) {
    return fallback
  }

  try {
    const parsed = JSON.parse(savedRsvp)

    return {
      fullName: parsed.fullName ?? '',
      phoneNumber: parsed.phoneNumber ?? '',
      attendance: parsed.attendance ?? '',
      guestCount: parsed.guestCount ?? 1,
      hasSavedData: true,
    }
  } catch {
    window.localStorage.removeItem(RSVP_STORAGE_KEY)
    return fallback
  }
}

function Divider() {
  return (
    <div className="relative h-4 w-20">
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gold" />
      <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold bg-maroon" />
    </div>
  )
}

function RSVP() {
  const [initialRsvp] = useState(() => getStoredRsvp())
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 })
  const [hasSubmitted, setHasSubmitted] = useState(initialRsvp.hasSavedData)
  const [fullName, setFullName] = useState(initialRsvp.fullName)
  const [phoneNumber, setPhoneNumber] = useState(initialRsvp.phoneNumber)
  const [attendance, setAttendance] = useState(initialRsvp.attendance)
  const [guestCount, setGuestCount] = useState(initialRsvp.guestCount)
  const [pesan, setPesan] = useState('')
  const [wishes, setWishes] = useState(initialWishes)
  const [songketSrc, setSongketSrc] = useState('/songket-padang-mobile.svg')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState(
    initialRsvp.hasSavedData ? 'Konfirmasi terakhir Anda telah dimuat kembali.' : '',
  )

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

  const handleSubmit = () => {
    const trimmedName = fullName.trim()
    const trimmedPhoneNumber = phoneNumber.trim()
    const trimmedPesan = pesan.trim()

    if (!trimmedName || !trimmedPhoneNumber || !attendance) {
      setErrorMessage('Mohon lengkapi nama, nomor HP, dan status kehadiran.')
      setSuccessMessage('')
      return
    }

    const payload = {
      fullName: trimmedName,
      phoneNumber: trimmedPhoneNumber,
      attendance,
      guestCount,
      pesan: trimmedPesan,
      submittedAt: new Date().toISOString(),
    }

    window.localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(payload))
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
    setSuccessMessage('Konfirmasi tersimpan di perangkat ini.')
    setHasSubmitted(true)
  }

  return (
    <section
      id="rsvp"
      data-no-autoscroll="true"
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

              <h2 className="mt-2 text-ivory" style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>
                Kehadiran Anda adalah kebahagiaan kami
              </h2>

              <p className="mt-2 text-[13px] text-gold">
                Mohon konfirmasi sebelum 14 Juni 2026
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              className="relative my-3 h-4 w-20"
            >
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gold" />
              <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold bg-maroon" />
            </motion.div>

            <div className="flex w-full max-w-md flex-col gap-[0.6rem] text-left">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              >
                <label className="mb-2 block text-[12px] uppercase tracking-[0.3em] text-ivory">
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
                  className="w-full rounded-[8px] border border-gold bg-[#8C2020] px-[12px] py-[8px] text-[15px] text-ivory placeholder:text-ivory placeholder:opacity-50 focus:outline-none"
                />
              </motion.div>

              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.55, ease: 'easeOut' }}
              >
                <label className="mb-2 block text-[12px] uppercase tracking-[0.3em] text-ivory">
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
                  className="w-full rounded-[8px] border border-gold bg-[#8C2020] px-[12px] py-[8px] text-[15px] text-ivory placeholder:text-ivory placeholder:opacity-50 focus:outline-none"
                />
              </motion.div>

              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
              >
                <label className="mb-2 block text-[12px] uppercase tracking-[0.3em] text-ivory">
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
                    className={`w-1/2 rounded-full border px-4 py-2 text-center text-[15px] transition-colors ${
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
                    className={`w-1/2 rounded-full border px-4 py-2 text-center text-[15px] transition-colors ${
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
                <label className="mb-2 block text-[12px] uppercase tracking-[0.3em] text-ivory">
                  Jumlah Tamu
                </label>
                <div className="flex items-center justify-center gap-4 rounded-[8px] border border-gold bg-[#8C2020] px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setGuestCount((count) => Math.max(1, count - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gold bg-transparent text-gold"
                  >
                    -
                  </button>
                  <span className="min-w-10 text-center text-[18px] text-ivory">
                    {guestCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuestCount((count) => count + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gold bg-transparent text-gold"
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
                <label className="mb-2 block text-[12px] uppercase tracking-[0.3em] text-ivory">
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
                    padding: '10px 14px',
                    color: '#F5E6C8',
                    fontFamily: 'Lora',
                    fontSize: '15px',
                    width: '100%',
                    height: '100px',
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
                className="mt-2 w-full rounded-[8px] bg-gold px-4 py-3 text-[16px] font-medium text-maroon"
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
          <div className="flex w-full h-full flex-col items-center justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-3 text-center"
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

            <div className="w-full max-w-md flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: 'calc(100dvh - 280px)' }}>
              {wishes.map((item, index) => (
                <motion.div
                  key={`${item.nama}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="rounded-[8px] border border-gold bg-[#8C2020] p-4 text-left"
                >
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{item.nama}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-ivory">{item.pesan}</p>
                </motion.div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setHasSubmitted(false)}
              className="text-[12px] text-gold underline opacity-70 mt-2"
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
