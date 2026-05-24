import Image from 'next/image'

interface ArticleImageSectionProps {
  image: string
  alt: string
  imagePosition?: 'left' | 'right'
  children: React.ReactNode
}

export function ArticleImageSection({
  image,
  alt,
  imagePosition = 'left',
  children,
}: ArticleImageSectionProps) {
  return (
    <div className="my-10 grid md:grid-cols-2 gap-8 items-center">
      <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ${imagePosition === 'right' ? 'md:order-2' : ''}`}>
        <Image src={image} alt={alt} fill className="object-cover" />
      </div>
      <div className="text-slate-700 text-lg leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  )
}

interface ArticleFullImageProps {
  image: string
  alt: string
  caption?: string
}

export function ArticleFullImage({ image, alt, caption }: ArticleFullImageProps) {
  return (
    <figure className="my-10 -mx-4 sm:mx-0">
      <div className="relative aspect-[21/9] sm:rounded-2xl overflow-hidden shadow-lg">
        <Image src={image} alt={alt} fill className="object-cover" />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-slate-400 mt-3 italic px-4">{caption}</figcaption>
      )}
    </figure>
  )
}
