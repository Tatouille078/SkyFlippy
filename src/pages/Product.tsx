import { AnimatedShapes, Header } from '../components'
import { useParams } from 'react-router-dom'
import { useStateContext } from '../context'
import { Product as P } from '../Calculus'
import { useEffect, useState } from 'react'

const Product = () => {
    const [inputPrice, setInputPrice] = useState<number>(() => {
        const savedPrice = localStorage.getItem('inputPrice');
        return savedPrice? Number(savedPrice) : 0;
    });
    const { getItem } = useStateContext()
    const { id } = useParams()
    const product: P | null = getItem<P>("product")
    if (!product || product.productID != id) {
        window.location.href = "/"
        return null
    }

    useEffect(() => {
        localStorage.setItem('inputPrice', inputPrice.toString());
    })

    return (
        <div className="min-h-screen bg-white overflow-y-hidden">
            <AnimatedShapes />
            <Header />
            <div className='mt-28 mb-4 flex relative'>
                <main className='flex-1 mt-8 flex flex-col'>
                    <div className='container mx-auto max-w-screen-xl px-4 pt-4 bg-trans rounded-xl shadow-xl'>
                        <ul className='bg-fuchsia-100 mx-auto rounded-lg shadow-lg grid grid-cols-2'>
                            {/* row 1 */}
                            <li className='col-start-1 col-end-3 flex header-sidebar-fade rounded-t-lg py-6 justify-center'>
                                <p className='exo-2-bold text-2xl text-purple-700'>{product.productID}</p>
                            </li>
                            {/* row 2 */}
                            <li className='bg-purple-200 py-4 flex justify-between items-center'>
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
                            <li className='bg-gray-50 py-4 flex justify-between items-center'>
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
                            <li className='bg-gray-50 py-4 flex justify-between items-center'>
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
                            <li className='bg-gray-50 py-4 flex justify-between items-center'>
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
                            <li className='bg-gray-50 py-4 flex justify-between items-center'>
                                <div className='flex flex-1'>
                                    <p className='text-lg pl-8 w-full exo-2-normal text-gray-800 mr-2'>Produit x </p>
                                    <input
                                        type="number"
                                        value={inputPrice}
                                        onChange={(e) => setInputPrice(e.target.value)}
                                        className='w-full py-0.5 ubuntu-normal px-3 hover:shadow-lg text-sm md:text-base rounded-full focus:shadow-xl transition-all search-fade shadow-md focus:outline-offset-0 focus:outline-purple-400 outline-none hover:placeholder-purple-600 text-purple-900 placeholder-purple-500 focus:outline-none'/>
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
                            <b className='exo-2-bold'>Information</b>: Les scores sont actualisés à chaque push de l'API d'Hypixel (soit toutes les 2 minutes). 
                            <br/> Ils ne peuvent pas dépasser <b className='ubuntu-normal'>25</b> est aller en dessous de <b className='ubuntu-normal'>0</b>.
                            Le score final ne peut pas excéder <b className='ubuntu-normal'>100</b> ni aller en dessous de <b className='ubuntu-normal'>0</b>. 
                            <br/> Si vous voyez une erreur, prévenez moi cette adresse: ___.
                            <br/>
                            <b className='underline'>Attention</b>: Pour actualiser les scores, vous devez retourner sur la <a href='./Home' className='font-[500] underline hover:font-semibold'>page d'acceuil</a>.
                            <br/> 
                            <br/>
                            <b className='exo-2-bold'>Score de Marge</b>: La Marge est le ratio en pourcentage entre le prix d'achat et le prix de vente d'un item. 
                            <br/> Sur la cellule de droite ainsi que celle juste au-dessus, on trouve les détails liés à la marge. 
                            <br/> 
                            <br/> 
                            <b className='exo-2-bold'>Score de Prix</b>: Le Prix est simplement un score par rapport au prix (voir le graph "Score Prix" dans le menu déroulant à la <a href='./Home' className='font-[500] underline hover:font-semibold'>page d'acceuil</a>). 
                            <br/> Sur la cellule de droite, on trouve P (Prix du produit) multiplié par 32, 128 et 1024. 
                            <br/> Un input placé dans la cellule du dessous vous permez de placer votre propre valeur.
                            <br/>
                            <br/> 
                            <b className='exo-2-bold'>Score d'Offre et de Demande</b>: L'offre et la demande est le delta entre le volume d'achat et le volume de vente que vous pouvez voir dans la cellule à droite de "Score Popularity".
                            <br/> Plus la différence est grosse, moins l'offre et la demande sont équitables, moins le score sera bon. 
                            <br/> 
                            <br/>
                            <b className='exo-2-bold'>Score de popularité</b>: Mix entre les systèmes de score de prix et de l'Offre et la demande. Basé sur le volume d'achat par rapport au prix.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Product