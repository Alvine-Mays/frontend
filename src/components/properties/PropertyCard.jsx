// src/components/properties/PropertyCard.jsx
'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { FaHeart, FaRegHeart, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa'

export default function PropertyCard({ property }) {
  const { user, isLoading: authLoading } = useAuth()
  const isFavorite = user?.favorites?.includes(property._id)

  const handleFavorite = async (e) => {
    e.preventDefault()
    if (!user) {
      // Redirige vers login avec retour prévu
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`
      return
    }
    
    try {
      if (isFavorite) {
        await api.delete(`/favoris/${property._id}`)
      } else {
        await api.post(`/favoris/${property._id}`)
      }
      // Optimistic UI update
      setUser(prev => ({
        ...prev,
        favorites: isFavorite 
          ? prev.favorites.filter(id => id !== property._id)
          : [...prev.favorites, property._id]
      }))
    } catch (error) {
      console.error('Error updating favorites', error)
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <Link href={`/properties/${property._id}`}>
        <div className="relative h-48 w-full">
          <img
            src={property.images?.[0]?.url || '/placeholder-property.jpg'}
            alt={property.titre}
            className="w-full h-full object-cover"
          />
          <button 
            onClick={handleFavorite}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow"
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            {isFavorite ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-400" />
            )}
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{property.titre}</h3>
            <span className="text-primary-600 font-bold">{property.prix.toLocaleString()} €</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-3">
            {property.ville} {property.adresse && `- ${property.adresse}`}
          </p>
          
          <div className="flex gap-4 text-sm text-gray-500">
            {property.nombre_chambres > 0 && (
              <span className="flex items-center">
                <FaBed className="mr-1" /> {property.nombre_chambres}
              </span>
            )}
            {property.nombre_salles_bain > 0 && (
              <span className="flex items-center">
                <FaBath className="mr-1" /> {property.nombre_salles_bain}
              </span>
            )}
            {property.superficie && (
              <span className="flex items-center">
                <FaRulerCombined className="mr-1" /> {property.superficie}m²
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}