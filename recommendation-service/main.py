from fastapi import FastAPI
from sqlalchemy import create_engine, text
import os
app = FastAPI()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_NAME = os.getenv("DB_NAME", "ticketflow_db")
DB_USER = os.getenv("DB_USER", "root")
BD_PASSWORD = os.getenv("DB_PASSWORD", "secret")

DATABASE_URL = f"postgresql://{DB_USER}:{BD_PASSWORD}@{DB_HOST}:5432/{DB_NAME}"

engine = create_engine(DATABASE_URL)

@app.get("/")
def read_root():
    return {"message": "Servicio de Recomendaciones de TicketFlow"}

@app.get("/recommend/{user_id}")
def recommend_events(user_id: int):
    try:
        with engine.connect() as connection:
            result = connection.execute(text("Select id, name, descripcion, price FROM events LIMIT 3"))
            recommendations = []
            for row in result:
                recommendations.append({
                    "event_id": row.id,
                    "name": row.name,
                    "description": row.descripcion,
                    "price": row.price,
                    "reason":"Basado en tus gustos recientes"
                })

            return {
                "user_id": user_id,
                "recommendations": recommendations
            }
    except Exception as e:
        return{"error": str(e)}