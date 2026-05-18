from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.agendamento_routes import router

from app.core.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Barbearia API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def home():

    return {"message": "API Barbearia Online"}
