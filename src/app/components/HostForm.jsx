'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import ImagePicker from './ImagePicker'
import RatingStars from './RatingStarts'
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline'

export default function HostForm({ initialData = {}, isEdit = false }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    photo: '',
    foodRating: 0,
    ambianceRating: 0,
    serviceRating: 0
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        photo: initialData.photo || '',
        foodRating: initialData.foodRating || 0,
        ambianceRating: initialData.ambianceRating || 0,
        serviceRating: initialData.serviceRating || 0
      })
    }
  }, [initialData, isEdit])

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = isEdit ? `/api/hosts/${initialData._id}` : '/api/hosts'
      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al guardar')
      }

      toast.success(
        isEdit ? 'Anfitrión actualizado con éxito!' : 'Anfitrión registrado correctamente!',
        {
          position: 'top-center'
        }
      )
      router.push('/hosts')
      router.refresh()
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center'
      })
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="mb-6">
        <button
          onClick={() => router.push('/hosts')}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Volver a la lista
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mt-2">
          {isEdit ? 'Editar Anfitrión' : 'Nuevo Anfitrión'}
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <ImagePicker
          key={formData.photo}
          initialImage={formData.photo}
          onImageSelected={(photo) => setFormData({ ...formData, photo })}
          className="mb-6"
        />

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del anfitrión <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
              placeholder="Ej: Restaurante La Casa del Sabor"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              rows={4}
              placeholder="Describe las características especiales del anfitrión..."
            />
          </div>

          <div className="space-y-6 pt-2">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Calificaciones</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calidad de la comida
                </label>
                <RatingStars
                  rating={formData.foodRating}
                  setRating={(value) => setFormData({ ...formData, foodRating: value })}
                  starSize="h-6 w-6"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ambiente</label>
                <RatingStars
                  rating={formData.ambianceRating}
                  setRating={(value) => setFormData({ ...formData, ambianceRating: value })}
                  starSize="h-6 w-6"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Atención/servicio
                </label>
                <RatingStars
                  rating={formData.serviceRating}
                  setRating={(value) => setFormData({ ...formData, serviceRating: value })}
                  starSize="h-6 w-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/hosts')}
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              'Procesando...'
            ) : (
              <>
                <CheckIcon className="h-5 w-5 mr-1" />
                {isEdit ? 'Actualizar' : 'Registrar'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
