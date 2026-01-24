"use client"

import { useEffect } from "react"

// Cache the signed URL globally
let cachedUrl: string | null = null
let fetchPromise: Promise<string | null> | null = null

export function getVideoUrl() {
  return cachedUrl
}

export function prefetchVideo(): Promise<string | null> {
  if (cachedUrl) return Promise.resolve(cachedUrl)
  if (fetchPromise) return fetchPromise
  
  fetchPromise = fetch('/api/video-url')
    .then(res => res.json())
    .then(data => {
      if (data.url) {
        cachedUrl = data.url
        return data.url
      }
      return null
    })
    .catch(() => null)
  
  return fetchPromise
}

export function VideoPreloader() {
  useEffect(() => {
    // Start fetching URL immediately
    prefetchVideo().then(url => {
      if (url) {
        // Preload video with high priority
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'video'
        link.href = url
        link.type = 'video/mp4'
        // @ts-expect-error fetchpriority is valid but not in types
        link.fetchpriority = 'high'
        document.head.appendChild(link)
      }
    })
  }, [])
  
  return null
}
