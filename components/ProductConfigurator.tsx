'use client'

import { useState, useEffect } from 'react'
import { Check, Battery, Zap, Plus, Minus, Info } from 'lucide-react'

type ConfigType = 'bundle' | 'inverter' | 'battery'

interface CartItem {
  productId: string
  quantity: number
}

interface ProductConfiguratorProps {
  onConfigChange?: (config: {
    type: ConfigType
    batteryCount: number
    totalPrice: number
    priceInEuros: number
    productId: string
    items: CartItem[]
  }) => void
  defaultConfig?: ConfigType
  prices?: { inverter: number; battery: number }
  productIds?: { inverter: string; battery: string; bundle: string }
}

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString('fr-FR')
}

// Prix par défaut si non fournis
const DEFAULT_PRICES = {
  inverter: 249900,
  battery: 349900,
}

export function ProductConfigurator({ onConfigChange, defaultConfig = 'bundle', prices, productIds }: ProductConfiguratorProps) {
  const [selectedConfig, setSelectedConfig] = useState<ConfigType>(defaultConfig)
  const [batteryCount, setBatteryCount] = useState(1)

  // Prix depuis props ou défaut
  const PRICES = {
    inverter: prices?.inverter || DEFAULT_PRICES.inverter,
    battery: prices?.battery || DEFAULT_PRICES.battery,
    bundle: (prices?.inverter || DEFAULT_PRICES.inverter) + (prices?.battery || DEFAULT_PRICES.battery),
    extraBattery: Math.round((prices?.battery || DEFAULT_PRICES.battery) * 0.857), // ~15% réduction
  }

  // Calcul du prix
  const calculatePrice = (config: ConfigType = selectedConfig, batteries: number = batteryCount) => {
    if (config === 'inverter') {
      return PRICES.inverter
    }
    if (config === 'battery') {
      const firstBattery = PRICES.battery
      const extraBatteries = Math.max(0, batteries - 1) * PRICES.extraBattery
      return firstBattery + extraBatteries
    }
    // Bundle
    const bundlePrice = PRICES.bundle
    const extraBatteries = Math.max(0, batteries - 1) * PRICES.extraBattery
    return bundlePrice + extraBatteries
  }

  // Get product ID based on config
  const getProductId = (config: ConfigType) => {
    if (!productIds) return ''
    switch (config) {
      case 'inverter': return productIds.inverter
      case 'battery': return productIds.battery
      case 'bundle': return productIds.bundle
    }
  }

  // Build cart items based on config
  const getCartItems = (config: ConfigType, batteries: number): CartItem[] => {
    if (!productIds) return []
    
    switch (config) {
      case 'inverter':
        return [{ productId: productIds.inverter, quantity: 1 }]
      case 'battery':
        return [{ productId: productIds.battery, quantity: batteries }]
      case 'bundle':
        return [
          { productId: productIds.inverter, quantity: 1 },
          { productId: productIds.battery, quantity: batteries }
        ]
    }
  }

  const totalPrice = calculatePrice()
  const priceInEuros = totalPrice / 100
  const currentProductId = getProductId(selectedConfig)

  // Notify parent on mount with default config
  useEffect(() => {
    if (productIds) {
      const defaultBatteries = defaultConfig === 'inverter' ? 0 : 1
      onConfigChange?.({
        type: defaultConfig,
        batteryCount: defaultBatteries,
        totalPrice: calculatePrice(defaultConfig, defaultBatteries),
        priceInEuros: calculatePrice(defaultConfig, defaultBatteries) / 100,
        productId: getProductId(defaultConfig),
        items: getCartItems(defaultConfig, defaultBatteries),
      })
    }
  }, [productIds])

  const handleConfigChange = (type: ConfigType) => {
    setSelectedConfig(type)
    const newBatteryCount = type === 'inverter' ? 0 : (batteryCount === 0 ? 1 : batteryCount)
    if (type === 'inverter') {
      setBatteryCount(0)
    } else if (batteryCount === 0) {
      setBatteryCount(1)
    }
    onConfigChange?.({
      type,
      batteryCount: newBatteryCount,
      totalPrice: calculatePrice(type, newBatteryCount),
      priceInEuros: calculatePrice(type, newBatteryCount) / 100,
      productId: getProductId(type),
      items: getCartItems(type, newBatteryCount),
    })
  }

  const handleBatteryChange = (count: number) => {
    setBatteryCount(count)
    onConfigChange?.({
      type: selectedConfig,
      batteryCount: count,
      totalPrice: calculatePrice(selectedConfig, count),
      priceInEuros: calculatePrice(selectedConfig, count) / 100,
      productId: getProductId(selectedConfig),
      items: getCartItems(selectedConfig, count),
    })
  }

  const showBatterySelector = selectedConfig === 'bundle' || selectedConfig === 'battery'

  return (
    <div className="space-y-4">
      {/* Titre section */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-700">Choisissez votre configuration</p>
        {selectedConfig === 'battery' && (
          <span className="text-xs text-amber-600 flex items-center gap-1">
            <Info className="w-3 h-3" />
            Nécessite un onduleur compatible
          </span>
        )}
      </div>

      {/* Sélecteur de configuration */}
      <div className="grid grid-cols-3 gap-2">
        {/* Onduleur seul */}
        <button
          onClick={() => handleConfigChange('inverter')}
          className={`relative p-3 rounded-xl border-2 text-left transition-all ${
            selectedConfig === 'inverter'
              ? 'border-blue-500 bg-blue-50'
              : 'border-neutral-200 hover:border-blue-200 bg-white'
          }`}
        >
          <div className={`absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center ${
            selectedConfig === 'inverter' ? 'bg-blue-500' : 'border border-neutral-300'
          }`}>
            {selectedConfig === 'inverter' && <Check className="w-2.5 h-2.5 text-white" />}
          </div>
          <Zap className={`w-5 h-5 mb-1.5 ${selectedConfig === 'inverter' ? 'text-blue-600' : 'text-neutral-400'}`} />
          <p className="text-xs font-semibold text-neutral-900">Onduleur seul</p>
          <p className="text-[10px] text-neutral-500">Sans batterie</p>
          <p className="text-sm font-bold text-blue-600 mt-1">{formatPrice(PRICES.inverter)} €</p>
        </button>

        {/* Batterie seule */}
        <button
          onClick={() => handleConfigChange('battery')}
          className={`relative p-3 rounded-xl border-2 text-left transition-all ${
            selectedConfig === 'battery'
              ? 'border-green-500 bg-green-50'
              : 'border-neutral-200 hover:border-green-200 bg-white'
          }`}
        >
          <div className={`absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center ${
            selectedConfig === 'battery' ? 'bg-green-500' : 'border border-neutral-300'
          }`}>
            {selectedConfig === 'battery' && <Check className="w-2.5 h-2.5 text-white" />}
          </div>
          <Battery className={`w-5 h-5 mb-1.5 ${selectedConfig === 'battery' ? 'text-green-600' : 'text-neutral-400'}`} />
          <p className="text-xs font-semibold text-neutral-900">Batterie seule</p>
          <p className="text-[10px] text-neutral-500">Extension</p>
          <p className="text-sm font-bold text-green-600 mt-1">{formatPrice(PRICES.battery)} €</p>
        </button>

        {/* Pack complet */}
        <button
          onClick={() => handleConfigChange('bundle')}
          className={`relative p-3 rounded-xl border-2 text-left transition-all ${
            selectedConfig === 'bundle'
              ? 'border-teal-500 bg-teal-50'
              : 'border-neutral-200 hover:border-teal-200 bg-white'
          }`}
        >
          <div className="absolute -top-2 left-2 px-1.5 py-0.5 bg-teal-600 text-white text-[8px] font-bold rounded">
            RECOMMANDÉ
          </div>
          <div className={`absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center ${
            selectedConfig === 'bundle' ? 'bg-teal-500' : 'border border-neutral-300'
          }`}>
            {selectedConfig === 'bundle' && <Check className="w-2.5 h-2.5 text-white" />}
          </div>
          <div className="flex gap-0.5 mb-1.5">
            <Zap className={`w-4 h-4 ${selectedConfig === 'bundle' ? 'text-teal-600' : 'text-neutral-400'}`} />
            <Battery className={`w-4 h-4 ${selectedConfig === 'bundle' ? 'text-teal-600' : 'text-neutral-400'}`} />
          </div>
          <p className="text-xs font-semibold text-neutral-900">Pack complet</p>
          <p className="text-[10px] text-neutral-500">Onduleur + batterie</p>
          <p className="text-sm font-bold text-teal-600 mt-1">{formatPrice(PRICES.bundle)} €</p>
        </button>
      </div>

      {/* Sélecteur de batteries */}
      {showBatterySelector && (
        <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-neutral-700">Nombre de batteries</p>
            <p className="text-xs text-neutral-500">{(batteryCount * 5.12).toFixed(1)} kWh</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBatteryChange(Math.max(1, batteryCount - 1))}
              disabled={batteryCount <= 1}
              className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4 text-neutral-600" />
            </button>
            <div className="flex-1 flex gap-1">
              {[1, 2, 3, 4].map((count) => (
                <button
                  key={count}
                  onClick={() => handleBatteryChange(count)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                    batteryCount >= count
                      ? 'bg-green-600 text-white'
                      : 'bg-white border border-neutral-200 text-neutral-400'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
            <button
              onClick={() => handleBatteryChange(Math.min(4, batteryCount + 1))}
              disabled={batteryCount >= 4}
              className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 text-neutral-600" />
            </button>
          </div>
          {batteryCount > 1 && (
            <p className="text-[10px] text-green-600 mt-2">
              ✓ Batteries supplémentaires à prix réduit ({formatPrice(PRICES.extraBattery)} € au lieu de {formatPrice(PRICES.battery)} €)
            </p>
          )}
        </div>
      )}

      {/* Prix total */}
      <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
        <div>
          <p className="text-xs text-neutral-500">Prix total TTC</p>
          <p className="text-2xl font-bold text-neutral-900">{formatPrice(totalPrice)} €</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-green-600 font-medium">Livraison + Installation</p>
          <p className="text-xs text-green-600">OFFERTES</p>
        </div>
      </div>
    </div>
  )
}
