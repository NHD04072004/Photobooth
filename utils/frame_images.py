from typing import List, Dict
from pydantic import BaseModel
from uuid import uuid4


class FrameOption(BaseModel):
    id: str
    label: str
    cols: int
    rows: int
    ratio: float


class FrameFamily(BaseModel):
    id: str
    label: str
    width: int
    height: int
    cols: int
    options: List[FrameOption]

class SelectFrameRequest(BaseModel):
    frame_family_id: str
    frame_option_id: str


# Khai báo các family và option
FRAME_FAMILIES: Dict[str, FrameFamily] = {
    "frame2x6": FrameFamily(
        id="frame2x6",
        label="Khung 2×6",
        width=600,
        height=1800,
        cols=1,
        options=[
            FrameOption(id=str(uuid4()), label="2×6 – 3 ảnh", cols=1, rows=3, ratio=0.9897610921501706),
            FrameOption(id=str(uuid4()), label="2×6 – 4 ảnh", cols=1, rows=4, ratio=1.3272311212814645),
        ],
    ),
    "frame4x6": FrameFamily(
        id="frame4x6",
        label="Khung 4×6",
        width=1200,
        height=1800,
        cols=2,
        options=[
            FrameOption(id=str(uuid4()), label="4×6 – 4 ảnh", cols=2, rows=2, ratio=0.6610169491525424),
            # FrameOption(id=str(uuid4()), label="4×6 – 5 ảnh", cols=2, rows=3, ratio=),
            FrameOption(id=str(uuid4()), label="4×6 – 6 ảnh", cols=2, rows=3, ratio=0.9982935153583617),
        ],
    ),
}
