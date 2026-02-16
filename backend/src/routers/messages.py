from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.db import get_async_session, Message
from src.schemas import MessageSchema
import uuid

router = APIRouter(
    prefix='/messages',
    tags=['Messages']
)


@router.post('/')
async def create_message(msg: MessageSchema, session: AsyncSession = Depends(get_async_session)):
    try:
        new_msg = Message(
            name=msg.name,
            email=msg.email,
            subject=msg.subject,
            message=msg.message,
        )
        session.add(new_msg)
        await session.commit()
        await session.refresh(new_msg)
        return {'success': True, 'message': 'Message sent successfully', 'id': str(new_msg.id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get('/')
async def get_messages(session: AsyncSession = Depends(get_async_session)):
    result = await session.execute(select(Message).order_by(Message.create_at.desc()))
    messages = [row[0] for row in result.all()]

    messages_data = []
    for m in messages:
        messages_data.append({
            'id': str(m.id),
            'name': m.name,
            'email': m.email,
            'subject': m.subject,
            'message': m.message,
            'date': m.create_at,
        })

    return {'messages': messages_data}


@router.delete('/{message_id}')
async def delete_message(message_id: str, session: AsyncSession = Depends(get_async_session)):
    try:
        msg_uuid = uuid.UUID(message_id)

        result = await session.execute(select(Message).where(Message.id == msg_uuid))
        msg = result.scalars().first()

        if not msg:
            raise HTTPException(status_code=404, detail='Message not found')

        await session.delete(msg)
        await session.commit()

        return {'success': True, 'message': 'Message deleted successfully'}
    except ValueError:
        raise HTTPException(status_code=400, detail='Invalid message ID')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
