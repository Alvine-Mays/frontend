'use client'
import { MessageCard } from '@/components/messages/MessageCard'
import { MessageForm } from '@/components/messages/MessageForm'
import { useAuth } from '@/context/AuthContext'
import { apiService } from '@/lib/services/api'
import { useEffect, useState } from 'react'

export default function MessagesPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      apiService.getMessages()
        .then(data => setMessages(data))
        .finally(() => setLoading(false))
    }
  }, [user])

  const handleSend = async (content: string) => {
    try {
      const newMessage = await apiService.sendMessage(content)
      setMessages([...messages, newMessage])
    } catch (error) {
      console.error(error)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Veuillez vous connecter pour accéder aux messages</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">Messages</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
            </div>
          ) : messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageCard 
                  key={message.id} 
                  message={message} 
                  isCurrentUser={message.senderId === user.id}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-12">Aucun message</p>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-display text-xl font-semibold mb-4">Envoyer un message</h2>
          <MessageForm onSend={handleSend} />
        </div>
      </div>
    </div>
  )
}