import { useEffect, useState } from 'react'

const navItems = [
  { id: 'tanggal', label: 'Tanggal', Icon: CalendarIcon },
  { id: 'rsvp', label: 'RSVP', Icon: EnvelopeIcon },
  { id: 'kado', label: 'Kirim Kado', Icon: GiftIcon },
  { id: 'ucapan', label: 'Ucapan', Icon: ChatIcon },
]

function CalendarIcon({ active }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? '#C49A2A' : '#C49A2A'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 2v4" />
      <path d="M17 2v4" />
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}

function EnvelopeIcon({ active }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? '#C49A2A' : '#C49A2A'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

function GiftIcon({ active }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? '#C49A2A' : '#C49A2A'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 12v8H4v-8" />
      <path d="M2 7h20v5H2z" />
      <path d="M12 7v13" />
      <path d="M12 7H8.5A2.5 2.5 0 1 1 11 4.5V7Z" />
      <path d="M12 7h3.5A2.5 2.5 0 1 0 13 4.5V7Z" />
    </svg>
  )
}

function ChatIcon({ active }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? '#C49A2A' : '#C49A2A'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.4 8.4 0 0 1-3.7-.8L3 21l1.8-5.2a8.4 8.4 0 0 1-.8-3.8A8.5 8.5 0 1 1 21 11.5Z" />
    </svg>
  )
}

function Navbar() {
  const [activeSection, setActiveSection] = useState('tanggal')

  useEffect(() => {
    const container = document.getElementById('snap-scroll-container')

    if (!container) {
      return undefined
    }

    const updateActiveSection = () => {
      const containerTop = container.getBoundingClientRect().top
      const containerCenter = container.clientHeight / 2

      let currentSection = activeSection
      let smallestDistance = Number.POSITIVE_INFINITY

      navItems.forEach(({ id }) => {
        const section = document.getElementById(id)

        if (!section) {
          return
        }

        const rect = section.getBoundingClientRect()
        const sectionCenter = rect.top - containerTop + rect.height / 2
        const distance = Math.abs(sectionCenter - containerCenter)

        if (distance < smallestDistance) {
          smallestDistance = distance
          currentSection = id
        }
      })

      setActiveSection(currentSection)
    }

    updateActiveSection()
    container.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      container.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [activeSection])

  const scrollToSection = (sectionId) => {
    const container = document.getElementById('snap-scroll-container')
    const section = document.getElementById(sectionId)

    if (!container || !section) {
      return
    }

    container.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth',
    })
  }

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(123, 26, 26, 0.6)',
        borderTop: '1px solid rgba(196, 154, 42, 0.3)',
        padding: '8px 0 12px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        {navItems.map(({ id, label, Icon }) => {
          const isActive = activeSection === id

          return (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              style={{
                background: 'transparent',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '4px 12px',
                opacity: isActive ? 1 : 0.6,
              }}
            >
              <Icon active={isActive} />
              <span
                style={{
                  marginTop: '4px',
                  fontSize: '10px',
                  color: isActive ? '#C49A2A' : '#F5E6C8',
                }}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default Navbar
