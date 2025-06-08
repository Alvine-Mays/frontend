import axios from 'axios'
import { toast } from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
})

// Intercepteurs pour gestion globale des erreurs et tokens
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {}, {
          withCredentials: true
        })
        
        localStorage.setItem('accessToken', data.accessToken)
        api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
        return api(originalRequest)
      } catch (err) {
        localStorage.removeItem('accessToken')
        window.location.href = '/login'
        return Promise.reject(err)
      }
    }
    
    const errorMessage = error.response?.data?.message || 'Une erreur est survenue'
    toast.error(errorMessage)
    return Promise.reject(error)
  }
)

export const apiService = {
  // Authentification
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials).then((data) => {
      localStorage.setItem('accessToken', data.accessToken)
      return data
    }),
    
  register: (userData: { name: string; email: string; password: string }) => 
    api.post('/auth/register', userData),
    
  logout: () => 
    api.post('/auth/logout').then(() => {
      localStorage.removeItem('accessToken')
    }),
    
  refreshToken: () => api.post('/auth/refresh'),
  
  // Utilisateur
  getCurrentUser: () => {
    const token = localStorage.getItem('accessToken')
    if (!token) return Promise.reject('No token')
    return Promise.resolve(jwtDecode(token))
  },
  
  updateUser: (data: any) => api.patch('/users/me', data),
  
  // Biens immobiliers
  getProperties: (params?: any) => api.get('/properties', { params }),
  
  getFeaturedProperties: () => api.get('/properties/featured'),
  
  getPropertyDetails: (id: string) => api.get(`/properties/${id}`),
  
  searchProperties: (query: string) => api.get('/properties/search', { params: { q: query } }),
  
  // Admin
  createProperty: (data: any) => api.post('/admin/properties', data),
  
  updateProperty: (id: string, data: any) => api.patch(`/admin/properties/${id}`, data),
  
  deleteProperty: (id: string) => api.delete(`/admin/properties/${id}`),
  
  getAdminProperties: () => api.get('/admin/properties'),
  
  // Favoris
  getFavorites: () => api.get('/favorites'),
  
  addFavorite: (propertyId: string) => api.post('/favorites', { propertyId }),
  
  removeFavorite: (propertyId: string) => api.delete(`/favorites/${propertyId}`),

  // Ajoutez ces méthodes à apiService
getAdminUsers: () => api.get('/admin/users'),
updateUserRole: (userId, role) => api.patch(`/admin/users/${userId}/role`, { role }),
getAdminStats: () => api.get('/admin/stats'),
getMessages: () => api.get('/messages'),
sendMessage: (content) => api.post('/messages', { content }),
  
  // Upload
  uploadImage: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  
  // Contact
  sendContactRequest: (data: any) => api.post('/contact', data)
}