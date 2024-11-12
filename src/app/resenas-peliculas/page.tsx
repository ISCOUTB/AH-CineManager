'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const peliculas = [
  { id: 1, titulo: "Aventuras en la Selva", imagen: "/aventuras.png" },
  { id: 2, titulo: "Amor en Paris", imagen: "/paris.jpg" },
  { id: 3, titulo: "El Misterio del Reloj", imagen: "/reloj.jpg" },
  { id: 4, titulo: "La Última Frontera", imagen: "/frontera.jpg" },
  { id: 5, titulo: "Risas Imparables", imagen: "/risas.jpeg" },
  { id: 6, titulo: "El gran robo", imagen: "/robo.jpeg" },
]

export default function ResenasPeliculas() {
  const [resenas, setResenas] = useState<{[key: number]: string[]}>({})
  const [nuevaResena, setNuevaResena] = useState('')
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState<number | null>(null)

  const agregarResena = () => {
    if (peliculaSeleccionada && nuevaResena.trim()) {
      setResenas(prevResenas => ({
        ...prevResenas,
        [peliculaSeleccionada]: [...(prevResenas[peliculaSeleccionada] || []), nuevaResena.trim()]
      }))
      setNuevaResena('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">CineManager</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Reseñas de Películas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {peliculas.map((pelicula) => (
            <div key={pelicula.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image src={pelicula.imagen} alt={pelicula.titulo} width={300} height={450} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{pelicula.titulo}</h2>
                <button
                  onClick={() => setPeliculaSeleccionada(pelicula.id)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Ver Reseñas
                </button>
              </div>
            </div>
          ))}
        </div>

        {peliculaSeleccionada && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Reseñas para {peliculas.find(p => p.id === peliculaSeleccionada)?.titulo}
            </h2>
            <div className="mb-4">
              <textarea
                value={nuevaResena}
                onChange={(e) => setNuevaResena(e.target.value)}
                placeholder="Escribe tu reseña aquí..."
                className="w-full p-2 border rounded-md"
                rows={3}
              />
              <button
                onClick={agregarResena}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
              >
                Agregar Reseña
              </button>
            </div>
            <div>
              {resenas[peliculaSeleccionada]?.map((resena, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded-md mb-2">
                  {resena}
                </div>
              ))}
              {(!resenas[peliculaSeleccionada] || resenas[peliculaSeleccionada].length === 0) && (
                <p>Aún no hay reseñas para esta película.</p>
              )}
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