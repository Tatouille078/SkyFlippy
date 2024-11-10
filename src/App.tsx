import React, { useRef, useEffect, useState, useMemo } from 'react'
import { StateContextType, useStateContext } from './context';
import getProducts, { Item, ProductType } from './api';
import {popularity, offreDemande, marge, prix, Product, getFinalScore} from "./Calculus";
import { Categories, Header, Sidebar, AnimatedShapes, ItemCard } from './components';


const convertToArray = (productArray: ProductType) => {
  return Object.values(productArray.products)
}

export type ParamProps = {
  name: string;
  slider: number;
  setSlider: React.Dispatch<React.SetStateAction<number>>,
};

const quickSort = (arr) => {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].finalScore < pivot.finalScore) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
};

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState<number>(12)
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
  }: StateContextType = useStateContext();

  const params: ParamProps[] = [
    {
      name: 'Param1',
      slider: slider1,
      setSlider: setSlider1,
    },
    {
      name: 'Param2',
      slider: slider2,
      setSlider: setSlider2,
    },
    {
      name: 'Param3',
      slider: slider3,
      setSlider: setSlider3,
    },
    {
      name: 'Param4',
      slider: slider4,
      setSlider: setSlider4,
    },
  ];
  const createProductFromItem = (item: Item) => {
    const p: Product = {
      productID: item.product_id,
      sellPrice: item.quick_status.sellPrice,
      sellVolume: item.quick_status.sellVolume,
      buyPrice: item.quick_status.buyPrice,
      buyVolume: item.quick_status.buyVolume,
      finalScore: null,
      marge: marge(item.quick_status.buyPrice, item.quick_status.sellPrice),
      prix: prix(item.quick_status.buyPrice),
      offreDemande: offreDemande(item.quick_status.buyVolume, item.quick_status.sellVolume),
      popularity: popularity(item.quick_status.buyPrice, item.quick_status.buyVolume, item.quick_status.sellVolume)
    }
    p.finalScore = getFinalScore(p)
    setProducts((prev) => [...prev, p])
  }
  const sortedList = useMemo(() => {
    const goodP = products.filter(p => p.finalScore == null || !isNaN(p.finalScore))
    const sortedP = quickSort(goodP).reverse()
    return sortedP.slice(0, pagination)
  },
    [products, pagination]
  )
  useEffect(() => {
    const fetchProducts = async () => {
      const resp = await getProducts();
      const data = convertToArray(resp);
      data.forEach((item) => createProductFromItem(item))
    }
    fetchProducts()
  }, [])
  return (
    <div className="min-h-screen bg-white overflow-y-hidden">
      <AnimatedShapes />
      <Header buttonRef={buttonRef} />
      <div className="flex relative">
        <Sidebar buttonRef={buttonRef} panelRef={panelRef} params={params} />
        <main className="flex-1 mt-8 flex flex-col">
          <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {sortedList.map((product: Product, index: number) => (
              <div key={index}>
                <ItemCard product={product} />
              </div>
            ))}
          </div>
          <p className='ubuntu-normal mb-8 text-purple-700 underline cursor-wait self-center' onClick={() => setPagination((prev) => prev + 12)}>See more</p>
        </main>
      </div>
    </div>
  )
}

export default App