import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ABOUT_ANNAKUT, FAQS } from '../../data/data'
import { C, ROYAL } from '../../theme/theme'
import Mandala from '../common/Mandala'
import SectionDivider from '../common/SectionDivider'

export default function AboutAnnakutSection() {
  return (
    <Box
      component="section"
      id="about"
      sx={{ position: 'relative', overflow: 'hidden', background: ROYAL.bg, pt: { xs: 6, md: 8 }, pb: { xs: 7, md: 9 }, borderBottom: ROYAL.seam }}
    >
      <Mandala color={C.goldLight} size={{ xs: 560, md: 820 }} opacity={0.08} sx={{ left: '50%', top: 40, ml: { xs: '-280px', md: '-410px' } }} />
      <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative' }}>
        <SectionDivider size="lg" sx={{ mb: { xs: 3, md: 4 } }} />
        <Typography
          variant="h2"
          sx={{ color: ROYAL.heading }}
        >
          {ABOUT_ANNAKUT.heading}
        </Typography>

        <SectionDivider sx={{ mt: 1.75, mb: 4 }} />

        {ABOUT_ANNAKUT.paragraphs.map((p, i) => (
          <Typography
            key={i}
            sx={{
              color: ROYAL.textSoft,
              lineHeight: 1.8,
              fontSize: '1rem',
              mb: 2,
              maxWidth: 680,
              mx: 'auto',
            }}
          >
            {p}
          </Typography>
        ))}

        <Box sx={{ mt: 5, textAlign: 'left' }}>
          {FAQS.map((faq) => (
            <Accordion
              key={faq.q}
              disableGutters
              elevation={0}
              sx={{
                background: C.ivory,
                border: `1px solid ${C.gold}`,
                borderRadius: 2,
                mb: 1.5,
                transition: 'border-color .25s ease, box-shadow .25s ease',
                '&::before': { display: 'none' },
                '&.Mui-expanded': {
                  borderColor: `${C.maroon}55`,
                  borderLeft: `3px solid ${C.maroon}`,
                  boxShadow: '0 8px 22px rgba(0,0,0,0.25)',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: C.maroon }} />}
              >
                <Typography sx={{ fontWeight: 500, color: C.maroon }}>
                  {faq.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {faq.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
