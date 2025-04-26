import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Calificación de Anfitriones',
  description: 'Califica a tus anfitriones después de disfrutar de su comida y hospitalidad'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-full bg-gray-50">
        <header className="bg-white shadow-sm p-4 mb-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Link
                  href="/"
                  className="hover:cursor-pointer"
                >
                  <h1 className="text-3xl text-black font-bold">Home</h1>
                </Link>
              </div>
              <div className="flex-1 justify-center hidden md:flex">
                <p className="text-black text-xl font-medium">Calificación de Anfitriones</p>
              </div>
              <div className="flex-1 hidden md:block"></div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">{children}</main>

        <footer className="bg-gray-800 text-white py-6 mt-8">
          <div className="container mx-auto px-4 text-center">
            <p>
              © {new Date().getFullYear()} CalificaciónAnfitriones. Todos los derechos reservados.
            </p>
          </div>
        </footer>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff'
            }
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
