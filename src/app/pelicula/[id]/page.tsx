'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const movies = [
  {
    id: 1,
    title: "Aventuras en la Selva",
    genre: "Aventura",
    duration: "2h 15min",
    description: "Una emocionante aventura en lo profundo de la selva amazónica.",
    image: "/aventuras.png"
  },
  {
    id: 2,
    title: "Amor en Paris",
    genre: "Romance",
    duration: "2h 05min",
    description: "Una pareja perdida en la ciudad.",
    image: "/paris.jpg"
  },
  {
    id: 3,
    title: "El Misterio del Reloj",
    genre: "Suspenso",
    duration: "1h 45min",
    description: "El tiempo avanza o nosotros retrocedemos?.",
    image: "/reloj.jpg"
  },
  {
    id: 4,
    title: "La Última Frontera",
    genre: "Ciencia Ficción",
    duration: "1h 45min",
    description: "Buscando una salida encontramos una entrada.",
    image: "/frontera.jpg"
  },
  {
    id: 5,
    title: "Risas Imparables",
    genre: "Comedia",
    duration: "1h 25min",
    description: "risas por todos lados.",
    image: "/risas.jpeg"
  },
  {
    id: 6,
    title: "El gran robo",
    genre: "Accion",
    duration: "2h 10min",
    description: "Robar es mas que solo un hobby.",
    image: "/robo.jpeg"
  },
]

const seats = Array.from({ length: 50 }, (_, i) => ({ id: i + 1, isOccupied: Math.random() < 0.3 }))

const snacks = [
  { id: 1, name: "Palomitas", price: 5 },
  { id: 2, name: "Refresco", price: 3 },
  { id: 3, name: "Nachos", price: 4 },
  { id: 4, name: "Dulces", price: 2 },
]

export default function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const movie = movies.find(m => m.id === parseInt(resolvedParams.id))
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])
  const [selectedSnacks, setSelectedSnacks] = useState<{[key: number]: number}>({})
  const [step, setStep] = useState<'seats' | 'snacks' | 'payment' | 'confirmation'>('seats')
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', expiry: '', cvv: '', name: '' })
  const [purchaseComplete, setPurchaseComplete] = useState(false)
  const [cardError, setCardError] = useState('')

  const toggleSeat = (seatId: number) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    )
  }

  const updateSnackQuantity = (snackId: number, quantity: number) => {
    setSelectedSnacks(prev => ({
      ...prev,
      [snackId]: Math.max(0, quantity)
    }))
  }

  const totalCost = selectedSeats.length * 10 + 
    Object.entries(selectedSnacks).reduce((total, [id, quantity]) => 
      total + snacks.find(s => s.id === parseInt(id))!.price * quantity, 0)

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2)}`
    }
    return v
  }

  const validateLuhn = (value: string) => {
    let sum = 0
    let isEven = false
    for (let i = value.length - 1; i >= 0; i--) {
      let digit = parseInt(value.charAt(i), 10)
      if (isEven) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }
      sum += digit
      isEven = !isEven
    }
    return (sum % 10) === 0
  }
  
  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let value = e.target.value; // Asignamos 'value' a una variable mutable
  
    if (name === 'cardNumber') {
      value = formatCardNumber(value);
    } else if (name === 'expiry') {
      value = formatExpiry(value);
    }
  
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const isPaymentInfoComplete = 
    paymentInfo.cardNumber.replace(/\s/g, '').length === 16 &&
    paymentInfo.expiry.length === 5 &&
    paymentInfo.cvv.length === 3 &&
    paymentInfo.name.trim() !== ''

  const handlePurchase = () => {
    if (isPaymentInfoComplete) {
      const isValidCard = validateLuhn(paymentInfo.cardNumber.replace(/\s/g, ''))
      if (isValidCard) {
        setPurchaseComplete(true)
        setCardError('')
      } else {
        setCardError('La tarjeta de crédito ingresada no es válida.')
      }
    }
  }

  if (!movie) return <p>Película no encontrada.</p>

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">CineManager</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Image src={movie.image} alt={movie.title} width={300} height={450} className="h-48 w-full object-cover md:h-full md:w-48" />
            </div>
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
              <p className="text-gray-600 mb-4">{movie.genre} • {movie.duration}</p>
              <p className="text-gray-700 mb-4">{movie.description}</p>
            </div>
          </div>
        </div>

        {step === 'seats' && (
          <>
            <h2 className="text-2xl font-bold mt-8 mb-4">Selecciona tus asientos</h2>
            <div className="grid grid-cols-10 gap-2 mb-8">
              {seats.map((seat) => (
                <button
                  key={seat.id}
                  onClick={() => !seat.isOccupied && toggleSeat(seat.id)}
                  className={`p-2 rounded-md ${
                    seat.isOccupied 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : selectedSeats.includes(seat.id)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  disabled={seat.isOccupied}
                >
                  {seat.id}
                </button>
              ))}
            </div>
            <button 
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedSeats.length === 0}
              onClick={() => setStep('snacks')}
            >
              Continuar a Snacks
            </button>
          </>
        )}

        {step === 'snacks' && (
          <>
            <h2 className="text-2xl font-bold mt-8 mb-4">Selecciona tus snacks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {snacks.map((snack) => (
                <div key={snack.id} className="flex justify-between items-center bg-white p-4 rounded-md shadow">
                  <div>
                    <h3 className="font-semibold">{snack.name}</h3>
                    <p className="text-gray-600">${snack.price}</p>
                  </div>
                  <div className="flex items-center">
                    <button 
                      onClick={() => updateSnackQuantity(snack.id, (selectedSnacks[snack.id] || 0) - 1)}
                      className="px-2 py-1 bg-gray-200 rounded-l-md"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 bg-gray-100">{selectedSnacks[snack.id] || 0}</span>
                    <button 
                      onClick={() => updateSnackQuantity(snack.id, (selectedSnacks[snack.id] || 0) + 1)}
                      className="px-2 py-1 bg-gray-200 rounded-r-md"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              onClick={() => setStep('payment')}
            >
              Continuar al Pago
            </button>
          </>
        )}

        {step === 'payment' && !purchaseComplete && (
          <>
            <h2 className="text-2xl font-bold mt-8 mb-4">Información de Pago</h2>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="mb-4">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Número de Tarjeta</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentInfoChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  style={{ borderColor: '#D1D5DB' }}
                  required
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Fecha de Expiración</label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={paymentInfo.expiry}
                    onChange={handlePaymentInfoChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    style={{ borderColor: '#D1D5DB' }}
                    required
                    maxLength={5}
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={paymentInfo.cvv}
                    onChange={handlePaymentInfoChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    style={{ borderColor: '#D1D5DB' }}
                    required
                    maxLength={3}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre en la Tarjeta</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={paymentInfo.name}
                  onChange={handlePaymentInfoChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  style={{ borderColor: '#D1D5DB' }}
                  required
                />
              </div>
              {cardError && (
                <div className="text-red-500 mb-4">{cardError}</div>
              )}
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Resumen de compra</h3>
              <p>Asientos seleccionados: {selectedSeats.join(', ')}</p>
              <p>Snacks:</p>
              <ul>
                {Object.entries(selectedSnacks).map(([id, quantity]) => {
                  const snack = snacks.find(s => s.id === parseInt(id))
                  return quantity > 0 && (
                    <li key={id}>{snack!.name} x{quantity}: ${snack!.price * quantity}</li>
                  )
                })}
              </ul>
              <p className="mt-2 font-bold">Total: ${totalCost}</p>
            </div>
            <button 
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isPaymentInfoComplete}
              onClick={handlePurchase}
            >
              Confirmar Compra
            </button>
          </>
        )}

        {purchaseComplete && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8" role="alert">
            <p className="font-bold">Compra Exitosa</p>
            <p>Gracias por tu compra. ¡Disfruta la película!</p>
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