import { useEffect, useRef, useState } from 'react'
import AmplopDigital from './components/AmplopDigital.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import Navbar from './components/Navbar.jsx'
import ProfilArkan from './components/ProfilArkan.jsx'
import ProfilSalsa from './components/ProfilSalsa.jsx'
import RSVP from './components/RSVP.jsx'
import SaveTheDate from './components/SaveTheDate.jsx'
import TheShift from './components/TheShift.jsx'
import Ucapan from './components/Ucapan.jsx'

const SECTION_IDS = ['anak-daro', 'marapulai', 'tanggal', 'rsvp', 'kado', 'ucapan']
const SECTION_DURATION = 3000
const PROGRESS_INTERVAL = 30

function App() {
  const [activeSection, setActiveSection] = useState('anak-daro')
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef(null)
  const autoScrollTimerRef = useRef(null)
  const progressIntervalRef = useRef(null)
  const resumeAutoScrollTimeoutRef = useRef(null)
  const isManualScrollRef = useRef(false)
  const isPausedRef = useRef(false)
  const activeSectionRef = useRef(activeSection)

  const startProgressBar = () => {
    window.clearInterval(progressIntervalRef.current)
    setProgress(0)
    let elapsed = 0

    progressIntervalRef.current = window.setInterval(() => {
      if (isPausedRef.current) {
        return
      }

      elapsed += PROGRESS_INTERVAL
      const pct = Math.min((elapsed / SECTION_DURATION) * 100, 100)
      setProgress(pct)

      if (elapsed >= SECTION_DURATION) {
        window.clearInterval(progressIntervalRef.current)
      }
    }, PROGRESS_INTERVAL)
  }

  const startAutoScroll = () => {
    window.clearInterval(autoScrollTimerRef.current)
    autoScrollTimerRef.current = window.setInterval(() => {
      if (isManualScrollRef.current || isPausedRef.current) {
        return
      }

      const container = scrollContainerRef.current

      if (!container) {
        return
      }

      const currentIndex = SECTION_IDS.indexOf(activeSectionRef.current)

      if (currentIndex < SECTION_IDS.length - 1) {
        const nextId = SECTION_IDS[currentIndex + 1]
        const nextSection = document.getElementById(nextId)

        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        window.clearInterval(autoScrollTimerRef.current)
      }
    }, 3000)
  }

  useEffect(() => {
    activeSectionRef.current = activeSection
  }, [activeSection])

  useEffect(() => {
    const handleFocus = (event) => {
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        isPausedRef.current = true
        setIsPaused(true)
      }
    }

    const handleBlur = (event) => {
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        isPausedRef.current = false
        setIsPaused(false)
        startProgressBar()
      }
    }

    document.addEventListener('focusin', handleFocus)
    document.addEventListener('focusout', handleBlur)

    return () => {
      document.removeEventListener('focusin', handleFocus)
      document.removeEventListener('focusout', handleBlur)
    }
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current

    if (!container) {
      return undefined
    }

    const handleScroll = () => {
      const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
      const containerTop = container.scrollTop
      const viewHeight = container.clientHeight

      for (const section of sections) {
        const sectionTop = section.offsetTop

        if (
          containerTop >= sectionTop - viewHeight / 2 &&
          containerTop < sectionTop + section.offsetHeight - viewHeight / 2
        ) {
          setActiveSection(section.id)
          break
        }
      }

      isManualScrollRef.current = true
      window.clearInterval(autoScrollTimerRef.current)
      window.clearInterval(progressIntervalRef.current)
      setProgress(0)
      window.clearTimeout(resumeAutoScrollTimeoutRef.current)
      resumeAutoScrollTimeoutRef.current = window.setTimeout(() => {
        isManualScrollRef.current = false
        startProgressBar()
        startAutoScroll()
      }, SECTION_DURATION)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    startProgressBar()
    startAutoScroll()

    return () => {
      window.clearInterval(autoScrollTimerRef.current)
      window.clearInterval(progressIntervalRef.current)
    }
  }, [activeSection])

  const handleNavClick = (sectionId) => {
    isManualScrollRef.current = true
    window.clearInterval(autoScrollTimerRef.current)
    window.clearInterval(progressIntervalRef.current)
    const section = document.getElementById(sectionId)

    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }

    startProgressBar()
    window.clearTimeout(resumeAutoScrollTimeoutRef.current)
    resumeAutoScrollTimeoutRef.current = window.setTimeout(() => {
      isManualScrollRef.current = false
      startAutoScroll()
    }, SECTION_DURATION)
  }

  useEffect(() => {
    return () => {
      window.clearInterval(autoScrollTimerRef.current)
      window.clearInterval(progressIntervalRef.current)
      window.clearTimeout(resumeAutoScrollTimeoutRef.current)
    }
  }, [])

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          zIndex: 500,
          background: 'rgba(255,255,255,0.1)',
          opacity: isPaused ? 0.5 : 1,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(to right, #C49A2A, #F0D080)',
            transition: 'width 0.03s linear',
            borderRadius: '0 2px 2px 0',
          }}
        />
      </div>
      <div
        id="snap-scroll-container"
        ref={scrollContainerRef}
        style={{
          height: '100dvh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          paddingBottom: '70px',
        }}
      >
        <TheShift />
        <ProfilSalsa />
        <ProfilArkan />
        <SaveTheDate />
        <RSVP />
        <AmplopDigital />
        <Ucapan />
      </div>
      <MusicPlayer />
      <Navbar activeSection={activeSection} onNavClick={handleNavClick} />
    </>
  )
}

export default App
