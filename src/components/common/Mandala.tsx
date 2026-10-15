import { Box } from '@mui/material'

interface Props {
  color: string
  size: number | string | object
  opacity?: number
  sx?: object
}

// Petal rings built from rotated ellipses.
const ring = (count: number, dist: number, rx: number, ry: number) =>
  Array.from({ length: count }, (_, i) => (
    <ellipse
      key={`${dist}-${i}`}
      cx="0"
      cy={-dist}
      rx={rx}
      ry={ry}
      transform={`rotate(${(360 / count) * i})`}
    />
  ))

const dots = (count: number, dist: number, r: number) =>
  Array.from({ length: count }, (_, i) => {
    const a = ((2 * Math.PI) / count) * i
    return <circle key={`d${dist}-${i}`} cx={Math.sin(a) * dist} cy={-Math.cos(a) * dist} r={r} />
  })

// Line-drawn mandala watermark that turns very slowly — decorative only.
export default function Mandala({ color, size, opacity = 0.08, sx }: Props) {
  return (
    <Box
      component="svg"
      viewBox="-200 -200 400 400"
      aria-hidden="true"
      sx={{
        position: 'absolute',
        width: size,
        height: size,
        opacity,
        pointerEvents: 'none',
        animation: 'spin 240s linear infinite',
        ...sx,
      }}
    >
      <g fill="none" stroke={color} strokeWidth="1">
        <circle r="24" />
        {ring(8, 36, 7, 14)}
        <circle r="54" />
        {ring(16, 74, 8, 20)}
        <circle r="96" />
        {ring(24, 116, 7, 20)}
        <circle r="138" />
        {ring(32, 158, 6, 20)}
        <circle r="180" />
        <circle r="192" strokeDasharray="2 6" />
      </g>
      <g fill={color}>
        {dots(16, 96, 2)}
        {dots(32, 138, 1.6)}
      </g>
    </Box>
  )
}
