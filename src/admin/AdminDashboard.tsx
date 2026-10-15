import { useEffect, useMemo, useState } from 'react'
import {
  Box, Button, Container, Typography, TextField, InputAdornment, Alert, CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import DownloadIcon from '@mui/icons-material/FileDownloadOutlined'
import RefreshIcon from '@mui/icons-material/Refresh'
import LogoutIcon from '@mui/icons-material/Logout'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { EVENT } from '../data/data'
import { C, FONTS, ROYAL, goldCtaSx } from '../theme/theme'
import Mandala from '../components/common/Mandala'
import {
  fetchRegistrations, formatPhone, totalsOf, type RegistrationRow,
} from '../api/adminRegistrations'
import { downloadRegistrationsExcel } from './exportExcel'

const dateFmt = new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium', timeStyle: 'short' })

const cardSx = {
  background: C.ivory,
  border: `1px solid ${C.gold}`,
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
}

function StatCard({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) {
  return (
    <Box
      sx={{
        ...cardSx,
        borderTop: `3px solid ${highlight ? C.maroon : C.gold}`,
        p: { xs: 2, md: 2.75 },
        textAlign: 'center',
      }}
    >
      <Typography sx={{ fontFamily: FONTS.serif, fontWeight: 600, fontSize: { xs: '2.2rem', md: '2.8rem' }, lineHeight: 1, color: C.maroon, fontVariantNumeric: 'lining-nums tabular-nums' }}>
        {value}
      </Typography>
      <Typography sx={{ mt: 1, fontSize: 11.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.saffronDeep, fontWeight: 500 }}>
        {label}
      </Typography>
    </Box>
  )
}

export default function AdminDashboard({ session }: { session: Session }) {
  const [rows, setRows] = useState<RegistrationRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [exporting, setExporting] = useState(false)

  // Bumped by Refresh; the effect below refetches whenever it changes.
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    fetchRegistrations()
      .then((data) => {
        if (cancelled) return
        setRows(data)
        setError('')
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Could not load registrations.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const refresh = () => {
    setLoading(true)
    setReloadKey((k) => k + 1)
  }

  const totals = useMemo(() => totalsOf(rows), [rows])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) =>
      [r.name, r.email, formatPhone(r.phone)].some((v) => v.toLowerCase().includes(q)),
    )
  }, [rows, query])

  const onExport = async () => {
    setExporting(true)
    try {
      await downloadRegistrationsExcel(rows)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not create the Excel file.')
    } finally {
      setExporting(false)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', background: ROYAL.bgDeep, position: 'relative', overflow: 'hidden', pb: 8 }}>
      <Mandala color={C.goldLight} size={900} opacity={0.06} sx={{ right: -380, top: -300 }} />

      {/* ── Header bar ── */}
      <Box sx={{ position: 'relative', borderBottom: `1px solid ${C.gold}88`, background: 'rgba(78,11,24,0.9)' }}>
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, py: 1.5 }}>
          <Box>
            <Typography sx={{ fontFamily: FONTS.script, fontSize: { xs: '1.6rem', md: '2rem' }, color: C.goldLight, lineHeight: 1.1 }}>
              {EVENT.title} {EVENT.city}
            </Typography>
            <Typography sx={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: ROYAL.kicker }}>
              Registrations Overview
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography sx={{ display: { xs: 'none', sm: 'block' }, fontSize: 13, color: ROYAL.textSoft }}>
              {session.user.email}
            </Typography>
            <Button
              size="small"
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={() => supabase.auth.signOut()}
              sx={{ color: C.goldLight, borderColor: `${C.goldLight}99`, '&:hover': { borderColor: C.goldLight, background: 'rgba(230,199,122,0.1)' } }}
            >
              Sign out
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', pt: { xs: 3, md: 5 } }}>
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <>
          {/* ── Totals ── */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: { xs: 1.5, md: 2.5 }, mb: { xs: 3, md: 4 } }}>
            <StatCard label="Registrations" value={totals.registrations} highlight />
            <StatCard label="Total Persons" value={totals.persons} highlight />
            <StatCard label="Adults" value={totals.adults} />
            <StatCard label="Children" value={totals.children} />
          </Box>

          {/* ── Toolbar ── */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center', mb: 2 }}>
            <TextField
              size="small"
              placeholder="Search name, email or phone"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ flex: '1 1 260px', maxWidth: 420 }}
              slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> } }}
            />
            <Box sx={{ flex: 1 }} />
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={refresh}
              disabled={loading}
              sx={{ color: C.goldLight, borderColor: `${C.goldLight}99`, '&:hover': { borderColor: C.goldLight, background: 'rgba(230,199,122,0.1)' } }}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              startIcon={exporting ? <CircularProgress size={16} sx={{ color: C.lilacDeep }} /> : <DownloadIcon />}
              onClick={onExport}
              disabled={exporting || rows.length === 0}
              sx={goldCtaSx}
            >
              Download Excel
            </Button>
          </Box>

          {/* ── Table ── */}
          <TableContainer sx={{ ...cardSx, overflowX: 'auto' }}>
            <Table size="small" sx={{ minWidth: 820 }}>
              <TableHead>
                <TableRow sx={{ '& th': { fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.saffronDeep, fontWeight: 600, borderBottom: `2px solid ${C.gold}`, py: 1.5 } }}>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell align="center">Adults</TableCell>
                  <TableCell align="center">Children</TableCell>
                  <TableCell align="center">Total</TableCell>
                  <TableCell>Registered</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                      <CircularProgress size={28} sx={{ color: C.maroon }} />
                    </TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 6, color: C.inkMuted }}>
                      {rows.length === 0 ? 'No registrations yet.' : 'No registrations match your search.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((r, i) => (
                    <TableRow key={r.id} hover sx={{ '& td': { borderColor: C.shell, color: C.inkSoft, fontSize: 14 } }}>
                      <TableCell sx={{ color: `${C.inkMuted} !important` }}>{i + 1}</TableCell>
                      <TableCell sx={{ fontWeight: 500, color: `${C.ink} !important` }}>{r.name}</TableCell>
                      <TableCell>
                        <Box component="a" href={`mailto:${r.email}`} sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: C.maroon } }}>{r.email}</Box>
                      </TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{formatPhone(r.phone) || '—'}</TableCell>
                      <TableCell align="center">{r.adults}</TableCell>
                      <TableCell align="center">{r.children}</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600, color: `${C.maroon} !important` }}>{r.party_size}</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{dateFmt.format(new Date(r.created_at))}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {!loading && query && (
            <Typography sx={{ mt: 1.5, fontSize: 13, color: ROYAL.textSoft }}>
              Showing {filtered.length} of {rows.length} registrations. Totals and Excel always include all.
            </Typography>
          )}
        </>
      </Container>
    </Box>
  )
}
