import { Box, Container, Typography, Button } from '@mui/material'
import { C, FONTS, ROYAL } from '../../theme/theme'
import { VENUE } from '../../data/data';
import SectionDivider from '../common/SectionDivider';
import CornerFlourishes from '../common/CornerFlourishes';
import Mandala from '../common/Mandala';

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  VENUE.addressLines.join(', '),
)}`;

export default function VenueSection() {
  return (
    <Box
      component="section"
      id="venue"
      sx={{
        background: ROYAL.bgDeep,
        borderBottom: ROYAL.seam,
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 10, md: 13 },
      }}
    >
      <Mandala color={C.goldLight} size={700} opacity={0.08} sx={{ left: -300, top: -240 }} />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {/* ── Section header ── */}
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
            Where it happens
          </Typography>
          <Typography
            variant="h2"
            sx={{ mt: 0.75, color: ROYAL.heading }}
          >
            The Venue
          </Typography>
          <SectionDivider sx={{ mt: 1.75 }} />
        </Box>

        {/* ── Venue card ── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
            background: C.ivory,
            border: `1px solid ${C.gold}`,
            borderRadius: '22px',
            overflow: 'hidden',
            boxShadow:
              '0 10px 30px rgba(0,0,0,0.35), 0 0 0 4px rgba(230,199,122,0.12)',
            mb: { xs: 6, md: 8 },
          }}
        >
          {/* Info side — cream panel */}
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              p: { xs: 4.5, md: 7 },
              color: C.ink,
              background: `radial-gradient(ellipse at 15% 0%, #FFFFFF, transparent 65%), linear-gradient(160deg, ${C.ivory}, ${C.cream})`,
              borderRight: { md: `3px double ${C.gold}` },
              borderBottom: { xs: `3px double ${C.gold}`, md: 'none' },
              '& > *:not(svg)': { position: 'relative', zIndex: 2 },
            }}
          >
            <Mandala color={C.maroon} size={460} opacity={0.07} sx={{ right: -170, bottom: -170 }} />
            <CornerFlourishes color={C.gold} size={46} inset={12} />
            <Typography
              variant="h2"
              component="h3"
              sx={{
                fontSize: {
                  xs: '1.75rem',
                  md: 'clamp(1.9rem, 3.4vw, 2.75rem)',
                },
                color: C.maroon,
              }}
            >
              {VENUE.title}
            </Typography>

            <Box component="dl" sx={{ mt: 3, display: 'grid', gap: 1 }}>
              {VENUE.addressLines.map((line) => (
                <Typography
                  key={line}
                  component="dd"
                  sx={{
                    m: 0,
                    fontSize: { xs: '1rem', md: '1.05rem' },
                    color: C.inkSoft,
                    lineHeight: 1.6,
                  }}
                >
                  {line}
                </Typography>
              ))}
            </Box>

            <Box sx={{ mt: 3.5 }}>
              <Button
                variant="contained"
                component="a"
                href={directionsUrl}
                target="_blank"
                rel="noopener"
              >
                Get Directions
              </Button>
            </Box>
          </Box>

          {/* Map side */}
          <Box
            sx={{
              background: C.cream,
              minHeight: { xs: 260, md: 360 },
              position: 'relative',
              order: { xs: -1, md: 0 },
            }}
          >
            <Box
              component="iframe"
              title="Venue location"
              src={VENUE.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              sx={{
                border: 0,
                width: '100%',
                height: '100%',
                display: 'block',
                minHeight: { xs: 260, md: 360 },
              }}
            />
          </Box>
        </Box>

        {/* ── Getting here ── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: 6 },
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                color: ROYAL.heading,
                fontSize: { xs: '1.375rem', md: '1.6rem' },
              }}
            >
              Getting here
            </Typography>
            <Box
              component="ul"
              sx={{
                mt: 1.5,
                pl: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.1,
              }}
            >
              {VENUE.directions.map((step) => (
                <Box
                  component="li"
                  key={step}
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'baseline',
                    fontSize: { xs: 14, md: 14.5 },
                    lineHeight: 1.6,
                    color: ROYAL.text,
                  }}
                >
                  <Box component="span" sx={{ color: C.goldLight }}>
                    •
                  </Box>
                  <span>{step}</span>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
