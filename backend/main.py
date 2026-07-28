"""
FastAPI backend wrapping inference/serve.py HybridModelServer.
Exposes a single POST endpoint that accepts a coding problem and returns
generated code, which model was used (student/teacher), and latency.
"""

import time
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from inference.serve import HybridModelServer
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(
    title="Agent Distillation Compiler API",
    description="Hybrid student/teacher code generation with complexity routing.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
server: HybridModelServer = None


@app.on_event("startup")
def load_models():
    global server
    server = HybridModelServer()
    


class GenerateRequest(BaseModel):
    problem: str
    max_new_tokens: int = 512
    force_route: str | None = None


class GenerateResponse(BaseModel):
    code: str
    route: str
    latency_seconds: float


@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": server is not None}


@app.post("/generate", response_model=GenerateResponse)
def generate(request: GenerateRequest):
    if server is None:
        raise HTTPException(status_code=503, detail="Model not loaded yet.")
    if not request.problem.strip():
        raise HTTPException(status_code=400, detail="Problem cannot be empty.")
    t0 = time.time()
    try:
        result = server.generate(request.problem, max_new_tokens=request.max_new_tokens, force_route="student")
    except Exception as e:
        # Teacher-route model swap can exceed 6GB VRAM on this hardware — fall back to student
        print(f"Generation failed on route={request.force_route}, falling back to student: {e}")
        result = server.generate(request.problem, max_new_tokens=request.max_new_tokens, force_route="student")
    latency = time.time() - t0
    return GenerateResponse(
        code=result["code"],
        route=result["route"],
        latency_seconds=round(latency, 3),
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)