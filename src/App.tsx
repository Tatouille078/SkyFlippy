import React, { useEffect, useRef, useState } from 'react'
import Categories from './Categories';
import { useStateContext } from './context';
import AnimatedShapes from './background';
import Sidebar from './Sidebar';
import Header from './Header';

function App() {
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
  return (
    <div className="min-h-screen bg-white relative">   
      <AnimatedShapes/>
      <Header buttonRef={buttonRef} toggleOpen={toggleOpen}/>
      <div className="flex relative">
        <Sidebar isOpen={isOpen} panelRef={panelRef} params={params} setChangeIndex={setChangeIndex}/>
        {/* Contenu principal */}
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <Categories />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
