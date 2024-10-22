import React from 'react'
import { FaPython } from "react-icons/fa";

function App() {

  return (
    <div className="min-h-screen bg-white">
<header className="bg-purple-600 text-white py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-purple-700 dark:hover:bg-purple-800 rounded-full transition-colors duration-200 hidden md:block"
              >
              </button>
              <button
                className="p-[10px] hover:bg-purple-700 dark:hover:bg-purple-800 rounded-full transition-colors duration-200 md:hidden"
              >
              </button>
              <h1 className="mb-2 text-xl py-2 md:text-4xl font-bold Muhaha">SkyFlippy</h1>
            </div>
            <div className="flex-1 flex justify-center px-2 md:px-4">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 text-sm md:text-base rounded-full bg-purple-700 dark:bg-purple-800 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <FaPython className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" size={16} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Panel latéral */}
        <div 
          className={`bg-purple-100 fixed top-0 left-0 h-full transition-all duration-300 ease-in-out z-20 w-1/5 -translate-x-full overflow-y-auto`}
        >
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Paramètres</h2>
            {['Paramètre 1', 'Paramètre 2', 'Paramètre 3', 'Paramètre 4'].map((param, index) => (
              <div key={index} className="space-y-2">
                <label className="text-sm font-medium text-purple-600">{param}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Contenu principal */}
        <main className={`flex-1 transition-all duration-300 ease-in-out`}>
          <div className="container mx-auto px-4 py-8">
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
