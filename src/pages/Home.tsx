import React, { useEffect, useRef } from 'react'
import { StateContextType, useStateContext } from '../context';
import getProducts, { ProductType } from '../api';
import { AnimatedShapes, Header, ItemCard, Sidebar } from '../components';
import { Product } from '../Calculus';
import Settings from '../components/settings';


const convertToArray = (productArray: ProductType) => {
    return Object.values(productArray.products)
}

const Home = () => {
    const panelSidebarRef = useRef(null)
    const buttonSidebarRef = useRef(null)
    const panelSettingsRef = useRef(null)
    const buttonSettingsRef = useRef(null)
    const searchbarRef = useRef(null)
    const {
        setPagination,
        createProductFromItem,
        sortedList,
        currentTheme,
    }: StateContextType = useStateContext();

    useEffect(() => {
        const fetchProducts = async () => {
            const resp = await getProducts();
            const data = convertToArray(resp);
            data.forEach((item) => createProductFromItem(item))
        }
        fetchProducts()
    }, [])
    return (
        <div style={{backgroundColor: 'var(--background-color)',}} className={`${currentTheme} min-h-screen transition-all duration-300 overflow-y-hidden`}>
            <AnimatedShapes />
            <Header buttonSidebarRef={buttonSidebarRef} searchbarRef={searchbarRef} buttonSettingsRef={buttonSettingsRef} />
            <div className=" relative">
                <Sidebar buttonRef={buttonSidebarRef} panelRef={panelSidebarRef} />
                <Settings buttonRef={buttonSettingsRef} panelRef={panelSettingsRef} />
                <main className="flex-1 mt-28 flex flex-col">
                    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {sortedList.map((product: Product, index: number) => (
                            <div key={index}>
                                <ItemCard product={product} />
                            </div>
                        ))}
                    </div>
                    <p className='ubuntu-normal mb-8 text-xl shadow-lg px-4 py-1 transition-all text-[var(--text-secondaryColor-accent1)] hover:scale-105 hover:rotate-2 rounded-xl cursor-pointer self-center hover:shadow-xl bg-gradient-to-r from-[var(--background-fadeComp9)] to-[var(--background-fadeComp8)]' onClick={() => setPagination((prev) => prev + 12)}>See more</p>
                </main>
            </div>
        </div>
    )
}

export default Home