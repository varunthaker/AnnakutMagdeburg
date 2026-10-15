import { Box, CircularProgress } from '@mui/material'
import { useAdminSession } from '../hooks/useAdminSession'
import { C, ROYAL } from '../theme/theme'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

// Organiser area at /admin: login until signed in, then the dashboard.
export default function AdminApp() {
  const session = useAdminSession()

  if (session === undefined) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: ROYAL.bgDeep }}>
        <CircularProgress size={32} sx={{ color: C.goldLight }} />
      </Box>
    )
  }
  return session ? <AdminDashboard session={session} /> : <AdminLogin />
}
