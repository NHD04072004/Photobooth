from typing import List, Dict
from pydantic import BaseModel
from uuid import uuid4


class FrameOption(BaseModel):
    id: str
    label: str
    cols: int
    rows: int
    ratio: float  # cols/rows


class FrameFamily(BaseModel):
    id: str
    label: str
    options: List[FrameOption]

class SelectFrameRequest(BaseModel):
    frame_family_id: str
    frame_option_id: str


# Khai báo các family và option
FRAME_FAMILIES: Dict[str, FrameFamily] = {
    "frame2x6": FrameFamily(
        id="frame2x6",
        label="Khung 2×6",
        options=[
            FrameOption(id=str(uuid4()), label="2×6 – 3 ảnh", cols=1, rows=3, ratio=1/3),
            FrameOption(id=str(uuid4()), label="2×6 – 4 ảnh", cols=1, rows=4, ratio=1/4),
        ],
    ),
    "frame4x6": FrameFamily(
        id="frame4x6",
        label="Khung 4×6",
        options=[
            FrameOption(id=str(uuid4()), label="4×6 – 4 ảnh", cols=2, rows=2, ratio=2/2),
            FrameOption(id=str(uuid4()), label="4×6 – 5 ảnh", cols=2, rows=3, ratio=2/3),
            FrameOption(id=str(uuid4()), label="4×6 – 6 ảnh", cols=3, rows=2, ratio=3/2),
        ],
    ),
}
