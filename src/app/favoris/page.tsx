'use client'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { useAuth } from '@/context/AuthContext'
import { apiService } from '@/lib/services/api'
import { useEffect, useState } from 'react'

export default function FavoritesPage() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      apiService.getFavorites()
        .then(data => setFavorites(data))
        .finally(() => setLoading(false))
    }
  }, [user])

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Veuillez vous connecter pour voir vos favoris</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">Vos favoris</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Vous n'avez aucun favoris pour le moment</p>
          <a 
            href="/biens" 
            className="btn-primary inline-block px-6 py-3 rounded-lg"
          >
            Explorer les biens
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              showFavoriteButton={false}
            />
          ))}
        </div>
      )}
    </div>
  )
}