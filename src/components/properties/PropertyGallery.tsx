'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Dialog } from '../ui/dialog'

export function PropertyGallery({ images }: { images: string[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const openImage = (index: number) => {
    setSelectedImage(index)
    setIsOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {/* Image principale */}
        <div 
          className="relative h-96 w-full rounded-xl overflow-hidden cursor-zoom-in"
          onClick={() => openImage(0)}
        >
          <Image
            src={images[0]}
            alt="Property main"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Miniatures */}
        <div className="grid grid-cols-4 gap-2">
          {images.slice(1, 5).map((img, index) => (
            <div 
              key={img}
              className="relative h-24 rounded-md overflow-hidden cursor-zoom-in"
              onClick={() => openImage(index + 1)}
            >
              <Image
                src={img}
                alt={`Property thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
              {images.length > 5 && index === 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold">
                  +{images.length - 5}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal pour la galerie complète */}
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="relative h-[80vh] w-full max-w-6xl">
          <Image
            src={images[selectedImage]}
            alt={`Property image ${selectedImage + 1}`}
            fill
            className="object-contain"
          />
        </div>
        
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setSelectedImage(prev => (prev > 0 ? prev - 1 : images.length - 1))}
            className="p-2 bg-white rounded-full shadow-md"
          >
            ‹
          </button>
          <div className="flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-3 h-3 rounded-full ${index === selectedImage ? 'bg-primary' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          <button
            onClick={() => setSelectedImage(prev => (prev < images.length - 1 ? prev + 1 : 0))}
            className="p-2 bg-white rounded-full shadow-md"
          >
            ›
          </button>
        </div>
      </Dialog>
    </>
  )
}