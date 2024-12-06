import { AnimatedShapes, Header } from '../components'
import { useParams } from 'react-router-dom'
import { useStateContext } from '../context'
import { Product as P } from '../Calculus'
import { useState } from 'react'

const Product = () => {
    const [inputPrice, setInputPrice] = useState<number>(0)
    const { getItem } = useStateContext()
    const { id } = useParams()
    const product: P | null = getItem<P>("product")
    if (!product || product.productID != id) {
        window.location.href = "/"
        return null
    }
    return (
        <div className="min-h-screen bg-white overflow-y-hidden">
            <AnimatedShapes />
            <Header />
            <div className='flex relative'>
                <main className='flex-1 mt-8 flex flex-col'>
                    <div className='container mx-auto max-w-screen-xl px-4 pt-4 bg-trans rounded-2xl shadow-xl'>
                        <ul className='bg-gray-50 mx-auto rounded-3xl shadow-lg grid grid-cols-2'>
                            {/* row 1 */}
                            <li className='col-start-1 col-end-3 flex header-sidebar-fade rounded-t-2xl py-6 justify-center'>
                                <p className='exo-2-bold text-2xl text-purple-700'>{product.productID}</p>
                            </li>
                            {/* row 2 */}
                            <li className='bg-purple-100 rounded-b-xl py-4 flex justify-between items-center'>
                                <span className='px-8 text-lg exo-2-normal text-gray-800'>Score Finale:</span>
                                <div
                                    className="mr-8 shadow-md ubuntu-normal rounded-2xl px-2"
                                    style={{
                                        backgroundColor: product.finalScore <= 75 ? product.finalScore <= 55 ? 'rgb(254, 202, 202)' : 'rgb(254 243 199)' : 'rgb(187, 247, 208)',
                                        color: product.finalScore <= 75 ? product.finalScore <= 55 ? 'rgb(220, 38, 38)' : 'rgb(190, 100, 9)' : 'rgb(22, 101, 52)',
                                    }}
                                >
                                    {product.finalScore}
                                </div>
                            </li>
                            <li className='py-4 flex justify-between items-center'>
                                <span className='px-8 text-lg exo-2-normal text-gray-800'>Marge percent:</span>
                                <div
                                    className="mr-8 shadow-md ubuntu-normal rounded-2xl px-2"
                                    style={{
                                        backgroundColor: product.marge <= 18 ? product.marge <= 10 ? 'rgb(254, 202, 202)' : 'rgb(254 243 199)' : 'rgb(187, 247, 208)',
                                        color: product.marge <= 18 ? product.marge <= 10 ? 'rgb(220, 38, 38)' : 'rgb(190, 100, 9)' : 'rgb(22, 101, 52)',
                                    }}
                                >
                                    {(((product.buyPrice / product.sellPrice) * 100) - 100).toFixed(1)} %
                                </div>
                            </li>
                            {/* row 3 */}
                            <li className='bg-fuchsia-50 py-4 flex justify-between items-center'>
                                <span className='px-8 text-lg exo-2-normal text-gray-800'>Score Marge:</span>
                                <div
                                    className="mr-8 shadow-md ubuntu-normal rounded-2xl px-2"
                                    style={{
                                        backgroundColor: product.marge <= 20 ? product.marge <= 10 ? 'rgb(254, 202, 202)' : 'rgb(254 243 199)' : 'rgb(187, 247, 208)',
                                        color: product.marge <= 20 ? product.marge <= 10 ? 'rgb(220, 38, 38)' : 'rgb(190, 100, 9)' : 'rgb(22, 101, 52)',
                                    }}
                                >
                                    {product.marge.toFixed(1)}
                                </div>
                            </li>
                            <li className='bg-fuchsia-50 py-4 flex justify-between items-center'>
                                <div>
                                    <span className='pl-8 text-lg exo-2-normal text-gray-800'>Prix achat: </span>
                                    <span className='text-lg ubuntu-normal text-green-800'>{product.buyPrice.toFixed(2)}</span>
                                </div>
                                <div>
                                    <span className='text-lg exo-2-normal text-gray-800'>Diff: </span>
                                    <span className='text-lg ubuntu-normal text-green-800'>+{(product.buyPrice - product.sellPrice).toFixed()}</span>
                                </div>
                                <div>
                                    <span className='text-lg exo-2-normal text-gray-800'>Prix vente: </span>
                                    <span className='pr-8 text-lg ubuntu-normal text-green-800'>{product.sellPrice.toFixed(2)}</span>
                                </div>
                            </li>
                            {/* row 4 */}
                            <li className='py-4 flex justify-between items-center'>
                                <span className='px-8 text-lg exo-2-normal text-gray-800'>Score Prix:</span>
                                <div
                                    className="mr-8 shadow-md ubuntu-normal rounded-2xl px-2"
                                    style={{
                                        backgroundColor: product.prix <= 20 ? product.prix <= 10 ? 'rgb(254, 202, 202)' : 'rgb(254 243 199)' : 'rgb(187, 247, 208)',
                                        color: product.prix <= 20 ? product.prix <= 10 ? 'rgb(220, 38, 38)' : 'rgb(190, 100, 9)' : 'rgb(22, 101, 52)',
                                    }}
                                >
                                    {product.prix.toFixed(1)}
                                </div>
                            </li>
                            <li className='py-4 flex justify-between items-center'>
                                <div className='pl-8'>
                                    <span className='text-lg exo-2-normal text-gray-800'>P x 32: </span>
                                    <span className='text-lg ubuntu-normal text-green-800'>{(product.buyPrice * 32).toFixed(1)}</span>
                                </div>
                                <div>
                                    <span className='text-lg exo-2-normal text-gray-800'>P x 128: </span>
                                    <span className='text-lg ubuntu-normal text-green-800'>{(product.buyPrice * 128).toFixed(1)}</span>
                                </div>
                                <div className='pr-8'>
                                    <span className='text-lg exo-2-normal text-gray-800'>P x 1024: </span>
                                    <span className='text-lg ubuntu-normal text-green-800'>{(product.buyPrice * 1024).toFixed(1)}</span>
                                </div>
                            </li>
                            {/* row 5 */}
                            <li className='bg-fuchsia-50 py-4 flex justify-between items-center'>
                                <span className='px-8 text-lg exo-2-normal text-gray-800'>Score Offre/Demande:</span>
                                <div
                                    className="mr-8 shadow-md ubuntu-normal rounded-2xl px-2"
                                    style={{
                                        backgroundColor: product.offreDemande <= 20 ? product.offreDemande <= 10 ? 'rgb(254, 202, 202)' : 'rgb(254 243 199)' : 'rgb(187, 247, 208)',
                                        color: product.offreDemande <= 20 ? product.offreDemande <= 10 ? 'rgb(220, 38, 38)' : 'rgb(190, 100, 9)' : 'rgb(22, 101, 52)',
                                    }}
                                >
                                    {product.offreDemande.toFixed(1)}
                                </div>
                            </li>
                            <li className='bg-fuchsia-50 py-4 flex justify-between items-center'>
                                <span className='pl-8 text-lg exo-2-normal text-gray-800 flex-1'>Marge percent:</span>
                                <div className='flex flex-1'>
                                    <p className='text-lg exo-2-normal text-gray-800 mr-2'>P x </p>
                                    <input
                                        type="number"
                                        value={inputPrice}
                                        onChange={(e) => setInputPrice(e.target.value)}
                                        className='border ubuntu-normal text-lg w-36 border-black' />
                                </div>
                                <span className='flex-1 justify-end flex truncate text-lg ubuntu-normal text-green-800 mr-8'>{inputPrice * product.buyPrice.toFixed(1)}</span>
                            </li>
                            {/* row 6 */}
                            <li className='py-4 flex justify-between items-center'>
                                <span className='px-8 text-lg exo-2-normal text-gray-800'>Score Popularity:</span>
                                <div
                                    className="mr-8 shadow-md ubuntu-normal rounded-2xl px-2"
                                    style={{
                                        backgroundColor: product.popularity <= 20 ? product.popularity <= 10 ? 'rgb(254, 202, 202)' : 'rgb(254 243 199)' : 'rgb(187, 247, 208)',
                                        color: product.popularity <= 20 ? product.popularity <= 10 ? 'rgb(220, 38, 38)' : 'rgb(190, 100, 9)' : 'rgb(22, 101, 52)',
                                    }}
                                >
                                    {product.popularity.toFixed(1)}
                                </div>
                            </li>
                            <li className='py-4 flex justify-between items-center'>
                                <div>
                                    <span className='pl-8 text-lg exo-2-normal text-gray-800'>Offre: </span>
                                    <span className='text-lg ubuntu-normal text-green-800'>{product.sellVolume.toFixed(2)}</span>
                                </div>
                                <div>
                                    <span className='text-lg exo-2-normal text-gray-800'>Diff: </span>
                                    <span className='text-lg ubuntu-normal text-green-800'>{(product.sellVolume - product.buyVolume).toFixed()}</span>
                                </div>
                                <div>
                                    <span className='text-lg exo-2-normal text-gray-800'>Demande: </span>
                                    <span className='pr-8 text-lg ubuntu-normal text-green-800'>{product.buyVolume.toFixed(2)}</span>
                                </div>
                            </li>
                        </ul>
                        <p className='rounded-lg mb-4 shadow-lg sidebar-fade mt-8 py-4 pl-6 exo-2-light text-purple-500'>
                            <b className='exo-2-bold'>Information</b>: Les scores sont actualisés à chaque push de l'API d'hypixel (soit toutes les 2 minutes). <br/> Ils ne peuvent pas 
                            dépasser <b className='ubuntu-normal'>25</b> est aller en dessous de <b className='ubuntu-normal'>0</b>.
                            Le score final ne peut pas exceder <b className='ubuntu-normal'>100</b> ni aller en dessous de <b className='ubuntu-normal'>0</b>. <br/>Si vous voyez une erreur, prévenez moi à: ___. <br/> <br/>
                            <b className='exo-2-bold'>Score de Marge</b>: La marge est le ratio en pourcentage entre le prix d'achat et le prix de vente d'un item. <br/>Sur la cellule de droite ainsi que celle juste au-dessus, on trouve les détailles liés à la marge. <br/> <br/> 
                            <b className='exo-2-bold'>Score de Prix</b>: Le prix est simplement un score par rapport au prix (voir le graph "Score Prix" dans le menu 
                            déroulant à la page d'acceuil). <br/> <br/> 
                            <b className='exo-2-bold'>Score d'Offre et de Demande</b>: L'offre et la demande est le delta entre le volume d'achat et le volume de vente. <br/>Plus la différence est grosse, moins l'offre et 
                            la demande sont proche, moins le score serra bon. <br/> <br/>
                            <b className='exo-2-bold'>Score de popularité</b>: Mix entre les systèmes de score de prix et de l'Offre et la demande. Basé sur le volume d'achat par rapport au prix.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Product