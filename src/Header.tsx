import React from 'react'
import { IoMenu } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

const Header = ({toggleOpen, buttonRef}) => {
  return (
    <header className="bg-purple-600 text-white py-4 sticky top-0">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 hover:bg-purple-700 dark:hover:bg-purple-800 rounded-full transition-colors duration-200 hidden md:block"
                onClick={toggleOpen}
                ref={buttonRef}
              >
                <IoMenu size={30} />
              </button>
              <h1 className="mb-2 text-xl py-2 md:text-4xl title-fade exo-2-bold">SkyFlippy</h1>
            </div>
            <div className="flex justify-end w-full px-2 md:px-4">
              <div className="relative self-end w-[30%]">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full exo-2-normal pl-10 pr-4 py-2 text-sm md:text-base rounded-full bg-purple-700 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" size={18} />
              </div>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header
