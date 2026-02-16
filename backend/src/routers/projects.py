from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, cast, String
from src.db import get_async_session, Project
from src.schemas import ProjectSchema, UpdateProjects
import uuid

router = APIRouter(
    prefix='/projects',
    tags=['Projects']
)

@router.post('/')
async def upload_projects(projects:ProjectSchema, session: AsyncSession = Depends(get_async_session)):
    try:
        new_project = Project(
        title = projects.title,
        description = projects.description,
        technologies = projects.technologies,
        content = projects.content,
        slug = projects.slug,
        )

        session.add(new_project)
        await session.commit()
        await session.refresh(new_project)

        return new_project
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get('/')
async def get_projects(session: AsyncSession = Depends(get_async_session)):

    result = await session.execute(select(Project).order_by(Project.create_at.desc()))
    projects = [row[0] for row in result.all()]

    projects_data = []
    for project in projects:
        projects_data.append(
            {
                'id':project.id,
                'title':project.title,
                'description':project.description,
                'technologies':list(project.technologies),
                'content':project.content,
                'slug':project.slug,
                'views':project.views,
                'date':project.create_at,
            }
        )

    return {'projects': projects_data}

@router.get('/display')
async def display_data(session: AsyncSession = Depends(get_async_session)):
    response = await get_projects(session=session)
    project_list = response['projects']

    dataList = []
    for data in project_list:
        dataList.append({
            'title':data['title'],
            'description':data['description'],
            'technologies':data['technologies'],
            'content':data['content'],
            'link':data['slug'],
        })

    return {'projectsData': dataList}

@router.get('/slug/{slug:path}')
async def get_project_by_slug(slug: str, session: AsyncSession = Depends(get_async_session)):
    try:
        result = await session.execute(select(Project).where(Project.slug == slug))
        project = result.scalars().first()
        if not project:
            raise HTTPException(status_code=404, detail='Project not Found')
        return {
            'id': str(project.id),
            'title': project.title,
            'description': project.description,
            'technologies': list(project.technologies),
            'content': project.content,
            'slug': project.slug,
            'date': project.create_at,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get('/search')
async def search_project(query: str, session: AsyncSession = Depends(get_async_session)):
    try:
        search_filter = f'%{query}%'
        stmt = select(Project).where(
            or_(
                Project.title.ilike(search_filter),
                Project.description.ilike(search_filter),
                cast(Project.technologies, String).ilike(search_filter)
            )
        )
        result = await session.execute(stmt)
        projects = result.scalars().all()
        return projects
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete('/{project_id}')
async def delete_project(project_id: str, session: AsyncSession = Depends(get_async_session)):
    try:
        project_uuid = uuid.UUID(project_id)

        result = await session.execute(select(Project).where(Project.id == project_uuid))
        project = result.scalars().first()

        if not project:
            raise HTTPException(status_code=404, detail='Project not Found')
        
        await session.delete(project)
        await session.commit()

        return {'success': True, 'message': "Project Deleted Successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.patch('/{project_id}')
async def update_project(updateProjects: UpdateProjects, project_id: str, session: AsyncSession = Depends(get_async_session)):
    try:
        project_uuid = uuid.UUID(project_id)

        result = await session.execute(select(Project).where(Project.id == project_uuid))
        project = result.scalars().first()

        if not project:
            raise HTTPException(status_code=404, detail='Project not Found')
        
        
        update_data = updateProjects.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(project, key, value)
        
        await session.commit()
        await session.refresh(project)
        return project
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
