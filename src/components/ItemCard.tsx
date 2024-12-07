import React from "react";
import { Product } from "../Calculus";
import { useStateContext } from "../context";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

type ItemCardProps = {
    product: Product;
};

const ItemCard: React.FC<ItemCardProps> = ({ product }) => {
    const { setItem } = useStateContext()
    return (
        <Link to={`/products/${product.productID}`}>
            <div onClick={() => setItem("product", product)} className="bg-gray-100 group bg-opacity-85 hover:bg-opacity-100 hover:bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-md hover:scale-105 hover:rotate-2">
                <div className="relative p-4 overflow-hidden transition-all group text-gray-50 rounded-lg">
                    <span className="absolute inset-0 transition-opacity duration-500 bg-gradient-to-r from-purple-500 via-fuchsia-400 to-fuchsia-300 group-hover:opacity-100"></span>
                    <span className="absolute inset-0 duration-500 bg-gradient-to-r group-hover:opacity-0 from-purple-500 to-fuchsia-400"></span>
                    <h2 className="text-xl relative text-white z-50 exo-2-bold truncate">{product.productID}</h2>
                </div>
                <div className="pt-4">
                    <ul className="mb-4 space-y-2">
                        <li className="flex justify-between items-center">
                            <span className="text-gray-800 ml-5 exo-2-normal">Final score:</span>
                            <Tippy content={`Score Marge: ${product.marge.toFixed(1)} | Score Prix: ${product.prix.toFixed(1)} | Score Offre/Demande: ${product.offreDemande.toFixed(1)} | Score Popularity: ${product.popularity.toFixed(1)}`}>
                                <div
                                    className="shadow-md mr-5 ubuntu-normal rounded-2xl px-2"
                                    style={{
                                        backgroundColor: product.finalScore <= 75 ? product.finalScore <= 55 ? 'rgb(254, 202, 202)' : 'rgb(254 243 199)' : 'rgb(187, 247, 208)',
                                        color: product.finalScore <= 75 ? product.finalScore <= 55 ? 'rgb(220, 38, 38)' : 'rgb(190, 100, 9)' : 'rgb(22, 101, 52)',
                                    }}
                                >
                                    {product.finalScore}
                                </div>
                            </Tippy>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="text-gray-800 ml-5 exo-2-normal">Marge:</span>
                            <div
                                className="mr-5 shadow-md ubuntu-normal rounded-2xl px-2"
                                style={{
                                    backgroundColor: product.marge <= 18 ? product.marge <= 10 ? 'rgb(254, 202, 202)' : 'rgb(254 243 199)' : 'rgb(187, 247, 208)',
                                    color: product.marge <= 18 ? product.marge <= 10 ? 'rgb(220, 38, 38)' : 'rgb(190, 100, 9)' : 'rgb(22, 101, 52)',
                                }}
                            >
                                {(((product.buyPrice / product.sellPrice) * 100) - 100).toFixed(1)} %
                            </div>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="text-gray-800 ml-5 exo-2-normal">écart offre / demande:</span>
                            <div
                                className="mr-5 shadow-md flex items-center ubuntu-normal rounded-2xl px-2"
                                style={{
                                    backgroundColor: product.offreDemande <= 23 ? product.offreDemande <= 16 ? 'rgb(254, 202, 202)' : 'rgb(254 243 199)' : 'rgb(187, 247, 208)',
                                    color: product.offreDemande <= 23 ? product.offreDemande <= 16 ? 'rgb(220, 38, 38)' : 'rgb(190, 100, 9)' : 'rgb(22, 101, 52)',
                                }}
                            >
                                {product.buyVolume <= product.sellVolume ? (((product.sellVolume * 100) / product.buyVolume) - 100).toFixed() : (((product.buyVolume * 100) / product.sellVolume) - 100).toFixed()} %
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Link>
    )
}

export default ItemCard