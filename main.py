import httpx
from fastapi import FastAPI, Request, HTTPException
import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import os
from starlette.responses import RedirectResponse

# uvicorn main:app --reload
app = FastAPI()

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
def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/courier", response_class=HTMLResponse)
def read_courier(request: Request):
    return templates.TemplateResponse("courier.html", {"request": request})

@app.get("/courier-auth", response_class=HTMLResponse)
def read_courier_auth(request: Request):
    return templates.TemplateResponse("courier-auth.html", {"request": request})

@app.get("/pokupatel", response_class=HTMLResponse)
def read_customer(request: Request):
    return templates.TemplateResponse("pokupatel.html", {"request": request})

# Обработка статических файлов (если нужно)
@app.get("/{file_path:path}")
def serve_static(file_path: str):
    static_file = os.path.join(STATIC_DIR, file_path)
    if os.path.exists(static_file):
        return FileResponse(static_file)
    return {"error": "File not found"}


# new
# @app.get("/courier", response_class=HTMLResponse)
# async def read_courier(request: Request, id: int = None):
#     if not id:
#         return RedirectResponse(url="/courier-auth")
#     return templates.TemplateResponse("courier.html", {"request": request})
#
# @app.get("/couriers/{courier_id}")
# async def get_courier(courier_id: int):
#     # Здесь должна быть логика получения данных курьера из БД
#     # Примерный ответ:
#     return {
#         "id": courier_id,
#         "type": "car",
#         "districts": [12, 22, 33],
#         "schedule": ["09:00-13:00", "14:00-18:00"],
#         "rating": 4.8,
#         "earnings": 12500
#     }


# Основные маршруты
@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/courier-auth", response_class=HTMLResponse)
def read_courier_auth(request: Request):
    return templates.TemplateResponse("courier-auth.html", {"request": request})

@app.get("/courier", response_class=HTMLResponse)
async def read_courier(request: Request, id: int = None):
    if not id:
        return RedirectResponse(url="/courier-auth")
    # Получаем данные курьера с бэкенда
    async with httpx.AsyncClient() as client:
        response = await client.get(f"http://127.0.0.1:8000/couriers/{id}")
        if response.status_code != 200:
            raise HTTPException(status_code=404, detail="Courier not found")
        courier_data = response.json()

    return templates.TemplateResponse("courier.html", {"request": request, "id": id, "courier": courier_data})

@app.post("/login")
async def login(request: Request):
    form_data = await request.form()
    courier_id = form_data.get("courier-id")
    if not courier_id:
        raise HTTPException(status_code=400, detail="Courier ID is required")

    # Перенаправляем на страницу курьера с ID
    return RedirectResponse(url=f"/courier?id={courier_id}", status_code=303)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)  # <- Исправлено!