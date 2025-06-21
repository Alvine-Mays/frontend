// src/app/(protected)/account/page.jsx
'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import { FaUser, FaPhone, FaEnvelope, FaEdit, FaSignOutAlt } from 'react-icons/fa'

export default function AccountPage() {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nom: user?.nom || '',
    telephone: user?.telephone || '',
    email: user?.email || ''
  })

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await api.put('/users/profil', formData)
      // Mise à jour optimiste
      setUser({ ...user, ...formData })
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile', error)
    }
  }

  if (!user) {
    return <div className="text-center py-12">Chargement...</div>
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-primary-600 p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
              <FaUser className="text-primary-600 text-3xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.nom}</h1>
              <p className="text-primary-100">{user.role === 'admin' ? 'Administrateur' : 'Client'}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Annuler
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaUser className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Nom complet</p>
                  <p className="font-medium">{user.nom}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FaPhone className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="font-medium">{user.telephone}</p>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setFormData({
                      nom: user.nom,
                      telephone: user.telephone,
                      email: user.email
                    })
                    setIsEditing(true)
                  }}
                  className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  <FaEdit className="mr-2" />
                  Modifier
                </button>
                <button
                  onClick={logout}
                  className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  <FaSignOutAlt className="mr-2" />
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}