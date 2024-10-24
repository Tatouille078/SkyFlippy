import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import Categories from './Categories';
import InputSlider from './sliders';
import { useStateContext } from './context';
import { IoMenu } from "react-icons/io5";

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef(null)
  const buttonRef = useRef(null)
  const {slider1, slider2, slider3, slider4, setSlider1, setSlider2, setSlider3, setSlider4, setChangeIndex, lock1, lock2, lock3, lock4, setLock1, setLock2, setLock3, setLock4} = useStateContext();
  const params = [
    {
        name: 'Param1',
        slider: slider1,
        setSlider: setSlider1,
        id: 1, 
        locked: lock1,
        setLocked: setLock1,
    },
    {
        name: 'Param2',
        slider: slider2,
        setSlider: setSlider2,
        id: 2, 
        locked: lock2,
        setLocked: setLock2,
    },
    {
        name: 'Param3',
        slider: slider3,
        setSlider: setSlider3,
        id: 3, 
        locked: lock3,
        setLocked: setLock3,
    },
    {
        name: 'Param4',
        slider: slider4,
        setSlider: setSlider4,
        id: 4, 
        locked: lock4,
        setLocked: setLock4,
    },
];
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])
  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
  } 
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-purple-600 text-white py-4 sticky top-0 z-10">
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

      <div className="flex relative">
        {/* Side bar */}
        <div 
          className={`bg-purple-100 fixed top-0 left-0 h-full transition-all duration-300 ease-in-out z-20 ${
            isOpen ? 'w-1/5 translate-x-0' : 'w-1/5 -translate-x-full'
          } overflow-y-auto`}
          ref={panelRef}
        >
          <div className="p-6 space-y-6">
            <h2 className="text-2xl exo-2-bold text-purple-600 mb-4 w-[48px]">Poids</h2>
            {params.map((param, index) => (
              <div key={index} className="space-y-2">
                <InputSlider props={param} handler={setChangeIndex} />
              </div>
            ))}
          </div>
        </div>
              
        {/* Contenu principal */}
        <main className={`flex-1 transition-all duration-300 ease-in-out`}>
          <div className="container mx-auto px-4 py-8">
            <Categories />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
