import { Box, Container, Typography } from '@mui/material'
import { EVENT, FOOTER } from '../../data/data'
import { C, FONTS } from '../../theme/theme'
import SectionDivider from '../common/SectionDivider'
import Mandala from '../common/Mandala'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(180deg, ${C.maroon}, ${C.lilacDeep})`,
        borderTop: `3px double ${C.gold}`,
        color: C.ivory,
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 3.5, md: 4 },
      }}
    >
      <Mandala color={C.goldLight} size={520} opacity={0.1} sx={{ left: '50%', top: '50%', ml: '-260px', mt: '-260px' }} />
      <Container maxWidth="lg" sx={{ textAlign: 'center', position: 'relative' }}>
        <Typography
          sx={{
            fontFamily: FONTS.script,
            fontSize: { xs: '2rem', md: '2.4rem' },
            lineHeight: 1.1,
            color: C.goldLight,
          }}
        >
          {EVENT.title}
        </Typography>
        <Typography
          sx={{
            mt: 0.25,
            fontFamily: FONTS.sans,
            fontSize: '0.72rem',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: `${C.ivory}CC`,
          }}
        >
          {EVENT.city}
        </Typography>

        <SectionDivider sx={{ mt: 2, opacity: 0.85 }} />

        <Typography
          sx={{
            mt: 1.5,
            fontFamily: FONTS.serif,
            fontStyle: 'italic',
            fontSize: { xs: '1.05rem', md: '1.15rem' },
            color: C.goldLight,
          }}
        >
          {FOOTER.closing}
        </Typography>
        <Typography sx={{ mt: 1, fontSize: 12.5, letterSpacing: '0.04em', color: `${C.ivory}99` }}>
          {FOOTER.brand} · {new Date(EVENT.dateISO).getFullYear()}
        </Typography>
      </Container>
    </Box>
  )
}
