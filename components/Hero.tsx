"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowRight, Play, Pause, CheckCircle, Star } from "lucide-react"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"

const benefits = [
  "Jusqu'à 70% d'économies",
  "Certifié RGE",
  "Garantie décennale",
  "+200 installations",
  "Éligible MaPrimeRénov'",
  "Devis gratuit sous 48h",
  "Accompagnement complet",
]

export function Hero() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start" },
    [AutoScroll({ speed: 0.5, stopOnInteraction: false, stopOnMouseEnter: true })]
  )

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
      {/* Hero Content */}
      <div className="px-4 py-4 md:py-6 lg:py-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-4xl mx-auto mb-8 md:mb-10">
            {/* Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-5">
              Baissez vos factures,
              <br />
              <span className="text-green-700">pas votre confort.</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-neutral-600 text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
              Installation de pompes à chaleur, panneaux solaires et isolation thermique 
              partout en France. Certifié RGE, éligible aux aides.
            </p>

            {/* Benefits - Desktop: 2 rows, Mobile/Tablet: infinite carousel */}
            <div className="mb-8">
              {/* Desktop (lg+) */}
              <div className="hidden lg:block">
                <div className="flex items-center justify-center gap-6 text-sm mb-3">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Jusqu&apos;à 70% d&apos;économies</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Installateur certifié RGE</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Garantie décennale</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>+200 installations</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Éligible MaPrimeRénov&apos;</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Devis gratuit sous 48h</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Accompagnement complet</span>
                  </div>
                </div>
              </div>

              {/* Mobile/Tablet Carousel */}
              <div className="lg:hidden overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {[...benefits, ...benefits].map((benefit, index) => (
                    <div key={index} className="flex-none px-3">
                      <span className="flex items-center gap-2 text-neutral-700 whitespace-nowrap">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{benefit}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-base px-8 py-4">
                Demander mon étude gratuite
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link href="/produits" className="btn-secondary text-base px-8 py-4">
                Voir les produits
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

          {/* Social Proof - Under video */}
          <div className="mt-8 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-neutral-600">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              </div>
              <span className="font-medium text-neutral-800">4.9/5 sur Google</span>
              <span className="hidden sm:inline text-neutral-400">•</span>
              <span>+200 installations réalisées</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
