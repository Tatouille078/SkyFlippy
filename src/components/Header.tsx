import { IoMenu, IoSettingsOutline } from "react-icons/io5";
import { StateContextType, useStateContext } from "../context";
import Searchbar from "./Searchbar";

export type HeaderProps = {
  buttonRef?: React.MutableRefObject<null>;
  searchbarRef?: React.MutableRefObject<null>;
};

const Header: React.FC<HeaderProps> = ({ buttonRef, searchbarRef }) => {
  const { toggleOpen }: StateContextType = useStateContext();

  return (
    <header className="bg-fuchsia-200 bg-opacity-70 rounded-b-[4.7rem] text-white z-50 shadow-xl fixed w-full pb-4">
      <div className="header-fade rounded-b-[5rem] text-white py-4 w-full top-0">
        <div className="container mx-auto px-16 md:px-8">
          <div className="flex items-center justify-between mr-12 lg:mr-0">
            <div className="flex items-center space-x-4">
              {buttonRef &&
                <button
                  className="p-2 hover:bg-purple-400 group bg-purple-500 rounded-2xl ml-12 lg:ml-0 shadow-lg hover:outline hover:outline-1 hover:scale-105 transition-all hover:rotate-2 hover:shadow-xl duration-200"
                  onClick={toggleOpen}
                  ref={buttonRef}
                >
                  <IoMenu size={30} className="group-hover:scale-y-150 transition-all"/>
                </button>}
              <h1 className="hidden md:block mb-2 text-xl py-2 md:text-4xl exo-2-normal">SkyFlippy</h1>
            </div>
            {searchbarRef &&
              <Searchbar ref={searchbarRef} />}
            <div className="flex items-center justify-end space-x-4">
              <button className="p-2 hover:bg-pink-400 group flex justify-end bg-pink-300 rounded-2xl ml-12 lg:ml-0 shadow-lg hover:outline hover:outline-1 hover:scale-105 transition-all hover:rotate-2 hover:shadow-xl duration-200">
                <IoSettingsOutline size={30} className="group-hover:rotate-90 transition-all duration-300"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
