import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

export type Property = {
  id: string
  title: string
  price: number
  type: string
  status: 'available' | 'sold' | 'rented'
  createdAt: string
}

export const columns: ColumnDef<Property>[] = [
  {
    accessorKey: "title",
    header: "Titre",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prix
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format(price)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("status")
      const statusClass = {
        available: "bg-green-100 text-green-800",
        sold: "bg-red-100 text-red-800",
        rented: "bg-blue-100 text-blue-800",
      }[status as string]

      return (
        <span className={`px-2 py-1 rounded-full text-xs ${statusClass}`}>
          {status === 'available' ? 'Disponible' : status === 'sold' ? 'Vendu' : 'Loué'}
        </span>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const property = row.original

      return (
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      )
    },
  },
]