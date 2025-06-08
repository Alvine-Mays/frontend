'use client'
import { DataTable } from '@/components/admin/DataTable'
import { columns } from '@/components/admin/UserColumns'
import { useAuth } from '@/context/AuthContext'
import { apiService } from '@/lib/services/api'
import { useEffect, useState } from 'react'

export default function AdminUsersPage() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.role === 'admin') {
      apiService.getAdminUsers()
        .then(data => setUsers(data))
        .finally(() => setLoading(false))
    }
  }, [user])

  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Accès non autorisé</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">Gestion des utilisateurs</h1>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      ) : (
        <DataTable 
          columns={columns} 
          data={users}
        />
      )}
    </div>
  )
}