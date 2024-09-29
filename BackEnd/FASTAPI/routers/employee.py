from fastapi import APIRouter, Path
from models.employees import Employees

router = APIRouter()

employees = [
    {
        "id_employee": 1,
        "first_name": "John",
        "last_name": "Doe",
        "second_last_name": "Smith",
        "phone_number": 3001234567,
        "email": "john.doe@example.com",
        "salary": 2500.50,
        "work_schedule": 40,
        "location": "Cartagena"
    },
    {
        "id_employee": 2,
        "first_name": "Ana",
        "last_name": "Garcia",
        "second_last_name": "Perez",
        "phone_number": 3009876543,
        "email": "ana.garcia@example.com",
        "salary": 3200.75,
        "work_schedule": 45,
        "location": "Bogotá"
    }
]#datos provisionales para employee

@router.get('/employees')
def get_employees():
    return employees

@router.get('/employees/{id_employee}')
def get_employees_id(id_employee: int = Path(gt=0)):
    return list(filter(lambda item: item ['id_employee'] == id_employee, employees))

@router.post('/employees')
def create_employee(employee: Employees):
    employees.append(employee)
    return employees

@router.put('/employees/{id_employee}')
def update_employee(id_employee: int, employee: Employees):
    for index, item in enumerate(employees):
        if item ['id_employee'] == id_employee:
            employees[index] = employee.model_dump()
            return employees[index]

@router.delete('/employees/{id_employee}')
def delete_employee(id_employee: int):
    for item in employees:
        if item['id_employee'] == id_employee:
            employees.remove(item)
            return employees