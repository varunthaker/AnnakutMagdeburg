import { EVENT, PEOPLE, FOOTER } from "../src/data/data";

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

// Palette mirrors src/theme/theme.ts. Email clients strip <style> blocks and
// external CSS, so every colour is repeated inline below.
const INK = "#5C1020";
const INK_SOFT = "#5B4036";
const INK_MUTED = "#8C7060";
const IVORY = "#FFF9F0";
const SHELL = "#EAD6B6";
const MAROON = "#7A1526";
const SAFFRON = "#E07A1F";
const GOLD = "#C8962E";

const FONT_SCRIPT = "'Parisienne','Pinyon Script','Brush Script MT',cursive";
const FONT_SERIF = "'Cormorant Garamond',Georgia,'Times New Roman',serif";
const FONT_SANS = "Jost,-apple-system,'Helvetica Neue',Helvetica,Arial,sans-serif";

const EVENT_TIME = EVENT.timeLabel;
const VENUE_LINE = `${EVENT.venueName}, 39106 Magdeburg`;

/**
 * Absolute base URL for images. Email clients cannot resolve relative paths,
 * so without one we fall back to a text ornament rather than a broken image.
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

/** The event title, set in type so it renders without remote images. */
function titleBlock(): string {
  return `<div style="font:400 40px/1.2 ${FONT_SCRIPT};color:${MAROON};padding-top:4px;">${escapeHtml(EVENT.title)}</div>
    <div style="font:600 15px/1.4 ${FONT_SERIF};letter-spacing:.38em;text-transform:uppercase;color:${GOLD};padding-top:6px;">${escapeHtml(EVENT.city)}</div>`;
}

const CONTACTS_TEXT = PEOPLE.map((p) => `${p.name}: ${p.phone.replace("tel:", "")}`).join("\n");

function contactsHtml(): string {
  return PEOPLE.map(
    (p) =>
      `<div>${escapeHtml(p.name)}: <a href="${escapeHtml(p.phone)}" style="color:${INK_SOFT};text-decoration:underline;">${escapeHtml(p.phone.replace("tel:", ""))}</a></div>`,
  ).join("");
}

function partySizeOf(record: RegistrationRecord): number {
  // The registrant is always one adult on top of extra_adults.
  return 1 + record.extra_adults + record.children;
}

function row(label: string, value: string): string {
  return `<tr>
  <td style="padding:6px 0;font:600 12px/1.5 ${FONT_SANS};letter-spacing:.08em;text-transform:uppercase;color:${INK_MUTED};white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
  <td style="padding:6px 0 6px 18px;font:400 15px/1.6 ${FONT_SANS};color:${INK};">${escapeHtml(value)}</td>
</tr>`;
}

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

Your registration is confirmed.

${EVENT.title} ${EVENT.city} — ${EVENT.kicker}

Name:    ${record.name}
Members: ${partySize}
Date:    ${EVENT.dateLabel}
Time:    ${EVENT_TIME}
Venue:   ${VENUE_LINE}

We look forward to welcoming you.

Questions? Contact:
${CONTACTS_TEXT}

${FOOTER.closing}`;

  const mark = base
    ? `<img src="${base}/favicon.png" width="56" height="56" alt="" style="display:block;margin:0 auto 14px;border:0;outline:none;" />`
    : `<div style="font:400 18px/1 ${FONT_SANS};color:${GOLD};margin-bottom:14px;">&#10022;</div>`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<title>${escapeHtml(subject)}</title>
${fontFaces()}
</head>
<body style="margin:0;padding:0;background:${IVORY};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${IVORY};">
<tr><td align="center" style="padding:32px 16px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#FFFFFF;border:1px solid ${SHELL};border-radius:18px;overflow:hidden;">

  <!-- Ribbon -->
  <tr><td style="height:4px;background:${MAROON};font-size:0;line-height:0;">&nbsp;</td></tr>

  <!-- Header -->
  <tr><td align="center" style="padding:36px 32px 8px;">
    ${mark}
    <div style="font:600 11px/1.4 ${FONT_SANS};letter-spacing:.24em;text-transform:uppercase;color:${SAFFRON};padding-bottom:10px;">${escapeHtml(EVENT.kicker)}</div>
    ${titleBlock()}
    <div style="font:600 11px/1.6 ${FONT_SANS};letter-spacing:.14em;text-transform:uppercase;color:${GOLD};padding-top:10px;">${escapeHtml(EVENT.highlight)}</div>
  </td></tr>

  <tr><td align="center" style="padding:18px 32px 0;">
    <div style="height:1px;background:${SHELL};font-size:0;line-height:0;">&nbsp;</div>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:24px 32px 0;">
    <p style="margin:0 0 6px;font:400 14px/1.7 ${FONT_SANS};color:${INK_SOFT};">Dear ${escapeHtml(record.name)},</p>
    <p style="margin:0 0 20px;font:400 14px/1.7 ${FONT_SANS};color:${INK_SOFT};">Your registration is confirmed. We are glad you will be joining us.</p>
  </td></tr>

  <!-- Details -->
  <tr><td style="padding:0 32px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${IVORY};border:1px solid ${SHELL};border-radius:14px;">
      <tr><td style="padding:18px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${row("Name", record.name)}
          ${row("Members", String(partySize))}
          ${row("Date", EVENT.dateLabel)}
          ${row("Time", EVENT_TIME)}
          ${row("Venue", VENUE_LINE)}
        </table>
      </td></tr>
    </table>
  </td></tr>


  <!-- Footer -->
  <tr><td align="center" style="padding:20px 32px 32px;">
    <div style="height:1px;background:${SHELL};font-size:0;line-height:0;margin-bottom:16px;">&nbsp;</div>
    <div style="font:400 13px/1.7 ${FONT_SANS};color:${INK_MUTED};">
      <div style="padding-bottom:4px;">Questions? Contact</div>
      ${contactsHtml()}
    </div>
    <div style="font:400 12px/1.7 ${FONT_SANS};color:${INK_MUTED};padding-top:10px;">${escapeHtml(FOOTER.brand)}</div>
  </td></tr>

</table>

</td></tr>
</table>
</body>
</html>`;

  return { subject, text, html };
}
