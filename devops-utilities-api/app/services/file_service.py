from fastapi import UploadFile, HTTPException
from pathlib import Path
import uuid

UPLOAD_DIR = Path("static/uploads")
ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]
MAX_SIZE_MB = 5


async def upload_local(file: UploadFile, folder: str = "images", path: str = "") -> str:

    # File object check
    if not file or not file.filename:
        raise HTTPException(
            status_code=422,
            detail={"errors": {"file": "No file provided"}}
        )

    # Extension check
    ext = Path(file.filename).suffix.lower()
    if not ext:
        raise HTTPException(
            status_code=422,
            detail={"errors": {"file": "File has no extension"}}
        )

    # Type check
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=422,
            detail={"errors": {"file": f"Invalid file type '{file.content_type}'. Allowed: JPG, PNG, WEBP, GIF"}}
        )

    # Read
    contents = await file.read()

    # Empty file check
    if len(contents) == 0:
        raise HTTPException(
            status_code=422,
            detail={"errors": {"file": "File is empty"}}
        )

    # Size check
    size_mb = len(contents) / (1024 * 1024)
    if size_mb > MAX_SIZE_MB:
        raise HTTPException(
            status_code=422,
            detail={"errors": {"file": f"File size {size_mb:.1f}MB exceeds max {MAX_SIZE_MB}MB"}}
        )

    # Folder banana
    try:
        save_dir = UPLOAD_DIR / folder / path
        save_dir.mkdir(parents=True, exist_ok=True)
    except Exception:
        raise HTTPException(
            status_code=500,
            detail={"errors": {"file": f"Could not create upload directory '{folder}/{path}'"}}
        )

    # Save
    filename = f"{uuid.uuid4().hex}{ext}"
    save_path = save_dir / filename

    try:
        with open(save_path, "wb") as f:
            f.write(contents)
    except Exception:
        raise HTTPException(
            status_code=500,
            detail={"errors": {"file": "Failed to save file"}}
        )

    url = f"/static/uploads/{folder}/{path}/{filename}" if path else f"/static/uploads/{folder}/{filename}"
    return url


def delete_local(url: str) -> None:
    if not url:
        raise HTTPException(
            status_code=400,
            detail={"errors": {"url": "No URL provided"}}
        )

    relative = url.lstrip("/")
    file_path = Path(relative)

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail={"errors": {"url": f"File not found: {url}"}}
        )

    try:
        file_path.unlink()
    except Exception:
        raise HTTPException(
            status_code=500,
            detail={"errors": {"url": "Failed to delete file"}}
        )