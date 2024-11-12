'use client'

import { useState } from 'react'
import Link from 'next/link'

const ciudades = [
  'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta', 'Bucaramanga', 'Pereira',
  'Santa Marta', 'Ibagué', 'Pasto', 'Manizales', 'Neiva', 'Villavicencio', 'Armenia'
]

const cines = [
  { id: 1, nombre: 'CineManager Centro', direccion: 'Calle 1 #23-45' },
  { id: 2, nombre: 'CineManager Plaza', direccion: 'Carrera 7 #65-43' },
  { id: 3, nombre: 'CineManager Parque', direccion: 'Avenida 3 #12-34' },
  { id: 4, nombre: 'CineManager Norte', direccion: 'Calle 80 #45-67' },
  { id: 5, nombre: 'CineManager Sur', direccion: 'Carrera 30 #78-90' },
]

export default function Cines() {
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('')

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">CineManager</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Nuestros Cines</h1>

        <div className="mb-8">
          <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-2">
            Selecciona tu ciudad
          </label>
          <select
            id="ciudad"
            value={ciudadSeleccionada}
            onChange={(e) => setCiudadSeleccionada(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Selecciona una ciudad</option>
            {ciudades.map((ciudad) => (
              <option key={ciudad} value={ciudad}>
                {ciudad}
              </option>
            ))}
          </select>
        </div>

        {ciudadSeleccionada && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Cines en {ciudadSeleccionada}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cines.map((cine) => (
                <div key={cine.id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-2">{cine.nombre}</h3>
                  <p className="text-gray-600">{cine.direccion}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 CineManager. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}