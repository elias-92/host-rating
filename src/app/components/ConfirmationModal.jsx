// 'use client'
// import { useState } from 'react'

// export default function ConfirmationModal({
//   title = '¿Está seguro?',
//   message = 'Esta acción no se puede deshacer',
//   confirmText = 'Confirmar',
//   cancelText = 'Cancelar',
//   onConfirm,
//   onCancel
// }) {
//   const [isOpen, setIsOpen] = useState(false)

//   const handleConfirm = () => {
//     setIsOpen(false)
//     onConfirm()
//   }

//   const handleCancel = () => {
//     setIsOpen(false)
//     onCancel?.()
//   }

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(true)}
//         className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//       >
//         Eliminar
//       </button>

//       {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-gray-400 rounded-lg p-6 max-w-md w-full">
//             <h3 className="text-lg font-bold mb-2">{title}</h3>
//             <p className="mb-4">{message}</p>
//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={handleCancel}
//                 className="px-4 py-2 border rounded"
//               >
//                 {cancelText}
//               </button>
//               <button
//                 onClick={handleConfirm}
//                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 {confirmText}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }
'use client'
import { useState } from 'react'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function ConfirmationModal({
  title = '¿Está seguro?',
  message = 'Esta acción es irreversible y no se puede deshacer.',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmColor = 'red',
  onConfirm,
  onCancel,
  children
}) {
  const [isOpen, setIsOpen] = useState(false)

  // Configuración de colores dinámicos
  const colorVariants = {
    red: {
      bg: 'bg-red-100',
      text: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700',
      icon: 'text-red-500'
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700',
      icon: 'text-blue-500'
    },
    emerald: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-600',
      button: 'bg-emerald-600 hover:bg-emerald-700',
      icon: 'text-emerald-500'
    }
  }

  const colors = colorVariants[confirmColor] || colorVariants.red

  const handleConfirm = () => {
    setIsOpen(false)
    onConfirm()
  }

  const handleCancel = () => {
    setIsOpen(false)
    onCancel?.()
  }

  return (
    <>
      {children ? (
        <div
          onClick={() => setIsOpen(true)}
          className="w-full"
        >
          {children}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={`px-4 py-2 ${colors.button} text-white rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md`}
        >
          {confirmText}
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all duration-200 scale-95 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`${colors.bg} px-6 py-4 rounded-t-xl flex items-start justify-between`}>
              <div className="flex items-center">
                <ExclamationTriangleIcon className={`h-6 w-6 mr-2 ${colors.icon}`} />
                <h3 className={`text-lg font-semibold ${colors.text}`}>{title}</h3>
              </div>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Cerrar modal"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-gray-600 mb-6">{message}</p>

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={handleCancel}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  {cancelText}
                </button>
                <button
                  onClick={handleConfirm}
                  className={`px-5 py-2.5 ${colors.button} text-white rounded-lg transition-colors duration-200 shadow-sm`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
