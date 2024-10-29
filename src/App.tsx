import React, { useRef, useEffect } from 'react'
import Categories from './Categories';
import { StateContextType, useStateContext } from './context';
import AnimatedShapes from './background';
import Sidebar from './Sidebar';
import Header from './Header';
import getProducts, { Item, ProductType } from './api';
import Scores from "./Calculus";
import {MargeChart, OffreDemandeChart, PriceScoreChart, PopularityLowChart, PopularityMediumChart, PopularityHighChart} from './graph';

const convertToArray = (productArray: ProductType) => {
  return Object.values(productArray.products)
}

export type ParamProps = {
  name: string;
  slider: number;
  setSlider: React.Dispatch<React.SetStateAction<number>>,
  id: number,
  locked: boolean,
  setLocked: React.Dispatch<React.SetStateAction<boolean>>
};

function App() {
  const score = new Scores()
  


  const panelRef = useRef(null)
  const buttonRef = useRef(null)
  const {
    slider1,
    slider2,
    slider3,
    slider4,
    setSlider1,
    setSlider2,
    setSlider3,
    setSlider4,
    lock1,
    lock2,
    lock3,
    lock4,
    setLock1,
    setLock2,
    setLock3,
    setLock4
  }: StateContextType = useStateContext();
  
  const params: ParamProps[] = [
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
    const fetchProducts = async() => {
      getProducts().then(data => {
        const resp: Item[] = convertToArray(data)
        console.log(resp)
        score.refreshProducts(resp)
      })
    }   
    fetchProducts()
  }, [])
  return (
    <div className="min-h-screen bg-white overflow-y-hidden">   
      <AnimatedShapes />
      <Header buttonRef={buttonRef}/>
      <div className="flex relative">
        <Sidebar buttonRef={buttonRef} panelRef={panelRef} params={params} />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <Categories />
            <div className="flex items-center justify-center">
              <div className="w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Graphique Marge</h1>
                <MargeChart/>
              </div>
              <div className="w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Graphique Prix</h1>
                <PriceScoreChart/>
              </div>
              <div className="w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Graphique Offre/Demande</h1>
                <OffreDemandeChart/>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Graphique Low Popularity</h1>
                <PopularityLowChart/>
              </div>
              <div className="w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Graphique Medium Popularity</h1>
                <PopularityMediumChart/>
              </div>
              <div className="w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Graphique High Popularity</h1>
                <PopularityHighChart/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
