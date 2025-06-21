// src/components/search/AdvancedSearch.jsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaSearch, FaSlidersH, FaTimes } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

const propertyTypes = [
  'Appartement',
  'Maison',
  'Terrain',
  'Commercial',
  'Autre'
]

const priceRanges = [
  { label: "Moins de 100k €", value: "0-100000" },
  { label: "100k - 200k €", value: "100000-200000" },
  { label: "200k - 500k €", value: "200000-500000" },
  { label: "Plus de 500k €", value: "500000-1000000" }
]

export default function AdvancedSearch() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    type: '',
    priceRange: '',
    bedrooms: '',
    surface: '',
    features: []
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleSearch = () => {
    const query = new URLSearchParams()
    if (searchTerm) query.append('q', searchTerm)
    if (filters.type) query.append('type', filters.type)
    if (filters.priceRange) query.append('price', filters.priceRange)
    if (filters.bedrooms) query.append('bedrooms', filters.bedrooms)
    if (filters.surface) query.append('surface', filters.surface)
    if (filters.features.length) query.append('features', filters.features.join(','))

    router.push(`/properties?${query.toString()}`)
  }

  const toggleFeature = (feature) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Rechercher par ville, quartier ou code postal..."
          className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <div className="absolute right-0 flex space-x-2 mr-2">
          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogTrigger asChild>
              <button className="p-2 text-gray-600 hover:text-primary-600">
                <FaSlidersH />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Filtres avancés</h3>
                  <button onClick={() => setIsFilterOpen(false)}>
                    <FaTimes className="text-gray-400" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Type de bien</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={filters.type}
                      onChange={(e) => setFilters({...filters, type: e.target.value})}
                    >
                      <option value="">Tous types</option>
                      {propertyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tranche de prix</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={filters.priceRange}
                      onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                    >
                      <option value="">Toutes</option>
                      {priceRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre de chambres</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={filters.bedrooms}
                      onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                    >
                      <option value="">Indifférent</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Surface minimum (m²)</label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      value={filters.surface}
                      onChange={(e) => setFilters({...filters, surface: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Équipements</label>
                  <div className="flex flex-wrap gap-2">
                    {['garage', 'jardin', 'piscine', 'balcon', 'ascenseur'].map(feature => (
                      <button
                        key={feature}
                        onClick={() => toggleFeature(feature)}
                        className={`px-3 py-1 text-sm rounded-full ${
                          filters.features.includes(feature)
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {feature.charAt(0).toUpperCase() + feature.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button 
            onClick={handleSearch}
            className="rounded-full bg-primary-600 hover:bg-primary-700"
          >
            <FaSearch />
          </Button>
        </div>
      </div>

      {/* Filtres actifs */}
      {(filters.type || filters.priceRange || filters.bedrooms || filters.surface || filters.features.length > 0) && (
        <div className="flex flex-wrap gap-2 mt-3">
          {filters.type && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              Type: {filters.type}
              <button 
                onClick={() => setFilters({...filters, type: ''})}
                className="ml-1.5 inline-flex text-primary-400 hover:text-primary-600"
              >
                <FaTimes className="h-3 w-3" />
              </button>
            </span>
          )}
          
          {filters.priceRange && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Prix: {priceRanges.find(r => r.value === filters.priceRange)?.label}
              <button 
                onClick={() => setFilters({...filters, priceRange: ''})}
                className="ml-1.5 inline-flex text-green-400 hover:text-green-600"
              >
                <FaTimes className="h-3 w-3" />
              </button>
            </span>
          )}
          
          {filters.features.map(feature => (
            <span key={feature} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {feature}
              <button 
                onClick={() => toggleFeature(feature)}
                className="ml-1.5 inline-flex text-blue-400 hover:text-blue-600"
              >
                <FaTimes className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}