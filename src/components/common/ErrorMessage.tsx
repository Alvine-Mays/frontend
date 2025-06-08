export function ErrorMessage({ 
  error,
  className = ''
}: {
  error: string | null
  className?: string
}) {
  if (!error) return null

  return (
    <div className={`bg-red-50 border-l-4 border-red-500 p-4 ${className}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {/* Icône d'erreur */}
          <span className="text-red-500">!</span>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    </div>
  )
}