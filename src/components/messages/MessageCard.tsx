export function MessageCard({ message, isCurrentUser }: {
  message: any
  isCurrentUser: boolean
}) {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs md:max-w-md rounded-lg p-4 ${isCurrentUser ? 'bg-primary text-white' : 'bg-gray-100'}`}>
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 overflow-hidden">
            {message.sender.avatar && (
              <img src={message.sender.avatar} alt={message.sender.name} />
            )}
          </div>
          <p className="font-medium">{message.sender.name}</p>
        </div>
        <p>{message.content}</p>
        <p className={`text-xs mt-2 ${isCurrentUser ? 'text-white/70' : 'text-gray-500'}`}>
          {new Date(message.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  )
}