import Link from 'next/link'
import Image from 'next/image'

const movies = [
  { id: 1, title: "Aventuras en la Selva", genre: "Aventura", duration: "2h 15min", image: "/aventuras.png" },
  { id: 2, title: "El Misterio del Reloj", genre: "Suspenso", duration: "1h 55min", image: "/reloj.jpg" },
  { id: 3, title: "Amor en París", genre: "Romance", duration: "2h 05min", image: "/paris.jpg" },
  { id: 4, title: "La Última Frontera", genre: "Ciencia Ficción", duration: "2h 30min", image: "/frontera.jpg" },
  { id: 5, title: "Risas Imparables", genre: "Comedia", duration: "1h 25min", image: "/risas.jpeg" },
  { id: 6, title: "El Gran Robo", genre: "Acción", duration: "2h 10min", image: "/robo.jpeg" },
]

export default function Cartelera() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">CineManager</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Cartelera</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image src={movie.image} alt={movie.title} width={300} height={450} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                <p className="text-gray-600 mb-4">{movie.genre} • {movie.duration}</p>
                <Link href={`/pelicula/${movie.id}`} className="block text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                  Ver detalles y comprar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 CineManager. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}