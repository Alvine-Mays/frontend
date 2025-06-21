// src/components/admin/AdminStats.jsx
'use client'

import { FaHome, FaEnvelope, FaUsers, FaEuroSign } from 'react-icons/fa'

export default function AdminStats({ stats }) {
  const statCards = [
    {
      title: "Biens en ligne",
      value: stats?.properties || 0,
      icon: <FaHome className="text-primary-600" />,
      change: stats?.propertiesChange || 0
    },
    {
      title: "Messages reçus",
      value: stats?.messages || 0,
      icon: <FaEnvelope className="text-blue-600" />,
      change: stats?.messagesChange || 0
    },
    {
      title: "Utilisateurs",
      value: stats?.users || 0,
      icon: <FaUsers className="text-green-600" />,
      change: stats?.usersChange || 0
    },
    {
      title: "CA mensuel",
      value: stats?.revenue ? `${stats.revenue.toLocaleString()} €` : '0 €',
      icon: <FaEuroSign className="text-purple-600" />,
      change: stats?.revenueChange || 0
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center">
              {stat.icon}
            </div>
          </div>
          {stat.change !== 0 && (
            <p className={`mt-2 text-sm ${stat.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}% vs mois dernier
            </p>
          )}
        </div>
      ))}
    </div>
  )
}