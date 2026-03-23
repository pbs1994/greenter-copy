"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import { Sun, Thermometer } from "lucide-react"

interface CompareSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  beforeIcon?: React.ReactNode
  afterIcon?: React.ReactNode
}

export function CompareSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Pompe a chaleur",
  afterLabel = "Panneaux solaires",
  beforeIcon = <Thermometer className="w-5 h-5" />,
  afterIcon = <Sun className="w-5 h-5" />,
}: CompareSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(75)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
      const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPosition(percent)
    },
    []
  )

  const handleMouseDown = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      handleMove(e.clientX)
    },
    [isDragging, handleMove]
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return
      handleMove(e.touches[0].clientX)
    },
    [isDragging, handleMove]
  )

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp, handleTouchMove])

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-neutral-900/10 ring-1 ring-neutral-200 cursor-ew-resize select-none group"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After Image (Right side - Solar panels) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          className="object-cover"
          priority
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Before Image (Left side - Heat pump) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeLabel}
          fill
          className="object-cover"
          priority
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20 transition-transform"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="absolute inset-0 bg-white blur-sm" />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 z-30 transition-transform"
        style={{ left: `calc(${sliderPosition}% - 24px)` }}
      >
        <div className={`
          w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center
          transition-all duration-200
          ${isDragging ? 'scale-110 shadow-2xl' : 'group-hover:scale-105'}
        `}>
          <div className="flex items-center gap-0.5">
            <svg className="w-3 h-3 text-neutral-400 rotate-180" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <svg className="w-3 h-3 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className={`
          flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md
          bg-gradient-to-r from-orange-500/90 to-red-500/90 text-white
          shadow-lg transition-all duration-300
          ${sliderPosition > 20 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
        `}>
          {beforeIcon}
          <span className="font-semibold text-sm">{beforeLabel}</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-10">
        <div className={`
          flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md
          bg-gradient-to-r from-yellow-500/90 to-amber-500/90 text-white
          shadow-lg transition-all duration-300
          ${sliderPosition < 80 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
        `}>
          {afterIcon}
          <span className="font-semibold text-sm">{afterLabel}</span>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/50 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/50 rounded-tr-lg" />
      <div className="absolute bottom-16 left-4 w-8 h-8 border-l-2 border-b-2 border-white/50 rounded-bl-lg" />
      <div className="absolute bottom-16 right-4 w-8 h-8 border-r-2 border-b-2 border-white/50 rounded-br-lg" />
    </div>
  )
}
