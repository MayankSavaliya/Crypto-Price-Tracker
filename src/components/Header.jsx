import React from 'react'
import { Link } from 'react-router-dom'
import { SiBitcoinsv } from "react-icons/si";

const Header = () => {
  return (
    <div className='flex items-center justify-evenly bg-gray-900 py-2 fixed w-full top-0 z-1000 shadow-md transition-colors duration-300'>
      <div className="flex items-center">
        <h1 className='text-white text-2xl'>CryptoTrack</h1>
        <SiBitcoinsv color='orange' size={"25"} className='ml-2'/>
      </div>
      <ul className='flex list-none'>
        <li className='ml-40'>
          <Link to='/' className='text-white text-lg relative transition-colors duration-300 hover:text-orange-500'>
            Home
            <span className='block w-full h-0.5 bg-orange-500 absolute bottom-0 left-0 transform scale-x-0 origin-bottom-right transition-transform duration-250 ease-out hover:scale-x-100 hover:origin-bottom-left'></span>
          </Link>
        </li>
        <li className='ml-40'>
          <Link to='/coins' className='text-white text-lg relative transition-colors duration-300 hover:text-orange-500'>
            Coins
            <span className='block w-full h-0.5 bg-orange-500 absolute bottom-0 left-0 transform scale-x-0 origin-bottom-right transition-transform duration-250 ease-out hover:scale-x-100 hover:origin-bottom-left'></span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Header
