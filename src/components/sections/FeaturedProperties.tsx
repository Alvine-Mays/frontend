import { PropertyCard } from '../properties/PropertyCard'
import { apiService } from '@/lib/services/api'

export async function FeaturedProperties() {
  const properties = await apiService.getFeaturedProperties()

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-4">
            Nos <span className="text-primary">coups de coeur</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Une sélection exclusive de biens exceptionnels choisis par nos experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              className="card-hover"
            />
          ))}
        </div>
      </div>
    </section>
  )
}