from fastapi import APIRouter, UploadFile, File,Form
from app.services.file_service import upload_local, delete_local

router = APIRouter(prefix="/files", tags=["Files"])
from pydantic import BaseModel

class DeleteFileRequest(BaseModel):
    url: str

@router.post("/upload")
async def upload_file(file: UploadFile = File(...),path: str = Form(...)):
    url = await upload_local(file, folder="images",path=path)
    return {
        "success": True,
        "url": url 
    }  
 
@router.delete("/delete")
async def delete_file(payload: DeleteFileRequest): 
    delete_local(payload.url)
    return {
        "success": True,
        "message": "File deleted"
    }