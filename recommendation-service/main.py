from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_HOST = os.getenv("DB_HOST", "postgres-db")
DB_NAME = os.getenv("DB_NAME", "ticketflow_db")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "secret")

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:5432/{DB_NAME}"

engine = create_engine(DATABASE_URL)

@app.get("/")
def read_root():
    return {"message": "Servicio de Recomendaciones de TicketFlow"}

@app.get("/{user_id}")
def recommend_events(user_id: int):
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT id, name, descripcion, price FROM events LIMIT 3"))
            recommendations = []
            for row in result:
                recommendations.append({
                    "event_id": row.id,
                    "name": row.name,
                    "description": row.descripcion,
                    "price": row.price,
                    "reason": f"porque te podria gustar: {row.descripcion}"
                })

            return recommendations

    except Exception as e:
        print(f"Error DB: {e}")
        return {"error": str(e)}