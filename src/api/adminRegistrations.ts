import { supabase } from '../lib/supabase'

/** One registration, with extra_adults read as the total adults (registrant included). */
export interface RegistrationRow {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  adults: number
  children: number
  party_size: number
}

export async function fetchRegistrations(): Promise<RegistrationRow[]> {
  const { data, error } = await supabase
    .from('registrations')
    .select('id, created_at, name, email, phone, extra_adults, children')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return (data ?? []).map(({ extra_adults, ...r }) => ({
    ...r,
    adults: extra_adults,
    party_size: extra_adults + r.children,
  }))
}

/** Stored as "49 17612345678"; shown as "+49 17612345678". */
export function formatPhone(phone: string | null): string {
  return phone ? `+${phone}` : ''
}

export interface RegistrationTotals {
  registrations: number
  persons: number
  adults: number
  children: number
}

export function totalsOf(rows: RegistrationRow[]): RegistrationTotals {
  return rows.reduce(
    (t, r) => ({
      registrations: t.registrations + 1,
      persons: t.persons + r.party_size,
      adults: t.adults + r.adults,
      children: t.children + r.children,
    }),
    { registrations: 0, persons: 0, adults: 0, children: 0 },
  )
}
