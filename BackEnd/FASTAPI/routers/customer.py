from fastapi import APIRouter, Path
from models.customers import Customers

router = APIRouter()

customers = [
    {
        "id_customer": 1,
        "first_name": "John",
        "last_name": "Doe",
        "second_last_name": "Smith",
        "phone_number": 3001234567,
        "email": "john.doe@example.com",
        "puntos": 150,
        "peliculas_vistas": 10,
        "snacks_comprados": 5,
        "dinero_gastado": 100.50,
        "2FA": True
    },
    {
        "id_customer": 2,
        "first_name": "Ana",
        "last_name": "Garcia",
        "second_last_name": "Lopez",
        "phone_number": 3009876543,
        "email": "ana.garcia@example.com",
        "puntos": 200,
        "peliculas_vistas": 15,
        "snacks_comprados": 8,
        "dinero_gastado": 250.75,
        "2FA": False
    }
]#datos provisionales para customer


@router.get('/customers')
def get_customers():
    return customers

@router.get('/customers/{id_customer}')
def get_customers_id(id_customer: int = Path(gt=0)):
    return list(filter(lambda item: item['id_customer'] == id_customer, customers))

@router.post('/customers')
def create_customer(customer: Customers):
    customers.append(customer)
    return customers

@router.put('/customers/{id_customer}')
def update_customer(id_customer: int, customer: Customers):
    for index, item in enumerate(customers):
        if item['id_customer'] == id_customer:
            customers[index] = customer.model_dump()
            return customers[index]

@router.delete('/customers/{id_customer}')
def delete_customer(id_customer: int):
    for item in customers:
        if item['id_customer'] == id_customer:
            customers.remove(item)
            return customers