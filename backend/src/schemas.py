from pydantic import BaseModel
from fastapi_users import schemas
from typing import Optional
import uuid

class UserRead(schemas.BaseUser[uuid.UUID]):
    username: str
    pass

class UserCreate(schemas.BaseUserCreate):
    username: str
    pass

class UserUpdate(schemas.BaseUserUpdate):
    username: Optional[str] = None
    pass

class ProjectSchema(BaseModel):
    title: str
    description: str
    technologies: list
    content: str
    slug: str

class UpdateProjects(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    technologies: Optional[list] = None
    content: Optional[str] = None
    slug: Optional[str] = None

class BlogScheam(BaseModel):
    title: str
    excerpt: str
    imagePlaceholder: str
    content: str
    slug: str

class UpdateBlogs(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    imagePlaceholder: Optional[str] = None
    content: Optional[str] = None
    slug: Optional[str] = None

class TemplateSchema(BaseModel):
    title: str
    template_type: str
    description: str
    features: list
    content: str
    downloadLink: str
    slug: str

class UpdateTemplates(BaseModel):
    title: Optional[str] = None
    template_type: Optional[str] = None
    description: Optional[str] = None
    features: Optional[list] = None
    content: Optional[str] = None
    downloadLink: Optional[str] = None
    slug: Optional[str] = None


class MessageSchema(BaseModel):
    name: str
    email: str
    subject: str
    message: str
