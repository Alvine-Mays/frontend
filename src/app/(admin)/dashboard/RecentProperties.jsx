// src/components/admin/RecentProperties.jsx
'use client'

import Link from 'next/link'
import { FaHome, FaEdit, FaChartLine } from 'react-icons/fa'

export default function RecentProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentProperties = async () => {
      try {
        const { data } = await api.get('/admin/properties/recent')
        setProperties(data)
      } catch (error) {
        console.error('Error fetching recent properties', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRecentProperties()
  }, [])

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Biens récents</h2>
        <Link href="/admin/properties" className="text-sm text-primary-600 hover:text-primary-800">
          Voir tout
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {properties.length > 0 ? (
            properties.map(property => (
              <div key={property._id} className="flex items-start justify-between border-b pb-4 last:border-0">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {property.images?.length > 0 ? (
                      <img 
                        src={property.images[0].url} 
                        alt={property.titre} 
                        className="h-12 w-12 rounded object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
                        <FaHome className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{property.titre}</h3>
                    <p className="text-xs text-gray-500">{property.ville}</p>
                    <p className="text-sm font-semibold text-primary-600 mt-1">
                      {property.prix.toLocaleString()} €
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link 
                    href={`/admin/properties/${property._id}/edit`}
                    className="text-gray-400 hover:text-primary-600"
                    title="Modifier"
                  >
                    <FaEdit className="h-4 w-4" />
                  </Link>
                  <Link 
                    href={`/admin/properties/${property._id}/stats`}
                    className="text-gray-400 hover:text-blue-600"
                    title="Statistiques"
                  >
                    <FaChartLine className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">Aucun bien récent</p>
          )}
        </div>
      )}
    </div>
  )
}