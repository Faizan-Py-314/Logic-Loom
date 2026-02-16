from collections.abc import AsyncGenerator
import uuid

from sqlalchemy import Column, String, Integer, Text, DateTime, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from datetime import datetime
from fastapi_users.db import SQLAlchemyUserDatabase, SQLAlchemyBaseUserTableUUID
from fastapi import Depends

DATABASE_URL = 'sqlite+aiosqlite:///./database.db'
# DATABASE_URL = 'sqlite+asyncpg:///./database.db'

class Base(DeclarativeBase):
    pass

class User(SQLAlchemyBaseUserTableUUID, Base):
    username = Column(String, unique=True, nullable=False)

class Blog(Base):
    __tablename__ = 'blogs'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    excerpt = Column(String, nullable=False)
    imagePlaceholder = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    views = Column(Integer, default=0)
    create_at = Column(DateTime, default=datetime.utcnow)

class Project(Base):
    __tablename__ = 'projects'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    technologies = Column(JSON, nullable=False)
    content = Column(Text, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    views = Column(Integer, default=0)
    create_at = Column(DateTime, default=datetime.utcnow)

class Template(Base):
    __tablename__ = 'templates'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    template_type = Column(String, nullable=False)
    description = Column(String, nullable=False)
    features = Column(JSON, nullable=False)
    content = Column(Text, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    views = Column(Integer, default=0)
    downloadLink = Column(String, nullable=False)
    create_at = Column(DateTime, default=datetime.utcnow)


class Message(Base):
    __tablename__ = 'messages'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    create_at = Column(DateTime, default=datetime.utcnow)


engine = create_async_engine(DATABASE_URL)
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)

async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session

async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)
