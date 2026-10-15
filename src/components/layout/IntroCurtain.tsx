import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { EVENT } from '../../data/data'
import { C, FONTS } from '../../theme/theme'
import Mandala from '../common/Mandala'

// Plays on every page load, except for visitors who prefer less motion.
function shouldShow(): boolean {
  return !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

type Phase = 'shown' | 'opening' | 'gone'

const panelSx = {
  position: 'absolute' as const,
  top: 0,
  bottom: 0,
  width: '50.5%',
  background: `radial-gradient(ellipse at 50% 40%, ${C.lilac}, ${C.maroon} 45%, ${C.lilacDeep})`,
  transition: 'transform 1.3s cubic-bezier(.77,0,.18,1)',
  overflow: 'hidden',
}

// Royal opening: maroon doors with the title in gold, parting to reveal the page.
export default function IntroCurtain() {
  const [phase, setPhase] = useState<Phase>(() => (shouldShow() ? 'shown' : 'gone'))

  useEffect(() => {
    if (phase !== 'shown') return
    const open = setTimeout(() => setPhase('opening'), 1700)
    const done = setTimeout(() => setPhase('gone'), 3100)
    return () => { clearTimeout(open); clearTimeout(done) }
  }, [phase])

  if (phase === 'gone') return null
  const opening = phase === 'opening'

  return (
    <Box
      aria-hidden="true"
      onClick={() => setPhase('opening')}
      sx={{ position: 'fixed', inset: 0, zIndex: 3000, pointerEvents: opening ? 'none' : 'auto' }}
    >
      {/* Left door */}
      <Box sx={{ ...panelSx, left: 0, borderRight: `2px solid ${C.gold}`, transform: opening ? 'translateX(-102%)' : 'none' }}>
        <Mandala color={C.goldLight} size={900} opacity={0.12} sx={{ top: '50%', right: -450, mt: '-450px' }} />
      </Box>
      {/* Right door */}
      <Box sx={{ ...panelSx, right: 0, borderLeft: `2px solid ${C.gold}`, transform: opening ? 'translateX(102%)' : 'none' }}>
        <Mandala color={C.goldLight} size={900} opacity={0.12} sx={{ top: '50%', left: -450, mt: '-450px' }} />
      </Box>

      {/* Title seal */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 2,
          opacity: opening ? 0 : 1,
          transform: opening ? 'scale(1.08)' : 'none',
          transition: 'opacity .6s ease, transform .9s ease',
        }}
      >
        <Box
          component="img"
          src="/images/lotus-mark.png"
          alt=""
          sx={{ width: { xs: 70, md: 90 }, height: 'auto', animation: 'fadeUp 1s ease both', filter: 'drop-shadow(0 0 12px rgba(230,199,122,0.6))' }}
        />
        <Typography
          sx={{
            mt: 1,
            fontFamily: FONTS.script,
            fontSize: { xs: '3.2rem', md: '5rem' },
            lineHeight: 1.2,
            background: `linear-gradient(180deg, #FFF1C9, ${C.goldLight} 45%, ${C.gold})`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            animation: 'fadeUp 1.2s ease .2s both',
          }}
        >
          {EVENT.title}
        </Typography>
        <Typography
          sx={{
            mt: 1,
            fontFamily: FONTS.sans,
            fontSize: { xs: '0.8rem', md: '0.95rem' },
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: `${C.ivory}CC`,
            animation: 'fadeUp 1.2s ease .45s both',
          }}
        >
          {EVENT.kicker} · {EVENT.city}
        </Typography>
      </Box>
    </Box>
  )
}
