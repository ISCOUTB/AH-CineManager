from pydantic import BaseModel, Field, conint
from typing import Optional

class Snacks(BaseModel):
    id_snack: conint(gt=0)
    name: str = Field(min_length=1, max_length=100)
    price: float = Field(gt=0)
    stock: int = Field(ge=0)