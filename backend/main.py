from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pipeline import graphrag

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Question(BaseModel):
    question: str


@app.post("/ask")
def ask(data: Question):
    result = graphrag(data.question)

    if isinstance(result, dict):
        return {
            "answer": result.get("answer", ""),
            "reasoning": result.get("reasoning", ""),
            "evidence": result.get("evidence", []),
            "paths": result.get("paths", [])
        }

    return {
        "answer": str(result),
        "reasoning": "",
        "evidence": [],
        "paths": []
    }