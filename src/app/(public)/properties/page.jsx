// src/app/(public)/properties/page.jsx
import PropertyCard from '@/components/properties/PropertyCard'
import SearchFilters from '@/components/properties/SearchFilters'
import { fetchProperties } from '@/lib/api/properties'

export default async function PropertiesPage({ searchParams }) {
  const properties = await fetchProperties(searchParams)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nos biens immobiliers</h1>
      
      <SearchFilters />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {properties.map(property => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
      
      {properties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun bien ne correspond à vos critères</p>
        </div>
      )}
    </div>
  )
}