import { Box, Container, Typography } from '@mui/material'
import { C, FONTS, ROYAL } from '../../theme/theme'
import { PEOPLE } from '../../data/data'
import SectionDivider from '../common/SectionDivider'
import CornerFlourishes from '../common/CornerFlourishes'
import Mandala from '../common/Mandala'

const cardSx = {
  position: 'relative',
  background: C.ivory,
  border: `1px solid ${C.gold}`,
  borderTop: `3px solid ${C.gold}`,
  borderRadius: '18px',
  p: { xs: 4.5, md: 5.5 },
  textAlign: 'center',
  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  transition: 'transform .25s ease, border-color .25s ease, box-shadow .25s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    borderColor: `${C.saffron}80`,
    boxShadow: '0 14px 34px rgba(0,0,0,0.35), 0 0 0 1px #F3DC9A',
  },
}

const iconCircleSx = {
  width: 56,
  height: 56,
  borderRadius: '50%',
  background: `radial-gradient(circle at 35% 30%, ${C.lilac}, ${C.maroon} 60%, ${C.lilacDeep})`,
  border: `2px solid ${C.goldLight}`,
  boxShadow: `0 0 0 3px ${C.ivory}, 0 0 0 4px ${C.gold}66, 0 6px 14px rgba(122,21,38,0.25)`,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: C.goldLight,
  mb: 1.75,
}

export default function ContactSection() {
  return (
    <Box
      component="section"
      id="contact"
      sx={{ position: 'relative', overflow: 'hidden', background: ROYAL.bg, py: { xs: 10, md: 13 } }}
    >
      <Mandala color={C.goldLight} size={{ xs: 520, md: 760 }} opacity={0.1} sx={{ left: '50%', top: '50%', ml: { xs: '-260px', md: '-380px' }, mt: { xs: '-260px', md: '-380px' } }} />
      <Container maxWidth="lg">
        {/* Heading */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
          <Typography
            component="span"
            sx={{
              fontFamily: FONTS.sans,
              fontSize: '0.78rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: ROYAL.kicker,
              fontWeight: 500,
            }}
          >
            Reach Out
          </Typography>
          <Typography
            variant="h2"
            sx={{ mt: 0.75, color: ROYAL.heading }}
          >
            Contact
          </Typography>
          <SectionDivider sx={{ mt: 1.75 }} />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            maxWidth: 640,
            mx: 'auto',
          }}
        >
          {/* Contact card */}
          <Box sx={cardSx}>
            <CornerFlourishes color={C.gold} size={42} inset={10} />
            <Box sx={iconCircleSx}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontSize: '1.4rem',
                color: C.ink,
              }}
            >
              Phone / WhatsApp
            </Typography>
            <Typography
              sx={{
                fontSize: '0.9rem',
                mt: 0.5,
                color: C.inkMuted,
              }}
            >
              Get in touch
            </Typography>

            <Box
              sx={{
                mt: 1.75,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: { xs: 1.5, sm: 2 },
              }}
            >
              {PEOPLE.map((person) => (
                <Box key={person.name}>
                  <Typography
                    sx={{
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: C.ink,
                    }}
                  >
                    {person.name}
                  </Typography>
                  <Box
                    component="a"
                    href={person.phone}
                    sx={{
                      display: 'block',
                      mt: 0.25,
                      fontSize: '1.05rem',
                      color: C.inkSoft,
                      textDecoration: 'none',
                      lineHeight: 1.75,
                      overflowWrap: 'break-word',
                      '&:hover': { color: C.ink },
                      transition: 'color .2s',
                    }}
                  >
                    {person.phone.replace('tel:', '')}
                  </Box>
                  <Box
                    component="a"
                    href={person.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'inline-block',
                      mt: 0.5,
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: C.blushDeep,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    WhatsApp
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
