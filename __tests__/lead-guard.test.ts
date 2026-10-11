import { isPlausibleName, isPlausiblePhone } from '@/lib/lead-guard'

describe('isPlausiblePhone', () => {
  it.each([
    '06 09 45 50 56',
    '0609455056',
    '06.09.45.50.56',
    '06-09-45-50-56',
    '+33 6 09 45 50 56',
    '+33609455056',
    '0033609455056',
    '+33 (0)6 09 45 50 56',
    '06/09/45/50/56',
    '01 64 40 12 34',
    '+32 470 12 34 56', // Belgique
    '+41 79 123 45 67', // Suisse
  ])('accepte %s', (phone) => {
    expect(isPlausiblePhone(phone)).toBe(true)
  })

  it.each([
    '88533653368336668883', // spam reçu (20 chiffres)
    '060945505',            // 9 chiffres
    '06094550566',          // 11 chiffres
    '00 09 45 50 56',
    '+33 0 9 45 50 56',
    '+33 6 09 45 50',
    'abc',
    '',
  ])('rejette %s', (phone) => {
    expect(isPlausiblePhone(phone)).toBe(false)
  })
})

describe('isPlausibleName', () => {
  it.each([
    'Jean Dupont',
    'Marie-Hélène de La Tour-d’Auvergne',
    "Jean-Pierre O'Neil — SCI 2B Immobilier",
    'Demande de rappel Isolation 1€',
  ])('accepte %s', (name) => {
    expect(isPlausibleName(name)).toBe(true)
  })

  it.each([
    'ujuucduu6jcruyjyduuuffuuj6cfdyûfduyjucfujjgfuugduujyfuuxduugxdduuduyyffrujxujxeu', // spam reçu
    'a',
    'x'.repeat(121),
  ])('rejette %s', (name) => {
    expect(isPlausibleName(name)).toBe(false)
  })
})
