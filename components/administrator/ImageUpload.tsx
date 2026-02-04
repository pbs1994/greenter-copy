'use client';

import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
}


export function ImageUpload({ 
  value, 
  onChange, 
  bucket = 'product-images',
  folder = 'products'
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Le fichier doit être une image');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image ne doit pas dépasser 5 Mo');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Generate unique filename
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const filename = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filename, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filename);

      onChange(publicUrl);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Erreur lors de l\'upload. Vérifiez que le bucket existe.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleRemove = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      {/* Current image preview */}
      {value && (
        <div className="relative inline-block">
          <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50">
            <Image
              src={value}
              alt="Image produit"
              fill
              className="object-contain"
              unoptimized={value.includes('supabase')}
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            title="Supprimer l'image"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
          ${dragOver 
            ? 'border-green-500 bg-green-50' 
            : 'border-neutral-300 hover:border-green-400 hover:bg-neutral-50'
          }
          ${isUploading ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <LoadingIcon className="w-8 h-8 text-green-600 animate-spin" />
            <span className="text-sm text-neutral-600">Upload en cours...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <UploadIcon className="w-8 h-8 text-neutral-400" />
            <div>
              <span className="text-sm font-medium text-green-600">Cliquez pour uploader</span>
              <span className="text-sm text-neutral-500"> ou glissez-déposez</span>
            </div>
            <span className="text-xs text-neutral-400">PNG, JPG, WebP jusqu'à 5 Mo</span>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function LoadingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}
