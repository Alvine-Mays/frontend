// src/app/(public)/properties/[id]/page.jsx
import PropertyGallery from '@/components/properties/PropertyGallery'
import ContactForm from '@/components/properties/ContactForm'
import RatingStars from '@/components/ui/RatingStars'
import { fetchProperty } from '@/lib/api/properties'

export default async function PropertyDetail({ params }) {
  const property = await fetchProperty(params.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a href="/" className="text-sm text-gray-700 hover:text-primary-600">
              Accueil
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <a href="/properties" className="text-sm text-gray-700 hover:text-primary-600 ms-1 md:ms-2">
                Biens immobiliers
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <span className="text-sm font-medium text-gray-500 ms-1 md:ms-2">
                {property.titre}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-8">
          {/* Titre et prix */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{property.titre}</h1>
              <p className="text-lg text-gray-600 mt-2">
                {property.ville} {property.adresse && `- ${property.adresse}`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary-600">{property.prix.toLocaleString()} €</p>
              {property.prixM2 && (
                <p className="text-sm text-gray-500">{property.prixM2.toLocaleString()} €/m²</p>
              )}
            </div>
          </div>

          {/* Gallery */}
          <PropertyGallery images={property.images} />

          {/* Caractéristiques */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Caractéristiques</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <FaBed className="text-gray-400" />
                <span>{property.nombre_chambres} chambre{property.nombre_chambres > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaBath className="text-gray-400" />
                <span>{property.nombre_salles_bain} salle{property.nombre_salles_bain > 1 ? 's' : ''} de bain</span>
              </div>
              {property.superficie && (
                <div className="flex items-center space-x-2">
                  <FaRulerCombined className="text-gray-400" />
                  <span>{property.superficie} m²</span>
                </div>
              )}
              {property.garage && (
                <div className="flex items-center space-x-2">
                  <FaCar className="text-gray-400" />
                  <span>Garage</span>
                </div>
              )}
              {property.jardin && (
                <div className="flex items-center space-x-2">
                  <FaTree className="text-gray-400" />
                  <span>Jardin</span>
                </div>
              )}
              {property.piscine && (
                <div className="flex items-center space-x-2">
                  <FaSwimmingPool className="text-gray-400" />
                  <span>Piscine</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <div className="prose max-w-none text-gray-600">
              {property.description || "Aucune description disponible pour ce bien."}
            </div>
          </div>

          {/* Évaluations */}
          {property.evaluations?.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Avis des visiteurs</h2>
              <div className="flex items-center mb-4">
                <RatingStars rating={property.noteMoyenne} />
                <span className="ml-2 text-gray-600">
                  {property.noteMoyenne.toFixed(1)} ({property.evaluations.length} avis)
                </span>
              </div>
              <div className="space-y-4">
                {property.evaluations.map((evaluation) => (
                  <div key={evaluation._id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between">
                      <p className="font-medium">{evaluation.utilisateur.nom || 'Anonyme'}</p>
                      <RatingStars rating={evaluation.note} size="sm" />
                    </div>
                    <p className="text-gray-600 mt-1">{evaluation.commentaire}</p>
                    <p className="text-gray-400 text-sm mt-2">
                      {new Date(evaluation.creeLe).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Formulaire de contact */}
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Contacter l'agence</h2>
            <ContactForm propertyId={property._id} />
          </div>

          {/* Agent immobilier */}
          {property.utilisateur && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Agent responsable</h2>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {property.utilisateur.avatar ? (
                    <img 
                      src={property.utilisateur.avatar} 
                      alt={property.utilisateur.nom}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-gray-400 text-2xl" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{property.utilisateur.nom}</h3>
                  <p className="text-sm text-gray-600">{property.utilisateur.role}</p>
                  <p className="text-sm text-primary-600 mt-1">
                    <a href={`tel:${property.utilisateur.telephone}`}>
                      {property.utilisateur.telephone}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}