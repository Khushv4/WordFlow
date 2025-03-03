import React from 'react'

function Parallax({title, content, path}) {
  
  return (
    <div>
    <div className=' flex-1/2 flex flex-wrap pb-22 '>
    <div className='w-1/2  '> 
    <h1 className='pt-22 pb-12 font-bold text-5xl'>{title}</h1>
    <p className='font-medium text-l'>{content}</p>
    </div>
    <div className='w-1/2'><img src={path} alt="test" /></div>
    </div>
  </div>
  )
}

export default Parallax