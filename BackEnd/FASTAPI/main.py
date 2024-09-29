from fastapi import FastAPI
from routers.movie import router as movies_router
from routers.employee import router as employees_router
from routers.customer import router as customers_router
from routers.snack import router as snacks_router
from routers.showtime import router as showtimes_router

app = FastAPI()

app.include_router(movies_router)
app.include_router(employees_router)
app.include_router(customers_router)
app.include_router(snacks_router)
app.include_router(showtimes_router)