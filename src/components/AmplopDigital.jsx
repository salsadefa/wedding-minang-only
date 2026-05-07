import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'

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

const modalBackdropStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 300,
  background: 'rgba(0,0,0,0.6)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
}

const modalCardStyle = {
  background: 'rgba(123, 26, 26, 0.85)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(196, 154, 42, 0.4)',
  borderRadius: '16px',
  padding: '28px 24px',
  width: '100%',
  maxWidth: '340px',
  position: 'relative',
}

const infoCardStyle = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(196,154,42,0.3)',
  borderRadius: '10px',
  padding: '14px 16px',
}

function Divider() {
  return (
    <div className="relative mx-auto h-4 w-20">
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gold" />
      <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold bg-maroon" />
    </div>
  )
}

function AmplopDigital() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 })
  const [showAngpao, setShowAngpao] = useState(false)
  const [showKado, setShowKado] = useState(false)
  const [copiedAccount, setCopiedAccount] = useState('')
  const [addressCopied, setAddressCopied] = useState(false)
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

  const handleCopyAccount = async (accountNumber) => {
    await navigator.clipboard.writeText(accountNumber)
    setCopiedAccount(accountNumber)

    window.setTimeout(() => {
      setCopiedAccount((current) => (current === accountNumber ? '' : current))
    }, 1500)
  }

  const handleCopyAddress = async () => {
    const address =
      'Jl Bintaro Permai No 5, Bintaro Park View B1015, Pesanggrahan, Jakarta Selatan 12320'

    await navigator.clipboard.writeText(address)
    setAddressCopied(true)

    window.setTimeout(() => {
      setAddressCopied(false)
    }, 1500)
  }

  return (
    <>
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
          animation:
            songketSrc === '/songket-padang-mobile.svg'
              ? 'breathe 6s ease-in-out infinite'
              : 'none',
          transformOrigin: 'center center',
        }}
      />

      {isMobile && (
        <>
          <img
            src="/bunga-atas.svg"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
              pointerEvents: 'none',
              zIndex: 1,
              animation: 'breathe 4s ease-in-out infinite',
              transformOrigin: 'center top',
            }}
          />

          <img
            src="/flower-putih.svg"
            style={{
              position: 'absolute',
              top: '-5px',
              left: '14%',
              width: 'min(60px, 14vw)',
              pointerEvents: 'none',
              zIndex: 2,
              animation: 'rotateCW 5s ease-in-out infinite',
              transformOrigin: 'center center',
            }}
          />

          <img
            src="/flower-putih.svg"
            style={{
              position: 'absolute',
              top: '-5px',
              left: '66%',
              width: 'min(60px, 14vw)',
              pointerEvents: 'none',
              zIndex: 2,
              animation: 'rotateCW 6s ease-in-out infinite',
              transformOrigin: 'center center',
            }}
          />

          {[
            { src: '/batik-1.svg', size: 44, duration: 8, top: '18%' },
            { src: '/batik-2.svg', size: 32, duration: 11, top: '35%' },
            { src: '/batik-1.svg', size: 38, duration: 7, top: '52%' },
            { src: '/batik-2.svg', size: 28, duration: 13, top: '68%' },
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
            { src: '/batik-1.svg', size: 36, duration: 9, top: '18%' },
            { src: '/batik-2.svg', size: 48, duration: 6, top: '35%' },
            { src: '/batik-1.svg', size: 30, duration: 12, top: '52%' },
            { src: '/batik-2.svg', size: 42, duration: 8, top: '68%' },
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

          <img
            src="/bunga-bawah.svg"
            style={{
              position: 'absolute',
              bottom: '60px',
              left: 0,
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'bottom',
              pointerEvents: 'none',
              zIndex: 1,
              animation: 'breathe 5s ease-in-out infinite',
              transformOrigin: 'center bottom',
            }}
          />
        </>
      )}

      <div className="relative z-10 mx-auto flex h-full w-full max-w-2xl flex-col items-center justify-center py-4 text-center" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            <p className="text-[12px] uppercase tracking-[0.45em] text-ivory">
              hadiah &amp; kado
            </p>

            <h2
              className="mt-2 text-ivory"
              style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}
            >
              Doa dan kehadiran Anda sudah lebih dari cukup
            </h2>

          <p
            className="mt-2 text-[13px] text-ivory opacity-70"
            style={{ textAlign: 'center', width: '100%', maxWidth: '280px', margin: '0.5rem auto 0' }}
          >
            Namun jika Anda ingin memberikan tanda kasih, kami dengan senang hati
            menerimanya
          </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className="my-4"
          >
            <Divider />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              width: '100%',
              maxWidth: '280px',
              margin: '0 auto',
            }}
          >
            <button
              type="button"
              onClick={() => setShowAngpao(true)}
              style={{
                background: 'transparent',
                border: '1px solid #C49A2A',
                borderRadius: '8px',
                padding: '14px 24px',
                color: '#C49A2A',
                fontFamily: 'Lora',
                fontSize: '16px',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              💝 Kirim Angpao
            </button>

            <button
              type="button"
              onClick={() => setShowKado(true)}
              style={{
                background: 'transparent',
                border: '1px solid #C49A2A',
                borderRadius: '8px',
                padding: '14px 24px',
                color: '#C49A2A',
                fontFamily: 'Lora',
                fontSize: '16px',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              🎁 Kirim Kado
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
            className="mt-6 text-[13px] italic text-ivory opacity-70"
          >
            Terima kasih atas kebaikan hati Anda
          </motion.p>
        </div>
      </section>

      <AnimatePresence>
        {showAngpao ? (
          <motion.div
            key="angpao-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={modalBackdropStyle}
            onClick={() => setShowAngpao(false)}
          >
            <div style={modalCardStyle} onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                onClick={() => setShowAngpao(false)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '16px',
                  background: 'transparent',
                  border: 'none',
                  color: '#C49A2A',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
                aria-label="Tutup modal angpao"
              >
                ✕
              </button>

              <h3
                style={{
                  color: '#F5E6C8',
                  fontSize: '20px',
                  textAlign: 'center',
                  marginBottom: '20px',
                }}
              >
                Kirim Angpao
              </h3>

              <Divider />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <div style={infoCardStyle}>
                  <p
                    style={{
                      color: '#C49A2A',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                    }}
                  >
                    BCA
                  </p>
                  <p style={{ color: '#F5E6C8', fontSize: '13px', marginTop: '2px' }}>
                    Salsabila Dectylana Fajari
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      marginTop: '8px',
                    }}
                  >
                    <p
                      style={{
                        color: '#F5E6C8',
                        fontSize: '20px',
                        fontFamily: 'Lora',
                        fontWeight: 500,
                        margin: 0,
                      }}
                    >
                      1740394122
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCopyAccount('1740394122')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      aria-label="Salin nomor rekening BCA"
                    >
                      {copiedAccount === '1740394122' ? <CheckIcon /> : <CopyIcon />}
                    </button>
                  </div>
                </div>

                <div style={infoCardStyle}>
                  <p
                    style={{
                      color: '#C49A2A',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                    }}
                  >
                    Bank Mandiri
                  </p>
                  <p style={{ color: '#F5E6C8', fontSize: '13px', marginTop: '2px' }}>
                    I Nyoman Krisna Arka
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      marginTop: '8px',
                    }}
                  >
                    <p
                      style={{
                        color: '#F5E6C8',
                        fontSize: '20px',
                        fontFamily: 'Lora',
                        fontWeight: 500,
                        margin: 0,
                      }}
                    >
                      1020012219405
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCopyAccount('1020012219405')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      aria-label="Salin nomor rekening Mandiri"
                    >
                      {copiedAccount === '1020012219405' ? <CheckIcon /> : <CopyIcon />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showKado ? (
          <motion.div
            key="kado-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={modalBackdropStyle}
            onClick={() => setShowKado(false)}
          >
            <div style={modalCardStyle} onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                onClick={() => setShowKado(false)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '16px',
                  background: 'transparent',
                  border: 'none',
                  color: '#C49A2A',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
                aria-label="Tutup modal kado"
              >
                ✕
              </button>

              <h3
                style={{
                  color: '#F5E6C8',
                  fontSize: '20px',
                  textAlign: 'center',
                  marginBottom: '20px',
                }}
              >
                Kirim Kado
              </h3>

              <Divider />

              <div style={{ ...infoCardStyle, marginTop: '16px' }}>
                <p
                  style={{
                    color: '#C49A2A',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                  }}
                >
                  Penerima
                </p>
                <p
                  style={{
                    color: '#F5E6C8',
                    fontSize: '15px',
                    fontWeight: 500,
                    marginTop: '4px',
                  }}
                >
                  Salsabila Fajari
                </p>
                <div
                  style={{
                    height: '1px',
                    background: 'rgba(245,230,200,0.2)',
                    margin: '10px 0',
                  }}
                />
                <p
                  style={{
                    color: '#C49A2A',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                  }}
                >
                  Alamat
                </p>
                <p
                  style={{
                    color: '#F5E6C8',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    marginTop: '4px',
                  }}
                >
                  Jl Bintaro Permai No 5, Bintaro Park View B1015, Pesanggrahan,
                  Jakarta Selatan 12320
                </p>
                <div style={{ textAlign: 'center', marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    style={{
                      border: '1px solid #C49A2A',
                      color: '#C49A2A',
                      background: 'transparent',
                      borderRadius: '6px',
                      padding: '6px 16px',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    {addressCopied ? 'Tersalin!' : 'Salin Alamat'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default AmplopDigital
