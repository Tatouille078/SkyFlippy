import { FaSearch } from "react-icons/fa"
import { useStateContext } from "../context"
import React from "react";

const Searchbar = React.forwardRef<HTMLInputElement>((props, ref) => {

    const { search, setSearch } = useStateContext()

    return (
        <div className="flex justify-end w-full px-2 md:px-4">
            <div className="relative self-end w-[80%] lg:w-[30%]">
                <input
                    type="text"
                    value={search}
                    ref={ref}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher..."
                    style={{ backgroundColor: 'var(--background-searchBar)' }}
                    className="w-full exo-2-normal pl-10 pr-4 py-2 text-sm md:text-base duration-[50ms] rounded-full focus:shadow-xl transition-all shadow-lg focus:outline-offset-0 focus:outline-[--text-secondaryColor-accent2] outline-[--text-secondaryColor-accent2] hover:placeholder-[var(--text-secondaryColor-accent2)] text-[var(--text-secondaryColor-accent1)] placeholder-[var(--text-secondaryColor)] focus:outline-none"
                />
                <FaSearch className="absolute left-3 top-1/2 transform text-[var(--text-secondaryColor-accent2)] -translate-y-1/2" size={18} />
            </div>
        </div>
    )
});

export default Searchbar