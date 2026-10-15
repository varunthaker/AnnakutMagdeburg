import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NAV_LINKS } from '../../data/data';
import { navbarStyles as s } from './Navbar.styles';
import { goldCtaSx } from '../../theme/theme';
import { useRegistrationOpen } from '../../hooks/useRegistrationOpen';
import { useRsvpStore } from '../../store/rsvpStore';

export default function Navbar() {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const registrationOpen = useRegistrationOpen();
  const openModal = useRsvpStore((st) => st.openModal);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setDrawerOpen(false);
  };

  const onCta = () => {
    if (registrationOpen) openModal();
    else goTo('#contact');
    setDrawerOpen(false);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      className={scrolled ? 'scrolled' : ''}
      sx={s.appBar}
    >
      <Toolbar sx={s.toolbar} disableGutters>
        {/* ── Brand ── */}
        <Box
          sx={s.brandBox}
          onClick={() => goTo('#hero')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && goTo('#hero')}
          aria-label="Go to home page"
        >
          <Box
            component="img"
            src="/images/lotus-mark.png"
            alt=""
            aria-hidden="true"
            sx={s.brandMark}
          />
          <Typography sx={s.brandText}>
            HariPrabodham DE
            <Typography
              component="small"
              sx={s.brandSub}
            >
              Magdeburg
            </Typography>
          </Typography>
        </Box>

        {isMobile ? (
          /* ── Mobile ── */
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={() => setDrawerOpen(true)} sx={s.iconColor}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              slotProps={{ paper: { sx: s.drawerBox } }}
            >
              <Box sx={{ p: 2 }}>
                <List>
                  {NAV_LINKS.map((link) => (
                    <ListItem key={link.href} disablePadding>
                      <ListItemButton
                        onClick={() => goTo(link.href)}
                        sx={s.drawerLink}
                      >
                        <ListItemText primary={link.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  <ListItem disablePadding sx={{ mt: 1.5 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={goldCtaSx}
                      onClick={onCta}
                    >
                      {registrationOpen ? 'Register Now' : 'Contact Us'}
                    </Button>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          /* ── Desktop ── */
          <Box sx={s.desktopNav}>
            {NAV_LINKS.map((link) => (
              <Button
                key={link.href}
                onClick={() => goTo(link.href)}
                disableRipple
                sx={s.navButton}
              >
                {link.label}
              </Button>
            ))}

            <Button
              variant="contained"
              size="large"
              onClick={onCta}
              sx={s.registerButton}
            >
              {registrationOpen ? 'Register Now' : 'Contact Us'}
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
