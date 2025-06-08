'use client'
import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

export function AdvancedSearch() {
  const [filters, setFilters] = useState({
    type: '',
    minPrice: 0,
    maxPrice: 1000000,
    minSurface: 0,
    maxSurface: 300,
    rooms: 0,
    bedrooms: 0,
    location: '',
    features: []
  })

  const router = useRouter()

  const handleSearch = () => {
    const query = new URLSearchParams()
    for (const [key, value] of Object.entries(filters)) {
      if (value) query.append(key, value.toString())
    }
    router.push(`/biens?${query.toString()}`)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="font-display text-xl font-semibold mb-6">Recherche avancée</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Type de bien */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <Select
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="">Tous types</option>
            <option value="house">Maison</option>
            <option value="apartment">Appartement</option>
            <option value="villa">Villa</option>
          </Select>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Budget (€)</label>
          <Slider 
            min={0}
            max={1000000}
            step={10000}
            value={[filters.minPrice, filters.maxPrice]}
            onChange={([min, max]) => setFilters({...filters, minPrice: min, maxPrice: max})}
            formatLabel={(value) => `${value.toLocaleString()} €`}
          />
        </div>

        {/* Surface */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Surface (m²)</label>
          <Slider 
            min={0}
            max={300}
            step={10}
            value={[filters.minSurface, filters.maxSurface]}
            onChange={([min, max]) => setFilters({...filters, minSurface: min, maxSurface: max})}
          />
        </div>

        {/* Localisation */}
        <div>
          <Input
            label="Localisation"
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
          />
        </div>

        {/* Pièces */}
        <div>
          <Input
            label="Pièces min"
            type="number"
            value={filters.rooms}
            onChange={(e) => setFilters({...filters, rooms: parseInt(e.target.value) || 0})}
          />
        </div>

        {/* Chambres */}
        <div>
          <Input
            label="Chambres min"
            type="number"
            value={filters.bedrooms}
            onChange={(e) => setFilters({...filters, bedrooms: parseInt(e.target.value) || 0})}
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button 
          type="button"
          onClick={() => setFilters({
            type: '',
            minPrice: 0,
            maxPrice: 1000000,
            minSurface: 0,
            maxSurface: 300,
            rooms: 0,
            bedrooms: 0,
            location: '',
            features: []
          })}
          className="text-primary hover:underline font-medium"
        >
          Réinitialiser
        </button>
        <Button onClick={handleSearch} className="btn-primary">
          Appliquer les filtres
        </Button>
      </div>
    </div>
  )
}