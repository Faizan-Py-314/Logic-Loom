from fastapi import FastAPI
import uvicorn
from src.db import create_db_and_tables
from src.schemas import UserRead, UserCreate, UserUpdate
from contextlib import asynccontextmanager
from src.users import fastapi_users, current_active_user, auth_backend
from src.routers.projects import router as project_router
from src.routers.blogs import router as blog_router
from src.routers.templates import router as template_router
from src.routers.messages import router as message_router
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan, debug=True)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://logicloom.qzz.io"
    # Add more origins here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(fastapi_users.get_auth_router(auth_backend), prefix='/auth/jwt', tags=['auth'])
app.include_router(fastapi_users.get_register_router(UserRead, UserCreate), prefix='/auth', tags=['auth'])
# app.include_router(fastapi_users.get_verify_router(UserRead), prefix='/auth', tags=['auth'])
# app.include_router(fastapi_users.get_reset_password_router(), prefix='/auth', tags=['auth'])
# app.include_router(fastapi_users.get_users_router(UserRead, UserUpdate), prefix='/users', tags=['users'])

app.include_router(project_router)
app.include_router(blog_router)
app.include_router(template_router)
app.include_router(message_router)


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)

