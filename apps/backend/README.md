# Backend

- Concatenate images: go to file `utils/factory.py` and add your images here
```python
imgs = [
    load_image("hinhanh1.jpg", (600, 800)),
    load_image("hinhanh2.jpeg", (600, 800)),
]
```
- Then run your script, `output_collage.jpg` is output
```commandline
python factory.py
```

- Build docker

```commandline
docker build -t dock .
```

- Run docker

```commandline
docker run -p 8000:8000 dock
```

### API

- Lưu ảnh local `localhost:8000/api/v1/sessions/{session_id}/capture`
- Lấy tất cả các ảnh đã chụp `localhost:8000/api/v1/sessions/{session_id}/images`
- Đóng session `/api/v1/sessions/{session_id}/close`