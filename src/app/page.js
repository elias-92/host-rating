import Link from 'next/link'
import { PlusCircleIcon, UsersIcon } from '@heroicons/react/24/outline'

async function checkHostsExist() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hosts?limit=1`, {
      cache: 'no-store'
    })

    if (!res.ok) throw new Error('Failed to fetch hosts')

    const data = await res.json()
    return Array.isArray(data) ? data.length > 0 : data.data?.length > 0
  } catch (error) {
    console.error('Error checking hosts:', error)
    return false
  }
}

export default async function Home() {
  const hostsExist = await checkHostsExist()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Encabezado */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sistema de Calificación</h1>
          <h2 className="text-2xl font-semibold text-blue-600">Anfitriones</h2>
          <div className="mt-6 h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-full w-24 mx-auto"></div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-4">
          <Link
            href="/hosts/new"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
          >
            <PlusCircleIcon className="h-6 w-6" />
            <span>Registrar Nuevo Anfitrión</span>
          </Link>

          {hostsExist && (
            <Link
              href="/hosts"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              <UsersIcon className="h-6 w-6" />
              <span>Ver Lista de Anfitriones</span>
            </Link>
          )}
        </div>

        {/* Pie de página */}
        <div className="mt-10 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Sistema de evaluación y calificación de anfitriones
          </p>
        </div>
      </div>
    </div>
  )
}
