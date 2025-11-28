from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Bienvenido al Servicio de Recomendaciones"}

@app.get("/recommend/{user_id}")
def recommend_events(user_id: int):
    return{
        "user_id": user_id,
        "recomended_events":[
            {"id": 101, "name": "Concierto de Rock", "confidence": "95%"},
            {"id": 202, "name": "Feria Tecnológica", "confidence": "80%"}
        ]
    }