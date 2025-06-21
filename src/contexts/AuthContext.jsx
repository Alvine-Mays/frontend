// src/contexts/AuthContext.jsx
'use client'

import { createContext, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const { data } = await api.get('/users/profil')
        setUser(data)
      } catch (error) {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    verifyAuth()
  }, [])

  const register = async (userData) => {
    const { data } = await api.post('/users/register', userData)
    localStorage.setItem('ophrus_token', data.token)
    localStorage.setItem('ophrus_refreshToken', data.refreshToken)
    setUser(data.user)
    router.push('/account')
  }

  const login = async (credentials) => {
    const { data } = await api.post('/users/login', credentials)
    localStorage.setItem('ophrus_token', data.token)
    localStorage.setItem('ophrus_refreshToken', data.refreshToken)
    setUser(data.user)
    router.push('/account')
  }

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('ophrus_refreshToken')
      if (refreshToken) {
        await api.post('/users/logout', { refreshToken })
      }
    } finally {
      localStorage.removeItem('ophrus_token')
      localStorage.removeItem('ophrus_refreshToken')
      setUser(null)
      router.push('/login')
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      register, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)