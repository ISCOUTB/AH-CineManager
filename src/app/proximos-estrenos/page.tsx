import Image from 'next/image'
import Link from 'next/link'

const upcomingMovies = [
  { id: 1, title: "500 días con ella", releaseDate: "15 de Julio, 2025", image: "/500days.jpeg" },
  { id: 2, title: "Terrifier 3", releaseDate: "1 de Agosto, 2025", image: "/terrifier.jpg" },
  { id: 3, title: "Titanic", releaseDate: "20 de Agosto, 2025", image: "/titanic.jpg" },
  { id: 4, title: "Rapidos y Furiosos 9", releaseDate: "5 de Septiembre, 2025", image: "/ryf.jpeg" },
  { id: 5, title: "Animales Fantasticos", releaseDate: "15 de Septiembre, 2023", image: "/anim.jpg" },
  { id: 6, title: "La Pasion de Cristo", releaseDate: "1 de Octubre, 2025", image: "/crito.webp" },
]

export default function ProximosEstrenos() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">CineManager</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Próximos Estrenos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingMovies.map((movie) => (
            <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image src={movie.image} alt={movie.title} width={300} height={450} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                <p className="text-gray-600 mb-4">Estreno: {movie.releaseDate}</p>
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300">
                  Recordar estreno
                </button>
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