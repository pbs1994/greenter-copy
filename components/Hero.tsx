"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowRight, Play, Pause, Shield, Award, Clock } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    async function fetchVideoUrl() {
      try {
        const res = await fetch('/api/video-url')
        const data = await res.json()
        if (data.url) {
          setVideoUrl(data.url)
        }
      } catch {
        // Video fetch failed silently
      } finally {
        setIsLoading(false)
      }
    }
    fetchVideoUrl()
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
  }

  const handleVideoLoaded = () => {
    setVideoLoaded(true)
  }

  return (
    <section className="bg-gradient-to-b from-green-50 via-white to-white">
      {/* Trust Bar */}
      <div className="bg-green-900 text-white py-2.5 px-4">
        <div className="container mx-auto max-w-6xl flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span>Certifié RGE</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-green-700" />
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-green-400" />
            <span>Garantie décennale</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-green-700" />
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-400" />
            <span>Devis gratuit sous 48h</span>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="px-4 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Accompagnement MaPrimeRénov&apos; inclus
            </div>

            {/* Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-5">
              Solutions d&apos;efficacité énergétique pour{" "}
              <span className="text-green-700">réduire durablement vos factures</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-neutral-600 text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
              Audit énergétique, panneaux solaires, pompes à chaleur, isolation et maintenance 
              pour améliorer durablement la performance énergétique de votre logement ou bâtiment.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-base px-8 py-4">
                Demander un audit énergétique
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link href="/services" className="btn-secondary text-base px-8 py-4">
                Découvrir nos solutions
              </Link>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative w-full max-w-5xl mx-auto">
            <div 
              className={`
                relative w-full aspect-video rounded-2xl overflow-hidden
                shadow-2xl shadow-neutral-900/10
                ring-1 ring-neutral-200
                transition-all duration-700
                ${videoLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
                  <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : videoUrl ? (
                <>
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    autoPlay
                    preload="metadata"
                    onLoadedData={handleVideoLoaded}
                    onEnded={handleVideoEnded}
                  >
                    <source src={videoUrl} type="video/mp4" />
                  </video>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                  {/* Play button when paused */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <button
                        onClick={togglePlay}
                        className="
                          group w-20 h-20 md:w-24 md:h-24 
                          rounded-full bg-white/95 backdrop-blur-sm
                          flex items-center justify-center 
                          transition-all duration-300 hover:scale-105
                          shadow-xl
                        "
                        aria-label="Lire la vidéo"
                      >
                        <Play 
                          className="w-8 h-8 md:w-10 md:h-10 text-green-700 ml-1 group-hover:scale-110 transition-transform" 
                          fill="currentColor" 
                        />
                      </button>
                    </div>
                  )}

                  {/* Pause button when playing */}
                  {isPlaying && (
                    <button
                      onClick={togglePlay}
                      className="
                        absolute bottom-4 right-4 md:bottom-6 md:right-6
                        w-10 h-10 md:w-12 md:h-12 
                        rounded-full bg-white/90 backdrop-blur-sm
                        flex items-center justify-center 
                        transition-all duration-300 hover:scale-105 hover:bg-white
                        shadow-lg
                      "
                      aria-label="Mettre en pause"
                    >
                      <Pause className="w-4 h-4 md:w-5 md:h-5 text-green-700" />
                    </button>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-neutral-500">
                  Vidéo non disponible
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
