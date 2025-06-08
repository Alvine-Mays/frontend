'use client'
import { StatsCard } from '@/components/admin/StatsCard'
import { RecentSales } from '@/components/admin/RecentSales'
import { SalesChart } from '@/components/admin/SalesChart'
import { useAuth } from '@/context/AuthContext'
import { apiService } from '@/lib/services/api'
import { useEffect, useState } from 'react'

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.role === 'admin') {
      apiService.getAdminStats()
        .then(data => setStats(data))
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
      <h1 className="font-display text-3xl font-bold mb-8">Tableau de bord</h1>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      ) : stats ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard 
              title="Biens en ligne" 
              value={stats.propertiesCount} 
              change={stats.propertiesChange} 
              icon="home"
            />
            <StatsCard 
              title="Utilisateurs" 
              value={stats.usersCount} 
              change={stats.usersChange} 
              icon="users"
            />
            <StatsCard 
              title="Ventes ce mois" 
              value={stats.salesCount} 
              change={stats.salesChange} 
              icon="euro"
            />
            <StatsCard 
              title="Revenus" 
              value={`${stats.revenue.toLocaleString()} €`} 
              change={stats.revenueChange} 
              icon="chart"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
              <h2 className="font-display text-xl font-semibold mb-4">Activité récente</h2>
              <SalesChart data={stats.monthlySales} />
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-display text-xl font-semibold mb-4">Dernières transactions</h2>
              <RecentSales sales={stats.recentSales} />
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}