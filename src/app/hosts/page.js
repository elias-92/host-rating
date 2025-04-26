import Link from 'next/link'
import HostCard from '../components/HostCard'
export const dynamic = 'force-dynamic' // Desactiva caché completamente
export const revalidate = 0 // Equivalente a force-dynamic

async function getHosts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/hosts?timestamp=${Date.now()}`,
      {
        next: {
          tags: ['hosts'] // Etiqueta para revalidación
        }
      }
    )

    if (!res.ok) {
      throw new Error('Error al cargar los anfitriones')
    }

    return await res.json()
  } catch (error) {
    console.error('Error fetching hosts:', error)
    return []
  }
}

export default async function HostsPage() {
  const hosts = await getHosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Nuestros Anfitriones</h1>
        <Link
          href="/hosts/new"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Añadir Nuevo Anfitrión
        </Link>
      </div>

      {hosts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="max-w-md mx-auto">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No hay anfitriones registrados
            </h3>
            <p className="mt-1 text-gray-500 mb-4">
              Actualmente no tenemos anfitriones disponibles.
            </p>
            <Link
              href="/hosts/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Registrar primer anfitrión
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hosts.map((host) => (
            <HostCard
              key={host._id}
              host={host}
            />
          ))}
        </div>
      )}
    </div>
  )
}
