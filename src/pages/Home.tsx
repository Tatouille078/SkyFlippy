import React, { useEffect, useRef } from 'react'
import { StateContextType, useStateContext } from '../context';
import getProducts, { ProductType } from '../api';
import { AnimatedShapes, Header, ItemCard, Sidebar } from '../components';
import { Product } from '../Calculus';


const convertToArray = (productArray: ProductType) => {
    return Object.values(productArray.products)
}

export type ParamProps = {
    name: string;
    slider: number;
    setSlider: React.Dispatch<React.SetStateAction<number>>,
};

const Home = () => {
    const panelRef = useRef(null)
    const buttonRef = useRef(null)
    const searchbarRef = useRef(null)
    const {
        slider1,
        slider2,
        slider3,
        slider4,
        setSlider1,
        setSlider2,
        setSlider3,
        setSlider4,
        setPagination,
        createProductFromItem,
        sortedList
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
            <Header buttonRef={buttonRef} searchbarRef={searchbarRef}/>
            <div className=" relative">
                <Sidebar buttonRef={buttonRef} panelRef={panelRef} params={params} />
                <main className="flex-1 mt-28 flex flex-col">
                    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {sortedList.map((product: Product, index: number) => (
                            <div key={index}>
                                <ItemCard product={product} />
                            </div>
                        ))}
                    </div>
                    <p className='ubuntu-normal mb-8 text-xl shadow-lg px-4 py-1 text-purple-800 transition-all hover:scale-105 hover:rotate-2 h1-fade rounded-xl cursor-pointer self-center hover:shadow-xl' onClick={() => setPagination((prev) => prev + 12)}>See more</p>
                </main>
            </div>
        </div>
    )
}

export default Home