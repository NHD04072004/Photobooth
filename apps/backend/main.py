import os
import json
import shutil
from typing import List
from uuid import uuid4
from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile, HTTPException, status
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/v1/sessions")
def create_session():
    session_id = str(uuid4())
    os.makedirs(f'images/{session_id}', exist_ok=True)
    return {"session_id": session_id, "message": "Session open", "status": True}


@app.post("/api/v1/sessions/{session_id}/capture")
async def capture_image(session_id: str, images: List[UploadFile] = File(...)):
    """
    API chụp ảnh, Gửi ảnh lên server
    """
    session_path = f"images/{session_id}"
    if not os.path.exists(session_path):
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Session did not started")

    saved_images = []
    for image in images:
        image_path = os.path.join(session_path, image.filename)
        with open(image_path, 'wb') as buffer:
            buffer.write(await image.read())
        saved_images.append(image_path)
        image.file.close()

    return {
        "status": True,
        "message": f"Saved {len(saved_images)} images"
    }


@app.get("/api/v1/sessions/{session_id}/images")
def get_all_images(session_id: str):
    session_path = f'images/{session_id}'
    if not os.path.exists(session_path):
        raise HTTPException(status_code=404, detail="Session not found")

    image_files = [
        f"/images/{session_id}/{filename}"
        for filename in os.listdir(session_path)
        if filename.lower().endswith((".png", ".jpg", ".jpeg", ".webp"))
    ]

    return {"images": image_files}


@app.get("/api/v1/sessions/{session_id}/images/{filename}/download")
def download_image(session_id: str, filename: str):
    file_path = f"images/{session_id}/{filename}"
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Image not found")

    return FileResponse(
        path=file_path,
        media_type="application/octet-stream",
        filename=filename
    )


@app.post("/api/v1/sessions/{session_id}/close")
def close_session(session_id: str):
    session_path = f'images/{session_id}'
    if os.path.exists(session_path):
        shutil.rmtree(session_path)
        return {"message": f"Session {session_id} closed and images deleted"}
    else:
        return {"message": "Session not found"}
