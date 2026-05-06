import AmplopDigital from './components/AmplopDigital.jsx'
import Navbar from './components/Navbar.jsx'
import ProfilArkan from './components/ProfilArkan.jsx'
import ProfilSalsa from './components/ProfilSalsa.jsx'
import RSVP from './components/RSVP.jsx'
import SaveTheDate from './components/SaveTheDate.jsx'
import TheShift from './components/TheShift.jsx'
import Ucapan from './components/Ucapan.jsx'

function App() {
  return (
    <>
      <div
        id="snap-scroll-container"
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
      <Navbar />
    </>
  )
}

export default App
