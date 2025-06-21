import os
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn

IMAGES_DIR = os.path.join(os.path.dirname(__file__), "images")
os.makedirs(IMAGES_DIR, exist_ok=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/capture")
async def capture_image(file: UploadFile = File(...)):
    filename = file.filename
    save_path = os.path.join(IMAGES_DIR, filename)
    with open(save_path, "wb") as out_file:
        content = await file.read()
        out_file.write(content)
    return {"status": "success", "filename": filename}


@app.get("/hello")
async def hello():
    return "hello"


app.mount("/", StaticFiles(directory="../frontend", html=True), name="frontend")

if __name__ == '__main__':
    uvicorn.run("main:app", reload=True, host="127.0.0.1", port=8000)
