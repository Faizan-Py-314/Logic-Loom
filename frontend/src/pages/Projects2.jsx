import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faAddressBook, faDiagramProject, faBlog, faSheetPlastic, faMoon, faMagnifyingGlass, faFlag, faSquareUpRight, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Projects = () => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className='container'>
      <div className='w-screen flex flex-col items-center'>
        <nav className='flex w-full justify-between px-6 pt-4 z-1'>
          <h3 className='font-bold'>Projects</h3>
          <span className='nav' onClick={() => { setIsActive(!isActive) }}><FontAwesomeIcon icon={faBars} /></span>
          <ul className={`absolute right-7 bg-white p-3 rounded-md top-10 ${isActive ? '' : 'hidden'}`}>
            <li><Link to="/"> <FontAwesomeIcon color='#696969' icon={faAddressBook} /> Portfolio</Link></li>
            <li><Link to="projects"> <FontAwesomeIcon color='#696969' icon={faDiagramProject} /> Projects</Link></li>
            <li><Link to="#"> <FontAwesomeIcon color='#696969' icon={faBlog} /> Blogs</Link></li>
            <li><Link to="#"> <FontAwesomeIcon color='#696969' icon={faSheetPlastic} /> Templates</Link></li>
            <div className='w-full h-[0.5px] bg-[#696969] mb-2'></div>
            <li className='flex -ml-1 items-center'> <FontAwesomeIcon color='#696969' size='2x' icon={faMoon} /> <label className="switch"><input type="checkbox" /><span className="slider round"></span></label></li>
          </ul>
        </nav>
        <div className='w-[93%] mt-2 rounded-xl flex flex-col items-center bg-gray-200 relative'>
          <h1 className='projectHeading text-5xl font-bold my-10 flex justify-center'> <FontAwesomeIcon className='text-4xl mt-1' icon={faDiagramProject} /> PROJECTS</h1>
          <div className='absolute -bottom-4.5 flex w-[80%] justify-center'>
            <input className='bg-white shadow-2xl focus:outline-none rounded-l-md py-2 px-4 text-[15px] flex items-center [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden' type="search" placeholder='Search Project Name or #tag...' />
            <button className='bg-black text-white shadow-2xl rounded-r-md px-3'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap p-5 mt-5 w-screen'>

        <div className="card m-3 w-80 lg:w-87.5"> 
          <div className='card w-full bg-white py-4 px-4 rounded-xl'>
            <div className='flex justify-between items-center text-[#696969]'>
              <span className="mainPageCategory text-cyan-500 rounded-2xl px-4 py-1.5 flex items-center bg-cyan-100 text-[10px] lg:text-[12px]"> <FontAwesomeIcon className='mr-1' icon={faFlag} /> Project</span>
              <span className='mainPageDate text-[13px] lg:text-sm'> <FontAwesomeIcon icon={faCalendar} /> 12 Jan 2024 at 09pm</span>
            </div>
            <div className='mt-2 lg:mt-4 w-[90%]'>
              <h1 className='cardTitle font-bold text-2xl lg:text-3xl'>Password Manager</h1>
              <p className='mt-1 cardPara text-sm lg:text-md'>This Template has code for FastAPI Authentication for users.py, app.py, db.py and schemas.py</p>
              <div className='tags mt-2 flex gap-2 text-[10px] lg:text-sm'>
                <span className='py-1 px-2 rounded-md border border-black'># Code</span>
                <span className='py-1 px-2 rounded-md border border-black'># Password</span>
              </div>
            </div>
            <div className='h-[0.5px] w-full bg-[#696969] mt-3'></div>
            <div className='ml-2.5 mt-3 flex justify-between items-center w-[95%]'>
              <p className='font-bold text-md lg:text-xl'>Explore</p>
              <a className='' href=""><FontAwesomeIcon className='text-2xl lg:text-4xl'  icon={faSquareUpRight} /></a>
            </div>
          </div>
        </div>
        
        <div className="card m-3 w-80 lg:w-87.5"> 
          <div className='card w-full bg-white py-4 px-4 rounded-xl'>
            <div className='flex justify-between items-center text-[#696969]'>
              <span className="mainPageCategory text-cyan-500 rounded-2xl px-4 py-1.5 flex items-center bg-cyan-100 text-[10px] lg:text-[12px]"> <FontAwesomeIcon className='mr-1' icon={faFlag} /> Project</span>
              <span className='mainPageDate text-[13px] lg:text-sm'> <FontAwesomeIcon icon={faCalendar} /> 12 Jan 2024 at 09pm</span>
            </div>
            <div className='mt-2 lg:mt-4 w-[90%]'>
              <h1 className='cardTitle font-bold text-2xl lg:text-3xl'>Password Manager</h1>
              <p className='mt-1 cardPara text-sm lg:text-md'>This Template has code for FastAPI Authentication for users.py, app.py, db.py and schemas.py</p>
              <div className='tags mt-2 flex gap-2 text-[10px] lg:text-sm'>
                <span className='py-1 px-2 rounded-md border border-black'># Code</span>
                <span className='py-1 px-2 rounded-md border border-black'># Password</span>
              </div>
            </div>
            <div className='h-[0.5px] w-full bg-[#696969] mt-3'></div>
            <div className='ml-2.5 mt-3 flex justify-between items-center w-[95%]'>
              <p className='font-bold text-md lg:text-xl'>Explore</p>
              <a className='' href=""><FontAwesomeIcon className='text-2xl lg:text-4xl'  icon={faSquareUpRight} /></a>
            </div>
          </div>
        </div>
        
        <div className="card m-3 w-80 lg:w-87.5"> 
          <div className='card w-full bg-white py-4 px-4 rounded-xl'>
            <div className='flex justify-between items-center text-[#696969]'>
              <span className="mainPageCategory text-cyan-500 rounded-2xl px-4 py-1.5 flex items-center bg-cyan-100 text-[10px] lg:text-[12px]"> <FontAwesomeIcon className='mr-1' icon={faFlag} /> Project</span>
              <span className='mainPageDate text-[13px] lg:text-sm'> <FontAwesomeIcon icon={faCalendar} /> 12 Jan 2024 at 09pm</span>
            </div>
            <div className='mt-2 lg:mt-4 w-[90%]'>
              <h1 className='cardTitle font-bold text-2xl lg:text-3xl'>Password Manager</h1>
              <p className='mt-1 cardPara text-sm lg:text-md'>This Template has code for FastAPI Authentication for users.py, app.py, db.py and schemas.py</p>
              <div className='tags mt-2 flex gap-2 text-[10px] lg:text-sm'>
                <span className='py-1 px-2 rounded-md border border-black'># Code</span>
                <span className='py-1 px-2 rounded-md border border-black'># Password</span>
              </div>
            </div>
            <div className='h-[0.5px] w-full bg-[#696969] mt-3'></div>
            <div className='ml-2.5 mt-3 flex justify-between items-center w-[95%]'>
              <p className='font-bold text-md lg:text-xl'>Explore</p>
              <a className='' href=""><FontAwesomeIcon className='text-2xl lg:text-4xl'  icon={faSquareUpRight} /></a>
            </div>
          </div>
        </div>
        

      </div>
    </div>
  )
}

export default Projects