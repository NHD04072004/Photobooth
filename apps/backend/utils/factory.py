import os
import cv2
import logging
import numpy as np
from typing import Tuple, List
from PIL import Image

logger = logging.getLogger(__name__)


class PictureFactory:
    def __init__(self, images: List[Image.Image], frame_w: int, frame_h: int, layout: Tuple[int, int], margin: int = 0):
        """
        params
            images: List of image
            frame_w: width of real frame
            frame_h: height of real frame
            layout(cols, rows): layout image what you want. E.g: 4 images stack in 2x6 frame
            margin: space between images
        """
        self.frame_w = frame_w
        self.frame_h = frame_h
        self.cols, self.rows = layout
        self.images = images
        self.margin = margin
        self.overlay_path = None
        self.background_color = (255, 255, 255)
        self.background_image = None

    def _image_resize_keep_ratio(self, image, frame_w, frame_h):
        """Resize an image to fixed dimensions while keeping its aspect ratio."""
        inter = cv2.INTER_AREA
        height, width = image.shape[:2]

        source_aspect_ratio = float(width) / height
        target_aspect_ratio = float(frame_w) / frame_h

        if source_aspect_ratio <= target_aspect_ratio:
            h_cropped = int(width / target_aspect_ratio)
            x_offset = 0
            y_offset = int((float(height) - h_cropped) / 2)
            cropped = image[y_offset:(y_offset + h_cropped), x_offset:width]
        else:
            w_cropped = int(height * target_aspect_ratio)
            x_offset = int((float(width) - w_cropped) / 2)
            y_offset = 0
            cropped = image[y_offset:height, x_offset:(x_offset + w_cropped)]
        image = cv2.resize(cropped, (frame_w, frame_h), interpolation=inter)
        return image, image.shape[1], image.shape[0]

    def build_background(self):
        if self.background_image:
            bg = cv2.cvtColor(cv2.imread(self.background_image), cv2.COLOR_BGR2RGB)
            image, _, _ = self._image_resize_keep_ratio(bg, self.frame_w, self.frame_h)
        else:
            if self.background_color[0] == self.background_color[1] and self.background_color[1] == \
                    self.background_color[2]:
                image = np.full((self.frame_h, self.frame_w, 3), self.background_color[0], np.uint8)
            else:
                image = np.zeros((self.frame_h, self.frame_w, 3), np.uint8)
                image[:] = (self.background_color[0], self.background_color[1], self.background_color[2])

        return image

    def compose_photos(self) -> Image.Image:
        """
        Concatenate list images into matrix canvas cols x rows.
        """
        # bg = self.build_background()
        # bg = Image.fromarray(bg)
        canvas = Image.new("RGB", (self.frame_w, self.frame_h))
        # thumb_w = self.frame_w // self.cols
        # thumb_h = self.frame_h // self.rows
        thumb_w = (self.frame_w - (self.cols + 1) * self.margin) // self.cols
        thumb_h = (self.frame_h - (self.rows + 1) * self.margin) // self.rows
        print(thumb_w, thumb_h)

        for idx, img in enumerate(self.images):
            if idx >= self.cols * self.rows:
                break
            thumb = img.resize((thumb_w, thumb_h))
            col = idx % self.cols
            row = idx // self.cols
            x = self.margin + col * (thumb_w + self.margin)
            y = self.margin + row * (thumb_h + self.margin)
            canvas.paste(thumb, (x, y))
            logger.info(f"Done image {idx}")

        if self.overlay_path and os.path.exists(self.overlay_path):
            overlay = Image.open(self.overlay_path).convert("RGBA").resize((self.frame_w, self.frame_h))
            canvas = Image.alpha_composite(canvas.convert("RGBA"), overlay)

        return canvas.convert("RGB")


if __name__ == "__main__":
    os.makedirs("test_outputs", exist_ok=True)

    photos = [
        "utils/20250628T063635.jpg",
        "utils/20250628T063636.jpg",
        "utils/20250628T063638.jpg",
        "utils/20250628T063639.jpg",
        # "utils/20250628T063637.jpg"
    ]
    photos = [Image.open(photo) for photo in photos]
    # 2x6: width = 300, height: 900
    # 4x6: width = 600, height: 900
    # => theo tỉ lệ mà nhân lên, theo khổ giấy thực
    # layout = (col, row)
    factory = PictureFactory(photos, 300, 900, (1, 4), 3)
    composed = factory.compose_photos()
    composed.save("test_outputs/test_compose.jpg")
    print("→ Đã lưu test_compose.jpg")
