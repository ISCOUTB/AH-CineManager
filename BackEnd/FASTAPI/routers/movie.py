from fastapi import APIRouter, Path, Query
from models.movies import Movies

router = APIRouter()

movies = [
    {
        "id_movies": 1,
        "title": "Inception",
        "director_name": "Christopher Nolan",
        "release_date": "2010-07-16",
        "genre": "Science Fiction",
        "synopsis": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
        "rating": "PG-13",
        "score": 8.8,
        "distributor_name": "Warner Bros."
    },
    {
        "id_movies": 2,
        "title": "interestellar",
        "director_name": "Christopher Nolan",
        "release_date": "2013-07-16",
        "genre": "Science Fiction",
        "synopsis": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
        "rating": "PG-13",
        "score": 9.8,
        "distributor_name": "Warner Bros."
    }
] #datos provisionales para movies

@router.get('/movies')
def get_movies():
    return movies

@router.get('/movies/{id_movies}')
def get_movies_id(id_movies: int = Path(gt=0)):
    return list(filter(lambda item: item['id_movies'] == id_movies, movies))

@router.post('/movies')
def create_movie(movie: Movies):
    movies.append(movie)
    return movies

@router.put('/movies/{id_movies}')
def update_movie(id_movies: int, movie: Movies):
    for index, item in enumerate(movies):
        if item ['id_movies'] == id_movies:
            movies[index] = movie.model_dump()
            return movies[index]

@router.delete('/movies/{id_movies}')
def delete_movie(id_movies: int):
    for item in movies:
        if item['id_movies'] == id_movies:
            movies.remove(item)
            return movies