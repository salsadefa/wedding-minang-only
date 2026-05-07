import { useEffect, useRef } from 'react'
import { User, Users, Calendar, Mail, Gift, Images, Heart } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'anak-daro', label: 'Anak Daro', Icon: User },
  { id: 'marapulai', label: 'Marapulai', Icon: Users },
  { id: 'tanggal', label: 'Tanggal', Icon: Calendar },
  { id: 'rsvp', label: 'RSVP', Icon: Mail },
  { id: 'kado', label: 'Kirim Kado', Icon: Gift },
  { id: 'galeri', label: 'Galeri', Icon: Images },
  { id: 'closing', label: 'Penutup', Icon: Heart },
]

function Navbar({ activeSection, onNavClick }) {
  const trackRef = useRef(null)

  useEffect(() => {
    const activeIndex = NAV_ITEMS.findIndex((item) => item.id === activeSection)

    if (trackRef.current && activeIndex !== -1) {
      const itemWidth = trackRef.current.scrollWidth / NAV_ITEMS.length
      const scrollTarget = Math.max(0, (activeIndex - 1) * itemWidth)
      trackRef.current.scrollTo({ left: scrollTarget, behavior: 'smooth' })
    }
  }, [activeSection])

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(123, 26, 26, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(196, 154, 42, 0.3)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div
        ref={trackRef}
        className="navbar-track"
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollSnapType: 'x mandatory',
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavClick(item.id)}
              style={{
                flex: '0 0 25%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 4px 10px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                opacity: isActive ? 1 : 0.5,
                transition: 'opacity 0.3s ease',
                scrollSnapAlign: 'start',
                minWidth: '25%',
              }}
            >
              <item.Icon
                size={22}
                strokeWidth={1.5}
                color={isActive ? '#F0D080' : '#C49A2A'}
              />
              <span
                style={{
                  color: isActive ? '#C49A2A' : '#F5E6C8',
                  fontSize: '10px',
                  marginTop: '4px',
                  fontFamily: 'Lora',
                  letterSpacing: '0.03em',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </span>
              {isActive ? (
                <div
                  style={{
                    width: '20px',
                    height: '2px',
                    background: '#C49A2A',
                    borderRadius: '2px',
                    marginTop: '4px',
                  }}
                />
              ) : null}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default Navbar
