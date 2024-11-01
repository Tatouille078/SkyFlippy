import React from "react";
import { ItemProps } from "./Categories";

type ItemCardProps = {
    item: ItemProps;
};

const ItemCard: React.FC<ItemCardProps> = ({item}) => {
    return (
        <div className="bg-gray-50 overflow-hidden shadow-xl hover:shadow-xl transition-shadow duration-300 rounded-md">
            <div className="itemcard-fade p-4">
                <h2 className="text-xl exo-2-bold text-purple-600">{item.name}</h2>
            </div>
            <div className="pt-4">
                <ul className="mb-4 space-y-2">
                    {item.stats.map((stat, index) => (
                    <li key={index} className="flex justify-between items-center">
                        <span className="text-gray-600 ml-5 exo-2-normal">{stat.name}</span>
                        <div className="bg-pink-100 mr-5 ubuntu-normal rounded-2xl px-2 text-pink-600">
                            {stat.value}
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ItemCard