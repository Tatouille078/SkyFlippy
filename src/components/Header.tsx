import { IoMenu, IoSettingsOutline } from "react-icons/io5";
import { StateContextType, useStateContext } from "../context";
import Searchbar from "./Searchbar";

export type HeaderProps = {
  buttonSidebarRef?: React.MutableRefObject<null>;
  searchbarRef?: React.MutableRefObject<null>;
  buttonSettingsRef?: React.MutableRefObject<null>;
};

const Header: React.FC<HeaderProps> = ({ buttonSidebarRef, searchbarRef, buttonSettingsRef }) => {
  const { toggleOpen, toggleSettings }: StateContextType = useStateContext();

  return (
    <header className="bg-gradient-to-r from-[var(--background-fadeTrans2)] to-[var(--background-fadeTrans2)] rounded-b-[4.7rem] z-50 shadow-xl fixed w-full pb-4">
      <div className="bg-gradient-to-r from-[var(--background-fadeComp3)] via-[var(--background-fadeComp2)] to-[var(--background-fadeComp1)] rounded-b-[5rem] text-[var(--text-primaryColor)] py-4 w-full top-0">
        <div className="container mx-auto px-16 md:px-8">
          <div className="flex items-center justify-between mr-12 lg:mr-0">
            <div className="flex items-center space-x-4">
              {buttonSidebarRef &&
                <button
                  className="p-2 hover:bg-[var(--button-headerLeft-colorHover)] duration-[100ms] hover:outline-2 group bg-[var(--button-headerLeft-color)] rounded-2xl ml-12 lg:ml-0 shadow-lg hover:outline hover:scale-105 transition-all hover:-rotate-2 outline-[var(--button-headerLeft-inlineColorHover)] hover:outline-[var(--button-headerLeft-inlineColorHover)] hover:shadow-xl"
                  onClick={toggleOpen}
                  ref={buttonSidebarRef}
                >
                  <IoMenu size={30} className="group-hover:scale-y-150 group-hover:text-[var(--button-headerLeft-inlineColorHover)] transition-all" />
                </button>}
              <h1 className="hidden md:block mb-2 text-xl py-2 md:text-4xl exo-2-normal">SkyFlippy</h1>
            </div>
            {searchbarRef &&
              <Searchbar ref={searchbarRef} />}
            <div className="flex items-center justify-end space-x-4">
              {buttonSettingsRef &&
                <button
                  onClick={toggleSettings}
                  ref={buttonSettingsRef}
                  className="p-2 hover:bg-[var(--button-headerRight-colorHover)] duration-[100ms] group flex justify-end bg-[var(--button-headerRight-color)] rounded-2xl ml-12 lg:ml-0 shadow-lg hover:outline hover:outline-[var(--button-headerRight-inlineColorHover)] outline-[var(--button-headerRight-inlineColorHover)] hover:outline-2 hover:scale-105 transition-all hover:rotate-2 hover:shadow-xl">
                  <IoSettingsOutline size={30} className="group-hover:rotate-90 text-[var(--button-headerRight-inlineColor)] group-hover:text-[var(--button-headerRight-inlineColorHover)] transition-all duration-300" />
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
