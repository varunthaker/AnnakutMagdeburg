// src/data/data.ts
// ─── Every editable string for the site lives here. ───

export const EVENT = {
  title: 'Annakut Utsav',
  city: 'Magdeburg',
  kicker: 'HariPrabodham Germany',
  invite: 'heartly invite you to',
  highlight: 'He Hari Bas Ek Tu Raji Tha!',
  dateISO: '2026-11-07T17:00:00+01:00',
  dateLabel: 'Saturday, 7 November 2026',
  timeLabel: '5:00 PM',
  venueName: 'Universitätsplatz, Gebäude 03, Raum 315',
  organiser: 'HariPrabodham Germany',
};

export const ABOUT_ANNAKUT = {
  heading: 'About Annakut Utsav',
  paragraphs: [
    'Celebrate devotion and divine blessings, reflect on a life of faith and love, and enjoy Annakut offerings prepared with heartfelt gratitude to God.',
    'Annakut - the "mountain of food" - is offered to the Lord after Diwali in gratitude for the year past. Join the HariPrabodham family in Magdeburg for darshan, kirtan and prasad as we welcome the new year together.',
  ],
};

// icon keys map to line icons in GlanceSection.tsx
export const GLANCE: { icon: 'date' | 'venue' | 'prasad' | 'entry'; title: string; lines: string[] }[] = [
  {
    icon: 'date',
    title: 'Date & Time',
    lines: [EVENT.dateLabel, EVENT.timeLabel],
  },
  {
    icon: 'venue',
    title: 'Venue',
    lines: ['Universitätsplatz, Gebäude 03', 'Raum 315, 39106 Magdeburg'],
  },
  {
    icon: 'prasad',
    title: 'Prasad',
    lines: ['Annakut Prasad (Dinner) will be served after the event'],
  },
  {
    icon: 'entry',
    title: 'Entry',
    lines: ['Entry is free, but registration is required to serve you better'],
  },
];

export const COUNTRIES = [
  { code: 'DE', label: 'Germany', flag: '🇩🇪', dialCode: '+49' },
  { code: 'IN', label: 'India', flag: '🇮🇳', dialCode: '+91' },
  { code: 'CZ', label: 'Czech Republic', flag: '🇨🇿', dialCode: '+420' },
  { code: 'PL', label: 'Poland', flag: '🇵🇱', dialCode: '+48' },
];

export const FAQS = [
  {
    q: 'Do I need to register?',
    a: 'Yes. Entry is free, but registration is required so we can make proper arrangements for dinner and seating.',
  },
  {
    q: 'Can I bring my family?',
    a: 'Yes - in the registration form, enter the total number of adults (including yourself) and children.',
  },
  {
    q: 'Where exactly is the hall?',
    a: 'Room 315 in Building 03 on Universitätsplatz, Magdeburg. Contact one of the organisers below if you need help finding it.',
  },
];

// Food offering sign-up sheet, linked from the confirmation email.
export const FOOD_OFFERING = {
  url: 'https://docs.google.com/spreadsheets/d/1wUTjuETuu3MAosAstviaHeLwNqep8Ka4/edit?gid=1062253241#gid=1062253241',
  kicker: 'Annakut Offering',
  heading: 'Would you like to offer food?',
  message:
    'If you would like to offer food for the Annakut, please fill in your details in the food list below so we can arrange the offerings together.',
  cta: 'Open Food Offering List',
};

export const PEOPLE = [
  {
    name: 'Varun Thakkar',
    phone: 'tel:+4917685645884',
    whatsapp: 'https://wa.me/4917685645884',
  },
  {
    name: 'Bhupendra Sharma',
    phone: 'tel:+491637367110',
    whatsapp: 'https://wa.me/491637367110',
  },
];

export const VENUE = {
  title: 'Universitätsplatz',
  addressLines: [
    'Gebäude 03, Raum 315',
    'Universitätsplatz, 39106 Magdeburg',
  ],
  mapEmbedUrl:
    'https://www.google.com/maps?q=' +
    encodeURIComponent('Universitätsplatz, 39106 Magdeburg') +
    '&output=embed',
  directions: [
    'By tram: Universitätsplatz stop is right next to the venue.',
    'Look for Building 03 and take the stairs or lift to Room 315.',
  ],
};

export const FOOTER = {
  brand: 'HariPrabodham Annakut Utsav Magdeburg',
  closing: 'He Hari Bas Ek Tu Raji Tha! 🙏',
};

// Anchors on the single page.
export const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Venue', href: '#venue' },
  { label: 'Contact', href: '#contact' },
]
