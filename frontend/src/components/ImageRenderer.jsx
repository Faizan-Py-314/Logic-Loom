import React from 'react'

const ImageRenderer = ({alt, src, title, }) => {
  return (
    <img
    src={src}
    alt={alt}
    title={title}
    // style={{ maxWidth: '600px', height: 'auto', borderRadius: '20px' }}
    className='max-w-[min(40rem,85vw)]'
    />
  )
}

export default ImageRenderer