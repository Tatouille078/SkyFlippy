import React, { useEffect } from 'react'
import InputSlider from './sliders'
import { StateContextType, useStateContext } from '../context';
import { ParamProps } from '../App';
import { Graphs } from './';

export type SidebarProps = {
  buttonRef: React.MutableRefObject<null>;
  panelRef: React.MutableRefObject<null>;
  params: ParamProps[];
};

const Sidebar: React.FC<SidebarProps> = ({ buttonRef, panelRef, params }) => {
  const { isOpen, setIsOpen, setChangeIndex }: StateContextType = useStateContext();

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

  return (
    <div
      className={`sidebar-fade fixed  top-0 left-0 h-full transition-transform duration-300 ease-in-out z-20 ${isOpen ? 'w-3/5 translate-x-0' : 'w-3/5 -translate-x-full'
        } overflow-y-auto`}
      ref={panelRef}
    >
      <div className='absolute header-sidebar-fade -z-10 h-24 w-full '>
      </div>
      <div className="p-6 mt-2">
        <h2 className="text-2xl z-10 exo-2-bold justify-center flex m-auto text-purple-700">Poids</h2>
        <p className='rounded-lg mb-4 shadow-md mt-14 pb-2 pl-6 exo-2-light text-purple-500'><b>Attention</b>: Il est recommandé que la somme des 4 poids (sliders) soit égale à 100! Sinon, les résultats données peuvent être incorrects.<br />
          En cas de problème d'affichage des courbes, essayez de rafraichir la page.
        </p>
        <div className='shadow-md space-y-2  sidebar-graphs-fade pb-5 rounded-lg px-5 grid gap-4'>
          <div className='grid grid-cols-2 gap-2'>
            <div className='grid h-auto grid-cols-2'>
              <InputSlider props={params[0]} handler1={setChangeIndex} />
              <h1 className="text-2xl exo-2-bold text-center flex justify-center mx-8 mt-12 mb-4 min-h-9 py-[2px] rounded-3xl h1-fade shadow-lg text-purple-600">Marge Score</h1>
              <div className="col-start-1 col-end-3 w-full">
                <Graphs.MargeChart />
              </div>
            </div>
            <div className='grid grid-cols-2 '>
              <InputSlider props={params[1]} handler1={setChangeIndex} />
              <h1 className="text-2xl exo-2-bold text-center flex justify-center mx-8 mt-12 mb-4 min-h-9 py-[2px] rounded-3xl h1-fade shadow-lg text-purple-600">Price Score</h1>
              <div className="col-start-1 col-end-3 w-full">
                <Graphs.PriceChart />
              </div>
            </div>
          </div>
          <div className='flex justify-center space-y-2'>
            <div className='grid grid-cols-2 '>
              <InputSlider props={params[2]} handler1={setChangeIndex} />
              <h1 className="text-2xl exo-2-bold text-center flex justify-center mx-2 px-4 mt-12 mb-4 min-h-9 py-[2px] rounded-3xl h1-fade shadow-lg text-purple-600">Offre/Demande Score</h1>
              <div className="col-start-1 col-end-3 w-full">
                <Graphs.OffreDemandeChart />
              </div>
            </div>
          </div>
          <div className='flex justify-center space-y-2'>
            <div className='grid grid-cols-6 w-full'>
              <div className='flex col-start-1 col-end-4 justify-end pr-2'>
                <InputSlider props={params[2]} handler1={setChangeIndex} />
              </div>
              <h1 className="col-start-4 col-end-6 text-2xl exo-2-bold text-center flex justify-center mx-8 mt-12 mb-4 min-h-9 py-[2px] rounded-3xl h1-fade shadow-lg text-purple-600">Popularity Score</h1>
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