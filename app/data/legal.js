export const legal = {
  owner: 'Alejandro Suárez Durán',
  email: 'asuadur14@gmail.com',
  taxId: '', // TODO(alex): NIF/NIE
  address: '', // TODO(alex): dirección postal
  domain: '', // TODO(alex): dominio de la web
  hosting: '', // TODO(alex): proveedor de hosting (¿Vercel?)
  lastUpdated: '2026-10-09',
}

if (import.meta.dev) {
  const pending = ['taxId', 'address', 'domain', 'hosting', 'image credits', 'analytics provider']
  console.warn(`[Legal content] TODO(alex): complete ${pending.join(', ')}`)
}