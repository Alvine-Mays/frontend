'use client'
import { PropertyForm } from '@/components/admin/PropertyForm'
import { useAuth } from '@/context/AuthContext'
import { apiService } from '@/lib/services/api'
import { useRouter } from 'next/navigation'

export default function NewPropertyPage() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Accès non autorisé</p>
      </div>
    )
  }

  const handleSubmit = async (data: any) => {
    try {
      await apiService.createProperty(data)
      router.push('/admin/properties')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">Ajouter un nouveau bien</h1>
      <PropertyForm 
        onSubmit={handleSubmit}
        initialValues={{
          title: '',
          description: '',
          price: 0,
          surface: 0,
          rooms: 0,
          bedrooms: 0,
          address: '',
          type: 'house',
          status: 'available',
          features: [],
          images: []
        }}
      />
    </div>
  )
}