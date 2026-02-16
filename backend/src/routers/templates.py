from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, cast, String
from src.db import get_async_session, Template
from src.schemas import TemplateSchema, UpdateTemplates
import uuid

router = APIRouter(
    prefix='/templates',
    tags=['Templates']
)

@router.post('/')
async def upload_templates(templates:TemplateSchema, session: AsyncSession = Depends(get_async_session)):
    try:
        new_template = Template(
        title = templates.title,
        template_type = templates.template_type,
        description = templates.description,
        features = templates.features,
        content = templates.content,
        downloadLink = templates.downloadLink,
        slug = templates.slug
        )

        session.add(new_template)
        await session.commit()
        await session.refresh(new_template)

        return new_template
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get('/')
async def get_templates(session: AsyncSession = Depends(get_async_session)):

    result = await session.execute(select(Template).order_by(Template.create_at.desc()))
    templates = [row[0] for row in result.all()]

    template_data = []
    for template in templates:
        template_data.append(
            {
                'id':template.id,
                'title':template.title,
                'template_type':template.template_type,
                'description':template.description,
                'features':template.features,
                'content':template.content,
                'downloadLink':template.downloadLink,
                'slug':template.slug,
                'views':template.views,
                'date':template.create_at,
            }
        )

    return {'templates': template_data}

@router.get('/display')
async def display_data(session: AsyncSession = Depends(get_async_session)):
    response = await get_templates(session=session)
    template_list = response['templates']

    dataList = []
    for data in template_list:
        dataList.append({
            'title':data['title'],
            'type':data['template_type'],
            'description':data['description'],
            'features':data['features'],
            'content':data['content'],
            'downloadLink':data['downloadLink'],
            'previewLink':data['slug'],
        })

    return {'templatesData': dataList}

@router.get('/slug/{slug:path}')
async def get_template_by_slug(slug: str, session: AsyncSession = Depends(get_async_session)):
    try:
        result = await session.execute(select(Template).where(Template.slug == slug))
        template = result.scalars().first()
        if not template:
            raise HTTPException(status_code=404, detail='Template not Found')
        return {
            'id': str(template.id),
            'title': template.title,
            'template_type': template.template_type,
            'description': template.description,
            'features': template.features,
            'content': template.content,
            'slug': template.slug,
            'downloadLink': template.downloadLink,
            'date': template.create_at,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get('/search')
async def search_templates(query: str, session: AsyncSession = Depends(get_async_session)):
    try:
        search_filter = f'%{query}%'
        stmt = select(Template).where(
            or_(
                Template.title.ilike(search_filter),
                Template.template_type.ilike(search_filter),
                Template.description.ilike(search_filter),
                cast(Template.features, String).ilike(search_filter)
            )
        )
        result = await session.execute(stmt)
        templates = result.scalars().all()

        return templates
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete('/{template_id}')
async def delete_template(template_id: str, session: AsyncSession = Depends(get_async_session)):
    try:
        template_uuid = uuid.UUID(template_id)

        result = await session.execute(select(Template).where(Template.id == template_uuid))
        template = result.scalars().first()

        if not template:
            raise HTTPException(status_code=404, detail='Template not Found')
        
        await session.delete(template)
        await session.commit()

        return {'success': True, 'message': "Template Deleted Successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.patch('/{template_id}')
async def update_template(updateTemplates: UpdateTemplates, template_id: str, session: AsyncSession = Depends(get_async_session)):
    try:
        template_uuid = uuid.UUID(template_id)

        result = await session.execute(select(Template).where(Template.id == template_uuid))
        template = result.scalars().first()

        if not template:
            raise HTTPException(status_code=404, detail='Template not Found')
        
        update_data = updateTemplates.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(template, key, value)
        
        await session.commit()
        await session.refresh(template)
        return template
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
