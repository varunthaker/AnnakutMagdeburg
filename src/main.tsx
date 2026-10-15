import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeProvider, CssBaseline } from '@mui/material'
import App from './App.tsx'
import theme from './theme/theme.ts'

// The organiser area lives at /admin; it is loaded only when visited.
const AdminApp = lazy(() => import('./admin/AdminApp.tsx'))
const isAdmin = window.location.pathname.replace(/\/+$/, '').startsWith('/admin')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isAdmin ? (
        <Suspense fallback={null}>
          <AdminApp />
        </Suspense>
      ) : (
        <App />
      )}
    </ThemeProvider>
  </React.StrictMode>,
)
