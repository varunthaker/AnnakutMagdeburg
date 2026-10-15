import { EVENT, PEOPLE, FOOTER, FOOD_OFFERING } from "../src/data/data";

/** The `registrations` row Supabase sends in the webhook payload. */
export interface RegistrationRecord {
  name: string;
  email: string;
  /** Additional adults beyond the registrant. */
  extra_adults: number;
  children: number;
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Palette mirrors src/theme/theme.ts (C and ROYAL). Email clients strip
// <style> blocks and external CSS, so every colour is repeated inline below.
// Each gradient sits on a solid bgcolor so clients without gradient support
// (Outlook, some Gmail views) still show the right colour.
const INK = "#5C1020"; // maroon text on cream
const INK_SOFT = "#5B4036"; // warm brown body text
const IVORY = "#FFF9F0"; // card surface
const SHELL = "#EAD6B6"; // hairlines on cream
const MAROON = "#7A1526";
const MAROON_DEEP = "#4E0B18"; // footer band, gold-button text
const PAGE_BG = "#7E2434"; // email background — a lighter maroon
const WINE = "#8E1B3A";
const GOLD = "#C8962E";
const GOLD_LIGHT = "#E6C77A";
const SAFFRON_DEEP = "#B85A10"; // small-caps labels on cream
const ROYAL_KICKER = "#F2B26B"; // small-caps labels on maroon
const ROYAL_TEXT = "#FBEBD0";

const FONT_SCRIPT = "'Parisienne','Pinyon Script','Brush Script MT',cursive";
const FONT_SERIF = "'Cormorant Garamond',Georgia,'Times New Roman',serif";
const FONT_SANS = "Jost,-apple-system,'Helvetica Neue',Helvetica,Arial,sans-serif";

const VELVET = `radial-gradient(ellipse at 50% 30%, ${WINE} 0%, ${MAROON} 50%, ${MAROON_DEEP} 100%)`;

const EVENT_TIME = EVENT.timeLabel;
const VENUE_LINE = `${EVENT.venueName}, 39106 Magdeburg`;

/**
 * Absolute base URL for images. Email clients cannot resolve relative paths,
 * so without one we fall back to text ornaments rather than broken images.
 * Vercel sets VERCEL_PROJECT_PRODUCTION_URL automatically on production.
 */
function siteUrl(): string | null {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  return vercel ? `https://${vercel}` : null;
}

/**
 * Webfont loading — the only styling that cannot be inlined. Clients that
 * ignore it (Outlook, Gmail) fall back through the stacks above.
 */
function fontFaces(): string {
  const google =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Parisienne&family=Jost:wght@400;500&display=swap";
  // Both forms: some clients honour <link> but drop @import, others vice
  // versa. Gmail and Outlook strip webfonts entirely and use the fallbacks.
  return `<link href="${google}" rel="stylesheet" type="text/css" />
<style>
@import url('${google}');
</style>`;
}

/**
 * The calligraphic gold title. Gmail and Outlook strip webfonts, so with an
 * absolute base URL it is sent as an image (public/images/email-title.png,
 * rendered from the site's Parisienne + Cormorant styling); the alt text and
 * the typeset fallback keep the same words when images are off.
 */
function titleBlock(base: string | null): string {
  if (base) {
    return `<img src="${base}/images/email-title.png" width="420" alt="${escapeHtml(EVENT.title)} ${escapeHtml(EVENT.city)}" style="display:block;margin:6px auto 10px;border:0;outline:none;width:420px;max-width:92%;height:auto;" />`;
  }
  return `<div style="font:400 50px/1.25 ${FONT_SCRIPT};color:${GOLD_LIGHT};padding-top:8px;">${escapeHtml(EVENT.title)}</div>
    <div style="font:600 15px/1.4 ${FONT_SERIF};letter-spacing:.45em;text-transform:uppercase;color:${GOLD_LIGHT};padding:4px 0 16px .45em;">${escapeHtml(EVENT.city)}</div>`;
}

const CONTACTS_TEXT = PEOPLE.map((p) => `${p.name}: ${p.phone.replace("tel:", "")}`).join("\n");

/** One column per organiser: name and phone number (opens the dialler). */
function contactsHtml(): string {
  const cells = PEOPLE.map((p) => `<td align="center" valign="top" width="${Math.floor(100 / PEOPLE.length)}%" style="padding:4px 8px;">
      <div style="font:500 14px/1.6 ${FONT_SANS};color:${INK};">${escapeHtml(p.name)}</div>
      <div style="font:400 14px/1.6 ${FONT_SANS};color:${INK_SOFT};padding-top:4px;">
        <a href="${escapeHtml(p.phone)}" style="color:${INK_SOFT};text-decoration:none;">${escapeHtml(p.phone.replace("tel:", ""))}</a>
      </div>
    </td>`).join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${cells}</tr></table>`;
}

function partySizeOf(record: RegistrationRecord): number {
  // The registrant is always one adult on top of extra_adults.
  return 1 + record.extra_adults + record.children;
}

function row(label: string, value: string, last = false): string {
  const rule = last ? "" : `border-bottom:1px solid ${SHELL};`;
  return `<tr>
  <td width="110" style="padding:10px 0;${rule}font:500 11px/1.7 ${FONT_SANS};letter-spacing:.16em;text-transform:uppercase;color:${SAFFRON_DEEP};vertical-align:top;">${escapeHtml(label)}</td>
  <td style="padding:10px 0;${rule}font:400 15px/1.6 ${FONT_SANS};color:${INK};">${escapeHtml(value)}</td>
</tr>`;
}

/** A thin gold rule between sections. */
const RULE = `<tr><td style="padding:0 40px;"><div style="height:1px;background:${GOLD};opacity:.45;font-size:0;line-height:0;">&nbsp;</div></td></tr>`;

/** Small-caps section label. */
const label = (text: string) =>
  `<div style="font:500 11px/1.5 ${FONT_SANS};letter-spacing:.24em;text-transform:uppercase;color:${SAFFRON_DEEP};padding-bottom:6px;">${escapeHtml(text)}</div>`;

export function buildConfirmationEmail(record: RegistrationRecord): {
  subject: string;
  text: string;
  html: string;
} {
  const partySize = partySizeOf(record);
  const base = siteUrl();
  const subject = `${EVENT.title} ${EVENT.city} Registration Confirmation - ${record.name}`;
  const preheader = `${EVENT.dateLabel} · ${EVENT.city} · ${partySize} ${partySize === 1 ? "member" : "members"}`;

  const text = `Dear ${record.name},

Your registration is confirmed. We are glad you will be joining us.

${EVENT.kicker} — ${EVENT.title} ${EVENT.city}

Name:    ${record.name}
Members: ${partySize}
Date:    ${EVENT.dateLabel}
Time:    ${EVENT_TIME}
Venue:   ${VENUE_LINE}

We look forward to welcoming you.

${FOOD_OFFERING.heading}
${FOOD_OFFERING.message}
${FOOD_OFFERING.url}

Questions? Contact:
${CONTACTS_TEXT}

${FOOTER.brand}`;

  const button = (href: string, text: string) =>
    `<a href="${escapeHtml(href)}" style="display:inline-block;padding:12px 30px;border-radius:999px;border:1px solid ${GOLD};background:${GOLD_LIGHT};color:${MAROON_DEEP};font:500 14px/1 ${FONT_SANS};letter-spacing:.06em;text-decoration:none;">${escapeHtml(text)}</a>`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light only" />
<title>${escapeHtml(subject)}</title>
${fontFaces()}
</head>
<body style="margin:0;padding:0;background:${PAGE_BG};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${PAGE_BG}" style="background:${PAGE_BG};">
<tr><td align="center" style="padding:32px 12px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="${IVORY}" style="width:100%;max-width:600px;background:${IVORY};border:1px solid ${GOLD};border-radius:16px;overflow:hidden;">

  <!-- Header -->
  <tr><td align="center" bgcolor="${MAROON}" style="padding:30px 28px 24px;background:${MAROON};background-image:${VELVET};border-bottom:2px solid ${GOLD};">
    <div style="font:500 11px/1.5 ${FONT_SANS};letter-spacing:.28em;text-transform:uppercase;color:${ROYAL_KICKER};">${escapeHtml(EVENT.kicker)}</div>
    ${titleBlock(base)}
  </td></tr>

  <!-- Greeting -->
  <tr><td align="center" style="padding:36px 40px 26px;">
    ${label("Registration Confirmed")}
    <div style="font:600 26px/1.3 ${FONT_SERIF};color:${INK};">Dear ${escapeHtml(record.name)},</div>
    <div style="font:400 15px/1.7 ${FONT_SANS};color:${INK_SOFT};padding-top:8px;">Your registration is confirmed. We are glad you will be joining us for the celebration.</div>
  </td></tr>

  <!-- Details -->
  <tr><td style="padding:0 40px 18px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${SHELL};">
      ${row("Name", record.name)}
      ${row("Members", String(partySize))}
      ${row("Date", EVENT.dateLabel)}
      ${row("Time", EVENT_TIME)}
      ${row("Venue", VENUE_LINE, true)}
    </table>
  </td></tr>

  ${RULE}

  <!-- Food offering -->
  <tr><td align="center" style="padding:28px 40px 30px;">
    ${label(FOOD_OFFERING.kicker)}
    <div style="font:600 21px/1.3 ${FONT_SERIF};color:${INK};">${escapeHtml(FOOD_OFFERING.heading)}</div>
    <div style="font:400 14px/1.7 ${FONT_SANS};color:${INK_SOFT};padding:8px 0 20px;">${escapeHtml(FOOD_OFFERING.message)}</div>
    ${button(FOOD_OFFERING.url, FOOD_OFFERING.cta)}
  </td></tr>

  ${RULE}

  <!-- Contacts -->
  <tr><td align="center" style="padding:26px 32px 30px;">
    ${label("Questions? Contact us")}
    ${contactsHtml()}
  </td></tr>

  <!-- Footer -->
  <tr><td align="center" bgcolor="${MAROON_DEEP}" style="padding:16px 28px;background:${MAROON_DEEP};border-top:2px solid ${GOLD};">
    <div style="font:400 12px/1.6 ${FONT_SANS};letter-spacing:.06em;color:${ROYAL_TEXT};opacity:.75;">${escapeHtml(FOOTER.brand)} &middot; ${new Date(EVENT.dateISO).getFullYear()}</div>
  </td></tr>

</table>

</td></tr>
</table>
</body>
</html>`;

  return { subject, text, html };
}
