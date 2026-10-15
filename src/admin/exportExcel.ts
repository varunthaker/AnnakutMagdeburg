import { EVENT } from '../data/data'
import { formatPhone, totalsOf, type RegistrationRow } from '../api/adminRegistrations'

const bold = (value: string | number) => ({ value, fontWeight: 'bold' as const })

/**
 * Downloads the registrations as a real .xlsx workbook with two sheets:
 * "Registrations" (one row per household + a totals row) and "Summary".
 * The writer is loaded on demand so it never weighs on the public page.
 */
export async function downloadRegistrationsExcel(rows: RegistrationRow[]): Promise<void> {
  const { default: writeXlsxFile } = await import('write-excel-file/universal')
  const totals = totalsOf(rows)
  const now = new Date()

  const header = ['No.', 'Registered On', 'Name', 'Email', 'Phone', 'Adults', 'Children', 'Total Persons'].map(bold)

  const body = rows.map((r, i) => [
    i + 1,
    { value: new Date(r.created_at), format: 'dd.mm.yyyy hh:mm' },
    r.name,
    r.email,
    formatPhone(r.phone),
    r.adults,
    r.children,
    r.party_size,
  ])

  const totalRow = [
    bold('TOTAL'),
    null,
    bold(`${totals.registrations} registrations`),
    null,
    null,
    bold(totals.adults),
    bold(totals.children),
    bold(totals.persons),
  ]

  const summary = [
    [bold('Event'), `${EVENT.title} ${EVENT.city}`],
    [bold('Date'), `${EVENT.dateLabel}, ${EVENT.timeLabel}`],
    [bold('Venue'), `${EVENT.venueName}, 39106 Magdeburg`],
    [null, null],
    [bold('Total registrations'), totals.registrations],
    [bold('Total persons'), totals.persons],
    [bold('Adults'), totals.adults],
    [bold('Children'), totals.children],
    [null, null],
    [bold('Exported on'), { value: now, format: 'dd.mm.yyyy hh:mm' }],
  ]

  const blob = await writeXlsxFile([
    {
      sheet: 'Registrations',
      data: [header, ...body, totalRow],
      columns: [{ width: 6 }, { width: 18 }, { width: 28 }, { width: 32 }, { width: 20 }, { width: 9 }, { width: 10 }, { width: 14 }],
      stickyRowsCount: 1,
    },
    {
      sheet: 'Summary',
      data: summary,
      columns: [{ width: 22 }, { width: 52 }],
    },
  ]).toBlob()

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `annakut-magdeburg-registrations-${now.toISOString().slice(0, 10)}.xlsx`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
