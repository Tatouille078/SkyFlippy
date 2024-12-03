import { FaSearch } from "react-icons/fa"
import { useStateContext } from "../context"
import React from "react";

const Searchbar = React.forwardRef<HTMLInputElement>((props, ref) => {

    const { search, setSearch } = useStateContext()

    return (
        <div className="flex justify-end w-full px-2 md:px-4">
            <div className="relative self-end w-[30%]">
                <input
                    type="text"
                    value={search}
                    ref={ref}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher..."
                    className="w-full exo-2-normal pl-10 pr-4 py-2 hover:shadow-lg text-sm md:text-base rounded-full focus:shadow-xl transition-all search-fade shadow-md focus:outline-offset-0 focus:outline-white hover:placeholder-purple-600 text-purple-700 placeholder-purple-500 focus:outline-none"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-600" size={18} />
            </div>
        </div>
    )
});

export default Searchbar