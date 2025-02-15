import { useEffect, useRef, useState } from 'react'
import { StateContextType, useStateContext } from '../context';
import getProducts, { ProductType } from '../api';
import { AnimatedShapes, Header, ItemCard, Sidebar } from '../components';
import { Product } from '../Calculus';
import Settings from '../components/settings';
import { useTranslation } from '../contexts/TranslationContext';

const convertToArray = (productArray: ProductType) => {
    return Object.values(productArray.products)
}

const Home = () => {
    const { translation } = useTranslation()
    const panelSidebarRef = useRef<HTMLDivElement | null>(null)
    const buttonSidebarRef = useRef<HTMLButtonElement | null>(null)
    const panelSettingsRef = useRef<HTMLDivElement | null>(null)
    const buttonSettingsRef = useRef<HTMLButtonElement | null>(null)
    const searchbarRef = useRef<HTMLInputElement | null>(null)
    const {
        setPagination,
        createProductFromItem,
        sortedList,
        currentTheme,
    }: StateContextType = useStateContext();
    const [isRead, setRead] = useState(false);

    function setInfoBulle() {
        setRead(true);
        setTimeout(() => {
            localStorage.setItem('infoBulle', 'true');
        }, 500);
    }

    useEffect(() => {
        const fetchProducts = async () => {
            const resp = await getProducts();
            const data = convertToArray(resp);
            data.forEach((item) => createProductFromItem(item))
        }
        fetchProducts()
    }, [])
    return (
        <div style={{ backgroundColor: 'var(--background-color)', }} className={`${currentTheme} min-h-screen transition-all duration-300 overflow-y-hidden`}>
            <AnimatedShapes />
            <Header buttonSidebarRef={buttonSidebarRef} searchbarRef={searchbarRef} buttonSettingsRef={buttonSettingsRef} />
            <div className=" relative">
                <Sidebar buttonRef={buttonSidebarRef} panelRef={panelSidebarRef} />
                <Settings buttonRef={buttonSettingsRef} panelRef={panelSettingsRef} />
                <main className="flex-1 mt-28 flex flex-col justify-center items-center">
                    <div className={`bg-gradient-to-r from-[var(--background-fadeTrans1)] to-[var(--background-fadeTrans2)] max-w-[800px] flex flex-col justify-center items-center w-full mt-8 rounded-2xl shadow-lg text-[var(--text-secondaryColor)] exo-2-normal text-lg transition-all delay-200 duration-500 ${isRead ? "max-h-0 pointer-events-none p-0 max-w-0" : "max-h-[500px] p-4"} ${localStorage.getItem('infoBulle') ? "hidden" : "block"}`}>
                        <div className={`bg-gradient-to-r from-[var(--background-fadeComp4)] to-[var(--background-fadeComp6)] w-full h-full rounded-xl p-4 transition-all duration-300 ${isRead ? "opacity-0" : "opacity-100"}`}>
                            <b className='text-xl'>{translation.homePage.info[0]}</b><br/>
                            <p className='mt-3'>{translation.homePage.info[1]}</p>
                            <p>{translation.homePage.info[2]}</p>
                        </div>
                        <button type='button' className={`mt-4 underline hover:font-bold transition-all duration-300 ${isRead ? "opacity-0" : "opacity-100"}`} onClick={() => setInfoBulle()}>{translation.homePage.info[3]}</button>
                    </div>
                    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {sortedList.map((product: Product, index: number) => (
                            <div key={index}>
                                <ItemCard product={product} />
                            </div>
                        ))}
                    </div>
                    <p className='ubuntu-normal mb-8 text-xl shadow-lg px-4 py-1 transition-all text-[var(--text-secondaryColor-accent1)] hover:scale-105 hover:rotate-2 rounded-xl cursor-pointer self-center hover:shadow-xl bg-gradient-to-r from-[var(--background-fadeComp9)] to-[var(--background-fadeComp8)]' onClick={() => setPagination((prev) => prev + 12)}>{translation.homePage.seeMore}</p>
                </main>
            </div>
        </div>
    )
}

export default Home