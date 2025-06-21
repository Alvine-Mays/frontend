// src/components/properties/PropertyGallery.jsx
'use client'

import { useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa'
import Image from 'next/image'
import Modal from '@/components/ui/Modal'

export default function PropertyGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Aucune image disponible</span>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {/* Image principale */}
        <Image
          src={images[currentIndex].url}
          alt={`Vue du bien ${currentIndex + 1}`}
          fill
          className="object-cover"
          priority
        />

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
              aria-label="Image précédente"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
              aria-label="Image suivante"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        {/* Bouton plein écran */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-4 right-4 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
          aria-label="Voir en plein écran"
        >
          <FaExpand />
        </button>

        {/* Indicateur de position */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Miniatures */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2 mt-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`aspect-square rounded overflow-hidden border-2 ${index === currentIndex ? 'border-primary-600' : 'border-transparent'}`}
            >
              <Image
                src={image.url}
                alt={`Miniature ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Modal plein écran */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="relative w-full h-full">
          <Image
            src={images[currentIndex].url}
            alt={`Vue du bien en plein écran`}
            fill
            className="object-contain"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition"
              >
                <FaChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition"
              >
                <FaChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  )
}