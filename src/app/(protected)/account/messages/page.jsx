// src/app/(protected)/account/messages/page.jsx
'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import EmptyState from '@/components/ui/EmptyState'
import { FaEnvelopeOpen, FaReply } from 'react-icons/fa'
import api from '@/lib/api'

export default function MessagesPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await api.get('/messages')
        setMessages(data)
      } catch (error) {
        console.error('Error fetching messages', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMessages()
  }, [])

  if (isLoading) {
    return <div className="text-center py-12">Chargement des messages...</div>
  }

  if (!messages.length) {
    return (
      <EmptyState 
        icon={<FaEnvelopeOpen className="text-primary-600 text-4xl" />}
        title="Aucun message"
        description="Vous n'avez pas encore envoyé de demande pour un bien"
        action={
          <a 
            href="/properties" 
            className="mt-6 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Explorer les biens
          </a>
        }
      />
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Vos demandes</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste des messages */}
        <div className="lg:col-span-1 space-y-2">
          {messages.map(message => (
            <div 
              key={message._id}
              onClick={() => setSelectedMessage(message)}
              className={`p-4 rounded-lg cursor-pointer ${selectedMessage?._id === message._id ? 'bg-primary-50 border border-primary-200' : 'bg-white border border-gray-200 hover:border-primary-300'}`}
            >
              <div className="flex justify-between">
                <h3 className="font-medium">{message.property.titre}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(message.createdAt).toLocaleDateString('fr-FR')}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-1 truncate">
                {message.content}
              </p>
            </div>
          ))}
        </div>

        {/* Détail du message */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">{selectedMessage.property.titre}</h2>
                  <p className="text-gray-600">{selectedMessage.property.ville}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(selectedMessage.createdAt).toLocaleDateString('fr-FR')}
                </span>
              </div>

              <div className="prose max-w-none text-gray-700 mb-6">
                {selectedMessage.content}
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Réponse de l'agence</h3>
                {selectedMessage.reponse ? (
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-gray-700">{selectedMessage.reponse}</p>
                    {selectedMessage.reponseDate && (
                      <p className="text-sm text-gray-500 mt-2">
                        Répondu le {new Date(selectedMessage.reponseDate).toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500">En attente de réponse</p>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <FaEnvelopeOpen className="mx-auto text-gray-300 text-4xl mb-4" />
              <p className="text-gray-500">Sélectionnez un message pour voir les détails</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}