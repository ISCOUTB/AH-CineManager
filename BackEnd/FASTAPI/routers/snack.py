from fastapi import APIRouter, Path, Query
from models.snacks import Snacks

router = APIRouter()

snacks = [
    {
        "id_snack": 1,
        "name": "Gol",
        "price": 1200,
        "stock": 15
    },
    {
        "id_snack": 2,
        "name": "Jumbo",
        "price": 1500,
        "stock": 20
    }
]

@router.get ('/snacks')
def get_snacks():
    return snacks

@router.get('/snacks/{id_snack}')
def get_snacks_id(id_snack: int = Path(gt=0)):
    return list(filter(lambda item: item['id_snack'] == id_snack, snacks))

@router.post('/snacks')
def create_snack(snack: Snacks):
    snacks.append(snack)
    return snacks

@router.put('/snacks/{id_snack}')
def update_snack(id_snack: int, snack: Snacks):
    for index, item in enumerate(snacks):
        if item ['id_snack'] == id_snack:
            snacks[index] = snack.model_dump()
            return snacks[index]

@router.delete('/snacks/{id_employee}')
def delete_snack(id_snack: int):
    for item in snacks:
        if item['id_snack'] == id_snack:
            snacks.remove(item)
            return snacks