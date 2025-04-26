'use client'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ConfirmationModal from '@/app/components/ConfirmationModal'
import { useParams } from 'next/navigation'
import { FiArrowLeft, FiEdit, FiImage } from 'react-icons/fi'
import { FaStar, FaRegStar } from 'react-icons/fa'
import { TrashIcon } from '@heroicons/react/24/outline'

export default function HostDetailPage() {
  const params = useParams()
  const id = params.id
  const [host, setHost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (!id) return

    const fetchHost = async () => {
      try {
        const res = await fetch(`/api/hosts/${id}`)
        if (!res.ok) throw new Error('Error al cargar el anfitrión')
        const data = await res.json()
        setHost(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchHost()
  }, [id])

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/hosts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Error al eliminar el anfitrión')
      }
      toast.success('Anfitrión eliminado correctamente')
      router.push('/hosts')
      router.refresh()
    } catch (err) {
      toast.error(err.message)
    }
  }

  // Traducción de los tipos de calificación
  const ratingTranslations = {
    foodRating: 'Comida',
    ambianceRating: 'Ambiente',
    serviceRating: 'Servicio'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Cargando información del anfitrión...</p>
        </div>
      </div>
    )
  }

  if (error || !host) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md mx-auto"
          role="alert"
        >
          <h2 className="text-2xl font-bold">Error</h2>
          <p className="mt-2">{error || 'No se pudo cargar la información del anfitrión'}</p>
          <Link
            href="/hosts"
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Volver a la lista
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <Link
              href="/hosts"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Volver a la lista
            </Link>
            <div className="flex gap-4">
              <Link
                href={`/hosts/${host._id}/edit`}
                className="inline-flex items-center px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                <FiEdit className="mr-2" />
                Editar
              </Link>
              <ConfirmationModal
                onConfirm={handleDelete}
                title="Eliminar Anfitrión"
                message={`¿Está seguro que desea eliminar permanentemente a ${host.name}? Esta acción no se puede deshacer.`}
                confirmText="Eliminar"
                cancelText="Cancelar"
                confirmColor="red"
              >
                <button className="inline-flex items-center px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  <TrashIcon className="h-5 w-5 mr-2" />
                  Eliminar
                </button>
              </ConfirmationModal>
            </div>
          </div>

          {/* Tarjeta principal */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Sección de imagen */}
              <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-6">
                {host.photo ? (
                  <div className="relative w-full h-64 md:h-full">
                    <Image
                      src={host.photo}
                      alt={host.name}
                      fill
                      className="object-cover rounded-lg"
                      priority
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 md:h-full flex flex-col items-center justify-center text-gray-400 bg-gray-200 rounded-lg">
                    <FiImage className="h-16 w-16 mb-2" />
                    <span>No hay imagen</span>
                  </div>
                )}
              </div>

              {/* Sección de información */}
              <div className="md:w-2/3 p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{host.name}</h1>

                {/* Calificaciones */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Calificaciones</h2>
                  <div className="space-y-4">
                    {['foodRating', 'ambianceRating', 'serviceRating'].map((ratingType) => (
                      <div
                        key={ratingType}
                        className="flex items-center"
                      >
                        <span className="w-24 font-medium text-gray-600">
                          {ratingTranslations[ratingType]}:
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className="text-xl"
                            >
                              {i < (host[ratingType] || 0) ? (
                                <FaStar className="text-amber-400 inline-block" />
                              ) : (
                                <FaRegStar className="text-gray-300 inline-block" />
                              )}
                            </span>
                          ))}
                        </div>
                        <span className="ml-2 text-gray-500">({host[ratingType] || 0}/5)</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Descripción */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">Descripción</h2>
                  <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                    {host.description || 'No hay descripción disponible.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
