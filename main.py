import json
import os
import io
import shutil
from datetime import datetime
from pprint import pprint
from typing import List, Dict
from uuid import uuid4
from PIL import Image
from fastapi import FastAPI, File, UploadFile, HTTPException, Path
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

from utils.frame_images import FrameFamily, FRAME_FAMILIES, SelectFrameRequest
from utils.factory import PictureFactory
from utils.config import API

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)
sessions: Dict[str, dict] = {}
MARGIN: int = 10


def update_session_meta(session_id: str, update_data: dict):
    meta_path = f'images/{session_id}/{session_id}.json'
    if not os.path.exists(meta_path):
        raise ValueError("Session không tồn tại")

    with open(meta_path, "r", encoding="utf-8") as f:
        session_meta = json.load(f)

    session_meta.update(update_data)

    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(session_meta, f, indent=4, ensure_ascii=False)

    if session_id in sessions:
        sessions[session_id].update(update_data)


@app.post("/sessions", status_code=201)
def create_session():
    session_id = str(uuid4())
    session_dir = f'images/{session_id}'
    os.makedirs(session_dir, exist_ok=True)
    session_meta = {
        "session_id": session_id,
        "created_at": datetime.now().isoformat(),
        "frame_family_id": None,
        "frame_option_id": None,
        "cols": None,
        "rows": None,
        "ratio": None,
        "frame_width": None,
        "frame_height": None,
        "photo_width": None,
        "photo_height": None
    }
    meta_path = os.path.join(session_dir, f"{session_id}.json")
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(session_meta, f, indent=4, ensure_ascii=False)
    sessions[session_id] = session_meta
    return JSONResponse(
        content={
            "session_id": session_id,
            "message": "Session was created successfully",
        }
    )


@app.get("/list-sessions")
def list_sessions():
    """
    List all sessions cùng metadata và danh sách ảnh đã upload.
    """
    session_dir = "images"
    session_list = []

    for session_id in os.listdir(session_dir):
        session_path = os.path.join(session_dir, session_id)
        if not os.path.isdir(session_path):
            continue

        meta_path = os.path.join(session_path, f"{session_id}.json")
        if not os.path.exists(meta_path):
            continue

        with open(meta_path, "r", encoding="utf-8") as f:
            session_meta = json.load(f)

        images = [f for f in os.listdir(session_path) if f.endswith(".jpg")]
        session_meta["images"] = images
        session_list.append(session_meta)

    return session_list


@app.get("/frames", response_model=List[FrameFamily])
def list_frame():
    """
    Return list of frames, and frame families
    """
    return list(FRAME_FAMILIES.values())


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

    photo_w = (family.width - (selected.cols + 1) * MARGIN) // selected.cols
    photo_h = (family.height - (selected.rows + 1) * MARGIN) // selected.rows
    ratio = photo_w / photo_h

    update_session_meta(session_id, {
        "frame_family_id": req.frame_family_id,
        "frame_option_id": req.frame_option_id,
        "cols": selected.cols,
        "rows": selected.rows,
        "ratio": ratio,
        "frame_width": family.width,
        "frame_height": family.height,
        "photo_width": photo_w,
        "photo_height": photo_h,
    })

    return JSONResponse(
        status_code=200,
        content={
            "message": "Đã chọn frame thành công",
            "session_id": session_id,
            "frame_family_id": req.frame_family_id,
            "frame_option_id": req.frame_option_id,
            "cols": selected.cols,
            "rows": selected.rows,
            "ratio": ratio,
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
            "url": f"{API}/images/{image_path}",
            "status": True
        }
    )


@app.post("/sessions/{session_id}/upload-photos")
async def upload_photos(
        session_id: str,
        files: List[UploadFile] = File(...)
):
    session_dir = f"images/{session_id}"
    save_selected = os.path.join(session_dir, "selected")
    os.makedirs(save_selected, exist_ok=True)
    if not os.path.exists(session_dir):
        raise HTTPException(404, "Session không tồn tại")

    uploaded_files = []
    for idx, file in enumerate(files):
        ext = os.path.splitext(file.filename)[-1].lower()
        filename = f"{idx + 1:02d}{ext}"
        file_path = os.path.join(save_selected, filename)
        data = await file.read()
        with open(file_path, "wb") as f:
            f.write(data)
        uploaded_files.append(filename)

    return JSONResponse(
        status_code=201,
        content={
            "message": f"Đã upload {len(uploaded_files)} ảnh thành công",
            "files": uploaded_files
        }
    )


@app.post("/sessions/{session_id}/compose", status_code=200)
def compose_images(
        session_id: str,
        file_list: List[str],
):
    session_dir = f"images/{session_id}"
    save_selected = os.path.join(session_dir, "selected")
    os.makedirs(save_selected, exist_ok=True)
    if not os.path.exists(session_dir):
        raise HTTPException(404, "Session không tồn tại")

    meta = sessions.get(session_id, {})
    cols = meta.get("cols")
    rows = meta.get("rows")
    frame_w = meta.get("frame_width")
    frame_h = meta.get("frame_height")
    print(meta)
    if not all([cols, rows, frame_w, frame_h]):
        raise HTTPException(400, "Session chưa chọn frame hoặc thiếu metadata")

    images = []
    for filename in file_list:
        img_path = os.path.join(save_selected, filename)
        if not os.path.exists(img_path):
            raise HTTPException(400, f"Ảnh {filename} không tồn tại")
        images.append(Image.open(img_path).convert("RGB"))

    factory = PictureFactory(
        images=images,
        frame_w=frame_w,
        frame_h=frame_h,
        layout=(cols, rows),
        margin=MARGIN
    )
    composed = factory.compose_photos()
    composed.save(f"{os.path.join(session_dir, "result.jpeg")}")

    buf = io.BytesIO()
    composed.save(buf, format="JPEG")
    buf.seek(0)
    return StreamingResponse(buf, media_type="image/jpeg")


@app.get("/sessions/{session_id}/download", response_class=FileResponse)
def download_composed_image(session_id: str = Path(..., description="Session ID")):
    """
    Trả về file JPEG đã ghép (result.jpeg) để client có thể download.
    """
    session_dir = f"images/{session_id}"
    result_path = os.path.join(session_dir, "result.jpeg")

    if not os.path.exists(session_dir):
        raise HTTPException(status_code=404, detail="Session không tồn tại")
    if not os.path.isfile(result_path):
        raise HTTPException(status_code=404, detail="Chưa có ảnh kết quả hoặc file bị thiếu")

    return FileResponse(
        path=result_path,
        media_type="image/jpeg",
        filename=f"{session_id}_result.jpeg"
    )


@app.post("/sessions/{session_id}/close")
def close_session(session_id: str):
    session_path = f'images/{session_id}'
    if os.path.exists(session_path):
        shutil.rmtree(session_path)
        return {"message": f"Session {session_id} closed and images deleted"}
    else:
        return {"message": "Session not found"}
