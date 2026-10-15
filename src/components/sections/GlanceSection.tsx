import { Box, Container, Typography } from '@mui/material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined'
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined'
import { GLANCE } from '../../data/data'
import { C, FONTS, ROYAL } from '../../theme/theme'
import SectionDivider from '../common/SectionDivider'
import Mandala from '../common/Mandala'

const ICONS = {
  date: CalendarMonthOutlinedIcon,
  venue: PlaceOutlinedIcon,
  prasad: RestaurantOutlinedIcon,
  entry: HowToRegOutlinedIcon,
}

export default function GlanceSection() {
  return (
    <Box
      component="section"
      id="glance"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: ROYAL.bgDeep,
        borderBottom: ROYAL.seam,
        py: { xs: 6, md: 7 },
      }}
    >
      <Mandala color={C.goldLight} size={620} opacity={0.1} sx={{ left: -260, top: -200 }} />
      <Mandala color={C.goldLight} size={620} opacity={0.1} sx={{ right: -260, bottom: -260 }} />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
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
            The Celebration
          </Typography>
          <Typography variant="h2" sx={{ mt: 0.75, color: ROYAL.heading }}>
            Annakut at a Glance
          </Typography>
          <SectionDivider sx={{ mt: 1.75 }} />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
            gap: { xs: 2, md: 2.5 },
          }}
        >
          {GLANCE.map((item) => {
            const Icon = ICONS[item.icon]
            return (
              <Box
                key={item.title}
                sx={{
                  textAlign: 'center',
                  background: C.ivory,
                  border: `1px solid ${C.gold}`,
                  borderTop: `3px solid ${C.gold}`,
                  borderRadius: '16px',
                  px: { xs: 1.5, md: 2.5 },
                  py: { xs: 2.5, md: 3.5 },
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  transition: 'transform .25s ease, box-shadow .25s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 14px 34px rgba(0,0,0,0.35), 0 0 0 1px #F3DC9A',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    mx: 'auto',
                    mb: 1.5,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    color: C.goldLight,
                    background: `radial-gradient(circle at 35% 30%, ${C.lilac}, ${C.maroon} 60%, ${C.lilacDeep})`,
                    border: `2px solid ${C.goldLight}`,
                    boxShadow: `0 0 0 3px ${C.ivory}, 0 0 0 4px ${C.gold}66, 0 6px 14px rgba(122,21,38,0.25)`,
                  }}
                >
                  <Icon sx={{ fontSize: 24 }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: FONTS.serif,
                    fontWeight: 600,
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    color: C.ink,
                    mb: 0.75,
                  }}
                >
                  {item.title}
                </Typography>
                {item.lines.map((line) => (
                  <Typography
                    key={line}
                    sx={{ fontSize: { xs: '0.82rem', md: '0.9rem' }, color: C.inkSoft, lineHeight: 1.6 }}
                  >
                    {line}
                  </Typography>
                ))}
              </Box>
            )
          })}
        </Box>
      </Container>
    </Box>
  )
}
