import { Shield, Truck, Award, Phone } from 'lucide-react'

const trustItems = [
  {
    icon: Shield,
    title: 'Paiement sécurisé',
    description: 'Stripe 3D Secure',
  },
  {
    icon: Truck,
    title: 'Livraison gratuite',
    description: 'France métropolitaine',
  },
  {
    icon: Award,
    title: 'Garantie incluse',
    description: 'Garantie constructeur',
  },
  {
    icon: Phone,
    title: 'SAV France',
    description: 'Support réactif',
  },
]

export function TrustGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {trustItems.map((item) => (
        <div
          key={item.title}
          className="flex flex-col items-center text-center p-4 bg-green-50/60 rounded-xl border border-green-100/50"
        >
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
            <item.icon className="w-5 h-5 text-green-700" />
          </div>
          <p className="text-sm font-semibold text-neutral-900">{item.title}</p>
          <p className="text-xs text-neutral-500">{item.description}</p>
        </div>
      ))}
    </div>
  )
}
