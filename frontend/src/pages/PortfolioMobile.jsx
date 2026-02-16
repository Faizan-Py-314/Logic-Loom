import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCode, faEnvelope, faSquareUpRight, faCalendar, faFlag, faAddressBook, faDiagramProject, faBlog, faSheetPlastic, faMoon } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Portfolio = () => {
    const [isActive, setIsActive] = useState(false)

  return (
    <div className='bg-[#F6F6F4]'>
        <div className="container">
            <nav className='flex w-full justify-between px-6 mt-4'>
                <h3 className='font-bold'>Portfolio</h3>
                <span className='nav' onClick={() => {setIsActive(!isActive)}}><FontAwesomeIcon icon={faBars}/></span>
                <ul className={`absolute right-7 bg-white p-3 rounded-md top-10 ${isActive ? '' : 'hidden'}`}>
                    <li><Link to="/"> <FontAwesomeIcon color='#696969' icon={faAddressBook} /> Portfolio</Link></li>
                    <li><Link to="projects"> <FontAwesomeIcon color='#696969' icon={faDiagramProject} /> Projects</Link></li>
                    <li><Link to="#"> <FontAwesomeIcon color='#696969' icon={faBlog} /> Blogs</Link></li>
                    <li><Link to="#"> <FontAwesomeIcon color='#696969' icon={faSheetPlastic} /> Templates</Link></li>
                    <div className='w-full h-[0.5px] bg-[#696969] mb-2'></div>
                    <li className='flex -ml-1 items-center'> <FontAwesomeIcon color='#696969' size='2x' icon={faMoon} /> <label className="switch"><input type="checkbox"/><span className="slider round"></span></label></li>
                </ul>
            </nav>

            <div className='w-full flex justify-center items-center mt-10 flex-col'>
                <p className='text-[10px]'> <FontAwesomeIcon icon={faCode} /> Software Developer</p>
                <h1 className='font-bold text-4xl mt-3 text-center w-[88%]'>I'm Faizan<br></br>The Software Developer</h1>
                <p className='text-sm text-center mt-3 w-[88%]'>I’m a software developer who builds websites, games, and chat applications. I enjoy creating smart and interactive digital experiences.</p>
                <div className="btns mt-3 flex gap-2">
                    <a className='bg-black flex items-center text-[#F6F6F4] py-2 px-5 rounded-md text-sm font-bold' href="#">Projects</a>
                    <a className='border flex items-center border-black py-2 px-5 rounded-md text-sm font-bold' href="#">Blogs</a>
                </div>
            </div>

            <div className='w-full flex justify-center p-5'>
                <div className='card w-full bg-white py-3 px-4 rounded-xl'>
                    <div className='flex justify-between items-center text-[#696969]'>
                        <span className="category text-orange-500 rounded-xl px-3 py-1.5 bg-orange-100 text-[10px]"> <FontAwesomeIcon icon={faFlag} /> Template</span>
                        <span className='date text-[12px]'> <FontAwesomeIcon icon={faCalendar} /> 12 Jan 2024 at 09pm</span>
                    </div>
                    <div className='mt-4 w-[90%]'>
                        <h1 className='font-bold'>FastAPI Authentication</h1>
                        <p className='text-[13px]'>This Template has code for FastAPI Authentication for users.py, app.py, db.py and schemas.py</p>
                        <div className='tags mt-1 flex gap-2'>
                            <span className='py-1 px-2 rounded-md border border-black text-[10px]'># Code</span>
                            <span className='py-1 px-2 rounded-md border border-black text-[10px]'># FastAPI</span>
                        </div>
                    </div>
                    <div className='h-[0.5px] w-full bg-[#696969] mt-3'></div>
                    <div className='ml-2.5 mt-3 flex justify-between items-center w-[95%]'>
                        <p className='font-bold text-sm'>Explore</p>
                        <a className='' href=""><FontAwesomeIcon className='text-2xl' size='10' icon={faSquareUpRight} /></a>
                    </div>
                </div>
            </div>

            <div className='absolute bottom-1 w-full flex flex-col items-center justify-center px-5'>
                <div className='h-px w-full flex items-center bg-[#696969]'></div>
                <p className='text-sm my-2 flex items-center text-[#696969]'><FontAwesomeIcon className='mr-2' color='#696969' icon={faEnvelope} /> pydeveloper314@gmail.com</p>
            </div>
        </div>
    </div>
  )
}

export default Portfolio