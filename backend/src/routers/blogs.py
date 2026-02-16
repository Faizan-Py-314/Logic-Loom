from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from src.db import get_async_session, Blog
from src.schemas import BlogScheam, UpdateBlogs
import uuid
from datetime import datetime

router = APIRouter(
    prefix='/blogs',
    tags=['Blogs']
)

@router.post('/')
async def upload_blogs(blogs:BlogScheam, session: AsyncSession = Depends(get_async_session)):
    try:
        new_blog = Blog(
        title = blogs.title,
        excerpt = blogs.excerpt,
        imagePlaceholder = blogs.imagePlaceholder,
        content = blogs.content,
        slug = blogs.slug
        )

        session.add(new_blog)
        await session.commit()
        await session.refresh(new_blog)

        return new_blog
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get('/')
async def get_blogs(session: AsyncSession = Depends(get_async_session)):

    result = await session.execute(select(Blog).order_by(Blog.create_at.desc()))
    blogs = [row[0] for row in result.all()]

    blogs_data = []
    for blog in blogs:
        blogs_data.append(
            {
                'id':blog.id,
                'title':blog.title,
                'excerpt':blog.excerpt,
                'imagePlaceholder':blog.imagePlaceholder,
                'content':blog.content,
                'slug':blog.slug,
                'views':blog.views,
                'date':blog.create_at,
            }
        )

    return {'blogs': blogs_data}

@router.get('/display')
async def display_data(session: AsyncSession = Depends(get_async_session)):
    response = await get_blogs(session=session)
    blog_list = response['blogs']

    dataList = []
    for data in blog_list:
        dataList.append({
            'title':data['title'],
            'excerpt':data['excerpt'],
            'imagePlaceholder':data['imagePlaceholder'],
            'content':data['content'],
            'readMoreLink':data['slug'],
            'date':datetime.fromisoformat(str(data['date'])).strftime("%b %d, %Y"),
        })

    return {'blogsData': dataList}

@router.get('/slug/{slug:path}')
async def get_blog_by_slug(slug: str, session: AsyncSession = Depends(get_async_session)):
    try:
        result = await session.execute(select(Blog).where(Blog.slug == slug))
        blog = result.scalars().first()
        if not blog:
            raise HTTPException(status_code=404, detail='Blog not Found')
        return {
            'id': str(blog.id),
            'title': blog.title,
            'excerpt': blog.excerpt,
            'imagePlaceholder': blog.imagePlaceholder,
            'content': blog.content,
            'slug': blog.slug,
            'date': blog.create_at,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get('/search')
async def search_blogs(query: str, session: AsyncSession = Depends(get_async_session)):
    try:
        search_filter = f'%{query}%'
        stmt = select(Blog).where(
            or_(
                Blog.title.ilike(search_filter),
                Blog.excerpt.ilike(search_filter),
                Blog.imagePlaceholder.ilike(search_filter),
            )
        )
        result = await session.execute(stmt)
        blogs = result.scalars().all()

        return blogs
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete('/{blog_id}')
async def delete_blog(blog_id: str, session: AsyncSession = Depends(get_async_session)):
    try:
        blog_uuid = uuid.UUID(blog_id)

        result = await session.execute(select(Blog).where(Blog.id == blog_uuid))
        blog = result.scalars().first()

        if not blog:
            raise HTTPException(status_code=404, detail='Blog not Found')
        
        await session.delete(blog)
        await session.commit()

        return {'success': True, 'message': "Blog Deleted Successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.patch('/{blog_id}')
async def update_blog(updateBlogs: UpdateBlogs, blog_id: str, session: AsyncSession = Depends(get_async_session)):
    try:
        blog_uuid = uuid.UUID(blog_id)

        result = await session.execute(select(Blog).where(Blog.id == blog_uuid))
        blog = result.scalars().first()

        if not blog:
            raise HTTPException(status_code=404, detail='Blog not Found')
        
        
        update_data = updateBlogs.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(blog, key, value)
        
        await session.commit()
        await session.refresh(blog)
        return blog
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
