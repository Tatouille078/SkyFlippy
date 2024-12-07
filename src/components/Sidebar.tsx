import React, { useEffect } from 'react'
import { StateContextType, useStateContext } from '../context';
import { Graphs } from './';

export type SidebarProps = {
  buttonRef: React.MutableRefObject<null>;
  panelRef: React.MutableRefObject<null>;
};

const Sidebar: React.FC<SidebarProps> = ({ buttonRef, panelRef }) => {
  const { isSidebarOpen, setIsSidebarOpen }: StateContextType = useStateContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSidebarOpen])

  return (
    <div
      className={`bg-fuchsia-100 bg-opacity-85 fixed min-w-[600px] top-0 left-0 h-full transition-transform duration-300 ease-in-out z-[60] ${isSidebarOpen ? 'w-3/5 translate-x-0' : 'w-3/5 -translate-x-full'
        } overflow-y-auto`}
      ref={panelRef}
    >
      <div className='top-0 sticky header-sidebar-fade shadow-lg h-24 w-full'>
        <h2 className="text-5xl h-24 exo-2-bold justify-center flex items-center m-auto text-purple-700">Graphs</h2>
      </div>
      <div className="p-6 mt-2">
        <p className='rounded-lg mb-4 bg-sidebar-trans shadow-md py-2 pl-6 exo-2-light text-purple-500'>Représentation graphique des Scores.
        </p>
        <div className='shadow-md space-y-2 bg-sidebar-trans pb-5 rounded-lg px-5 grid gap-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
            <div className='grid h-auto grid-cols-1'>
              <h1 className="text-2xl exo-2-bold text-center flex justify-center mx-auto px-4 mt-12 mb-4 min-h-9 py-[2px] rounded-3xl h1-fade shadow-lg text-purple-600">Marge Score</h1>
              <div className="w-full">
                <Graphs.MargeChart />
              </div>
            </div>
            <div className='grid grid-cols-1 '>
              <h1 className="text-2xl exo-2-bold text-center flex justify-center self-center mx-auto px-4 mt-12 mb-4 min-h-9 py-[2px] rounded-3xl h1-fade shadow-lg text-purple-600">Price Score</h1>
              <div className="w-full">
                <Graphs.PriceChart />
              </div>
            </div>
          </div>
          <div className='flex justify-center space-y-2'>
            <div className='grid grid-cols-1 w-full lg:w-1/2'>
              <h1 className="text-2xl exo-2-bold text-center flex justify-center mx-auto px-4 mt-12 mb-4 min-h-9 py-[2px] rounded-3xl h1-fade shadow-lg text-purple-600">Offre/Demande Score</h1>
              <div className="w-full">
                <Graphs.OffreDemandeChart />
              </div>
            </div>
          </div>
          <div className='flex justify-center space-y-2'>
            <div className='grid grid-cols-1 w-full lg:grid-cols-6'>
              <div className='flex col-start-1 col-end-4 justify-end pr-2'>
              </div>
              <h1 className="col-start-2 col-end-6 text-2xl exo-2-bold text-center flex justify-center mx-auto px-4 mt-12 mb-4 min-h-9 py-[2px] rounded-3xl h1-fade shadow-lg text-purple-600">Popularity Score</h1>
              <div className="w-full col-start-1 col-end-4">
                <Graphs.PopularityLowChart />
              </div>
              <div className="w-full col-start-4 col-end-7">
                <Graphs.PopularityMediumChart />
              </div>
              <div className="px-14 col-start-2 col-end-6">
                <Graphs.PopularityHighChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar