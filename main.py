from fastapi import FastAPI, Request
import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import os
from starlette.responses import RedirectResponse

# uvicorn main:app --reload
app = FastAPI()

#
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://127.0.0.1:8000",  # Разрешаем фронтенд на порту 8001
#         "http://localhost:8000",   # Альтернативный адрес
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
#     expose_headers=["*"]
# )

# Настройка путей
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")
STATIC_DIR = os.path.join(BASE_DIR, "static")

# Монтируем статические файлы
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# Инициализация шаблонов
templates = Jinja2Templates(directory=TEMPLATES_DIR)

# Основные маршруты
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/courier", response_class=HTMLResponse)
async def read_courier(request: Request):
    return templates.TemplateResponse("courier.html", {"request": request})

@app.get("/courier-auth", response_class=HTMLResponse)
async def read_courier_auth(request: Request):
    return templates.TemplateResponse("courier-auth.html", {"request": request})

@app.get("/pokupatel", response_class=HTMLResponse)
async def read_customer(request: Request):
    return templates.TemplateResponse("pokupatel.html", {"request": request})

# Обработка статических файлов (если нужно)
@app.get("/{file_path:path}")
async def serve_static(file_path: str):
    static_file = os.path.join(STATIC_DIR, file_path)
    if os.path.exists(static_file):
        return FileResponse(static_file)
    return {"error": "File not found"}


# new
@app.get("/courier", response_class=HTMLResponse)
async def read_courier(request: Request, id: int = None):
    if not id:
        return RedirectResponse(url="/courier-auth")
    return templates.TemplateResponse("courier.html", {"request": request})

@app.get("/couriers/{courier_id}")
async def get_courier(courier_id: int):
    # Здесь должна быть логика получения данных курьера из БД
    # Примерный ответ:
    return {
        "id": courier_id,
        "type": "car",
        "districts": [12, 22, 33],
        "schedule": ["09:00-13:00", "14:00-18:00"],
        "rating": 4.8,
        "earnings": 12500
    }

@app.get("/couriers/{courier_id}/orders")
async def get_courier_orders(courier_id: int):
    # Здесь должна быть логика получения заказов курьера из БД
    # Примерный ответ:
    return [
        {
            "id": 456,
            "weight": 3.5,
            "district": 12,
            "delivery_hours": "10:00-12:00, 15:00-18:00",
            "status": "в процессе"
        },
        {
            "id": 789,
            "weight": 5,
            "district": 22,
            "delivery_hours": "10:00-12:00, 15:00-18:00",
            "status": "в процессе"
        }
    ]

@app.post("/orders/{order_id}/complete")
async def complete_order(order_id: int, data: dict):
    # Здесь должна быть логика завершения заказа
    return {"status": "success"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)  # <- Исправлено!