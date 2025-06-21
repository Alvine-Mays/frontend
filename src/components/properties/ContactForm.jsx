// src/components/properties/ContactForm.jsx
'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import api from '@/lib/api'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ContactForm({ propertyId }) {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return
    
    setIsSubmitting(true)
    setError(null)
    
    try {
      await api.post('/messages', {
        property: propertyId,
        content: message
      })
      setSuccess(true)
      setMessage('')
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="text-center space-y-4">
        <p className="text-gray-600">Vous devez être connecté pour envoyer un message</p>
        <Button asChild className="w-full bg-primary-600 hover:bg-primary-700">
          <Link href={`/login?redirect=/properties/${propertyId}`}>
            Se connecter
          </Link>
        </Button>
      </div>
    )
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <FaCheck className="text-green-600 text-2xl" />
        </div>
        <h3 className="text-lg font-medium">Message envoyé</h3>
        <p className="text-gray-600">L'agent vous contactera rapidement</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Votre message
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <Button
        type="submit"
        className="w-full bg-primary-600 hover:bg-primary-700"
        disabled={isSubmitting || !message.trim()}
      >
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
      </Button>
    </form>
  )
}