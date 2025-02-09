import { AnimatedShapes, Header } from '../components'
import { useParams } from 'react-router-dom'
import { StateContextType, useStateContext } from '../context'
import { Product as P } from '../Calculus'
import { useEffect, useRef, useState } from 'react'
import Settings from '../components/settings'
import { useTranslation } from '../contexts/TranslationContext'

const Product = () => {
    const [inputPrice, setInputPrice] = useState<number>(() => {
        const savedPrice = localStorage.getItem('inputPrice');
        return savedPrice? Number(savedPrice) : 0;
    });
    const { getItem } = useStateContext()
    const { currentTheme }: StateContextType = useStateContext()
    const { id } = useParams()
    const product: P | null = getItem<P>("product")
    if (!product || product.productID != id) {
        window.location.href = "/"
        return null
    }

    const panelSettingsRef = useRef(null)
    const buttonSettingsRef = useRef(null)
    const { translation } = useTranslation()

    useEffect(() => {
        localStorage.setItem('inputPrice', inputPrice.toString());
    })

    return (
        <div className={`${currentTheme} min-h-screen bg-[var(--background-color)] overflow-y-hidden`}>
            <AnimatedShapes />
            <Header buttonSettingsRef={buttonSettingsRef} />
            <Settings buttonRef={buttonSettingsRef} panelRef={panelSettingsRef} />
            <div className='mt-28 mb-4 flex relative'>
                <main className='flex-1 mt-8 flex flex-col'>
                    <div className='container mx-auto max-w-screen-xl px-4 pt-4 bg-gradient-to-r from-[var(--background-fadeTrans2)] to-[var(--background-fadeTrans1)] rounded-xl shadow-xl'>
                        <ul className='bg-[var(--background-product)] mx-auto rounded-lg shadow-lg grid grid-cols-2'>
                            {/* row 1 */}
                            <li className='col-start-1 col-end-3 flex bg-gradient-to-r from-[var(--background-fadeComp4)] to-[var(--background-fadeComp5)] rounded-t-lg py-6 justify-center'>
                                <p className='exo-2-bold text-2xl text-[var(--text-defaultColor)]'>{product.productID}</p>
                            </li>
                            {/* row 2 */}
                            <li className='bg-[var(--background-firstProduct)] py-4 flex justify-between items-center'>
                                <span className='px-8 text-lg exo-2-normal text-[var(--text-defaultColor)]'>{translation.productPage.table.finalScore}</span>
                                <div
                                    className="mr-8 shadow-md ubuntu-normal rounded-2xl px-2"
                                    style={{
                                        backgroundColor: product.finalScore! <= 75 ? product.finalScore! <= 55 ? 'var(--score-redBg-color)' : 'var(--score-yellowBg-color)' : 'var(--score-greenBg-color)',
                                        color: product.finalScore! <= 75 ? product.finalScore! <= 55 ? 'var(--score-redText-color)' : 'var(--score-yellowText-color)' : 'var(--score-greenText-color)',
                                    }}
                                >
                                    {product.finalScore}
                                </div>
                            </li>
                            <li className='py-4 flex justify-between items-center'>
                                <span className='px-8 text-lg exo-2-normal text-[var(--text-defaultColor)]'>{translation.productPage.table.margePercent}</span>
                                <div
                                    className="mr-8 shadow-md ubuntu-normal rounded-2xl px-2"
                                    style={{
                                        backgroundColor: product.marge! <= 18 ? product.marge! <= 10 ? 'var(--score-redBg-color)' : 'var(--score-yellowBg-color)' : 'var(--score-greenBg-color)',
                                        color: product.marge! <= 18 ? product.marge! <= 10 ? 'var(--score-redText-color)' : 'var(--score-yellowText-color)' : 'var(--score-greenText-color)',
                                    }}
                                >
                                    {(((product.buyPrice / product.sellPrice) * 100) - 100).toFixed(1)} %
                                </div>
                            </li>
                            {/* row 3 */}
                            <li className='bg-[var(--background-oddRowProduct)] py-4 flex justify-between items-center'>
                                <span className='px-8 text-lg exo-2-normal text-[var(--text-defaultColor)]'>{translation.productPage.table.margeScore}</span>
                                <div
                                    className="mr-8 shadow-md ubuntu-normal rounded-2xl px-2"
                                    style={{
                                        backgroundColor: product.marge! <= 20 ? product.marge! <= 10 ? 'var(--score-redBg-color)' : 'var(--score-yellowBg-color)' : 'var(--score-greenBg-color)',
                                        color: product.marge! <= 20 ? product.marge! <= 10 ? 'var(--score-redText-color)' : 'var(--score-yellowText-color)' : 'var(--score-greenText-color)',
                                    }}
                                >
                                    {product.marge!.toFixed(1)}
                                </div>
                            </li>
                            <li className='bg-[var(--background-oddRowProduct)] py-4 flex justify-between items-center'>
                                <div>
                                    <span className='pl-8 text-lg exo-2-normal text-[var(--text-defaultColor)]'>{translation.productPage.table.buyPrice}: </span>
                                    <span className='pl-8 text-lg ubuntu-normal text-[var(--score-greenText-color)]'>{product.buyPrice.toFixed(2)}</span>
                                </div>
                                <div>
                                    <span className='text-lg exo-2-normal text-[var(--text-defaultColor)]'>{translation.productPage.table.difference}: </span>
                                    <span className='text-lg ubuntu-normal text-[var(--score-greenText-color)]'>+{(product.buyPrice - product.sellPrice).toFixed()}</span>
                                </div>
                                <div>
                                    <span className='text-lg exo-2-normal text-[var(--text-defaultColor)]'>{translation.productPage.table.sellPrice}: </span>
                                    <span className='pr-8 text-lg ubuntu-normal text-[var(--score-greenText-color)]'>{product.sellPrice.toFixed(2)}</span>
                                </div>
                            </li>
                            {/* row 4 */}
                            <li className='py-4 flex justify-between items-center'>
                                <span className='px-8 text-lg exo-2-normal text-[var(--text-defaultColor)]'>{translation.productPage.table.priceScore}</span>
                                <div
                                    className="mr-8 shadow-md ubuntu-normal rounded-2xl px-2"
                                    style={{
                                        backgroundColor: product.prix! <= 20 ? product.prix! <= 10 ? 'var(--score-redBg-color)' : 'var(--score-yellowBg-color)' : 'var(--score-greenBg-color)',
                                        color: product.prix! <= 20 ? product.prix! <= 10 ? 'var(--score-redText-color)' : 'var(--score-yellowText-color)' : 'var(--score-greenText-color)',
                                    }}
                                >
                                    {product.prix!.toFixed(1)}
                                </div>
                            </li>
                            <li className='py-4 flex justify-between items-center'>
                                <div className='pl-8'>
                                    <span className='text-lg exo-2-normal text-[var(--text-defaultColor)]'>P x 32: </span>
                                    <span className='text-lg ubuntu-normal text-[var(--score-greenText-color)]'>{(product.buyPrice * 32).toFixed(1)}</span>
                                </div>
                                <div>
                                    <span className='text-lg exo-2-normal text-[var(--text-defaultColor)]'>P x 128: </span>
                                    <span className='text-lg ubuntu-normal text-[var(--score-greenText-color)]'>{(product.buyPrice * 128).toFixed(1)}</span>
                                </div>
                                <div className='pr-8'>
                                    <span className='text-lg exo-2-normal text-[var(--text-defaultColor)]'>P x 1024: </span>
                                    <span className='text-lg ubuntu-normal text-[var(--score-greenText-color)]'>{(product.buyPrice * 1024).toFixed(1)}</span>
                                </div>
                            </li>
                            {/* row 5 */}
                            <li className='bg-[var(--background-oddRowProduct)] py-4 flex justify-between items-center'>
                                <span className='px-8 text-lg exo-2-normal text-[var(--text-defaultColor)]'>{translation.productPage.table.demandScore}</span>
                                <div
                                    className="mr-8 shadow-md ubuntu-normal rounded-2xl px-2"
                                    style={{
                                        backgroundColor: product.offreDemande! <= 20 ? product.offreDemande! <= 10 ? 'var(--score-redBg-color)' : 'var(--score-yellowBg-color)' : 'var(--score-greenBg-color)',
                                        color: product.offreDemande! <= 20 ? product.offreDemande! <= 10 ? 'var(--score-redText-color)' : 'var(--score-yellowText-color)' : 'var(--score-greenText-color)',
                                    }}
                                >
                                    {product.offreDemande!.toFixed(1)}
                                </div>
                            </li>
                            <li className='bg-[var(--background-oddRowProduct)] py-4 flex justify-between items-center'>
                                <div className='flex flex-1'>
                                    <p className='text-lg pl-8 w-full exo-2-normal text-[var(--text-defaultColor)] mr-2'>{translation.productPage.table.Product} x</p>
                                    <input
                                        type="number"
                                        value={inputPrice}
                                        onChange={(e) => setInputPrice(Number(e.target.value))}
                                        className='w-full py-0.5 ubuntu-normal px-3 hover:shadow-lg text-sm md:text-base rounded-full focus:shadow-xl transition-all bg-[var(--background-firstProduct)] shadow-md focus:outline-offset-0 focus:outline-[var(--text-secondaryColor)] outline-none text-[var(--text-secondaryColor-accent3)] focus:outline-none'/>
                                </div>
                                <span className='flex-1 justify-end flex truncate text-lg ubuntu-normal text-[var(--score-greenText-color)] mr-8'>{(inputPrice * product.buyPrice).toFixed(1)}</span>
                            </li>
                            {/* row 6 */}
                            <li className='py-4 flex justify-between items-center'>
                                <span className='px-8 text-lg exo-2-normal text-[var(--text-defaultColor)]'>{translation.productPage.table.popuScore}</span>
                                <div
                                    className="mr-8 shadow-md ubuntu-normal rounded-2xl px-2"
                                    style={{
                                        backgroundColor: product.popularity! <= 20 ? product.popularity! <= 10 ? 'var(--score-redBg-color)' : 'var(--score-yellowBg-color)' : 'var(--score-greenBg-color)',
                                        color: product.popularity! <= 20 ? product.popularity! <= 10 ? 'var(--score-redText-color)' : 'var(--score-yellowText-color)' : 'var(--score-greenText-color)',
                                    }}
                                >
                                    {product.popularity!.toFixed(1)}
                                </div>
                            </li>
                            <li className='py-4 flex justify-between items-center'>
                                <div>
                                    <span className='pl-8 text-lg exo-2-normal text-[var(--text-defaultColor)]'>{translation.productPage.table.supply}: </span>
                                    <span className='pl-8 text-lg ubuntu-normal text-[var(--score-greenText-color)]'>{product.sellVolume.toFixed()}</span>
                                </div>
                                <div>
                                    <span className='text-lg exo-2-normal text-[var(--text-defaultColor)]'>{translation.productPage.table.difference}: </span>
                                    <span className='text-lg ubuntu-normal text-[var(--score-greenText-color)]'>{(product.sellVolume - product.buyVolume).toFixed()}</span>
                                </div>
                                <div>
                                    <span className='text-lg exo-2-normal text-[var(--text-defaultColor)]'>{translation.productPage.table.demand}: </span>
                                    <span className='pr-8 text-lg ubuntu-normal text-[var(--score-greenText-color)]'>{product.buyVolume.toFixed()}</span>
                                </div>
                            </li>
                        </ul>
                        <p className='rounded-lg mb-4 shadow-lg bg-gradient-to-r from-[var(--background-fadeComp7)] to-[var(--background-fadeComp6)] mt-8 py-4 pl-6 exo-2-light text-[var(--text-secondaryColor)]'>
                            <b className='exo-2-bold'>Information:</b> {translation.productPage.about.information[0]} 
                            <br/> {translation.productPage.about.information[1]} <b className='ubuntu-normal'>25</b> {translation.productPage.about.information[2]} <b className='ubuntu-normal'>0</b>.
                            {translation.productPage.about.information[3]} <b className='ubuntu-normal'>100</b> {translation.productPage.about.information[4]} <b className='ubuntu-normal'>0</b>. 
                            <br/>
                            <b className='underline'>{translation.productPage.about.disclaimer[0]}</b> {translation.productPage.about.disclaimer[1]} <a href='./Home' className='font-[500] underline hover:font-semibold'>{translation.productPage.about.disclaimer[2]}</a>.
                            <br/> 
                            <br/>
                            <b className='exo-2-bold'>{translation.productPage.table.margeScore}</b>: {translation.productPage.about.margeScore[0]} 
                            <br/> {translation.productPage.about.margeScore[1]} 
                            <br/> 
                            <br/> 
                            <b className='exo-2-bold'>{translation.productPage.table.priceScore}</b>: {translation.productPage.about.priceScore[0]} <a href='./Home' className='font-[500] underline hover:font-semibold'>{translation.productPage.about.priceScore[1]} </a>. 
                            <br/> {translation.productPage.about.priceScore[2]} 
                            <br/> {translation.productPage.about.priceScore[3]}
                            <br/>
                            <br/> 
                            <b className='exo-2-bold'>{translation.productPage.table.demandScore}</b>: {translation.productPage.about.demandScore[0]}
                            <br/> {translation.productPage.about.demandScore[1]}
                            <br/> 
                            <br/>
                            <b className='exo-2-bold'>{translation.productPage.table.popuScore}</b>: {translation.productPage.about.popuScore}
                        </p>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Product