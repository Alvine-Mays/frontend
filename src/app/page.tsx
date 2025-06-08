import PropertyCard from '@/components/PropertyCard'
import HeroSection from '@/components/HeroSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Nos dernières <span className="text-primary">offres</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Découvrez une sélection exclusive de biens immobiliers soigneusement choisis
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}