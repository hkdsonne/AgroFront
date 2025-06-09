from fastapi import FastAPI, Request
import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.templating import Jinja2Templates
import os
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
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/courier", response_class=HTMLResponse)
async def read_courier(request: Request):
    return templates.TemplateResponse("courier.html", {"request": request})

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

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)  # <- Исправлено!