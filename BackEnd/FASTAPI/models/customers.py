from pydantic import BaseModel, EmailStr, conint
from typing import Optional

class Customers(BaseModel):
    id_customer: conint(gt=0)
    first_name: str 
    last_name: str
    second_last_name: str
    phone_number: conint()
    email: EmailStr
    points: conint(ge=0)
    movies_watched: conint(ge=0)
    snacks_purchased: conint(ge=0)
    money_spent: float
    two_factor_auth: bool
