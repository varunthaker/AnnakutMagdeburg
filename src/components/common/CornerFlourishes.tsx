import { Box } from '@mui/material'

interface Props {
  color: string
  size?: number
  inset?: number
}

// Gold filigree in all four corners of a positioned parent — a royal frame.
export default function CornerFlourishes({ color, size = 54, inset = 10 }: Props) {
  const corners = [
    { top: inset, left: inset, rotate: 0 },
    { top: inset, right: inset, rotate: 90 },
    { bottom: inset, right: inset, rotate: 180 },
    { bottom: inset, left: inset, rotate: 270 },
  ]
  return (
    <>
      {corners.map(({ rotate, ...pos }) => (
        <Box
          key={rotate}
          component="svg"
          viewBox="0 0 60 60"
          aria-hidden="true"
          sx={{
            position: 'absolute',
            ...pos,
            width: size,
            height: size,
            transform: `rotate(${rotate}deg)`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <g fill="none" stroke={color} strokeLinecap="round">
            <path d="M2 58 V22 C2 10 10 2 22 2 H58" strokeWidth="1.4" />
            <path d="M9 48 V25 C9 16 16 9 25 9 H48" strokeWidth="0.9" opacity="0.7" />
            <path d="M16 26 c0 -6 4 -10 10 -10 c4 0 6 3 5 6 c-1 3 -5 3 -6 0" strokeWidth="1.1" />
          </g>
          <path d="M5 5 l3 -3 l3 3 l-3 3 z" fill={color} />
        </Box>
      ))}
    </>
  )
}
