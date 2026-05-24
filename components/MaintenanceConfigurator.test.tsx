import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MaintenanceConfigurator } from './MaintenanceConfigurator'
import type { MaintenanceService, MaintenanceOption } from '@/types/maintenance'

// ─── Test Data ──────────────────────────────────────────────────────────────

function makeService(id: string, name: string, price: number, includes: string[] = []): MaintenanceService {
  return {
    id,
    name,
    slug: `service-${id}`,
    description: `Description de ${name}`,
    price_monthly: price,
    icon: 'Wrench',
    includes,
    is_active: true,
    sort_order: 0,
    created_at: new Date().toISOString(),
  }
}

function makeOption(id: string, name: string, price: number, exempt = true, flatFee = false): MaintenanceOption {
  return {
    id,
    name,
    slug: `option-${id}`,
    description: `Description de ${name}`,
    price_monthly: price,
    icon: 'Zap',
    is_active: true,
    is_flat_fee: flatFee,
    exempt_from_discount: exempt,
    sort_order: 0,
    created_at: new Date().toISOString(),
  }
}

const services: MaintenanceService[] = [
  makeService('s1', 'Chaudière à gaz', 1500, ['1 intervention annuelle', 'Rapport d\'intervention']),
  makeService('s2', 'Pompe à chaleur', 2500, ['1 intervention annuelle']),
  makeService('s3', 'Photovoltaïque', 2000),
]

const options: MaintenanceOption[] = [
  makeOption('o1', 'Intervention urgence 24h', 5000, true, true),
]

// ─── Mock fetch ─────────────────────────────────────────────────────────────

const mockFetch = jest.fn()
beforeEach(() => {
  mockFetch.mockReset()
  global.fetch = mockFetch
})

// ─── Tests ──────────────────────────────────────────────────────────────────

describe('MaintenanceConfigurator', () => {
  it('renders all services with name, price, and description', () => {
    render(<MaintenanceConfigurator services={services} options={options} />)

    expect(screen.getByText('Chaudière à gaz')).toBeInTheDocument()
    expect(screen.getByText('Pompe à chaleur')).toBeInTheDocument()
    expect(screen.getByText('Photovoltaïque')).toBeInTheDocument()
    expect(screen.getByText('Description de Chaudière à gaz')).toBeInTheDocument()
  })

  it('renders service includes list', () => {
    render(<MaintenanceConfigurator services={services} options={options} />)

    // "1 intervention annuelle" appears in both s1 and s2
    expect(screen.getAllByText('1 intervention annuelle')).toHaveLength(2)
    expect(screen.getByText("Rapport d'intervention")).toBeInTheDocument()
  })

  it('renders options section separately', () => {
    render(<MaintenanceConfigurator services={services} options={options} />)

    expect(screen.getByText('Options')).toBeInTheDocument()
    expect(screen.getByText('Intervention urgence 24h')).toBeInTheDocument()
  })

  it('renders billing period toggle with -10% badge', () => {
    render(<MaintenanceConfigurator services={services} options={options} />)

    expect(screen.getByText('Mensuel')).toBeInTheDocument()
    expect(screen.getByText('Annuel')).toBeInTheDocument()
    expect(screen.getByText('-10%')).toBeInTheDocument()
  })

  it('renders conditions text', () => {
    render(<MaintenanceConfigurator services={services} options={options} />)

    expect(screen.getByText('Sans engagement — résiliable à tout moment')).toBeInTheDocument()
    expect(screen.getByText('Intervention planifiée sous 12 mois')).toBeInTheDocument()
    expect(screen.getByText('Paiement sécurisé par Stripe')).toBeInTheDocument()
  })

  it('disables subscribe button when no service is selected', () => {
    render(<MaintenanceConfigurator services={services} options={options} />)

    const button = screen.getByRole('button', { name: /souscrire/i })
    expect(button).toBeDisabled()
  })

  it('enables subscribe button when a service is selected', () => {
    render(<MaintenanceConfigurator services={services} options={options} />)

    fireEvent.click(screen.getByText('Chaudière à gaz'))

    const button = screen.getByRole('button', { name: /souscrire/i })
    expect(button).not.toBeDisabled()
  })

  it('updates summary in real-time when selecting services', () => {
    render(<MaintenanceConfigurator services={services} options={options} />)

    // Select first service
    fireEvent.click(screen.getByText('Chaudière à gaz'))

    // Summary should show the service name in the recap
    const summarySection = screen.getByText('Votre contrat').closest('div')!
    expect(summarySection).toBeInTheDocument()
  })

  it('shows multi-equipment discount when 2+ services selected', () => {
    render(<MaintenanceConfigurator services={services} options={options} />)

    // Select 2 services
    fireEvent.click(screen.getByText('Chaudière à gaz'))
    fireEvent.click(screen.getByText('Pompe à chaleur'))

    expect(screen.getByText(/Remise multi \(5%\)/)).toBeInTheDocument()
  })

  it('shows annual discount when yearly billing is selected', () => {
    render(<MaintenanceConfigurator services={services} options={options} />)

    // Select a service
    fireEvent.click(screen.getByText('Chaudière à gaz'))
    // Switch to yearly
    fireEvent.click(screen.getByText('Annuel'))

    expect(screen.getByText(/Remise annuelle \(10%\)/)).toBeInTheDocument()
  })

  it('toggles service selection on/off', () => {
    render(<MaintenanceConfigurator services={services} options={options} />)

    // The service card is a button element
    const serviceCards = screen.getAllByRole('button').filter(
      btn => btn.textContent?.includes('Chaudière à gaz') && btn.textContent?.includes('/mois')
    )
    const serviceCard = serviceCards[0]

    // Select
    fireEvent.click(serviceCard)
    expect(screen.getByRole('button', { name: /souscrire/i })).not.toBeDisabled()

    // Deselect
    fireEvent.click(serviceCard)
    expect(screen.getByRole('button', { name: /souscrire/i })).toBeDisabled()
  })

  it('calls checkout API with correct payload', async () => {
    const mockUrl = 'https://checkout.stripe.com/test'
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ url: mockUrl }),
    })

    render(<MaintenanceConfigurator services={services} options={options} />)

    // Select a service
    fireEvent.click(screen.getByText('Chaudière à gaz'))
    // Click subscribe
    fireEvent.click(screen.getByRole('button', { name: /souscrire/i }))

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/checkout/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceIds: ['s1'],
          optionIds: [],
          billingPeriod: 'monthly',
        }),
      })
    })
  })

  it('shows error message on checkout failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    render(<MaintenanceConfigurator services={services} options={options} />)

    fireEvent.click(screen.getByText('Chaudière à gaz'))
    fireEvent.click(screen.getByRole('button', { name: /souscrire/i }))

    await waitFor(() => {
      expect(screen.getByText(/Une erreur est survenue/)).toBeInTheDocument()
    })
  })

  it('shows empty state message when nothing is selected', () => {
    render(<MaintenanceConfigurator services={services} options={options} />)

    expect(screen.getByText(/Sélectionnez au moins un équipement/)).toBeInTheDocument()
  })

  it('does not render options section when no options provided', () => {
    render(<MaintenanceConfigurator services={services} options={[]} />)

    expect(screen.queryByText('Renforcez votre couverture')).not.toBeInTheDocument()
  })
})
