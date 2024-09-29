from pydantic import BaseModel, EmailStr, conint
from typing import Optional

class Employees(BaseModel):
    id_employee: conint(gt=0)
    first_name: str
    last_name: str
    second_last_name: str
    phone_number: conint()
    email: EmailStr
    salary: float
    work_schedule: int
    location: str