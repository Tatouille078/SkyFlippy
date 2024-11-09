import React from "react";
import { Product } from "../Calculus";

type ItemCardProps = {
    product: Product;
};

const ItemCard: React.FC<ItemCardProps> = ({ product }) => {
    return (
        <div className="bg-gray-50 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-md">
            <div className="itemcard-fade p-4">
                <h2 className="text-xl exo-2-bold text-purple-600">{product.productID}</h2>
            </div>
            <div className="pt-4">
                <ul className="mb-4 space-y-2">
                    <li className="flex justify-between items-center">
                        <span className="text-gray-600 ml-5 exo-2-normal">Final score:</span>
                        <div className="bg-pink-100 mr-5 ubuntu-normal rounded-2xl px-2 text-pink-600">
                            {product.finalScore}
                        </div>
                    </li>
                    <li className="flex justify-between items-center">
                        <span className="text-gray-600 ml-5 exo-2-normal">Marge:</span>
                        <div className="bg-pink-100 mr-5 ubuntu-normal rounded-2xl px-2 text-pink-600">
                            {(((product.buyPrice / product.sellPrice) * 100) - 100).toFixed(1)} %
                        </div>
                    </li>
                    <li className="flex justify-between items-center">
                        <span className="text-gray-600 ml-5 exo-2-normal">Offre / demande:</span>
                        <div className="bg-pink-100 mr-5 ubuntu-normal rounded-2xl px-2 text-pink-600">
                            {product.buyVolume <= product.sellVolume ? (((product.sellVolume * 100) / product.buyVolume) - 100).toFixed(1) : (((product.buyVolume * 100) / product.sellVolume) - 100).toFixed(1)} %
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ItemCard