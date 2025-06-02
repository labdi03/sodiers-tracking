from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Allow frontend access (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to Soldiers Tracking API"}


@app.post('/send_position')
async def send_position(data):
    print(data)
    return 


@app.on_event("startup")
def log_routes():
    print("Available routes:")
    for route in app.routes:
        print(f"{route.path} - {route.methods}")
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)