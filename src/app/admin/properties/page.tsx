'use client'
import { DataTable } from '@/components/admin/DataTable'
import { columns } from '@/components/admin/PropertyColumns'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminPropertiesPage() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Accès non autorisé</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-bold">Gestion des biens</h1>
        <Button onClick={() => router.push('/admin/properties/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un bien
        </Button>
      </div>
      
      <DataTable 
        columns={columns} 
        data={[]} 
        onAddNew={() => router.push('/admin/properties/new')}
      />
    </div>
  )
}