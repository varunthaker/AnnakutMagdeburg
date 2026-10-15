import { useId } from 'react'
import { Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { C } from '../../theme/theme'

interface Props {
  size?: 'sm' | 'lg'
  sx?: SxProps<Theme>
}

// Gold filigree divider: fading rules, scroll curls, pearls and a central
// lotus jewel — used under section headings ("sm") and between sections ("lg").
export default function SectionDivider({ size = 'sm', sx }: Props) {
  const id = useId()
  const fade = `${id}-fade`
  const gold = `${id}-gold`

  // One half, drawn left of centre and mirrored for the right.
  const half = (
    <>
      <path d="M6 20 H92" stroke={`url(#${fade})`} strokeWidth="1.2" />
      <path d="M92 20 c5 -8 15 -9 19 -2 c2 4 -2 8 -6 6 c-3 -1 -3 -5 0 -5" fill="none" stroke={`url(#${gold})`} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M92 20 c5 8 15 9 19 2" fill="none" stroke={`url(#${gold})`} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <circle cx="80" cy="20" r="1.6" fill={C.gold} />
      <circle cx="70" cy="20" r="1.1" fill={C.gold} opacity="0.7" />
      <circle cx="120" cy="20" r="2" fill={C.goldLight} stroke={C.gold} strokeWidth="0.6" />
    </>
  )

  return (
    <Box
      component="svg"
      viewBox="0 0 280 40"
      aria-hidden="true"
      sx={[
        {
          display: 'block',
          mx: 'auto',
          width: size === 'lg' ? { xs: 240, md: 320 } : { xs: 170, md: 210 },
          height: 'auto',
          overflow: 'visible',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <defs>
        <linearGradient id={fade} x1="0" x2="1">
          <stop offset="0" stopColor={C.gold} stopOpacity="0" />
          <stop offset="1" stopColor={C.gold} />
        </linearGradient>
        <linearGradient id={gold} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3DC9A" />
          <stop offset="0.5" stopColor={C.gold} />
          <stop offset="1" stopColor="#9C7020" />
        </linearGradient>
      </defs>
      {half}
      <g transform="translate(280 0) scale(-1 1)">{half}</g>
      {/* Central lotus jewel */}
      <g transform="translate(140 20)">
        <path d="M0 -15 C5 -9 5 -3 0 3 C-5 -3 -5 -9 0 -15 Z" fill={`url(#${gold})`} />
        <path d="M0 3 C-4 -2 -10 -6 -16 -5 C-13 1 -7 4 0 3 Z" fill={`url(#${gold})`} opacity="0.85" />
        <path d="M0 3 C4 -2 10 -6 16 -5 C13 1 7 4 0 3 Z" fill={`url(#${gold})`} opacity="0.85" />
        <path d="M-14 6 H14" stroke={C.gold} strokeWidth="1" />
        <circle cx="0" cy="10" r="2.2" fill={C.maroon} stroke={C.goldLight} strokeWidth="0.8" />
      </g>
    </Box>
  )
}
