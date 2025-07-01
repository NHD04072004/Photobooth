import os
import json
import shutil
from pprint import pprint
from typing import List, Dict
from uuid import uuid4
from fastapi import FastAPI, File, UploadFile, HTTPException, Path
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from utils.frame_images import FrameFamily, FRAME_FAMILIES, SelectFrameRequest

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)
sessions: Dict[str, dict] = {}


@app.post("/sessions", status_code=201)
def create_session():
    session_id = str(uuid4())
    os.makedirs(f'images/{session_id}', exist_ok=True)
    return JSONResponse(
        content={
            "session_id": session_id,
            "message": "Session created successfully",
        }
    )


@app.get("/frames/", response_model=List[FrameFamily])
def list_frame_families():
    """
    Return list of frames, and frame families
    """
    return list(FRAME_FAMILIES.values())


@app.get("/frames/{frame_family_id}", response_model=FrameFamily)
def get_frame_family(frame_family_id: str):
    """
    Return frame detail
    """
    family = FRAME_FAMILIES.get(frame_family_id)
    if not family:
        raise HTTPException(status_code=404, detail="Frame family không tồn tại")
    return family


@app.post("/sessions/{session_id}/select-frame")
def select_frame(session_id: str, req: SelectFrameRequest):
    session_dir = f'images/{session_id}'
    options = FRAME_FAMILIES[req.frame_family_id].options
    family = FRAME_FAMILIES[req.frame_family_id]
    selected = next((opt for opt in options if opt.id == req.frame_option_id), None)
    if not os.path.exists(session_dir):
        raise HTTPException(status_code=404, detail="Session không tồn tại")
    if req.frame_family_id not in FRAME_FAMILIES:
        raise HTTPException(status_code=404, detail="Frame family không hợp lệ")
    if not selected:
        raise HTTPException(status_code=400, detail="Frame option không hợp lệ cho family này")

    photo_w = family.width // selected.cols
    photo_h = family.height // selected.rows

    return JSONResponse(
        status_code=200,
        content={
            "message": "Đã chọn frame thành công",
            "session_id": session_id,
            "frame_family_id": req.frame_family_id,
            "frame_option_id": req.frame_option_id,
            "cols": selected.cols,
            "rows": selected.rows,
            "ratio": selected.ratio,
            "frame_width": family.width,
            "frame_height": family.height,
            "photo_width": photo_w,
            "photo_height": photo_h
        }
    )


@app.post("/sessions/{session_id}/capture")
async def capture_image(session_id: str = Path(..., description="Session ID"), image: UploadFile = File(...)):
    """
    API chụp ảnh, Gửi ảnh lên server
    """
    session_path = f"images/{session_id}"
    if not os.path.exists(session_path):
        raise HTTPException(status_code=404, detail="Session ID not found")
    image_path = os.path.join(session_path, image.filename)
    with open(image_path, 'wb') as buffer:
        buffer.write(await image.read())
    image.file.close()

    return JSONResponse(
        content={
            "filename": image.filename,
            "url": image_path,
            "status": True
        }
    )


@app.get("/sessions/{session_id}/images")
def list_images(session_id: str):
    folder_path = f'images/{session_id}'
    if not os.path.exists(folder_path):
        raise HTTPException(status_code=404, detail="Session not found")

    image_files = [f for f in os.listdir(folder_path) if f.endswith(".jpg")]
    image_urls = [f"http://localhost:8000/images/{session_id}/{img}" for img in image_files]

    return {"images": image_urls}


@app.get("/images/{session_id}/{filename}")
def get_image(session_id: str, filename: str):
    file_path = f'images/{session_id}/{filename}'
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Image not found")
    return FileResponse(file_path)


@app.get("/sessions/{session_id}/images/{filename}/download")
def download_image(session_id: str, filename: str):
    file_path = f"images/{session_id}/{filename}"
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Image not found")

    return FileResponse(
        path=file_path,
        media_type="application/octet-stream",
        filename=filename
    )


@app.post("/sessions/{session_id}/close")
def close_session(session_id: str):
    session_path = f'images/{session_id}'
    if os.path.exists(session_path):
        shutil.rmtree(session_path)
        return {"message": f"Session {session_id} closed and images deleted"}
    else:
        return {"message": "Session not found"}
