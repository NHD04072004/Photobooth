# Backend

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