from pydantic import BaseModel, Field, conint
from typing import Optional
from datetime import date

class Movies(BaseModel):
    id_movies: conint(gt=0)
    title: str = Field(default="New movie", min_length=1, max_length=50)
    director_name: str = Field(default="Desconocido", min_length=1, max_length=50)
    release_date: date
    genre: str
    synopsis: Optional[str] = None
    rating: str
    score: Optional[float]
    distributor_name: str