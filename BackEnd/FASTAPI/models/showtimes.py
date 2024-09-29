from pydantic import BaseModel, Field, conint
from typing import Optional
from datetime import date, datetime

class Showtimes(BaseModel):
    id_showtime: conint(gt=0)
    id_movies: conint(gt=0)
    id_room: conint(gt=0)
    date: date
    start_time: datetime
    duration: float
    show_type: str
    ticket_price: float
    capacity: int
    language: str
    show_status: int