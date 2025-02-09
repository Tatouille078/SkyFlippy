import { FaSearch } from "react-icons/fa"
import { useStateContext } from "../context"
import React from "react";
import { useTranslation } from "../contexts/TranslationContext";

const Searchbar = React.forwardRef<HTMLInputElement>((_, ref) => {

    const { translation } = useTranslation()
    const { search, setSearch } = useStateContext()

    return (
        <div className="flex justify-end w-full px-2 md:px-4">
            <div className="relative group bg-[var(--background-searchBar)] hover:bg-[var(--button-headerRight-colorHover)] outline-none outline-offset-0 hover:outline-[var(--button-headerRight-inlineColorHover)] focus-within:outline-[var(--button-headerRight-inlineColorHover)] flex items-center transition-all duration-300 w-[44px] focus-within:w-[80%] lg:focus-within:w-[30%] overflow-hidden rounded-2xl shadow-lg">
                <FaSearch
                    className="absolute group-hover:-rotate-12 group-hover:scale-110 duration-200 transition-all pointer-events-none left-3 top-1/2 transform -translate-y-1/2 group-hover:text-[var(--button-headerRight-inlineColorHover)] text-[var(--button-headerRight-inlineColor)]"
                    size={18}
                />
                <input
                    type="text"
                    value={search}
                    ref={ref}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={translation.homePage.searchBar}
                    className="w-full pl-10 pr-4 py-[10px] cursor-pointer focus-within:cursor-text text-sm md:text-base bg-transparent focus:outline-none text-[var(--text-secondaryColor-accent1)] placeholder-[var(--text-secondaryColor)]"
                />
            </div>
        </div>
    );
});

export default Searchbar