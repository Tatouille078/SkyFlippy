import React from "react";
import { Product } from "../Calculus";
import { useStateContext } from "../context";
import { Link } from "react-router-dom";

type ItemCardProps = {
    product: Product;
};

const ItemCard: React.FC<ItemCardProps> = ({ product }) => {
    const { setItem } = useStateContext()
    return (
        <Link to={`/products/${product.productID}`}>
            <div onClick={() => setItem("product", product)} className="bg-gray-50 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-md">
                <div className="itemcard-fade p-4">
                    <h2 className="text-xl exo-2-bold text-fuchsia-50 truncate">{product.productID}</h2>
                </div>
                <div className="pt-4">
                    <ul className="mb-4 space-y-2">
                        <li className="flex justify-between items-center">
                            <span className="text-gray-800 ml-5 exo-2-normal">Final score:</span>
                            <div
                                className="mr-5 ubuntu-normal rounded-2xl px-2"
                                style={{
                                    backgroundColor: product.finalScore <= 75 ? product.finalScore <= 55 ? 'rgb(254, 202, 202)' : 'rgb(254 243 199)' : 'rgb(187, 247, 208)',
                                    color: product.finalScore <= 75 ? product.finalScore <= 55 ? 'rgb(220, 38, 38)' : 'rgb(190, 100, 9)' : 'rgb(22, 101, 52)',
                                }}
                            >
                                {product.finalScore}
                            </div>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="text-gray-800 ml-5 exo-2-normal">Marge:</span>
                            <div
                                className="mr-5 ubuntu-normal rounded-2xl px-2"
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
                                className="mr-5 ubuntu-normal rounded-2xl px-2"
                                style={{
                                    backgroundColor: product.offreDemande <= 23 ? product.offreDemande <= 16 ? 'rgb(254, 202, 202)' : 'rgb(254 243 199)' : 'rgb(187, 247, 208)',
                                    color: product.offreDemande <= 23 ? product.offreDemande <= 16 ? 'rgb(220, 38, 38)' : 'rgb(190, 100, 9)' : 'rgb(22, 101, 52)',
                                }}
                            >
                                {product.buyVolume <= product.sellVolume ? (((product.sellVolume * 100) / product.buyVolume) - 100).toFixed(1) : (((product.buyVolume * 100) / product.sellVolume) - 100).toFixed(1)} %
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Link>
    )
}

export default ItemCard