'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, GripVertical } from 'lucide-react'

interface MultiImageUploadProps {
  value: string[]
  onChange: (urls: string[]) => void
  folder?: string
  max?: number
}

export function MultiImageUpload({ value = [], onChange, folder = 'products', max = 5 }: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Le fichier doit être une image')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image ne doit pas dépasser 5 Mo')
      return
    }

    if (value.length >= max) {
      setError(`Maximum ${max} images`)
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'upload')
      }

      onChange([...value, data.url])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'upload')
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleUpload(file)
  }

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const newValue = [...value]
    ;[newValue[index - 1], newValue[index]] = [newValue[index], newValue[index - 1]]
    onChange(newValue)
  }

  return (
    <div className="space-y-3">
      {/* Images existantes */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {value.map((url, index) => (
            <div key={url} className="relative group">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50">
                <Image
                  src={url}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="w-3 h-3" />
              </button>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  className="absolute -top-2 -left-2 w-5 h-5 bg-neutral-600 text-white rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors opacity-0 group-hover:opacity-100"
                  title="Déplacer vers le haut"
                >
                  <GripVertical className="w-3 h-3" />
                </button>
              )}
              <span className="absolute bottom-1 left-1 text-[10px] bg-black/50 text-white px-1 rounded">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Zone d'upload */}
      {value.length < max && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            w-full h-24 border-2 border-dashed rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors
            ${dragOver ? 'border-green-500 bg-green-50' : 'border-neutral-300 hover:border-green-400 hover:bg-green-50'}
            ${isUploading ? 'pointer-events-none opacity-60' : ''}
          `}
        >
          {isUploading ? (
            <Loader2 className="w-5 h-5 text-green-600 animate-spin" />
          ) : (
            <>
              <Upload className="w-5 h-5 text-neutral-400" />
              <span className="text-sm text-neutral-500">
                Ajouter une image ({value.length}/{max})
              </span>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
