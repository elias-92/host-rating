import Link from 'next/link'
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid'
import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const HostCard = ({ host }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
      {/* Imagen del anfitrión */}
      <div className="h-56 bg-gray-100 relative">
        {host.photo ? (
          <Image
            src={host.photo}
            alt={`Foto de ${host.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <OutlineStarIcon className="h-10 w-10 mb-2" />
            <span className="text-sm font-medium">Sin imagen disponible</span>
          </div>
        )}
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 truncate max-w-[70%]">{host.name}</h3>

          {/* Rating */}
          <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
            <SolidStarIcon className="h-5 w-5 text-amber-400" />
            <span className="ml-1 font-medium text-gray-700">
              {host.averageRating?.toFixed(1) || 'Nuevo'}
            </span>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-gray-600 line-clamp-2 min-h-[40px] mb-4">
          {host.description || 'Este anfitrión no tiene descripción...'}
        </p>

        {/* Botones */}
        <div className="mt-4">
          <Link
            href={`/hosts/${host._id}`}
            className="block w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-center transition-colors duration-200"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HostCard
