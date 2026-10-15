import { Box } from '@mui/material'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import RsvpModal from './components/rsvp/RsvpModal'
import HeroSection from './components/sections/HeroSection'
import GlanceSection from './components/sections/GlanceSection'
import AboutAnnakutSection from './components/sections/AboutAnnakutSection'
import VenueSection from './components/sections/VenueSection'
import ContactSection from './components/sections/ContactSection'
import Reveal from './components/common/Reveal'
import IntroCurtain from './components/layout/IntroCurtain'

export default function App() {
  return (
    <>
      <IntroCurtain />
      <Navbar />
      <Box component="main" sx={{ pt: { xs: '64px', md: '72px' } }}>
        <HeroSection />
        <Reveal><GlanceSection /></Reveal>
        <Reveal><AboutAnnakutSection /></Reveal>
        <Reveal><VenueSection /></Reveal>
        <Reveal><ContactSection /></Reveal>
      </Box>
      <Footer />
      <RsvpModal />
    </>
  )
}
