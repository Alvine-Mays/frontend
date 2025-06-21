// src/components/admin/RecentMessages.jsx
'use client'

import Link from 'next/link'
import { FaEnvelope, FaReply, FaUser } from 'react-icons/fa'

export default function RecentMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentMessages = async () => {
      try {
        const { data } = await api.get('/admin/messages/recent')
        setMessages(data)
      } catch (error) {
        console.error('Error fetching recent messages', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRecentMessages()
  }, [])

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Messages récents</h2>
        <Link href="/admin/messages" className="text-sm text-primary-600 hover:text-primary-800">
          Voir tout
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map(message => (
              <div key={message._id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {message.user?.avatar ? (
                        <img 
                          src={message.user.avatar} 
                          alt={message.user.name} 
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <FaUser className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">{message.user?.name || 'Anonyme'}</h3>
                      <p className="text-xs text-gray-500">{message.property?.titre}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(message.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                  {message.content}
                </p>
                <div className="mt-2 flex justify-end">
                  <Link 
                    href={`/admin/messages/${message._id}`}
                    className="inline-flex items-center text-sm text-primary-600 hover:text-primary-800"
                  >
                    <FaReply className="mr-1" /> Répondre
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">Aucun message récent</p>
          )}
        </div>
      )}
    </div>
  )
}