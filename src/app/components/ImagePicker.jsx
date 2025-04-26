'use client'
import { useState, useRef } from 'react'
import { CameraIcon, PhotoIcon, XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'

export default function ImagePicker({ onImageSelected, initialImage = null }) {
  const [preview, setPreview] = useState(initialImage)
  const [showOptions, setShowOptions] = useState(false)
  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size > 5 * 1024 * 1024) {
      alert('El archivo es demasiado grande (máximo 5MB)')
      return
    }

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        onImageSelected(reader.result)
        setShowOptions(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = (useCamera = false) => {
    if (useCamera) {
      cameraInputRef.current.click()
    } else {
      fileInputRef.current.click()
    }
    setShowOptions(false)
  }

  const removeImage = () => {
    setPreview(null)
    onImageSelected(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (cameraInputRef.current) cameraInputRef.current.value = ''
  }

  return (
    <div className="space-y-4">
      {/* Inputs ocultos */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleImageChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {/* Área de preview/selección */}
      {preview ? (
        <div className="relative group rounded-xl overflow-hidden shadow-md">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover transition-all duration-300 group-hover:opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <button
              type="button"
              onClick={removeImage}
              className="ml-auto bg-white/90 text-red-600 rounded-full p-2 hover:bg-white transition-all shadow-md"
              aria-label="Eliminar imagen"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className="w-full h-64 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center hover:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100"
            aria-label="Seleccionar imagen"
          >
            <div className="relative mb-3">
              <div className="bg-blue-100 p-4 rounded-full">
                <ArrowUpTrayIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-sm border border-gray-200">
                <CameraIcon className="h-5 w-5 text-gray-600" />
              </div>
            </div>
            <span className="text-gray-600 font-medium">Subir imagen</span>
            <span className="text-sm text-gray-500 mt-1">Haz clic para seleccionar</span>
          </button>

          {/* Menú de opciones */}
          {showOptions && (
            <div className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 animate-fade-in">
              <button
                type="button"
                onClick={() => triggerFileInput(false)}
                className="w-full px-4 py-3.5 text-left hover:bg-gray-50 flex items-center transition-colors"
              >
                <div className="bg-blue-50 p-2 rounded-lg mr-3">
                  <PhotoIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Subir desde galería</p>
                  <p className="text-xs text-gray-500">Selecciona una imagen existente</p>
                </div>
              </button>
              <div className="border-t border-gray-200"></div>
              <button
                type="button"
                onClick={() => triggerFileInput(true)}
                className="w-full px-4 py-3.5 text-left hover:bg-gray-50 flex items-center transition-colors"
              >
                <div className="bg-green-50 p-2 rounded-lg mr-3">
                  <CameraIcon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Tomar foto</p>
                  <p className="text-xs text-gray-500">Usa la cámara de tu dispositivo</p>
                </div>
              </button>
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-gray-500 text-center mt-2">
        Formatos soportados: JPG, PNG, WEBP (Máx. 5MB)
      </p>
    </div>
  )
}
