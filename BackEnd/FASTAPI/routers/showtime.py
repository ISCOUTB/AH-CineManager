from fastapi import APIRouter, HTTPException
from models import movies
from models.showtimes import Showtimes

router = APIRouter()

showtimes = [
    {
  "id_showtime": 1,
  "id_movies": 1,
  "id_room": 1,
  "date": "2024-09-28",
  "start_time": "2024-09-28T04:05:15",
  "duration": 120,
  "show_type": "2D",
  "ticket_price": 10.99,
  "capacity": 100,
  "language": "English",
  "show_status": 1
    },
    {
  "id_showtime": 2,
  "id_movies": 1,
  "id_room": 2,
  "date": "2024-09-28",
  "start_time": "04:05:15",
  "duration": 130,
  "show_type": "3D",
  "ticket_price": 11.99,
  "capacity": 100,
  "language": "English",
  "show_status": 1
    },
]

#validar si la pelicula existe
def find_movie(id_movies: int) -> bool:
    return any(movie["id_movies"] == id_movies for movie in movies)

@router.get('/showtimes')
def get_showtimes():
    return showtimes

@router.get('/showtimes/{id_showtime}') 
def get_showtime_id(id_showtime: int):
    result  = list(filter(lambda item: item ['id_showtime'] == id_showtime, showtimes))
    if not result:
        raise HTTPException(status_code=404, detail="Showtime not found")
    return result[0]

@router.post('/showtimes') #error a revisar
def create_showtime(showtime: Showtimes): 
    if not find_movie(showtime.id_movies):
        raise HTTPException(status_code=400, detail="Movie not found")
    showtimes.append(showtime)
    return showtimes

@router.put('/showtimes/{id_showtime}') #error a revisar
def update_showtime(id_showtime: int, updated_showtime: Showtimes):
    for index, showtime in enumerate(showtimes):
        if showtime["id_showtime"] == id_showtime:
            if not find_movie(updated_showtime.id_movies):
                raise HTTPException(status_code=400, detail="Movie not found")
            showtimes[index] = updated_showtime.model_dump()
            return updated_showtime
    raise HTTPException(status_code=404, detail="Showtime not found")

@router.delete('/showtimes/{id_showtime}')
def delete_showtime(id_showtime: int):
    for item in showtimes:
        if item['id_showtime'] == id_showtime:
            showtimes.remove(item)
            return {"message": "Showtime deleted successfully", "remaining_showtines":showtimes}
    raise HTTPException(status_code=404, detail="Showtime not found")