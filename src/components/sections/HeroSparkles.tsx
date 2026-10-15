import { Box } from '@mui/material'
import { C } from '../../theme/theme'

// Deterministic pseudo-random so the layout is stable between renders.
const rand = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

const SPARKS = Array.from({ length: 26 }, (_, i) => ({
  left: `${4 + rand(i, 1) * 92}%`,
  top: `${30 + rand(i, 2) * 65}%`,
  size: 3 + Math.round(rand(i, 3) * 4),
  delay: `${(rand(i, 4) * 9).toFixed(2)}s`,
  duration: `${(6 + rand(i, 5) * 6).toFixed(2)}s`,
  drift: `${Math.round((rand(i, 6) - 0.5) * 60)}px`,
}))

// Gold embers rising softly over the hero — decorative only.
export default function HeroSparkles() {
  return (
    <Box
      aria-hidden="true"
      sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}
    >
      {SPARKS.map((sp, i) => (
        <Box
          key={i}
          component="span"
          style={{ ['--drift' as string]: sp.drift }}
          sx={{
            position: 'absolute',
            left: sp.left,
            top: sp.top,
            width: sp.size,
            height: sp.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, #FFF6D8 0%, ${C.goldLight} 45%, transparent 75%)`,
            boxShadow: `0 0 ${sp.size * 2}px ${C.goldLight}`,
            opacity: 0,
            animation: `ember ${sp.duration} ease-in-out ${sp.delay} infinite`,
          }}
        />
      ))}
    </Box>
  )
}
