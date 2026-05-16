import { useEffect, useRef, useState } from 'react'
import AmplopDigital from './components/AmplopDigital.jsx'
import Closing from './components/Closing.jsx'
import CurtainTransition from './components/CurtainTransition.jsx'
import Gallery from './components/Gallery.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import Navbar from './components/Navbar.jsx'
import ProfilArkan from './components/ProfilArkan.jsx'
import ProfilSalsa from './components/ProfilSalsa.jsx'
import RSVP from './components/RSVP.jsx'
import SaveTheDate from './components/SaveTheDate.jsx'

const SECTION_IDS = ['anak-daro', 'marapulai', 'tanggal', 'rsvp', 'kado', 'galeri', 'closing']
const PROGRESS_INTERVAL = 30

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('anak-daro')
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showCurtain, setShowCurtain] = useState(true)
  const [navbarVisible, setNavbarVisible] = useState(false)
  const scrollContainerRef = useRef(null)
  const autoScrollTimerRef = useRef(null)
  const progressIntervalRef = useRef(null)
  const resumeAutoScrollTimeoutRef = useRef(null)
  const isManualScrollRef = useRef(false)
  const isPausedRef = useRef(false)
  const activeSectionRef = useRef(activeSection)

  const getSectionDuration = (sectionId) =>
    sectionId === 'galeri' ? 20000 : 3000

  const startProgressBar = () => {
    const sectionDuration = getSectionDuration(activeSectionRef.current)
    window.clearInterval(progressIntervalRef.current)
    setProgress(0)
    let elapsed = 0

    progressIntervalRef.current = window.setInterval(() => {
      if (isPausedRef.current) {
        return
      }

      elapsed += PROGRESS_INTERVAL
      const pct = Math.min((elapsed / sectionDuration) * 100, 100)
      setProgress(pct)

      if (elapsed >= sectionDuration) {
        window.clearInterval(progressIntervalRef.current)
      }
    }, PROGRESS_INTERVAL)
  }

  const startAutoScroll = () => {
    const duration = getSectionDuration(activeSectionRef.current)
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
      const currentSectionEl = document.getElementById(SECTION_IDS[currentIndex])

      if (currentSectionEl?.dataset?.noAutoscroll === 'true') {
        return
      }

      if (currentIndex < SECTION_IDS.length - 1) {
        const nextId = SECTION_IDS[currentIndex + 1]
        const nextSection = document.getElementById(nextId)

        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        window.clearInterval(autoScrollTimerRef.current)
      }
    }, duration)
  }

  useEffect(() => {
    activeSectionRef.current = activeSection
  }, [activeSection])

  useEffect(() => {
    console.log('scrollContainerRef.current:', scrollContainerRef.current)
    console.log('scrollContainerRef tagName:', scrollContainerRef.current?.tagName)
    console.log('scrollContainerRef scrollHeight:', scrollContainerRef.current?.scrollHeight)
    console.log('scrollContainerRef clientHeight:', scrollContainerRef.current?.clientHeight)
    console.log('scroll container style:', scrollContainerRef.current?.style?.cssText)
  }, [])

  useEffect(() => {
    let typingTimer = null

    const handleInput = (event) => {
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        isPausedRef.current = true
        setIsPaused(true)

        window.clearTimeout(typingTimer)
        typingTimer = window.setTimeout(() => {
          isPausedRef.current = false
          setIsPaused(false)
          startProgressBar()
        }, 5000)
      }
    }

    const handleButtonClick = (event) => {
      if (event.target.tagName === 'BUTTON' || event.target.closest('button')) {
        isPausedRef.current = true
        setIsPaused(true)

        window.clearTimeout(typingTimer)
        typingTimer = window.setTimeout(() => {
          isPausedRef.current = false
          setIsPaused(false)
          startProgressBar()
        }, 5000)
      }
    }

    document.addEventListener('input', handleInput)
    document.addEventListener('click', handleButtonClick)

    return () => {
      document.removeEventListener('input', handleInput)
      document.removeEventListener('click', handleButtonClick)
      window.clearTimeout(typingTimer)
    }
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current

    if (!container) {
      return undefined
    }

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const viewportHeight = container.clientHeight
      console.log('scrollTop:', scrollTop, 'viewportHeight:', viewportHeight)

      let currentSection = SECTION_IDS[0]

      for (const id of SECTION_IDS) {
        const element = document.getElementById(id)

        if (!element) {
          console.log('MISSING element with id:', id)
          continue
        }

        const elementTop = element.offsetTop
        console.log('id:', id, 'offsetTop:', elementTop)

        if (scrollTop >= elementTop - viewportHeight / 2) {
          currentSection = id
        }
      }

      console.log('→ activeSection set to:', currentSection)
      setActiveSection(currentSection)

      isManualScrollRef.current = true
      window.clearInterval(autoScrollTimerRef.current)
      window.clearInterval(progressIntervalRef.current)
      setProgress(0)
      window.clearTimeout(resumeAutoScrollTimeoutRef.current)
      resumeAutoScrollTimeoutRef.current = window.setTimeout(() => {
        isManualScrollRef.current = false
        startProgressBar()
        startAutoScroll()
      }, getSectionDuration(currentSection))
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => container.removeEventListener('scroll', handleScroll)
  }, [isLoading])

  useEffect(() => {
    if (!navbarVisible) {
      return undefined
    }

    startProgressBar()
    startAutoScroll()

    return () => {
      window.clearInterval(autoScrollTimerRef.current)
      window.clearInterval(progressIntervalRef.current)
    }
  }, [activeSection, navbarVisible])

  const handleCurtainComplete = () => {
    setShowCurtain(false)
    const anakDaro = document.getElementById('anak-daro')

    if (anakDaro) {
      anakDaro.scrollIntoView({ behavior: 'smooth' })
    }

    window.setTimeout(() => {
      setNavbarVisible(true)
      setActiveSection('anak-daro')
      startAutoScroll()
      startProgressBar()
    }, 600)
  }

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
    }, getSectionDuration(sectionId))
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
      {isLoading ? <LoadingScreen onComplete={() => setIsLoading(false)} /> : null}
      {!isLoading ? (
        <>
          {showCurtain ? <CurtainTransition onComplete={handleCurtainComplete} /> : null}
          {navbarVisible ? (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                zIndex: 90,
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
          ) : null}
          <div
            id="snap-scroll-container"
            ref={scrollContainerRef}
            style={{
              width: '100vw',
              maxWidth: '100vw',
              height: '100dvh',
              margin: 0,
              paddingLeft: 0,
              paddingRight: 0,
              overflowY: 'scroll',
              scrollSnapType: 'y mandatory',
              paddingBottom: 'calc(70px + env(safe-area-inset-bottom))',
            }}
          >
            <ProfilSalsa />
            <ProfilArkan />
            <SaveTheDate />
            <RSVP />
            <AmplopDigital />
            <Gallery />
            <Closing />
          </div>
          {navbarVisible ? <MusicPlayer /> : null}
          {navbarVisible ? (
            <Navbar activeSection={activeSection} onNavClick={handleNavClick} />
          ) : null}
        </>
      ) : null}
    </>
  )
}

export default App
