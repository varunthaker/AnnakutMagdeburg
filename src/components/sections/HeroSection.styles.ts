import type { SxProps, Theme } from '@mui/material'
import { C, FONTS, ROYAL } from '../../theme/theme'

// Fade the photo into the page: soft left/right edges, longer fade at the
// bottom so the title can rise out of it. Two masks intersected.
const SIDE_FADE = (edge: string) =>
  `linear-gradient(90deg, transparent 0%, #000 ${edge}, #000 calc(100% - ${edge}), transparent 100%)`
const BOTTOM_FADE = 'linear-gradient(180deg, #000 0%, #000 72%, transparent 100%)'
const mask = (edge: string) => ({
  WebkitMaskImage: `${SIDE_FADE(edge)}, ${BOTTOM_FADE}`,
  WebkitMaskComposite: 'source-in',
  maskImage: `${SIDE_FADE(edge)}, ${BOTTOM_FADE}`,
  maskComposite: 'intersect',
})

// Staggered entrance for the hero text, one line after another.
const stagger = Object.fromEntries(
  Array.from({ length: 10 }, (_, i) => [
    `& > *:nth-of-type(${i + 1})`,
    { animationDelay: `${0.35 + i * 0.12}s` },
  ]),
)

export const heroStyles: Record<string, SxProps<Theme>> = {
  outerBox: {
    position: 'relative',
    overflow: 'hidden',
    pb: { xs: 7, md: 10 },
    // Maroon velvet, like the opening curtain.
    background: ROYAL.bg,
    borderBottom: ROYAL.seam,
  },

  // ── Full-width stage photo ──
  stage: {
    position: 'relative',
    width: '100%',
    // Zoomed out: the frame follows the photo's own proportions (1240x827,
    // trimmed slightly) instead of a short full-width strip.
    maxWidth: { xs: '100%', md: 1150 },
    mx: 'auto',
    aspectRatio: '1240 / 780',
    overflow: 'hidden',
    animation: 'heroReveal 1.8s ease-out both',
    ...mask('14%'),
    '@media (max-width: 600px)': mask('6%'),
  },
  parallax: {
    position: 'absolute',
    inset: '-3% 0 -3% 0',
    transform: 'translate3d(0, var(--py, 0px), 0)',
    willChange: 'transform',
  },
  // Warm light rays falling from above onto the stage.
  rays: {
    position: 'absolute',
    inset: '-30% -10% 20% -10%',
    pointerEvents: 'none',
    mixBlendMode: 'screen',
    transformOrigin: '50% 0%',
    background: `repeating-conic-gradient(from 160deg at 50% 0%, rgba(255,236,190,0.35) 0deg 2deg, transparent 2deg 9deg)`,
    WebkitMaskImage: 'radial-gradient(ellipse 60% 70% at 50% 0%, #000 0%, transparent 75%)',
    maskImage: 'radial-gradient(ellipse 60% 70% at 50% 0%, #000 0%, transparent 75%)',
    animation: 'rays 9s ease-in-out infinite',
  },
  stageImg: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 40%',
    transformOrigin: 'center 45%',
    // The source photo is tilted; turn it 1.7° clockwise to level it. The
    // Ken Burns scale (min 1.12) keeps the rotated corners filled.
    rotate: '1.7deg',
    // Slow Ken Burns drift.
    animation: 'kenBurns 24s ease-in-out infinite alternate',
  },

  contentWrap: {
    position: 'relative',
    zIndex: 2,
    // Rise into the faded bottom of the photo.
    mt: { xs: -1, sm: -2, md: -4 },
  },

  // ── Text ──
  content: {
    textAlign: 'center',
    '& > *': { animation: 'fadeUp 1.1s cubic-bezier(.2,.7,.2,1) both' },
    ...stagger,
  },
  kicker: {
    fontFamily: FONTS.sans,
    fontSize: { xs: '0.95rem', md: '1.1rem' },
    fontWeight: 600,
    letterSpacing: '0.24em',
    textTransform: 'uppercase',
    color: ROYAL.kicker,
  },
  invite: {
    mt: 0.5,
    fontFamily: FONTS.serif,
    fontStyle: 'italic',
    fontSize: { xs: '1.1rem', md: '1.25rem' },
    color: ROYAL.textSoft,
  },
  // Calligraphic title, large, in gold with a bright light sweeping across.
  title: {
    display: 'block',
    mt: { xs: 0.5, md: 1 },
    px: '0.15em', // room for the script's swashes
    fontFamily: FONTS.script,
    fontWeight: 400,
    fontSize: { xs: '3.3rem', sm: '5.6rem', md: '7.4rem', lg: '8.4rem' },
    lineHeight: 1.15,
    whiteSpace: 'nowrap',
    background: `linear-gradient(100deg, ${C.goldLight} 0%, #F3DC9A 38%, #FFF8E4 50%, #F3DC9A 62%, ${C.goldLight} 100%)`,
    backgroundSize: '250% 100%',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    filter: 'drop-shadow(0 4px 18px rgba(0,0,0,0.35)) drop-shadow(0 0 22px rgba(230,199,122,0.25))',
    animation: 'sheen 7s ease-in-out 1.5s infinite',
  },
  city: {
    display: 'block',
    mt: { xs: 0.5, md: 0.75 },
    fontFamily: FONTS.serif,
    fontWeight: 600,
    fontSize: { xs: '1.15rem', md: '1.6rem' },
    letterSpacing: '0.5em',
    textTransform: 'uppercase',
    color: C.goldLight,
    // Letter-spacing adds trailing space; nudge back to true centre.
    pl: '0.5em',
  },
  divider: {
    mt: { xs: 2, md: 2.5 },
    width: { xs: 200, md: 260 },
  },
  date: {
    mt: { xs: 2, md: 2.5 },
    fontFamily: FONTS.serif,
    fontWeight: 600,
    fontSize: { xs: '1.3rem', md: '1.5rem' },
    color: ROYAL.text,
  },
  venue: {
    mt: 0.5,
    fontFamily: FONTS.sans,
    fontWeight: 400,
    fontSize: { xs: '0.95rem', md: '1rem' },
    color: ROYAL.textSoft,
  },
  ctaRow: {
    mt: { xs: 3, md: 3.5 },
    gap: 1.5,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  // ── Countdown ──
  countdown: {
    mt: { xs: 3.5, md: 4 },
    mx: 'auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: { xs: 1, md: 1.5 },
    maxWidth: 380,
  },
  cdCell: {
    borderRadius: '10px',
    py: { xs: 1, md: 1.4 },
    textAlign: 'center',
    background: 'rgba(78,11,24,0.55)',
    border: `1px solid ${C.gold}AA`,
    boxShadow: `inset 0 0 0 3px rgba(78,11,24,0.6), inset 0 0 0 4px ${C.gold}55, 0 6px 16px rgba(0,0,0,0.25)`,
  },
  cdNum: {
    fontFamily: FONTS.serif,
    fontWeight: 600,
    fontSize: { xs: '1.5rem', md: '1.9rem' },
    color: C.goldLight,
    lineHeight: 1,
    fontVariantNumeric: 'tabular-nums',
  },
  cdLabel: {
    mt: 0.5,
    fontFamily: FONTS.sans,
    fontSize: { xs: '0.58rem', md: '0.65rem' },
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: ROYAL.textSoft,
  },
}
