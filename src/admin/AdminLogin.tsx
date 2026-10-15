import { useState, type FormEvent } from 'react'
import { Box, Button, TextField, Typography, Alert } from '@mui/material'
import { supabase } from '../lib/supabase'
import { C, FONTS, ROYAL } from '../theme/theme'
import Mandala from '../components/common/Mandala'
import SectionDivider from '../components/common/SectionDivider'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (error) setError('Sign-in failed. Check your email and password.')
    setBusy(false)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: 2,
        position: 'relative',
        overflow: 'hidden',
        background: ROYAL.bg,
      }}
    >
      <Mandala color={C.goldLight} size={900} opacity={0.08} sx={{ left: '50%', top: '50%', ml: '-450px', mt: '-450px' }} />
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 400,
          background: C.ivory,
          border: `1px solid ${C.gold}`,
          borderTop: `3px solid ${C.gold}`,
          borderRadius: '18px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
          p: { xs: 3.5, sm: 4.5 },
          textAlign: 'center',
        }}
      >
        <Typography sx={{ fontFamily: FONTS.script, fontSize: '2.4rem', color: C.maroon, lineHeight: 1.2 }}>
          Annakut Utsav
        </Typography>
        <Typography sx={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.saffronDeep, mt: 0.5 }}>
          Organiser Login
        </Typography>
        <SectionDivider sx={{ mt: 1.5, mb: 3 }} />

        <TextField label="Email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required sx={{ mb: 2 }} />
        <TextField label="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />

        {error && <Alert severity="error" sx={{ mt: 2, textAlign: 'left' }}>{error}</Alert>}

        <Button type="submit" variant="contained" size="large" fullWidth disabled={busy} sx={{ mt: 3 }}>
          {busy ? 'Signing in…' : 'Sign in'}
        </Button>
      </Box>
    </Box>
  )
}
