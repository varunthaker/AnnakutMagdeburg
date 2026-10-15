import { createTheme, responsiveFontSizes } from '@mui/material/styles'

// ── Traditional Annakut palette, drawn from the stage photo: ivory
//    backdrop cloth, maroon frame, saffron robes, rani-pink velvet, lotus
//    pink and temple gold. Light surfaces keep the page airy; maroon and
//    gold carry the festive weight. Token names are shared by every
//    component, so keep them stable when retuning colours. ──
export const C = {
  // Surfaces
  ivory: '#FFF9F0', // page background
  cream: '#F8ECDA', // alternate section background (parchment)
  shell: '#EAD6B6', // hairlines, input fill

  // Lotus & velvet
  blush:     '#F4C9D6', // lotus pink
  blushDeep: '#C2185B', // rani pink
  lilac:     '#8E1B3A', // deep magenta-maroon
  lilacDeep: '#4E0B18', // deepest maroon (footer)
  mint:      '#F3E2B3', // pale gold wash
  mintDeep:  '#A87B22', // antique gold — links, focus rings
  peach:     '#F8D3A6', // saffron wash
  peachDeep: '#E07A1F', // saffron

  // Accents
  maroon:      '#7A1526', // primary buttons, headings accent
  saffron:     '#E07A1F', // robes — highlights
  saffronDeep: '#B85A10',
  gold:        '#C8962E', // dividers, borders, small-caps labels
  goldLight:   '#E6C77A',

  // Text
  ink:      '#5C1020', // headings (maroon)
  inkSoft:  '#5B4036', // body text (warm brown)
  inkMuted: '#8C7060', // captions, labels
}

export const FONTS = {
  // Calligraphic — the main "Annakut Utsav" title only.
  script: '"Parisienne", "Pinyon Script", cursive',
  // Elegant upright serif for headings.
  serif: '"Cormorant Garamond", "Cormorant", Georgia, serif',
  // Clean sans for body, labels and buttons.
  sans: '"Jost", "Inter", system-ui, -apple-system, sans-serif',
}

const baseTheme = createTheme({
  palette: {
    primary:   { main: C.maroon, dark: C.lilacDeep, contrastText: C.ivory },
    secondary: { main: C.saffron, contrastText: '#ffffff' },
    // Page is maroon velvet; dialogs and menus stay ivory.
    background: { default: '#4E0B18', paper: C.ivory },
    text:       { primary: C.ink, secondary: C.inkSoft },
    divider:    C.shell,
  },
  typography: {
    fontFamily: FONTS.sans,
    h1: { fontFamily: FONTS.serif, fontWeight: 600, fontSize: '2.75rem', letterSpacing: '0.01em', color: C.ink },
    h2: { fontFamily: FONTS.serif, fontWeight: 600, fontSize: '2.25rem', letterSpacing: '0.01em', color: C.ink },
    h3: { fontFamily: FONTS.serif, fontWeight: 600, fontSize: '1.6rem',  letterSpacing: '0.01em', color: C.ink },
    h4: { fontWeight: 500, fontSize: '1.25rem' },
    h5: { fontWeight: 500, fontSize: '1.1rem' },
    h6: { fontWeight: 500, fontSize: '1rem' },
    button: { fontWeight: 500, textTransform: 'none', letterSpacing: '0.04em', fontFamily: FONTS.sans },
    overline: { fontFamily: FONTS.sans, fontSize: '0.72rem', letterSpacing: '0.24em', fontWeight: 500, color: C.saffron },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999, padding: '10px 24px' },
        sizeLarge: { padding: '13px 34px', fontSize: '15px' },
        // Primary: maroon with a fine gold edge, ivory text.
        containedPrimary: {
          color: C.ivory,
          background: `linear-gradient(180deg, ${C.lilac}, ${C.maroon})`,
          border: `1px solid ${C.gold}`,
          boxShadow: '0 4px 14px rgba(122,21,38,0.22)',
          '&:hover': {
            background: `linear-gradient(180deg, ${C.maroon}, ${C.lilacDeep})`,
            boxShadow: '0 8px 22px rgba(122,21,38,0.3)',
            transform: 'translateY(-1px)',
          },
        },
        // Secondary ("Learn More"): transparent, gold border, maroon text.
        outlinedPrimary: {
          color: C.maroon,
          borderWidth: '1.5px',
          borderColor: C.gold,
          background: 'transparent',
          '&:hover': { background: `${C.mint}80`, borderWidth: '1.5px', borderColor: C.gold },
        },
      },
    },
    MuiContainer: { defaultProps: { maxWidth: 'lg' } },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: '#ffffff',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: C.gold,
              borderWidth: 1,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': { color: C.maroon },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: { root: { '&.Mui-checked': { color: C.maroon } } },
    },
  },
})

const theme = responsiveFontSizes(baseTheme, { factor: 1.5 })
export default theme

export const PRIMARY   = C.maroon
export const SECONDARY = C.saffron

// Accent used for hover states on nav links and drawer items.
export const CORAL = C.maroon

// "Register Now" CTA — same maroon/gold treatment as containedPrimary.
export const registerCtaSx = {
  color: C.ivory,
  background: `linear-gradient(180deg, ${C.lilac}, ${C.maroon})`,
  border: `1px solid ${C.gold}`,
  boxShadow: '0 4px 14px rgba(122,21,38,0.22)',
  '&:hover': {
    background: `linear-gradient(180deg, ${C.maroon}, ${C.lilacDeep})`,
    boxShadow: '0 8px 22px rgba(122,21,38,0.3)',
  },
}

// ── Royal surfaces: the maroon velvet of the opening curtain, used as the
//    background for every page section. Text on them uses the ROYAL tokens.
export const ROYAL = {
  bg: `radial-gradient(ellipse 80% 70% at 50% 35%, ${C.lilac} 0%, ${C.maroon} 50%, ${C.lilacDeep} 100%)`,
  bgDeep: `radial-gradient(ellipse 90% 80% at 50% 0%, ${C.maroon} 0%, #5E0E1D 45%, ${C.lilacDeep} 100%)`,
  text: '#FBEBD0',      // ivory body text
  textSoft: '#E9CFAE',  // secondary text
  kicker: '#F2B26B',    // light saffron small-caps labels
  heading: C.goldLight, // section headings
  seam: `3px double ${C.gold}99`, // gold double rule between sections
}

// Shared gold "royal" CTA for use on maroon surfaces.
export const goldCtaSx = {
  color: C.lilacDeep,
  background: `linear-gradient(180deg, #F3DC9A, ${C.goldLight} 40%, ${C.gold})`,
  border: `1px solid #F3DC9A`,
  boxShadow: '0 4px 18px rgba(230,199,122,0.35)',
  '&:hover': {
    background: `linear-gradient(180deg, #F7E4AE, ${C.goldLight} 30%, ${C.gold})`,
    boxShadow: '0 8px 26px rgba(230,199,122,0.5)',
  },
}
