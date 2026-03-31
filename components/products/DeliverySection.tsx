import { Truck, Wrench } from 'lucide-react'

export function DeliverySection() {
  return (
    <div className="bg-green-50/60 rounded-2xl p-6 md:p-8 border border-green-100/50">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
            <Wrench className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="font-heading text-lg font-bold text-neutral-900 mb-1">
            Livraison et installation offertes
          </h3>
          <p className="text-neutral-600 text-sm">
            Installation par nos techniciens certifiés RGE. Visite technique préalable incluse.
          </p>
        </div>
      </div>
    </div>
  )
}
