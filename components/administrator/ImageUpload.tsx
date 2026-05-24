'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  folder?: string
}

export function ImageUpload({ value, onChange, folder = 'products' }: ImageUploadProps) {
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

      onChange(data.url)
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

  const handleRemove = () => {
    onChange('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative inline-block">
          <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50">
            <Image
              src={value}
              alt="Image produit"
              fill
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors
            ${dragOver ? 'border-green-500 bg-green-50' : 'border-neutral-300 hover:border-green-400 hover:bg-green-50'}
            ${isUploading ? 'pointer-events-none opacity-60' : ''}
          `}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
              <p className="text-sm text-neutral-600">Upload en cours...</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Upload className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm text-neutral-600">
                Glissez une image ou <span className="text-green-600 font-medium">cliquez pour choisir</span>
              </p>
              <p className="text-xs text-neutral-400">PNG, JPG, WebP • Max 5 Mo</p>
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

      {/* Fallback: champ texte pour URL manuelle */}
      <div className="flex items-center gap-2 text-xs text-neutral-500">
        <ImageIcon className="w-3 h-3" />
        <span>ou entrez une URL :</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/image.png ou https://..."
          className="flex-1 px-2 py-1 border border-neutral-200 rounded text-xs"
        />
      </div>
    </div>
  )
}
