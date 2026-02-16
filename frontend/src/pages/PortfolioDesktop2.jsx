import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faEnvelope, faCalendar, faSquareUpRight, faFlag, faDiagramProject, faSheetPlastic, faSun } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function useWindowHeight() {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return height;
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

const PortfolioDesktop = () => {

  const height = useWindowHeight()
  const width = useWindowWidth()

  const cardParaText = 'This Template has code for FastAPI Authentication for users.py, app.py, db.py and schemas.py and some more and more and more'

  return (
    <div className={`${width > 1650 ? 'flex w-full justify-center items-center' : ''}`}>
      <div className={`{${width > 920 ? 'w-full flex' : 'flex-col'} ${height > 900 && width > 920 ? 'justify-center items-center h-screen ' : 'justify-center items-center'} ${width > 1700 ? 'w-440.5' : ''}`}>
        <div className={`leftSide relative p-5 flex ${width > 920 ? 'w-[50%]' : 'w-full'}`}>
          <nav className={`flex flex-col ${height > 900 ? 'h-215' : 'h-[95vh]'} justify-center -ml-8 mr-6`}>
            <li className='relative h-25 w-10 -scale-100 list-none' ><FontAwesomeIcon className='absolute -ml-2 mt-2' icon={faSun} /></li>
            <li className='relative h-25 w-10 -scale-100 list-none' ><Link className="absolute rotate-90 origin-left whitespace-nowrap left-0" to="#">Contect</Link></li>
            <li className='relative h-30 w-10 -scale-100 list-none' ><Link className="absolute rotate-90 origin-left whitespace-nowrap left-0" to="#">Templates</Link></li>
            <li className='relative h-20 w-10 -scale-100 list-none' ><Link className="absolute rotate-90 origin-left whitespace-nowrap left-0" to="#">Blogs</Link></li>
            <li className='relative h-25 w-10 -scale-100 list-none' ><Link className="absolute rotate-90 origin-left whitespace-nowrap left-0" to="/projects">Projects</Link></li>
            <li className='relative h-25 w-10 -scale-100 list-none' ><Link className="absolute rotate-90 origin-left whitespace-nowrap left-0" to="/">Portfolio</Link></li>
          </nav>

          <div className={`w-full ${height > 900 ? 'h-215' : 'h-[95vh]'} ${width > 1200 ? 'p-9':'p-5'} bg-[#F2003D] rounded-2xl text-white relative`}>
            <div className='mt-7'>
              <p className='text-sm'> <FontAwesomeIcon icon={faCode} /> Software Developer</p>
              <h1 className='font-bold text-6xl mt-3 w-[88%]'>I'm Faizan<br></br>The Software Developer</h1>
              <p className='text-md mt-3 w-[88%]'>I’m a software developer with a passion for web development, building interactive websites and applications. I also create games and chat apps, always experimenting with new ideas and technologies.</p>
              <div className="btns mt-3 flex gap-2">
                <a className='bg-white items-center flex text-black py-2 px-5 rounded-md text-md font-bold' href="#">Projects</a>
                <a className='border flex items-center border-white py-2 px-5 rounded-md text-md font-bold' href="#">Blogs</a>
              </div>
            </div>
            <div className={`absolute ${width > 1200 ? 'bottom-7 left-3':'bottom-3 left-1'} flex flex-col px-5`}>
              <p className='text-sm my-2 flex items-center text-white'><FontAwesomeIcon className='mr-2' color='#fffff' icon={faEnvelope} /> pydeveloper314@gmail.com</p>
            </div>
          </div>

        </div>

        <div className={`rightSide px-5 ${width > 920 ? 'w-[50%] mt-70 mr-5 relative' : 'w-full'}`}>

          <h1 className={`portfolio-text absolute -mt-80 font-bold ${width > 1750 ? 'text-[250px]' : 'text-[14vw]'} w-[90%] ${width > 920 ? '' : 'hidden'}`}>PORTFOLIO</h1>

          <div className={`flex rightSideCard ${width > 920 ? '-mt-3 mb-3' : 'ml-8'}`}>
            <div className={`w-[70%] ${width > 920 ? 'ml-0 mr-3' : ''}`}>
              <div className="card">
                <div className='card w-full bg-white py-4 px-4 rounded-xl'>
                  <div className='flex justify-between items-center text-[#696969]'>
                    <span className="mainPageCategory text-cyan-500 rounded-2xl px-4 py-1.5 flex items-center bg-cyan-100 text-[12px]"> <FontAwesomeIcon className='mr-1' icon={faFlag} /> Project</span>
                    <span className='mainPageDate text-sm'> <FontAwesomeIcon icon={faCalendar} /> 12 Jan 2024 at 09pm</span>
                  </div>
                  <div className='mt-4 w-[90%]'>
                    <h1 className='cardTitle font-bold text-3xl'>Password Manager</h1>
                    <p className='mt-1 cardPara'>{width < 1420 ? cardParaText.substring(0, 85) + '...' : cardParaText}</p>
                    <div className='tags mt-2 flex gap-2'>
                      <span className='py-1 px-2 rounded-md border border-black text-sm'># Code</span>
                      <span className='py-1 px-2 rounded-md border border-black text-sm'># Password</span>
                    </div>
                  </div>
                  <div className='h-[0.5px] w-full bg-[#696969] mt-3'></div>
                  <div className='ml-2.5 mt-3 flex justify-between items-center w-[95%]'>
                    <p className='font-bold text-xl'>Explore</p>
                    <a className='' href=""><FontAwesomeIcon className='text-2xl' size='2x' icon={faSquareUpRight} /></a>
                  </div>
                </div>
              </div>
            </div>

            <div className='ml-6 w-[30%]'>
              <div className='w-full flex flex-col items-center justify-center bg-[#A8DAD7] rounded-t-2xl h-35.25'>
                <h2 className='text-7xl font-bold'>0</h2>
                <p className='text--5xl'>Projects</p>
              </div>
              <div className='w-full flex flex-col items-center text-white justify-center bg-[#8B6FBC] rounded-b-2xl h-35.25'>
                <h2 className='text-7xl font-bold'>0</h2>
                <p className='text--5xl'>Blogs</p>
              </div>
            </div>
          </div>

          <div className={`p-5 pr-0 flex ${width > 920 ? 'px-0' : 'px-5'}`}>
            <div className='w-[35%]'>
              <div className={`${width > 920 ? 'ml-0' : 'ml-3'} w-full h-50 flex flex-col items-center justify-center bg-black text-white rounded-2xl`}>
                <img className='w-25 color-white' src="/faGithub.svg" alt="" />
                <p className='text-2xl font-bold' >Github</p>
              </div>
            </div>
            <div className='w-[65%] flex'>
              <div className='ml-8 w-full px-5 h-50 flex flex-col items-center justify-center bg-cyan-400 text-white rounded-2xl'>
                <FontAwesomeIcon size='4x' className='mb-3 w-25' icon={faDiagramProject} />
                <p className='text-2xl font-bold' >Projects</p>
              </div>
              <div className='-ml-17 w-full px-5 h-50 flex flex-col items-center justify-center bg-orange-400 text-white rounded-2xl'>
                <FontAwesomeIcon size='4x' className='mb-3' icon={faSheetPlastic} />
                <p className='text-2xl font-bold' >Templates</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PortfolioDesktop