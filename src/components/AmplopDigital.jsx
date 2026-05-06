import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C49A2A"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C49A2A"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C49A2A"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  )
}

function maskAccountNumber(accountNumber) {
  return `${accountNumber.slice(0, 3)}${'•'.repeat(
    Math.max(accountNumber.length - 3, 0),
  )}`
}

function AmplopDigital() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 })
  const [copiedAccount, setCopiedAccount] = useState('')
  const [visibleAccounts, setVisibleAccounts] = useState({})
  const [showAddress, setShowAddress] = useState(false)
  const [songketSrc, setSongketSrc] = useState('/songket-padang-mobile.svg')

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

  const handleCopy = async (accountNumber) => {
    await navigator.clipboard.writeText(accountNumber)
    setCopiedAccount(accountNumber)

    window.setTimeout(() => {
      setCopiedAccount((current) => (current === accountNumber ? '' : current))
    }, 1500)
  }

  return (
    <section
      id="kado"
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
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          <p className="text-[12px] uppercase tracking-[0.45em] text-ivory">
            hadiah &amp; kado
          </p>

          <h2 className="mt-2 text-ivory" style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>
            Doa dan kehadiran Anda sudah lebih dari cukup
          </h2>

          <p className="mt-2 max-w-[280px] text-[13px] text-ivory opacity-70">
            Namun jika Anda ingin memberikan tanda kasih, kami dengan senang hati
            menerimanya
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

        <div className="w-full max-w-md">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
            className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold"
          >
            Transfer
          </motion.p>

          <div className="flex flex-col gap-[0.6rem]">
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
              className="rounded-[8px] border border-gold bg-[#8C2020] px-4 py-3 text-left"
            >
              <p className="text-[13px] font-medium uppercase tracking-[0.3em] text-ivory">
                BCA
              </p>
              <p className="mt-[2px] text-[12px] text-gold">
                Salsabila Dectylana Fajari
              </p>
              <div className="mt-1.5 flex items-center justify-between gap-3">
                <p className="text-[18px] font-medium text-ivory">
                  {visibleAccounts['1740394122']
                    ? '1740394122'
                    : maskAccountNumber('1740394122')}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleAccounts((current) => ({
                        ...current,
                        '1740394122': !current['1740394122'],
                      }))
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-gold bg-transparent"
                    aria-label="Tampilkan atau sembunyikan nomor rekening BCA"
                  >
                    <EyeIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy('1740394122')}
                    className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-gold bg-transparent"
                    aria-label="Salin nomor rekening BCA"
                  >
                    {copiedAccount === '1740394122' ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: 40, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
              className="rounded-[8px] border border-gold bg-[#8C2020] px-4 py-3 text-left"
            >
              <p className="text-[13px] font-medium uppercase tracking-[0.3em] text-ivory">
                Bank Mandiri
              </p>
              <p className="mt-[2px] text-[12px] text-gold">
                I Nyoman Krisna Arka
              </p>
              <div className="mt-1.5 flex items-center justify-between gap-3">
                <p className="text-[18px] font-medium text-ivory">
                  {visibleAccounts['1020012219405']
                    ? '1020012219405'
                    : maskAccountNumber('1020012219405')}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleAccounts((current) => ({
                        ...current,
                        '1020012219405': !current['1020012219405'],
                      }))
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-gold bg-transparent"
                    aria-label="Tampilkan atau sembunyikan nomor rekening Mandiri"
                  >
                    <EyeIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy('1020012219405')}
                    className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-gold bg-transparent"
                    aria-label="Salin nomor rekening Mandiri"
                  >
                    {copiedAccount === '1020012219405' ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.9, ease: 'easeOut' }}
          className="relative my-6 h-4 w-20"
        >
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gold" />
          <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold bg-maroon" />
        </motion.div>

        <div className="w-full max-w-md">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 1.0, ease: 'easeOut' }}
            className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold"
          >
            Kirim Kado
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
            className="rounded-[8px] border border-gold bg-[#8C2020] p-4 text-center"
          >
            <p className="text-[14px] font-medium text-ivory">
              Salsabila Fajari
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-ivory">
              {showAddress
                ? 'Jl Bintaro Permai No 5, Bintaro Park View B1015, Pesanggrahan, Jakarta Selatan 12320'
                : '••• ••••••• ••• •, ••••••••••, •••••••••••• •••••'}
            </p>
            <button
              type="button"
              onClick={() => setShowAddress((current) => !current)}
              className="mt-4 rounded-[6px] border border-gold bg-transparent px-[14px] py-1.5 text-[12px] text-gold"
            >
              {showAddress ? 'Sembunyikan Alamat' : 'Tampilkan Alamat'}
            </button>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.3, ease: 'easeOut' }}
          className="mt-6 text-[13px] italic text-ivory opacity-70"
        >
          Terima kasih atas kebaikan hati Anda
        </motion.p>
      </div>
    </section>
  )
}

export default AmplopDigital
