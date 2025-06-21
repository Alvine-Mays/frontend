// src/app/(admin)/dashboard/page.jsx
'use client'

import { useAuth } from '@/contexts/AuthContext'
import AdminStats from '@/components/admin/AdminStats'
import RecentProperties from '@/components/admin/RecentProperties'
import RecentMessages from '@/components/admin/RecentMessages'
import { useEffect, useState } from 'react'
import api from '@/lib/api'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats')
        setStats(data)
      } catch (error) {
        console.error('Error fetching stats', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (!user?.isAdmin) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">Accès réservé aux administrateurs</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Tableau de bord administrateur</h1>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <>
          <AdminStats stats={stats} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <RecentProperties />
            <RecentMessages />
          </div>
        </>
      )}
    </div>
  )
}