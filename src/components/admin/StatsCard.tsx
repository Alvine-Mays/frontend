export function StatsCard({ title, value, change, icon }: {
  title: string
  value: string | number
  change: number
  icon: string
}) {
  const isPositive = change >= 0

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {/* Icône */}
          {icon === 'home' && '🏠'}
          {icon === 'users' && '👥'}
          {icon === 'euro' && '💶'}
          {icon === 'chart' && '📈'}
        </div>
      </div>
      <p className={`text-sm mt-4 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? '↑' : '↓'} {Math.abs(change)}% vs mois dernier
      </p>
    </div>
  )
}