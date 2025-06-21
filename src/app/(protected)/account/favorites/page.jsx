// src/app/(protected)/account/favorites/page.jsx
'use client'

import { useAuth } from '@/contexts/AuthContext'
import PropertyCard from '@/components/properties/PropertyCard'
import EmptyState from '@/components/ui/EmptyState'
import { FaHeartBroken } from 'react-icons/fa'

export default function FavoritesPage() {
  const { user } = useAuth()

  if (!user?.favorites?.length) {
    return (
      <EmptyState 
        icon={<FaHeartBroken className="text-primary-600 text-4xl" />}
        title="Aucun favoris"
        description="Ajoutez des biens à vos favoris pour les retrouver ici"
        action={
          <a 
            href="/properties" 
            className="mt-6 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Explorer les biens
          </a>
        }
      />
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Vos biens favoris</h1>
        <span className="text-gray-600">{user.favorites.length} {user.favorites.length > 1 ? 'biens' : 'bien'}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.favorites.map(property => (
          <PropertyCard 
            key={property._id} 
            property={property} 
            showRemoveButton 
          />
        ))}
      </div>
    </div>
  )
}