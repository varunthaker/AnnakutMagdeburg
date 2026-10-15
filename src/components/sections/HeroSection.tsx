import { useEffect, useRef } from 'react'
import { Box, Container, Typography, Button, Stack, Link } from '@mui/material'
import { EVENT } from '../../data/data'
import { useRsvpStore } from '../../store/rsvpStore'
import { useRegistrationOpen } from '../../hooks/useRegistrationOpen'
import { useCountdown } from '../../hooks/useCountdown'
import { C, ROYAL, goldCtaSx } from '../../theme/theme'
import Mandala from '../common/Mandala'
import { heroStyles as s } from './HeroSection.styles'
import HeroSparkles from './HeroSparkles'
import SectionDivider from '../common/SectionDivider'

export default function HeroSection() {
  const openModal = useRsvpStore((st) => st.openModal)
  const registrationOpen = useRegistrationOpen()
  const { d, h, m, s: sec } = useCountdown(EVENT.dateISO)
  const parallaxRef = useRef<HTMLDivElement>(null)

  // Parallax: the photo drifts down at a fraction of the scroll speed.
  // Writes a CSS variable directly so scrolling never re-renders React.
  useEffect(() => {
    const el = parallaxRef.current
    if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--py', `${Math.min(window.scrollY, 900) * 0.25}px`)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const cells = [
    { num: String(d).padStart(2, '0'), label: 'Days' },
    { num: String(h).padStart(2, '0'), label: 'Hours' },
    { num: String(m).padStart(2, '0'), label: 'Mins' },
    { num: String(sec).padStart(2, '0'), label: 'Secs' },
  ]

  return (
    <Box component="section" id="hero" sx={s.outerBox}>
      <Mandala color={C.goldLight} size={{ xs: 640, md: 1100 }} opacity={0.09} sx={{ left: '50%', bottom: { xs: -260, md: -520 }, ml: { xs: '-320px', md: '-550px' } }} />
      <HeroSparkles />

      {/* ── Stage photo, top-centre, fading into the page at the sides ── */}
      <Box sx={s.stage}>
        <Box ref={parallaxRef} sx={s.parallax}>
          <Box
            component="img"
            src="/images/hero-annakut.jpg"
            alt="Annakut offerings arranged before the murtis on the mandir stage"
            sx={s.stageImg}
          />
        </Box>
        <Box aria-hidden="true" sx={s.rays} />
      </Box>

      <Container maxWidth="lg" sx={s.contentWrap}>
        {/* ── Invitation text ── */}
        <Box sx={s.content}>
          <Typography sx={s.kicker}>{EVENT.kicker}</Typography>
          <Typography sx={s.invite}>{EVENT.invite}</Typography>

          <Typography component="h1" sx={{ m: 0 }}>
            <Box component="span" sx={s.title}>{EVENT.title}</Box>
            <Box component="span" sx={s.city}>{EVENT.city}</Box>
          </Typography>

          <SectionDivider sx={s.divider} />

          <Typography sx={s.date}>
            {EVENT.dateLabel}&nbsp;&nbsp;·&nbsp;&nbsp;{EVENT.timeLabel}
          </Typography>
          <Typography sx={s.venue}>
            {EVENT.venueName}, 39106 Magdeburg
          </Typography>

          {registrationOpen ? (
            <Stack direction="row" sx={s.ctaRow}>
              <Button variant="contained" size="large" onClick={openModal} sx={goldCtaSx}>
                Register Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="#about"
                sx={{
                  color: C.goldLight,
                  borderColor: C.goldLight,
                  '&:hover': { borderColor: '#F3DC9A', background: 'rgba(230,199,122,0.1)' },
                }}
              >
                Learn More
              </Button>
            </Stack>
          ) : (
            <Typography sx={{ mt: 3, color: ROYAL.textSoft }}>
              Registration is not open at the moment.{' '}
              <Link href="#contact" sx={{ fontWeight: 500, color: C.goldLight }}>
                Contact us
              </Link>
              .
            </Typography>
          )}

          <Box sx={s.countdown} aria-label="Time until the event">
            {cells.map(({ num, label }) => (
              <Box key={label} sx={s.cdCell}>
                <Typography sx={s.cdNum}>{num}</Typography>
                <Typography sx={s.cdLabel}>{label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
